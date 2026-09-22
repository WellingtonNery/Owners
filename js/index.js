document.getElementById("btnEnviar").addEventListener("click", () => {
    let nome = document.getElementById("nome").value;
    let tipo = document.getElementById("tipo").value;

    let lista = JSON.parse(localStorage.getItem("Equipamento")) || [];
    lista.push({nome: nome, tipo: tipo});

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
        document.getElementById("conteudoTabela").innerHTML += `<tr>
                    <th>${equipamento.nome}</th>
                    <th>${equipamento.tipo}</th>
                    <th><button onclick="editar(${indice})">Editar</button></th>
                    <th><button onclick="excluir(${indice})">Excluir</button></th>
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
    document.getElementById("alterar").innerHTML = `<button onclick="alterar(${indice})">Alterar</button>`;
}
    
function alterar(indice) {
    let equipamentos = JSON.parse(localStorage.getItem("Equipamento"));
    equipamentos[indice].nome = document.getElementById("nome").value;
    equipamentos[indice].tipo = document.getElementById("tipo").value;
    document.getElementById("alterar").innerHTML = "";
    localStorage.setItem("Equipamento", JSON.stringify(equipamentos));
    listarEquipamentos();
    document.getElementById("nome").value = "";
    document.getElementById("tipo").value = "";
}