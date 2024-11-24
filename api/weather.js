export default async function handler(req, res) {
  const { endPoint, city } = req.query;

  if (!city || !endPoint) {
      return res.status(400).json({ error: "Both 'city' and 'endPoint' parameters are required." });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
      return res.status(500).json({ error: "API key is missing. Please set it in the environment variables." });
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!response.ok) {
          console.error("API response error:", data);
          return res.status(response.status).json({ error: data.message || "Error fetching data from OpenWeather API." });
      }

      res.status(200).json(data);
  } catch (error) {
      console.error("Error fetching data from OpenWeather API:", error.message);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
