import { rollDice } from "./dice.js"
import { pcClass } from "./class.js";

document.addEventListener('DOMContentLoaded', () => {
    const rollButtons = document.querySelectorAll('.Attributes .rollButton');
    const attributeInput = document.querySelectorAll('.attributeText');
    const restrictedClassesText = document.getElementById('restrictedClassesText')
    const resetAttButton = document.getElementById('ResetAttButton')
    const pcClassSelect = document.getElementById('pcClassSelect')
    const pcClassOptions = document.querySelectorAll('#pcClassSelect option')
    const hpRollButton = document.getElementById('hpRollButton')

    let restrictedClasses = []

    // Event responsible for handling attribute rolls
    rollButtons.forEach(rollButton => {
        // Initializes the roll count as zero
        rollButton.rollCount = 0;
        let mod = '';

        rollButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            const parentDiv = rollButton.closest('div.mb-4');
            const inputField = parentDiv.querySelector('.attributeText');
            const modifier = parentDiv.querySelector('.Modifier')

            const currentValue = parseInt(inputField.value) || 0;
            const rolledValue = rollDice(1, 6, 3);

            if ((currentValue <= 8 || currentValue === 0) && rollButton.rollCount < 2) {
                inputField.value = rolledValue;
                rollButton.rollCount++;
            } else if (currentValue > 8) {
                window.alert('You cannot reroll a value larger than 8!');
                currentValue = currentValue;
            } else if (rollButton.rollCount === 2) {
                window.alert('You have already rerolled once!');
                currentValue = currentValue;
            }

            // Values for Modifiers
            switch(rolledValue) {
                case 3:
                    mod = -3
                    break
                case 4:
                case 5:
                    mod = -2
                    break
                case 6:
                case 7:
                case 8:
                    mod = -1
                    break
                case 9:
                case 10:
                case 11:
                case 12:
                    mod = 0
                    break
                case 13:
                case 14:
                case 15:
                    mod = 1
                    break
                case 16:
                case 17:
                    mod = 2
                    break
                case 18:
                    mod = 3
                    break
                default:
                    mod = ''
            }
            modifier.innerText = 'Modifier: ' + (mod >= 0 ? '+' : '') + mod;

            // Resets all of the attributes values
            resetAttButton.addEventListener('click', () => {
                const attributes = document.querySelectorAll('.attributeText')
                attributes.forEach(attribute => {
                    attribute.value = ''
                    modifier.innerText = 'Modifier: '
                    rollButton.rollCount = 0;
                    restrictedClasses.length = 0
                })
            })
    })})

resetAttButton.addEventListener('click', () => {
    for (let i = 0; i < pcClassOptions.length; i++){
        restrictedClassesText.hidden = true
        restrictedClassesText.innerText = 'Currently Restricted Classes: '
        pcClassOptions[i].disabled = false
    }
})    

// Helper function to disable a class and log it
function restrictClass(className, optionIndex) {
    if (!restrictedClasses.includes(className)) {
        restrictedClasses.push(className);
        console.log(restrictedClasses);
        pcClassSelect.options[optionIndex].disabled = true;
    }
}

// Event responsible for handling class restrictions
pcClassSelect.addEventListener('click', () => {
    const intValue = parseInt(document.getElementById('int').value, 10);
    const conValue = parseInt(document.getElementById('con').value, 10);
    const dexValue = parseInt(document.getElementById('dex').value, 10);
    const wisValue = parseInt(document.getElementById('wis').value, 10);

    attributeInput.forEach(attribute => {
        const attributeId = attribute.getAttribute('id');
        const attributeValue = parseInt(attribute.value, 10);

        if (attributeValue < 9 && attributeValue >= 3) {
            switch (attributeId) {
                case 'dex':
                    if (intValue < 9 && intValue >= 3) {
                        restrictClass('Bard', 3);
                    } else {
                        restrictClass('Barbarian', 2);
                    }
                    restrictClass('Illusionist', 15)
                    break;
                case 'int':
                    restrictClass('Drow', 5);
                    restrictClass('Elf', 9);
                    break;
                case 'con':
                    if (intValue < 9 && intValue >= 3) {
                        restrictClass('Duergar', 7);
                    }
                    if (dexValue < 9 && dexValue >= 3) {
                        restrictClass('Halfling', 13)
                        restrictClass('Knight', 16)
                    }
                    if (wisValue < 9 && wisValue >= 3) {
                        restrictClass('Ranger', 19)
                    }
                    restrictClass('Dwarf', 8);
                    restrictClass('Gnome', 11);
                    restrictClass('Svirfneblin', 20)
                    break;
                case 'cha':
                    if (conValue < 9 && conValue >= 3) {
                        restrictClass('Half-Elf', 12);
                    }
                    restrictClass('Paladin', 18)
                    break;
                
            }

            if (restrictedClasses.length > 0) {
                restrictedClassesText.hidden = false

                for(let i = 0; i < restrictedClasses.length; i++){
                    console.log(restrictedClasses[i]);

                    // Checking if restrictedClassestext already includes the Class
                    if (!restrictedClassesText.innerText.includes(restrictedClasses[i])) {
                        restrictedClassesText.innerText += `\n${restrictedClasses[i]}`
                    }
                }
            }
        }
    });
});

    // Event responsible for handling character HP roll
    hpRollButton.addEventListener('click', () => {
        hpRollButton.rollCount = 0;
        let hpInput = document.getElementById('hpInput')
        let chosenClass = pcClassSelect.options[pcClassSelect.selectedIndex].value

        // Object to map class names to their parameters
        const classParameters = {
            Acrobat: [4, 14],
            Assassin: [4, 14],
            Barbarian: [8, 14],
            Bard: [6, 14],
            Cleric: [6, 14],
            Drow: [6, 10],
            Druid: [6, 14],
            Duergar: [6, 10],
            Dwarf: [8, 12],
            Elf: [6, 10],
            Fighter: [8, 14],
            Gnome: [4, 8],
            'Half-Elf': [6, 12],
            Halfling: [6, 8],
            'Half-Orc': [6, 8],
            Illusionist: [4, 14],
            Knight: [8, 14],
            'Magic-User': [4, 14],
            Paladin: [8, 14],
            Ranger: [8, 14],
            Svirfneblin: [6, 8],
            Thief: [4, 14],
        };

        function setHPForClass(chosenClass) {
            const params = classParameters[chosenClass];
            if (params) {
                let characterClass = new pcClass(...params);
                characterClass.calculateHP();
                hpInput.value = characterClass.totalHP;
            } else {
                hpInput.value = '';
            }
        }

        setHPForClass(chosenClass);
    })
})