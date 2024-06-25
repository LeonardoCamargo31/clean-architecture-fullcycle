import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('create', () => {
    it('should create a product', async () => {
      const response = await request(app)
        .post('/product')
        .send({
          name: 'Product 1',
          price: 10
        })

      expect(response.status).toBe(200)
      expect(response.body.name).toBe('Product 1')
      expect(response.body.price).toBe(10)
    })

    it('should not create a product', async () => {
      const response = await request(app)
        .post('/product')
        .send({
          name: 'Product 1'
        })

      expect(response.status).toBe(500)
    })
  })

  describe('list', () => {
    it('should list all products', async () => {
      const responseCreated = await request(app)
        .post('/product')
        .send({
          name: 'Product 1',
          price: 10
        })

      expect(responseCreated.status).toBe(200)

      const responseListing = await request(app).get('/product')
      expect(responseListing.status).toBe(200)
      expect(responseListing.body.products.length).toBe(1)

      const product = responseListing.body.products[0]
      expect(product.name).toBe('Product 1')
      expect(product.price).toBe(10)
    })
  })
})
