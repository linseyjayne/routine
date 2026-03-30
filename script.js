// query selectors
const startButton = document.querySelector('#startBtn');
const pauseButton = document.querySelector('#pauseBtn');
const displayText = document.querySelector('#displayText');
const timeOutput = document.querySelector('#timeOutput');

const exercises = [
  { name: "Hamstring stretch with foot on step", sets: 3, time: 30, rest: 7 },
  { name: "Kneeling Quad Stretch", sets: 3, time: 30, rest: 7 },
  { name: "Single Leg Heel Raise", sets: 3, time: 30, rest: 7 },
  { name: "Hip Flexor Stretch", sets: 3, time: 30, rest: 7 },
  { name: "Standing Calf Stretch", sets: 3, time: 30, rest: 7 },
  { name: "Quad Pull", sets: 3, time: 30, rest: 7 },
  { name: "Hamstring Dip", sets: 3, time: 30, rest: 7 },
  { name: "Frankenstein Kicks", sets: 3, time: 30, rest: 7 },
  { name: "Side Lying Hip Abduction", sets: 3, time: 30, rest: 7 },
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
    startButton.textContent = 'stop';
  }
  running = !running;
  displayText.textContent = currentExercise.name;
  startingTime = Date.now();
});

pauseButton.addEventListener('click', () => {
  if (running) {
    pauseButton.textContent = 'paused';
  } else {
    pauseButton.textContent = 'pause';
  }
  running = !running;
});

let lastTime = Date.now();

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
            currentExerciseIndex++;
            currentExercise = exercises[currentExerciseIndex];
            displayText.textContent = currentExercise.name;
          } else {
            displayText.textContent = "you are done";
            running = false;
            startButton.textContent = "start";
          }
        } 
        timer = 0;
      }
    }
    
    requestAnimationFrame(tick);
  }


function playAttentionBell() {
  document.getElementById("attentionBell").play();
}

function playFairyMagic() {
  document.getElementById("fairyMagic").play();
}
tick();