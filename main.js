// query selectors
const startButton = document.querySelector('#startBtn');
const displayText = document.querySelector('#displayText');
const timeOutput = document.querySelector('#timeOutput');
const image = document.querySelector("#exerciseImage");

const exercises = [
  { name: "Hamstring stretch with foot on step", image: "hamstring_foot_on_step.png", sets: 3, time: 30, rest: 7 },
  { name: "Kneeling Quad Stretch", image: "kneeling_quad.png", sets: 3, time: 30, rest: 7 },
  { name: "Single Leg Heel Raise", image: "heel_raise.png", sets: 3, time: 30, rest: 7 },
  { name: "Hip Flexor Stretch", image: "hip_flexor_stretch.png", sets: 3, time: 30, rest: 7 },
  { name: "Standing Calf Stretch", image: "standing_calf.png", sets: 3, time: 30, rest: 7 },
  { name: "Quad Pull", image: "quad_pull.png", sets: 3, time: 30, rest: 7 },
  { name: "Hamstring Dip", image: "hamstring_dip.png", sets: 3, time: 30, rest: 7 },
  { name: "Frankenstein Kicks", image: "frankenstein_kick.png", sets: 3, time: 30, rest: 7 },
  { name: "Side Lying Hip Abduction", image: "side_abduction.png", sets: 3, time: 30, rest: 7 },
]; // 3 reps * (30 + 7) = 111 seconds, ~2min
// ~2min * 9 exercises =  ~18min

let currentExerciseIndex = 0;
let currentExercise = exercises[currentExerciseIndex];
let running = false; 
let timer = 0;
let currentSet = 0;
let isResting = false;
let startingTime = null;

startButton.addEventListener('click', () => {
  if (running) {
    startButton.textContent = 'start';
  } else {
    startButton.textContent = 'pause';
  }
  running = !running;
  displayText.textContent = currentExercise.name;
  image.src = `${ASSET_BASE}/${currentExercise.image}`;
  startingTime = Date.now();
});

let lastTime = Date.now();
let requestAnimationId;
const tick = () => {
    const now = Date.now();
    const delta = now - lastTime;
    lastTime = now;
    const timerTime = isResting ? currentExercise.rest : currentExercise.time;

    if (running) { 
      timer += delta;
      const currentSeconds = (timer / 1000).toFixed(0);
      timeOutput.textContent = currentSeconds + 's';
      if(currentSeconds == timerTime + 1) {
        if (currentSet < currentExercise.sets) {
          if (!isResting) {
            isResting = true;
            displayText.textContent = 'Rest';
            playAttentionBell();
            currentSet++;
          } else if (isResting) {
            isResting = false;
            displayText.textContent = currentExercise.name;
            playFairyMagic();
          } 
        } else {
          // reset values
          currentSet = 0;
          isResting = false;
          timeOutput.textContent = "";

          if (currentExerciseIndex + 1 < exercises.length) {
            goToNextExercise();
          } else {
            displayText.textContent = "you are done";
            running = false;
            startButton.textContent = "start";
          }
        } 
        timer = 0;
      }
    }
    
    requestAnimationId = requestAnimationFrame(tick);
}

function goToNextExercise() {
  currentExerciseIndex++;
  currentExercise = exercises[currentExerciseIndex];
  displayText.textContent = currentExercise.name;
  image.src = `${ASSET_BASE}/${currentExercise.image}`;
}

function playAttentionBell() {
  document.getElementById("attentionBell").play();
}

function playFairyMagic() {
  document.getElementById("fairyMagic").play();
}

window.addEventListener('pagehide', () => {
  console.log('page hide');
  cancelAnimationFrame(requestAnimationId);
  currentExerciseIndex = 0;
  currentExercise = exercises[currentExerciseIndex];
  running = false; 
  timer = 0;
  currentSet = 0;
  isResting = false;
  startingTime = null;

});

tick();