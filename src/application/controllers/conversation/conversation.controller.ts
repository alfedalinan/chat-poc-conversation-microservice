import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { Conversation } from '../../entities'
import { ConversationService } from '../../services'
import { ConversationDto } from '../../dtos'

@Controller('conversations')
export class ConversationController {
    constructor(private readonly conversationService: ConversationService) { }
    
    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() conversationDto: ConversationDto): Promise<Conversation> {
      return await this.conversationService.create(conversationDto)
    }

    @Get('user-id/:userId')
    async getAllByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<Conversation[]> {
      return await this.conversationService.getAllByUserId(userId)
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<Conversation> {
      return await this.conversationService.getById(id)
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() conversationDto: ConversationDto): Promise<[affectedCount: number]> {
      return await this.conversationService.update(id, conversationDto)
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
      return await this.conversationService.remove(id)
    }
}