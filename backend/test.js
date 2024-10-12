import Bill from './models/bill.model.js';
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Set up mongoose
await mongoose.connect(process.env.MONGO_URI);
console.log("Mongoose connected.");

const createEmbedding = async (input) => {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GPT_API}`
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input
      })
    });
    const data = await response.json();
    return data.data[0].embedding;
  }

const agg = [
    {
      '$vectorSearch': {
        'index': 'vector_index',
        'path': 'title_vector',
        'queryVector': await createEmbedding("Ocean"),
        "numCandidates": 2,
        "limit": 1
      }
    }];

const res = await Bill.aggregate(agg);
console.log('Search result:', res);