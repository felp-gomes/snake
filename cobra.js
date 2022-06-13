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

var monstrarPontos = document.getElementById('pontos')

var contadorPontos = 0

var pontos
var maca_x
var maca_y

var paraEsquerda = false
var paraDireita = true
var paraCima = false
var paraBaixo = false
var noJogo = true
var nivelFacil = 4
var nivelIntermediario = 6
var nivelDificil = 10
var nivelDiamante = 12
var ganhar = 14

var atraso = 140 // tornar o jogo lento

const TAMANHO_PONTO = 10
const ALEATORIO_MAXIMO = 40 // Limitador de ponto de coleta aleatório
const C_ALTURA = 420 // Altura do da tela jogavel
const C_LARGURA = 500 // Largura da tela jogavel

const teclas = [37, 38, 39, 40, 65, 68, 83, 87]

var x = []
var y = []

onkeydown = verificarTecla // Define função chamada ao se pressionar uma tecla

iniciar() // Chama função inicial do jogo

// Definição das funções
var emGame

function iniciar() {
  tela = document.getElementById('tela')
  ctx = tela.getContext('2d')

  backgroundTema('mapaGrama')

  ctx.fillRect(0, 0, C_LARGURA, C_ALTURA)
  emGame = new Audio('audios/emGame.mp4')
  emGame.play()
  emGame.volume = 0.2
  emGameloop = true

  carregarImagens()
  criarCobra()
  localizarMaca()
  setTimeout('cicloDeJogo()', 500)
}

function backgroundTema(tema) {
  let img = document.getElementById(tema)
  let backgroundImage = ctx.createPattern(img, 'repeat')
  ctx.fillStyle = backgroundImage
}

function carregarImagens() {
  cabeca = new Image()
  cabeca.src = './assets/cabeca.png'

  corpo = new Image()
  corpo.src = './assets/ponto.png'

  maca = new Image()
  maca.src = './assets/macaDiamante.png'
}

function criarCobra() {
  pontos = 2

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
    setTimeout('cicloDeJogo()', atraso)
  } else {
    emGame.pause()
  }
}

function verificarMaca() {
  if (x[0] == maca_x && y[0] == maca_y) {
    contadorPontos++
    monstrarPontos.innerHTML = contadorPontos

    const musica = new Audio('audios/comer.wav')
    musica.play()

    pontos++
    verificarNivel()
    localizarMaca()
  }
}

function verificarNivel() {
  if (contadorPontos == nivelFacil) {
    const musica = new Audio('audios/nivelCompletado.wav')
    musica.play()
    backgroundTema('mapaTerra')
    atraso -= 5
  } else if (contadorPontos == nivelIntermediario) {
    const musica = new Audio('audios/nivelCompletado.wav')
    musica.play()
    backgroundTema('mapaAgua')
    atraso -= 5
  } else if (contadorPontos == nivelDificil) {
    const musica = new Audio('audios/nivelCompletado.wav')
    musica.play()
    backgroundTema('mapaEspaco')
    atraso -= 5
  } else if (contadorPontos == nivelDiamante) {
    const musica = new Audio('audios/nivelCompletado.wav')
    musica.play()
    backgroundTema('mapaDiamante')
    atraso -= 5
  } else if (contadorPontos >= ganhar) {
    noJogo = false
    window.location.href = '/vitoria.html'
  }
}

function verificarColisao() {
  for (var z = pontos; z > 0; z--) {
    if (z > 3 && x[0] == x[z] && y[0] == y[z]) {
      const musica = new Audio('audios/colicao.wav')
      musica.play()
      noJogo = false
    }
  }

  if (y[0] >= C_ALTURA) {
    const musica = new Audio('audios/colicao.wav')
    musica.play()
    noJogo = false
  }

  if (y[0] < 0) {
    const musica = new Audio('audios/colicao.wav')
    musica.play()
    noJogo = false
  }

  if (x[0] >= C_LARGURA) {
    const musica = new Audio('audios/colicao.wav')
    musica.play()
    noJogo = false
  }

  if (x[0] < 0) {
    const musica = new Audio('audios/colicao.wav')
    musica.play()
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
    setTimeout('fimDeJogo()', 1000)
  }
}

function fimDeJogo() {
  localStorage.setItem('pontos', contadorPontos)
  window.location.href = '/derrota.html'
}

function verificarTecla(e) {
  var tecla = e.keyCode

  if (
    tecla == teclas.find((key) => key == 37) ||
    (tecla == teclas.find((key) => key == 65) && !paraDireita)
  ) {
    paraEsquerda = true
    paraCima = false
    paraBaixo = false
  }

  if (
    tecla == teclas.find((key) => key == 39) ||
    (tecla == teclas.find((key) => key == 68) && !paraEsquerda)
  ) {
    paraDireita = true
    paraCima = false
    paraBaixo = false
  }

  if (
    tecla == teclas.find((key) => key == 38) ||
    (tecla == teclas.find((key) => key == 87) && !paraBaixo)
  ) {
    paraCima = true
    paraDireita = false
    paraEsquerda = false
  }

  if (
    tecla == teclas.find((key) => key == 40) ||
    (tecla == teclas.find((key) => key == 83) && !paraCima)
  ) {
    paraBaixo = true
    paraDireita = false
    paraEsquerda = false
  }
}
