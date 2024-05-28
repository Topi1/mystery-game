export default class SoundController {

    constructor(scene) {
        this.scene = scene
        this.sounds = {}
    }

    addSounds() {
        this.sounds.ferrySound = this.scene.sound.add('ferrySound');
        console.log('Sound added:', this.sounds.ferrySound);
    }

    playSound(key) {
        if (this.sounds[key]) {
            this.sounds[key].play();
        }
    }

    stopSound(key) {
        if (this.sounds[key] && this.sounds[key].isPlaying) {
            this.sounds[key].stop();
        }
    }

    setVolume(key, volume) {
        if (this.sounds[key]) {
            this.sounds[key].setVolume(volume);
        }
    }
}