# PUCImprest

Projeto web para unificar o empréstimo de dispositivos eletrônicos (notebooks, ESP32 e outros equipamentos) na PUCPR.

## 📖 Sobre o projeto

Atualmente o processo de empréstimo de equipamentos na PUCPR é descentralizado e complicado. O **PUCImprest** nasce como um projeto integrado da disciplina de Desenvolvimento Web em união com Arquitetura de Banco de Dados e Engenharia de Requisitos para unificar esse controle em um único sistema, centralizando e facilitando o empréstimo dos mesmos.

Esta entrega corresponde à **segunda etapa** do projeto: o front-end da versão anterior agora está integrado a um **backend em PHP** e a um **banco de dados MySQL**, e os dados passam a ser persistidos. Nesta versão, os CRUDs (Criar, Ler, Atualizar, Deletar) de Aluno, Professor e Técnico foram unificados em um único **CRUD de Usuários**, e foram adicionados os CRUDs de **Ocorrências** e **Permissões**.

## 🔗 Links

- 📂 [Repositório no GitHub](https://github.com/WellingtonNery/Owners)

## 🚀 Tecnologias utilizadas

- **HTML** - estrutura das páginas
- **JavaScript** - lógica das telas e comunicação com o backend (`fetch`)
- **Tailwind CSS** - estilização das páginas de CRUD
- **Bootstrap 5 e Bootstrap Icons** - estilização do menu principal (`index.html`)
- **PHP (mysqli)** - backend, com consultas preparadas
- **MySQL** - banco de dados (`controle_equipamentos`)

## 📁 Estrutura do projeto

Cada entidade do sistema possui sua própria página de CRUD, seu arquivo JavaScript e uma pasta com os scripts PHP correspondentes:

- `index.html` - Página inicial com menu do site
- `usuario.html` / `usuario.js` - CRUD de Usuários (tipo: Aluno, Professor ou Técnico)
- `equipamento.html` / `equipamento.js` - CRUD de Equipamentos
- `sala.html` / `sala.js` - CRUD de Salas
- `ocorrencia.html` / `ocorrencia.js` - CRUD de Ocorrências
- `permissao.html` / `permissao.js` - CRUD de Permissões
- `img/` - Imagens do site (logo da PUCPR)
- `php/` - Backend:
  - `conexao.php` - Conexão com o banco de dados
  - `usuario_php/`, `equipamento_php/`, `sala_php/`, `ocorrencia_php/`, `permissao_php/` - Scripts de cada CRUD (`*_novo`, `*_get`, `*_alterar`, `*_excluir`)

## 🗄️ Banco de dados

O sistema usa o banco `controle_equipamentos` (MySQL), configurado em `php/conexao.php`. As tabelas utilizadas pelo código são:

| Tabela | Campos usados |
|---|---|
| `usuario` | id_usuario, nome, cpf, email, senha, telefone, pronomes |
| `aluno`, `professor`, `tecnico` | id_usuario (cada usuário é gravado em uma delas, conforme o tipo) |
| `sala` | id_sala, nome, bloco, andar |
| `equipamento` | id_equipamento, id_sala_origem, tipo |
| `ocorrencia` | id_ocorrencia, descricao, tipo |
| `permissao` | id_permissao, nome, descricao, recurso, acao |

As senhas dos usuários são armazenadas com hash (`password_hash`).

## 🧑‍💻 Como usar

1. Crie o banco `controle_equipamentos` e suas tabelas em um servidor local com PHP e MySQL.
2. Confira usuário, senha e porta do MySQL em `php/conexao.php` (por padrão: `root`, sem senha, `localhost:3306`).
3. Coloque a pasta do projeto no diretório do servidor e acesse o `index.html`.

Cada página de CRUD permite cadastrar, listar, editar e remover registros da respectiva entidade (usuário, equipamento, sala, ocorrência ou permissão). A navegação entre as páginas é feita pela navbar presente no topo do site ou pelo menu principal.

## 👥 Equipe - OWNERS

| Nome | Responsabilidade |
|---|---|
| Wellington Nery Gonçalves da Costa | CRUD de Usuários |
| João Pedro Muller Spielmann | CRUD de Ocorrências |
| João Mario Yata dos Santos | CRUD de Permissões |
| Gabriel Nicolodi Zimmermann | CRUD de Salas |
| Pedro Henrique Batista Santana | CRUD de Equipamentos |

## 📌 Status do projeto

🔧 Em desenvolvimento - segunda entrega (CRUDs integrados a backend PHP e banco de dados MySQL).