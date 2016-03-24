// Array.prototype.unique = function() {
// 	var newArr = [this[0]];
// 	label:
// 	for (var i in this) {
// 		for (var j in newArr) {
// 			if (this[i] === newArr[j]) {
// 				continue label;
// 			}
// 		}
// 		newArr.push(this[i]);
// 	}
// 	return newArr;
// };

// Array.prototype.unique = function() {
// 	var newArr = this.sort();
// 	var res = [newArr[0]];
// 	for (var i=1; i<newArr.length; i++) {
// 		if (newArr[i] !== res[res.length - 1]) {
// 			res.push(newArr[i]);
// 		}
// 	}
// 	return res;
// };

// Array.prototype.unique = function() {
// 	var res = [];
// 	var obj = {};
// 	for (var i=0; i<this.length ;i++) {
// 		if (!obj[this[i]]) {
// 			res.push(this[i]);
// 			obj[this[i]] = 1;
// 		}
// 	}
// 	return res;
// };

// Array.prototype.unique = function() {
// 	var obj = {};
// 	for (var i=0; i<this.length; i++) {
// 		if(obj[this[i]]) {
// 			this.splice(i, 1);
// 			i--;
// 		} else {
// 			obj[this[i]] = 1;
// 		}
// 	}
// 	return this;
// };
// var arr = [10, 1, 3, 9, '', '', 'a', 'a', 9, null, null, undefined];
// console.log(arr.unique());

// date = new Date();
// console.log(date.getFullYear() + '年还剩' + (date.getTime() - setTime(2016, 1, 1)));

function createComparisonFunction(propertyName) {
	return function(obj1, obj2) {
		var v1 = obj1[propertyName];
		var v2 = obj2[propertyName];
		if (v1 < v2) {
			return -1;
		} else if (v1 > v2) {
			return 1;
		} else {
			return 0;
		}
	};
}
var aObj = [{name: 'sh', age: 31}, {name: 'a', age: 1}, {name: 'cc', age: 20}];
console.log(aObj.sort(createComparisonFunction('age')));

Array.prototype.unique = function() {
	var o = {};
	for (var i=0; i<this.length; i++) {
		if (o[this[i]]) {
			this.splice(i, 1);
			i--;
		} else {
			o[this[i]] = 1;
		}
	}
	return this;
}


console.log([1, 1, 'a', 'b', 'a'].unique());

function factorial(num) {
	if (num <= 1) {
		return 1;
	} else {
		return num * factorial(num - 1);
	}
}

console.log(factorial(3));