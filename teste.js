// remover element

// const guiasFiltradas = dados.filter(dado => {
//     const titleNormalizado = dado.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

//     if (buscaNormalizada && titleNormalizado.includes(buscaNormalizada)) {
//         return false;
//     }

//     return true;
// });

// dados[0].title = `Victor Pereira`
// console.log(dados[0]);
// dados[1].title = `Augusto`

// Usar uma promisse fetch ou axios com ela vou ter uma variavel imutavel pois estara puxando um dado externo , vou ta empurrando esses dados para outra variavel para armazenar
//esses dados e com ele vou alterar os dados (usando o filter para excluir) com o modal e quando eu for atualizar a lista vou retornar aos dados inicial

// const array1 = [5, 12, 8, 130, 44];
// const found = array1.find(element => element = 5);
// console.log(found);
// expected output: 12

arr = [1,2,3,4]

arr[2] = 5

console.log(arr)