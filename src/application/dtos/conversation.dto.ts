import { IsString, IsNotEmpty, IsNumber  } from "class-validator"

class ConversationDto {
    id?: number
    
    @IsString()
    name?: string

    @IsNumber()
    @IsNotEmpty()
    userId: number

    @IsString()
    @IsNotEmpty()
    userRegister: string

}

export { ConversationDto }