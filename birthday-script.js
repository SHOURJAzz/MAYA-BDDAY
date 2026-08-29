// ==================== BANGLADESH TIME COUNTDOWN ==================== 

// Birthday date in Bangladesh Standard Time
const BIRTHDAY_MONTH = 7; // August (0-indexed)
const BIRTHDAY_DATE = 31;
const BIRTHDAY_HOUR = 0;
const BIRTHDAY_MINUTE = 0;
const BIRTHDAY_SECOND = 0;

// Bangladesh Standard Time is UTC+6
const BD_TIMEZONE_OFFSET = 6 * 60; // 360 minutes

function getBangladeshTime() {
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const bdTime = new Date(utcTime + BD_TIMEZONE_OFFSET * 60000);
    return bdTime;
}

function getBirthdayTime() {
    // Uttara follows Bangladesh Standard Time (UTC+6). Build an absolute
    // timestamp for 00:00 on 31 August, independent of the visitor's timezone.
    const now = new Date();
    return new Date(Date.UTC(
        now.getUTCFullYear(),
        BIRTHDAY_MONTH,
        BIRTHDAY_DATE,
        BIRTHDAY_HOUR - 6,
        BIRTHDAY_MINUTE,
        BIRTHDAY_SECOND
    ));
}

function updateCountdown() {
    // Both values are absolute timestamps, so subtraction is timezone-safe.
    const now = new Date();
    const birthdayDate = getBirthdayTime();
    const diff = birthdayDate - now;

    if (diff <= 0) {
        // Birthday has arrived!
        if (!window.birthdayReached) {
            window.birthdayReached = true;
            triggerMidnightTransition();
        }
        return true; // Birthday reached
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    // Format with leading zeros and update display
    updateCountdownDisplay(
        String(days).padStart(2, '0'),
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0')
    );

    return false; // Birthday not reached yet
}

function updateCountdownDisplay(days, hours, minutes, seconds) {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    updateCountdownValue(daysEl, days);
    updateCountdownValue(hoursEl, hours);
    updateCountdownValue(minutesEl, minutes);
    updateCountdownValue(secondsEl, seconds);
}

function updateCountdownValue(element, newValue) {
    if (element.textContent !== newValue) {
        element.classList.add('tick');
        element.textContent = newValue;
        setTimeout(() => element.classList.remove('tick'), 400);
    }
}

// ==================== MIDNIGHT TRANSITION ==================== 

function triggerMidnightTransition() {
    const countdownSection = document.querySelector('.countdown-section');
    const midnightSection = document.getElementById('midnight-transition');
    const cardSection = document.querySelector('.birthday-card-section');
    
    document.body.classList.remove('site-locked');
    document.body.classList.add('midnight-active', 'site-unlocked');
    countdownSection.style.display = 'none';
    midnightSection.style.display = 'flex';
    
    // Create midnight particles
    createMidnightParticles();
    
    // Create confetti
    createConfetti();
    
    // After transition completes, show the main content
    setTimeout(() => {
        midnightSection.style.display = 'none';
        cardSection.style.display = 'flex';
        cardSection.classList.add('is-revealed');
        document.body.classList.remove('midnight-active');
        window.scrollTo(0, 0);
    }, 6500);
}

function showBirthdayExperience() {
    const countdownSection = document.querySelector('.countdown-section');
    const midnightSection = document.getElementById('midnight-transition');
    const cardSection = document.querySelector('.birthday-card-section');
    if (countdownSection) countdownSection.style.display = 'none';
    if (midnightSection) midnightSection.style.display = 'none';
    if (cardSection) {
        cardSection.style.display = 'flex';
        cardSection.classList.add('is-revealed');
    }
    document.body.classList.remove('site-locked', 'midnight-active');
    document.body.classList.add('site-unlocked');
}

function createMidnightParticles() {
    const container = document.getElementById('midnightParticles');
    if (!container) return;
    
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        const particle = createParticle('✨');
        const delay = (i * 100) / particleCount;
        particle.style.animation = `particleRadiate 2s ease-out ${delay}ms forwards`;
        container.appendChild(particle);
    }
}

