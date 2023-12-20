import { useState, useEffect } from 'react'
import './App.css'
import UsernameInput from './components/UsernameInput'
import Game from './components/Game'

const socket=io()

function App() {
  const [user,setUser] = useState('')
  const [lobby,setLobby] = useState(null)
  const [paragraph,setParagraph] = useState('')
  const [wordP,setWordP] = useState(0)
  const [charP,setCharP] = useState(0)
  const [charCount,setCharCount] = useState(0)
  const [correctCount,setCorrectCount] = useState(0)
  const [time,setTime] = useState(-6)
  const [playersProgress,setPlayersProgress] = useState([])
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
    if(user!==''&&lobby===null){
      console.log(`creating user: ${user}`)
      socket.emit('newUser',user)
    }
  },[user])

  const checkClock=()=>{
    const currTime = new Date()[Symbol.toPrimitive]('number')
    const timeElapsed = Math.floor((currTime-startTime)/1000)
    setTime(timeElapsed-5)
  }

  const sendProgress=(wpm)=>{
    socket.emit('progress',[lobby,user,wpm])
  }

  socket.on('ipCheck',(username)=>{
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
    console.log(`joining lobby ${response[0]}, paragraph received`)
  })

  socket.on('startGame',()=>{
    startTime = new Date()[Symbol.toPrimitive]('number')
    setTime(-5)
    setInterval(checkClock,1000);
    setTimeout(()=>{socket.emit('gameStart')},7000);
    console.log('starting game in 5s')
  })

  socket.on('progress',(response)=>{
    console.log(response)
    setPlayersProgress(response)
  })

  return (
    <div>
      <h1>TypeTrain</h1>
      {
        user===''?
          <UsernameInput playerList={playerList} setUser={setUser}/>:
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
          />
      }
    </div>
  )
}


export default App
