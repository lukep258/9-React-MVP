export default function ProgressDisplay({wordP,charCount,correctCount,time,sendProgress,playersProgress,user}){
    let accuracy = correctCount/charCount||0
    let wpm = Math.ceil((wordP*accuracy/time)*60)||0
    if(time%2){sendProgress(wpm)}

    const mapPlayers=()=>{
        let returnArr = []
        for(let key in playersProgress){
            if(key!==user){
                returnArr.push([key,playersProgress[key]])
            }
        }
        returnArr = returnArr.map(player=>(
            <p>{player[0]}: {player[1]} wpm</p>
        ))
        return returnArr
    }

    return(
        <div>
            <p>accuracy: {Math.round(accuracy*10000)/100}%</p>
            <p>you: {wpm} wpm</p>
            {mapPlayers()}
        </div>
    )
}