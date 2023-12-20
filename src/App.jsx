import { useState, useEffect } from 'react'
import './App.css'
import UsernameInput from './components/UsernameInput'
import Game from './components/Game'
import Leaderboard from './components/Leaderboard'

const socket=io()

function App() {
  const [user,setUser] = useState('')
  const [lobby,setLobby] = useState(null)
  const [paragraph,setParagraph] = useState('')
  const [wordP,setWordP] = useState(0)
  const [charP,setCharP] = useState(0)
  const [charCount,setCharCount] = useState(0)
  const [correctCount,setCorrectCount] = useState(0)
  const [time,setTime] = useState(-11)
  const [playersProgress,setPlayersProgress] = useState([])
  const [displayLB,setDisplayLB] = useState(false)
  const [ranks,setRanks] = useState([])
  let startTime = 0
  let playerList = {}
  
  useEffect(()=>{
    const getPlayers=async()=>{
      await fetch('./players')
      .then(response=>response.json())
      .then(data=>{
        playerList={...data}
      })
    }
    getPlayers()
  },[])

  useEffect(()=>{
    if(displayLB===true){
      socket.emit('finished',user)
    }
  },[displayLB])

  const sendNewUser=(user)=>{
    socket.emit('newUser',user)
    console.log(`sending newUser requesst for username: ${user}`)
  }

  const checkClock=()=>{
    const currTime = new Date()[Symbol.toPrimitive]('number')
    const timeElapsed = Math.floor((currTime-startTime)/1000)
    setTime(timeElapsed-10)
  }

  const sendProgress=(wpm)=>{
    socket.emit('progress',[lobby,user,wpm])
  }

  const playAgain=()=>{
    setTime(-11)
    setDisplayLB(false)
    console.log('playing again')
    socket.emit('playAgain',user)
  }

  socket.once('ipCheck',(username)=>{
    if(username!==null){
      setUser(username)
      console.log(`IP detected, username set: ${username}`)
    }
  })

  socket.on('lobbyJoin',(response)=>{
    let paragraph = response[1].map(word=>(word.split('')))
    paragraph = paragraph.map(wordArr=>{
        wordArr=wordArr.map(letter=>([letter,null]))
        return wordArr
    })
    setParagraph(paragraph)

    setLobby(response[0])
    setDisplayLB(false)
    console.log(`joining lobby ${response[0]}, paragraph received`)
  })

  socket.on('startGame',()=>{
    startTime = new Date()[Symbol.toPrimitive]('number')
    setTime(-10)
    const clockInterval = setInterval(checkClock,1000)
    setTimeout(()=>{clearInterval(clockInterval)},120000)
    console.log('starting game in 5s')
  })

  socket.on('progress',(response)=>{
    setPlayersProgress(response)
  })

  socket.on('ranks',(response)=>{
    setRanks(response)
  })

  return (
    <div>
      <div id='header'>
          <div id='headerIcon'></div>
          <strong id='headerText'>TypeTrain</strong>
          {user===''&&<p id="userInstr">Enter a username</p>}
      </div>
      {displayLB===true&&
            <Leaderboard
              ranks={ranks}
              user={user}
              playAgain={playAgain}
            />
      }
      {user===''&&<div id='titleContainer'><h1 id='title'>TypeTrain</h1></div>}
      {user===''?
        <UsernameInput playerList={playerList} setUser={setUser} sendNewUser={sendNewUser}/>:
          <Game paragraph={paragraph}
            setParagraph={setParagraph}
            wordP={wordP}
            setWordP={setWordP}
            charP={charP}
            setCharP={setCharP}
            charCount={charCount}
            setCharCount={setCharCount}
            correctCount={correctCount}
            setCorrectCount={setCorrectCount}
            time={time}
            sendProgress={sendProgress}
            playersProgress={playersProgress}
            user={user}
            setDisplayLB={setDisplayLB}
            />
      }
    </div>
  )
}


export default App
