document.getElementById("rollBtn").addEventListener("click", rollGenerator);

function rollGenerator() {
    //get values from the form fields and assign them to their respective skill
    var dex = parseInt(document.getElementById("Dexterity").value);
    var strength = parseInt(document.getElementById("Strength").value);
    var int = parseInt(document.getElementById("Intelligence").value);
    var cha = parseInt(document.getElementById("Charisma").value);
    var con = parseInt(document.getElementById("Constitution").value);
    var atrUsed = document.getElementById("attributeUsed").value.toLowerCase();
    var targetSuccess = parseInt(document.getElementById("targetSuccess").value);
    var atrValue = 0;


    // checks what skill is required to be added to the roll
    if (atrUsed.includes("dexterity")) {
        atrValue = dex;
        console.log("dex");
    } else if (atrUsed.includes("strength")) {
        atrValue = strength;
        console.log("strength");
    } else if (atrUsed.includes("intelligence")) {
        atrValue = int;
        console.log("int");
    } else if (atrUsed.includes("charisma")) {
        atrValue = cha;
        console.log("cha");
    } else if (atrUsed.includes("constitution")) {
        atrValue = con;
        console.log("con");
    } else {
        alert("Invalid entry");
    }

    // randomizes roll from 1-20
    var ranNum = Math.random();

    ranNum = ranNum * 20;

    ranNum = Math.floor(ranNum) + 1;

    var finalRoll = ranNum + atrValue;
    // roll outcome logic statments
    if (ranNum == 20) {
        alert("Natural 20 Crit");
    } else if (ranNum == 1) {
        alert("Critical failure!");
    } else if (ranNum >= 2 && finalRoll >= targetSuccess) {

        alert("You hit!");

    } else {
        alert("You missed!");
    }


    //tell user their roll combined with their skill level, resulting in the final outcome
    alert("Roll was: " + ranNum + " + " + atrUsed + ": " + atrValue + " = final of: " + finalRoll);
}