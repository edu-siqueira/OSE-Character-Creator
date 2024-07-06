function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollDice(min, max, quant) {
    let sum = 0;

    for (let i = 0; i < quant; i++) {
        let dice = [];

        dice[i] = randomInteger(min, max);

        sum += dice[i];
    }

    return sum;
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.rollButton');
    const resetAttButton = document.getElementById('ResetAttButton')

    buttons.forEach(button => {
        // Inicializa a contagem de rolagens no botão como zero
        button.rollCount = 0;
        let mod;

        button.addEventListener('click', () => {
            const parentDiv = button.closest('div.mb-4');
            const inputField = parentDiv.querySelector('.attributeText');
            const modifier = parentDiv.querySelector('.Modifier')

            const currentValue = parseInt(inputField.value) || 0;
            const rolledValue = rollDice(1, 6, 3);

            if ((currentValue <= 8 || currentValue === 0) && button.rollCount < 2) {
                inputField.value = rolledValue;
                button.rollCount++;
            } else if (currentValue > 8) {
                window.alert('You cannot reroll a value larger than 8!');
            } else if (button.rollCount === 2) {
                window.alert('You have already rerolled once!');
            }

            switch(rolledValue) {
                case 3:
                    mod = -3
                    modifier.innerText = 'Modifier: ' + mod.toString()
                    break
                case 4:
                case 5:
                    mod = -2
                    modifier.innerText = 'Modifier: ' + mod.toString()
                    break
                case 6:
                case 7:
                case 8:
                    mod = -1
                    modifier.innerText = 'Modifier: ' + mod.toString()
                    break
                case 9:
                case 10:
                case 11:
                case 12:
                    mod = 0
                    modifier.innerText = 'Modifier: +' + mod.toString()
                    break
                case 13:
                case 14:
                case 15:
                    mod = 1
                    modifier.innerText = 'Modifier: +' + mod.toString()
                    break
                case 16:
                case 17:
                    mod = 2
                    modifier.innerText = 'Modifier: +' + mod.toString()
                    break
                case 18:
                    mod = 3
                    modifier.innerText = 'Modifier: +' + mod.toString()
                    break
                default:
                    mod = ''
                    modifier.innerText = 'Modifier: ' + mod.toString()
            }

            resetAttButton.addEventListener('click', () => {
                const attributes = document.querySelectorAll('.attributeText')
                attributes.forEach(attribute => {
                    attribute.value = ''
                    modifier.innerText = 'Modifier: '
                    button.rollCount = 0;
                })
            })
    })});
});