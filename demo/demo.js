
const skipButton = document.querySelector('#skipBtn');

skipButton.addEventListener('click', () => {
    timer = 0;
    goToNextExercise();
});