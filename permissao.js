let editando = false;
let permissaoEditando = null;
let permissoes = [];

const PHP = 'php/permissao_php/';

function escapar(texto) {
    const div = document.createElement('div');
    div.textContent = texto ?? '';
    return div.innerHTML;
}


async function salvarPermissao(event) {
    event.preventDefault();

    const form = event.target;
    const dados = new FormData(form);

    const url = editando
        ? `${PHP}permissao_alterar.php?id=${permissaoEditando}`
        : `${PHP}permissao_novo.php`;

    const resposta = await fetch(url, {
        method: 'POST',
        body: dados
    });
    const retorno = await resposta.json();

    alert(retorno.mensagem);

    if (retorno.status === 'ok') {
        cancelarEdicao();
        await carregarPermissoes();
    }
}


async function carregarPermissoes() {
    const resposta = await fetch(`${PHP}permissao_get.php`);
    const retorno = await resposta.json();

    permissoes = retorno.status === 'ok' ? retorno.data : [];

    const lista = document.getElementById('permissao-lista');
    lista.innerHTML = '';

    if (permissoes.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-8 text-center text-slate-500">
                    Nenhuma permissão cadastrada.
                </td>
            </tr>`;
        return;
    }

    for (const p of permissoes) {
        lista.innerHTML += `
            <tr class="hover:bg-slate-50 transition">
                <td class="px-6 py-4 font-medium text-slate-500">
                    #${escapar(p.id_permissao)}
                </td>

                <td class="px-6 py-4 font-semibold text-slate-900">
                    ${escapar(p.nome)}
                </td>

                <td class="px-6 py-4 text-slate-600">
                    ${escapar(p.recurso)}
                </td>

                <td class="px-6 py-4 text-slate-600">
                    ${escapar(p.acao)}
                </td>

                <td class="px-6 py-4 text-slate-600">
                    ${escapar(p.descricao)}
                </td>

                <td class="px-6 py-4">
                    <div class="flex justify-center gap-2">

                        <button
                            onclick="resgatarPermissao(${Number(p.id_permissao)})"
                            class="px-3 py-2 rounded-lg bg-amber-100 text-amber-700 font-medium hover:bg-amber-200 transition">
                            Editar
                        </button>

                        <button
                            onclick="deletarPermissao(${Number(p.id_permissao)})"
                            class="px-3 py-2 rounded-lg bg-red-100 text-red-600 font-medium hover:bg-red-200 transition">
                            Excluir
                        </button>

                    </div>
                </td>
            </tr>
        `;
    }
}


function resgatarPermissao(id) {
    const p = permissoes.find(item => item.id_permissao == id);
    if (!p) return;

    document.getElementById('permissao-nome').value = p.nome;
    document.getElementById('permissao-recurso').value = p.recurso;
    document.getElementById('permissao-acao').value = p.acao;
    document.getElementById('permissao-descricao').value = p.descricao ?? '';

    editando = true;
    permissaoEditando = id;

    document.getElementById('form-titulo').textContent = 'Editar permissão';
    document.getElementById('salvar_button').textContent = 'Alterar permissão';
    document.getElementById('cancelar_button').hidden = false;

    document.getElementById('form-permissao').scrollIntoView({ behavior: 'smooth' });
}


function cancelarEdicao() {
    editando = false;
    permissaoEditando = null;

    document.getElementById('form-permissao').reset();
    document.getElementById('form-titulo').textContent = 'Nova permissão';
    document.getElementById('salvar_button').textContent = 'Salvar permissão';
    document.getElementById('cancelar_button').hidden = true;
}


async function deletarPermissao(id) {
    if (!confirm('Excluir a permissão #' + id + '? Os vínculos dela com perfis também serão apagados.')) return;

    const resposta = await fetch(`${PHP}permissao_excluir.php?id=${id}`);
    const retorno = await resposta.json();

    alert(retorno.mensagem);

    await carregarPermissoes();
}


carregarPermissoes();
