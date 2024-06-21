import { Client } from 'pg';
import dotenv from "dotenv"
dotenv.config()
console.log(process.env.POSTGRES_USER);

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
  });


async function connectToDatabase() {
    try {
      await client.connect();
      console.log('Connected to PostgreSQL database');
      
      await client.query(`
        CREATE TABLE IF NOT EXISTS babyfootMatches (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          finished BOOLEAN NOT NULL
        );
      `);
      console.log("created table babyfootMatches");
      
    } catch (error) {
      console.error('Error connecting to database:', error);
    }
  }

  export {client,connectToDatabase}