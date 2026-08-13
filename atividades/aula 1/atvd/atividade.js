const express = require('express');
const app = express();

app.get('/', (req,res) =>{
    res.send(
     `
     <h1>Atividade</h1>
     <a href='/inicio'>Inicio</a><br>
     <a href='/status'>Status</a><br>
     <a href='/soma/4/6'>Soma</a><br>
     <a href='/subtracao/50/33'>Subtração</a><br>
     <a href='/multiplicacao/3/4'>Multiplicação</a>
     `
    )
});

app.get('/inicio', (req,res) =>{
    res.send('Bem-Vindo!')
});

app.get('/status', (req,res) =>{
    res.json({servidor: 'Rodando!' })
});

app.get('/soma/:a/:b', (req, res) =>{
   const a = Number(req.params.a)
   const b = Number(req.params.b)
   const resultado = a + b 
   res.send(`o resultado da soma é: ${resultado} `)
});

app.get('/subtracao/:a/:b', (req, res) =>{
   const a = Number(req.params.a)
   const b = Number(req.params.b)
   const resultado = a - b 
   res.send(`o resultado da subtração é: ${resultado} `)
});

app.get('/multiplicacao/:a/:b', (req, res) =>{
   const a = Number(req.params.a)
   const b = Number(req.params.b)
   const resultado = a * b 
   res.send(`o resultado da multiplicação é: ${resultado} `)
})

app.listen(3000, () =>{
    console.log('serviddor rodando em http://localhost:3000')
})