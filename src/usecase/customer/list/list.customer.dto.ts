// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputListCustomerDTO {}

interface Customer {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
    state: string
  }
}

export interface OutputListCustomerDTO {
  customers: Customer[]
}
