import { rollDice } from "./dice.js";

export class pcClass {
    totalHP = 0
    constructor(hitDice, maxLevel){
        this.hitDice = hitDice
        this.maxLevel = maxLevel
    }

    calculateHP() {
        this.totalHP = rollDice(1, this.hitDice, 1)
    }

    returnHP() {
        console.log(`This character has ${this.totalHP} Hit Points`)
    }
}