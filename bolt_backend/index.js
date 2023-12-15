const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());


const db = require("./database.js");

const db_func = require("./db_functions.js")


const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};

const users = {};

io.on("connection", (socket) => {
  const token = socket.handshake.query.token;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("Invalid JWT Token:", err);
      } else {
        socket.join(decoded.id);

        if (!users[decoded.id]) {
          users[decoded.id] = {
            socketId: socket.id,
            room: "",
          };
        }

        socket.on("join_room", (data) => {
          const { token, room } = data;


          // console.log(`INSERT INTO rooms (name) SELECT '${room}' WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE name = '${room}')`)

          // db.run(`INSERT INTO rooms (name) SELECT '${room}' WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE name = '${room}')`);

          payload = verifyToken(token);

          const userId = payload.id;
          const onceki_room = users[userId].room;

          const otherRooms = users[userId].room == room;

          if (otherRooms == false) {
            console.log(`User ${userId} left room ${onceki_room}`);
            socket.to(onceki_room).emit("room_change", { asd: "ayrıldı", userId, onceki_room });
            socket.leave(onceki_room);
          }

          users[userId].room = room;
          console.log(`User ${userId} joined room ${room}`);
          socket.join(room);

          const userIdsInRoom12 = Object.keys(users).filter(
            (userId) => users[userId].room === room
          );

          io.to(room).emit("room_change", { userIdsInRoom12: userIdsInRoom12, room });
        });

        socket.on("send_message", async (data) => {
          console.log(data);

          try {
        
            socket.to(data.room).emit("receive_message", data);
          } catch (error) {
            console.error("Error adding message:", error);
          }



        });

        socket.on("disconnect", () => {
          // console.log(`User ${decoded.id} disconnected`);

          if (users[decoded.id] && users[decoded.id].rooms) {
            users[decoded.id].rooms.forEach((room) => {
              socket.leave(room);
              console.log(`User ${decoded.id} left room ${room}`);
            });

            delete users[decoded.id];
          }
        });
      }
    });
  }
});

app.use(cors());


const userRoutes = require("./routes/authRoutes");

app.use("/auth", userRoutes);

const verifyTokenMiddleware = require("./middleware/verifyToken.js");
app.use(verifyTokenMiddleware);

app.get("/secure", (req, res) => {
  if (req.userId) {
    res.send("Bu güvenli sayfaya hoş geldiniz!");
  } else {
    res.status(401).send("Bu sayfaya erişim izniniz yok.");
  }
});

server.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});
