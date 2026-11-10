let editando = false;
let usuarioEditando = null;
let usuarios = [];

function alternarBotoes(emEdicao) {
    document.getElementById("salvar_button").classList.toggle("hidden", emEdicao);
    document.getElementById("alterar_button").classList.toggle("hidden", !emEdicao);
}

async function salvarAluno(event) {
    event.preventDefault();

    const usuarioNome = document.getElementById('usuario-nome').value;
    const usuarioCpf = document.getElementById('usuario-cpf').value;
    const usuarioEmail = document.getElementById('usuario-email').value;
    const usuarioTelefone = document.getElementById('usuario-telefone').value;
    const usuarioSenha = document.getElementById('usuario-senha').value;
    const usuarioPronomes = document.getElementById('usuario-pronomes').value;
    const usarioTipo = document.getElementById('usuario-tipo').value;

    if (editando) {

        const usuario = {
            id: usuarioEditando.id,
            nome: usuarioNome,
            cpf: usuarioCpf,
            email: usuarioEmail,
            senha: usuarioSenha,
            telefone: usuarioTelefone,
            pronomes: usuarioPronomes,
            tipo: usarioTipo
        };

        await editarAluno(usuarioEditando.id, usuario);

        editando = false;
        usuarioEditando = null;

        alternarBotoes(false);

        event.target.reset();

        carregarAluno();

        return;
    }

    const usuario = {
        nome: usuarioNome,
        cpf: usuarioCpf,
        email: usuarioEmail,
        senha: usuarioSenha,
        telefone: usuarioTelefone,
        pronomes: usuarioPronomes,
        tipo: usarioTipo
    };

    const dados = new FormData();
    dados.append('nome', usuario.nome);
    dados.append('cpf', usuario.cpf);
    dados.append('email', usuario.email);
    dados.append('senha', usuario.senha);
    dados.append('telefone', usuario.telefone);
    dados.append('pronomes', usuario.pronomes);
    dados.append('tipo', usuario.tipo);

    const resposta = await fetch('php/usuario_php/usuario_novo.php', {
        method: 'POST',
        body: dados
    });
    const retorno = await resposta.json();

    alert(retorno.mensagem);

    event.target.reset();

    await carregarAluno();
}

async function carregarAluno() {
    const resposta = await fetch('php/usuario_php/usuario_get.php');
    const retorno = await resposta.json();

    usuarios = [];
    if (retorno.status === 'ok') {
        usuarios = retorno.data;
    }

    const lista = document.getElementById('aluno-lista');

    lista.innerHTML = "";

    for (const usuario of usuarios) {
        lista.innerHTML += `
            <tr class="hover:bg-slate-50 transition">
                <td class="px-6 py-4 font-medium text-slate-500">
                    #${usuario.id_usuario}
                </td>

                <td class="px-6 py-4 font-semibold text-slate-900">
                    ${usuario.nome}
                </td>

                <td class="px-6 py-4 text-slate-600">
                    ${usuario.cpf}
                </td>

                <td class="px-6 py-4 text-slate-600">
                    ${usuario.email}
                </td>

                <td class="px-6 py-4 text-slate-600">
                    ${usuario.telefone}
                </td>

                <td class="px-6 py-4">
                    <div class="flex justify-center gap-2">

                        <button 
                            onClick="resgatarAluno(${usuario.id_usuario})"
                            class="px-3 py-2 rounded-lg bg-amber-100 text-amber-700 font-medium hover:bg-amber-200 transition">
                            Editar
                        </button>

                        <button 
                            onclick="deletarAluno(${usuario.id_usuario})"
                            class="px-3 py-2 rounded-lg bg-red-100 text-red-600 font-medium hover:bg-red-200 transition">
                            Excluir
                        </button>

                    </div>
                </td>
            </tr>
        `;
    }
}

async function resgatarAluno(id) {
    const usuariosCorreto = usuarios.filter(u => {
        return u.id_usuario == id
    })
    const usuarioNome = document.getElementById('usuario-nome').value = usuariosCorreto[0].nome;
    const usuarioCpf = document.getElementById('usuario-cpf').value = usuariosCorreto[0].cpf;
    const usuarioEmail = document.getElementById('usuario-email').value = usuariosCorreto[0].email;
    const usuarioTelefone = document.getElementById('usuario-telefone').value = usuariosCorreto[0].telefone;
    const usuarioSenha = document.getElementById('usuario-senha').value = usuariosCorreto[0].senha || "";
    const usuarioPronomes = document.getElementById('usuario-pronomes').value = usuariosCorreto[0].pronomes || "";
    const usuarioTipo = document.getElementById('usuario-tipo').value = usuariosCorreto[0].tipo || "";
    alternarBotoes(true)
    editando = true

    const usuario = {
        id: id,
        nome: usuarioNome,
        cpf: usuarioCpf,
        email: usuarioEmail,
        senha: usuarioSenha,
        telefone: usuarioTelefone,
        pronomes: usuarioPronomes,
        tipo: usuarioTipo,
    };
    usuarioEditando = usuario

}

async function editarAluno(id, aluno) {
    const dados = new FormData();
    dados.append('nome', aluno.nome);
    dados.append('cpf', aluno.cpf);
    dados.append('email', aluno.email);
    dados.append('senha', aluno.senha);
    dados.append('telefone', aluno.telefone);
    dados.append('pronomes', aluno.pronomes);
    dados.append('tipo', aluno.tipo);

    const resposta = await fetch(`php/usuario_php/usuario_alterar.php?id=${id}`, {
        method: 'POST',
        body: dados
    });
    const retorno = await resposta.json();

    alert(retorno.mensagem);
}

async function deletarAluno(id) {
    console.log(id)
    const resposta = await fetch(`php/usuario_php/usuario_excluir.php?id=${id}`);
    const retorno = await resposta.json();

    alert(retorno.mensagem);

    await carregarAluno()
}

carregarAluno();
