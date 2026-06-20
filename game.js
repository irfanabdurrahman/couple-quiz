// ===== Couple Quiz Game — Main Logic =====

// ---- State ----
const state = {
  player1Name: '',
  player2Name: '',
  numQuestions: 10,
  category: 'all',
  questions: [],
  currentIdx: 0,
  // For each question: { qIdx, p1Answer, p2Guess, isCorrect }
  answers: [],
  p1Score: 0,  // p2 guesses correctly about p1
  p2Score: 0,  // p1 guesses correctly about p2
  // Alternating: even rounds p1 answers & p2 guesses, odd rounds swap
};

// ---- DOM helpers ----
const $ = (id) => document.getElementById(id);

const screens = {
  setup: $('setup-screen'),
  p1Answer: $('p1-answer-screen'),
  p2Guess: $('p2-guess-screen'),
  reveal: $('reveal-screen'),
  results: $('results-screen'),
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ---- Shuffle array (Fisher-Yates) ----
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---- Pick questions ----
function pickQuestions() {
  let pool = window.QUESTIONS;
  if (state.category !== 'all') {
    pool = pool.filter(q => q.category === state.category);
  }
  const shuffled = shuffle(pool);
  return shuffled.slice(0, state.numQuestions);
}

// ---- Start Game ----
$('start-btn').addEventListener('click', () => {
  const n1 = $('player1-name').value.trim();
  const n2 = $('player2-name').value.trim();
  
  if (!n1 || !n2) {
    alert('Isi nama kalian berdua dulu ya! 💕');
    return;
  }
  
  state.player1Name = n1;
  state.player2Name = n2;
  state.numQuestions = parseInt($('num-questions').value);
  state.category = $('category').value;
  state.questions = pickQuestions();
  state.currentIdx = 0;
  state.answers = [];
  state.p1Score = 0;
  state.p2Score = 0;
  
  // Check if enough questions
  if (state.questions.length === 0) {
    alert('Nggak ada pertanyaan untuk kategori ini!');
    return;
  }
  
  startRound();
});

// ---- Round flow ----
// Each round: 
//   - One player answers about themselves (the "answerer")
//   - Other player guesses (the "guesser")
//   - We alternate who is answerer each round

function startRound() {
  const idx = state.currentIdx;
  const q = state.questions[idx];
  const answererIsP1 = (idx % 2 === 0); // even rounds: p1 answers
  
  // Setup P1 answer screen (whoever is the answerer)
  const answererName = answererIsP1 ? state.player1Name : state.player2Name;
  const answererBadge = answererIsP1 ? '👩' : '👨';
  
  $('p1-badge').textContent = answererBadge;
  $('p1-answer-title').textContent = `${answererName}, jawab jujur ya!`;
  $('p1-progress').textContent = `Soal ${idx + 1}/${state.questions.length}`;
  $('p1-bar').style.width = `${((idx + 1) / state.questions.length) * 100}%`;
  $('p1-question').innerHTML = `${q.emoji} ${q.q}`;
  
  // Render options
  const optsContainer = $('p1-options');
  optsContainer.innerHTML = '';
  $('p1-next-btn').classList.add('hidden');
  
  let selectedAnswer = null;
  
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      // Deselect siblings
      optsContainer.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAnswer = i;
      $('p1-next-btn').classList.remove('hidden');
    });
    optsContainer.appendChild(btn);
  });
  
  // Store answerer info for this round
  state._roundAnswererIsP1 = answererIsP1;
  state._roundAnswer = null;
  
  // Next button → switch to guesser
  $('p1-next-btn').onclick = () => {
    if (selectedAnswer === null) return;
    state._roundAnswer = selectedAnswer;
    showGuesserScreen();
  };
  
  showScreen('p1Answer');
}

