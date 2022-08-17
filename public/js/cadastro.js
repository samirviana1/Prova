
// capturar variaveis dos inputs e do form htmls
let form = document.getElementById("form");
let nomeUsuario = document.getElementById("nomeUsuario");
let senha = document.getElementById("senha");
let confirmaSenha = document.getElementById("confirmaSenha");

// botão submit do form cadastro e chamar função check imputs
form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  checkImputs();
});


// logica para check imputs
function checkImputs() {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const nomeUsuarioValor = nomeUsuario.value;
  const senhaValor = senha.value;
  const confirmaSenhaValor = confirmaSenha.value;

  const verificaNomeUserIgual = usuarios.some(
    (user) => user.nome === nomeUsuarioValor   
    );
    console.log(verificaNomeUserIgual);

  if (nomeUsuarioValor === "") {
    setErrorFor(nomeUsuario, " O campo usuario é obrigatório.");
  } else if(verificaNomeUserIgual){
    console.log(verificaNomeUserIgual);
    return setErrorFor(nomeUsuario, "E-mail já está cadastrado!.")
  }else {
    setSucessoFor(nomeUsuario);
  }

  if (senhaValor === "") {
    setErrorFor(senha, "A senha é obrigatório.");
  } else if (senhaValor.length < 8) {
    setErrorFor(senha, "A senha precisa ter no mínimo 8 caracteres.");
  } else {
    setSucessoFor(senha);
  }

  if (confirmaSenhaValor === "") {
    return setErrorFor(confirmaSenha, " Confirmar senha é obrigatório.");

  } else if (confirmaSenhaValor !== senhaValor) {
    return setErrorFor(confirmaSenha, "As senhas não conferem.");
  } else if (confirmaSenhaValor.length < 8) {
    return setErrorFor(confirmaSenha, "A senha precisa ter no mínimo 8 caracteres.");
  } else {
    setSucessoFor(confirmaSenha);
  }


  usuarios.push(
    {
      nome:nomeUsuarioValor,
      senha:senhaValor,
      menssagens:[],
    }
   )
   
  const formControls = form.querySelectorAll(".form-control");
  const cadastroValido = [...formControls].every((formControl) => {
    return formControl.className === "form-control sucesso";
  });
  
  if (cadastroValido) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
  resetCadastro();
}

function resetCadastro() {
  nomeUsuario.value ="";
  senha.value="";
  confirmaSenha.value="";
}
// erro e sucesso css com js
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.className = "form-control erro";
}

function setSucessoFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control sucesso";
}
