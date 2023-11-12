import { callDBUpdate } from "./api-access/sreality";
import { pool } from "./db-setup";

export const getFlats = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM flats ORDER BY id ASC",
      (error: any, results: { rows: unknown }) => {
        if (error) {
          reject(error);
        }
        console.log(error);
        resolve(results.rows);
      }
    );
  });
};

const update = async () => {
  try {
    await pool.query("DELETE FROM flats;");

    const newData = await callDBUpdate();

    for (const item of newData) {
      const queryText =
        "INSERT INTO flats (title, img_url, note) VALUES ($1, $2, $3) RETURNING *";
      const values = [item.title, item.img_url, item.note];

      try {
        const result = await pool.query(queryText, values);
        console.log(
          `A new flat has been added: ${JSON.stringify(result.rows[0])}`
        );
      } catch (error) {
        console.error("Error inserting item:", error);
      }
    }

    console.log("All items inserted successfully!");
    return true;
  } catch (error) {
    console.error("Error inserting items:", error);
    throw error;
  }
};

export { update };
