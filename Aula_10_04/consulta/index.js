const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");

const baseConsulta = {};

const funcoes = {
  LembreteCriado: (lembrete) => {
    //lembrete = {contador: 1, texto: "Fazer café"}
    baseConsulta[lembrete.contador] = lembrete;
  },
  ObservacaoCriada: (observacao) => {
    //observacao = {id: '123456', texto: "abc", lembreteId: 1}
    const observacoes =
      baseConsulta[observacao.lembreteId]["observacoes"] || [];
    observacoes.push(observacao);
    baseConsulta[observacao.lembreteId]["observacoes"] = observacoes;
  },
  ObservacaoAtualizada: (observacao) => {
    const observacoes = baseConsulta[observacao.lembreteId]["observacoes"];
    const indice = observacoes.findIndex((o) => {
      o.id === observacao.id;
    });
    observacoes[indice] = observacao;
  },
};

/* const funcoes = {
  tipoEvento: () => {},
  LembreteCriado: (lembrete) => {},
  ObservacaoCriada: (observado) => {}
}
const operacoes = {
  soma: (a, b) => a + b
}
const res = operacoes.soma(2, 3)
*/

//localhost:6000/lembretes
app.get("/lembretes", (req, res) => {
  res.send(baseConsulta);
});
//localhost:6000/eventos
app.post("/eventos", (req, res) => {
  //aqui a gente precisa ir montando a base pouco a pouco...
  //req.body: {tipo: LembreteCriado , dados: {contador: 1, texto: "Fazer café"} }
  //req.body: {tipo: ObservacaoCriada, dados: {id: 123456, texto: "Acucar", lembreteId: 1}}
  // if (req.body.tipo === "LembreteCriado"){

  // }
  // else
  //funcoes[req.body.tipo](req.body.dados);
  //res.send(baseConsulta);
  // foi incrementado o try/cath
  try {
    funcoes[req.body.tipo](req.body.dados);
  } catch (err) {}
  res.status(200).send({ msg: "ok" });
});

app.listen(6000, async () => {
  console.log("Consultas. Porta 6000");
  const resp = await axios.get("http://localhost:10000/eventos");
  //axios entrega os dados na propriedade data
  resp.data.forEach((valor, indice, colecao) => {
    try {
      funcoes[valor.tipo](valor.dados);
    } catch (err) {}
  });
});

