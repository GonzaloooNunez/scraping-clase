const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://carlosdiazgirol.github.io/dashboard/";

app.get("/", (req, res) => {
  axios.get(url).then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      const pageTitle = $("title").text();

      const links = [];
      const imgs = [];

      $("a").each((index, element) => {
        const link = $(element).attr("href");
        links.push(link);
      });

      $("img").each((index, element) => {
        const img = $(element).attr("src");
        imgs.push(img);
      });

      res.send(`
      <h1>${pageTitle}</h1>
      <ul>
      ${links
        .map((link) => `<li><a href="${url}${link}">${link}</a></li>`)
        .join("")}
      </ul>
      <ul>
      ${imgs
        .map(
          (img) =>
            `<li><a href="https://carlosdiazgirol.github.io/dashboard/${img}">${img}</a></li>`
        )
        .join("")}
      </ul>
      `);
    }
  });
});

app.listen(3000, () => {
  console.log("Express está escuchando en el puerto 3000");
});
