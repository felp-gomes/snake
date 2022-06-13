var maiorValor = 0
var buscarUsuario = true
let arr = [{}]

var usuarios = localStorage.getItem('usuarios')

if (usuarios) {
  usuarios = JSON.parse(usuarios)
} else {
  arr = JSON.stringify(arr)
  localStorage.setItem('usuarios', arr)
}

var pontos = localStorage.getItem('pontos')
pontos = JSON.parse(pontos)

var button = document.getElementById('enviar')

button.addEventListener('click', () => {
  var input = document.getElementById('nome')
  var nome = input.value
  nome = nome.toUpperCase()
  if (nome.length == 3) {
    for (let value in usuarios[0]) {
      if (nome == value) {
        usuarios[0][value] = pontos
        usuarios = JSON.stringify(usuarios)
        localStorage.setItem('usuarios', usuarios)
        buscarUsuario = false
      }
    }

    if (buscarUsuario) {
      usuarios[0][nome] = pontos
      usuarios = JSON.stringify(usuarios)
      localStorage.setItem('usuarios', usuarios)
    }

    usuarios = JSON.parse(usuarios)

    input.disabled = true
    input.style.color = 'white'
    button.disabled = true
    button.style.color = 'white'
    painel()
  } else {
    alert('Você deve inserir um nome com 3 caracteres')
  }
})

function painel() {
  var painel = document.getElementById('ranking')
  for (let value in usuarios[0]) {
    painel.innerHTML += `<p>${value} - ${usuarios[0][value]}</p>`
  }
}

var pontuacao = document.getElementById('pontuacao')

pontuacao.innerHTML = pontos
