var gameData = {
    emotes: 0,
    emotesPerClick: 1,
    faces: [":)",";)", ":D", ";D", ":P", ";P", "XD", "x)", "owo", "OwO", "oWo"],
    faceIndex: 0,
    autoEmote: 0,
    version: 2,
    doubleUpgradeCost: 100,
    gens: ["cat", "duck"],
    genCount: [0,0],
    genUpgradeCost: [100, 500]
  }
function emote() {
    gameData.emotes += gameData.emotesPerClick
    document.getElementById("emotesAdded").innerHTML = gameData.emotes + " Emotes Emoted"
  }
function doubleUpgrade() {
    if (gameData.emotes >= gameData.doubleUpgradeCost){
        gameData.emotes -= gameData.doubleUpgradeCost
        gameData.doubleUpgradeCost += gameData.doubleUpgradeCost
        document.getElementById("doubleUpgrade").innerHTML = "Cost: " + gameData.doubleUpgradeCost + " emotes"
        document.getElementById("emotesAdded").innerHTML = gameData.emotes + " Emotes Emoted"
        gameData.emotesPerClick = gameData.emotesPerClick * 2
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
      gameData.genUpgradeCost[0] = gameData.genUpgradeCost[0] * 2
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
      gameData.genUpgradeCost[1] = gameData.genUpgradeCost[1] * 2
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
    gameData = savegame
    loadElements()
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
