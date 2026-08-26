const express = require('express');
const fs = require('node:fs');
const path = require('node:path');

const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

 //2.rota post para receber e salvar o historico
 app.post('/estudo', (req,res) =>{
    const {materia, aprendizado} = req.body;
    const linha = `${materia}: ${aprendizado}\n`;
    fs.appendFileSync('diario.txt', linha, 'utf-8');
    //redireciona para a tela do diario
    res.redirect('/historico');
 });

 //3. rota get para ler o arquivo e exibir 
 app.get('/historico', (req,res) =>{
    if (!fs.existsSync('historico.txt')){
        return res.send('Nenhum  diario cadastrado ainda. <br><br> <a href='/'>Enviar primeiro diario</a>');

    }
    const conteudo = fs.readFileSync('diario.txt', 'utf-8');
    res.send(`
        <h1>Diario de aprendizado</h1>
        <pre>${conteudo}</pre>

        <a href='/'>Enviar outro diario </a>
        `);
 })
 app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));