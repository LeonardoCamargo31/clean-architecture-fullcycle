import { ProductFactory } from '../../../domain/product/factory/product-factory'
import { FindProductUseCase } from './find.product.usecase'

const product = ProductFactory.create('a', 'Product 1', 10)

const mockRepository = (): any => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('test find product use case', () => {
  it('should find a product', async () => {
    const productRepository = mockRepository()

    const input = { id: product.id }
    const useCase = new FindProductUseCase(productRepository)

    const output = {
      id: product.id,
      name: 'Product 1',
      price: 10
    }

    const result = await useCase.execute(input)
    expect(result).toEqual(output)
  })

  it('should not find a product', async () => {
    const productRepository = mockRepository()
    productRepository.find.mockImplementation(() => {
      throw new Error('customer not found')
    })

    const input = { id: '123' }
    const useCase = new FindProductUseCase(productRepository)

    const promise = useCase.execute(input)
    expect(promise).rejects.toThrow('customer not found')
  })
})
