let editando = false;
let usuarioEditando = null;

function salvarProfessor(event) {
    event.preventDefault();

    const usuarioNome = document.getElementById('usuario-nome').value;
    const usuarioCpf = document.getElementById('usuario-cpf').value;
    const usuarioEmail = document.getElementById('usuario-email').value;
    const usuarioTelefone = document.getElementById('usuario-telefone').value;
    const usuarioEndereco = document.getElementById('usuario-endereco').value;

    if (editando) {

        const usuario = {
            id: usuarioEditando.id,
            nome: usuarioNome,
            cpf: usuarioCpf,
            email: usuarioEmail,
            telefone: usuarioTelefone,
            endereco: usuarioEndereco,
        };

        editarProfessor(usuarioEditando.id, usuario);

        editando = false;
        usuarioEditando = null;

        document.getElementById("salvar_button").innerHTML = "Salvar professor";

        event.target.reset();

        carregarProfessor();

        return;
    }

    const usuariosAtuais = JSON.parse(localStorage.getItem('usuarios')) || [];

    let idContagem = 1;

    if (usuariosAtuais.length > 0) {
        idContagem = usuariosAtuais.length + 1;
    }

    const usuario = {
        id: idContagem,
        nome: usuarioNome,
        cpf: usuarioCpf,
        email: usuarioEmail,
        telefone: usuarioTelefone,
        endereco: usuarioEndereco,
    };

    usuariosAtuais.push(usuario);

    localStorage.setItem('usuarios', JSON.stringify(usuariosAtuais));

    event.target.reset();

    carregarProfessor();
}

function carregarProfessor() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const lista = document.getElementById('professor-lista');

    lista.innerHTML = "";

    for (const usuario of usuarios) {
        lista.innerHTML += `
            <tr class="hover:bg-slate-50 transition">
                <td class="px-6 py-4 font-medium text-slate-500">
                    #${usuario.id}
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

                <td class="px-6 py-4 text-slate-600">
                    ${usuario.endereco}
                </td>

                <td class="px-6 py-4">
                    <div class="flex justify-center gap-2">

                        <button 
                            onClick="resgatarProfessor(${usuario.id})"
                            class="px-3 py-2 rounded-lg bg-amber-100 text-amber-700 font-medium hover:bg-amber-200 transition">
                            Editar
                        </button>

                        <button 
                            onclick="deletarProfessor(${usuario.id})"
                            class="px-3 py-2 rounded-lg bg-red-100 text-red-600 font-medium hover:bg-red-200 transition">
                            Excluir
                        </button>

                    </div>
                </td>
            </tr>
        `;
    }
}

function resgatarProfessor(id) {
    const usuariosCorreto = JSON.parse(localStorage.getItem('usuarios')).filter(u => {
        return u.id == id
    })
    const usuarioNome = document.getElementById('usuario-nome').value = usuariosCorreto[0].nome;
    const usuarioCpf = document.getElementById('usuario-cpf').value = usuariosCorreto[0].cpf;
    const usuarioEmail = document.getElementById('usuario-email').value = usuariosCorreto[0].email;
    const usuarioTelefone = document.getElementById('usuario-telefone').value = usuariosCorreto[0].telefone;
    const usuarioEndereco = document.getElementById('usuario-endereco').value = usuariosCorreto[0].endereco;
    const save_button = document.getElementById("salvar_button")
    save_button.innerHTML = "Editar professor"
    editando = true

    const usuario = {
        id: id,
        nome: usuarioNome,
        cpf: usuarioCpf,
        email: usuarioEmail,
        telefone: usuarioTelefone,
        endereco: usuarioEndereco,
    };
    usuarioEditando = usuario

}

function editarProfessor(id, professor) {
    const usuariosEditar = JSON.parse(localStorage.getItem('usuarios')).map(u => {
        if (u.id == id) {
            u.nome = professor.nome;
            u.cpf = professor.cpf;
            u.email = professor.email;
            u.telefone = professor.telefone;
            u.endereco = professor.endereco;
        }

        return u;
    })
    localStorage.setItem('usuarios', JSON.stringify(usuariosEditar));
}

function deletarProfessor(id) {
    console.log(id)
    const usuariosCorreto = JSON.parse(localStorage.getItem('usuarios')).filter(u => {
        return u.id != id
    })
    console.log(usuariosCorreto)
    localStorage.setItem('usuarios', JSON.stringify(usuariosCorreto));
    carregarProfessor()
}