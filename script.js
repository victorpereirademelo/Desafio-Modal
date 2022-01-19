//-------------------------------------------------------------------------------------------------------//
let armazenarDados = [];
let dadosMutavel = [];
//--------------------------------------------------------------------------------------------------------//
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(dadosImutavel => {
        // localStorage.setItem("transactions", JSON.stringify(dadosImutavel));
        //  const value = localStorage.getItem("transactions");
        //  const dadosImutavel = JSON.parse(value);

        // dadosImutavel.forEach(dados => {
            //     armazenarDados.push(dados)
            //     dadosMutavel.push(dados);
            // });

        armazenarDados = dadosImutavel;
        dadosMutavel = dadosImutavel;

        renderizacaoDeTabela(dadosImutavel);
    });
//--------------------------------------------------------------------------------------------------------//
function renderizacaoDeTabela(dados) {

    const tabela = document.querySelector('#tabela');

    let html = '';

    dados.forEach(dado => {
        html += `
        <tr>
            <td>${dado.id}</td>
            <td class="text-cente ellipsis">${dado.title}</td>
            <td class="text-end">
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Ações</button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#" data-toggle="modal" data-target="#exampleModal1" onclick="editarPost(${dado.id})">Editar</a>
              <a class="dropdown-item adjust-remove" href="#" data-toggle="modal" data-target="#exampleModal2" onclick="excluirPost(${dado.id})">Remover</a>
            </div>
          </div>
          </td>
        </tr>
             `
    });

    if (!dados.length) {
        html += '<tr><td colspan="3" style="text-align: center;">Nenhuma guia encontrada!</td></tr>'
    }

    tabela.innerHTML = html;
};
//--------------------------------------------------------------------------------------------------------//
function editarPost(id) {
    const botaoEditar = document.getElementById('botaoEditar');
    const titulo = document.getElementById('titulo');
    const descricao = document.getElementById('descricao');

    let item = dadosMutavel.filter(dados => {
        if (id === dados.id) {
            return true;
        }
        return false;
    });

    console.log(item);

    titulo.value = item[0].title;
    descricao.value = item[0].body;

    botaoEditar.addEventListener('click', function () {

        $('#exampleModal1').modal('hide');

        item.title = titulo.value;
        item.body = descricao.value;
        // console.log(dadosMutavel[id])
        // console.log(item)
        dadosMutavel[id-1] = item;


        renderizacaoDeTabela(dadosMutavel);
        item = [];
        id = 0;
    });

};

function excluirPost(id) {
    const botaoExcluir = document.getElementById('botaoExcluir');

    botaoExcluir.addEventListener('click', function () {

        $('#exampleModal2').modal('hide');

        dadosMutavel = dadosMutavel.filter(dados => {
            return (id !== dados.id);
        });

        renderizacaoDeTabela(dadosMutavel);
        id = 0;
    });
};

//--------------------------------------------------------------------------------------------------------//
function filtrar() {
    const buscarGuia = document.getElementById('pesquisa').value;
    const buscaNormalizada = buscarGuia.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    if (!buscaNormalizada) {
        return renderizacaoDeTabela(dadosMutavel);
    }

    const guiasFiltradas = dadosMutavel.filter(dado => {
        const titleNormalizado = dado.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        if (buscaNormalizada && titleNormalizado.includes(buscaNormalizada)) {
            return true;
        }

        return false;
    });
    renderizacaoDeTabela(guiasFiltradas);
};
//--------------------------------------------------------------------------------------------------------//
const botaoAtualizar = document.getElementById('botaoAtualizar');

botaoAtualizar.addEventListener('click', function () {
    const pesquisa = document.getElementById('pesquisa');
    pesquisa.value = '';
    dadosMutavel = armazenarDados;
    renderizacaoDeTabela(dadosMutavel);
});