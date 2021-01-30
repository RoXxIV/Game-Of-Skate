/*
    *_*_*_*_*_*_*_*_*_*_*VARIABLES*_*_*_*_*_*_*_*_*_*_*
*/
//gameStatus
let hasStarted = false;
//Affichera les lettres skate + DOM
let skateLettersArr = ['[', '_', '_', '_', '_', '_', ']'];
let skateDom = document.querySelector('#skate');

//Va stocker la liste de tricks disponible en fonction du niveau
let trickList = [];

//Main app Dom
let appDom = document.querySelector("#app");

//Choix difficulté Dom
let listLvl = document.querySelectorAll("#lvl-choice li");
let difficulty;
//configuration du niveau choisis
const difficultyUpdate = {
    novice: {
        availableTricks: allTricks.novice,
        points: 1
    },
    intermediate: {
        availableTricks: allTricks.novice.concat(allTricks.intermediate),
        points: 2
    },
    expert: {
        availableTricks: allTricks.novice.concat(allTricks.intermediate, allTricks.expert),
        points: 3
    }
}

//info supp
let infoMsgDom = document.querySelector("#info-msg");

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

//Switch
let switchBtn = document.querySelector('#switch');
let hasSwitch = false;
const regex = new RegExp('Switch');
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
    infoMsgDom.innerHTML = "";
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
    tricksDom.innerHTML = 'Game over, score :' + score;
    //arrete la partie + init variables
    hasStarted = false;
    hasSwitch = false;
    score = 0;
    fail = 0;
    scoreDom.innerHTML = score;
    infoMsgDom.innerHTML = 'Choose a Difficulty to start the game';
}

//choix de la difficulté,configure trickList , puis commence le jeu
function onClickChooseLvl() {
    if (!hasStarted) {
        //recupere le niveau choisis
        difficulty = this.textContent.trim().toLowerCase();
        //configure trickList et addPoint en fonction du niveau choisi
        trickList = difficultyUpdate[difficulty].availableTricks;
        addPoint = difficultyUpdate[difficulty].points;

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
                break;
            case 2:
                letterHistory = skateLettersArr[2] = 'K';
                break;
            case 3:
                letterHistory = skateLettersArr[3] = 'A';
                break;
            case 4:
                letterHistory = skateLettersArr[4] = 'T';
                break;
            case 5://game over
                letterHistory = skateLettersArr[5] = 'E';
                gameInit();
                break;
        }
        if (fail > 0 && fail < 5) {
            GenerateTrick(trickList);
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
    //si la partie a commencé
    if (hasStarted) {
        /*
        si le switch n'est pas activé, on l'active puis on ajoute les tricks en switch
        en fonction du niveau. les points sont doublé
        */
        if (!hasSwitch) {
            hasSwitch = true;
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
            addPoint *= 2;
            infoMsgDom.innerHTML = 'Double points';
        }
        /*
        si le switch est activé, on le desactive puis on supprime les tricks en switch.
       les points sont divisé par 2
        */
        else if (hasSwitch) {
            hasSwitch = false;
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

