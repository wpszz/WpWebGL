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

    this.Draw = function (sp) {
        var FSIZE = verticesColors.BYTES_PER_ELEMENT;

        var vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

        var a_Position = gl.getAttribLocation(sp, "a_Position");
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
        gl.enableVertexAttribArray(a_Position);

        var a_Color = gl.getAttribLocation(sp, "a_Color");
        gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
        gl.enableVertexAttribArray(a_Color);

        var ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
    }
}