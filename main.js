const form = document.getElementById('form-atividade');
const nomes = [];
const telefones = [];

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionaLinha();
    atualizaTabela();
    verificaCadastro();
});

function adicionaLinha() {
    const inputNomeUsuario = document.getElementById('nome-usuario');
    const inputTelefoneUsuario = document.getElementById('numero-telefone');

    if (!validarTelefone(inputTelefoneUsuario.value)) {
        alert('Número de telefone inválido. Certifique-se de inserir 11 dígitos.');
        return;
    }

    const indiceExistente = nomes.findIndex(nome => nome === inputNomeUsuario.value);

    if (indiceExistente !== -1) {
        telefones[indiceExistente] = formatarTelefone(inputTelefoneUsuario.value);

    } else {
        nomes.push(inputNomeUsuario.value);
        telefones.push(formatarTelefone(inputTelefoneUsuario.value));
    }

    atualizaTabela();

    inputNomeUsuario.value = '';
    inputTelefoneUsuario.value = '';
};

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    let linhasHTML = '';
    nomes.forEach((nome, index) => {
        linhasHTML += `<tr><td>${nome}</td><td>${telefones[index]}</td></tr>`;
    });
    corpoTabela.innerHTML = linhasHTML;
}

function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '');
    telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    return telefone;
}

function validarTelefone(telefone) {
    const telefoneNumerico = telefone.replace(/\D/g, '');
    return telefoneNumerico.length === 11;
}