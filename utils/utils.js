function timeParse (time) {
    let days = Math.floor(time/(1000 * 60 * 60 * 24));
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let countDown = {
        dd: days,
        hh: hours,
        mm: minutes
    }
    return countDown
}
function StringOfLegalInt (text) {
    const parsed = parseInt(text,10);
    if(isNaN(parsed)) return '0';
    else return parsed.toString();  
}
export { timeParse, StringOfLegalInt };