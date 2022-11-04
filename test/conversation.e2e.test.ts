import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { SequelizeModule, getModelToken } from '@nestjs/sequelize'
import { Conversation } from '../src/application/entities'

describe('ConversationController', () => {
  let app: INestApplication
  let id: number
  let userId: number
  let conversationModel: typeof Conversation

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([Conversation]),
        AppModule
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    conversationModel = moduleFixture.get(getModelToken(Conversation))
    await conversationModel.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
                           .then(() => {
                            return conversationModel.truncate({ cascade: true })
                           })
                           .then(() => {
                            return conversationModel.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
                           })
    await app.init()
  })

  afterAll(done => done())

  it('/conversations (POST)', () => {
    return request(app.getHttpServer())
      .post('/conversations')
      .send({
        name: 'My Conversation',
        userId: 1,
        userRegister: '123456-poiuytr-xxxxx'
      })
      .then(response => {
        expect(response.body).toBeTruthy()
        expect(response.body.hasOwnProperty('id')).toBeTruthy()
        expect(response.body.hasOwnProperty('userId')).toBeTruthy()
        expect(response.statusCode).toBe(200)

        id = response.body.id
        userId = response.body.userId
      })
  })

  it('/conversations/user-id/:user_id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/conversations/user-id/${userId}`)
      .then(response => {
        expect(response.body.length).toBeTruthy()
        expect(response.body.length).toBeGreaterThanOrEqual(0)
        expect(response.statusCode).toBe(200)
      })
  })
  
  it('/conversations/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/conversations/${id}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeTruthy()
        expect(response.body.id).toBeTruthy()
      })
  })

  it('/conversations/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch(`/conversations/${id}`)
      .send({
        name: 'My Update Conversation',
        userId: 1,
        userRegister: '123456-lkjhgf-yxyxyx'
      })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeTruthy()
        expect(response.body.length).toBeTruthy()
        expect(typeof response.body[0]).toBe('number')
      })
  })

  it('/conversations/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/conversations/${id}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeTruthy()
      })
  })
})
