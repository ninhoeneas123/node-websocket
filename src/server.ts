import express from 'express';
import { createServer } from 'node:http';
import * as path from 'path';
import {Server} from 'socket.io';
import http from 'http'
import { connectDb } from './db/db-connect';
import * as dotenv from 'dotenv';


const PORT = process.env.PORT || 3001
const app = express()
app.use(express.static(__dirname + '/../public'))

dotenv.config();

const httpService = http.createServer(app)
export const io = new Server(httpService, {
    path: '/socket.io'
})

console.log(`DB in ${process.env.DB_URL}`)
connectDb()

httpService.listen(PORT, () => {
    
    console.log(`listening on port ${PORT}`)
})


