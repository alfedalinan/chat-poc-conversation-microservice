import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Conversation, ConversationMember, Message } from '../entities'
import { ConversationService, MessageService } from './'

@Module({
    imports: [
        SequelizeModule.forFeature([Conversation, ConversationMember, Message]) // <-- add every new entities here

    ],
    providers: [ConversationService, MessageService], // <--- add every new service here
    exports: [ConversationService, MessageService] // <--- add every new service here
})
export class ServiceModule {}