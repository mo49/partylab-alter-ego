import EventEmitter from 'eventemitter3'

export default class Webcam extends EventEmitter {
    constructor(opts={}) {
        super()
        this.video = document.getElementById("webcam-video")
        this.imageCanvas = document.getElementById("webcam-image")
        this.imageCtx = this.imageCanvas.getContext('2d')
        this.button = document.getElementById("btn-take-photo")

        this.init()
        this.initListener()
    }

    init() {
        const media = navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        })
        media.then(stream => {
            this.video.srcObject = stream
            this.emit('start_video')
        })
    }

    initListener() {
        this.button.addEventListener("click", () => {
            this.take_photo()
        })
    }

    take_photo() {
        const width = this.video.offsetWidth;
        const height = this.video.offsetHeight;
        this.imageCanvas.width = width
        this.imageCanvas.height = height
        this.imageCtx.drawImage(this.video, 0, 0, width, height)
        this.emit('take_photo', this.imageCanvas)
    }
}
