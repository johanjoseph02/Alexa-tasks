# MongoDB Address Directory
JavaScript application implemented using MongoDB, Express.js and Postman

## Features
- Add a new entry
- Unique ID assigned to each entry
- Search for an entry based on unique ID
- Delete/Update an entry based on unique ID

## How to use
1. Install [Node.js](https://nodejs.org/en/download/)
2. Navigate to the folder containing *index.js* within a terminal
3. Add a MongoDB connection string to *index.js*
    - Note: Database Name: AddressDirectory , Collection Name: address-directory
3. Use `node index` or `node index.js`
4. Use the HTTP request methods (get, post, put, delete) using [Postman](https://www.postman.com/downloads/) (Port: 3000)