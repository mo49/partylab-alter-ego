export default class Webcam {
    constructor(opts={}) {
        this.video = document.getElementById("video")
        this.canvas = document.getElementById("webcam-canvas")
        this.ctx = this.canvas.getContext('2d')
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
        this.canvas.width = width
        this.canvas.height = height
        this.ctx.drawImage(this.video, 0, 0, width, height)
    }
}
