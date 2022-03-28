const express = require('express');
const app = express();

app.listen(8080, () => console.log("Servidor express activo http://localhost:8080"));

app.use("/bootstrap", express.static(`${__dirname}/node_modules/bootstrap/dist/`));
app.use("/jquery", express.static(`${__dirname}/node_modules/jquery/dist/`));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
})