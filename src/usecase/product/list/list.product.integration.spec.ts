import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../../../infrastructure/product/repository/sequelize/product-model'
import { ProductRepository } from '../../../infrastructure/product/repository/sequelize/product-repository'
import { Product } from '../../../domain/product/entity/product'
import { ListProductUseCase } from './list.product.usecase'

describe('test list product use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a product', async () => {
    const productRepository = new ProductRepository()
    const product1 = new Product('1', 'product 1', 100)
    const product2 = new Product('2', 'product 2', 200)

    await productRepository.create(product1)
    await productRepository.create(product2)

    const input = {}
    const listProductUseCase = new ListProductUseCase(productRepository)

    const result = await listProductUseCase.execute(input)
    expect(result.products.length).toEqual(2)
    expect(result.products[0].id).toEqual(product1.id)
    expect(result.products[0].name).toEqual(product1.name)
    expect(result.products[0].price).toEqual(product1.price)
    expect(result.products[1].id).toEqual(product2.id)
    expect(result.products[1].name).toEqual(product2.name)
    expect(result.products[1].price).toEqual(product2.price)
  })
})
