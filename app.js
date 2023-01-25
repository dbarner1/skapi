const express = require('express')
const app = express();

app.get("/", (req, res) => {
  res.send(200, "<h1>Just a simple homepage</h1>")
})

app.listen(5000);