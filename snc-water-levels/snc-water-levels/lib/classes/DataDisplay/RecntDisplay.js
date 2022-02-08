var RecntDisplay = (function() {
	function RecntDisplay(gauge, container, max_range) {
		DataDisplay.call(this, gauge, container);
		this.date = new Date(0).nUTC(-5);
		this.max_range = max_range.nUTC(-5);
	}

	RecntDisplay.prototype = Object.create(DataDisplay.prototype);
	RecntDisplay.prototype.constructor = RecntDisplay;

	RecntDisplay.prototype.load = function(f) {
		DataDisplay.prototype.load.call(this, null, null);
	}

	RecntDisplay.prototype.createDisplay = function() {
		$(this.container).removeClass('mvc-red');
	}

	RecntDisplay.prototype.formatData = function(dat, tsName) {
		return dat[0];
	}
	RecntDisplay.prototype.appendData = function(dat, j) {
		if(j !== 0)
			return;
		if(dat === undefined)
			return;
		this.date = new Date(dat[0]);//store the most recent day
	}

	RecntDisplay.prototype.display = function() {
		$(this.container).removeClass('mvc-loading');
		if(((new Date()).nUTC(-5) - this.date.nUTC(-5)) - this.max_range <= 0)
			return;
		$(this.container).addClass('mvc-red');
	}

	return RecntDisplay;
})()