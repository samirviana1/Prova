function logar() {
  //pegar inputs html e colocar em variaveis
  let usuarioLogin = document.querySelector("#usuarioLogin");
  let usuarioLoginLabel = document.querySelector("#usuarioLoginLabel");
  let senhaLogin = document.querySelector("#senhaLogin");
  let senhaLoginLabel = document.querySelector("#senhaLoginLabel");
  // varer localstorage e coletar usuarios logados
  let listaUserLogado = [];
  let validarUsuarios = {
    email: "",
    senha: "",
    menssagens: "",
  };
  listaUserLogado = JSON.parse(localStorage.getItem("usuarios"));

  listaUserLogado.forEach((valor) => {
    if (usuarioLogin.value === valor.nome && senhaLogin.value === valor.senha) {
      validarUsuarios = {
        email: valor.nome,
        senha: valor.senha,
        mensagens: valor.menssagens,
      };
    }
  });
  console.log(listaUserLogado);
  //colocar a class do css no html de sucesso
  const textfieldLogins = login.querySelectorAll(".textfield");
  const loginValido = [...textfieldLogins].every((textfield) => {
    return textfield.className === "textfield sucesso";
  });
  if(usuarioLogin.value ==="" && senhaLogin.value===""){
    usuarioLoginLabel.setAttribute('style', 'color:#d33220')
    usuarioLogin.setAttribute('style', 'border-color:#d33220')
    senhaLogin.setAttribute('style', 'border-color:#d33220')
    senhaLoginLabel.setAttribute('style', 'color:#d33220')
    tratarErro.setAttribute('style', 'display:block')
    tratarErro.innerHTML = "Campos vazios"
}else if (usuarioLogin.value === "") {
    return setErrorFor(senhaLogin, "Campo Usuario está vazio.")
  } else if (senhaLogin.value === "") {
    return setErrorFor(senhaLogin, "Campo Senha está vazio.")
  } else if (
    usuarioLogin.value === validarUsuarios.email &&
    senhaLogin.value === validarUsuarios.senha
  ) {
    window.location.href = 'mensagens.html'
    let chave = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2)
    localStorage.setItem('chave', chave)

    localStorage.setItem('usuarioLogado', JSON.stringify(validarUsuarios))
  } else {
    usuarioLoginLabel.setAttribute('style', 'color:#d33220')
    usuarioLogin.setAttribute('style', 'border-color:#d33220')
    senhaLogin.setAttribute('style', 'border-color:#d33220')
    senhaLoginLabel.setAttribute('style', 'color:#d33220')
    tratarErro.setAttribute('style', 'display:block')
    tratarErro.innerHTML = "Usuario ou senha invalida!."
  }
}
















// erro e sucesso css com js
function setErrorFor(input, message) {
    const textfield = input.parentElement;
    const small = textfield.querySelector("small");
    small.innerText = message;
    textfield.className = "textfield erro";
  }
  
  function setSucessoFor(input) {
    const textfield = input.parentElement;
    textfield.className = "textfield sucesso";
  }