const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

//o token vai ser gerado com base nessa hash
// ele esta esposto nesse projeto porque é so para fins didáticos 

const JWTSecret = "hjshdfkhdkfhdfkheiufhefiefiecefssdsdwe";

//sem o cors a maioria das requisições externas seram bloqueadas então é importate lembrar de instalar ele na pi
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var DB ={
    GAMES:[
        {
            id:20,
            title:'Call of duty',
            year:2019,
            price:60
        },
        {
            id:21,
            title:'Sea of thieves',
            year:2018,
            price:50
        },
        {
            id:22,
            title:'Minecraft',
            year:2018,
            price:50
        }

    ],
    users:[
        {
            id: 1,
            name:"Victor lima",
            email:'victordev@guiadoprogramador.com',
            password:"nodejs"
        },
        {
            id: 2,
            name:"Guilherme",
            email:'gui@gmail.com',
            password:"java123"

        }
    ]
}


//rota para usuarios 

app.post("/auth",(req,res)=>{

     var {email,password} = req.body;

     if(email != undefined){

            var user = DB.users.find(u => u.email);

            if(user != undefined){

                if(user.password == password){

                    //cada usuario tem um token diferente 
                    //mas para ligar ele ao usuario eu tenho que usar dados do usuario
                    //para gerar ele no caso eu vou usar id e email
                    //a função jwt.sign() recebe 4 parametros
                    // 1 -> quais dados ligam o usuario ao token
                    // 2 -> a achave mestra que gera os tokens
                    // 3 -> o tempo que esse token leva para expirar(no caso eu coloquei 48 horas)
                    //4 -> a função de call back que entrega o token ao usuario atraves de json 
                    
                    jwt.sign({id: user.id, email: user.email},JWTSecret,{expiresIn:'48h'},(err,token)=>{

                        if(err){
                            res.status(500);
                            res.json({err:"falha interna"})
                        }else{
                            res.status(200);
                            res.json({token:token});
                        }
                         
                    });


                }else{



                    res.status(401);
                    res.json({err:'Credenciais invalidas'})
                }

            }else{
                res.status(404);
                res.json({err:'E-mail não existe'})
            }


        }else{

            res.status = (400);
            res.json({err:'E-mail invalido'})
     }

})




//rota de listagem geral
app.get("/games",(req,res)=>{

    res.statusCode = 200; //retornado o status da requisição 200 signifca ok que esta tudo certo 
    res.json(DB.GAMES); //retornando o banco de dados em json
    
});

//rota de seleção unica 

app.get("/games/:id",(req,res)=>{

    if(isNaN(req.params.id)){

        res.sendStatus(400); // se op id não for uma numero ele retorna o status bad request erro de sintaxe

    }else{

        //recebendo o id e convertendo ele para inteiro
        
        var id = parseInt(req.params.id);

        //fazendo um pesquisa no array de jogos por um objeto que tenha o id igual a o que veio na requisição
        // se houver um jogo com o mesmo id ele vai para variavel game  

        var game = DB.GAMES.find(g => g.id == id);

        //se o game for diferente de undefined 
        if(game != undefined){

            res.statusCode = 200; //retono o status ok 
            res.json(game); // e retorno o jogo no formato json

        }else{

             //ele ate acessa o servidor mas ele não acha oque esta porcurando por isso ele retorna 404
             // se não eu retorno 404 "o recurso solicitado não foi encontrado"
            res.sendStatus(404); 

        }

    }

})


//rota de cadastro 

app.post("/games",(req,res)=>{

    //Desestruturando o body da requisição
    //para separar os valores do objeto body 
    var {title,price,year} = req.body;
   
    // criando um novo objeto dentro do arrys de games 
    // o id eu inventei porque eu nãotenho um gerador de id 
    // automatico nesse momento 
    
    DB.GAMES.push({
        id:2323,
        title,
        price,
        year
    })

});

//rota para apagar um jogo 

app.delete("/games/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400)

    }else{

        var id = parseInt(req.params.id);
        var index = DB.GAMES.findIndex(g=> g.id == id);

        if(index == -1){
            res.sendStatus(404);

        }else{
            DB.GAMES.splice(index,1);
            res.sendStatus(200);
        }
   }
});

//rota de edição 

app.put("/games/:id",(req,res)=>{

    if(isNaN(req.params.id)){

        res.sendStatus(400);

    }else{

        var id = parseInt(req.params.id);
        var game = DB.GAMES.find(g=> g.id == id);

        if(game != undefined){

            var {title,price,year} = req.body;

            if(title != undefined){
                game.title = title;
            }
            if(price != undefined){
                game.price = price;
            }
            if(year != undefined){
                game.year = year;
            }

            res.sendStatus(200);


        }

        
   }
});

























app.listen(8080,()=>{
    console.log("Api Rodando");
})