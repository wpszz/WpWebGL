/**
 * @author wp
 */
var WPCube = new function () {
    var verticesColors = new Float32Array([
        //front
        1.0, 1.0, 1.0, 0.0, 0.8, 0.0,
        -1.0, 1.0, 1.0, 0.0, 0.8, 0.0,
        -1.0, -1.0, 1.0, 0.0, 0.8, 0.0,
        1.0, -1.0, 1.0, 0.0, 0.8, 0.0,
        //back
        1.0, 1.0, -1.0, 0.6, 0.9, 0.0,
        -1.0, 1.0, -1.0, 0.6, 0.9, 0.0,
        -1.0, -1.0, -1.0, 0.6, 0.9, 0.0,
        1.0, -1.0, -1.0, 0.6, 0.9, 0.0,
        //up
        1.0, 1.0, -1.0, 1.0, 1.0, 0.0,
        -1.0, 1.0, -1.0, 1.0, 1.0, 0.0,
        -1.0, 1.0, 1.0, 1.0, 1.0, 0.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 0.0,
        //down
        1.0, -1.0, -1.0, 1.0, 0.5, 0.0,
        -1.0, -1.0, -1.0, 1.0, 0.5, 0.0,
        -1.0, -1.0, 1.0, 1.0, 0.5, 0.0,
        1.0, -1.0, 1.0, 1.0, 0.5, 0.0,
        //right
        1.0, 1.0, -1.0, 0.9, 0.0, 0.2,
        1.0, 1.0, 1.0, 0.9, 0.0, 0.2,
        1.0, -1.0, 1.0, 0.9, 0.0, 0.2,
        1.0, -1.0, -1.0, 0.9, 0.0, 0.2,
        //left
        -1.0, 1.0, -1.0, 0.6, 0.0, 0.6,
        -1.0, 1.0, 1.0, 0.6, 0.0, 0.6,
        -1.0, -1.0, 1.0, 0.6, 0.0, 0.6,
        -1.0, -1.0, -1.0, 0.6, 0.0, 0.6
    ]);

    var indices = new Uint8Array([
        0, 1, 2, 0, 2, 3,
        4, 6, 5, 4, 7, 6,
        8, 9, 10, 8, 10, 11,
        12, 14, 13, 12, 15, 14,
        16, 17, 18, 16, 18, 19,
        20, 22, 21, 20, 23, 22
    ]);

    var FSIZE = verticesColors.BYTES_PER_ELEMENT;

    var shader = null;
    var inited = false;
    var Init = function(gl){
        var vert = WPFileLoader.Load("./Shader/Color.vertex.fx");
        var frag = WPFileLoader.Load("./Shader/Color.fragment.fx");
        shader = WPShader.Create(gl, vert, frag);
    }

    this.Draw = function (gl, mvpMat) {
        if (!inited) {
            inited = true;
            Init(gl);
        }

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.useProgram(shader);

        var u_MvpMatrix = gl.getUniformLocation(shader, "u_MvpMatrix");
        gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMat);

        var vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

        var a_Position = gl.getAttribLocation(shader, "a_Position");
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
        gl.enableVertexAttribArray(a_Position);

        var a_Color = gl.getAttribLocation(shader, "a_Color");
        gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
        gl.enableVertexAttribArray(a_Color);

        var ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
    }
}