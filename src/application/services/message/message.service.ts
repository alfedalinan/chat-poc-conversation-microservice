import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { Message } from '../../entities'
import { MessageDto } from '../../dtos'

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

    async create(messageDto: MessageDto): Promise<Message> {
        let data: any = messageDto
        const created: Message = await this.messageModel.build(data).save()

        const result: Message = await this.messageModel.findOne({
            where: {
                id: created.id
            }
        })

        return result ? result.get() : null
    }

    async updateToDeliveredByUuid(uuid: string): Promise<[affectedCount: number]> {
        let status: number = 1
        const result: [affectedCount: number] = await this.messageModel.update({ status }, {
            where: {
                uuid
            }
        })

        return result
    }
}