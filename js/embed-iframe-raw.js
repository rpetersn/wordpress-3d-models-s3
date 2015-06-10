// function to split up src values
function parseQueryString(queryString) {
    var params = {};
    if (queryString) {
        var keyValues = queryString.split('&');
        for (var i=0; i < keyValues.length; i++) {
            var pair = keyValues[i].split('=');
            params[pair[0]] = pair[1];
        }
    }
    return params;
}

// http://stackoverflow.com/questions/403967/how-may-i-reference-the-script-tag-that-loaded-the-currently-executing-script
// http://davidwalsh.name/script-tag

var scriptSource = document.currentScript || (function() {
    var scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1];
})();

// get the src
scriptSource = scriptSource.src;

// split up values from script src
var params = parseQueryString(scriptSource.split('?')[1]);

// find the wrapping div
var wp3diframewrap = document.getElementById(params.id);

// find the stock anchor tag
var divoriganchor = wp3diframewrap.getElementsByTagName("a")[0];

// get the iframe URL
var frameurl = divoriganchor.getAttribute("href"); 

// remove the anchor tag
wp3diframewrap.removeChild(divoriganchor); // remove the anchor

// generate some content
var wp3dmobilecss = "<style>#"+params.id+"{ position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } #"+params.id+" iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; margin: 0; }@media only screen and (max-width : 480px) { #"+params.id+" { padding-bottom: 85%;} }</style>";
var wp3diframe = '<iframe src="'+frameurl+'" frameborder="0" allowfullscreen="allowfullscreen"></iframe>';

// mash it all together
wp3diframewrap.innerHTML = wp3diframewrap.innerHTML + wp3diframe + wp3dmobilecss;