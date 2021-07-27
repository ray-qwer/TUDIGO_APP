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
const delay =(interval) =>{
    return new Promise((resolve)=>{
        setTimeout(resolve,interval)
    })
} 
function checkIfOverADay (prevTime) {
    // typeof(prevTime): string
    prevTime = parseInt(prevTime,10)
    let now = new Date(Date.now())
    prevTime = new Date(prevTime)
    // return true if over a day, else return false
    if ( (now - prevTime) > 86400000 || prevTime.getDay() !== now.getDay() ){
        return true
    }
    else return false
}

export { timeParse, StringOfLegalInt, delay, checkIfOverADay };