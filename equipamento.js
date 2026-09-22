document.getElementById("btnEnviar").addEventListener("click", () => {
    let nome = document.getElementById("nome").value;
    let tipo = document.getElementById("tipo").value;

    let lista = JSON.parse(localStorage.getItem("Equipamento")) || [];
    lista.push({ nome: nome, tipo: tipo });

    localStorage.setItem("Equipamento", JSON.stringify(lista));

    listarEquipamentos();
    document.getElementById("nome").value = "";
    document.getElementById("tipo").value = "";
});


function listarEquipamentos() {
    let equipamentos = JSON.parse(localStorage.getItem("Equipamento")) || [];
    document.getElementById("conteudoTabela").innerHTML = "";
    let indice = 0;
    for (let equipamento of equipamentos) {
        document.getElementById("conteudoTabela").innerHTML += `
            <tr class="hover:bg-slate-50 transition">
                <th class="px-6 py-4 font-semibold text-slate-900">
                    ${equipamento.nome}
                </th>
                <th class="px-6 py-4 text-slate-600">
                    ${equipamento.tipo}
                </th>
                <th class="px-6 py-4">
                    <button
                        onclick="editar(${indice})"
                        class="px-3 py-2 rounded-lg bg-amber-100 text-amber-700 font-medium hover:bg-amber-200 transition">
                        Editar
                    </button>
                </th>
                <th class="px-6 py-4">
                    <button
                        onclick="excluir(${indice})"
                        class="px-3 py-2 rounded-lg bg-red-100 text-red-600 font-medium hover:bg-red-200 transition">
                        Excluir
                    </button>
                </th>
            </tr>`;
        indice++;
    }
}


function excluir(indice) {
    let equipamentos = JSON.parse(localStorage.getItem("Equipamento")) || [];
    equipamentos.splice(indice, 1);
    localStorage.setItem("Equipamento", JSON.stringify(equipamentos));
    listarEquipamentos();
}


function editar(indice) {
    let equipamentos = JSON.parse(localStorage.getItem("Equipamento")) || [];

    document.getElementById("nome").value = equipamentos[indice].nome;
    document.getElementById("tipo").value = equipamentos[indice].tipo;
    document.getElementById("btnEnviar").disabled = true;
    document.getElementById("alterar").innerHTML = `
        <button
            onclick="alterar(${indice})"
            class="px-6 py-3 mt-4 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 hover:-translate-y-0.5 shadow-md shadow-amber-200 transition">
            Alterar equipamento
        </button>`;
}


function alterar(indice) {
    let equipamentos = JSON.parse(localStorage.getItem("Equipamento"));
    equipamentos[indice].nome = document.getElementById("nome").value;
    equipamentos[indice].tipo = document.getElementById("tipo").value;
    document.getElementById("alterar").innerHTML = "";
    document.getElementById("btnEnviar").disabled = false;
    localStorage.setItem("Equipamento", JSON.stringify(equipamentos));
    listarEquipamentos();
    document.getElementById("nome").value = "";
    document.getElementById("tipo").value = "";
}