import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { Message } from '../../entities'

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message) private messageModel: typeof Message
    ) { }
    
    async getUnreadMessagesByDestinationUserId(toMemberId: number): Promise<Message[]> {
        const result: Message[] = await this.messageModel.findAll({
            where: {
                toMemberId,
                status: { [Op.ne]: 2 }
            }
        })

        return result
    }
}