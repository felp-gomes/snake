// Jogo da Cobra (Snake Game)
// Autor: Jan Bodnar
// Adaptado por: Gilson Pereira
// Código fonte original: http://zetcode.com/javascript/snake/

// Declaração de variáveis e constantes

var tela
var ctx

var cabeca
var maca
var corpo

var pontos
var maca_x
var maca_y

var paraEsquerda = false
var paraDireita = true
var paraCima = false
var paraBaixo = false
var noJogo = true

const TAMANHO_PONTO = 10
const ALEATORIO_MAXIMO = 29 // Limitador de ponto de coleta aleatório
const ATRASO = 140 // tornar o jogo lento
const C_ALTURA = 400 // Altura do da tela jogavel
const C_LARGURA = 400 // Largura da tela jogavel

const TECLA_ESQUERDA = 37 // Valor da tecla ASCII da esquerda
const TECLA_DIREITA = 39 // Valor da tecla ASCII da direita
const TECLA_ACIMA = 38 // Valor da tecla ASCII cima
const TECLA_ABAIXO = 40 // Valor da tecla ASCII baixo

const teclas = [37, 39, 38, 40]

var x = []
var y = []

onkeydown = verificarTecla // Define função chamada ao se pressionar uma tecla

iniciar() // Chama função inicial do jogo

// Definição das funções

function iniciar() {
  tela = document.getElementById('tela')
  ctx = tela.getContext('2d')

  // ctx.fillStyle = 'black'
  let img = document.getElementById('lamp')
  let backgroundImage = ctx.createPattern(img, 'repeat')

  ctx.fillRect(0, 0, C_LARGURA, C_ALTURA)
  ctx.fillStyle = backgroundImage

  carregarImagens()
  criarCobra()
  localizarMaca()
  setTimeout('cicloDeJogo()', ATRASO)
}

function carregarImagens() {
  cabeca = new Image()
  cabeca.src = './assets/cabeca.png'

  corpo = new Image()
  corpo.src = './assets/ponto.png'

  maca = new Image()
  maca.src = './assets/maca.png'
}

function criarCobra() {
  pontos = 3

  for (var z = 0; z < pontos; z++) {
    x[z] = 50 - z * TAMANHO_PONTO
    y[z] = 50
  }
}

function semScrollBars() {
  document.documentElement.style.overflow = 'hidden'
  document.body.scroll = 'no' // IE
}
semScrollBars()

function localizarMaca() {
  var r = Math.floor(Math.random() * ALEATORIO_MAXIMO)
  maca_x = r * TAMANHO_PONTO

  r = Math.floor(Math.random() * ALEATORIO_MAXIMO)
  maca_y = r * TAMANHO_PONTO
}

function cicloDeJogo() {
  if (noJogo) {
    verificarMaca()
    verificarColisao()
    mover()
    fazerDesenho()
    setTimeout('cicloDeJogo()', ATRASO)
  }
}

function verificarMaca() {
  if (x[0] == maca_x && y[0] == maca_y) {
    pontos++
    localizarMaca()
  }
}

function verificarColisao() {
  for (var z = pontos; z > 0; z--) {
    if (z > 4 && x[0] == x[z] && y[0] == y[z]) {
      noJogo = false
    }
  }

  if (y[0] >= C_ALTURA) {
    noJogo = false
  }

  if (y[0] < 0) {
    noJogo = false
  }

  if (x[0] >= C_LARGURA) {
    noJogo = false
  }

  if (x[0] < 0) {
    noJogo = false
  }
}

function mover() {
  for (var z = pontos; z > 0; z--) {
    x[z] = x[z - 1]
    y[z] = y[z - 1]
  }

  if (paraEsquerda) {
    x[0] -= TAMANHO_PONTO
  }

  if (paraDireita) {
    x[0] += TAMANHO_PONTO
  }

  if (paraCima) {
    y[0] -= TAMANHO_PONTO
  }

  if (paraBaixo) {
    y[0] += TAMANHO_PONTO
  }
}

function fazerDesenho() {
  ctx.clearRect(0, 0, C_LARGURA, C_ALTURA)
  ctx.fillRect(0, 0, C_LARGURA, C_ALTURA)

  if (noJogo) {
    ctx.drawImage(maca, maca_x, maca_y)

    for (var z = 0; z < pontos; z++) {
      if (z == 0) {
        ctx.drawImage(cabeca, x[z], y[z])
      } else {
        ctx.drawImage(corpo, x[z], y[z])
      }
    }
  } else {
    fimDeJogo()
  }
}

function fimDeJogo() {
  ctx.fillStyle = 'black'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.font = 'normal bold 20px serif'
  ctx.fillText('Fim de Jogo', C_LARGURA / 2, C_ALTURA / 2)
}

function verificarTecla(e) {
  var tecla = e.keyCode

  if (tecla == teclas.find((key) => key == 37) && !paraDireita) {
    paraEsquerda = true
    paraCima = false
    paraBaixo = false
  }

  if (tecla == teclas.find((key) => 39 == key) && !paraEsquerda) {
    paraDireita = true
    paraCima = false
    paraBaixo = false
  }

  if (tecla == teclas.find((key) => 38 == key) && !paraBaixo) {
    paraCima = true
    paraDireita = false
    paraEsquerda = false
  }

  if (tecla == teclas.find((key) => 40 == key) && !paraCima) {
    paraBaixo = true
    paraDireita = false
    paraEsquerda = false
  }
}
