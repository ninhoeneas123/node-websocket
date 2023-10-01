import express from 'express';
import { createServer } from 'node:http';
import * as path from 'path';
import socket from 'socket.io'
import http from 'http'
import { connectDb } from './db/db-connect';

const PORT = process.env.PORT || 3001
const app = express()
app.use(express.static(__dirname + '/../public'))


const httpService = http.createServer(app)
export const io = socket(httpService, {
    path: '/socket.io'
})

connectDb()

httpService.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})


