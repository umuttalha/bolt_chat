const db = require("./database.js");
// Rooms CRUD

function createRoom(roomName) {
    // Odanın oluşturulma işlemlerini burada yapabilirsiniz
    // Örneğin, veritabanına yeni oda eklemek gibi
    addRoom(roomName)
      .then((createdRoom) => {
        console.log(`Room created: ${createdRoom.name}`);
      })
      .catch((error) => {
        console.error(`Error creating room: ${error}`);
      });
  }
  
  // addRoom fonksiyonunu tanımlayın
  function addRoom(name) {
      db.run(`INSERT INTO rooms (${name}) VALUES (?) WHERE NOT EXISTS (
        SELECT 1 FROM rooms WHERE ${name} = rooms
    );`);
  }
  
  // Tüm odaları getirmek için
  const getAllRooms = () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM rooms", (err, rows) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      });
    });
  };
  
  // Belirli bir odayı getirmek için
  const getRoomById = (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM rooms WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(row);
        }
      });
    });
  };

  function getRoomByName(name) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM rooms WHERE name = ?", [name], (err, row) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(row);
        }
      });
    });
  }
  
  
  // Messages CRUD
  
  // Yeni bir mesaj eklemek için
  const addMessage = (userId, roomId, content) => {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO messages (userId, roomId, content) VALUES (?, ?, ?)",
        [userId, roomId, content],
        function (err) {
          if (err) {
            reject(err.message);
          } else {
            resolve({ id: this.lastID, userId, roomId, content });
          }
        }
      );
    });
  };
  
  // Belirli bir odadaki tüm mesajları getirmek için
  const getAllMessagesInRoom = (roomId) => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM messages WHERE roomId = ?", [roomId], (err, rows) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      });
    });
  };
  
  module.exports = {
    addRoom,
    getAllRooms,
    getRoomById,
    addMessage,
    getAllMessagesInRoom,
    getRoomByName,
    createRoom
  };