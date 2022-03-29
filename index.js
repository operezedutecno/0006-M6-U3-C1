const express = require('express');
const app = express();
const axios = require('axios');
const {v4: uuidV4} = require('uuid');
const fs = require('fs');
const moment = require('moment');

app.listen(8080, () => console.log("Servidor express activo http://localhost:8080"));

app.use("/bootstrap", express.static(`${__dirname}/node_modules/bootstrap/dist/`));
app.use("/jquery", express.static(`${__dirname}/node_modules/jquery/dist/`));
app.use("/assets", express.static(`${__dirname}/assets`))

const urlAPI = "https://randomuser.me/api/";

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
})

app.get("/registrar", (req, res) => {
    axios.get(urlAPI).then((response) => {
        let codigo = uuidV4().slice(0,8);
        let persona = response.data.results[0];
        //persona.id = codigo;
        //Incluir atributo con el operador de propagación
        persona = {...persona, id: codigo};
        
        let contenido = fs.readFileSync(`${__dirname}/data/personas.json`, "utf8");
        contenido = JSON.parse(contenido);
        contenido.personas.push(persona)
        contenido.ultima_modificacion = moment().format('DD/MM/YYYY HH:mm:ss');
        contenido = JSON.stringify(contenido, null, 4);
        fs.writeFileSync(`${__dirname}/data/personas.json`,contenido,"utf8");
        
        res.send(`Registro de la persona ${persona.name.first} ${persona.name.last} exitoso`)
    }).catch(error => {
        res.status(404).send("Ha ocurrido un error consultando el API Pública");
    })
});

app.get("/listado", (req, res) => {
    let contenido = fs.readFileSync(`${__dirname}/data/personas.json`, "utf8");
    contenido = JSON.parse(contenido);
    res.setHeader('content-type','application/json');
    res.json(contenido);
});


app.get("/consulta/:id", (req, res) => {
    let id = req.params.id;
    let contenido = fs.readFileSync(`${__dirname}/data/personas.json`, "utf8");
    contenido = JSON.parse(contenido);
    let persona = contenido.personas.find( persona => persona.id == id)
    res.setHeader('content-type','application/json');
    res.json(persona);
})

