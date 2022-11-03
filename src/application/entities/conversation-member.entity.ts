import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Conversation } from './conversation.entity'

@Table
export class ConversationMember extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number

    @AllowNull(false)
    @ForeignKey(() => Conversation)
    @Column(DataType.INTEGER)
    conversationId: number

    @AllowNull(false)
    @Column(DataType.INTEGER)
    memberId: number

    @AllowNull(false)
    @Column(DataType.STRING)
    registerId: string

    @AllowNull(false)
    @Default(0)
    @Column(DataType.INTEGER)
    unreadMessageCount: number

    @Column(DataType.STRING)
    firstName: string

    @Column(DataType.STRING)
    lastName: string

    @Column(DataType.STRING)
    email: string

    @Column(DataType.STRING)
    username: string

    @Column(DataType.BOOLEAN)
    isDeleted: boolean

    @BelongsTo(() => Conversation)
    conversation: Conversation
}