function showGuesserScreen() {
  const idx = state.currentIdx;
  const q = state.questions[idx];
  const answererIsP1 = state._roundAnswererIsP1;
  const guesserName = answererIsP1 ? state.player2Name : state.player1Name;
  const guesserBadge = answererIsP1 ? '👨' : '👩';
  
  $('p2-badge').textContent = guesserBadge;
  $('p2-guess-title').textContent = `${guesserName}, tebak jawabannya!`;
  $('p2-progress').textContent = `Soal ${idx + 1}/${state.questions.length}`;
  $('p2-bar').style.width = `${((idx + 1) / state.questions.length) * 100}%`;
  $('p2-question').innerHTML = `${q.emoji} ${q.q}`;
  
  const optsContainer = $('p2-options');
  optsContainer.innerHTML = '';
  $('p2-result').classList.add('hidden');
  $('p2-next-btn').classList.add('hidden');
  
  let selectedGuess = null;
  
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      optsContainer.querySelectorAll('.option-btn').forEach(b => {
        b.classList.remove('selected', 'correct', 'wrong');
      });
      btn.classList.add('selected');
      selectedGuess = i;
      
      // Reveal correctness
      const correctIdx = state._roundAnswer;
      btn.disabled = true;
      
      if (i === correctIdx) {
        btn.classList.remove('selected');
        btn.classList.add('correct');
        $('p2-result').textContent = '✅ Benar! Kenal banget ya!';
        $('p2-result').className = 'result-feedback correct';
        
        // Score: guesser gets point
        if (answererIsP1) state.p2Score++;
        else state.p1Score++;
      } else {
        btn.classList.remove('selected');
        btn.classList.add('wrong');
        // Show correct one
        optsContainer.children[correctIdx].classList.add('correct');
        $('p2-result').textContent = '❌ Salah! Ternyata beda ya 😅';
        $('p2-result').className = 'result-feedback wrong';
      }
      
      // Disable all buttons
      optsContainer.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
      $('p2-result').classList.remove('hidden');
      $('p2-next-btn').classList.remove('hidden');
    });
    optsContainer.appendChild(btn);
  });
  
  // Save round result & advance
  $('p2-next-btn').onclick = () => {
    state.answers.push({
      qIdx: idx,
      answererIsP1: answererIsP1,
      p1Answer: answererIsP1 ? state._roundAnswer : selectedGuess,
      p2Answer: answererIsP1 ? selectedGuess : state._roundAnswer,
      isCorrect: selectedGuess === state._roundAnswer,
    });
    
    state.currentIdx++;
    
    if (state.currentIdx >= state.questions.length) {
      showResults();
    } else {
      startRound();
    }
  };
  
  showScreen('p2Guess');
}

// ---- Results ----
function showResults() {
  const p1 = state.p1Score;
  const p2 = state.p2Score;
  
  $('result-p1-name').textContent = state.player1Name;
  $('result-p2-name').textContent = state.player2Name;
  $('result-p1-score').textContent = p1;
  $('result-p2-score').textContent = p2;
  
  let winnerText = '';
  let message = '';
  
  if (p1 > p2) {
    winnerText = `🎉 ${state.player1Name} MENANG! 🎉`;
    message = `${state.player1Name} lebih kenal ${state.player2Name}! Padahal ${state.player2Name} cuma nebak benar ${p2} kali 😏`;
  } else if (p2 > p1) {
    winnerText = `🎉 ${state.player2Name} MENANG! 🎉`;
    message = `${state.player2Name} lebih kenal ${state.player1Name}! ${state.player1Name} cuma nebak benar ${p1} kali, belajar lagi ya 😜`;
  } else {
    winnerText = `🤝 SERI! 🤝`;
    message = `Kalian berdua sama-sama kenal ${p1} jawaban. Hubungan seimbang nih! Atau sama-sama nggak kenal? 👀`;
  }
  
  // Special message for perfect scores
  const totalQ = state.questions.length;
  if (p1 === totalQ && p2 === totalQ) {
    message = `🤯 PERFECT SCORE! Kalian berdua beneran saling kenal banget! #couplegoals 🔥`;
  } else if (p1 === 0 && p2 === 0 && totalQ >= 5) {
    message = `😂 KOSONG SEMUA! Mungkin kalian perlu kencan lagi buat saling kenal... atau ini hubungan baru? 🥲`;
  }
  
  $('winner-banner').textContent = winnerText;
  $('final-message').textContent = message;
  
  showScreen('results');
  
  // Confetti for any completion!
  launchConfetti();
}

// ---- Restart ----
$('restart-btn').addEventListener('click', () => {
  $('player1-name').value = state.player1Name;
  $('player2-name').value = state.player2Name;
  showScreen('setup');
});

// ---- Confetti effect ----
function launchConfetti() {
  const canvas = $('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add('active');
  
  const colors = ['#ff6b9d', '#c44dff', '#ffd700', '#4ade80', '#fbc2eb', '#ff9a9e'];
  const particles = [];
  
  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    });
  }
  
  let frame = 0;
  const maxFrames = 300;
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05; // gravity
      p.rotation += p.rotationSpeed;
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    });
    
    frame++;
    if (frame < maxFrames) {
      requestAnimationFrame(animate);
    } else {
      canvas.classList.remove('active');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  
  animate();
}

// ---- Keyboard support ----
document.addEventListener('keydown', (e) => {
  // Enter to proceed on visible buttons
  if (e.key === 'Enter') {
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen) {
      const btn = activeScreen.querySelector('.btn-primary:not(.hidden)');
      if (btn) btn.click();
    }
  }
});

// ---- Allow Enter on setup form to start ----
$('player2-name').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') $('start-btn').click();
});
