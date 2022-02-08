var Range = (function() {
	function Range(low, high, tsName) {
		this.tsName = tsName
		this.low = {
			name: low,
			data: null,
		};
		this.high = {
			name: high,
			data: null,
		};
	}

	Range.prototype.getName = function() {
		return this.tsName;
	}
	Range.prototype.getLow = function() {
		return this.low.name;
	}
	Range.prototype.getHigh = function() {
		return this.high.name;
	}

	Range.prototype.isLow = function(tsName) {
		return (this.low.name === tsName && this.low.data === null);
	}
	Range.prototype.isHigh = function(tsName) {
		return (this.high.name === tsName && this.high.data === null);
	}

	Range.prototype.addData = function(dat, tsName) {
		if(this.isLow(tsName))
			this.low.data = dat;
		if(this.isHigh(tsName))
			this.high.data = dat;
		return this;
	}
	Range.prototype.combineData = function() {
		if(this.low.data === null || this.high.data === null)
			return;
		var out = [];
		for(let i = 0; i < this.high.data.length; i++) {
			let timestamp = this.high.data[i][0];
			for(let j = 0; j < this.low.data.length; j++) {
				if(this.low.data[j][0] < timestamp)
					continue;
				if(timestamp < this.low.data[j][0])
					break;
				out.push([timestamp, this.low.data[j][1], this.high.data[i][1]]);
				break;
			}
		}

		return out;
	}

	Range.prototype.useData = function(dat, name, func) {
		var temp = this.addData(dat, name).combineData();
		if(!temp)
			return this;
		this.low.data = null;
		this.high.data = null;
		func(temp, this.tsName);
		return this;
	}

	Range.prototype.reset = function() {
		this.low.data = null;
		this.high.data = null;
		return this;
	}

	return Range
})()