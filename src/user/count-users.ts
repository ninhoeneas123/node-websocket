import { io } from "../server"

export class CountUsers {
    roomsData: any = {};

    toAdd(chatName: string, userId: string): number {
        if (!this.roomsData[chatName]) {
            this.roomsData[chatName] = new Set();
        }
        this.roomsData[chatName].add(userId);

        const roomClients = io.sockets.adapter.rooms.get(chatName);
        const numClients = roomClients ? roomClients.size : 0;
        console.log("Num on", numClients)
        return numClients
    }

    toRemove(clientName: string, userId: string) {
        for (const room in this.roomsData) {
            if (this.roomsData[room].has(userId)) {
                this.roomsData[room].delete(userId);
                const numClients = this.roomsData[room].size;
                console.log("num off", numClients)
                io.to(room).emit('online-users-count', { numClients, status: "offline", userName: clientName });
            }
        }
    }

}

export default new CountUsers()