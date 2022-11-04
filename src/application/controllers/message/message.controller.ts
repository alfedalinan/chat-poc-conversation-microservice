import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { Message } from '../../entities'
import { MessageService } from '../../services'

@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }
    
    @Get('unread/to-member-id/:toMemberId')
    async getUnreadMessagesByDestinationUserId(@Param('toMemberId', ParseIntPipe) toMemberId: number): Promise<Message[]> {
        return await this.messageService.getUnreadMessagesByDestinationUserId(toMemberId)
    }
}