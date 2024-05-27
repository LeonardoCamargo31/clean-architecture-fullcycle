export interface InputCreateCustomerDTO {
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
    state: string
  }
}

export interface OutputCreateCustomerDTO {
  id: string
  name: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    number: number
  }
}
