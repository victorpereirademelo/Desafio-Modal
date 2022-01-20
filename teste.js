const table = document.getElementById("t-body");
const input = document.getElementById("pesquisar");
const buttom = document.getElementById("btn");
const dropdonwBtn = document.querySelectorAll(".dropdown-item");
const openModal1 = document.getElementById("modal");
const init = () => {
  if (localStorageTransactions()) {
    return renderTable(JSON.parse(localStorage.getItem("posts")));
  }
  returnPromise();
};
const returnPromise = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      localStorage.setItem("posts", JSON.stringify(json));
      renderTable(json);
    });
};
const localStorageTransactions = () => {
  return JSON.parse(localStorage.getItem("posts"));
};
buttom.addEventListener("click", () => {
  input.value = '';
  returnPromise();
});
// DELETE
const deletePost = (value) => {
  document.getElementById("delete").addEventListener("click", () => {
    const deletID = JSON.parse(localStorage.getItem("posts")).filter((dado) => {
      return dado.id != value;
    });
    localStorage.setItem("posts", JSON.stringify(deletID));
    console.log(JSON.parse(localStorage.getItem("posts")));
    $("#staticBackdrop").modal("hide");
    renderTable(JSON.parse(localStorage.getItem("posts")));
alert('Esse POST será deletado!')
    input.value = '';
  });
};
const renderTable = (localStorage) => {
  let html = "";
  localStorage.forEach((response) => {
    html += `
        <tr>
          <td>${response.id}</td>
          <td>${response.title}</td>
          <td class="text-end">
            <div class="dropdown">
              <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false"> Ações</a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a class="dropdown-item"  data-toggle="modal" data-target="#exampleModal" onclink="editarPost(${response.id})">Editar</a>
                <a class="dropdown-item"  data-toggle="modal" data-target="#staticBackdrop" onclick="deletePost(${response.id})">Remover</a>
              </div>
            </div>
          </td>
        </tr>
    `;
  });
  table.innerHTML = html;
};
const filterInput = () => {
  const filterTitle = localStorageTransactions().filter((dado) => {
    if (!input.value) {
      return true;
    }
    if (
      input.value &&
      dado.title.includes(
        input.value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      )
    ) {
      return true;
    }
    return false;
  });
  renderTable(filterTitle);
};
init();