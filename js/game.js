/*
    *_*_*_*_*_*_*_*_*_*_*VARIABLES-DOM*_*_*_*_*_*_*_*_*_*_*
*/
//Affichera les lettres skate
let skateLettersArr = [];
let gameLetters = {
    1: 'S',
    2: 'K',
    3: 'A',
    4: 'T',
    5: 'E'
}
let skateDom = document.querySelector('#skate');
//Main app
let appDom = document.querySelector("#app");
//button difficulté
let listLvl = document.querySelectorAll("#lvl-choice li");
//score
let scoreDom = document.querySelector('#score');
let bestScoreDom = document.querySelector('#bestScore');
//info supp
let infoMsgDom = document.querySelector("#info-msg");
//selection des boutton
let winBtn = document.querySelector("#win");
let loseBtn = document.querySelector('#lose');
let tricksDom = document.querySelector('#trick');
//Restart
let restartBtn = document.querySelector('#restart');
//history
let historyBtn = document.querySelector('#historyBtn');
let historyDom = document.querySelector('#history-list');
//Switch
let switchBtn = document.querySelector('#switch');
/*
    *_*_*_*_*_*_*_*_*_*_*VARIABLES-APP*_*_*_*_*_*_*_*_*_*_*
*/
/*
    gameStatus
*/
let GameStatus = {
    hasStarted: false,
    hasSwitch: false
}
/*
    Choix difficulté 
*/
let difficulty;
//configuration du niveau choisis
const difficultyUpdate = {
    novice: {
        availableTricks: gameTricks.novice,
        points: 1
    },
    intermediate: {
        availableTricks: gameTricks.novice.concat(gameTricks.intermediate),
        points: 2
    },
    expert: {
        availableTricks: gameTricks.novice.concat(gameTricks.intermediate, gameTricks.expert),
        points: 3
    }
}
//Va stocker la liste de tricks disponible en fonction du niveau
let trickList = gameTricks.novice;

/*
Gestion du score
*/
let score = 0;//actual score
let bestScore = 0;//Personnal best
let fail = 0;//correspond au nombre de lettre "S.K.A.T.E" affiché
let addPoint;//incremente score en fonction du niveau de difficulté

/*
    *_*_*_*_*_*_*_*_*_*_*FONCTIONS*_*_*_*_*_*_*_*_*_*_*
*/
// commence le jeu une fois le niveau de difficulté choisi
function startGame() {
    GameStatus.hasStarted = true;// la partie commence
    skateDom.innerHTML = "";
    skateLettersArr = ['[', '_', '_', '_', '_', '_', ']']
    for (const letter of skateLettersArr) {
        skateDom.innerHTML += letter;
    }
    //vide l'historique + infoMsg
    historyDom.innerHTML = "";
    infoMsgDom.innerHTML = "";
    //affiche une premiere trick
    GenerateTrick(trickList);
}
//initialisation de la partie
function gameInit() {
    //Si personnal best est battu on l'update
    if (score > bestScore) {
        bestScore = score;
        bestScoreDom.innerHTML = bestScore;
    }
    //affiche score actuel
    tricksDom.innerHTML = 'Game over, score :' + score;
    //arrete la partie + init variables
    GameStatus.hasStarted = false;
    GameStatus.hasSwitch = false;
    score = 0;
    fail = 0;
    scoreDom.innerHTML = score;
    infoMsgDom.innerHTML = 'Choose a Difficulty to start the game';
}
//choix de la difficulté,configure trickList , puis commence le jeu
function onClickChooseLvl() {
    if (!GameStatus.hasStarted) {
        //recupere le niveau choisis
        difficulty = this.textContent.trim().toLowerCase();
        //configure trickList et addPoint en fonction du niveau choisi
        trickList = difficultyUpdate[difficulty].availableTricks;
        addPoint = difficultyUpdate[difficulty].points;
        //Commence la partie
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
    if (GameStatus.hasStarted) {
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
    if (GameStatus.hasStarted) {
        /*
        update le tableau et l'affichage de skate[] en fonction
        du nombre de fail
        */
        fail++;
        //recupere la lettre correspondante au nombre de fail
        letterHistory = skateLettersArr[fail] = gameLetters[fail]
        //genere une tricks ou initialise la partie
        if (fail > 0 && fail < 5) {
            GenerateTrick(trickList);
        } else {
            gameInit()
        }
        //update l'historique
        historyDom.innerHTML += '<li>' + trickHistory + ' <span class="red"> ' + letterHistory + '</span></li>';
        skateDom.innerHTML = "";
        for (letter of skateLettersArr) {
            skateDom.innerHTML += letter;
        }
    }
}
function switchOnClick() {
    const regex = new RegExp('Switch');
    //si la partie a commencé
    if (GameStatus.hasStarted) {
        /*
        Si le switch n'est pas activé, on l'active puis on ajoute les tricks
        en switch.
        En fonction du niveau. les points sont doublé
        */
        if (!GameStatus.hasSwitch) {
            //active le switch
            GameStatus.hasSwitch = true;
            //ajoute les tricks (switch) en fonction de la difficulté
            switch (difficulty) {
                case 'novice':
                    trickList = trickList.concat(switchTricks.novice);
                    break;
                case 'intermediate':
                    trickList = trickList.concat(switchTricks.novice, switchTricks.intermediate);
                    break;
                case 'expert':
                    trickList = trickList.concat(switchTricks.novice, switchTricks.intermediate, switchTricks.expert);
                    break;
            }
            //double les points
            addPoint *= 2;
            infoMsgDom.innerHTML = 'Double points';
        }
        /*
        Si le switch est activé, on le desactive puis on supprime les tricks
         en switch.
        Les points sont divisé par 2
        */
        else if (GameStatus.hasSwitch) {
            GameStatus.hasSwitch = false;
            // copie du tableau de trick qui filtre et supprime les trick contenant le mot "switch"
            trickList = trickList.filter(trick => !regex.test(trick));
            addPoint /= 2;
            infoMsgDom.innerHTML = "";
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
    //switch
    switchBtn.addEventListener("click", switchOnClick);
});

