export default class FaceDeformationGUI {
  constructor(opts = {}) {
    this.ctrack = opts.ctrack || new clm.tracker()
    this.fd = opts.fd || new faceDeformer()

    this.wrapper = document.getElementsByClassName("wrapper")[0]
    this.vid = document.getElementById("videoel")
    this.vid_width = this.vid.width
    this.vid_height = this.vid.height
    this.overlay = document.getElementById("overlay")
    this.overlayCC = overlay.getContext("2d")
    this.webgl = document.getElementById('webgl')
    this.reverseEmotionBg = document.getElementById('reverse-emotion')

    this.animationButton = document.getElementById("animationButton")
    this.resetButton = document.getElementById("resetButton")

    this.ph = new this.parameterHolder()
    this.gui = new dat.GUI()
    this.rotation = 0
    this.scale = 3
    this.faceHalfWidth = 180
    this.faceHalfHeight = 200
    this.xOffset = this.webgl.width / 2 - this.faceHalfWidth
    this.yOffset = this.webgl.height / 2 - this.faceHalfHeight

    this.count = 0

    this.emotion = "default"
    this.presets = {
      "default" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "angry" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "disgusted" : [-4, -14, 8, 2, 3, -5.6, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -10, 0, -5],
      "fear" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "sad" : [0, 0, 0, 0, 0, 0, 0, 0, 20, -20, -5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "surprised" : [0, 0, -20, 5, 0, 0, 0, 0, -5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, -5],
      "happy" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "calm" : [0, 0, 0, 0, 0, 0, 0, 0, 0, -10, -10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }

    this.setupFaceDeformation = this.setupFaceDeformation.bind(this)
    this.switchDeformedFace = this.switchDeformedFace.bind(this)
    this.drawDeformedFace = this.drawDeformedFace.bind(this)
    this.loop = this.loop.bind(this)
  }

  setupFaceDeformation() {
    // draw face deformation model
    this.positions = this.ctrack.getCurrentPosition();
    this.overlayCC.clearRect(0, 0, this.vid_width, this.vid_height);
    this.ctrack.draw(this.overlay);
    this.fd.load(this.vid, this.positions, pModel);
    this.fd.draw(this.positions);

    this.wrapper.setAttribute('data-is-start', true)

    // show button
    this.animationButton.setAttribute("class", "nohide")
    this.resetButton.setAttribute("class", "nohide")

    // hide video
    var elem = document.getElementById("video-container");
    // elem.setAttribute("class", "hide");

    // show facial deformation element
    elem = document.getElementById("webgl-container");
    elem.setAttribute("class", "nohide");
    // hide message element
    document.getElementById("score").setAttribute("class", "hide");

    // set up controls
    // ph = new parameterHolder();
    // gui = new dat.GUI();
    const guiSelect = this.gui.add(this.ph, "presets", this.presets);
    const gui1 = this.gui.add(this.ph, "param1", -50, 50).listen();
    const gui2 = this.gui.add(this.ph, "param2", -20, 20).listen();
    const gui3 = this.gui.add(this.ph, "param3", -20, 20).listen();
    const gui4 = this.gui.add(this.ph, "param4", -20, 20).listen();
    const gui5 = this.gui.add(this.ph, "param5", -20, 20).listen();
    const gui6 = this.gui.add(this.ph, "param6", -20, 20).listen();
    const gui7 = this.gui.add(this.ph, "param7", -20, 20).listen();
    const gui8 = this.gui.add(this.ph, "param8", -20, 20).listen();
    const gui9 = this.gui.add(this.ph, "param9", -20, 20).listen();
    const gui10 = this.gui.add(this.ph, "param10", -20, 20).listen();
    const gui11 = this.gui.add(this.ph, "param11", -20, 20).listen();
    const gui12 = this.gui.add(this.ph, "param12", -20, 20).listen();
    const gui13 = this.gui.add(this.ph, "param13", -20, 20).listen();
    const gui14 = this.gui.add(this.ph, "param14", -20, 20).listen();
    const gui15 = this.gui.add(this.ph, "param15", -20, 20).listen();
    const gui16 = this.gui.add(this.ph, "param16", -20, 20).listen();
    const gui17 = this.gui.add(this.ph, "param17", -20, 20).listen();
    const gui18 = this.gui.add(this.ph, "param18", -20, 20).listen();
    const gui19 = this.gui.add(this.ph, "param19", -20, 20).listen();
    const gui20 = this.gui.add(this.ph, "param20", -20, 20).listen();
    const guiGrid = this.gui.add(this.ph, "draw_grid", false);
    const guiFace = this.gui.add(this.ph, "draw_face", true);

    gui1.onChange(this.drawDeformedFace);
    gui2.onChange(this.drawDeformedFace);
    gui3.onChange(this.drawDeformedFace);
    gui4.onChange(this.drawDeformedFace);
    gui5.onChange(this.drawDeformedFace);
    gui6.onChange(this.drawDeformedFace);
    gui7.onChange(this.drawDeformedFace);
    gui8.onChange(this.drawDeformedFace);
    gui9.onChange(this.drawDeformedFace);
    gui10.onChange(this.drawDeformedFace);
    gui11.onChange(this.drawDeformedFace);
    gui12.onChange(this.drawDeformedFace);
    gui13.onChange(this.drawDeformedFace);
    gui14.onChange(this.drawDeformedFace);
    gui15.onChange(this.drawDeformedFace);
    gui16.onChange(this.drawDeformedFace);
    gui17.onChange(this.drawDeformedFace);
    gui18.onChange(this.drawDeformedFace);
    gui19.onChange(this.drawDeformedFace);
    gui20.onChange(this.drawDeformedFace);
    guiSelect.onChange(this.switchDeformedFace);
    guiGrid.onChange(this.drawDeformedFace);
    guiFace.onChange(this.drawDeformedFace);

    this.drawDeformedFace();
  }

  drawDeformedFace() {
    // draw model
    var parameters = this.ctrack.getCurrentParameters();
    parameters[0] = this.scale*Math.cos(this.rotation)-1;
    parameters[1] = this.scale*Math.sin(this.rotation);
    parameters[2] = this.xOffset;
    parameters[3] = this.yOffset;
    parameters[0+4] = this.ph.param1;
    parameters[1+4] = this.ph.param2;
    parameters[2+4] = this.ph.param3;
    parameters[3+4] = this.ph.param4;
    parameters[4+4] = this.ph.param5;
    parameters[5+4] = this.ph.param6;
    parameters[6+4] = this.ph.param7;
    parameters[7+4] = this.ph.param8;
    parameters[8+4] = this.ph.param9;
    parameters[9+4] = this.ph.param10;
    parameters[10+4] = this.ph.param11;
    parameters[11+4] = this.ph.param12;
    parameters[12+4] = this.ph.param13;
    parameters[13+4] = this.ph.param14;
    parameters[14+4] = this.ph.param15;
    parameters[15+4] = this.ph.param16;
    parameters[16+4] = this.ph.param17;
    parameters[17+4] = this.ph.param18;
    parameters[18+4] = this.ph.param19;
    parameters[19+4] = this.ph.param20;
    this.positions = this.fd.calculatePositions(parameters, true);
    this.fd.clear();
    if (this.ph.draw_face) this.fd.draw(this.positions);
    if (this.ph.draw_grid) this.fd.drawGrid(this.positions);
  }

  switchDeformedFace() {
    // draw model
    var parameters = this.ctrack.getCurrentParameters();
    parameters[0] = this.scale*Math.cos(this.rotation)-1;
    parameters[1] = this.scale*Math.sin(this.rotation);
    parameters[2] = this.xOffset;
    parameters[3] = this.yOffset;
    var split = this.ph.presets.split(",");
    parameters[0+4] = this.ph.param1 = parseInt(split[0],10);
    parameters[1+4] = this.ph.param2 = parseInt(split[1],10);
    parameters[2+4] = this.ph.param3 = parseInt(split[2],10);
    parameters[3+4] = this.ph.param4 = parseInt(split[3],10);
    parameters[4+4] = this.ph.param5 = parseInt(split[4],10);
    parameters[5+4] = this.ph.param6 = parseInt(split[5],10);
    parameters[6+4] = this.ph.param7 = parseInt(split[6],10);
    parameters[7+4] = this.ph.param8 = parseInt(split[7],10);
    parameters[8+4] = this.ph.param9 = parseInt(split[8],10);
    parameters[9+4] = this.ph.param10 = parseInt(split[9],10);
    parameters[10+4] = this.ph.param11 = parseInt(split[10],10);
    parameters[11+4] = this.ph.param12 = parseInt(split[11],10);
    parameters[12+4] = this.ph.param13 = parseInt(split[12],10);
    parameters[13+4] = this.ph.param14 = parseInt(split[13],10);
    parameters[14+4] = this.ph.param15 = parseInt(split[14],10);
    parameters[15+4] = this.ph.param16 = parseInt(split[15],10);
    parameters[16+4] = this.ph.param17 = parseInt(split[16],10);
    parameters[17+4] = this.ph.param18 = parseInt(split[17],10);
    parameters[18+4] = this.ph.param19 = parseInt(split[18],10);
    parameters[19+4] = this.ph.param20 = parseInt(split[19],10);
    this.positions = this.fd.calculatePositions(parameters, true);
    if (this.ph.draw_face) this.fd.draw(this.positions);
    if (this.ph.draw_grid) this.fd.drawGrid(this.positions);
  }

  parameterHolder() {
    this.param1 = 0.0001;
    this.param2 = 0.0001;
    this.param3 = 0.0001;
    this.param4 = 0.0001;
    this.param5 = 0.0001;
    this.param6 = 0.0001;
    this.param7 = 0.0001;
    this.param8 = 0.0001;
    this.param9 = 0.0001;
    this.param10 = 0.0001;
    this.param11 = 0.0001;
    this.param12 = 0.0001;
    this.param13 = 0.0001;
    this.param14 = 0.0001;
    this.param15 = 0.0001;
    this.param16 = 0.0001;
    this.param17 = 0.0001;
    this.param18 = 0.0001;
    this.param19 = 0.0001;
    this.param20 = 0.0001;
    this.presets = 0;
    this.draw_face = true;
    this.draw_grid = false;
  }

  changeEmotion(emotion) {
    if(this.emotion === this.reverseEmotion(emotion)) return
    this.emotion = this.reverseEmotion(emotion)
    this.reverseEmotionBg.textContent = this.emotion
    // console.log('反対の感情', this.emotion)
    this.ph.presets = this.presets[this.emotion].join()
    this.switchDeformedFace()
  }

  reverseEmotion(emotion) {
    let emo
    switch (emotion) {
      case 'default': emo = 'surprised'; break;
      case 'surprised': emo = 'default'; break;
      case 'happy': emo = 'sad'; break;
      case 'sad': emo = 'happy'; break;
      case 'angry': emo = 'calm'; break;
      case 'disgusted': emo = 'calm'; break;
      case 'fear': emo = 'calm'; break;
    }
    return emo
  }

  loop() {
    if(this.count%5==0){
      this.ph.param3 = this.emotion === 'surprised' ? -Math.abs(Math.random()*20) : Math.random()*20
    }
    if(this.count%100==0){
      this.ph.param1 = Math.random()*20-10
      this.ph.param2 = Math.random()*40-20
    }
    let c = this.count*0.005
    this.countX = c*2
    this.countY = c*4
    this.rotation = Math.cos(c*5) * 0.2
    this.scale = Math.abs(Math.cos(c) * 2)+2
    this.xOffset = Math.cos(this.countX) * this.webgl.width/3 + (this.webgl.width/2 - this.faceHalfWidth)
    this.yOffset = Math.sin(this.countY) * this.webgl.height/3 + (this.webgl.height/2 - this.faceHalfHeight)
    this.drawDeformedFace()

    this.count++
  }

}
