const express = require('express');
const app = express();

app.get('/', (req,res) => {
        res.send(
            `<h1>Menu</h1>
            <a href='/aluno/milena'>Ir para aluno</a><br>
            <a href='/status'>Ir para status
            `
        )
})

app.get('/status', (req,res) => {
    res.json({
        servidor: 'online',
        disciplina: 'cpwIII',
        professora: 'milena',
        hora: new Date().toLocaleString()
    });
})



//2. liga o servidor para escutar na porta 3000
app.listen(3000, () => {
    console.log('servidor rodando em http://localhost:3000');
});
