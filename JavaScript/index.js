
// Event listeners on buttons
document.getElementById("rollBtn").addEventListener("click", rollGenerator);
document.getElementById("submitBtn").addEventListener("click", storeSkills);
document.getElementById("editCharacter").addEventListener("click", editSkills);
document.getElementById("reset").addEventListener("click", () => {
    localStorage.clear();
    storedData = "false"
    document.getElementById("initialCharacterStats").classList.remove("hidden");
    document.getElementById("reset").classList.remove("visible");
    document.getElementById("reset").classList.add("hidden");
});

let storedData = localStorage.getItem("storedData");

//Checks for locally stored character data
if (storedData === "true") {
    characterSubmitted();
}

// Hides the character sheet and presents the reset button if character data is in localStorage
function characterSubmitted() {
    document.getElementById("initialCharacterStats").classList.add("hidden");
    document.getElementById("reset").classList.remove("hidden");
    document.getElementById("reset").classList.add("visible");
    document.getElementById('editCharacter').classList.remove("hidden");
    document.getElementById("editCharacter").classList.add("visible");
}

// Stores values taken from the attribute and skill forms

function storeSkills() {
    let skill = document.querySelectorAll(".skill");
    let dex = parseInt(document.getElementById("Dexterity").value);
    let strength = parseInt(document.getElementById("Strength").value);
    let int = parseInt(document.getElementById("Intelligence").value);
    let cha = parseInt(document.getElementById("Charisma").value);
    let con = parseInt(document.getElementById("Constitution").value);
    let wis = parseInt(document.getElementById("Wisdom").value);
    let dexMod = Math.floor((dex - 10) / 2);
    let strengthMod = Math.floor((strength - 10) / 2);
    let intMod = Math.floor((int - 10) / 2);
    let chaMod = Math.floor((cha - 10) / 2);
    let conMod = Math.floor((con - 10) / 2);
    let wisMod = Math.floor((wis - 10) / 2);
    let bab = document.getElementById("bab").value;
    let ac = document.getElementById("ac").value;
    let acPenalty = document.getElementById("acPenalty").value;
    let skillValue = [];
    for (let x = 0; x < skill.length; x++) {
        skillValue.push(parseInt(skill[x].value));
    }
    localStorage.setItem("dex", dex);
    localStorage.setItem("strength", strength);
    localStorage.setItem("int", int);
    localStorage.setItem("cha", cha);
    localStorage.setItem("con", con);
    localStorage.setItem("wis", wis);
    localStorage.setItem("dexMod", dexMod);
    localStorage.setItem("strengthMod", strengthMod);
    localStorage.setItem("intMod", intMod);
    localStorage.setItem("chaMod", chaMod);
    localStorage.setItem("conMod", conMod);
    localStorage.setItem("wisMod", wisMod);
    localStorage.setItem("bab", bab);
    localStorage.setItem("ac", ac);
    localStorage.setItem("acPenalty", acPenalty);
    localStorage.setItem("skillValue", JSON.stringify(skillValue));
    localStorage.setItem("storedData", "true");
    characterSubmitted();
    document.getElementById('editCharacter').classList.remove("hidden");
    document.getElementById("editCharacter").classList.add("visible");

}

// Function to retrieve values stored and assign them to their appropriate element to allow the user to edit skills for re-submission
function editSkills() {
    document.getElementById("Dexterity").value = localStorage.getItem("dex");
    document.getElementById("Strength").value = localStorage.getItem("strength");
    document.getElementById("Intelligence").value = localStorage.getItem("int");
    document.getElementById("Charisma").value = localStorage.getItem("cha");
    document.getElementById("Constitution").value = localStorage.getItem("con");
    document.getElementById("Wisdom").value = localStorage.getItem("wis");
    document.getElementById("bab").value = localStorage.getItem("bab");
    document.getElementById("ac").value = localStorage.getItem("ac");
    document.getElementById("acPenalty").value = localStorage.getItem("acPenalty");
    skill = document.querySelectorAll(".skill");
    storedSkillValue = localStorage.getItem("skillValue");
    skillValue = JSON.parse(storedSkillValue);
    for (let x = 0; x < skill.length; x++) {
        skill[x].value = skillValue[x];
    }
    document.getElementById("initialCharacterStats").classList.remove("hidden");
    document.getElementById("reset").classList.remove("visible");
    document.getElementById("reset").classList.add("hidden");
    document.getElementById('editCharacter').classList.remove("visible");
    document.getElementById("editCharacter").classList.add("hidden");
}

