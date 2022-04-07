<p align="center">
  <a href="" rel="noopener">
 <img width="30%" src="https://www.oracle.com/webfolder/technetwork/tutorials/tutorial/cloud/fsvc/releases/19D/images/image47.png" alt="SIGA / OFS"></a>
</p>

<h3 align="center">siga-api</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> API para mensageria integrada aos gatilhos do Oracle Field Service
    <br> 
</p>

## 📝 Table of Contents

- [Sobre a aplicação](#sobre)
- [Por onde começar?](#inicio)
- [Como usar?](#como_usar)
- [Deployment](#deployment)
- [Tecnologias utilizadas](#techs)
- [TODO](../REQUIREMENTS.md)
- [Autores](#autores)
- [Agradecimentos](#agradecimentos)

## 🧐 Sobre a aplicação <a name = "sobre"></a>

A aplicação tem como objetivo possibilitar a consulta de informações de contato dos clientes em diferentes bases de dados e enviar o link de acompanhamento de serviços através do whatsapp, complementando as funcionalidades do OFS / Where's my tech (Oracle).

## 🏁 Por onde começar? <a name = "inicio"></a>

O webservice foi construído com a utilização do Node.js (16.13.0) no ambiente de desenvolvimento corporativo e se conecta com as principais APIs e bancos de dados da companhia. Atente-se aos pré-requisitos.

### Pré-requisitos

- Node.js
- Oracle Client Database <br />
👉🏽 Veja a <a href="https://grupoequatorialenergia.sharepoint.com/sites/DevelopersEquatorial/Documentos%20Compartilhados/FAQ/FAQ%2305%20-%20Instala%C3%A7%C3%A3o%20do%20Oracle%2011g%20Client%20no%20Windows.pdf?CT=1649355679529&OR=ItemsView">FAQ#05 - Instalação do Oracle 11g Client no Windows</a>

### Instalando as dependências

Para instalar as dependências do projeto execute no seu prompt de comandos:

Com o npm:

```ssh
npm i
```

ou yarn:

```
yarn
```

Recomendamos a utilização do yarn por questões de performance.

## 🎈 Como usar? <a name="como_usar"></a>

1. Crie o arquivo `.env` na raiz do projeto. Existe um `.env.example` com instruções para as informações que deversão ser preenchidas;
2. Execute o script `dev` para executar a aplicação no ambiente de desenvolvimento. Exemplo:

```
yarn dev
```
3. Para ver a documentação no Swagger acesse `http://localhost:{API_PORT}/docs`. 

## 🚀 Deployment <a name = "deployment"></a>

Para efetuar o deploy da aplicação acesse a [FAQ#03 - Proxy reverso e deploy de aplcações Node.js com Nginx](https://grupoequatorialenergia.sharepoint.com/:b:/r/sites/DevelopersEquatorial/Documentos%20Compartilhados/FAQ/FAQ%2303%20-%20Proxy%20reverso%20e%20deploy%20de%20aplca%C3%A7%C3%B5es%20Node.js%20com%20Nginx.pdf?csf=1&web=1&e=7cuqgt).

## ⛏️ Tecnologias utilizadas: <a name = "techs"></a>

- [Node.js](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework
- [Typescript](https://www.mongodb.com/) - Superset Javascript
- [Knex.js](https://vuejs.org/) - Query builder
- [ESLint](https://vuejs.org/) - Javascript linter

## ✍️ Autores <a name = "autores"></a>

- [@robertotics4](https://github.com/robertotics4) - Desenvolvimento
- [@pedrohlisboa-261](https://github.com/pedrohlisboa-261) - Desenvolvimento

## 🎉 Agradecimentos <a name = "agradecimentos"></a>

Agradecimentos à toda a equipe de Transformação Digital pelo espírito de união e por todas as conquistas que alcançamos juntos. Trabalhar ao lado de pessoas tão companheiras e generosas é um grande privilégio.
