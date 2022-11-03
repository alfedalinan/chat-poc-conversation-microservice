import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { SequelizeModule, getModelToken } from '@nestjs/sequelize'
import { User } from '../src/application/entities'

describe('UserController', () => {
  let app: INestApplication
  let id: number
  let userModel: typeof User

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([User]),
        AppModule
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    userModel = moduleFixture.get(getModelToken(User))
    await userModel.truncate()
    await app.init()
  })

  afterAll(done => done())

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'alfed@email.com',
        password: '1234',
        username: 'alfed.alinan'
      })
      .then(response => {
        expect(response.body).toBeTruthy()
        expect(response.statusCode).toBe(200)

        id = response.body.id
      })
  })

  it('/users (GET)', () => {
    return request(app.getHttpServer())
        .get('/users')
        .then(response => {
            expect(response.body.length).toBeGreaterThanOrEqual(1)
            expect(response.statusCode).toBe(200)
        })
  })

  it('/users/{id} (GET)', () => {
    return request(app.getHttpServer())
        .get(`/users/${id}`)
        .then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toBeTruthy()
        })
  })

  it('/users/{id} (PATCH)', () => {
    return request(app.getHttpServer())
        .patch(`/users/${id}`)
        .send({
            email: 'alfed3@email.com',
            password: '12344564',
            name: 'Alfed3'
        })
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
  })

  it('/users/{id} (DELETE)', () => {
    return request(app.getHttpServer())
        .delete(`/users/${id}`)
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
  })
})
