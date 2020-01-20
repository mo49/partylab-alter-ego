import FaceDeformationGUI from './facedeformationgui'

export default class {
  constructor(opts = {}) {
    this.vid = document.getElementById("videoel")
    this.vid_width = this.vid.width
    this.vid_height = this.vid.height
    this.overlay = document.getElementById("overlay")
    this.overlayCC = overlay.getContext("2d")
    this.startbutton = document.getElementById("startbutton")

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    window.URL =
      window.URL || window.webkitURL || window.msURL || window.mozURL;

    this.positions
    this.ctrack = new clm.tracker()
    this.fd = new faceDeformer()
    this.faceDeformationGUI = new FaceDeformationGUI({
      ctrack: this.ctrack,
      fd: this.fd,
    })

    this.gumSuccess = this.gumSuccess.bind(this)
    this.gumFail = this.gumFail.bind(this)
    this.enablestart = this.enablestart.bind(this)
    this.startVideo = this.startVideo.bind(this)
    this.drawLoop = this.drawLoop.bind(this)

    this.init()
  }

  init() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(this.gumSuccess)
        .catch(this.gumFail)
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true }, this.gumSuccess, this.gumFail);
    } else {
      this.insertAltImage()
      //insertAltVideo(this.vid)
      document.getElementById("gum").className = "hide"
      document.getElementById("nogum").className = "nohide"
      alert("Your browser does not seem to support getUserMedia, using a static image instead.")
    }
    this.vid.addEventListener("canplay", this.enablestart, false)

    // this.ctrack = new clm.tracker()
    this.ctrack.init(pModel)
    this.trackingStarted = false

    this.startbutton.addEventListener("click", this.startVideo, false);
  }

  enablestart() {
    this.startbutton.value = "start";
    this.startbutton.disabled = null;
  }

  insertAltVideo(video) {
    if (this.supports_video()) {
      if (this.supports_webm_video()) {
        video.src = "./media/franck.webm";
      } else if (this.supports_h264_baseline_video()) {
        video.src = "./media/franck.mp4";
      } else {
        return false;
      }
      this.fd.init(document.getElementById("webgl"));
      return true;
    } else return false;
  }

  insertAltImage() {
    const canvas = document.getElementById("canvasel");
    const cc = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      cc.drawImage(img, 0, 0, this.vid_width, this.vid_height);
    };
    img.src = "./media/franck_02221.jpg";
    this.vid.className = "hide";
    this.vid = canvas;
    canvas.className = "nohide";

    this.startbutton.onclick = () => {
      this.ctrack.start(this.vid);
      this.drawLoop();
    };
    this.startbutton.value = "start";
    this.startbutton.disabled = null;
  }

  adjustVideoProportions() {
    const proportion = this.vid.videoWidth / this.vid.videoHeight;
    this.vid_width = Math.round(this.vid_height * proportion);
    this.vid.width = this.vid_width;
    overlay.width = this.vid_width;
  }

  gumSuccess(stream) {
    // add camera stream if getUserMedia succeeded
    if ("srcObject" in this.vid) {
      this.vid.srcObject = stream;
    } else {
      this.vid.src = window.URL && window.URL.createObjectURL(stream);
    }
    this.vid.onloadedmetadata = () => {
      this.adjustVideoProportions();
      this.fd.init(document.getElementById("webgl"));
      this.vid.play();
    };
    this.vid.onresize = () => {
      this.adjustVideoProportions();
      this.fd.init(document.getElementById("webgl"));
      if (this.trackingStarted) {
        this.ctrack.stop();
        this.ctrack.reset();
        this.ctrack.start(this.vid);
      }
    };
  }

  gumFail() {
    // fall back to video if getUserMedia failed
    this.insertAltVideo(vid);
    document.getElementById("gum").className = "hide";
    document.getElementById("nogum").className = "nohide";
    alert("There was some problem trying to fetch video from your webcam, using a static image instead.");
  }

  startVideo() {
    this.vid.play();
    this.ctrack.start(this.vid);
    this.trackingStarted = true;
    this.drawLoop();
  }

  drawLoop() {
    // track in video
    this.positions = this.ctrack.getCurrentPosition();
    this.overlayCC.clearRect(0, 0, this.vid_width, this.vid_height);
    if (this.positions) {
      this.ctrack.draw(this.overlay);
    }

    // hide buttons
    var elem = document.getElementById("buttons");
    elem.setAttribute("class", "hide");
    // show message
    var scoreel = document.getElementById("score");
    scoreel.innerHTML = "正面を向いてください";

    var pn = this.ctrack.getConvergence();
    if (pn < 1.8) {
      console.log(this.faceDeformationGUI)
      requestAnimFrame(this.faceDeformationGUI.setupFaceDeformation);
      scoreel.innerHTML = "";
      if (this.vid.tagName == "VIDEO") {
        this.vid.pause();
      }
    } else {
      requestAnimFrame(this.drawLoop);
    }
  }

}
