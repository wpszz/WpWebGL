/**
 * @author wp
 */

var Time = new function(){
    this.frameCount = 0;
    this.deltaTime = 0;
    this.totalTime = 0;
    this.fps = 0;

    var fps_frame = 0;
    var fps_time = 0;
    var clock = new Clock();

    this.Update = function () {
        this.frameCount++;
        this.deltaTime = clock.getDelta();
        this.totalTime += this.deltaTime;
        fps_frame++;
        fps_time += this.deltaTime;
        if (fps_time >= 0.5) {
            this.fps = fps_frame / fps_time;
            fps_frame = 0;
            fps_time = 0;
        }
    }
}
