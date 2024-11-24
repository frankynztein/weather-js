export default async function handler(req, res) {
  const { city } = req.query; // Captura la ciudad desde los parámetros de la solicitud.

  if (!city) {
      return res.status(400).json({ error: "City parameter is required." });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod !== 200) {
          return res.status(data.cod).json({ error: data.message });
      }

      res.status(200).json(data);
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
}
