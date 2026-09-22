document.getElementById('botao-salvar').addEventListener('click', () => {

    let nome = document.getElementById('tecnico-nome').value;
    let email = document.getElementById('tecnico-email').value;
    let cpf = document.getElementById('tecnico-cpf').value;
    let telefone = document.getElementById('tecnico-telefone').value;
    let endereco = document.getElementById('tecnico-endereco').value;

    let tecnicos = JSON.parse(localStorage.getItem("tecnicos"));

    if(!tecnicos){ tecnicos = [] }

    let id = tecnicos.length + 1;

    while (tecnicos.some(tecnico => tecnico.id === id)) {
        id++;
    }

    tecnicos.push({
        id: id,
        nome: nome,
        email: email,
        cpf: cpf,
        telefone: telefone,
        endereco: endereco
    });

    localStorage.setItem('tecnicos', JSON.stringify(tecnicos));

    document.getElementById('tecnico-nome').value = "";
    document.getElementById('tecnico-cpf').value = "";
    document.getElementById('tecnico-email').value = "";
    document.getElementById('tecnico-telefone').value = "";
    document.getElementById('tecnico-endereco').value = "";
    listar();   
})

function listar(){

    let tecnicos = JSON.parse(localStorage.getItem('tecnicos'));

    if(!tecnicos){ tecnicos = [] }

    document.getElementById("tecnico-lista").innerHTML = "";

    let indice = 0;

    for (let tecnico of tecnicos){

        document.getElementById("tecnico-lista").innerHTML += `

        <tr class="hover:bg-slate-50 transition">

            <td class="px-6 py-4 font-medium text-slate-500">#${tecnico.id}</td>

            <td class="px-6 py-4 font-semibold text-slate-900">${tecnico.nome}</td>

            <td class="px-6 py-4 text-slate-600">${tecnico.cpf}</td>

            <td class="px-6 py-4 text-slate-600">${tecnico.email}</td>

            <td class="px-6 py-4 text-slate-600">${tecnico.telefone}</td>

            <td class="px-6 py-4 text-slate-600">${tecnico.endereco}</td>

            <td class="px-6 py-4">

                <div class="flex justify-center gap-2">

                    <button 
                        onClick="editar(${indice})"
                        class="px-3 py-2 rounded-lg bg-amber-100 text-amber-700 font-medium hover:bg-amber-200 transition">
                        Editar
                    </button>

                    <button 
                        onclick="excluir(${indice})"
                        class="px-3 py-2 rounded-lg bg-red-100 text-red-600 font-medium hover:bg-red-200 transition">
                        Excluir
                    </button>

                </div>

            </td>`;

        indice++;

    }

}

function excluir(indice){

    let tecnicos = JSON.parse(localStorage.getItem('tecnicos'));

    tecnicos.splice(indice, 1);

    localStorage.setItem('tecnicos', JSON.stringify(tecnicos));

    listar();

}

function editar(indice){

    let tecnicos = JSON.parse(localStorage.getItem('tecnicos'));

    document.getElementById('tecnico-nome').value = tecnicos[indice].nome;
    document.getElementById('tecnico-cpf').value = tecnicos[indice].cpf;
    document.getElementById('tecnico-email').value = tecnicos[indice].email;
    document.getElementById('tecnico-telefone').value = tecnicos[indice].telefone;
    document.getElementById('tecnico-endereco').value = tecnicos[indice].endereco;

    document.getElementById('alterar').innerHTML = `<button type="button"

        class="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 hover:-translate-y-0.5 shadow-md shadow-green-200 transition"

        onClick="alterar(${indice})">

        Alterar técnico

    </button>`;

    document.getElementById('botao-salvar').style.display = 'none';

}

function alterar(indice){

    let tecnicos = JSON.parse(localStorage.getItem('tecnicos'));

    tecnicos[indice].nome = document.getElementById('tecnico-nome').value;
    tecnicos[indice].cpf = document.getElementById('tecnico-cpf').value;
    tecnicos[indice].email = document.getElementById('tecnico-email').value;
    tecnicos[indice].telefone = document.getElementById('tecnico-telefone').value;
    tecnicos[indice].endereco = document.getElementById('tecnico-endereco').value;

    document.getElementById('alterar').innerHTML = "";

    localStorage.setItem('tecnicos', JSON.stringify(tecnicos));

    listar();

    document.getElementById('botao-salvar').style.display = 'block';

    document.getElementById('tecnico-nome').value = "";
    document.getElementById('tecnico-cpf').value = "";
    document.getElementById('tecnico-email').value = "";
    document.getElementById('tecnico-telefone').value = "";
    document.getElementById('tecnico-endereco').value = "";

}

listar();