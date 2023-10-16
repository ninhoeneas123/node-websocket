import express from 'express';
import { createServer } from 'node:http';
import * as path from 'path';
import {Server} from 'socket.io';
import http from 'http'
import { connectDb } from './db/db-connect';

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.static(__dirname + '/../public'))


const httpService = http.createServer(app)
export const io = new Server(httpService, {
    path: '/socket.io'
})


connectDb()

httpService.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})


