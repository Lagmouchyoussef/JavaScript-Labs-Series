document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const minutesInput = document.getElementById('minutes-input');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const resetBtn = document.getElementById('reset-btn');

    let countdown;
    let remainingTime = 0;

    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);

    function startTimer() {
        if (countdown) return; // Prevent multiple intervals
        
        const minutes = parseInt(minutesInput.value) || 0;
        if (minutes <= 0) return;
        
        remainingTime = minutes * 60;
        updateDisplay();
        
        countdown = setInterval(() => {
            remainingTime--;
            updateDisplay();
            
            if (remainingTime <= 0) {
                clearInterval(countdown);
                countdown = null;
                alert("Time's up!");
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(countdown);
        countdown = null;
    }

    function resetTimer() {
        stopTimer();
        remainingTime = 0;
        minutesInput.value = '';
        updateDisplay();
    }

    function updateDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        
        display.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
});