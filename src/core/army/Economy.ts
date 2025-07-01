export class EconomyLord {

    coinQuantity = 100 // infinite can ajust as it want

    energy = 1.0 // 0 to 1
    attackPower = 1.0 // 0 to 1 (the level of fear from slave)

    materials: { name: "rice", quantity: 0, unit: "kg" }

}

export class EconomySlave {

    coinQuantity = 0
    debtPerCycle = 5 // rapport de force qui oblige à payer la dette

    energy = 1.0 // 0 to 1

    contract = { material: { name: "rice", quantity: 100, unit: "kg" }, coinToEarn: 1 }

}
