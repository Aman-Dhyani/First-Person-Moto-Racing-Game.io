let container = document.querySelector("#container");
let grayRoad = document.querySelector("#grayRoad");
let roadLine = document.querySelector("#roadLine");
let bikeHealth = document.querySelector("#bikeHealth")
let play = document.querySelector("#play")

// -------- SOUNDS ------------------------------------------
let bikePuncher = new Audio("audio/tireflat.m4a")
let gameOver = new Audio("audio/gameover.m4a")
let skid = new Audio("\audio/skid.m4a")
let theme = new Audio("audio/The_Weeknd_-_Blinding_Lights_(Official_Video).m4a")
theme.volume = 20

// -------- DISPLAY FUNCTION (PLAY BUTTON)------------------------------------------
function display() {
   theme.play()
   play.classList.add("hide")
   gameMechanics();
}


function gameMechanics() {

   // ---------- BIKE CONTROLS --------------------------------
   document.addEventListener("keydown", (e) => {

      // ---------- BIKE MOVE RIGHT ---------------------------------------- 
      if (e.key == 'ArrowRight') {
         bikeMoveRight()
      }

      // ---------- BIKE MOVE LEFT -----------------------------------------
      if (e.key == 'ArrowLeft') {
         bikeMoveLeft()
      }

      setTimeout(() => {
         bike.style.animation = "bikeMovement 0.1s linear infinite"
         tire.style.animation = "tireMovement 0.1s linear infinite"
      }, 500);
   })


   // ------------ GENERATE pins -------------------------------------------
   let generatepins = setInterval(() => {
      let pin = document.createElement("div");
      pin.classList.add("pin");
      pin.style.left = Math.floor(100 + (800 - 100) * Math.random()) + "px";
      container.appendChild(pin);

      setInterval(() => {
         container.removeChild(pin);
      }, 8500);
   }, 500);


   // --------- MOVING pins DOWN--------------------------------------------
   let movepins = setInterval(() => {
      let pins = document.getElementsByClassName("pin");

      if (pins != undefined) {
         for (let i = 0; i < pins.length; i++) {
            let pin = pins[i];
            let pinbottom = parseInt(window.getComputedStyle(pin).getPropertyValue("bottom"));

            pin.style.bottom = pinbottom - 200 + "px";
         }
      }
   }, 500);


   // ---------- BIKE MOVE RIGHT (FUNCTION) ----------------------------------------
   function bikeMoveRight() {

      let pins = document.getElementsByClassName("pin");

      if (pins != undefined) {
         for (let i = 0; i < pins.length; i++) {
            let pin = pins[i];
            let pinleft = parseInt(window.getComputedStyle(pin).getPropertyValue("left"));
            pin.style.left = pinleft - 250 + "px";
         }
      }


      bike.style.animation = "bright 1s linear infinite"
      tire.style.animation = "tireRight 1s linear infinite"

      let roadLinex = parseInt(window.getComputedStyle(roadLine).getPropertyValue("left"));
      let grayRoadx = parseInt(window.getComputedStyle(grayRoad).getPropertyValue("left"));

      if (grayRoadx > -500) {
         grayRoad.style.left = grayRoadx - 110 + "px";
         roadLine.style.left = roadLinex - 200 + "px";
      }
      if (grayRoadx < -500) {
         bike.style.animation = "none"
         tire.style.animation = "none"
      }
   }


   // ---------- BIKE MOVE LEFT (FUNCTION) ----------------------------------------
   function bikeMoveLeft() {
      let pins = document.getElementsByClassName("pin");

      if (pins != undefined) {
         for (let i = 0; i < pins.length; i++) {
            let pin = pins[i];
            let pinleft = parseInt(window.getComputedStyle(pin).getPropertyValue("left"));

            pin.style.left = pinleft + 250 + "px";
         }
      }
      bike.style.animation = "bleft 1s linear infinite"
      tire.style.animation = "tireLeft 1s linear infinite"

      let roadLinex = parseInt(window.getComputedStyle(roadLine).getPropertyValue("left"));
      let grayRoadx = parseInt(window.getComputedStyle(grayRoad).getPropertyValue("left"));

      if (grayRoadx < -200) {
         grayRoad.style.left = grayRoadx + 110 + "px";
         roadLine.style.left = roadLinex + 200 + "px";
      }
      if (grayRoadx > -200) {
         bike.style.animation = "none"
         tire.style.animation = "none"
      }
   }


   // ---------- Collision (tire puncher)-------------------------------
   setInterval(() => {

      let pins = document.getElementsByClassName("pin");

      if (pins != undefined) {
         for (let i = 0; i < pins.length; i++) {
            let pin = pins[i];
            let pinleft = parseInt(window.getComputedStyle(pin).getPropertyValue("left"));
            let pintop = parseInt(window.getComputedStyle(pin).getPropertyValue("top"));


            let tire = document.querySelector("#tire");
            let tireleft = parseInt(window.getComputedStyle(tire).getPropertyValue("left"));
            let tiretop = parseInt(window.getComputedStyle(tire).getPropertyValue("top"));


            offsetx = Math.abs(pinleft - tireleft);
            offsety = Math.abs(pintop - tiretop);
            console.log(offsetx);

            if (offsetx < 60 && offsety < 50) {
               pin.classList.add("hide")
               bikeHealth.value -= 10
               bikePuncher.play()

               // --- bike disbalance ----------
               bikeMoveRight()

               setTimeout(() => {
                  bikeMoveLeft()
               }, 100);
            }

            if (bikeHealth.value == 0) {
               gameOver.play()
               bike.classList.add("hide")
               tire.classList.add("hide")
               roadLine.classList.add("hide")
               skid.play()
               theme.pause()
               clearInterval(intrvl)
               HighScore = localStorage.setItem("highscore", scr)

               setInterval(() => {
                  window.location.reload()
               }, 1200);
            }
         }
      }

   }, 100);

   // -------- SCORE --------------------------------------------
   let scr = 0;

   let intrvl = setInterval(() => {
      scr = scr += 1
      let score = document.querySelector("#score").innerHTML = "score:-" + scr

      if (scr > localStorage.getItem("highscore")) {
         HighScore.innerHTML = "highscore:- " + localStorage.getItem("highscore")
      }
   }, 1000);

   let score = document.querySelector("#score").innerHTML = "score:-" + scr
   HighScore.innerHTML = "highscore:- " + localStorage.getItem("highscore")
}




