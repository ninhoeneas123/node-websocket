import { UserInterface } from './interfaces/user.interface'

class User {
    users: Array<UserInterface> = []

    create(clientId: string, userName: string) {

        const user: UserInterface = {
            clientId,
            userName
        }
        this.users.push(user)
        console.log(this.users)
    }

    filter(IdToFilter: string) {
        const user = this.users.filter(user => user.clientId === IdToFilter);
        return user[0]
    }

    delete(idToDelete: string) {
        this.users = this.users.filter(user => user.clientId !== idToDelete);
    }
}

export default new User()