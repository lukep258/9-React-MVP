import express from 'express'
import dotenv from 'dotenv'
import pg from 'pg'
import http from 'http'
import { Server } from 'socket.io'
import randomText from './prideandprejudice.js'

dotenv.config()
const app=express()
const port=process.env.PORT
const server=http.createServer(app)
const io=new Server(server)

app.use(express.json())
app.use(express.static('dist'))

const currLobbys=[
    {
        pCount:2,
        players:['guest3425','guest6345'],
        inSession:true
    },
    {
        pCount:0,
        players:[],
        inSession:true
    }
]


const init=()=>{
    socketEvents()

    userIP()

    server.listen(port,()=>{console.log(`listening on ${port}`)})
}

const userIP=()=>{
    app.get('/players',(req,res)=>{
        const paramsArr=req.url.split('/')
        console.log('paramsArr:',paramsArr)
        
        pool.query('select * from players')
        .then(result=>{
            const pIPObj={}
            for(let player of result.rows){
                pIPObj[player.ip]=player.username
            }
            res.send(pIPObj)}
        )
    })
}

const socketEvents=()=>{
    io.on('connection',async(socket)=>{
        const clientIP = socket.handshake.address

        //checking for existing username with IP
        const username = await checkIP(clientIP)
        socket.emit('ipCheck',username)
        if(username!==null){
            const joiningLobby=findLobby()
            currLobbys[joiningLobby].players.push(username)
            const send = [joiningLobby,randomText()]
            socket.emit('lobbyJoin',send)
            console.log(`${username} joining lobby ${joiningLobby}`)
        }

        //creating a new user in database
        socket.on('newUser',(username)=>{
            createUser(username,clientIP)
            const joiningLobby=findLobby()
            currLobbys[joiningLobby].players.push(username)
            const send = [joiningLobby,randomText()]
            socket.emit('lobbyJoin',send)
            console.log(`${username} joining lobby ${joiningLobby}`)
        })

        socket.on('test',()=>{
            socket.emit('good test')
        })
    })
}

const checkIP=async(IP)=>{
    let user
    await pool.query(`select * from players where IP='${IP}'`)
    .then(result=>{
        if(result.rows.length===0){
            user=null
        }else{
            user=result.rows[0].username
        }
    })
    return user
}

const findLobby=()=>{
    let freeLobby=null
    let lobbyI=0
    while(freeLobby===null){
        if(currLobbys[lobbyI]===undefined){
            freeLobby=lobbyI
            currLobbys.push({pCount:0,players:[],inSession:false})
        }else{
            if(currLobbys[lobbyI].inSession===false){
                freeLobby=lobbyI
            }
        }
        lobbyI++
    }
    return freeLobby
}

const createUser=(username,IP)=>{
    pool.query(`insert into players (username,rank,wpm,IP) values ('${username}',0,0,'${IP}')`)
    console.log(`new player user:${username}, IP:${IP}`)
}

const newPool=()=>{
    const connectionString=process.env.DATABASE_URL||{
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    }

    const pool=new pg.Pool({connectionString})
    return pool
}

const pool = newPool()
init()