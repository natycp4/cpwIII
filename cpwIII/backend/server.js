const express = require('express');
const app = express();

//1. define uma rota (endpoint)
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/aluno', (req, res) => {
    res.send('rota ok')
});

app.get('/aluno:nome', (req,res) => {
    const nome = req.params.nome;
    res.send(`Olá, ${nome}`)
});

app.get('/aluno/:a/:b', (req, res) => {
    const a = Number(req.params.a)
    const b = Number(req.params.b)
    const resultado = a + b
    res.send(` o resultado é ${resultado}`)
})

//2. liga o servidor para escutar na porta 3000
app.listen(3000, () => {
    console.log('servidor rodando em http://localhost:3000');
});
