import express from "express";

const app = express();

app.get( "/", (req,res) => {
    res.send("Bem vindo ao curso de nodeJS!")
});


app.listen(3001, () => {
    console.log("O Servidor está ativo!!");
});