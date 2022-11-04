import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

class MessageDto {
    id?: number

    @IsNumber()
    @IsNotEmpty()
    conversationId: number

    @IsString()
    uuid?: string

    @IsNumber()
    @IsNotEmpty()
    fromMemberId: number

    @IsNumber()
    @IsNotEmpty()
    toMemberId: number

    @IsString()
    text?: string

    @IsNumber()
    status?: number
}

export { MessageDto }