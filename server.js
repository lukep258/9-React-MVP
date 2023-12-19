import express from 'express'
import dotenv from 'dotenv'
import pg from 'pg'
import http from 'http'
import { Server } from 'socket.io'

dotenv.config()
const app=express()
const port=process.env.PORT
const server=http.createServer(app)
const io=new Server(server)

app.use(express.json())
app.use(express.static('dist'))

const currLobbys={
    0:{
        pCount:2,
        players:[],
        inSession:true
    },
    1:{
        pCount:0,
        players:[],
        inSession:false
    }
}

const activeIP={
}

const init=()=>{
    socketEvents()

    userIP()
    // addPlayer()

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

const addPlayer=()=>{
    app.post('/joinLobby',(req,res)=>{
        const paramsArr=req.url.split('/')
        console.log('paramsArr:',paramsArr)
        console.log(req.body)


        res.send(`post request:${paramsArr[0]}`)
    })
}

const socketEvents=()=>{
    io.on('connection',(socket)=>{
        const clientIP = socket.handshake.address

        socket.on('newUser',(username)=>{
            let freeLobby=null
            let lobbyI=0
            while(freeLobby===null){
                if(currLobbys[lobbyI].inSession===false){
                    freeLobby=lobbyI
                }
                lobbyI++
            }
            createUser(username,clientIP,freeLobby)
        })
    })
}


const createUser=(username,IP,lobby)=>{
    console.log(username,IP,lobby)
    pool.query(`insert into players (username,rank,wpm,IP,lID) values ('${username}',0,0,'${IP}',${lobby})`)
    console.log('new player')
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