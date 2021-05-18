// Global variables
let dex = 0;
let strength = 0;
let intel = 0;
let cha = 0;
let con = 0;
let wis = 0;
let dexMod = 0;
let strengthMod = 0;
let intelMod = 0;
let chaMod = 0;
let conMod = 0;
let wisMod = 0;
let bab = 0;
let ac = 0;
let acPenalty = 0;
let skill = 0;
let skillValue = [];
let storedData = localStorage.getItem("storedData");
const dexElement = document.getElementById("Dexterity");
const strengthElement = document.getElementById("Strength");
const intelElement = document.getElementById("Intelligence");
const chaElement = document.getElementById("Charisma");
const conElement = document.getElementById("Constitution");
const wisElement = document.getElementById("Wisdom");


// Event listeners on buttons
document.getElementById("rollBtn").addEventListener("click", rollGenerator);
document.getElementById("submitBtn").addEventListener("click", storeSkills);
document.getElementById("editCharacter").addEventListener("click", editSkills);

// Reset all fields when reset button is clicked
document.getElementById("reset").addEventListener("click", () => {
    localStorage.clear();
    storedData = "false"

    let inputFields = document.querySelectorAll("input");
    for (let x = 0; x < inputFields.length; x++) {
        inputFields[x].value = 0;
    }
    characterSubmitted();

});

//Checks for locally stored character data
if (storedData === "true") {
    characterSubmitted();
}

// Hides the character sheet and presents the reset button if character data is in localStorage
function characterSubmitted() {
    document.getElementById("initialCharacterStats").classList.toggle("hidden");
    document.getElementById("reset").classList.toggle("hidden");
    document.getElementById("editCharacter").classList.toggle("hidden");
}

// Stores values taken from the attribute and skill forms
function getValues() {
    dex = parseInt(dexElement.value);
    strength = parseInt(strengthElement.value);
    intel = parseInt(intelElement.value);
    cha = parseInt(chaElement.value);
    con = parseInt(conElement.value);
    wis = parseInt(wisElement.value);
    dexMod = Math.floor((dex - 10) / 2);
    strengthMod = Math.floor((strength - 10) / 2);
    intelMod = Math.floor((intel - 10) / 2);
    chaMod = Math.floor((cha - 10) / 2);
    conMod = Math.floor((con - 10) / 2);
    wisMod = Math.floor((wis - 10) / 2);
    bab = parseInt(document.getElementById("bab").value);
    ac = parseInt(document.getElementById("ac").value);
    acPenalty = parseInt(document.getElementById("acPenalty").value);
    skill = document.querySelectorAll(".skill");
    skillValue = [];
    for (let x = 0; x < skill.length; x++) {
        skillValue.push(parseInt(skill[x].value));
    }
}

//Stores entered stats into localStorage for future use
function storeSkills() {
    getValues();
    localStorage.setItem("dex", dex);
    localStorage.setItem("strength", strength);
    localStorage.setItem("intel", intel);
    localStorage.setItem("cha", cha);
    localStorage.setItem("con", con);
    localStorage.setItem("wis", wis);
    localStorage.setItem("dexMod", dexMod);
    localStorage.setItem("strengthMod", strengthMod);
    localStorage.setItem("intelMod", intelMod);
    localStorage.setItem("chaMod", chaMod);
    localStorage.setItem("conMod", conMod);
    localStorage.setItem("wisMod", wisMod);
    localStorage.setItem("bab", bab);
    localStorage.setItem("ac", ac);
    localStorage.setItem("acPenalty", acPenalty);
    localStorage.setItem("skillValue", JSON.stringify(skillValue));
    localStorage.setItem("storedData", "true");

    characterSubmitted();
}

// Function to retrieve values stored and assign them to their appropriate element to allow the user to edit skills for re-submission
function editSkills() {
    dexElement.value = localStorage.getItem("dex");
    strengthElement.value = localStorage.getItem("strength");
    intelElement.value = localStorage.getItem("intel");
    chaElement.value = localStorage.getItem("cha");
    conElement.value = localStorage.getItem("con");
    wisElement.value = localStorage.getItem("wis");
    document.getElementById("bab").value = localStorage.getItem("bab");
    document.getElementById("ac").value = localStorage.getItem("ac");
    document.getElementById("acPenalty").value = localStorage.getItem("acPenalty");
    skill = document.querySelectorAll(".skill");
    skillValue = JSON.parse(localStorage.getItem("skillValue"));

    for (let x = 0; x < skill.length; x++) {
        skill[x].value = skillValue[x];
    }

    characterSubmitted();
}

