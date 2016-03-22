var oMyFace = document.getElementById('my-face');
var rotateY = 360;
setTimeout(function () {
	oMyFace.style.left = '55%';
	oMyFace.style.transform = 'rotate(' + rotateY + 'deg)';
}, 500);
setTimeout(function () {
	rotateY -= 360;
	oMyFace.style.left = 0;
	oMyFace.style.transform = 'rotate(' + rotateY + 'deg)';
}, 1200);
// setTimeout(function () {
// 	oMyFace.style.transform = 'rotateY(' + rotateY + 'deg)';
// }, 500);
// oMyFace.onmouseover = function () {
// 	rotateY += 360;
// 	this.style.transform = 'rotateY(' + rotateY + 'deg)';
// };