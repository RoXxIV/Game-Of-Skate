/*
    Novice
*/
const noobTricks = ['fakie Bigspin', 'Heelflip', 'Kickflip', 'Halfcab',
    'No Comply 180', 'Ollie North', 'Pop Shuvit'];

/*
    Intermediate
*/
const interTricks = ['Backside Flip', 'Backside Heelflip', 'Bigspin', 'Casper Flip',
    'Fakie Bigspin Flip', 'Frontside Flip', 'Frontside Heelflip', '360 Flip',
    'Varial Heelflip', 'Varial Kickflip'];

/*
    Expert
*/
const proTricks = ['Bigspin Heelflip', 'Bigspin Flip', 'Biggerflip', 'Impossible',
    'Forward Flip', 'Hardflip', 'Inward Heelflip', 'Laser Flip', 'Pressure Flip'];

/*
switch
*/
const switchTricks = ['Switch Heelflip', 'Switch Flip', 'Switch Impossible',
    'Switch Hardflip'];

//choisis un nb random entre min et max
function getRandomInteger(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


