import { useState, useEffect } from 'react'
import './App.css'
import UsernameInput from './components/UsernameInput'
import Game from './components/Game'

const socket=io()

function App() {
  const [user,setUser] = useState('')
  const [lobby,setLobby] = useState(null)
  const [paragraph,setParagraph] = useState('')
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

  socket.on('ipCheck',(username)=>{
    if(username!==null){
      setUser(username)
      console.log(`IP detected, username set: ${username}`)
    }
  })

  socket.on('lobbyJoin',(response)=>{
    setLobby(response[0])
    setParagraph(response[1])
    console.log(`joining lobby ${response[0]}, paragraph received`)
  })


  return (
    <div>
      <h1>TypeTrain</h1>
      {user===''?
        <UsernameInput playerList={playerList} setUser={setUser}/>:
        <Game paragraph={paragraph}/>
      }
    </div>
  )
}


export default App
