import express, { Request, Response, response } from 'express'
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create.customer.usecase'
import CustomerRepository from '../../customer/repository/sequelize/customer-repository'
import { InputCreateCustomerDTO } from '../../../usecase/customer/create/create.customer.dto'

export const customerRoute = express.Router()

customerRoute.post('/', async (req: Request, res: Response) => {
  const customerRepository = new CustomerRepository()
  const usecase = new CreateCustomerUseCase(customerRepository)
  try {
    const customerDTO: InputCreateCustomerDTO = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
        state: req.body.address.state
      }
    }
    const output = await usecase.execute(customerDTO)
    res.send(output)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})