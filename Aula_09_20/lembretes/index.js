const express = require('express')
const app = express()
//converte o corpo da requisição que era puro texto
//para um objeto JSON
app.use(express.json())
const lembretes = {}
//identificador de lembretes
//a cada lembrete novo ele é incrementado
contador = 0
const axios = require("axios");

//armazenar um novo lembrete
//POST localhost:4000/lembretes {texto: "Fazer café"}
//endpoint para armazenamento de lembretes
/*a base é assim:
  {
    1: {
      contador: 1, texto: 'Fazer café'
    },
    2: {
      contador: 2, texto: 'Natação'
    }
  }
*/
app.post('/lembretes', async (req, res) => {
  contador++
  const texto = req.body.texto
  lembretes[contador] = { contador, texto }
  await axios.post("http://localhost:10000/eventos", {
    tipo: "LembreteCriado",
    dados: {
      contador,
      texto,
    },
  });
  //201 significa "created"
  res.status(201).send(lembretes[contador])
})

//obter a lista completa de lembretes
//GET localhost:4000/lembretes
//endpoint para obtenção da lista de lembretes
app.get('/lembretes', (req, res) => {
  //não pense em usar return
  console.log('executando...')
  res.send(lembretes)

})

app.post("/eventos", (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "ok" });
});

app.listen(4000, () => console.log("Lembretes. Porta 4000."))