function rollGenerator() {
    //get values from the form fields and assign them to their respective skill

    if (storedData === "true") {
        dexMod = parseInt(localStorage.getItem("dexMod"));
        strengthMod = parseInt(localStorage.getItem("strengthMod"));
        intMod = parseInt(localStorage.getItem("intMod"));
        chaMod = parseInt(localStorage.getItem("chaMod"));
        conMod = parseInt(localStorage.getItem("conMod"));
        wisMod = parseInt(localStorage.getItem("wisMod"));
        bab = parseInt(localStorage.getItem("bab"));
        ac = parseInt(localStorage.getItem("ac"));
        acPenalty = parseInt(localStorage.getItem("acPenalty"));

        // let skill = document.querySelectorAll(".skill");
        var storedSkillValue = localStorage.getItem("skillValue");
        skillValue = JSON.parse(storedSkillValue);
    } else {
        dexMod = Math.floor((document.getElementById("Dexterity").value - 10) / 2);
        strengthMod = Math.floor((document.getElementById("Strength").value - 10) / 2);
        intMod = Math.floor((document.getElementById("Intelligence").value - 10) / 2);
        chaMod = Math.floor((document.getElementById("Charisma").value - 10) / 2);
        conMod = Math.floor((document.getElementById("Constitution").value - 10) / 2);
        wisMod = Math.floor((document.getElementById("Wisdom").value - 10) / 2);
        bab = parseInt(document.getElementById("bab").value);
        ac = parseInt(document.getElementById("ac").value);
        acPenalty = parseInt(document.getElementById("acPenalty").value);
        skill = document.querySelectorAll(".skill");
        skillValue = [];
        for (let x = 0; x < skill.length; x++) {
            skillValue.push(parseInt(skill[x].value));
        }
    }

    let atrUsed = document.getElementById("rollFor").value;
    let targetSuccess = document.getElementById("targetSuccess").value;
    let atrValue = 0;
    let diceSides = 20;

    // checks what skill is required to be added to the roll. 


    switch (atrUsed) {
        case "attackDex":
            atrValue = dexMod + bab;
            break;
        case "attackStr":
            atrValue = strengthMod + bab;
            break;
        case "acrobatics":
            atrValue = skillValue[0] + dexMod - acPenalty;
            break;
        case "appraise":
            atrValue = skillValue[1] + intMod;
            break;
        case "bluff":
            atrValue = skillValue[2] + chaMod;
            break;
        case "climb":
            atrValue = skillValue[3] + strengthMod - acPenalty;
            break;
        case "craft":
            atrValue = skillValue[4] + intMod;
            break;
        case "diplomacy":
            atrValue = skillValue[5] + chaMod;
            break;
        case "disabledevice":
            atrValue = skillValue[6] + dexMod;
            break;
        case "disguise":
            atrValue = skillValue[7] + chaMod;
            break;
        case "escapeartist":
            atrValue = skillValue[8] + dexMod - acPenalty;
            break;
        case "fly":
            atrValue = skillValue[9] + dexMod - acPenalty;
            break;
        case "handleanimal":
            atrValue = skillValue[10] + chaMod;
            break;
        case "heal":
            atrValue = skillValue[11] + wisMod;
            break;
        case "intimidate":
            atrValue = skillValue[12] + chaMod;
            break;
        case "knowledge":
            atrValue = skillValue[13] + intMod;
            break;
        case "linguistics":
            atrValue = skillValue[14] + intMod;
            break;
        case "perception":
            atrValue = skillValue[15] + wisMod;
            break;
        case "perform":
            atrValue = skillValue[16] + chaMod;
            break;
        case "profession":
            atrValue = skillValue[17] + wisMod;
            break;
        case "ride":
            atrValue = skillValue[18] + dexMod - acPenalty;
            break;
        case "sensemotive":
            atrValue = skillValue[19] + wisMod;
            break;
        case "sleightofhand":
            atrValue = skillValue[20] + dexMod;
            break;
        case "spellcraft":
            atrValue = skillValue[21] + intMod;
            break;

        case "stealth":
            atrValue = skillValue[22] + dexMod - acPenalty;
            break;
        case "survival":
            atrValue = skillValue[23] + wisMod;
            break;
        case "swim":
            atrValue = skillValue[24] + strengthMod - acPenalty;
            break;
        case "usemagicdevice":
            atrValue = skillValue[25] + chaMod;
            break;
        default:
            break;
    }

    // randomizes roll from 1-20
    let ranNum = Math.random();
    ranNum = ranNum * diceSides;

    ranNum = Math.floor(ranNum) + 1;

    let finalRoll = ranNum + atrValue;
    // roll outcome logic statments
    if (ranNum == 20) {
        alert("Natural 20 Crit");
    } else if (ranNum == 1) {
        alert("Critical failure!");
    } else if (ranNum >= 2 && finalRoll >= targetSuccess) {

        alert("Success!");

    } else {
        alert("Failure!");
    }
    //tell user their roll combined with their skill level, resulting in the final outcome ** Change this so the outcome appears on the webpage instead of an alert window.**
    alert("Roll was: " + ranNum + " + " + atrUsed + ": " + atrValue + " = final of: " + finalRoll);
}