function createParticle(emoji) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = emoji;
    particle.style.left = '50%';
    particle.style.top = '50%';
    particle.style.fontSize = Math.random() * 1 + 1 + 'rem';
    
    return particle;
}

// Particle radiate animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleRadiate {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + ${Math.cos(Math.random() * Math.PI * 2) * 200}px), 
                                calc(-50% + ${Math.sin(Math.random() * Math.PI * 2) * 200}px)) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function createConfetti() {
    const container = document.getElementById('midnightConfetti');
    if (!container) return;
    
    const confettiCount = 50;
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'particle';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.textContent = Math.random() > 0.5 ? '✨' : '💫';
        confetti.style.fontSize = Math.random() * 1 + 0.5 + 'rem';
        confetti.style.animation = `confettiFall 3s ease-in ${Math.random() * 1}s forwards`;
        container.appendChild(confetti);
    }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// ==================== AMBIENT PARTICLES ==================== 

function createAmbientParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    
    const particleCount = 30;
    const particles = ['✨', '💫', '⭐', '🌟'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.fontSize = Math.random() * 1 + 0.5 + 'rem';
        particle.style.animation = `float ${Math.random() * 8 + 6}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 4 + 's';
        container.appendChild(particle);
    }
}

const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
        }
        25% {
            transform: translateY(-30px) translateX(20px);
        }
        50% {
            transform: translateY(-60px) translateX(-20px);
        }
        75% {
            transform: translateY(-30px) translateX(30px);
        }
    }
`;
document.head.appendChild(floatStyle);

// ==================== SCROLL REVEAL ANIMATIONS ==================== 

function setupScrollReveal() {
    const observerOptions = {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px'
    };

    const observer = typeof IntersectionObserver === 'function'
        ? new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions)
        : null;

    // Observe all sections except the first one (countdown)
    document.querySelectorAll('.section').forEach((section, index) => {
        if (index === 0) {
            // Make the first section (countdown) visible immediately
            section.classList.add('is-revealed');
        } else {
            // Apply scroll reveal to other sections
            section.classList.add('reveal-ready');
            if (observer) observer.observe(section);
            else {
                section.classList.add('is-revealed');
            }
        }
    });
}

// ==================== LETTER REVEAL ANIMATION ==================== 

function setupLetterReveal() {
    const letterBtn = document.getElementById('openLetterBtn');
    const letterSection = document.getElementById('letter');
    
    if (!letterBtn || !letterSection) return;
    
    letterBtn.addEventListener('click', () => {
        const rect = letterBtn.getBoundingClientRect();
        const targetY = letterSection.offsetTop - 100;
        
        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });
        
        // Flash the letter section
        letterSection.style.animation = 'none';
        setTimeout(() => {
            letterSection.style.animation = 'letterPulse 0.6s ease';
        }, 10);
    });
}

const letterPulseStyle = document.createElement('style');
letterPulseStyle.textContent = `
    @keyframes letterPulse {
        0%, 100% {
            box-shadow: 0 8px 32px rgba(107, 91, 149, 0.2);
        }
        50% {
            box-shadow: 0 8px 40px rgba(212, 175, 122, 0.4);
        }
    }
`;
document.head.appendChild(letterPulseStyle);

// ==================== GAME LOGIC ==================== 

const GAME_TARGET = 12;
let gameProgress = 0;
let gameCompleted = false;
const gameMessages = [
    "Nice.",
    "Skill issue if you missed that.",
    "Keep going.",
    "Almost there 👀",
    "Why are you taking so long?",
    "I believe in you bro.",
    "getting close...",
    "don't stop now"
];

// ==================== CANDY MATCH GAME ====================
const CANDY_ROWS = 6;
const CANDY_COLS = 6;
const CANDY_TYPES = ['ruby', 'lemon', 'mint', 'blueberry', 'grape', 'orange'];
let candyBoard = [];
let selectedCandy = null;
let candyBusy = false;
let candyMoves = 0;
let candyCleared = 0;

function randomCandy() {
    return CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)];
}

