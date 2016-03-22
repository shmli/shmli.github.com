function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
        window.location.href = "mobileHomePage.html";
    }
}
browserRedirect();

var oMyFace = document.getElementById('my-face');
var rotateY = 360;
// setTimeout(function () {
//  oMyFace.style.left = '55%';
//  oMyFace.style.transform = 'rotate(' + rotateY + 'deg)';
// }, 500);
// setTimeout(function () {
//  rotateY -= 360;
//  oMyFace.style.left = 0;
//  oMyFace.style.transform = 'rotate(' + rotateY + 'deg)';
// }, 1200);
setTimeout(function () {
    oMyFace.style.transform = 'rotateY(' + rotateY + 'deg)';
}, 500);
oMyFace.onmouseover = function () {
    rotateY += 360;
    this.style.transform = 'rotateY(' + rotateY + 'deg)';
};