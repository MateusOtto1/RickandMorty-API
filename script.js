let nome = document.querySelector('#nome');
let numero = document.querySelector('#id');
let imagem = document.querySelector('#imagem');
let estado = document.querySelector('#estado');
let especie = document.querySelector('#especie');

let form = document.querySelector('#form');
let input = document.querySelector('#input');
let anterior = document.querySelector('#volta');
let proximo = document.querySelector('#proximo');

let procuraPerson = 1;

let apirick = async (character) => {
    let Resposta = await fetch(`https://rickandmortyapi.com/api/character/${character}`);

  if (Resposta.status === 200) {
    let dados = await Resposta.json();
    return dados;
  }
}

let AchaPersonagem = async (character) => {

  nome.innerHTML = '...';
  numero.innerHTML = 'Loading';

  let dados = await apirick(character);

  if (dados) {
    imagem.style.display = 'block';
    imagem.src = dados.image;
    nome.innerHTML = dados.name;
    numero.innerHTML = dados.id;
    estado.innerHTML = dados.status;
    especie.innerHTML = dados.species;
    input.value = '';
    procuraPerson = dados.id;
  } else {
    imagem.style.display = 'none';
    nome.innerHTML = 'Não encontrado';
    numero.innerHTML = '';
    estado.innerHTML = '';
    especie.innerHTML = '';
    input.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  AchaPersonagem(input.value.toLowerCase());
});

anterior.addEventListener('click', () => {
  if (procuraPerson > 1) {
    procuraPerson -= 1;
    AchaPersonagem(procuraPerson);
  }
});

proximo.addEventListener('click', () => {
  procuraPerson += 1;
  AchaPersonagem(procuraPerson);
});

AchaPersonagem(procuraPerson);
