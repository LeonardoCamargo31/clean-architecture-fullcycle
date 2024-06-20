import { Sequelize } from 'sequelize-typescript'
import { FindProductUseCase } from './find.product.usecase'
import { ProductModel } from '../../../infrastructure/product/repository/sequelize/product-model'
import { ProductRepository } from '../../../infrastructure/product/repository/sequelize/product-repository'
import { Product } from '../../../domain/product/entity/product'

describe('test find product use case', () => {
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
    const product = new Product('1', 'product 1', 100)
    await productRepository.create(product)

    const input = {
      id: product.id
    }
    const findProductUseCase = new FindProductUseCase(productRepository)

    const output = {
      id: product.id,
      name: product.name,
      price: product.price
    }

    const result = await findProductUseCase.execute(input)
    expect(result).toEqual(output)
  })
})
