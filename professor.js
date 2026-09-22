let editando = false;

let professorEditando = null;

function salvarProfessor(event) {

    event.preventDefault();

    const professorNome = document.getElementById('usuario-nome').value;
    const professorCpf = document.getElementById('usuario-cpf').value;
    const professorEmail = document.getElementById('usuario-email').value;
    const professorTelefone = document.getElementById('usuario-telefone').value;
    const professorEndereco = document.getElementById('usuario-endereco').value;

    if (editando) {

        const professor = {
            id: professorEditando.id,
            nome: professorNome,
            cpf: professorCpf,
            email: professorEmail,
            telefone: professorTelefone,
            endereco: professorEndereco,
        };

        editarProfessor(professorEditando.id, professor);

        editando = false;
        professorEditando = null;

        document.getElementById("salvar_button").innerHTML = "Salvar professor";

        event.target.reset();
        carregarProfessor();

        return;
    }

    const professoresAtuais = JSON.parse(localStorage.getItem('professores')) || [];

    let idContagem = 1;

    if (professoresAtuais.length > 0) {
        idContagem = professoresAtuais.length + 1;
    }

    const professor = {
        id: idContagem,
        nome: professorNome,
        cpf: professorCpf,
        email: professorEmail,
        telefone: professorTelefone,
        endereco: professorEndereco,
    };

    professoresAtuais.push(professor);

    localStorage.setItem('professores', JSON.stringify(professoresAtuais));

    event.target.reset();

    carregarProfessor();
}

function carregarProfessor() {

    const professores = JSON.parse(localStorage.getItem('professores')) || [];

    const lista = document.getElementById('professor-lista');

    lista.innerHTML = "";

    for (const professor of professores) {

        lista.innerHTML += `

            <tr class="hover:bg-slate-50 transition">

                <td class="px-6 py-4 font-medium text-slate-500">
                    #${professor.id}
                </td>

                <td class="px-6 py-4 font-semibold text-slate-900">
                    ${professor.nome}
                </td>

                <td class="px-6 py-4 text-slate-600">
                    ${professor.cpf}
                </td>

                <td class="px-6 py-4 text-slate-600">
                    ${professor.email}
                </td>

                <td class="px-6 py-4 text-slate-600">
                    ${professor.telefone}
                </td>

                <td class="px-6 py-4 text-slate-600">
                    ${professor.endereco}
                </td>

                <td class="px-6 py-4">
                    <div class="flex justify-center gap-2">

                        <button 
                            onclick="resgatarProfessor(${professor.id})"
                            class="px-3 py-2 rounded-lg bg-amber-100 text-amber-700 font-medium hover:bg-amber-200 transition">
                            Editar
                        </button>

                        <button 
                            onclick="deletarProfessor(${professor.id})"
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

    const professores = JSON.parse(localStorage.getItem('professores')) || [];

    const professorCorreto = professores.filter(professor => {
        return professor.id == id;
    });

    document.getElementById('usuario-nome').value = professorCorreto[0].nome;
    document.getElementById('usuario-cpf').value = professorCorreto[0].cpf;
    document.getElementById('usuario-email').value = professorCorreto[0].email;
    document.getElementById('usuario-telefone').value = professorCorreto[0].telefone;
    document.getElementById('usuario-endereco').value = professorCorreto[0].endereco;

    const save_button = document.getElementById("salvar_button");

    save_button.innerHTML = "Editar professor";

    editando = true;

    professorEditando = professorCorreto[0];
}

function editarProfessor(id, professor) {

    const professoresEditar = JSON.parse(localStorage.getItem('professores')).map(p => {

        if (p.id == id) {

            p.nome = professor.nome;
            p.cpf = professor.cpf;
            p.email = professor.email;
            p.telefone = professor.telefone;
            p.endereco = professor.endereco;
        }

        return p;

    });

    localStorage.setItem('professores', JSON.stringify(professoresEditar));
}

function deletarProfessor(id) {

    const professoresCorreto = JSON.parse(localStorage.getItem('professores')).filter(professor => {
        return professor.id != id;
    });

    localStorage.setItem('professores', JSON.stringify(professoresCorreto));

    carregarProfessor();
}

carregarProfessor();