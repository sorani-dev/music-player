"use strict"

/** @type HTMLDivElement */
const musicContainer = document.querySelector('.music-container')
/** @type HTMLButtonElement */
const playBtn = document.querySelector('#play')
/** @type HTMLButtonElement */
const prevBtn = document.querySelector('#prev')
/** @type HTMLButtonElement */
const nextBtn = document.querySelector('#next')
/** @type HTMLAudioElement */
const audio = document.querySelector('#audio')
/** @type HTMLDivElement */
const progress = document.querySelector('.progress')
/** @type HTMLDivElement */
const progressContainer = document.querySelector('.progress-container')
/** @type HTMLHeadingElement */
const title = document.querySelector('#title')
/** @type HTMLImageElement */
const cover = document.querySelector('#cover')


/** @type string[] Song titles */
const songs = ['hey', 'summer', 'ukulele']

// Keep track of songs
let songIndex = 2 // default song

// Initially load song into DOM
loadSong(songs[songIndex])

/**
 * Update song details
 * @param {string} song  song name
 */
function loadSong(song) {
    title.innerText = song
    audio.src = `./music/${song}.mp3`
    cover.src = `./images/${song}.jpg`
}

/**
 * Play the current song
 */
function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    playBtn.querySelector('i.fas').setAttribute('aria-label', 'Pause Current Track')

    audio.play()
}

/**
 * Pause the current song
 */
function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').setAttribute('aria-label', 'Play Current Track')

    audio.pause()
}

/**
 * Go to the previous song
 */
function prevSong() {
    songIndex--

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
}

/**
 * Go to the next song
 */
function nextSong() {
    songIndex++

    if (songIndex >= songs.length) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
}

/**
 * Update progress bar on song time change
 */
/**
 * 
 * @param {Event} e 
 */
function updateProgress(e) {
    const { currentTime, duration } = audio
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

/**
 * Change the song position from the progress bar change
 * @param {MouseEvent} e
 */
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('ended', nextSong)

progressContainer.addEventListener('click', setProgress)