export default async function handler(req, res) {
  const { endPoint, city } = req.query;
  if (!city || !endPoint) {
      return res.status(400).json({ error: "Both 'city' and 'endPoint' parameters are required." });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

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
