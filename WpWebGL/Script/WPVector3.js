/**
 * @author wp
 */

var WPVector3 = new function () {
    this.zero = function () { return [0, 0, 0]; }
    this.one = function () { return [1, 1, 1]; }
    this.forward = function () { return [0, 0, 1]; }
    this.right = function () { return [1, 0, 0]; }
    this.up = function () { return [0, 1, 0]; }

    this.New = function (x, y, z) {
        return [x, y, z];
    }

    this.Add = function (v1, v2) {
        return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
    }

    this.Sub = function (v1, v2) {
        return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
    }

    this.Mul = function (v1, v2) {
        return [v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2]];
    }

    this.Scale = function (v, s) {
        return [v[0] * s, v[1] * s, v[2] * s];
    }

    this.Dot = function (v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
    }

    this.Cross = function (v1, v2) {
        return [v1[1] * v2[2] - v1[2] * v2[1], v1[2] * v2[0] - v1[0] * v2[2], v1[0] * v2[1] - v1[1] * v2[0]];
    }

    this.Magnitude = function (v) {
        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    }

    this.Normalize = function (v) {
        var len = this.Magnitude(v);
        return (len > 0.00001) ? [v[0] / len, v[1] / len, v[2] / len] : this.zero();
    }

    this.ToString = function (v) {
        return v[0].toFixed(3) + "," + v[1].toFixed(3) + "," + v[2].toFixed(3);
    }
}
