import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Servir archivos estaticos del frontend
app.use(express.static("public"));

//Endpoint para clima
app.get("/clima", async (req, res) => {
  const ciudad = req.query.ciudad || "Madrid";
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=es`);
   	const data = await response.json();
   	res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clima" });
  }
});

app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`));