let descricao = document.getElementById("desc");
let detalhamento = document.getElementById("detalha");
let formDesc = document.getElementById("formDesc");
let dadosLogadoUsuarios;

let rtable = document.getElementById("rtable");

document.addEventListener("DOMContentLoaded", () => {
  let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  let logado = document.querySelector("#logado");
  logado.innerHTML = `Usuario:  ${usuarioLogado.email}`;

  if (localStorage.getItem("chave") == null) {
    alert("Você precisa estar logado para acessar essa página!.");
    window.location.href = "login.html";
  }
  let listarUsuarios = listaDeUsuarios();

  console.log(listarUsuarios);
  dadosLogadoUsuarios = listarUsuarios.find(
    (usuario) => usuario.nome === usuarioLogado.email
  );
  console.log(dadosLogadoUsuarios);
  
    montarMensagemHtml(dadosLogadoUsuarios.mensagens)
  
});

function listaDeUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios") || []);
}

formDesc.addEventListener("submit", (event) => {
  event.preventDefault();
  salvarMensagens();
});

function salvarMensagens() {
  const mensagemNova = {
    chaves: Math.random().toString(16).substring(2),
    descricao: descricao.value,
    detalhamento: detalhamento.value,
  };
  console.log(mensagemNova);
  dadosLogadoUsuarios.mensagens.push(mensagemNova);
  novoDadosUsuaiosLogado(dadosLogadoUsuarios);
  montarMensagemHtml(dadosLogadoUsuarios.mensagens);
  formDesc.reset();
}

function novoDadosUsuaiosLogado(dadosUserAtualizado) {
  let listaUsuarios = listaDeUsuarios();
  let indiceUserAlualizado = listaUsuarios.findIndex(
    (usuario) => usuario.email === dadosUserAtualizado.email
  );
  listaUsuarios[indiceUserAlualizado] = dadosUserAtualizado;
  atualizarLocalStorage(listaUsuarios);
}

function atualizarLocalStorage(listaDados) {
  localStorage.setItem("usuarios", JSON.stringify(listaDados));
}

function montarMensagemHtml(novaMensagem) {
  rtable.innerHTML = ""
  for(let i of novaMensagem){
  let linhaTable = document.createElement("tr");
  linhaTable.classList.add("mensagensDnc");
  linhaTable.setAttribute("id", i.chaves);
  let colunaTableChave = document.createElement("td");
  colunaTableChave.innerHTML = i.chaves; 

  let colunaTableDesc = document.createElement("td");
  colunaTableDesc.innerHTML = i.descricao;

  let colunaTableDetalha = document.createElement("td");
  colunaTableDetalha.innerHTML = i.detalhamento;

  let colunaTableAcao = document.createElement("td");
  let buttonEditar = document.createElement("button");
  buttonEditar.innerHTML = "Editar";
  buttonEditar.classList.add("buttonCss");
  buttonEditar.addEventListener("click", () => {
    editarMensagem(i);
  });

  let buttonApagar = document.createElement("button");
  buttonApagar.innerHTML = "Apagar";
  buttonApagar.classList.add("buttonCss");
  buttonApagar.addEventListener("click", () => {
    apagarMensagem(i.chaves);
  });

  colunaTableAcao.appendChild(buttonApagar);
  colunaTableAcao.appendChild(buttonEditar);
  linhaTable.appendChild(colunaTableChave);
  linhaTable.appendChild(colunaTableDesc);
  linhaTable.appendChild(colunaTableDetalha);
  linhaTable.appendChild(colunaTableAcao);
  rtable.appendChild(linhaTable);
  }
  
}

function editarMensagem(mensagem) {
  let mensagemDousuario = dadosLogadoUsuarios.mensagens.findIndex(
    (valorMsn) => valorMsn.chaves === mensagem.chaves
  );
  console.log(mensagemDousuario);
  if (mensagemDousuario !== -1) {
    let editDescricaoNovMsn = prompt("Digite novo descrição: ");
    dadosLogadoUsuarios.mensagens[mensagemDousuario].descricao =
      editDescricaoNovMsn
        ? editDescricaoNovMsn
        : dadosLogadoUsuarios.mensagens[mensagemDousuario].descricao;
    let editDetalhamentonovMsn = prompt("Digite nova detalhamento: ");
    dadosLogadoUsuarios.mensagens[mensagemDousuario].detalhamento =
      editDetalhamentonovMsn
        ? editDetalhamentonovMsn
        : dadosLogadoUsuarios.mensagens[mensagemDousuario].detalhamento;
        novoDadosUsuaiosLogado(dadosLogadoUsuarios);
        montarMensagemHtml(dadosLogadoUsuarios.mensagens);
  } else {
    alert('Recado não encontrado!.')
  }
}

function apagarMensagem(chaves) {
  let mensagemEncontrada = dadosLogadoUsuarios.mensagens.findIndex(
    (mensagem) => mensagem.chaves === chaves
  );

  console.log(mensagemEncontrada);
  let linhaTableApg = document.getElementById(chaves);
  let aviso = confirm(`Gostaria realmente de apagar está mensagem ? ${ chaves}`);
  if (aviso) {
    linhaTableApg.remove();
    dadosLogadoUsuarios.mensagens.splice(mensagemEncontrada, 1);
    novoDadosUsuaiosLogado(dadosLogadoUsuarios);
    /*montarMensagemHtml(dadosLogadoUsuarios.mensagens);*/
  } else {
  }
}

function sair() {
  localStorage.removeItem("chave");
  window.location.href = "login.html";
}
