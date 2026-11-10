let editando = false;
let salaEditando = null;
let salas = [];

async function salvarSala(event) {
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

        const atualizado = await editarSala(salaEditando.id, sala);
        if (!atualizado) return;

        editando = false;
        salaEditando = null;

        document.getElementById("salvar_button").innerHTML = "Salvar sala";

        event.target.reset();

        await carregarSala();

        return;
    }

    const sala = {
        nome: salaNome,
        bloco: salaBloco,
        andar: salaAndar,
    };

    const dados = new FormData();
    dados.append('nome', sala.nome);
    dados.append('bloco', sala.bloco);
    dados.append('andar', sala.andar);

    const resposta = await fetch('php/sala_php/sala_novo.php', {
        method: 'POST',
        body: dados
    });
    const retorno = await resposta.json();

    alert(retorno.mensagem);
    if (retorno.status !== 'ok') return;

    event.target.reset();

    await carregarSala();
}

async function carregarSala() {
    const resposta = await fetch('php/sala_php/sala_get.php');
    const retorno = await resposta.json();

    salas = [];
    if (retorno.status === 'ok') {
        salas = retorno.data;
    }
    const lista = document.getElementById('sala-lista');

    lista.innerHTML = "";

    for (const sala of salas) {
        lista.innerHTML += `
            <tr class="hover:bg-puc-soft transition">
                <td class="px-6 py-4 font-medium text-puc-ink/60">
                    #${sala.id_sala}
                </td>

                <td class="px-6 py-4 font-semibold text-puc-ink">
                    ${sala.nome}
                </td>

                <td class="px-6 py-4 text-puc-ink/80">
                    ${sala.bloco}
                </td>

                <td class="px-6 py-4 text-puc-ink/80">
                    ${sala.andar}
                </td>

                <td class="px-6 py-4">
                    <div class="flex justify-center gap-2">

                        <button
                            onClick="resgatarSala(${sala.id_sala})"
                            class="px-3 py-2 rounded-sm border border-puc text-puc font-display text-sm uppercase tracking-wide hover:bg-puc hover:text-white transition">
                            Editar
                        </button>

                        <button
                            onclick="deletarSala(${sala.id_sala})"
                            class="px-3 py-2 rounded-sm bg-puc text-white font-display text-sm uppercase tracking-wide hover:bg-puc-top transition">
                            Excluir
                        </button>

                    </div>
                </td>
            </tr>
        `;
    }
}

function resgatarSala(id) {
    const salasCorreto = salas.filter(s => {
        return s.id_sala == id
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

async function editarSala(id, sala) {
    const dados = new FormData();
    dados.append('nome', sala.nome);
    dados.append('bloco', sala.bloco);
    dados.append('andar', sala.andar);

    const resposta = await fetch(`php/sala_php/sala_alterar.php?id=${id}`, {
        method: 'POST',
        body: dados
    });
    const retorno = await resposta.json();

    alert(retorno.mensagem);
    return retorno.status === 'ok';
}

async function deletarSala(id) {
    const resposta = await fetch(`php/sala_php/sala_excluir.php?id=${id}`);
    const retorno = await resposta.json();

    alert(retorno.mensagem);
    await carregarSala();
}

carregarSala();
