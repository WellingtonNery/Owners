let nomesSalas = {};
let equipamentos = [];


document.addEventListener("DOMContentLoaded", async () => {
    await carregarSalas();
    listarEquipamentos();
});


document.getElementById("btnEnviar").addEventListener("click", () => {
    novo();
});


async function carregarSalas() {
    const retorno = await fetch("equipamento_php/equipamento_salas.php");
    const resposta = await retorno.json();

    if (resposta.status == "ok") {
        for (let sala of resposta.data) {
            nomesSalas[sala.id_sala] = sala.nome;
            document.getElementById("id_sala_origem").innerHTML += `<option value="${sala.id_sala}">${sala.nome}</option>`;
        }
    } else {
        document.getElementById("id_sala_origem").innerHTML = `<option value="">Nenhuma sala cadastrada</option>`;
    }
}


async function novo() {
    const fd = new FormData();
    fd.append("id_equipamento", document.getElementById("nome").value);
    fd.append("id_sala_origem", document.getElementById("id_sala_origem").value);
    fd.append("tipo", document.getElementById("tipo").value);

    const retorno = await fetch("equipamento_php/equipamento_novo.php", {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);
        document.getElementById("nome").value = "";
        document.getElementById("id_sala_origem").value = "";
        document.getElementById("tipo").value = "";
        listarEquipamentos();
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}


async function listarEquipamentos() {
    const retorno = await fetch("equipamento_php/equipamento_get.php");
    const resposta = await retorno.json();

    equipamentos = [];
    document.getElementById("conteudoTabela").innerHTML = "";

    if (resposta.status == "ok") {
        equipamentos = resposta.data;

        for (let i = 0; i < equipamentos.length; i++) {
            const equipamento = equipamentos[i];

            document.getElementById("conteudoTabela").innerHTML += `
            <tr class="hover:bg-puc-soft transition">
                <th class="px-6 py-4 font-semibold text-puc-ink">
                    ${equipamento.id_equipamento}
                </th>
                <th class="px-6 py-4 text-puc-ink/80">
                    ${equipamento.tipo}
                </th>
                <th class="px-6 py-4 text-puc-ink/80">
                    ${nomesSalas[equipamento.id_sala_origem]}
                </th>
                <th class="px-6 py-4">
                    <button
                        onclick="editar(${i})"
                        class="px-3 py-2 rounded-sm border border-puc text-puc font-display text-sm uppercase tracking-wide hover:bg-puc hover:text-white transition">
                        Editar
                    </button>
                </th>
                <th class="px-6 py-4">
                    <button
                        onclick="excluir(${i})"
                        class="px-3 py-2 rounded-sm bg-puc text-white font-display text-sm uppercase tracking-wide hover:bg-puc-top transition">
                        Excluir
                    </button>
                </th>
            </tr>`;
        }
    }
}


async function excluir(indice) {
    const id = equipamentos[indice].id_equipamento;

    const retorno = await fetch("equipamento_php/equipamento_excluir.php?id=" + encodeURIComponent(id));
    const resposta = await retorno.json();

    alert(resposta.mensagem);

    if (resposta.status == "ok") {
        listarEquipamentos();
    }
}


async function editar(indice) {
    const id = equipamentos[indice].id_equipamento;

    const retorno = await fetch("equipamento_php/equipamento_get.php?id=" + encodeURIComponent(id));
    const resposta = await retorno.json();

    if (resposta.status == "ok") {
        const equipamento = resposta.data[0];

        document.getElementById("nome").value = equipamento.id_equipamento;
        document.getElementById("nome").readOnly = true;
        document.getElementById("id_sala_origem").value = equipamento.id_sala_origem;
        document.getElementById("tipo").value = equipamento.tipo;
        document.getElementById("btnEnviar").disabled = true;
        document.getElementById("alterar").innerHTML = `
        <button
            onclick="alterar()"
            class="px-6 py-3 mt-4 rounded-sm bg-puc text-white font-display uppercase tracking-wide hover:bg-puc-top transition">
            Alterar equipamento
        </button>`;
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}


async function alterar() {
    const id = document.getElementById("nome").value;

    const fd = new FormData();
    fd.append("id_sala_origem", document.getElementById("id_sala_origem").value);
    fd.append("tipo", document.getElementById("tipo").value);

    const retorno = await fetch("equipamento_php/equipamento_alterar.php?id=" + encodeURIComponent(id), {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);
        document.getElementById("alterar").innerHTML = "";
        document.getElementById("btnEnviar").disabled = false;
        document.getElementById("nome").readOnly = false;
        document.getElementById("nome").value = "";
        document.getElementById("id_sala_origem").value = "";
        document.getElementById("tipo").value = "";
        listarEquipamentos();
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}
