/*
    *_*_*_*_*_*_*_*_*_*_*VARIABLES*_*_*_*_*_*_*_*_*_*_*
*/
//gameStatus
let hasStarted = false
//Affichera les lettres skate + DOM
let skateLettersArr = ['[', '_', '_', '_', '_', '_', ']'];
let skateDom = document.querySelector('#skate');

//Va stocker la liste de tricks disponible en fonction du niveau
let trickList = [];

//Main app Dom
let appDom = document.querySelector("#app");

//Choix difficulté Dom
let listLvl = document.querySelectorAll("#lvl-choice li");

//Gestion du score
let score = 0;//actual score
let bestScore = 0;//Personnal best
let fail = 0;//correspond au nombre de lettre "S.K.A.T.E" affiché
let addPoint;//incremente score en fonction du niveau de difficulté
let scoreDom = document.querySelector('#score');
let bestScoreDom = document.querySelector('#bestScore');

//Gestion des tricks
//selection des boutton
let winBtn = document.querySelector("#win");
let loseBtn = document.querySelector('#lose');
let tricksDom = document.querySelector('#trick');

//fonctionnalité supplementaires
//Restart
let restartBtn = document.querySelector('#restart');

//history
let historyBtn = document.querySelector('#historyBtn');
let historyDom = document.querySelector('#history-list');
/*
    *_*_*_*_*_*_*_*_*_*_*FONCTIONS*_*_*_*_*_*_*_*_*_*_*
*/
// commence le jeu une fois le niveau de difficulté choisi
function startGame() {
    hasStarted = true;
    skateDom.innerHTML = "";
    skateLettersArr = ['[', '_', '_', '_', '_', '_', ']']
    for (const letter of skateLettersArr) {
        skateDom.innerHTML += letter;
    }
    //vide l'historique
    historyDom.innerHTML = "";
    //affiche une premiere trick
    GenerateTrick(trickList);
}

function gameInit() {
    //Si personnal best est battu on l'update
    if (score > bestScore) {
        bestScore = score;
        bestScoreDom.innerHTML = bestScore;
    }
    //affiche score actuel
    tricksDom.innerHTML = 'Game over, score :' + score + '<br /> Choose Your Difficulty';
    //arrete la partie + init variables
    hasStarted = false;
    score = 0;
    fail = 0;
    scoreDom.innerHTML = score;
}

//choix de la difficulté,configure trickList , puis commence le jeu
function onClickChooseLvl() {
    if (!hasStarted) {
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
function GenerateTrick(arr) {
    let index = getRandomInteger(0, arr.length - 1);
    tricksDom.innerHTML = trickList[index];
}

//Si trick reussi
function winOnClick() {
    if (hasStarted) {
        //incremente et update score
        score += addPoint;
        scoreDom.innerHTML = score;
        //update de l'historique
        historyDom.innerHTML += '<li>' + tricksDom.textContent.trim() + ' <span class="green">+' + addPoint + '</span></li>';
        //genere une nouvelle trick
        GenerateTrick(trickList);
    }
}
//Si trick raté
function loseOnclick() {
    let letterHistory;//stock la lettre pour l'historique
    let trickHistory = tricksDom.textContent.trim();//stock la tricks pour l'historique
    if (hasStarted) {
        //update le tableau et l'affichage de skate[] en fonction du nombre de fail
        fail++;
        switch (fail) {
            case 1:
                //letterHistory && skateLettersArr[1] = 'S';
                letterHistory = skateLettersArr[1] = 'S';
                GenerateTrick(trickList);
                break;
            case 2:
                letterHistory = skateLettersArr[2] = 'K';
                GenerateTrick(trickList);
                break;
            case 3:
                letterHistory = skateLettersArr[3] = 'A';
                GenerateTrick(trickList);
                break;
            case 4:
                letterHistory = skateLettersArr[4] = 'T';
                GenerateTrick(trickList);
                break;
            case 5://game over
                letterHistory = skateLettersArr[5] = 'E';
                gameInit();
                break;
        }
        //update l'historique
        historyDom.innerHTML += '<li>' + trickHistory + ' <span class="red"> ' + letterHistory + '</span></li>';
        skateDom.innerHTML = "";
        for (letter of skateLettersArr) {
            skateDom.innerHTML += letter;
        }
    }
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
    winBtn.addEventListener("click", winOnClick);
    loseBtn.addEventListener("click", loseOnclick);
    //restart
    restartBtn.addEventListener("click", gameInit);
    //affiche l'historique des tricks
    historyBtn.addEventListener("click", function () {
        historyDom.classList.toggle('display-none')
    });

});

