export default class SoundController {

    constructor(scene) {
        this.scene = scene
        this.sounds = {}
    }

    addSounds() {
        this.sounds.introSong = this.scene.sound.add("introSong")
        
        this.sounds.classicClick = this.scene.sound.add("classicClick", {volume: 0.2})
        this.sounds.interfaceClick = this.scene.sound.add("interfaceClick", {volume: 0.3})

        this.sounds.ferrySound = this.scene.sound.add('ferrySound')

        this.sounds.typeWriter = this.scene.sound.add('typeWriter')

        this.sounds.woodWalk = this.scene.sound.add("woodWalk", {volume: 1.5, loop: true})
        
    }

    playSound(key) {
        if (this.sounds[key]) {
            this.sounds[key].play();
            /*console.log(`Playing sound: ${key}`);
        } else {
            console.log(`Sound key not found: ${key}`);
        } */
    }
    }

    stopSound(key) {
        if (this.sounds[key] && this.sounds[key].isPlaying) {
            this.sounds[key].stop();
           /* console.log(`Attempted to stop sound: ${key}`);
        } else {
            console.log(`Sound key not found at stop attempt: ${key}`);
        } */
    }
    }

    setVolume(key, volume) {
        if (this.sounds[key]) {
            this.sounds[key].setVolume(volume);
        }
    }
}