import { Pool } from "pg";

export const pool = new Pool({
  connectionString:
    "postgres://username:password@host:port(usually 5432)/databaseName",
  ssl: true,
});

const setupDatabase = async () => {
  try {
    await pool.query("DROP TABLE IF EXISTS flats");

    await pool.query(`
      CREATE TABLE flats (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        img_url VARCHAR(255),
        note TEXT
      );
    `);

    console.log('Table "flats" has been created successfully.');
  } catch (error) {
    console.error("Error setting up database:", error);
  } finally {
    await pool.end();
  }
};

setupDatabase();
