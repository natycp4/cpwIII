const express = require('express');
const app = express();

app.use(express.json());

jogos = [
    { id: 1, titulo: "StardewValley", genero: "rpg", ano: "2016", nota: 10},
    { id: 2, titulo: "AikaOnline", genero: "mmorpg", ano: "2009", nota: 8},
    { id: 3, titulo: "AmorDoce", genero: "otome", ano: "2011", nota: 8}
] ;
//id, titulo, genero, ano e nota.

app.get('/jogos', (req,res) =>{
    res.status(200).json(jogos)
});


app.get('/jogos/melhores', (req,res) => {
    const melhores = jogos.filter(m => m.nota >= 8)
    res.send(melhores)

})


app.get('/jogos/:id', (req,res) =>{
    const jogo = jogos.find(j => j.id == req.params.id)
    if(!jogo){
        return res.status(404).json({mensagem:"Jogo não encontrado!"})
    } res.json(jogo)
    
});


app.post('/jogo', (req, res) => {
    const { titulo, genero, ano, nota } = req.body
    if(!titulo || !genero || !ano)
        return res.status(400).json({mensagem:"Preencha todos os campos!"})
    const novoJogo = {
        id: jogos.length + 1,
        titulo,
        genero,
        ano,
        nota
    }

    jogos.push(novoJogo)
    res.status(201).json(novoJogo) 
});

app.put('/jogos/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const {titulo,genero, ano, nota} = req.body
    const jogoId = jogos.find(j => j.id == id)

    if(!jogoId){
        return res.status(404).json({mensagem: "Jogo não encontrado!"})
    } else if(!titulo || !genero || !ano || !nota){
        return res.status(400).json({mensagem:" Preencha todos os campos!"})
    }
    jogoId.titulo = titulo;
    jogoId.genero = genero;
    jogoId.ano = ano;
    jogoId.nota = nota; 
    res.json({ mensagem: "Jogo atualizado!", jogoId: jogoId})
        
});

app.delete('/jogos/:id', (req,res) => {{
    const id = parseInt(req.params.id)
    const novaLista = jogos.findIndex(j => j.id == id)

     if(novaLista === -1){
        return res.status(404).send('Jogo não encontrado!')
     }
    
     jogos.splice(novaLista, 1)
     res.json({mensagem: "Jogo removido!"})


}})


app.listen(3001,() =>{
 console.log('API rodando na porta 3001!')
})