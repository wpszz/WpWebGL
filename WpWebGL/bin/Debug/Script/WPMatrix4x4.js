/**
 * @author wp
 */

var WPMatrix4x4 = new function () {
    var ColumnMajor = false;

    this.Translate = function (x, y, z) {
        var mat = new Float32Array([
            1.0, 0.0, 0.0, x,
            0.0, 1.0, 0.0, y,
            0.0, 0.0, 1.0, z,
            0.0, 0.0, 0.0, 1.0
        ]);
        return ColumnMajor ? mat : this.Transpose(mat);
    }

    this.Scale = function (x, y, z) {
        return new Float32Array([
            x,   0.0, 0.0, 0.0,
            0.0, y,   0.0, 0.0,
            0.0, 0.0, z,   0.0,
            0.0, 0.0, 0.0, 1.0
        ]);
    }

    this.EulerRotation = function (x, y, z) {
        // order by ZXY axis: mul(rotateY(y), mul(rotateX(x), rotateZ(z)));
        x *= WPMath.Deg2Rad;
        y *= WPMath.Deg2Rad;
        z *= WPMath.Deg2Rad;
        var sx = Math.sin(x);
        var cx = Math.cos(x);
        var sy = Math.sin(y);
        var cy = Math.cos(y);
        var sz = Math.sin(z);
        var cz = Math.cos(z);
        var mat = new Float32Array([
            cy * cz + sx * sy * sz,     cz * sx * sy - cy * sz,     cx * sy,        0,
            cx * sz,                    cx * cz,                    -sx,            0,
            cy * sx * sz - cz * sy,     cy * cz * sx + sy * sz,     cx * cy,        0,
            0,                          0,                          0,              1
        ]);
        return ColumnMajor ? mat : this.Transpose(mat);
    }

    this.TRS = function (pos, angle, scale) {
        var matScale = this.Scale(scale[0], scale[1], scale[2]);
        var matTranslation = this.Translate(pos[0], pos[1], pos[2]);
        var matRotation = this.EulerRotation(angle[0], angle[1], angle[2]);
        return this.Mul(matTranslation, this.Mul(matRotation, matScale));
    }

    this.Transpose = function (m){
        return new Float32Array([
            m[0],      m[4],      m[8],      m[12],
            m[1],      m[5],      m[9],      m[13],
            m[2],      m[6],      m[10],     m[14],
            m[3],      m[7],      m[11],     m[15]
        ]);
    }

    this.Mul = function (lhs, rhs) {
        if (!ColumnMajor)
        {
            var tmp = lhs;
            lhs = rhs;
            rhs = tmp;
        }
        return new Float32Array([
            lhs[0] * rhs[0] + lhs[1] * rhs[4] + lhs[2] * rhs[8] + lhs[3] * rhs[12],
            lhs[0] * rhs[1] + lhs[1] * rhs[5] + lhs[2] * rhs[9] + lhs[3] * rhs[13],
            lhs[0] * rhs[2] + lhs[1] * rhs[6] + lhs[2] * rhs[10] + lhs[3] * rhs[14],
            lhs[0] * rhs[3] + lhs[1] * rhs[7] + lhs[2] * rhs[11] + lhs[3] * rhs[15],
            lhs[4] * rhs[0] + lhs[5] * rhs[4] + lhs[6] * rhs[8] + lhs[7] * rhs[12],
            lhs[4] * rhs[1] + lhs[5] * rhs[5] + lhs[6] * rhs[9] + lhs[7] * rhs[13],
            lhs[4] * rhs[2] + lhs[5] * rhs[6] + lhs[6] * rhs[10] + lhs[7] * rhs[14],
            lhs[4] * rhs[3] + lhs[5] * rhs[7] + lhs[6] * rhs[11] + lhs[7] * rhs[15],
            lhs[8] * rhs[0] + lhs[9] * rhs[4] + lhs[10] * rhs[8] + lhs[11] * rhs[12],
            lhs[8] * rhs[1] + lhs[9] * rhs[5] + lhs[10] * rhs[9] + lhs[11] * rhs[13],
            lhs[8] * rhs[2] + lhs[9] * rhs[6] + lhs[10] * rhs[10] + lhs[11] * rhs[14],
            lhs[8] * rhs[3] + lhs[9] * rhs[7] + lhs[10] * rhs[11] + lhs[11] * rhs[15],
            lhs[12] * rhs[0] + lhs[13] * rhs[4] + lhs[14] * rhs[8] + lhs[15] * rhs[12],
            lhs[12] * rhs[1] + lhs[13] * rhs[5] + lhs[14] * rhs[9] + lhs[15] * rhs[13],
            lhs[12] * rhs[2] + lhs[13] * rhs[6] + lhs[14] * rhs[10] + lhs[15] * rhs[14],
            lhs[12] * rhs[3] + lhs[13] * rhs[7] + lhs[14] * rhs[11] + lhs[15] * rhs[15]
        ]);
    }

    this.WorldToCameraMatrix = function (pos, lookAt, up) {
        // (TR)^-1 = (R^-1) * (T^-1)
        var forward = WPVector3.Normalize(WPVector3.Sub(pos, lookAt));    // negative Z-Axis in the world
        var right = WPVector3.Normalize(ColumnMajor ? WPVector3.Cross(forward, up) : WPVector3.Cross(up, forward));
        var up = ColumnMajor ? WPVector3.Cross(right, forward) : WPVector3.Cross(forward, right);
        var mat = new Float32Array([
            right[0],    right[1],    right[2],    -WPVector3.Dot(right, pos),
            up[0],       up[1],       up[2],       -WPVector3.Dot(up, pos),
            forward[0],  forward[1],  forward[2],  -WPVector3.Dot(forward, pos),
            0,          0,          0,          1
        ]);
        return ColumnMajor ? mat : this.Transpose(mat);
    }

    this.OrthographicProjectionMatrix = function(orthographicSize, aspect, nearClipPlane, farClipPlane) {
        var num1 = 2 / (orthographicSize * aspect);
        var num2 = 2 / orthographicSize;
        var num3 = -2 / (farClipPlane - nearClipPlane);
        var num4 = -(farClipPlane + nearClipPlane) / (farClipPlane - nearClipPlane);
        var mat = new Float32Array([
            num1,   0,      0,      0,
            0,      num2,   0,      0,
            0,      0,      num3,   num4,
            0,      0,      0,      1
        ]);
        return ColumnMajor ? mat : this.Transpose(mat);
    }

    this.PerspectiveProjectionMatrix = function(fieldOfView, aspect, nearClipPlane, farClipPlane) {
        var tanHalfFov = Math.tan(WPMath.Deg2Rad * fieldOfView * 0.5);
        var num1 = 1 / (aspect * tanHalfFov);
        var num2 = 1 / tanHalfFov;
        var num3 = -(farClipPlane + nearClipPlane) / (farClipPlane - nearClipPlane);
        var num4 = -(2 * farClipPlane * nearClipPlane) / (farClipPlane - nearClipPlane);
        var mat = new Float32Array([
            num1,   0,      0,      0,
            0,      num2,   0,      0,
            0,      0,      num3,   num4,
            0,      0,      -1,     0
        ]);
        return ColumnMajor ? mat : this.Transpose(mat);
    }

    this.ToString = function (m) {
        var str = ""
        for (var i = 0; i < 4; i++) {
            str += (m[i * 4].toFixed(3) + "," + m[i * 4 + 1].toFixed(3) + "," + m[i * 4 + 2].toFixed(3) + "," + m[i * 4 + 3].toFixed(3) + ",\n");
        }
        return str
    }
}
