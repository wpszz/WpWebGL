/**
 * @author wp
 */

var WPFileLoader = new function () {

    this.Load = function (filePath) {
        if (Editor) {
            var ret = window.external.EditorLoadFileText("Script/" + filePath);
            return ret;
        }
        else {
            var ret = "";
            var client = new XMLHttpRequest();
            client.open('GET', filePath, false);
            client.onreadystatechange = function() {
                ret = client.responseText;
            }
            client.send();
            return ret;
        }
    }
}