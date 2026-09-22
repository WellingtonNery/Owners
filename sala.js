let editando = false;
let salaEditando = null;

function salvarSala(event) {
    event.preventDefault();

    const salaNome = document.getElementById('sala-nome').value;
    const salaBloco = document.getElementById('sala-bloco').value;
    const salaAndar = document.getElementById('sala-andar').value;

    if (editando) {

        const sala = {
            id: salaEditando.id,
            nome: salaNome,
            bloco: salaBloco,
            andar: salaAndar,
        };

        editarSala(salaEditando.id, sala);

        editando = false;
        salaEditando = null;

        document.getElementById("salvar_button").innerHTML = "Salvar sala";

        event.target.reset();

        carregarSala();

        return;
    }

    const salasAtuais = JSON.parse(localStorage.getItem('salas')) || [];

    let idContagem = 1;

    if (salasAtuais.length > 0) {
        idContagem = salasAtuais.length + 1;
    }

    const sala = {
        id: idContagem,
        nome: salaNome,
        bloco: salaBloco,
        andar: salaAndar,
    };

    salasAtuais.push(sala);

    localStorage.setItem('salas', JSON.stringify(salasAtuais));

    event.target.reset();

    carregarSala();
}

function carregarSala() {
    const salas = JSON.parse(localStorage.getItem('salas')) || [];
    const lista = document.getElementById('sala-lista');

    lista.innerHTML = "";

    for (const sala of salas) {
        lista.innerHTML += `
            <tr class="hover:bg-slate-50 transition">
                <td class="px-6 py-4 font-medium text-slate-500">
                    #${sala.id}
                </td>

                <td class="px-6 py-4 font-semibold text-slate-900">
                    ${sala.nome}
                </td>

                <td class="px-6 py-4 text-slate-600">
                    ${sala.bloco}
                </td>

                <td class="px-6 py-4 text-slate-600">
                    ${sala.andar}
                </td>

                <td class="px-6 py-4">
                    <div class="flex justify-center gap-2">

                        <button
                            onClick="resgatarSala(${sala.id})"
                            class="px-3 py-2 rounded-lg bg-amber-100 text-amber-700 font-medium hover:bg-amber-200 transition">
                            Editar
                        </button>

                        <button
                            onclick="deletarSala(${sala.id})"
                            class="px-3 py-2 rounded-lg bg-red-100 text-red-600 font-medium hover:bg-red-200 transition">
                            Excluir
                        </button>

                    </div>
                </td>
            </tr>
        `;
    }
}

function resgatarSala(id) {
    const salasCorreto = JSON.parse(localStorage.getItem('salas')).filter(s => {
        return s.id == id
    })
    const salaNome = document.getElementById('sala-nome').value = salasCorreto[0].nome;
    const salaBloco = document.getElementById('sala-bloco').value = salasCorreto[0].bloco;
    const salaAndar = document.getElementById('sala-andar').value = salasCorreto[0].andar;
    const save_button = document.getElementById("salvar_button")
    save_button.innerHTML = "Editar sala"
    editando = true

    const sala = {
        id: id,
        nome: salaNome,
        bloco: salaBloco,
        andar: salaAndar,
    };
    salaEditando = sala

}

function editarSala(id, sala) {
    const salasEditar = JSON.parse(localStorage.getItem('salas')).map(s => {
        if (s.id == id) {
            s.nome = sala.nome;
            s.bloco = sala.bloco;
            s.andar = sala.andar;
        }

        return s;
    })
    localStorage.setItem('salas', JSON.stringify(salasEditar));
}

function deletarSala(id) {
    const salasCorreto = JSON.parse(localStorage.getItem('salas')).filter(s => {
        return s.id != id
    })
    localStorage.setItem('salas', JSON.stringify(salasCorreto));
    carregarSala()
}

carregarSala();
