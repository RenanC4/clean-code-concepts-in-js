
const LEGAL_PERSON = 1
const NATURAL_PERSON = 2

class Customer {
  name:string
  isActive: boolean
  patrimony: number
  liquidPatrimony: number
  juridicType: number
  taxes: Taxes
  constructor(name: string, isActive: boolean, patrimony: number, juridicType: number) {
    this.name = name
    this.isActive = isActive
    this.patrimony = patrimony
    this.juridicType = juridicType
    this.taxes = new Taxes(this.juridicType)
  }  

  getLiquidPatrimony() {
    try {
      return this.calcLiquidPatrimony()
    } catch (error) {
      return {error, message: 'Invalid juridicType'}
    }
  }

  private calcLiquidPatrimony() {
    const customerTaxes = this.taxes.getTaxes()
    const liquidPatrimony = this.patrimony - customerTaxes
    return liquidPatrimony
  }

}

class Taxes {
  juridicType: number
  constructor (juridicType: number) {
    if(!juridicType){
      throw new Error('juridic type shouldnt be undefined')
    }
    this.juridicType = juridicType
  }

  getTaxes() {
    if (this.juridicType === LEGAL_PERSON) {
      return 100
    }
    if(this.juridicType === NATURAL_PERSON) {
      return 200
    }
    throw new Error('juridic type must be a valid argument')
  }
}


const customer = new Customer('renan', true, 2000, 1);

console.log(customer.getLiquidPatrimony())