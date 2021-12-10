import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';

// Reads the environment variables in the .env file, making it possible to connect to PostgreSQL.

dotenv.config();

const sql = postgres();
