import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const pgp = pgPromise({
    capSQL: true, // Оптимизация SQL-запросов
    query(e) {
        e.client.encoding = "utf8"; // Принудительная кодировка
    },
});

const db = pgp({
    connectionString: process.env.DATABASE_URL,
    application_name: "utf8_client",
    charset: "utf8",
    client_encoding: "utf8"
});

export default db;