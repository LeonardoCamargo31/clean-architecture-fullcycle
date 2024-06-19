import { Product } from '../../../domain/product/entity/product'
import { UpdateProductUseCase } from './update.product.usecase'

const product = new Product('123', 'Product 1', 10)

const mockRepository = (): any => {
  return {
    find: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('test update product use case', () => {
  it('should update a product', async () => {
    const productRepository = mockRepository()

    const input = {
      id: product.id,
      name: 'Product updated',
      price: 20
    }

    const useCase = new UpdateProductUseCase(productRepository)
    const output = await useCase.execute(input)

    expect(output).toEqual(input)
  })
})
