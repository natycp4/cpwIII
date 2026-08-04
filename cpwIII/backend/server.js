const express = require('express');
const app = express();

//1. define uma rota (endpoint)
app.get('/', (req, res) => {
    res.send('Hello World');
});

//2. liga o servidor para escutar na porta 3000
app.listen(3000, () => {
    console.log('servidor rodando em http://localhost:3000');
});