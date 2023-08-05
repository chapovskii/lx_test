import axios from "axios";
import { Pool } from "pg";
import { callDBUpdate } from "./api-access/sreality";

const sourceAPI = 'https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&page=2&per_page=500&tms=1690834114009';

const pool = new Pool({
  user: "main",
  host: "dpg-cj4hicdgkuvsl0cd5bog-a.frankfurt-postgres.render.com",
  database: "estate",
  password: "O48h7DzohJtNNZyAmSbgWuCPhXjfXDSf",
  port: 5432,
  ssl: true,
});

export const getFlats = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM flats ORDER BY id ASC", (error: any, results: { rows: unknown; }) => {
      if (error) {
        reject(error);
      }
      console.log(error);
      resolve(results.rows);
    });
  });
};

const update = async () => {
  try {
    await pool.query("DELETE FROM flats;");

    const newData = await callDBUpdate();

    const insertPromises = newData.map(async (item: {title: string, img_url: string, note: string}) => {
      const queryText =
        "INSERT INTO flats (title, img_url, note) VALUES ($1, $2, $3) RETURNING *";
      const values = [item.title, item.img_url, item.note];

      const result = await pool.query(queryText, values);
      console.log(`A new flat has been added: ${result.rows[0]}`);
    });

    await Promise.all(insertPromises);

    console.log("All items inserted successfully!");
    return true;
  } catch (error) {
    console.error("Error inserting items:", error);
    throw error;
  }
};

export { update };
