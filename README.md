# Api de games 
Essa API foi desenvolvida com o objetivo de administrar um pequena lista de jogos
### Endpoints
GET/games
É responsavel por retornar a lista de todos os games cadastrados na base de dados em formato JSON 
parametros: sem parametros exigidos
### Respostas 
ok! 200 
Caso essa resposta ocorra a requisição vai retrnar a lista de games cadastrados em formato JSON:
```
 "games": [
        {
            "id": 20,
            "title": "Call of duty",
            "year": 2019,
            "price": 60
        },
        {
            "id": 21,
            "title": "Sea of thieves",
            "year": 2018,
            "price": 50
        },
        {
            "id": 22,
            "title": "Minecraft",
            "year": 2018,
            "price": 50
        }
    ]
}
```
### falha na autenticação ! 401 
Caso essa reposta ocorra isso indica que houve um falha no momento da autenticação motivos: senha,email incorretos ou token expirado.
### Gerando token
O token de auteticação é gerado dentro do localStorage assim que o usuario faz o login e esse token é consultado em todas as rotas
### Rotas 
#### autenticação:   POST http://localhost:8080/auth 
#### lista de jogos: GET  http://localhost:8080/games
#### atualizar um jogo especifico: PUT http://localhost:8080/games/id 
#### deletar um jogo: DELETE http://localhost:8080/games/id 
