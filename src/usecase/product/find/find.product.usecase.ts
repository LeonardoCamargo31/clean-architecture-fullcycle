import { ProductRepositoryInterface } from '../../../domain/product/repository/product-repository.interface'
import { InputFindProductDTO, OutputFindProductDTO } from './find.product.dto'

export class FindProductUseCase {
  private readonly productRepository: ProductRepositoryInterface

  constructor (productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute (input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const product = await this.productRepository.find(input.id)
    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
