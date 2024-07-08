import { rollDice } from "./dice.js"
import { pcClass } from "./class.js";

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.Attributes .rollButton');
    const resetAttButton = document.getElementById('ResetAttButton')
    const classSelect = document.getElementById('pcClass')
    const hpRollButton = document.getElementById('hpRollButton')

    buttons.forEach(button => {
        // Initializes the roll count as zero
        button.rollCount = 0;
        let mod;

        button.addEventListener('click', (ev) => {
            ev.preventDefault();
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
                currentValue = currentValue;
            } else if (button.rollCount === 2) {
                window.alert('You have already rerolled once!');
                currentValue = currentValue;
            }

            switch(rolledValue) {
                default:
                    mod = ''
                    modifier.innerText = 'Modifier: ' + mod
                case 3:
                    mod = -3
                    modifier.innerText = 'Modifier: ' + mod
                    break
                case 4:
                case 5:
                    mod = -2
                    modifier.innerText = 'Modifier: ' + mod
                    break
                case 6:
                case 7:
                case 8:
                    mod = -1
                    modifier.innerText = 'Modifier: ' + mod
                    break
                case 9:
                case 10:
                case 11:
                case 12:
                    mod = 0
                    modifier.innerText = 'Modifier: +' + mod
                    break
                case 13:
                case 14:
                case 15:
                    mod = 1
                    modifier.innerText = 'Modifier: +' + mod
                    break
                case 16:
                case 17:
                    mod = 2
                    modifier.innerText = 'Modifier: +' + mod
                    break
                case 18:
                    mod = 3
                    modifier.innerText = 'Modifier: +' + mod
                    break
            }

            resetAttButton.addEventListener('click', () => {
                const attributes = document.querySelectorAll('.attributeText')
                attributes.forEach(attribute => {
                    attribute.value = ''
                    modifier.innerText = 'Modifier: '
                    button.rollCount = 0;
                })
            })
    })})

    hpRollButton.addEventListener('click', () => {
        hpRollButton.rollCount = 0;
        let hpInput = document.getElementById('hpInput')
        let chosenClass = classSelect.options[classSelect.selectedIndex].value

        switch(chosenClass) {
            default:
                hpInput.value = ''
            case 'Acrobat':
                let acrobat = new pcClass(4, 14)
                acrobat.calculateHP()
                hpInput.value = acrobat.totalHP
                break
            case 'Assassin':
                let assassin = new pcClass(4, 14)
                assassin.calculateHP()
                hpInput.value = assassin.totalHP
                break
            case 'Barbarian':
                let barbarian = new pcClass(8, 14)
                barbarian.calculateHP()
                hpInput.value = barbarian.totalHP
                break
            case 'Bard':
                let bard = new pcClass(6, 14)
                bard.calculateHP()
                hpInput.value = bard.totalHP
                break
            case 'Cleric':
                let cleric = new pcClass(6, 14)
                cleric.calculateHP()
                hpInput.value = barbarian.totalHP
                break
            case 'Drow':
                let drow = new pcClass(6, 10)
                drow.calculateHP()
                hpInput.value = drow.totalHP
                break
            case 'Druid':
                let druid = new pcClass(6, 14)
                druid.calculateHP()
                hpInput.value = druid.totalHP
                break
            case 'Duergar':
                let duergar = new pcClass(6, 10)
                duergar.calculateHP()
                hpInput.value = duergar.totalHP
                break
            case 'Dwarf':
                let dwarf = new pcClass(8, 12)
                dwarf.calculateHP()
                hpInput.value = dwarf.totalHP
                break
            case 'Elf':
                let elf = new pcClass(6, 10)
                elf.calculateHP()
                hpInput.value = elf.totalHP
                break
            case 'Fighter':
                let fighter = new pcClass(8, 14)
                fighter.calculateHP()
                hpInput.value = fighter.totalHP
                break
            case 'Gnome':
                let gnome = new pcClass(4, 8)
                gnome.calculateHP()
                hpInput.value = gnome.totalHP
                break
            case 'Half-Elf':
                let halfElf = new pcClass(6, 12)
                halfElf.calculateHP()
                hpInput.value = halfElf.totalHP
                break
            case 'Halfling':
                let halfling = new pcClass(6, 8)
                halfling.calculateHP()
                hpInput.value = halfling.totalHP
                break
            case 'Half-Orc':
                let halfOrc = new pcClass(6, 8)
                halfOrc.calculateHP()
                hpInput.value = halfOrc.totalHP
                break
            case 'Illusionist':
                let illusionist = new pcClass(4, 14)
                illusionist.calculateHP()
                hpInput.value = illusionist.totalHP
                break
            case 'Knight':
                let knight = new pcClass(8, 14)
                knight.calculateHP()
                hpInput.value = knight.totalHP
                break
            case 'Magic-User':
                let magicUser = new pcClass(4, 14)
                magicUser.calculateHP()
                hpInput.value = magicUser.totalHP
                break
            case 'Paladin':
                let paladin = new pcClass(8, 14)
                paladin.calculateHP()
                hpInput.value = paladin.totalHP
                break
            case 'Ranger':
                let ranger = new pcClass(8, 14)
                ranger.calculateHP()
                hpInput.value = ranger.totalHP
                break
            case 'Svirfneblin':
                let svirfneblin = new pcClass(6, 8)
                svirfneblin.calculateHP()
                hpInput.value = svirfneblin.totalHP
                break
            case 'Thief':
                let thief = new pcClass(4, 14)
                thief.calculateHP()
                hpInput.value = thief.totalHP
                break
        }
    })
})