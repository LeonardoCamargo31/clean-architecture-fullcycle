import express, { Request, Response, response } from 'express'
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create.customer.usecase'
import CustomerRepository from '../../customer/repository/sequelize/customer-repository'
import { InputCreateCustomerDTO } from '../../../usecase/customer/create/create.customer.dto'
import { ListCustomerUseCase } from '../../../usecase/customer/list/list.customer.usecase'
import { ProductRepository } from '../../product/repository/sequelize/product-repository'
import { CreateProductUseCase } from '../../../usecase/product/create/create.product.usecase'
import { InputCreateProductDTO } from '../../../usecase/product/create/create.product.dto'
import { ListProductUseCase } from '../../../usecase/product/list/list.product.usecase'

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
  const productRepository = new ProductRepository()
  const usecase = new CreateProductUseCase(productRepository)
  try {
    const productDTO: InputCreateProductDTO = {
      name: req.body.name,
      price: req.body.price
    }
    const output = await usecase.execute(productDTO)
    res.send(output)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

productRoute.get('/', async (req: Request, res: Response) => {
  const productRepository = new ProductRepository()
  const usecase = new ListProductUseCase(productRepository)
  try {
    const output = await usecase.execute({})
    res.send(output)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})
