function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rollDice(min, max, quant) {
    let sum = 0;

    for (let i = 0; i < quant; i++) {
        let dice = [];

        dice[i] = randomInteger(min, max);

        sum += dice[i];
    }

    return sum;
}