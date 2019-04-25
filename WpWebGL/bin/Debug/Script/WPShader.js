/**
 * @author wp
 */

var WPShader = new function () {

    this.Create = function (gl, vert, frag) {
        var vs = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vs, vert);
        gl.compileShader(vs);
        if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(vs));
        }
        var fs = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fs, frag);
        gl.compileShader(fs);
        if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(fs));
        }
        var sp = gl.createProgram();
        gl.attachShader(sp, vs);
        gl.attachShader(sp, fs);
        gl.linkProgram(sp);
        if (!gl.getProgramParameter(sp, gl.LINK_STATUS)) {
            alert(gl.getProgramInfoLog(sp));
        }
        return sp;
    }
}