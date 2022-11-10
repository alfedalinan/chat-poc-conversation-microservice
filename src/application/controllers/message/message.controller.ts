import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { MessageDto } from '../../dtos'
import { Message } from '../../entities'
import { MessageService } from '../../services'

@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }
    
    @Get('unread/to-member-id/:toMemberId')
    async getUnreadMessagesByDestinationUserId(@Param('toMemberId', ParseIntPipe) toMemberId: number): Promise<Message[]> {
        return await this.messageService.getUnreadMessagesByDestinationUserId(toMemberId)
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() messageDto: MessageDto): Promise<Message> {
        return await this.messageService.create(messageDto)
    }

    @Patch('set-to-delivered/:uuid')
    async setToDelivered(@Param('uuid') uuid: string): Promise<[affectedCount: number]> {
        return await this.messageService.updateToDeliveredByUuid(uuid)
    }
}