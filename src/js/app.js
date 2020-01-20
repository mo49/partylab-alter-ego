import Config from './data/config';
import Detector from './utils/detector';
import Main from './app/main';
import Webcam from './app/webcam';
import FaceTracker from './app/facetracker';
import Face from './app/face';
import DetectFace from './app/detectface';

// Styles
import './../css/app.scss';

// Check environment and set the Config helper
if(__ENV__ === 'dev') {
  console.log('----- RUNNING IN DEV ENVIRONMENT! -----');

  Config.isDev = true;
}

function init() {
  // Check for webGL capabilities
  if(!Detector.webgl) {
    Detector.addGetWebGLMessage();
  } else {
    new DetectFace()

    // const container = document.getElementById('appContainer');

    // const facetracker = new FaceTracker()
    // const webcam = new Webcam()

    // webcam.on('start_video', () => {
    //   facetracker.startVideo()
    // })

    // webcam.on('take_photo', (canvas) => {
    //   console.log('take photo')
    //   facetracker.startImage()

    //   facetracker.on('tracked', () => {
    //     console.log('tracked')

    //     const main = new Main(container);
    //   })
    // })
  }
}
init();
