import { useState, useEffect } from 'react'
import './App.css'
import UsernameInput from './components/UsernameInput'
import Game from './components/Game'

const socket=io()

function App() {
  const [user,setUser] = useState('')
  const [lobby,setLobby] = useState(null)
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

  socket.on('lobbyJoin',(lobby)=>{
    setLobby(lobby)
    console.log(`joining lobby ${lobby}`)
  })

  socket.on('paragraphTrans',(paragraph)=>{
    
  })

  return (
    <div>
      <h1>TypeTrain</h1>
      {user===''?
        <UsernameInput playerList={playerList} setUser={setUser}/>:
      <Game/>}
    </div>
  )
}


export default App
