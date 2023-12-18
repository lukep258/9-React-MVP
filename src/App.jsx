import { useState, useEffect } from 'react'
import './App.css'
import UsernameInput from './components/UsernameInput'

function App() {
  const [user,setUser] = useState('')
  let playerList = {}

  useEffect(()=>{
    fetch('./players')
    .then(response=>response.json())
    .then(data=>data.map((player)=>playerList[player.username]=player))
  },[])

  return (
    <div>
      <h1>TypeTrain</h1>
      {user===''&&<UsernameInput playerList={playerList}/>}
    </div>
  )
}

export default App
