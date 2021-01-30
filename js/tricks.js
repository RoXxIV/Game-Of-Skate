/*
    All TRicks
*/
const allTricks = {
    novice:
        [
            'fakie Bigspin', 'Heelflip', 'Kickflip', 'Halfcab',
            'No Comply 180', 'Ollie North', 'Pop Shuvit'
        ],
    intermediate:
        [
            'Backside Flip', 'Backside Heelflip', 'Bigspin', 'Casper Flip',
            'Fakie Bigspin Flip', 'Frontside Flip', 'Frontside Heelflip', '360 Flip',
            'Varial Heelflip', 'Varial Kickflip'
        ],
    expert:
        [
            'Bigspin Heelflip', 'Bigspin Flip', 'Biggerflip', 'Impossible',
            'Forward Flip', 'Hardflip', 'Inward Heelflip', 'Laser Flip', 'Pressure Flip'
        ]
}
/*
switch
*/
const switchTricks = {
    novice:
        [
            'Switch Heelflip', 'Switch Flip', 'Switch No Comply 180',
            'SwitchOllie North'
        ],
    intermediate:
        [
            'Switch Backside Flip', 'Switch Backside Heelflip', 'Switch Bigspin',
            'Switch Casper Flip', 'Fakie Bigspin Flip', 'Switch Frontside Flip',
            'Switch Frontside Heelflip', 'Switch 360 Flip', 'Switch Varial Heelflip',
            'Switch Varial Kickflip'
        ],
    expert:
        [
            'Switch Bigspin Heelflip', 'Switch Bigspin Flip', 'Switch Biggerflip',
            'Switch Impossible', 'Switch Forward Flip', 'Switch Hardflip',
            'Switch Inward Heelflip', 'Switch Laser Flip', 'Switch Pressure Flip'
        ]
};


//choisis un nb random entre min et max
function getRandomInteger(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


