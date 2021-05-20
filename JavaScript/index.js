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
let casterLevel = 0;
let baseSaveFort = 0;
let baseSaveReflex = 0;
let baseSaveWill = 0;
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
    for (let field of inputFields) {
        field.value = 0;
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
    document.getElementById("rollOutcome").textContent = "";
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
    casterLevel = parseInt(document.getElementById("casterLevel").value);
    baseSaveFort = parseInt(document.getElementById("baseSaveFort").value);
    baseSaveReflex = parseInt(document.getElementById("baseSaveReflex").value);
    baseSaveWill = parseInt(document.getElementById("baseSaveWill").value);
    ac = parseInt(document.getElementById("ac").value);
    acPenalty = parseInt(document.getElementById("acPenalty").value);
    skill = document.querySelectorAll(".skill");
    skillValue = [];
    for (let index of skill) {
        skillValue.push(parseInt(index.value));
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
    localStorage.setItem("casterLevel",casterLevel);
    localStorage.setItem("baseSaveFort", baseSaveFort);
    localStorage.setItem("baseSaveReflex", baseSaveReflex);
    localStorage.setItem("baseSaveWill", baseSaveWill);
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
    document.getElementById("casterLevel").value = localStorage.getItem("casterLevel");
    document.getElementById("baseSaveFort").value = localStorage.getItem("baseSaveFort");
    document.getElementById("baseSaveReflex").value = localStorage.getItem("baseSaveReflex");
    document.getElementById("baseSaveWill").value = localStorage.getItem("baseSaveWill");
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
    // collect dice input from each input field the user adds. then get how many dice of each type are rolled and assign the diceSides and numberOfDice
    let userDiceInput = document.getElementById("diceRoll").value;
    let numberOfDiffDice = userDiceInput.split('+').length; //Checks if the user is combining different dice types and how many
    let d = []; // an array to hold the indexOf the character 'd'
    let seperateDice; // variable that will contain the indexOf '+', used to seperate the different dice being used
    let numberOfDice = []; // array to hold how many dice will be rolled per type of dice
    let diceSides = []; //array to hold the number of sides per dice type being rolled
    for (let x = 0; x < numberOfDiffDice; x++) { 
        seperateDice = userDiceInput.indexOf('+'); // checks for '+' within the input and if so grabs its location
        d.push(userDiceInput.indexOf('d' || 'D')); // checks for location of 'd', used to determine when numberofsides should be collected
        numberOfDice.push(parseInt(userDiceInput.slice(0, d[x]))); //grabs whatever proceeds 'd' to be used as the number of dice
        if (seperateDice > 0) {  //logic check to see if there is more than 1 type of dice being used.
            diceSides.push(parseInt(userDiceInput.slice(d[x] + 1, seperateDice)));
        } else {
            diceSides.push(parseInt(userDiceInput.slice(d[x] + 1)));
        }
        userDiceInput = userDiceInput.slice(seperateDice + 1); //Removes previously checked dice data from string so that it isn't checked
    }
    let diceRoll = [];
    let ranNum = 0;
    let finalRoll = 0;
    let outcome = document.getElementById("rollOutcome");

    //get values from the form fields and assign them to their respective skill
    outcome.textContent = "";
    if (storedData === "true") {
        dexMod = parseInt(localStorage.getItem("dexMod"));
        strengthMod = parseInt(localStorage.getItem("strengthMod"));
        intelMod = parseInt(localStorage.getItem("intelMod"));
        chaMod = parseInt(localStorage.getItem("chaMod"));
        conMod = parseInt(localStorage.getItem("conMod"));
        wisMod = parseInt(localStorage.getItem("wisMod"));
        bab = parseInt(localStorage.getItem("bab"));
        casterLevel = parseInt(localStorage.getItem("casterLevel"));
        baseSaveFort = parseInt(localStorage.getItem("baseSaveFort"));
        baseSaveReflex = parseInt(localStorage.getItem("baseSaveReflex"));
        baseSaveWill = parseInt(localStorage.getItem("baseSaveWill"));
        ac = parseInt(localStorage.getItem("ac"));
        acPenalty = parseInt(localStorage.getItem("acPenalty"));
        skillValue = JSON.parse(localStorage.getItem("skillValue"));
    } else {
        getValues();
    }
    let atrUsed = document.getElementById("rollFor").value;
    // checks what skill is required to be added to the roll using object that contains all potential rollFor values
    const atrValue = {
        attackDex: dexMod + bab,
        attackStr: strengthMod + bab,
        concentrationCha : casterLevel + chaMod,
        concentrationIntel : casterLevel + intelMod,
        concentrationWis : casterLevel + wisMod,
        damageDex : dexMod,
        damageStr : strengthMod,
        fortitudeSave : baseSaveFort + conMod,
        reflexSave : baseSaveReflex + dexMod,
        willSave : baseSaveWill + wisMod,
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

    // Randomizes dice rolls * the number of rolls required using the number of dice sides per each different kind of dice entered
    let i = 0;
 
    while (i < numberOfDiffDice) {
        for (let x = 0; x < numberOfDice[i]; x++) {
            ranNum = Math.floor((Math.random() * diceSides[i]) + 1);
            diceRoll.push(ranNum)
            finalRoll = finalRoll + diceRoll[x];
        }
        i++
    }
    finalRoll += atrValue[atrUsed];
    let diceAudio = new Audio("audio/diceroll.mp3");
    diceAudio.play();
    // roll outcome logic statments, using 1.5 second delay to allow diceRoll audio to play  before displaying result.
    setTimeout(() => {
        if (atrUsed === "damageDex" || atrUsed === "damageStr") {
            outcome.textContent = `Roll was: ${diceRoll} + Modifier : ${atrValue[atrUsed]} = final of: ${finalRoll}`;
        } else if (ranNum == 20) {
            outcome.textContent = `Natural 20 crit! Roll was: ${diceRoll} + Modifier : ${atrValue[atrUsed]} = final of: ${finalRoll}`;
        } else if (ranNum === 1) {
            outcome.textContent = `Critical Failure! Roll was: ${diceRoll} + Modifier : ${atrValue[atrUsed]} = final of: ${finalRoll}`;
        } else {
            outcome.textContent = `Roll was: ${diceRoll} + Modifier : ${atrValue[atrUsed]} = final of: ${finalRoll}`;
        }
    }, 1500);


}