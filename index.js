import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Получение всех слипов
app.get("/slips", async (req, res) => {
    try {
        const slips = await db.any("SELECT * FROM slips");
        res.json(slips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Добавление нового слипа
app.post("/slips", async (req, res) => {
    try {
        const { name, coating, with_trailer, paid, lon, lat } = req.body;
        const newSlip = await db.one(
            "INSERT INTO slips (name, geom, coating, with_trailer, paid) VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326), $4, $5, $6) RETURNING *",
            [name, lon, lat, coating, with_trailer, paid]
        );
        res.json(newSlip);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));

// Разрешаем запросы с фронтенда
app.use(cors());




