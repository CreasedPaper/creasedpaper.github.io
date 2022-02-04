var gameData = {
  emotes: 0,
  emotesPerClick: 1,
  faces: [":)",";)", ":D", ";D", ":P", ";P", "XD", "x)", "owo", "OwO", "oWo"],
  faceIndex: 0,
  autoEmote: 0,
  version: 3,
  doubleUpgradeCost: 100,
  gens: ["cat", "duck"],
  genCount: [0,0],
  genUpgradeCost: [100, 500],
  unlockCount: 0,
  unlockList:["upgrades", "auto"]
}
var startData = gameData

function emote() {
  gameData.emotes += gameData.emotesPerClick
  document.getElementById("emotesAdded").innerHTML = gameData.emotes + " Emotes Emoted"
}
function doubleUpgrade() {
  if (gameData.emotes >= gameData.doubleUpgradeCost){
      gameData.emotes -= gameData.doubleUpgradeCost
      gameData.doubleUpgradeCost = Math.round(gameData.doubleUpgradeCost * 1.07)
      document.getElementById("doubleUpgrade").innerHTML = "Cost: " + gameData.doubleUpgradeCost + " emotes"
      document.getElementById("emotesAdded").innerHTML = gameData.emotes + " Emotes Emoted"
      gameData.emotesPerClick = gameData.emotesPerClick + 1
      gameData.faceIndex += 1
      document.getElementById("face").innerHTML = gameData.faces[gameData.faceIndex]
      document.getElementById("emotesPerClick").innerHTML = "emotes per click: " + gameData.emotesPerClick
  }
}
function catBuy() {
if (gameData.emotes >= gameData.genUpgradeCost[0]){
    gameData.emotes -= gameData.genUpgradeCost[0]
    gameData.autoEmote = gameData.autoEmote + 1
    gameData.genCount[0] += 1
    document.getElementById("catsOwned").innerHTML = "purchased: " + gameData.genCount[0]
    gameData.genUpgradeCost[0] = Math.round(gameData.genUpgradeCost[0] * 1.11)
    document.getElementById("cat").innerHTML = "Cost " + gameData.genUpgradeCost[0] + " emotes"
    document.getElementById("emotesPerSecond").innerHTML = "emotes per second: " + gameData.autoEmote
}
}
function duckBuy() {
console.log("duck buy")
if (gameData.emotes >= gameData.genUpgradeCost[1]){
    console.log("duck buy 2")

    gameData.emotes -= gameData.genUpgradeCost[1]
    gameData.autoEmote = gameData.autoEmote + 5
    gameData.genCount[1] += 1
    document.getElementById("ducksOwned").innerHTML = "purchased: " + gameData.genCount[1]
    gameData.genUpgradeCost[1] = Math.round(gameData.genUpgradeCost[1] * 1.26)
    document.getElementById("duck").innerHTML = "Cost " + gameData.genUpgradeCost[1] + " emotes"
    document.getElementById("emotesPerSecond").innerHTML = "emotes per second: " + gameData.autoEmote
}
}
function autoEmote(){
  gameData.emotes = gameData.autoEmote + gameData.emotes;
  document.getElementById("emotesAdded").innerHTML = gameData.emotes + " Emotes Emoted"
}

var mainGameLoop = window.setInterval(function() {
  autoEmote()
}, 1000)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("asciiClickerSave", JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("asciiClickerSave"))
if (savegame !== null) {
  if(savegame.version !== gameData.version){
      console.log("in if")
      console.log(savegame.version)
      gameData.emotes = savegame.emote
      gameData.emotesPerClick = savegame.emotesPerClick
      gameData.faceIndex = savegame.faceIndex
      gameData.autoEmote = savegame.autoEmote
      gameData.doubleUpgradeCost = savegame.doubleUpgradeCost
      gameData.genCount[0] = savegame.genCount[0]
      gameData.genUpgradeCost[0] = savegame.genUpgradeCost[0]


  }else{
      console.log("in else")
      gameData = savegame
  }
  //gameData = savegame
  hide()
  loadElements()
  unlockUpTo(gameData.unlockCount)
}
function loadElements(){
document.getElementById("emotesPerClick").innerHTML = "Emotes Per Click: " + gameData.emotesPerClick
document.getElementById("face").innerHTML = gameData.faces[gameData.faceIndex]
document.getElementById("emotesPerClick").innerHTML = "emotes per click: " + gameData.emotesPerClick
document.getElementById("emotesPerSecond").innerHTML = "emotes per second: " + gameData.autoEmote
document.getElementById("doubleUpgrade").innerHTML = "Cost: " + gameData.doubleUpgradeCost + " emotes"
//cat load
document.getElementById("catsOwned").innerHTML = "purchased: " + gameData.genCount[0]
document.getElementById("cat").innerHTML = "Cost " + gameData.genUpgradeCost[0] + " emotes"
//ducks owned
document.getElementById("ducksOwned").innerHTML = "purchased: " + gameData.genCount[1]
document.getElementById("duck").innerHTML = "Cost " + gameData.genUpgradeCost[1] + " emotes"
console.log("load complete")


}
function endIt(){
console.log("ending it")
gameData = startData
gameData.emotes = 0;
savegame = null
hide()
loadElements()
}

var unlockLoop = window.setInterval(function() {
console.log("checking unlocks")
if(gameData.emotes >= 50){
  document.getElementById("upgrades").style.display = "block";
  console.log("unlocked upgrades")
  if(gameData.unlockCount < 1){
    gameData.unlockCount = gameData.unlockCount + 1
  }
}
if(gameData.emotes >= 250){
  document.getElementById("space2").style.display = "block";
  document.getElementById("auto").style.display = "block";
  if(gameData.unlockCount < 2){
    gameData.unlockCount = gameData.unlockCount + 1
  }
}
}, 1000)

function hide(){
document.getElementById("upgrades").style.display = "none";
document.getElementById("auto").style.display = "none";
document.getElementById("space2").style.display = "none";
}
function hide2(){
document.getElementById("upgrades").style.display = "none";
document.getElementById("auto").style.display = "none";
document.getElementById("space2").style.display = "none";
unlockUpTo(gameData.unlockCount)
}
function unlockUpTo(unlocks){
for(let i = 0; i < unlocks; i++){
  document.getElementById(gameData.unlockList[i]).style.display = "block";
}
if(unlocks >= 1){
  document.getElementById("space2").style.display = "block";
}
}