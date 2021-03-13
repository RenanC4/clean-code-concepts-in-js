var LEGAL_PERSON = 1;
var NATURAL_PERSON = 2;
var Customer = /** @class */ (function () {
    function Customer(name, isActive, patrimony, juridicType) {
        this.name = name;
        this.isActive = isActive;
        this.patrimony = patrimony;
        this.juridicType = juridicType;
        this.taxes = new Taxes(this.juridicType);
    }
    Customer.prototype.getLiquidPatrimony = function () {
        try {
            return this.calcLiquidPatrimony();
        }
        catch (error) {
            return { error: error, message: 'Invalid juridicType' };
        }
    };
    Customer.prototype.calcLiquidPatrimony = function () {
        var customerTaxes = this.taxes.getTaxes();
        var liquidPatrimony = this.patrimony - customerTaxes;
        return liquidPatrimony;
    };
    return Customer;
}());
var Taxes = /** @class */ (function () {
    function Taxes(juridicType) {
        if (!juridicType) {
            throw new Error('juridic type shouldnt be undefined');
        }
        this.juridicType = juridicType;
    }
    Taxes.prototype.getTaxes = function () {
        if (this.juridicType === LEGAL_PERSON) {
            return 100;
        }
        if (this.juridicType === NATURAL_PERSON) {
            return 200;
        }
        throw new Error('juridic type must be a valid argument');
    };
    return Taxes;
}());
var customer = new Customer('renan', true, 2000, 1);
console.log(customer.getLiquidPatrimony());
