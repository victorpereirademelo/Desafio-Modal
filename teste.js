// remover element

const guiasFiltradas = dados.filter(dado => {
    const titleNormalizado = dado.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    if (buscaNormalizada && titleNormalizado.includes(buscaNormalizada)) {
        return false;
    }

    return true;
});

dados[0].title = `Victor Pereira`
console.log(dados[0]);
dados[1].title = `Augusto`

// Usar uma promisse fetch ou axios com ela vou ter uma variavel imutavel pois estara puxando um dado externo , vou ta empurrando esses dados para outra variavel para armazenar
//esses dados e com ele vou alterar os dados (usando o filter para excluir) com o modal e quando eu for atualizar a lista vou retornar aos dados inicial