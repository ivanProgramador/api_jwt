/*

Quando um usuario acessa um sistema para identifica-lo usamos usuario e senha,
depois que elee insere o usuário e senha uma sessão é criada e enquanto essa 
sessão durar,o susario pode continuar acessando.

Porém no acesso as apis na maioria das vezes não são pessoas que acessam, 
não existe um login e senha para autenticar um usuario porque o susrio é 
um sistema ou outra api que precisa dos dados para operar.

É ai que entra o JWT Json Web Token como naõ tem u susuario que digitar login 
e senha as validações acontecem atraves de tokens que são chaves de identificação 
que autenticam as apis e sistemas quando esses tentam acessar as apis.

Depois que o token é gerado para usar ele no postman antes de fazer a requisição
gere o token depois 

1 - acesse a ba athorization 
2 - escolha a opção Barrer  token 
3 - dentro do campo token coloque o token que foi gerado pela rota auth 



*/