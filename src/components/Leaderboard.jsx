export default function Leaderboard({ranks,user,playAgain}){
    let rank

    const mapPlayers=()=>{
        let returnArr = []
        for(let i=0;i<ranks.length;i++){
            if(ranks[i].username===user){
                rank=i
            }
            returnArr.push([i,ranks[i].username,ranks[i].wpm])
        }
        returnArr = returnArr.map(arr=>(
            <p>{arr[0]} - {arr[1]} - {arr[2]}wpm</p>
        ))
        console.log(returnArr)
        return returnArr
    }
    return(
        <div>
            <h3>leaderboard:</h3>
            {mapPlayers()}
            <button onClick={playAgain}>Play Again</button>
        </div>
    )
}