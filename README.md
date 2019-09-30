### Requisitos

- Node

### Para executar utilize os comandos abaixo

`git clone https://github.com/jerrymartins/node-aws-s3-dynamodb.git`

`cd node-aws-s3-dynamodb/`

`existe um arquivo .env.example com variáveis para preencher, renomeei este arqui para .env e preencha os dados`

`npm run install`
`node ./app.js`

### Link de acesso

`http://localhost:5000/api`

### Observações
O back end faz upload dos arquivos de imagem para a S3 da aws, que retorna o endereço
do arquivo salvo.
Infelismente o tempo de upload de arquivos grandes ficou grande e inviável de se manter no front end
desenvolvido, sendo assim é necessário enviar os arquivos de vídeo diretamento pelo dashboard da amazon, 
ou desenvolver uma solução separada para tratamento e envio de vídeos, então no front end informar apenas 
a url do vídeo a ser associado ao filme.

# api TRAILIX