function makeCandyBoard() {
    let attempts = 0;
    do {
        const nextBoard = Array.from({ length: CANDY_ROWS }, (_, row) =>
            Array.from({ length: CANDY_COLS }, (_, col) => {
                let candy;
                do {
                    candy = randomCandy();
                } while ((col >= 2 && nextBoard[row][col - 1] === candy && nextBoard[row][col - 2] === candy) ||
                         (row >= 2 && nextBoard[row - 1][col] === candy && nextBoard[row - 2][col] === candy));
                return candy;
            })
        );
        candyBoard = nextBoard;
        attempts++;
    } while (attempts < 100 && !hasPossibleCandyMove());
}

function hasPossibleCandyMove() {
    for (let row = 0; row < CANDY_ROWS; row++) {
        for (let col = 0; col < CANDY_COLS; col++) {
            for (const [rowOffset, colOffset] of [[0, 1], [1, 0]]) {
                const nextRow = row + rowOffset;
                const nextCol = col + colOffset;
                if (nextRow >= CANDY_ROWS || nextCol >= CANDY_COLS) continue;
                swapCandies({ row, col }, { row: nextRow, col: nextCol });
                const works = findCandyMatches().size > 0;
                swapCandies({ row, col }, { row: nextRow, col: nextCol });
                if (works) return true;
            }
        }
    }
    return false;
}

function renderCandyBoard() {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    gameArea.innerHTML = '';
    candyBoard.forEach((row, rowIndex) => row.forEach((type, colIndex) => {
        const candy = document.createElement('button');
        candy.type = 'button';
        candy.className = `candy candy-${type}${selectedCandy && selectedCandy.row === rowIndex && selectedCandy.col === colIndex ? ' selected' : ''}`;
        candy.dataset.row = rowIndex;
        candy.dataset.col = colIndex;
        candy.setAttribute('aria-label', `${type} candy, row ${rowIndex + 1}, column ${colIndex + 1}`);
        candy.addEventListener('click', () => chooseCandy(rowIndex, colIndex));
        gameArea.appendChild(candy);
    }));
}

function areAdjacent(first, second) {
    return Math.abs(first.row - second.row) + Math.abs(first.col - second.col) === 1;
}

function swapCandies(first, second) {
    const temporary = candyBoard[first.row][first.col];
    candyBoard[first.row][first.col] = candyBoard[second.row][second.col];
    candyBoard[second.row][second.col] = temporary;
}

function findCandyMatches() {
    const matches = new Set();
    for (let row = 0; row < CANDY_ROWS; row++) {
        let start = 0;
        for (let col = 1; col <= CANDY_COLS; col++) {
            if (col < CANDY_COLS && candyBoard[row][col] && candyBoard[row][col] === candyBoard[row][start]) continue;
            if (col - start >= 3) for (let matchCol = start; matchCol < col; matchCol++) matches.add(`${row},${matchCol}`);
            start = col;
        }
    }
    for (let col = 0; col < CANDY_COLS; col++) {
        let start = 0;
        for (let row = 1; row <= CANDY_ROWS; row++) {
            if (row < CANDY_ROWS && candyBoard[row][col] && candyBoard[row][col] === candyBoard[start][col]) continue;
            if (row - start >= 3) for (let matchRow = start; matchRow < row; matchRow++) matches.add(`${matchRow},${col}`);
            start = row;
        }
    }
    return matches;
}

function markCandyMatches(matches) {
    matches.forEach(key => {
        const [row, col] = key.split(',').map(Number);
        const candy = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (candy) candy.classList.add('matched');
    });
}

function collapseCandyBoard() {
    for (let col = 0; col < CANDY_COLS; col++) {
        const remaining = [];
        for (let row = CANDY_ROWS - 1; row >= 0; row--) if (candyBoard[row][col]) remaining.push(candyBoard[row][col]);
        for (let row = CANDY_ROWS - 1; row >= 0; row--) candyBoard[row][col] = remaining[CANDY_ROWS - 1 - row] || randomCandy();
    }
}

