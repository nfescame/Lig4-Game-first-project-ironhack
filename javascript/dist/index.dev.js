"use strict";

// botões
var btnResetElement = document.getElementById('reset');
var btnPlayElement = document.getElementById('play'); // texto  para mostrar vencedor 

var textElement = document.getElementById('text'); //elemento de audio

var aladdinSoundElement = document.getElementById('aladdin'); // icone de audio, on e off

var OnOffSoundElement = document.getElementById('audioOnOff');
var audioOn = true; // seta o audio em verdadeiro como inicial 

var game = new Game();

function toogleAudio() {
  if (audioOn) {
    //verifica se o audio é verdadeiro 
    OnOffSoundElement.setAttribute('src', '/img/audioOn.jpg'); //altera a imagem do icone de audio 

    aladdinSoundElement.play(); // inicia a reprodução do audio 
  } else {
    OnOffSoundElement.setAttribute('src', '/img/audioOff.png'); //altera a imagem do icone de audio 

    aladdinSoundElement.pause(); // inicia a reprodução do audio 
  }

  audioOn = !audioOn; // inverte o valor apos a verificação
}

btnPlayElement.addEventListener('click', function (event) {
  //botão play libera o tabuleiro para jogo 
  toogleAudio();
  OnOffSoundElement.addEventListener('click', function (event) {
    //click na image do audio 
    toogleAudio(); //invoca a função de verificação de audio 
  });

  if (play) {
    //verifica se pode jogar 
    play = false; // nao iniciar uma nova jogada com uma acontecendo 

    document.addEventListener('click', function (event) {
      // verifica de o event click foi em uma coluna 
      if (event.target.parentElement.classList.contains('container-col')) {
        //pega o id da coluna que foi clicada
        var colSelect = event.target.parentElement.id; //pega o id da coluna clicada 

        var idCol = colSelect.substr(-1, 1); //retira apenas o numero da id 
        // se gome over for falso 

        if (!game.gameOver) {
          game.fillTile(idCol); //invoca a função pasando o parametro (num da coluna selecionada)

          game.printChip(); // spawn chip 

          game.checkWinCondition(); // checa condições de vitoria

          textElement.innerText = 'NEXT PLAYER'; // retorna texto principal
        } // apos a vitoria traz a posição dos 4 tiles que em linha para reseta-los


        game.posWinin.map(function (pos) {
          var posTile = document.getElementById(pos.toString()); //converte posição em string 

          posTile.classList.add('bg-info', 'ficha-radius'); //adiciona classe nas fichas vencedoras

          textElement.innerText = game.textWin; // campo recebe testo do ganhador  
        });
      }
    });
  } // botão de reset, volta o jogo ao estado original 


  btnResetElement.addEventListener('click', function (event) {
    window.location.reload();
  });
});