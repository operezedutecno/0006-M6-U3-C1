const express = require('express');
const app = express();

app.listen(8080, () => console.log("Servidor express activo http://localhost:8080"));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
})