async function resolveCandyMatches(matches) {
    if (!matches.size) return;
    candyBusy = true;
    markCandyMatches(matches);
    candyCleared += matches.size;
    updateCandyProgress();
    setGameMessage(matches.size >= 4 ? `Beautiful combo: ${matches.size} candies ✦` : 'Sweet move. Keep going.');
    await new Promise(resolve => setTimeout(resolve, 280));
    matches.forEach(key => {
        const [row, col] = key.split(',').map(Number);
        candyBoard[row][col] = null;
    });
    collapseCandyBoard();
    renderCandyBoard();
    await new Promise(resolve => setTimeout(resolve, 120));
    const nextMatches = findCandyMatches();
    candyBusy = false;
    if (nextMatches.size) await resolveCandyMatches(nextMatches);
    if (candyCleared >= GAME_TARGET) completeGame();
}

function chooseCandy(row, col) {
    if (candyBusy || gameCompleted) return;
    const chosen = { row, col };
    if (!selectedCandy) {
        selectedCandy = chosen;
        renderCandyBoard();
        return;
    }
    if (!areAdjacent(selectedCandy, chosen)) {
        selectedCandy = chosen;
        renderCandyBoard();
        return;
    }
    const previous = selectedCandy;
    selectedCandy = null;
    candyMoves++;
    const movesElement = document.getElementById('gameMoves');
    if (movesElement) movesElement.textContent = candyMoves;
    swapCandies(previous, chosen);
    const matches = findCandyMatches();
    if (!matches.size) {
        swapCandies(previous, chosen);
        setGameMessage('That swap has no spell in it — try another.');
        renderCandyBoard();
        return;
    }
    renderCandyBoard();
    resolveCandyMatches(matches);
}

function setGameMessage(message) {
    const messageElement = document.getElementById('gameMessage');
    if (messageElement) messageElement.textContent = message;
}

function updateCandyProgress() {
    const progressElement = document.getElementById('gameProgress');
    const progressFill = document.getElementById('progressFill');
    if (progressElement) progressElement.textContent = Math.min(candyCleared, GAME_TARGET);
    if (progressFill) progressFill.style.width = `${Math.min(candyCleared / GAME_TARGET * 100, 100)}%`;
}

function initializeCandyGame() {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    gameProgress = 0;
    candyCleared = 0;
    candyMoves = 0;
    gameCompleted = false;
    selectedCandy = null;
    candyBusy = false;
    makeCandyBoard();
    renderCandyBoard();
    updateCandyProgress();
    const shuffleButton = document.getElementById('shuffleCandies');
    if (shuffleButton) shuffleButton.addEventListener('click', () => {
        if (candyBusy || gameCompleted) return;
        selectedCandy = null;
        makeCandyBoard();
        renderCandyBoard();
        setGameMessage('The sweets have been reshuffled.');
    });
}

function initializeGame() {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    
    gameArea.innerHTML = ''; // Clear existing balloons
    gameProgress = 0;
    gameCompleted = false;
    
    // Create initial balloons
    createGameBalloons();
    
    // Spawn new balloons periodically
    const spawnInterval = setInterval(() => {
        if (gameCompleted) {
            clearInterval(spawnInterval);
        } else if (gameArea.children.length < 5) {
            createGameBalloons(1);
        }
    }, 2000);
}

function createGameBalloons(count = 3) {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea || gameCompleted) return;
    
    for (let i = 0; i < count; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        const colors = [
            'rgb(255, 107, 107)',
            'rgb(255, 195, 113)',
            'rgb(113, 198, 255)',
            'rgb(200, 124, 255)',
            'rgb(255, 150, 200)'
        ];
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 15 + 35;
        
        balloon.innerHTML = `
            <div class="balloon-shape" style="background: ${color}; width: ${size}px; height: ${size * 1.2}px;"></div>
            <div class="balloon-string"></div>
        `;
        
        const x = Math.random() * (gameArea.clientWidth - size);
        const y = Math.random() * (gameArea.clientHeight - size * 1.5);
        balloon.style.left = x + 'px';
        balloon.style.top = y + 'px';
        
        balloon.addEventListener('click', (e) => {
            e.stopPropagation();
            popBalloon(balloon);
        });
        
        gameArea.appendChild(balloon);
    }
}

