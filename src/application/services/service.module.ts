import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Conversation, ConversationMember } from '../entities'
import { ConversationService } from './'

@Module({
    imports: [
        SequelizeModule.forFeature([Conversation, ConversationMember]) // <-- add every new entities here

    ],
    providers: [ConversationService], // <--- add every new service here
    exports: [ConversationService] // <--- add every new service here
})
export class ServiceModule {}