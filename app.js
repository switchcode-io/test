const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Retrieve secure credentials from environment variables
const dbHost = process.env.DB_HOST; // Aka your cluster endpoint (example: your-cluster-name.cluster-c1234567890abcde.mongodb.net)
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = 'database-1'; // Replace with your DB identifier

const uri = `mongodb://${dbUser}:${dbPassword}@${dbHost}:27017/${dbName}?ssl=true&replicaSet=rs0&readpreference=primaryPreferred&retrywrites=false`;

let client;

// Initialize MongoDB connection
MongoClient.connect(uri, { useUnifiedTopology: true })
  .then((dbClient) => {
    console.log('Database connected.');
    client = dbClient;
  })
  .catch((err) => {
    console.log('Error connecting to database:', err);
  });

app.get('/', (req, res) => {
  const database = client.db(dbName);
  const collection = database.collection('your_collection'); // Replace with your actual collection name
  
  collection.find().limit(3).toArray((error, results) => {
    if (error) {
      console.log('Error fetching data:', error);
      res.send('Error fetching data');
      return;
    }

    // Create HTML string to display results
    let htmlString = '<h1>First 3 Records</h1><ul>';
    results.forEach(record => {
      htmlString += `<li>ID: ${record._id}, Name: ${record.name}</li>`; // Replace '_id' and 'name' with actual column names
    });
    htmlString += '</ul>';
    
    // Send HTML string as response
    res.send(htmlString);
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
