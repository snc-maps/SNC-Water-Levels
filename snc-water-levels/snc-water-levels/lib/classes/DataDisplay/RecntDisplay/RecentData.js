var RecentData = (function() {
	function RecentData(gauge, container_1, container_2, max_range) {
		RecntDisplay.call(this, gauge, [container_1, container_2].join(','), max_range);
		this.station_popup = container_2;
		this.tooltips = {}
	}

	RecentData.prototype = Object.create(RecntDisplay.prototype);
	RecentData.prototype.constructor = RecentData;

	RecentData.prototype.createDisplay = function() {
		Tooltip.bind();
		RecntDisplay.prototype.createDisplay.call(this);
	}

	RecentData.prototype.formatData = function(dat, tsName) {
		if(-1 < tsName.indexOf('Historical'))
			return null;
		return RecntDisplay.prototype.formatData.call(this, dat, tsName);
	}

	RecentData.prototype.appendData = function(dat, i) {
		this.data[i] = "";
		RecntDisplay.prototype.appendData.call(this, dat, i)
		if(dat === null)
			return;
		var cols = this.gauge.getOrderedSeries();
		this.tooltips[cols[i]] = new Tooltip(this.gauge.getTimeSeries(cols[i]), false);

		this.data[i] = ("<span class=\"station-popup-data\">"
		 + cols[i] + ": " + (dat[1] !== null? dat[1] : "---") + " "
		 + this.tooltips[cols[i]]
		 + "</span>"
		 + "<br/>");
	}

	RecentData.prototype.display = function() {
		this.data.push("<br/><span class=\"station-popup-date\">" + this.date.nUTC(-5).dateStr().join('<br/>') + "</span>");
		$(this.container).find('.mvc-primary-data').prepend('<br/>' + this.data.join(''));
		$(this.container.split(',')[1]).data('target', $(this.container.split(',')[0]).data('target'));
		$(this.container.split(',')[1]).data('mvc-gauge', $(this.container.split(',')[0]).data('mvc-gauge'));
		$(this.container.split(',')[1]).data('toggle', $(this.container.split(',')[0]).data('toggle'));
		$(this.container.split(',')[1])[0].dataset['toggle'] = $(this.container.split(',')[1]).data('toggle');
		$(this.container.split(',')[1])[0].dataset['target'] = $(this.container.split(',')[1]).data('target');
		Tooltip.unbind();
		RecntDisplay.prototype.display.call(this);
		this.data = [];
	}

	return RecentData;
})()