function rollGenerator() {
    //get values from the form fields and assign them to their respective skill

    if (storedData === "true") {
        dexMod = parseInt(localStorage.getItem("dexMod"));
        strengthMod = parseInt(localStorage.getItem("strengthMod"));
        intelMod = parseInt(localStorage.getItem("intelMod"));
        chaMod = parseInt(localStorage.getItem("chaMod"));
        conMod = parseInt(localStorage.getItem("conMod"));
        wisMod = parseInt(localStorage.getItem("wisMod"));
        bab = parseInt(localStorage.getItem("bab"));
        ac = parseInt(localStorage.getItem("ac"));
        acPenalty = parseInt(localStorage.getItem("acPenalty"));
        skillValue = JSON.parse(localStorage.getItem("skillValue"));
    } else {
        getValues();
    }

    let atrUsed = document.getElementById("rollFor").value;
    let targetSuccess = document.getElementById("targetSuccess").value;

    // checks what skill is required to be added to the roll using object that contains all potential rollFor values
    const atrValue = {
        attackDex: dexMod + bab,
        attackStr: strengthMod + bab,
        damageDex: dexMod,
        damageStr: strengthMod,
        acrobatics: skillValue[0] + dexMod - acPenalty,
        appraise: skillValue[1] + intelMod,
        bluff: skillValue[2] + chaMod,
        climb: skillValue[3] + strengthMod - acPenalty,
        craft: skillValue[4] + intelMod,
        diplomacy: skillValue[5] + chaMod,
        disabledevice: skillValue[6] + dexMod,
        disguise: skillValue[7] + chaMod,
        escapeartist: skillValue[8] + dexMod - acPenalty,
        fly: skillValue[9] + dexMod - acPenalty,
        handleanimal: skillValue[10] + chaMod,
        heal: skillValue[11] + wisMod,
        intimidate: skillValue[12] + chaMod,
        knowledge: skillValue[13] + intelMod,
        linguistics: skillValue[14] + intelMod,
        perception: skillValue[15] + wisMod,
        perform: skillValue[16] + chaMod,
        profession: skillValue[17] + wisMod,
        ride: skillValue[18] + dexMod - acPenalty,
        sensemotive: skillValue[19] + wisMod,
        sleightofhand: skillValue[20] + dexMod,
        spellcraft: skillValue[21] + intelMod,
        stealth: skillValue[22] + dexMod - acPenalty,
        survival: skillValue[23] + wisMod,
        swim: skillValue[24] + strengthMod - acPenalty,
        usemagicdevice: skillValue[25] + chaMod

    }

    // parse ints from the diceroll id. need to check for number up until d and assign to numberofdice var, numbers after d are assigned to dicesides var.
    let userDiceInput = document.getElementById("diceRoll").value;
    let d = userDiceInput.indexOf('d' || 'D');
    let numberOfDice = userDiceInput.slice(0, d);
    let diceSides = userDiceInput.slice(d + 1);
    let diceRoll = [];
    let ranNum = 0;
    let finalRoll = 0;

    // Randomizes dice rolls * the number of rolls required using the number of dice sides
    for (let x = 0; x < numberOfDice; x++) {
        ranNum = Math.random();
        ranNum = ranNum * diceSides;
        ranNum = Math.floor(ranNum) + 1;
        diceRoll.push(ranNum)
        finalRoll = finalRoll + diceRoll[x];
    }
    finalRoll += atrValue[atrUsed];

    // roll outcome logic statments
    if (atrUsed != "damageDex" || atrUsed != "damageStr" && ranNum === 20) {
        alert("Natural 20 Crit");
    } else if (atrUsed != "damageDex" || atrUsed != "damageStr" && ranNum == 1) {
        alert("Critical failure!");
    } else if (ranNum >= 2 && finalRoll >= targetSuccess) {

        alert("Success!");

    } else {
        alert("Failure!");
    }
    //tell user their roll combined with their skill level, resulting in the final outcome ** Change this so the outcome appears on the webpage instead of an alert window.**

    alert(`Roll was: ${diceRoll} + Modifier : ${atrValue[atrUsed]} = final of: ${finalRoll}`);
}