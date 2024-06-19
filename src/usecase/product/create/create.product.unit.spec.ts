import { CreateProductUseCase } from './create.product.usecase'

const mockRepository = (): any => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('test create product use case', () => {
  it('should create a product', async () => {
    const productRepository = mockRepository()

    const input = {
      name: 'Product 1',
      price: 10
    }

    const useCase = new CreateProductUseCase(productRepository)
    const output = await useCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  })

  it('should thrown an error when name is missing', async () => {
    const productRepository = mockRepository()

    const input = {
      name: '',
      price: 10
    }

    const useCase = new CreateProductUseCase(productRepository)

    await expect(useCase.execute(input)).rejects.toThrow('name is required')
  })
})
