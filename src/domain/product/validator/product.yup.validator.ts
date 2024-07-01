import { ValidatorInterface } from '../../@shared/validator/validator.interface'
import { Product } from '../entity/product'
import * as yup from 'yup'

export class ProductYupValidator implements ValidatorInterface<Product> {
  validate (entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('id is required'),
          name: yup.string().required('name is required'),
          price: yup.number().min(0, 'price is less than 0')
        })
        .validateSync({
          id: entity.id,
          name: entity.name,
          price: entity.price
        }, {
          abortEarly: false
        })
    } catch (errors) {
      const err = errors as yup.ValidationError
      err.errors.forEach((error) => {
        entity.notification.addError({
          context: 'product',
          message: error
        })
      })
    }
  }
}
