import { useState, useEffect } from 'react'
import './App.css'
import UsernameInput from './components/UsernameInput'
import Game from './components/Game'

const socket=io()

function App() {
  const [user,setUser] = useState('')
  let playerList = {}

  
  
  useEffect(()=>{
    const getPlayers=async()=>{
      await fetch('./players')
      .then(response=>response.json())
      .then(data=>{
        console.log(data)
        data.map((player)=>playerList[player]=player.username)//map player data to playerlist
      })
    }
    getPlayers()
    console.log(playerList)
  },[])

  useEffect(()=>{
    if(user!==''){
      console.log('sending user',user)
      socket.emit('newUser',user)
    }
  },[user])

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
