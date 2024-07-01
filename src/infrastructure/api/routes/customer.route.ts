import express, { Request, Response, response } from 'express'
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create.customer.usecase'
import CustomerRepository from '../../customer/repository/sequelize/customer-repository'
import { InputCreateCustomerDTO } from '../../../usecase/customer/create/create.customer.dto'
import { ListCustomerUseCase } from '../../../usecase/customer/list/list.customer.usecase'
import { json } from 'sequelize'
import { CustomerPresenter } from '../presenters/customer.presenter'

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

customerRoute.get('/', async (req: Request, res: Response) => {
  const customerRepository = new CustomerRepository()
  const usecase = new ListCustomerUseCase(customerRepository)
  try {
    const output = await usecase.execute({})
    // o retorno do DTO = resultado do que eu quero disponibilizar como resposta da API
    // pode ter cenários que minha API espera um retorno e meu DTO tem outro formato
    // para isso temos um cara ai no meio, que chamamos de presenter
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(CustomerPresenter.listXML(output))
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})
