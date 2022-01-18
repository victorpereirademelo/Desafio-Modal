// remover element

const guiasFiltradas = dados.filter(dado => {
    const titleNormalizado = dado.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    if (buscaNormalizada && titleNormalizado.includes(buscaNormalizada)) {
        return false;
    }

    return true;
});