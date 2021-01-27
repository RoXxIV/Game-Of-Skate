/*
    *_*_*_*_*_*_*_*_*_*_*VARIABLES*_*_*_*_*_*_*_*_*_*_*
*/
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
let showScore = document.querySelector('#score');
let fail = 0;//correspond au nombre de lettre "S.K.A.T.E" affiché

//Gestion des tricks
let win = document.querySelector("#win");
let lose = document.querySelector('#lose');
let showTrick = document.querySelector('#trick');//affiche la tricks ici

/*
    *_*_*_*_*_*_*_*_*_*_*FONCTIONS*_*_*_*_*_*_*_*_*_*_*
*/
// commence le jeu une fois le niveau de difficulté choisi
function startGame() {
    // cache les boutton "choix de difficulté"
    fadeOut(blockLvlButton);
    //console.log('start game', trickList)
    //affiche une premiere trick
    giveMeaTrick(trickList);
}

//choix de la difficulté,configure trickList , puis commence le jeu
function onClickChooseLvl() {
    //recupere le niveau choisis
    let difficulty = this.textContent.trim();
    //configure trickList en fonction du niveau choisi
    switch (difficulty) {
        case 'Novice':
            trickList = noobTricks;
            break;
        case 'Intermediate':
            trickList = noobTricks.concat(interTricks);
            break;
        case 'Expert':
            trickList = noobTricks.concat(interTricks, proTricks);
            break;
    }
    //initialise le jeu
    startGame();
}

//Genere une trick aleatoirement
function giveMeaTrick(arr) {
    let index = getRandomInteger(0, arr.length - 1);
    showTrick.innerHTML = trickList[index];

}

//Si trick reussi
function winOnClick() {
    //incremente et update score
    score++;
    showScore.innerHTML = score;
    //genere une nouvelle trick
    giveMeaTrick(trickList);
}
//Si trick raté
function loseOnclick() {
    /*
        va incrémenté la variable fail 
        puis ajouté une lettre à "SKATE"
    */
}

/*
    *_*_*_*_*_*_*_*_*_*_*EVENTS*_*_*_*_*_*_*_*_*_*_*
*/
//s'execute une fois le DOM chargé
document.addEventListener("DOMContentLoaded", function () {
    //init et affiche les lettre skate, "[ _ _ _ _ _ ]"
    showSkate.innerHTML = skate;
    //event boutton "choix de la difficulté"
    for (let lvl of listLvl) {
        lvl.addEventListener("click", onClickChooseLvl);
    }
    //boutton trick reussi
    win.addEventListener("click", winOnClick);
});