function popBalloon(balloon) {
    if (balloon.classList.contains('popped')) return;
    
    balloon.classList.add('popped');
    gameProgress++;
    
    updateGameProgress();
    
    // Show message
    const messageEl = document.getElementById('gameMessage');
    if (messageEl) {
        messageEl.textContent = gameMessages[Math.floor(Math.random() * gameMessages.length)];
    }
    
    setTimeout(() => balloon.remove(), 500);
    
    if (gameProgress >= GAME_TARGET) {
        completeGame();
    }
}

function updateGameProgress() {
    const progressEl = document.getElementById('gameProgress');
    const progressFill = document.getElementById('progressFill');
    
    if (progressEl) progressEl.textContent = gameProgress;
    if (progressFill) {
        const percentage = (gameProgress / GAME_TARGET) * 100;
        progressFill.style.width = percentage + '%';
    }
}

function completeGame() {
    gameCompleted = true;
    const gameArea = document.getElementById('gameArea');
    const gameMessage = document.getElementById('gameMessage');
    
    if (gameArea) gameArea.style.pointerEvents = 'none';
    if (gameMessage) {
        gameMessage.textContent = '🎉 SURPRISE UNLOCKED 🎁';
        gameMessage.style.fontSize = '1.5rem';
        gameMessage.style.animation = 'messagePop 0.6s ease';
    }
}

