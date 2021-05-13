document.getElementById("rollBtn").addEventListener("click", rollGenerator);

function rollGenerator() {
    //get values from the form fields and assign them to their respective skill ** Change this so that all values will be stored locally and retrieved upon next visit unless user uses reset button to clear storage**
    let dex = Math.floor((document.getElementById("Dexterity").value - 10) / 2);
    let strength = Math.floor((document.getElementById("Strength").value - 10) / 2);
    let int = Math.floor((document.getElementById("Intelligence").value - 10) / 2);
    let cha = Math.floor((document.getElementById("Charisma").value - 10) / 2);
    let con = Math.floor((document.getElementById("Constitution").value - 10) / 2);
    let wis = Math.floor((document.getElementById("Wisdom").value - 10) / 2);
    let bab = document.getElementById("bab").value;
    let ac = document.getElementById("ac").value;
    let acPenalty = document.getElementById("acPenalty").value;


    let skill = document.querySelectorAll(".skill");
    let skillValue = [];
    for (let x = 0; x < skill.length; x++) {
        skillValue.push(parseInt(skill[x].value));
    }

    let atrUsed = document.getElementById("rollFor").value;
    let targetSuccess = document.getElementById("targetSuccess").value;
    let atrValue = 0;


    // checks what skill is required to be added to the roll. **Going to change this to either buttons or more likely a drop down menu to make things easier for the user to select because there will be a lot of options, therefore use a switch most likely**


    switch (atrUsed) {
        case "dexterity":
            atrValue = dex;
            break;
        case "strength":
            atrValue = strength;
            break;
        case "intelligence":
            atrValue = int;
            break;
        case "charisma":
            atrValue = cha;
            break;
        case "constitution":
            atrValue = con;
            break;
        case "wisdom":
            atrValue = wis;
            break;
        case "acrobatics":
            atrValue = skillValue[0] + dex - acPenalty;
            break;
        case "appraise":
            atrValue = skillValue[1] + int;
            break;
        case "bluff":
            atrValue = skillValue[2] + cha;
            break;
        case "climb":
            atrValue = skillValue[3] + strength - acPenalty;
            break;
        case "craft":
            atrValue = skillValue[4] + int;
            break;
        case "diplomacy":
            atrValue = skillValue[5] + cha;
            break;
        case "disabledevice":
            atrValue = skillValue[6] + dex;
            break;
        case "disguise":
            atrValue = skillValue[7] + cha;
            break;
        case "escapeartist":
            atrValue = skillValue[8] + dex - acPenalty;
            break;
        case "fly":
            atrValue = skillValue[9] + dex - acPenalty;
            break;
        case "handleanimal":
            atrValue = skillValue[10] + cha;
            break;
        case "heal":
            atrValue = skillValue[11] + wis;
            break;
        case "intimidate":
            atrValue = skillValue[12] + cha;
            break;
        case "knowledge":
            atrValue = skillValue[13] + int;
            break;
        case "linguistics":
            atrValue = skillValue[14] + int;
            break;
        case "perception":
            atrValue = skillValue[15] + wis;
            break;
        case "perform":
            atrValue = skillValue[16] + cha;
            break;
        case "profession":
            atrValue = skillValue[17] + wis;
            break;
        case "ride":
            atrValue = skillValue[18] + dex - acPenalty;
            break;
        case "sensemotive":
            atrValue = skillValue[19] + wis;
            break;
        case "sleightofhand":
            atrValue = skillValue[20] + dex;
            break;
        case "spellcraft":
            atrValue = skillValue[21] + int;
            break;

        case "stealth":
            atrValue = skillValue[22] + dex - acPenalty;
            break;
        case "survival":
            atrValue = skillValue[23] + wis;
            break;
        case "swim":
            atrValue = skillValue[24] + strength - acPenalty;
            break;
        case "usemagicdevice":
            atrValue = skillValue[25] + cha;
            break;
        default:
            break;
    }

    // randomizes roll from 1-20
    let ranNum = Math.random();

    ranNum = ranNum * 20;

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