TimeSeries = (function(){
	function TimeSeries(name, units, parameter, type){
		this.name = name;
		this.units = units;

		this.sta = null;
		this.param = parameter;
		this.type = type

		this.src = "Cmd.P-102.";

		this.auto = true;
 
		this.hourly = undefined;
		this.daily = undefined;
		this.weekly = undefined;
		this.monthly = undefined;
		this.yearly = undefined;

		this.domain = undefined
	}

	TimeSeries.prototype.getName = function(){
		return this.name;
	}
	TimeSeries.prototype.getUnits = function(){
		return this.units;
	}
	TimeSeries.prototype.getTooltip = function(){
		switch(this.getUnits()) {
			case 'cms':
			case 'm\xB3/s':
				return "cubic meters per second";
			case 'MASL':
			case 'm':
				return "Meters Above Sea Level";
			case 'mm':
				return "millimeters";
			default:
				return "1.5 metric units of 'someone screwed this up'"//This should not ever be returned; if it is returned, someone used an invalid unit
		}
	}

	TimeSeries.prototype.setStation = function(sta_no){
		this.sta = sta_no;
		return this;
	}
	TimeSeries.prototype.setSource = function(src="Cmd.P-102."){
		this.src = src;
		if(this.src === undefined || this.src === null){
			var temp = ["hourly", "daily", "weekly", "monthly", "yearly"]
			for(var i = 0; i < temp.length; i++){
				this.src = pathify(this, temp[i])
				if(this.src === undefined || this.src === null)
					continue
				break
			}
		}
		return this;
	}
	TimeSeries.prototype.setStaff = function(val=false){
		this.auto = !val;
		return this;
	}
	TimeSeries.prototype.setHourly = function(val=true){
		this.hourly = val;
		return this;
	}
	TimeSeries.prototype.setDaily = function(val=true){
		this.daily = val;
		return this;
	}
	TimeSeries.prototype.setWeekly = function(val=true){
		this.weekly = val;
		return this;
	}
	TimeSeries.prototype.setMonthly = function(val=true){
		this.monthly = val;
		return this;
	}
	TimeSeries.prototype.setYearly = function(val=true){
		this.yearly = val;
		return this;
	}
	TimeSeries.prototype.setDomain = function(id="Cmd.P-290."){
		this.domain = id;
		return this;
	}

	function pathify(self,period){
		function helper(period){
			switch(period){
				case "yearly":
					if(self.yearly !== undefined)
						return self.yearly;
				case "monthly":
					if(self.monthly !== undefined)
						return self.monthly;
				case "weekly":
					if(self.weekly !== undefined)
						return self.weekly;
				case "daily":
					if(self.daily !== undefined)
						return self.daily;
				case "hourly":
					if(self.hourly !== undefined)
						return self.hourly;
				case "source":
					return self.src;
				case "domain":
					if(self.domain === undefined)
						return helper('yearly');//pathify(self, 'yearly');
					return self.domain;
			}
		}
		var out = helper(period);
		console.log(out);
		if(isNaN(Number(out))){
			return "&ts_path=*/" + self.sta + "/" + self.param + "/" + out;
		}
		return "&ts_id=" + out;
	}
	/**
	 * This function returns the appropriate timeseries id based on the start and end dates
	 * 
	 * @param start	: date value for the start of the date range
	 * @param end	: date value for the end of the date range
	 * 
	 * @return yearly, if the range is at least 62 years long
	 * @return monthly, if the range is at least 26 years long
	 * @return weekly, if the range is at least 6 years long
	 * @return daily, if the range is at least 2 years long
	 * @return hourly, if the range is at least 2 days long
	 * @return the full timeseries id, if the range is less than 2 days long or no range is provided
	**/
	TimeSeries.prototype.getTsId = function(start, end){
		const day_02 = new Date('1970/01/03');//UNIX time value for  2  days
		const day_07 = new Date('1970/01/08');//UNIX time value for  7  days
		const year02 = new Date('1972/01/01');//UNIX time value for  2 years
		const year06 = new Date('1976/01/01');//UNIX time value for  6 years
		const year26 = new Date('1996/01/01');//UNIX time value for 26 years
		const year62 = new Date('2032/01/01');//UNIX time value for 62 years

		if(start === "domain" && end === undefined)
			return pathify(this, 'domain');
		if((start === undefined || end === undefined) && this.src !== null)
			return pathify(this, 'source');

		var diff = (new Date(end)) - (new Date(start));//difference b/w 2 dates
		if(0 <= (diff - year62))
			return pathify(this, 'yearly');
		if(0 <= (diff - year26))
			return pathify(this, 'monthly');
		if(0 <= (diff - year06))
			return pathify(this, 'weekly');
		if(0 <= (diff - year02))
			return pathify(this, 'daily');
		if(0 <= (diff - day_02))
			return pathify(this, 'hourly');
		return pathify(this, 'source');
	}

	TimeSeries.prototype.toString = function(){
		return this.getName() + " (" + this.getUnits() + ")";
	}

	return TimeSeries;
})()