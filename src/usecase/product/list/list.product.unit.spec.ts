import { ProductFactory } from '../../../domain/product/factory/product-factory'
import { ListProductUseCase } from './list.product.usecase'

const product1 = ProductFactory.create('a','Product 1',10)
const product2 = ProductFactory.create('a','Product 2',20)

const mockRepository = (): any => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue([product1, product2]),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('test for listing product use case', () => {
  it('should list a customer', async () => {
    const customerRepository = mockRepository()

    const useCase = new ListProductUseCase(customerRepository)
    const output = await useCase.execute(undefined)

    expect(output.products.length).toEqual(2)
    expect(output.products[0].id).toEqual(product1.id)
    expect(output.products[0].name).toEqual(product1.name)
    expect(output.products[0].price).toEqual(product1.price)
    expect(output.products[1].id).toEqual(product2.id)
    expect(output.products[1].name).toEqual(product2.name)
    expect(output.products[1].price).toEqual(product2.price)
  })
})
