Station = (function(){
	function Station(id, number){
		this.id      = id;
		this.number  = number;//number for ts_path

		this.series  = {};
		this.ranges  = {};
		this.links   = {};

		this.primary = "";
	}

	Station.prototype.getId = function(){
		return this.id;
	}

	/**
	 * This function gets the columns of the station in an order specified by the value's priority
	**/
	Station.prototype.getOrderedSeries = function(){
		var cols = [];
		var self = this;
		for(var ts in this.series)
			cols.push(ts);
		return cols.sort(function(a, b) {
			if(priority(self,b) < priority(self,a))
				return -1;
			if(priority(self,a) < priority(self,b))
				return 1;
			if(a < b)
				return -1;
			if(b < a)
				return 1;
			return 0;
		});
	}
	Station.prototype.getOrderedRanges = function(){
		var list = [];
		var self = this;
		for(var rng in this.ranges)
			list.push(rng);
		return list.sort(function(a, b) {
			if(priority(self,b) < priority(self,a))
				return -1;
			if(priority(self,a) < priority(self,b))
				return 1;
			if(a < b)
				return -1;
			if(b < a)
				return 1;
			return 0;
		});
	}
	/**
	 * This function returns a given column's priority.  Higher priority number means column is placed further
	 * to the left side of the table.
	 * 
	 * @param val	- tsName for the column to get the priority of
	 * 
	 * @return	- various integer values that depend on the given val parameter
	**/
	function priority(self,val, no_range){
		if(val === self.primary)
			return 9001;//IT'S OVER NINE THOUSAAAAAAAAAAAND!!!  (WHAT?!  NINE THOUSAND?!)
		switch(val) {
			case 'Flow':
			case 'Level':
			case 'Staff Level':
				return 30;
			case 'Historical Average':
			case 'Historical Maximum':
			case 'Historical Minimum':
			case 'Historical Range':
				return 20;
			case 'Precipitation':
				return 10;
			default:
				return -1;
		}
	}

	Station.prototype.getTimeSeries = function(name, sql){
		if(name === undefined)
			return this.getTimeSeries(this.primary, sql);
		if(this.links[this.series[name]] !== undefined)
			return this.links[this.series[name]].getTimeSeries(name, sql);
		if(sql)
			return this.getId();
		return this.series[name];
	}
	Station.prototype.getRange = function(name){
		return this.ranges[name];
	}

	/**
	 * 
	**/
	Station.prototype.addTs = function(ts, is_primary){
		if(this.series[ts.getName()] !== undefined)
			return this;//cannot have 2 timeseries under the same name at one station
		if(is_primary)
			this.primary = ts.getName();
		this.series[ts.getName()] = ts.setStation(this.number);
		return this;//for chaining operations
	}
	Station.prototype.addRng = function(range){
		if(this.getTimeSeries(range.getLow()) === undefined || this.getTimeSeries(range.getHigh()) === undefined) {
			console.error('ERROR: the given range *must* have a matching low *and* a matching high timeseries name.');
			return this;
		}
		if(this.ranges[range.getName()] !== undefined)
			return this;
		this.ranges[range.getName()] = range;
		return this;
	}

	/**
	 * 
	**/
	Station.prototype.link = function(station, name){
		if(this.series[name] !== undefined)
			return this;//cannot have 2 timeseries under the same name at one station
		if(this.links[station.getId()] === undefined)
			this.links[station.getId()] = station;//Only add the station to the links if it is not already there
		this.series[name] = station.getId();
		return this;//for chaining operations
	}

	/**
	 * 
	**/
	Station.prototype.toString = function(){
		var out = this.getId() + "\n";
		for(var str in this.series)
			out += "\t>" + this.getTimeSeries(str).toString() + "\n";
		return out;
	}

	return Station;
})()