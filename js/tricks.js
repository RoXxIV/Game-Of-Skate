/*
    All TRicks
*/
let gameTricks = {
    novice:
        [
            'fakie Bigspin', 'Heelflip', 'Kickflip', 'FS Halfcab',
            'No Comply 180', 'Ollie North', 'Pop Shuvit', 'Ollie',
            "Fakie Ollie", "Nollie", "FS 180", "Nollie FS 180",
            "BS 180", 'BS Halfcab', "Nollie BS 180", "Fakie Pop Shuvit",
            "Nollie Pop Shuvit", "FS Pop Shuvit", "Fakie FS Pop Shuvit",
            "Nollie FS Pop Shuvit", "Fakie Kickflip", "Fakie Heelflip",
            "360 Pop Shuvit", "Fakie 360 Pop Shuvit", "Nollie Kickflip"
        ],
    intermediate:
        [
            'BS Flip', 'BS Heelflip', 'Bigspin', 'Casper Flip',
            'Fakie Bigspin Flip', 'Frontside Flip', 'FS Heelflip', '360 Flip',
            'Varial Heelflip', 'Varial Kickflip', "Fakie Varial Kickflip",
            "Fakie Varal Heelflip", "Fakie 360 flip", "Half-Cab Flip", "FS Big Spin",
            "Double Kickflip", "FS Flip", "Double Heelflip", "Nollie 360 Pop Shuvit",
            "Nollie Heelflip"

        ],
    expert:
        [
            'Bigspin Heelflip', 'Bigspin Flip', 'Biggerflip', 'Impossible',
            'Forward Flip', 'Hardflip', 'Inward Heelflip', 'Laser Flip',
            'Pressure Flip', "Nightmare Flip", "Fakie Nightmare Flip",
            "BS 360", "FS 360", "Fakie Lazer Flip", "Fakie Inward Heelflip",
            "Nollie Varial Kickflip", "Nollie Varial Heelflip", "Varial Double HeelFlip",
            "Fakie Varial Double Flip", "Nollie 360 flip"
        ]
}
/*
switch
*/
const switchTricks = {
    novice:
        [
            'Switch Heelflip', 'Switch Flip', 'Switch FS No Comply 180',
            'SwitchOllie North', "Switch Ollie", "Switch FS 180", "Switch BS 180",
            "Switch Pop Shuvit", "Switch FS Pop Shuvit", "Switch Heelflip"
        ],
    intermediate:
        [
            'Switch Backside Flip', 'Switch Backside Heelflip', 'Switch Bigspin',
            'Switch Casper Flip', 'Fakie Bigspin Flip', 'Switch Frontside Flip',
            'Switch Frontside Heelflip', 'Switch 360 Flip', 'Switch Varial Heelflip',
            'Switch Varial Kickflip', "Switch 360 Pop Shuvit", "Switch Varial Kickflip"
        ],
    expert:
        [
            'Switch Bigspin Heelflip', 'Switch Bigspin Flip', 'Switch Biggerflip',
            'Switch Impossible', 'Switch Forward Flip', 'Switch Hardflip',
            'Switch Inward Heelflip', 'Switch Laser Flip', 'Switch Pressure Flip',
            "Switch Varial Heelflip"
        ]
};

//choisis un nb random entre min et max
function getRandomInteger(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


