import express, { json } from 'express';
import cors from "cors";
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const app = express();

// Connect to DB (Should move to env/property file if deploying)
const dbURL = "mongodb+srv://dudes01:7LZQjgVx3dPKoxkh@cluster0.oms8qj2.mongodb.net/?retryWrites=true&w=majority";
const client = await MongoClient.connect(dbURL, { useUnifiedTopology: true });
let db = client.db("databaseproject");

app.use(cors());
app.use(express.json());

// Submit API to add artist data to DB
app.post('/submit', async (req, res) => {
  try {
    let collection = await db.collection("artists");
      let result = await collection.insertOne(req.body);
      res.status(201).json({ message: 'Artists uploaded successfully' });
  } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
  }
});

// Search API to search for an artist
app.get("/searchs/:name", async (req, res) => {
  let collection = await db.collection("artists");
  let result = await collection.find({name: req.params.name}).toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});