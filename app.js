// ===== Quotes Data =====
const quotes = [
    { text: "reaaaaally", context: null },
    { text: "Indeed", context: null },
    { text: "Alright", context: null },
    { text: "Okaaaay", context: null },
    { text: "Okay girlfriend", context: null },
    { text: "I'm just doing bakwaas", context: null },
    { text: "Do you even love me anymore", context: null },
    { text: "Dude…", context: null },
    { text: "Why do you hate me", context: null },
    { text: "I'm tired", context: null },
    { text: "I'm about to crash", context: null },
    { text: "Ok my house is actually messy", context: "the house was clean" },
    { text: "Come on now", context: null },
    { text: "You're so cute you know that?", context: null },
    { text: "DONE", context: null },
    { text: "That's phenomenal dude", context: "neck and head movement included, and like blinking strongly" },
    { text: "OK love you.. goodnight 🙄😠", context: "when I'm yapping and she's trying to go to bed" },
    { text: "Hey now hey now, this is what dreeeeams are made of", context: null },
    { text: "I'm YEGCITED", context: null },
    { text: "Whatcha dooin?", context: null },
    { text: "*Meows to Prada*", context: null },
];

// ===== State =====
let shuffledQuotes = [];
let currentIndex = -1;
let currentQuote = null;

// ===== DOM Elements =====
const quoteText = document.getElementById('quoteText');
const quoteContext = document.getElementById('quoteContext');
const quoteCard = document.getElementById('quoteCard');
const generateBtn = document.getElementById('generateBtn');
const speakBtn = document.getElementById('speakBtn');
const heartsContainer = document.getElementById('heartsContainer');

// ===== Shuffle (Fisher-Yates) =====
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getNextQuote() {
    currentIndex++;
    if (currentIndex >= shuffledQuotes.length) {
        shuffledQuotes = shuffle(quotes);
        currentIndex = 0;
    }
    return shuffledQuotes[currentIndex];
}

// ===== Quote Display =====
function displayQuote() {
    currentQuote = getNextQuote();

    // Pop animation
    quoteCard.classList.remove('pop');
    void quoteCard.offsetWidth; // force reflow
    quoteCard.classList.add('pop');

    // Update text
    quoteText.textContent = `"${currentQuote.text}"`;

    // Update context
    if (currentQuote.context) {
        quoteContext.textContent = `(${currentQuote.context})`;
    } else {
        quoteContext.textContent = '';
    }

    // Enable speak button
    speakBtn.disabled = false;

    // Burst hearts effect
    createBurstHearts();
}

// ===== Text-to-Speech (ElevenLabs - Natural Female Voice) =====
// To use: set your free ElevenLabs API key below
// Sign up at https://elevenlabs.io (free tier = 10,000 chars/month)
const ELEVENLABS_API_KEY = 'sk_692c32a9d26da94c53a6d2fc6f153ce453002859bbabbcd0';
const ELEVENLABS_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // "Rachel" - natural female voice

let currentAudio = null;
let isSpeaking = false;

async function speakQuote() {
    if (!currentQuote || isSpeaking) return;

    // Stop any currently playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }

    isSpeaking = true;
    speakBtn.classList.add('speaking');

    try {
        const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}?output_format=mp3_44100_128`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': ELEVENLABS_API_KEY
                },
                body: JSON.stringify({
                    text: currentQuote.text,
                    model_id: 'eleven_multilingual_v2'
                })
            }
        );

        if (!response.ok) throw new Error(`ElevenLabs API error: ${response.status}`);

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        currentAudio = audio;

        audio.addEventListener('ended', () => {
            speakBtn.classList.remove('speaking');
            isSpeaking = false;
            currentAudio = null;
            URL.revokeObjectURL(audioUrl);
        });

        audio.addEventListener('error', () => {
            speakBtn.classList.remove('speaking');
            isSpeaking = false;
            currentAudio = null;
            URL.revokeObjectURL(audioUrl);
        });

        await audio.play();
    } catch (error) {
        console.error('TTS Error:', error);
        speakBtn.classList.remove('speaking');
        isSpeaking = false;
        currentAudio = null;
    }
}

// ===== Floating Hearts & Photos Background =====
const heartEmojis = ['💕', '💗', '💖', '💘', '💝', '❤️', '🩷', '💓', '💞'];
const floatingPhotos = [
    'images/photo1.png', 'images/photo2.png', 'images/photo3.png', 'images/photo4.png',
    'images/photo5.png', 'images/photo6.png', 'images/photo7.png', 'images/photo8.png',
    'images/subject4.png', 'images/subject5.png', 'images/subject6.png', 'images/subject7.png'
];

function createFloatingHeart() {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    // Random position and timing
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
    heart.style.animationDelay = (Math.random() * 2) + 's';

    heartsContainer.appendChild(heart);

    // Remove after animation completes
    const duration = parseFloat(heart.style.animationDuration) + parseFloat(heart.style.animationDelay);
    setTimeout(() => heart.remove(), duration * 1000 + 500);
}

function createFloatingPhoto() {
    const img = document.createElement('img');
    img.classList.add('floating-photo');
    img.src = floatingPhotos[Math.floor(Math.random() * floatingPhotos.length)];
    img.alt = '';

    // Random size (100-180px), position, timing, and rotation
    const size = Math.random() * 80 + 100;
    img.style.width = size + 'px';
    img.style.height = 'auto';
    img.style.left = Math.random() * 90 + 5 + '%';
    img.style.animationDuration = (Math.random() * 8 + 10) + 's';
    img.style.animationDelay = (Math.random() * 3) + 's';

    // Random rotation directions
    const rotateMid = (Math.random() - 0.5) * 20;
    const rotateEnd = (Math.random() - 0.5) * 30;
    img.style.setProperty('--rotate-mid', rotateMid + 'deg');
    img.style.setProperty('--rotate-end', rotateEnd + 'deg');

    heartsContainer.appendChild(img);

    // Remove after animation completes
    const duration = parseFloat(img.style.animationDuration) + parseFloat(img.style.animationDelay);
    setTimeout(() => img.remove(), duration * 1000 + 500);
}

// Spawn hearts and photos continuously
function startHearts() {
    // Initial batch of hearts
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createFloatingHeart(), i * 400);
    }
    // Initial batch of photos
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createFloatingPhoto(), i * 1200 + 500);
    }
    // Ongoing hearts
    setInterval(createFloatingHeart, 1500);
    // Ongoing photos (less frequent than hearts)
    setInterval(createFloatingPhoto, 4000);
}

// ===== Burst Hearts on Button Click =====
function createBurstHearts() {
    const btnRect = generateBtn.getBoundingClientRect();
    const cx = btnRect.left + btnRect.width / 2;
    const cy = btnRect.top + btnRect.height / 2;

    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('span');
        heart.classList.add('burst-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.5;
        const distance = 80 + Math.random() * 80;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        heart.style.left = cx + 'px';
        heart.style.top = cy + 'px';
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 900);
    }
}

// ===== Event Listeners =====
generateBtn.addEventListener('click', () => {
    displayQuote();
    // Auto-speak the quote
    setTimeout(speakQuote, 300);
});

speakBtn.addEventListener('click', speakQuote);

// ===== Init =====
shuffledQuotes = shuffle(quotes);
startHearts();
