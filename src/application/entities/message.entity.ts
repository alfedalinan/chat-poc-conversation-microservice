import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Conversation } from './conversation.entity'

@Table
export class Message extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number

    @ForeignKey(() => Conversation)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    conversationId: number

    @Column(DataType.STRING)
    uuid: string

    @Column(DataType.INTEGER)
    fromMemberId: number

    @Column(DataType.INTEGER)
    toMemberId: number

    @Column(DataType.TEXT)
    text: string

    @Column(DataType.INTEGER)
    status: number

    @BelongsTo(() => Conversation)
    conversation: Conversation
}