//----------------------------------- @author victorpereirademelo ----------------------------------------//
iniciarPagina();

function dadosInicial() {
    axios("https://jsonplaceholder.typicode.com/posts")
        .then(json => {
            setDados(json.data);
            renderizacaoDeTabela(json.data);
        });
};
//---------------------------------------------------------------------------------------------------------//
function setDados(json) {
    return localStorage.setItem("posts", JSON.stringify(json));
};
//--------------------------------------------------------------------------------------------------------//
function dadosMutavel() {
    return JSON.parse(localStorage.getItem("posts"));
};
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
function editarPost(postId) {
    const botaoEditar = document.getElementById('botaoEditar');
    const titulo = document.getElementById('titulo');
    const descricao = document.getElementById('descricao');

    const posts = dadosMutavel();
    const postParaEditar = posts.find(post => postId === post.id);

    titulo.value = postParaEditar.title;
    descricao.value = postParaEditar.body;

    botaoEditar.addEventListener('click', function () {

        if(!titulo.value){
          alert('Titulo Invalido');
          return;
        }

        if(!descricao.value){
            alert('descricao invalida');
            return;
        }

        $('#exampleModal1').modal('hide');

        const obj = {
            id: postId,
            title: titulo.value,
            body: descricao.value,
        };

        const novoPost = dadosMutavel().map(post => {
            if (post.id === obj.id) {
                return obj;
            }
            return post;
        });

        setDados(novoPost);
        filtrar();
        // renderizacaoDeTabela(dadosMutavel());
        postId = 0;
    });
};
//------------------------------------------------------------------------------------------------------//
function excluirPost(id) {
    const botaoExcluir = document.getElementById('botaoExcluir');

    botaoExcluir.addEventListener('click', function () {

        $('#exampleModal2').modal('hide');

        const deletarPost = dadosMutavel().filter(dados => {
            return id !== dados.id
        });

        setDados(deletarPost);
        filtrar();
        // renderizacaoDeTabela(dadosMutavel());
        id = 0;
    });
};
//--------------------------------------------------------------------------------------------------------//
function filtrar() {
    const buscarGuia = document.getElementById('pesquisa').value;
    const buscaNormalizada = buscarGuia.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const dados = dadosMutavel();

    if (!buscaNormalizada) {
        return renderizacaoDeTabela(dados);
    }

    const guiasFiltradas = dados.filter(dado => {
        const titleNormalizado = dado.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        return titleNormalizado.includes(buscaNormalizada);
    });

    renderizacaoDeTabela(guiasFiltradas);
};
//--------------------------------------------------------------------------------------------------------//
const botaoAtualizar = document.getElementById('botaoAtualizar');
const pesquisa = document.getElementById('pesquisa');

botaoAtualizar.addEventListener('click', function () {
    const spin = document.querySelector("#spinner");
    spin.style.visibility = "visible"

    pesquisa.value = '';
    dadosInicial();

    setTimeout(function () {
        spin.style.visibility = "hidden"
    }, 500)
});
//---------------------------------------------------------------------------------------------------------//
function iniciarPagina() {
    if(!dadosMutavel()){
       dadosInicial();
       return;
    }
    renderizacaoDeTabela(dadosMutavel());
};
//----------------------------------------------------------------------------------------------------------//