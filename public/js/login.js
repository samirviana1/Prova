function logar() {
  //pegar inputs html e colocar em variaveis
  let usuarioLogin = document.querySelector("#usuarioLogin");
  let usuarioLoginLabel = document.querySelector("#usuarioLoginLabel");
  let senhaLogin = document.querySelector("#senhaLogin");
  let senhaLoginLabel = document.querySelector("#senhaLoginLabel");
  // varer localstorage e listar usuarios
  let listaUser = [];
  
  listaUser = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioEncontrado =listaUser.find((valor) => usuarioLogin.value === valor.nome && senhaLogin.value === valor.senha);

  

  if (usuarioLogin.value === "" && senhaLogin.value === "") {
    usuarioLoginLabel.setAttribute("style", "color:#d33220");
    usuarioLogin.setAttribute("style", "border-color:#d33220");
    senhaLogin.setAttribute("style", "border-color:#d33220");
    senhaLoginLabel.setAttribute("style", "color:#d33220");
    tratarErro.setAttribute("style", "display:block");
    tratarErro.innerHTML = "Campos vazios";
    usuarioLogin.focus();
    setTimeout(() => {
      tratarErro.style.display = "none";
      usuarioLoginLabel.removeAttribute("style", "color:#d33220");
      usuarioLogin.removeAttribute("style", "border-color:#d33220");
      senhaLogin.removeAttribute("style", "border-color:#d33220");
      senhaLoginLabel.removeAttribute("style", "color:#d33220");
    }, 1000);
  } else if (usuarioLogin.value === "") {
    return setErrorFor(usuarioLogin, "Campo Usuario está vazio.");
  } else if (senhaLogin.value === "") {
    return setErrorFor(senhaLogin, "Campo Senha está vazio.");
  } else if (
    usuarioEncontrado !== undefined
  ) {
    const validarUsuarios = {
      email: usuarioEncontrado.nome,
      mensagens: usuarioEncontrado.mensagens,
    };
    let chave =
      Math.random().toString(16).substring(2) +
      Math.random().toString(16).substring(2);
    localStorage.setItem("chave", chave);

    localStorage.setItem("usuarioLogado", JSON.stringify(validarUsuarios));
    window.location.href = "mensagens.html";
  } else {
    usuarioLoginLabel.setAttribute("style", "color:#d33220");
    usuarioLogin.setAttribute("style", "border-color:#d33220");
    senhaLogin.setAttribute("style", "border-color:#d33220");
    senhaLoginLabel.setAttribute("style", "color:#d33220");
    tratarErro.setAttribute("style", "display:block");
    tratarErro.innerHTML = "Usuario ou senha invalida!.";
    setTimeout(() => {
      tratarErro.style.display = "none";
      usuarioLoginLabel.removeAttribute("style", "color:#d33220");
      usuarioLogin.removeAttribute("style", "border-color:#d33220");
      senhaLogin.removeAttribute("style", "border-color:#d33220");
      senhaLoginLabel.removeAttribute("style", "color:#d33220");
    }, 1000);
  }
}

// erro e sucesso css com js
function setErrorFor(input, message) {
  const textfield = input.parentElement;
  const small = textfield.querySelector("small");
  small.innerText = message;
  textfield.className = "textfield erro";
  setTimeout(() => {
    small.innerText = "";
    textfield.className = "textfield";
  }, 1000);
}

function setSucessoFor(input) {
  const textfield = input.parentElement;
  textfield.className = "textfield sucesso";
}
