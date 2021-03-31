/**
console-timestamp.js

The MIT License (MIT)

Copyright (c) 2014 Adam Paszke

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
**/

var fixDigits = function (input, length) {
	while (input.toString().length < length) {
		input = "0" + input;
	}
	return input;
};

module.exports = function (format, time) {
    var date = (time && typeof time == "number" && new Date(time)) || (time && typeof time.getTime == "function" && time) || new Date();
	var out = format || "hh:mm:ss";
	out = out.replace("hh", fixDigits(date.getHours(), 2), "g");
	out = out.replace("mm", fixDigits(date.getMinutes(), 2), "g");
	out = out.replace("ss", fixDigits(date.getSeconds(), 2), "g");
	out = out.replace("iii", fixDigits(date.getMilliseconds(), 3), "g");
	out = out.replace("YYYY", fixDigits(date.getFullYear(), 4), "g");
	out = out.replace("YY", date.getFullYear().toString().slice(-2), "g");
	out = out.replace("MM", fixDigits(date.getMonth()+1, 2), "g");
	out = out.replace("DD", fixDigits(date.getDate(), 2), "g");
	return out;
};



Object.defineProperty(String.prototype, 'timestamp', {
    get: function () {
        return module.exports(this);
    }
});
