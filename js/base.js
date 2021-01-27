/** fadeOut() 
 * **********/
function fadeOut(el) {
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};
/** fadeIn()
 * ***********/
function fadeIn(el, display) {
    el.style.opacity = 0;
    //el.style.display = display || "block";
    // .1 = 0.1
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};
//choisis un nb random entre min et max
function getRandomInteger(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}