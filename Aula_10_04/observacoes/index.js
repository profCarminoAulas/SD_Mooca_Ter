const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
//aplicamos um middleware
app.use(express.json());

const axios = require("axios");

const observacoesPorLembreteId = {};

const funcoes = {
  ObservacaoClassificada: (observacao) => {
    const observacoes = observacoesPorLembreteId[observacao.lembreteId];
    const obsParaAtualizar = observacoes.find((o) => o.id === observacao.id);
    obsParaAtualizar.status = observacao.status;
    axios.post("http://localhost:10000/eventos", {
      tipo: "ObservacaoAtualizada",
      dados: {
        id: observacao.id,
        texto: observacao.texto,
        lembreteId: observacao.lembreteId,
        status: observacao.status,
      },
    });
  },
};

//localhost:5000/lembretes/abcd/observacoes
app.post("/lembretes/:id/observacoes", async (req, res) => {
  const idObs = uuidv4();
  //desestruturação do Javascript
  //req.body = {texto: "Comprar açúcar"}
  // const texto = req.body.texto
  const { texto } = req.body;
  //req.params é um objeto que representa os parâmetros da requisição
  //o nome id representa o id contido na URL. req.params.id
  const observacoesDoLembrete = 
      observacoesPorLembreteId[req.params.id] || [];

  observacoesDoLembrete.push({
    id: idObs,
    texto,
    status: "aguardando"
  });

  observacoesDoLembrete.push({ id: idObs, texto });
  observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;

  await axios.post("http://localhost:10000/eventos", {
    tipo: "ObservacaoCriada",
    dados: {
      id: idObs,
      texto,
      lembreteId: req.params.id,
      status: "aguardando"
    }
  });
  //201: CREATED
  res.status(201).send(observacoesDoLembrete);
});

//localhost:5000/lembretes/:id/observacoes
app.get("/lembretes/:id/observacoes", (req, res) => {
  res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.post("/eventos", (req, res) => {
  try {
    funcoes[req.body.tipo](req.body.dados);
  } catch (err) {}
  res.status(200).send({ msg: "ok" });
});

app.listen(5000, () => {
  console.log("Observações. Porta 5000.");
});
