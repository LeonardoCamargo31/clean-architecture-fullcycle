import { Product } from '../../../domain/product/entity/product'
import { ProductRepositoryInterface } from '../../../domain/product/repository/product-repository.interface'
import { InputCreateProductDTO, OutputCreateProductDTO } from './create.product.dto'
import { v4 as uuid } from 'uuid'

export class CreateProductUseCase {
  private readonly productRepository: ProductRepositoryInterface

  constructor (productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute (input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const product = new Product(uuid(), input.name, input.price)
    await this.productRepository.create(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
