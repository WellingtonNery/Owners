# PUC-Imprest

Projeto web para unificar o empréstimo de dispositivos eletrônicos (notebooks, ESP32 e outros equipamentos) na PUCPR.

## 📖 Sobre o projeto

Atualmente o processo de empréstimo de equipamentos na PUCPR é descentralizado e complicado. O **PUC-Imprest** nasce como um projeto integrado da disciplina de Desenvolvimento Web em união com Arquitetura de Banco de Dados e Engenharia de Requisitos para unificar esse controle em um único sistema, centralizando e facilitando o empréstimo dos mesmos.

Esta entrega corresponde à **primeira etapa** do projeto: uma aplicação simples com o CRUD (Criar, Ler, Atualizar, Deletar) das entidades principais do sistema, ainda sem integração com banco de dados ou backend.

## 🔗 Links

- 📂 [Repositório no GitHub](https://github.com/WellingtonNery/Owners)
- 🌐 [Site publicado](https://wellingtonnery.github.io/Owners/)

## 🚀 Tecnologias utilizadas

- **HTML** - estrutura das páginas
- **JavaScript** - lógica e manipulação de dados
- **Tailwind CSS** - estilização

## 📁 Estrutura do projeto

Cada entidade do sistema possui sua própria página de CRUD:

- `index.html` - Página inicial com menu do site
- `aluno.html` / `aluno.js` - CRUD de Alunos
- `professor.html` / `professor.js` - CRUD de Professores
- `tecnico.html` / `tecnico.js` - CRUD de Técnicos
- `equipamento.html` / `equipamento.js` - CRUD de Equipamentos
- `sala.html` / `sala.js` - CRUD de Salas

## 🧑‍💻 Como usar

Cada página de CRUD permite cadastrar, listar, editar e remover registros da respectiva entidade (aluno, professor, técnico, equipamento ou sala). A navegação entre as páginas é feita pela navbar presente no topo do site ou pelo menu principal.

## 👥 Equipe - OWNERS

| Nome | Responsabilidade |
|---|---|
| Wellington Nery Gonçalves da Costa | CRUD de Técnicos |
| João Pedro Muller Spielmann | CRUD de Professores |
| Gabriel Nicolodi Zimmerman | CRUD de Alunos (base do projeto) |
| Pedro Henrique Batista Santana | CRUD de Equipamentos |
| João Mario Yata dos Santos | CRUD de Salas |

## 📌 Status do projeto

🔧 Em desenvolvimento - primeira entrega (CRUD básico em HTML, JS e Tailwind, sem persistência em banco de dados).
