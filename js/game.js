/*
    global
*/
let skate = ['[', '_', '_', '_', '_', '_', ']'];
let showSkate = document.querySelector('#skate');
showSkate.innerHTML = skate;
let trickList = []; // va stocker la liste de tricks disponible en fonction du niveau
let app = document.querySelector("#app")
function startGame() {
    fadeOut(blockLvlButton)
    console.log('start game', trickList)
    giveMeaTrick(trickList)
}
/*
    choix de la difficulté
*/
let blockLvlButton = document.querySelector("#lvl-choice");
let listLvl = document.querySelectorAll("#lvl-choice li");
for (let lvl of listLvl) {
    lvl.addEventListener("click", onClickChooseLvl);
}
//configure trickList , puis commence le jeu
function onClickChooseLvl() {
    let difficulty = this.textContent.trim();
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
    startGame()
}
/*
    Gestion du score
*/
let score = 0;
let showScore = document.querySelector('#score');
let fail = 0;
/*
    new tricks
*/
let win = document.querySelector("#win");
let lose = document.querySelector('#lose');
let showTrick = document.querySelector('#trick');

function giveMeaTrick(arr) {
    let index = getRandomInteger(0, arr.length - 1)
    showTrick.innerHTML = trickList[index];

}
function winOnClick() {
    score++;
    showScore.innerHTML = score;
    giveMeaTrick(trickList)
}
function loseOnclick() {

}
win.addEventListener("click", winOnClick);




