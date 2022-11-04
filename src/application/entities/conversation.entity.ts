import { Table, Column, Model, AutoIncrement, PrimaryKey, DataType, HasMany, AllowNull } from 'sequelize-typescript'
import { ConversationMember } from './conversation-member.entity'
import { Message } from './message.entity'

@Table
export class Conversation extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number

    @Column(DataType.STRING)
    name: string

    @AllowNull(false)
    @Column(DataType.INTEGER)
    userId: number

    @Column(DataType.STRING)
    userRegister: string

    @HasMany(() => ConversationMember)
    conversationMembers: ConversationMember[]

    @HasMany(() => Message)
    messages: Message[]
}