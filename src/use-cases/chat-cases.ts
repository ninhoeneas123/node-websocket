import ChatTechModel from '../db/schemas/chat-tech.schema'
import ChatSportModel from '../db/schemas/chat-sport.schema'
import ChatAutoModel from '../db/schemas/chat-auto.schema'
import { FindHistory } from '../interfaces/find-history.interface'
import { SaveMenssage } from '../interfaces/save-message.interface'

class ChatUseCases {
    
    async findHistory(chatName: string): Promise<Array<FindHistory>> {
        let historicData: Array<FindHistory> = []

        switch (chatName) {
            case "tech":
                historicData = await ChatTechModel.find()
                break;
            case "sport":
                historicData = await ChatSportModel.find()
                break;
            case "autos":
                historicData = await ChatAutoModel.find()
                break;
            default:
                throw new Error(`ChatName '${chatName}' is not supported.`);
        }
        return historicData
    }

    async createHistory(chatName: string, data: SaveMenssage) {
        const dataMessage = data
        dataMessage.shippingTime = Date.now()

        switch (chatName) {
            case "tech":
                await ChatTechModel.create(dataMessage)
                break;
            case "sport":
                await ChatSportModel.create(dataMessage)
                break;
            case "autos":
                await ChatAutoModel.create(dataMessage)
                break;
            default:
                throw new Error(`ChatName '${chatName}' is not supported.`);
        }
    }
}

export default new ChatUseCases()