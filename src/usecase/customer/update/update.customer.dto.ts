export interface InputUpdateCustomerDTO {
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

export interface OutputUpdateCustomerDTO {
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