const messagePop = document.createElement('style');
messagePop.textContent = `
    @keyframes messagePop {
        0% {
            transform: scale(0.5);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(messagePop);

// ==================== GIFT LOGIC ==================== 

const legacyGiftMessages = {
    1: "You're stuck with me. Sorry bro. 😂",
    2: "Keep being amazing. That's the real gift.",
    3: "Remember that time we... yeah, good times. 📸",
    4: "No matter how old you get, you're still my annoying older sister. And I love you for it. ❤️"
};

const giftMessages = {
    1: "TRUTH - What is the funniest thing I do that I pretend is completely normal?",
    2: "DARE - Send your brother the most dramatic birthday selfie you can manage.",
    3: "TRUTH - What is one memory with me that secretly makes you smile?",
    4: "FINAL FATE - You are officially loved, mildly roasted, and legally required to have a very good birthday. ✨"
};

function setupGiftBoxes() {
    const giftBoxes = document.querySelectorAll('.gift-box');
    
    giftBoxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            const giftNum = index + 1;
            const message = giftMessages[giftNum];
            
            const giftMessage = document.getElementById('giftMessage');
            if (giftMessage) {
                giftMessage.textContent = message;
                giftMessage.style.animation = 'none';
                setTimeout(() => {
                    giftMessage.style.animation = 'messageReveal 0.6s ease';
                }, 10);
            }
            
            // Prevent clicking the same gift multiple times
            box.classList.add('opened');
        });
    });
}

// ==================== EASTER EGGS ==================== 

function setupEasterEggs() {
    // Secret click zones
    const countdownSection = document.querySelector('.countdown-section');
    let starClickCount = 0;
    
    document.addEventListener('click', (e) => {
        const target = e.target;
        
        // Click on particles to reveal secrets
        if (target.classList.contains('particle') || target.classList.contains('star')) {
            starClickCount++;
            if (starClickCount >= 3) {
                showEasterEgg('star-secret', "You found the stars! 🌟");
                starClickCount = 0;
            }
        }
    });
    
    // Heart easter egg - double click
    let lastClickTime = 0;
    document.addEventListener('click', (e) => {
        const now = new Date().getTime();
        if (now - lastClickTime < 300) {
            if (e.clientY < window.innerHeight / 3) {
                showEasterEgg('heart-secret', "Every moment with you is a gift. 💕");
            }
        }
        lastClickTime = now;
    });
    
    // Konami code easter egg
    const konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode.splice(-konamiPattern.length - 1);
        
        if (konamiCode.join(',').includes(konamiPattern.join(','))) {
            showEasterEgg('konami-secret', "You know the code! 🎮 Happy Birthday!");
        }
    });
    
    // Type "MAYABEE" easter egg
    let typedText = '';
    document.addEventListener('keypress', (e) => {
        typedText += e.key.toUpperCase();
        if (typedText.includes('MAYABEE')) {
            showEasterEgg('name-secret', "You spelled her name! That's what it's all about. ✨");
            typedText = '';
        }
    });
}

function showEasterEgg(type, message) {
    const modal = document.getElementById('easterEggModal');
    const content = document.getElementById('easterEggContent');
    
    if (!modal || !content) return;
    
    content.innerHTML = `
        <h2>🎁 You found something!</h2>
        <p>${message}</p>
    `;
    
    modal.classList.add('active');
    
    setTimeout(() => {
        modal.classList.remove('active');
    }, 3000);
    
    // Close on click
    modal.addEventListener('click', () => {
        modal.classList.remove('active');
    }, { once: true });
}

// ==================== MUSIC PLAYER ==================== 

function setupMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const audio = document.getElementById('birthdayAudio');
    
    if (!musicToggle || !audio) return;
    
    musicToggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(err => {
                console.log('Audio play failed:', err);
                // Audio file doesn't exist or can't play
            });
            musicToggle.classList.add('playing');
            musicToggle.title = 'Pause music';
        } else {
            audio.pause();
            musicToggle.classList.remove('playing');
            musicToggle.title = 'Play music';
        }
    });
    
    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
    });
}

// ==================== NAVIGATION ==================== 

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ==================== INITIALIZATION ==================== 

function initializePage() {
    // Visitors arriving after midnight should see the birthday experience
    // immediately; only the live crossing gets the cinematic transition.
    const birthdayStarted = new Date() >= getBirthdayTime();
    if (birthdayStarted) {
        window.birthdayReached = true;
        showBirthdayExperience();
    } else {
        document.body.classList.add('site-locked');
        updateCountdown();
    }

    // Start the countdown before optional visual/game setup. This keeps the
    // timer running even if a browser does not support one of those features.
    setInterval(() => {
        if (!window.birthdayReached && updateCountdown()) {
            window.birthdayReached = true;
        }
    }, 1000);

    // Reveal the first card before optional page effects initialize.
    setupCardReveal();

    // Initialize audio before optional visual effects.
    setupMusicPlayer();

    // Initialize the short match-3 puzzle before optional page effects.
    initializeCandyGame();
    
    // Create ambient particles
    createAmbientParticles();
    
    // Setup scroll reveal
    setupScrollReveal();
    
    // Setup letter reveal
    setupLetterReveal();
    
    // Setup gift boxes
    setupGiftBoxes();
    
    // Setup easter eggs
    setupEasterEggs();
    
    // Setup music player
    // Setup navigation
    setupNavigation();
    setupWandCursor();
    
}

function setupCardReveal() {
    const cards = [...document.querySelectorAll('.attribute-card')];
    let next = 0;
    const revealNext = () => {
        if (next < cards.length) {
            const card = cards[next++];
            card.classList.add('is-visible');
            // Inline styles ensure the reveal works even if another animation
            // or stylesheet rule leaves the card at opacity: 0.
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }
    };
    revealNext();
    cards.forEach((card, index) => card.addEventListener('click', () => {
        if (index === next - 1) revealNext();
        card.classList.toggle('selected');
    }));
}

function setupWandCursor() {
    // Desktop-only spark trail; touch devices keep their native cursor.
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const layer = document.getElementById('wandSparkLayer');
    if (!layer) return;
    let lastSpark = 0;
    document.addEventListener('pointermove', (event) => {
        if (event.timeStamp - lastSpark < 55) return;
        lastSpark = event.timeStamp;
        const spark = document.createElement('span');
        spark.className = 'wand-spark';
        spark.textContent = Math.random() > .35 ? '✦' : '·';
        spark.style.left = `${event.clientX + (Math.random() * 12 - 6)}px`;
        spark.style.top = `${event.clientY + (Math.random() * 12 - 6)}px`;
        layer.appendChild(spark);
        setTimeout(() => spark.remove(), 700);
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

// ==================== ADDITIONAL POLISH ==================== 

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Prevent default for video/media
document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
});
