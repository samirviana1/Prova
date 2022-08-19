let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) 

let logado = document.querySelector("#logado")
logado.innerHTML = `Usuario logado:  ${usuarioLogado.email}`
if(localStorage.getItem('chave') == null){
    alert('Você precisa estar logado para acessar essa página!.')
     window.location.href = 'login.html'
}

function sair(){
    localStorage.removeItem('chave')
    window.location.href = 'login.html'
}