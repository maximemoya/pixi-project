export type Material = {
    quantity: number
}
export type MaterialStock = {
    iron: Material,
    copper: Material,
    tin: Material,
    blackPowder: Material,
}

const myMaterialStock: MaterialStock = {
    iron: { quantity: 0 },
    copper: { quantity: 0 },
    tin: { quantity: 0 },
    blackPowder: { quantity: 0 },
}

function canProduce9mmLowQuality(income:
    {
        amountToProduce: number,
        iron: Material,
        copper: Material,
        tin: Material,
        blackPowder: Material
    }
) {

    if (income.iron.quantity < (5 * income.amountToProduce) &&
        income.copper.quantity < (10 * income.amountToProduce) &&
        income.tin.quantity < (2.5 * income.amountToProduce) &&
        income.blackPowder.quantity < (50 * income.amountToProduce)
    ) {
        return false
    }

}

function canProduce9mmNormalQuality(income:
    {
        iron: Material,
        copper: Material,
        tin: Material,
        blackPowder: Material
    }
) {

    if (income.iron.quantity < 10 &&
        income.copper.quantity < 20 &&
        income.tin.quantity < 5 &&
        income.blackPowder.quantity < 100
    ) {
        return false
    }

}

function canProduce9mmHighQuality(income:
    {
        iron: Material,
        copper: Material,
        tin: Material,
        blackPowder: Material
    }
): boolean {

    if (income.iron.quantity < 20 &&
        income.copper.quantity < 40 &&
        income.tin.quantity < 10 &&
        income.blackPowder.quantity < 200
    ) {
        return false
    }

}

canProduce9mmLowQuality({
    amountToProduce: 1,
    ...myMaterialStock
})

export type AmmunitionCaliber = "9mm" | "5.56mm" | "7.62mm" | "12.7mm" | "20mm" | "50mm" | "75mm" | "90mm" | "120mm" | "130mm" | "155mm" | "420mm" | "800mm"

export type AmmunitionsStock = {
    c9mm: {
        low: { quantity: 0 },
        normal: { quantity: 0 },
        high: { quantity: 0 }
    }
}

export interface Succeed<T> { succeed: T, failed: null }
export type Failed<T> = { succeed: null, failed: T }

function succeed<T>(data: T): Succeed<T> { return { succeed: data, failed: null } }
function failed<T>(message: T): Failed<T> { return { succeed: null, failed: message } }

function quantityOfIn(ammunitionsStock: AmmunitionsStock, ammunitionCaliber: AmmunitionCaliber):
    | Succeed<number>
    | Failed<string> {
    switch (ammunitionCaliber) {
        case "9mm":
            const quantity = ammunitionsStock.c9mm.low.quantity + ammunitionsStock.c9mm.normal.quantity + ammunitionsStock.c9mm.high.quantity
            return succeed(quantity)
        default:
            return failed(`Ammunition caliber ${ammunitionCaliber} not supported`)
    }
}
