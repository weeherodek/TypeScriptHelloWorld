import mysql from "mysql2";

const environment = process.env.NODE_ENV;
const databaseEnvironment = environment == "test" ? "_test" : "";
export const db = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: `api_login${databaseEnvironment}`,
    waitForConnections: true,
  });
  console.log("Connected to database!");
  return connection;
};

export const dbQuery = (query: string) => {
  const connection = db();

  return new Promise<any[]>((resolve: any, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }).finally(() => {
    connection.destroy();
  });
};
