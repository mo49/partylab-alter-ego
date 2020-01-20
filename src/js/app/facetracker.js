import EventEmitter from 'eventemitter3'

export default class FaceTracker extends EventEmitter {
    constructor(opts={}){
        super()
        this.video = document.getElementById('webcam-video')
        this.videoCanvas = document.getElementById('video-overlay')
        this.videoCtx = this.videoCanvas.getContext('2d')

        this.image = document.getElementById('webcam-image')
        this.imageCanvas = document.getElementById('image-overlay')
        this.imageCtx = this.imageCanvas.getContext('2d')

        this.updateVideo = this.updateVideo.bind(this)
        this.updateImage = this.updateImage.bind(this)
        this.onTrackrConverged = this.onTrackrConverged.bind(this)

        this.init()
    }

    init() {
        this.videoTracker = new clm.tracker()
        this.videoTracker.init()

        this.imageTracker = new clm.tracker()
        this.imageTracker.init()
    }

    startVideo() {
        this.videoTracker.stop()
        this.videoTracker.reset()
        this.videoTracker.start(this.video)
        this.updateVideo()
    }

    startImage() {
        this.imageTracker.stop()
        this.imageTracker.reset()
        this.imageTracker.start(this.image)

        document.addEventListener('clmtrackrConverged', this.onTrackrConverged);
        this.updateImage()
    }

    onTrackrConverged() {
        document.removeEventListener('clmtrackrConverged', this.onTrackrConverged);
        cancelAnimationFrame(this.requestImageId)
        this.imageTracker.stop();
        this.emit('tracked');
    }

    updateVideo() {
        this.requestMovieId = requestAnimationFrame(this.updateVideo);
        this.videoCtx.clearRect(0, 0, this.video.width, this.video.height);
        const positions = this.videoTracker.getCurrentPosition();
        if(positions) {
            this.videoTracker.draw(this.videoCanvas)
        }
        // console.log(positions)
    }

    updateImage() {
        this.requestImageId = requestAnimationFrame(this.updateImage);
        this.imageCtx.clearRect(0, 0, this.image.width, this.image.height);
        const positions = this.imageTracker.getCurrentPosition();
        if(positions) {
            this.imageTracker.draw(this.imageCanvas)
        }
        // console.log(positions)
    }
}