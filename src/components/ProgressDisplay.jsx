export default function ProgressDisplay({wordP,charCount,correctCount,time,sendProgress,playersProgress}){
    let accuracy = correctCount/charCount||0
    let wpm = Math.ceil((wordP*accuracy/time)*60)||0
    if(time%2){sendProgress(wpm)}
    return(
        <div>
            <p>accuracy: {Math.round(accuracy*10000)/100}%</p>
            <p>wpm: {wpm}</p>
            progressDisplay
        </div>
    )
}