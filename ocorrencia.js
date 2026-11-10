let editando = false;
let ocorrenciaEditando = null; 
let ocorrencias = [];           


async function salvarOcorrencia(event) {
    event.preventDefault();

    const ocorrenciaTipo = document.getElementById('ocorrencia-tipo').value;
    const ocorrenciaDescricao = document.getElementById('ocorrencia-descricao').value;

    if (editando) {

        const ocorrencia = {
            id: ocorrenciaEditando.id,
            tipo: ocorrenciaTipo,
            descricao: ocorrenciaDescricao,
        };

        await editarOcorrencia(ocorrenciaEditando.id, ocorrencia);

        editando = false;
        ocorrenciaEditando = null;

        document.getElementById("salvar_button").innerHTML = "Salvar ocorrência";

        event.target.reset();

        await carregarOcorrencia();

        return;
    }

    const ocorrencia = {
        tipo: ocorrenciaTipo,
        descricao: ocorrenciaDescricao,
    };

    const dados = new FormData();
    dados.append('tipo', ocorrencia.tipo);
    dados.append('descricao', ocorrencia.descricao);

    const resposta = await fetch('php/ocorrencia_php/ocorrencia_nova.php', {
        method: 'POST',
        body: dados
    });
    const retorno = await resposta.json();

    alert(retorno.mensagem);

    event.target.reset();

    await carregarOcorrencia();
}


async function carregarOcorrencia() {
    const resposta = await fetch('php/ocorrencia_php/ocorrencia_get.php');
    const retorno = await resposta.json();

    ocorrencias = [];
    if (retorno.status === 'ok') {
        ocorrencias = retorno.data;
    }

    const lista = document.getElementById('ocorrencia-lista');

    lista.innerHTML = "";

    for (const ocorrencia of ocorrencias) {
        lista.innerHTML += `
            <tr class="hover:bg-puc-soft transition">
                <td class="px-6 py-4 font-medium text-puc-ink/60">
                    #${ocorrencia.id_ocorrencia}
                </td>

                <td class="px-6 py-4 font-semibold text-puc-ink">
                    ${ocorrencia.tipo}
                </td>

                <td class="px-6 py-4 text-puc-ink/80">
                    ${ocorrencia.descricao}
                </td>

                <td class="px-6 py-4">
                    <div class="flex justify-center gap-2">

                        <button
                            onClick="resgatarOcorrencia(${ocorrencia.id_ocorrencia})"
                            class="px-3 py-2 rounded-sm border border-puc text-puc font-display text-sm uppercase tracking-wide hover:bg-puc hover:text-white transition">
                            Editar
                        </button>

                        <button
                            onclick="deletarOcorrencia(${ocorrencia.id_ocorrencia})"
                            class="px-3 py-2 rounded-sm bg-puc text-white font-display text-sm uppercase tracking-wide hover:bg-puc-top transition">
                            Excluir
                        </button>

                    </div>
                </td>
            </tr>
        `;
    }
}


function resgatarOcorrencia(id) {
    const ocorrenciasCorreto = ocorrencias.filter(o => {
        return o.id_ocorrencia == id
    })

    const ocorrenciaTipo = document.getElementById('ocorrencia-tipo').value = ocorrenciasCorreto[0].tipo;
    const ocorrenciaDescricao = document.getElementById('ocorrencia-descricao').value = ocorrenciasCorreto[0].descricao;

    document.getElementById("salvar_button").innerHTML = "Alterar ocorrência";
    editando = true

    const ocorrencia = {
        id: id,
        tipo: ocorrenciaTipo,
        descricao: ocorrenciaDescricao,
    };
    ocorrenciaEditando = ocorrencia
}


async function editarOcorrencia(id, ocorrencia) {
    const dados = new FormData();
    dados.append('tipo', ocorrencia.tipo);
    dados.append('descricao', ocorrencia.descricao);

    const resposta = await fetch(`php/ocorrencia_php/ocorrencia_alterar.php?id=${id}`, {
        method: 'POST',
        body: dados
    });
    const retorno = await resposta.json();

    alert(retorno.mensagem);
}


async function deletarOcorrencia(id) {
    const resposta = await fetch(`php/ocorrencia_php/ocorrencia_excluir.php?id=${id}`);
    const retorno = await resposta.json();

    alert(retorno.mensagem);

    await carregarOcorrencia()
}

carregarOcorrencia();