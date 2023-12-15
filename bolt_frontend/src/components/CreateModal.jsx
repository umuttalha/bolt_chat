import React from 'react'

const CreateModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
    <div
      className="absolute inset-0 bg-gray-800 opacity-50"
      onClick={handleCloseModal}
    ></div>
    <div className="bg-white p-4 rounded-lg z-10 w-80">
      <h2 className="text-2xl font-bold mb-4">Search</h2>
      <div className="flex items-center border-b border-gray-300 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your search query"
          className="w-full px-3 py-2 focus:outline-none"
        />
        <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full"
          onClick={handleSearch}
        ></button>
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded-full mt-4"
        onClick={handleCloseModal}
      >
        Close
      </button>
    </div>
  </div>
  )
}

export default CreateModal