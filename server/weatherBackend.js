const http = require("http");
const fetch = require("node-fetch"); // important for deployment
require("dotenv").config();

const port = process.env.PORT || 5001;
const apiKey = process.env.API_KEY;

const fetchForecastByCity = (city_name, res) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      city_name
    )}&appid=${apiKey}`
  )
    .then((apiRes) => apiRes.json())
    .then((data) => {
      console.log(`city_name: ${city_name}`);
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(data));
    })
    .catch(() => {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ message: "Unable to fetch weather data" }));
    });
};

let server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  if (req.url === "/" && req.method === "POST") {
    let requestBody = "";

    req.on("data", (chunk) => {
      requestBody += chunk.toString();
    });

    req.on("end", () => {
      let parsedBody = {};
      try {
        parsedBody = requestBody ? JSON.parse(requestBody) : {};
      } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Invalid JSON body." }));
        return;
      }

      const city_name = (parsedBody.city_name || "delhi").trim();
      fetchForecastByCity(city_name, res);
    });
    return;
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});