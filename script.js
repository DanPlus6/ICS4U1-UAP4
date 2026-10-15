'use strict';

// ------- Const HTML targets ------- 

const AUDIO = document.getElementById("audio");
const AUDIO_TOGGLE = document.getElementById("audio-toggle");
const PLAYER_ICON = document.getElementById("audio-player-icon");
const AUDIO_TIME = document.getElementById("audio-time");
const AUDIO_LEN = document.getElementById("audio-len");
const progress = document.getElementById("audio-progress");


// ------- Tools and Callbacks ------- 

/**
 * Format seconds as minutes and seconds
 * @param {number} s seconds
 * @returns {string} formatted string of <mins>:<s>
 */
function formatTime(s) {
    if (!Number.isFinite(s)) return "0:00";

    const m = Math.floor(s / 60);
    const rs = Math.floor(s % 60);

    return `${m}:${String(rs).padStart(2, "0")}`;
}


// ------- Attach Listeners ------- 

const BPATH = 'assets/';

/**
 * Toggle playback and update the button icon on click
 */
AUDIO_TOGGLE.addEventListener("click", () => {
    if (AUDIO.paused) AUDIO.play();
    else AUDIO.pause();
});

/**
 * Update the icon when playback starts or pauses
 */
AUDIO.addEventListener("play", () => { PLAYER_ICON.src = BPATH+"pause.png"; });
/**
 * Update the icon when playback pauses or starts
 */
AUDIO.addEventListener("pause", () => { PLAYER_ICON.src = BPATH+"play.png"; });

/** 
 * Load and display the total audio duration
 */
AUDIO.addEventListener("loadedmetadata", () => { AUDIO_LEN.textContent = formatTime(AUDIO.duration); });

/**
 * Update the slider and elapsed time during playback
 */
AUDIO.addEventListener("timeupdate", () => {
    AUDIO_TIME.textContent = formatTime(AUDIO.currentTime);

    if (Number.isFinite(AUDIO.duration) && AUDIO.duration > 0) {
        progress.value = (AUDIO.currentTime / AUDIO.duration) * 100;
    }
});

/**
 * Seek to the selected position when the slider changes
 */
progress.addEventListener("input", () => {
    if (Number.isFinite(AUDIO.duration) && AUDIO.duration > 0) {
        AUDIO.currentTime = (progress.value / 100) * AUDIO.duration;
    }
});

/** 
 * Reset the player when the audio finishes
 */
AUDIO.addEventListener("ended", () => {
    progress.value = 0;
    AUDIO_TIME.textContent = "0:00";
});
