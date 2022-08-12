const form = document.getElementById("form");
const nomeUsuario = document.getElementById("nomeUsuario");
const senha = document.getElementById("senha");
const confirmaSenha = document.getElementById("confirmaSenha");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  checkImputs();
});

function checkImputs() {
  const nomeUsuarioValor = nomeUsuario.value;
  const senhaValor = senha.value;
  const confirmaSenhaValor = confirmaSenha.value;

  if (nomeUsuarioValor === "") {
    setErrorFor(nomeUsuario, " O campo usuario é obrigatório.");
  } else {
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
    setErrorFor(confirmaSenha, " Confirmar senha é obrigatório.");
  } else if (confirmaSenhaValor !== senhaValor) {
    setErrorFor(confirmaSenha, "As senhas não conferem.");
  } else if (confirmaSenhaValor.length < 8) {
    setErrorFor(confirmaSenha, "A senha precisa ter no mínimo 8 caracteres.");
  } else {
    setSucessoFor(confirmaSenha);
  }

  const formControls = form.querySelectorAll(".form-control");
  const formValido = [...formControls].every((formControl) => {
    return formControl.className === "form-control sucesso";
  });

  if (formValido) {
    console.log("sucesso!.");
  }
}

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
