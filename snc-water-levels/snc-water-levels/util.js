(function() {
	function addZero(val) {
		if(9 < val)
			return "" + val;
		return "0" + val;
	}
	function dayTotal(m, y) {
		if(m === 1)
			return (y % 4? 28:29);//return 28 (29 if year is divisible by 4 [leap year]) if month is February
		if([3, 5, 8, 10].indexOf(m)+1)
			return 30;//return 30 if month is one of April, June, September, or November
		return 31;//otherwise return 31
	}

	Date.dateStr = function(date) {
		if(date === undefined)
			return new Date().dateStr()
		return (new Date(date)).dateStr();
	}
	Date.prototype.dateStr = function() {
		var dateStr = this.getFullYear() + "-" + addZero(this.getMonth() + 1) + "-" + addZero(this.getDate());
		var timeStr = addZero(this.getHours()) + ":" + addZero(this.getMinutes()) + ":" + addZero(this.getSeconds());
		return [dateStr, timeStr];
	}

	Date.nYears = function(n) {
		return (new Date('1970/01/01 00:00:00')).nYears(n)//new Date((1970+n) + '/01/01 00:00:00');
	}
	Date.prototype.nYears = function(n) {
		return new Date(new Date(this.valueOf()).setFullYear(this.getFullYear() + n));
	}

	Date.nMonths = function(n) {
		return (new Date('1970/01/01 00:00:00')).nMonths(n)//new Date((1970+n) + '/01/01 00:00:00');
	}
	Date.prototype.nMonths = function(n) {
		return new Date(new Date(this.valueOf()).setMonth(this.getMonth() + n));
	}

	Date.nDays = function(n) {
		return (new Date('1970/01/01 00:00:00')).nDays(n);
	}
	Date.prototype.nDays = function(n) {
		return new Date(new Date(this.valueOf()).setDate(this.getDate() + n));
	}

	Date.nHours = function(n) {
		return (new Date('1970/01/01 00:00:00')).nHours(n);
	}
	Date.prototype.nHours = function(n) {
		return new Date(new Date(this.valueOf()).setHours(this.getHours() + n));
	}

	Date.nMinutes = function(n) {
		return (new Date('1970/01/01 00:00:00')).nMinutes(n);
	}
	Date.prototype.nMinutes = function(n) {
		return new Date(new Date(this.valueOf()).setMinutes(this.getMinutes() + n));
	}

	Date.nSeconds = function(n) {
		return (new Date('1970/01/01 00:00:00')).nSeconds(n);
	}
	Date.prototype.nSeconds = function(n) {
		return new Date(new Date(this.valueOf()).setSeconds(this.getSeconds() + n));
	}

	Date.prototype.nUTC = function(n) {
		if(!n)
			return new Date(this.valueOfGMT());
		return new Date(this.valueOfGMT()).nHours(Math.sign(n) * (((Math.abs(n)+12) % 24)-12));
	}
	Date.valueOfGMT = function() {
		return new Date().valueOfGMT();
	}
	Date.prototype.valueOfGMT = function() {
		return this.valueOf() + (this.getTimezoneOffset() * 60 * 1000);
	}

	Date.formatStr = function(date) {
		return (new Date(date)).formatStr();
	}
	Date.prototype.formatStr = function() {
		var year = this.getFullYear();
		var day = this.getDate();
		var month = ([
			"Jan",
			"Feb",
			"Mar",
			"Apr",//3
			"May",
			"Jun",//5
			"Jul",
			"Aug",
			"Sep",//8
			"Oct",
			"Nov",//10
			"Dec"
		][this.getMonth()]);

		return month + " " + day + ", " + year;
	}

	/**
	 * Replaces *ALL* instances of a given substring with a given string.  JavaScript should really provide this by default...
	**/
	String.prototype.replace_ = function(sub, str) {
		return this.split(sub).join(str);
	}


	function ie_sign(n) {
		if(n < 0)
			return -1;
		if(0 < n)
			return 1;
		return 0;
	}
	if(Math.sign === undefined)
		Math.sign = ie_sign;
})()