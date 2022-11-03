import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Conversation, ConversationMember } from '../../entities'
import { ConversationDto } from '../../dtos'

@Injectable()
export class ConversationService {

    constructor(
        @InjectModel(Conversation) private conversationModel: typeof Conversation
    ) { }

    async create(conversationDto: ConversationDto): Promise<Conversation> {
        let data: any = conversationDto
        const created: Conversation = await this.conversationModel.build(data).save()
        const result: Conversation = await this.conversationModel.findOne({
            where: {
                id: created.id
            }
        })

        return result ? result.get() : null
    }

    async getAllByUserId(userId: number): Promise<Conversation[]> {

        return await this.conversationModel.findAll({
            where: {
                userId
            },
            include: [ConversationMember]
        })
    }

    async getById(id: number): Promise<Conversation> {

        const result: Conversation = await this.conversationModel.findOne({
            where: {
                id
            },
            include: [ConversationMember]
        })

        return result ? result.get() : null
    }

    async update(id: number, conversationDto: ConversationDto): Promise<[affectedCount: number]> {
        let data: any = conversationDto
        return await this.conversationModel.update(data, { where: { id } })
    }

    async remove(id: number): Promise<number> {
        return await this.conversationModel.destroy({ 
            where: { id },
            cascade: true
        })
    }
}
