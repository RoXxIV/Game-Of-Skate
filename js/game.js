/*
    *_*_*_*_*_*_*_*_*_*_*VARIABLES*_*_*_*_*_*_*_*_*_*_*
*/
//gameStatus
let gameStarted = false
//Affichera les lettres skate + DOM
let skate = ['[', '_', '_', '_', '_', '_', ']'];
let showSkate = document.querySelector('#skate');

//Va stocker la liste de tricks disponible en fonction du niveau
let trickList = [];

//Main app Dom
let app = document.querySelector("#app");

//Choix difficulté Dom
let blockLvlButton = document.querySelector("#lvl-choice");
let listLvl = document.querySelectorAll("#lvl-choice li");


//Gestion du score
let score = 0;//actual score
let bestScore = 0;//Personnal best
let showScore = document.querySelector('#score');
let showBestScore = document.querySelector('#bestScore');
let fail = 0;//correspond au nombre de lettre "S.K.A.T.E" affiché
let addPoint;//incremente score en fonction du niveau de difficulté

//Gestion des tricks
//selection des boutton
let win = document.querySelector("#win");
let lose = document.querySelector('#lose');
let showTrick = document.querySelector('#trick');//affiche la tricks ici

/*
    *_*_*_*_*_*_*_*_*_*_*FONCTIONS*_*_*_*_*_*_*_*_*_*_*
*/
// commence le jeu une fois le niveau de difficulté choisi
function startGame() {
    gameStarted = true;
    showSkate.innerHTML = "";
    skate = ['[', '_', '_', '_', '_', '_', ']']
    for (let i = 0; i < skate.length; i++) {
        showSkate.innerHTML += skate[i];
    }
    //console.log('start game', trickList)
    //affiche une premiere trick
    giveMeaTrick(trickList);
}

//choix de la difficulté,configure trickList , puis commence le jeu
function onClickChooseLvl() {
    if (!gameStarted) {
        //recupere le niveau choisis
        let difficulty = this.textContent.trim();
        //configure trickList et addPoint en fonction du niveau choisi
        switch (difficulty) {
            case 'Novice':
                trickList = noobTricks;
                addPoint = 1;
                break;
            case 'Intermediate':
                trickList = noobTricks.concat(interTricks);
                addPoint = 2;
                break;
            case 'Expert':
                trickList = noobTricks.concat(interTricks, proTricks);
                addPoint = 3;
                break;
        }
        //initialise le jeu
        startGame();
    }
}

//Genere une trick aleatoirement
function giveMeaTrick(arr) {
    let index = getRandomInteger(0, arr.length - 1);
    showTrick.innerHTML = trickList[index];
}

//Si trick reussi
function winOnClick() {
    if (gameStarted) {
        //incremente et update score
        score += addPoint;
        showScore.innerHTML = score;
        //genere une nouvelle trick
        giveMeaTrick(trickList);
    }
}
//Si trick raté
function loseOnclick() {
    if (gameStarted) {
        //update le tableau et l'affichage de skate[] en fonction du nombre de fail
        fail++
        switch (fail) {
            case 1:
                skate[1] = 'S';
                break;
            case 2:
                skate[2] = 'K';
                break;
            case 3:
                skate[3] = 'A';
                break;
            case 4:
                skate[4] = 'T';
                break;
            case 5://game over
                skate[5] = 'E';
                showTrick.innerHTML = 'Game over, score :' + score + '<br /> Choose Your Difficulty';
                gameStarted = false;
                gameInit();
                break;
        }
        showSkate.innerHTML = "";
        for (let i = 0; i < skate.length; i++) {
            showSkate.innerHTML += skate[i];
        }
    }
}

function gameInit() {
    // personnal best est battu on l'update
    if (score > bestScore) {
        bestScore = score;
        showBestScore.innerHTML = bestScore;
    }
    score = 0;
    fail = 0;
    showScore.innerHTML = score;
}
/*
    *_*_*_*_*_*_*_*_*_*_*EVENTS*_*_*_*_*_*_*_*_*_*_*
*/
//s'execute une fois le DOM chargé
document.addEventListener("DOMContentLoaded", function () {
    //event boutton "choix de la difficulté"
    for (let lvl of listLvl) {
        lvl.addEventListener("click", onClickChooseLvl);
    }
    //boutton trick reussi
    win.addEventListener("click", winOnClick);
    lose.addEventListener("click", loseOnclick);

});

