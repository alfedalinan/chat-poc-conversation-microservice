import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { SequelizeModule, getModelToken } from '@nestjs/sequelize'
import { Message } from '../src/application/entities'

describe('MessageController', () => {
  let app: INestApplication
  let messageModel: typeof Message

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([Message]),
        AppModule
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    messageModel = moduleFixture.get(getModelToken(Message))
    await messageModel.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
                           .then(() => {
                            return messageModel.truncate({ cascade: true })
                           })

    await app.init()
  })

  afterAll(done => {
    messageModel.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
    done()
  })
  
  it('/messages (POST)', () => {
    let data = {
      conversationId: 1,
      uuid: '12345-abcde-xyxyxy',
      fromMemberId: 1,
      toMemberId: 2,
      text: 'Hi! This is my first message E2E!',
      status: 0
    }

    return request(app.getHttpServer())
      .post('/messages')
      .send(data)
      .then(response => {
        expect(response.body).toBeTruthy()
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeTruthy()
      })
  })

  it('/messages/unread/to-member-id/{:toMemberId} (GET)', () => {
    let toMemberId = 1
    return request(app.getHttpServer())
      .get(`/messages/unread/to-member-id/${toMemberId}`)
      .then(response => {
        expect(response.body).toBeTruthy()
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBeGreaterThanOrEqual(0)
      })
  })

  it('/messages/set-to-delivered/{:uuid} (PATCH)', () => {
    let uuid = '12345-abcde-xyxyxy'
    return request(app.getHttpServer())
      .patch(`/messages/set-to-delivered/${uuid}`)
      .then(response => {

        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBeTruthy()
        expect(response.body.length).toBeGreaterThan(0)
      })
  })
})
