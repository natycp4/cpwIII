const express = require('express')
const fs = require('fs')
const { appendFile, appendFileSync, existsSync } = require('node:fs')
const path = require('node:path')

const app = express()
app.use(express.json())

//caminho para o arquivo json
const caminhoParaoArquivo = path.join(__dirname, 'Dados', 'jogos.json');
const caminhoParaHistorico = path.join(__dirname, 'historico.txt');

//funçao para ler os jogos do arquivo
const lerJogos = () => {
    try{
        const conteudo = fs.readFileSync(caminhoParaoArquivo, 'utf-8')
        return JSON.parse(conteudo)
    }
    catch (erro){
        console.log('Erro ao ler o arquivo!', erro)
        return [];
    }
};

//funçao para salvar os jogos no arquivo
const salvarJogos = (jogos) => {
    try{
        const conteudo = JSON.stringify(jogos, null, 2)
        fs.writeFileSync(caminhoParaoArquivo, conteudo, 'utf-8')
    }
    catch (erro){
        console.log('Erro ao salvar o arquivo!', erro)
        throw erro
    }
};


// funçao para registrar no historico sem apagar o anterior
const registrarHistorico = (msg) =>{
   try{ 
      fs.appendFileSync(caminhoParaHistorico, `${msg}\n`, 'utf-8')
   }
    catch (erro) {
        console.log("Erro ao escrever no histórico!", erro);
   }
};


// GET
app.get('/jogos', (req,res)=>{
    const jogos = lerJogos()
    res.send(jogos)
});


// GET historico
app.get('/historico', (req,res)=>{
    try{
        if(!existsSync(caminhoParaHistorico)){
            return res.send('Histórico vazio')
        }
      const conteudo = fs.readFileSync(caminhoParaHistorico, 'utf-8')
      res.send(conteudo)

    } catch(erro){
        res.send('Erro ao ler o histórico!')
    }
})



// POST com try/catch
app.post('/jogos', (req,res)=>{
    try{
            const {titulo, genero, ano, nota} = req.body
    if(!titulo || !genero || !ano){
        return res.status(400).json({mensagem: "Preencha todos os campos!"})
    }

    const jogos = lerJogos()
    const novoJogo = {
        id: jogos.length +1,
        titulo: titulo,
        genero: genero,
        ano: ano,
        nota: nota
    } 
    jogos.push(novoJogo)
    salvarJogos(jogos)

    registrarHistorico(`JOGO CADASTRADO: ${novoJogo.titulo}`);   //vai registrar no historico quando criado
        res.status(201).send(novoJogo)
    }
        catch(erroInterno){
            console.error('Erro interno detectado na rota POST:', erroInterno.message)
            res.status(500).json({erro: "Erro interno no servidor.",
                mensagem: "Não foi possivel salvar o jogo devido a falha no sistema."
            })
        }
});


// PUT
app.put('/jogos/:id', (req,res)=>{
    const id = req.params.id
    const {titulo,genero, ano, nota} = req.body

    const jogos = lerJogos()
    const j = jogos.find(j => j.id == id)

    if(!j){
        return res.status(404).json({mensagem: "Jogo não encontrado!"})
    }else if(!titulo || !genero || !ano || !nota){
        return res.status(400).json({mensagem: "Preencha todos os campos!"})
    }
   j.titulo = titulo,
   j.genero = genero,
   j.ano = ano,
   j.nota = nota

   salvarJogos(jogos)

   registrarHistorico(`JOGO ATUALIZADO: ${j.titulo}`);

   res.json({mensagem: "Jogo atualizado!", jogos:j})

});


//DELETE
app.delete('/jogos/:id', (req,res)=>{
    const id = req.params.id
    const jogos = lerJogos()
    
    const novaLista = jogos.findIndex(n => n.id == id)

    if(novaLista === -1){
        return res.status(404).json({mensagem: "Jogo não encontrado!"})
    }
     jogos.splice(novaLista, 1)
    salvarJogos(jogos)

    registrarHistorico('JOGO REMOVIDO');

    res.json({mensagem: "Jogo removido!"})

});


app.listen(3000, () =>{
    console.log('Servidor rodando na porta 3000!')
})