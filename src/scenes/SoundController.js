export default class SoundController {

    constructor(scene) {
        this.scene = scene
        this.sounds = {}
    }

    addSounds() {
        this.sounds.introSong = this.scene.sound.add("introSong")
        

        this.sounds.ferrySound = this.scene.sound.add('ferrySound')

        this.sounds.typeWriter = this.scene.sound.add('typeWriter')
        
    }

    playSound(key) {
        if (this.sounds[key]) {
            this.sounds[key].play();
            console.log(`Playing sound: ${key}`);
        } else {
            console.log(`Sound key not found: ${key}`);
        }
    }

    stopSound(key) {
        if (this.sounds[key] && this.sounds[key].isPlaying) {
            this.sounds[key].stop();
            console.log(`Attempted to stop sound: ${key}`);
        } else {
            console.log(`Sound key not found at stop attempt: ${key}`);
        }
    }

    setVolume(key, volume) {
        if (this.sounds[key]) {
            this.sounds[key].setVolume(volume);
        }
    }
}