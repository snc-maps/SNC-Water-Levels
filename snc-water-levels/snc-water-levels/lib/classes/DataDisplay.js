var DataDisplay = (function(){
	var today = (new Date()).dateStr()[0];
	var first = Date.dateStr('1900/01/01 00:00:00')[0];

	function DataDisplay(gauge, container){
		this.data = [];
		this.gauge = gauge;
		this.container = container;
		this.finished = finished;
		this.numData = 0;

		this.loadFromKiWIS = loadFromKiWIS;
		this.loadFromSql = loadFromSql;
	}

	/**
	 * This function loads data for a timeseries from KiWIS
	 * 
	 * @param url		- id of the timeseries to be retrieved
	 * @param start		- start date of the data to be retrieved
	 * @param end		- end date of the data to be retrieved
	 * @param format	- data format (really only intended to be "json" at this time)
	 * @param func		- callback function to execute after data is successfully retrieved
	 * @param err		- callback function to execute upon failed response; defaults to an empty function
	 * 
	 * @return	- the result of calling loadFromKiWIS with the value of first instead of start if start is null or
	 * 			 undefined
	 * @return	- the result of calling loadFromKiWIS with the value of today instead of end if end is null or 
	 * 			undefined
	 * @return	- the result of calling loadFromKiWIS with end and start switched if start is larger than end
	**/
	function loadFromKiWIS(tsName, start, end, format, func, err) {
		if(err === undefined)
			err = function() {};
		if(end < start)
			return this.loadFromKiWIS(tsName, end, start, format, func, err);

		/* 
		 * These 2 variables are combined with the timeseries id to form the KiWIS URL from which data is retrieved
		 */
		var prefix = "https://waterdata.quinteconservation.ca/KiWIS/KiWIS?service=kisters&type=queryServices&request=getTimeseriesValues&datasource=0&format=" + format;
		var suffix = "&header=true&metadata=true&md_returnfields=station_name,parametertype_name&dateformat=UNIX";
		if(start !== null)
			suffix += "&from=" + start;
		if(end !== null)
			suffix += "&to=" + end;

		this.numData++;//Keep track of how many times makeDataByYear is called in order to properly show/hide 'loading...' text
		console.log(this.getId(tsName, start, end));
		$.ajax({
			dataType: (format === 'csv'? "text" : format),
			url: prefix + this.getId(tsName, start, end) + suffix,
			success: $.proxy(function(res) {
				this.numData--;//reduce numData now that the request has returned
				$.proxy(func, this)(res);
				try {
					if(footerPos !== undefined)
						footerPos();//reposition the footer once the request has finished
				} catch(ex) {}
			}, this),
			error: $.proxy(function(res) {
				this.numData--;//reduce numData so as to not cause problems
				err(res, func);
			}, this)
		});
	}
	/**
	 * This function returns a function that loads data from the SQL database given an error response and callback
	 *  function
	 * 
	 * @param tsId		- id of the timeseries to be retrieved
	 * @param tsName	- name of the measurement to be retrieved
	 * @param start		- start date of the data to be retrieved
	 * @param end		- end date of the data to be retrieved
	 * @param format	- data format (really only intended to be "json" at this time)
	 * 
	 * @return	- the result of calling loadFromSql with the value of first instead of start if start is null or 
	 * 			undefined
	 * @return	- the result of calling loadFromSql with the value of today instead of end if end is null or 
	 * 			undefined
	 * @return	- the result of calling loadFromSql with end and start switched if start is larger than end
	 * @return	- a function that retrieves data from the SQL database
	**/
	function loadFromSql(tsId, tsName, start, end, format) {
		if(end < start)
			return loadFromSql(tsId, tsName, end, start, format);

		/**
		 * This function loads data from the SQL database, in much the same way that loadFromKiWIS gets data from 
		 * KiWIS.  Due to function closures, this function only needs to take 2 parameters, as all of the others 
		 * can be accessed from loadFromSql through function closures.  This function is intended as an "err" 
		 * parameter for loadFromKiWIS.
		 * 
		 * @param err	- The failed response from KiWIS
		 * @param func	- The function to execute upon a successful response
		**/
		return $.proxy(function(err, func) {
			var url = "sql-data/?ts_id=" + tsId + "&col=" + tsName;
			if(start !== null)
				url += "&from=" + start;
			if(end !== null)
				url += "&to=" + end;

			$('#alert-msg').removeClass('disabled');//alert the user that the displayed data is from the sql database and may not be the most recent data

			this.numData++;
			$.ajax({
				dataType: (format === 'csv'? "text" : format),
				url: url,
				success: $.proxy(function(res) {
					/* 
					 * format the response to be in the same format as the response given by KiWIS
					 */
					var response = [
						{
							"data": []
						}
					];
					for(var i = 0; res.Date !== null && i < res.Date.length; i++) {
						if(res.Time[i][0] === " ")
							res.Time[i] = res.Time[i].substr(1)
						if(0 <= res.Time[i].indexOf('AM') || 0 <= res.Time[i].indexOf('PM')) {
							if(res.Time[i].indexOf(' AM') < 0 && res.Time[i].indexOf(' PM') < 0) {
								res.Time[i] = res.Time[i].replace('AM', ' AM')
								res.Time[i] = res.Time[i].replace('PM', ' PM')
							}
							if(parseInt(res.Time[i].substr(0,2)) < 1)
								res.Time[i] = '12' + res.Time[i].substr(2);
							if(12 < parseInt(res.Time[i].substr(0,2)))
								res.Time[i] = (parseInt(res.Time[i].substr(0,2)) - 12) + res.Time[i].substr(2);
						}
						timestamp = new Date(res.Date[i].replace_('-', '/') + " " + res.Time[i]);
						if(timestamp.getHours() !== timestamp.nUTC(-5).getHours())
							timestamp = timestamp.nHours(timestamp.getHours() - timestamp.nUTC(-5).getHours())
						response[0].data.push([timestamp.valueOf(), res.Data[i]]);
					}
					this.numData--;
					$.proxy(func, this)(response);
					try {
						if(undefined !== footerPos)
							footerPos();
					} catch(ex) {}
				}, this),
				error: $.proxy(function(res) {
					this.numData--;
				}, this)
			});
		}, this);
	}

	function finished() {
		if(this.numData < 0)
			this.numData = 0;//Just in case this ever happens
		return !(0 < this.numData)
	}

	DataDisplay.prototype.load = function(start, end){
		if(!(this.finished()))
			return console.error('Previous request not completed');
		if(end === "")
			end = today;
		if(start === "")
			start = Date.dateStr((new Date(end.replace_('-', '/') + ' 00:00:00')).nMonths(-3))[0];
		var params = this.gauge.getOrderedSeries();

		var data = [];
		for(var i = 0; i < params.length; i++)
			data[i] = null;

		this.createDisplay();

		for(var i = 0; i < params.length; i++) {
			$.proxy(function(tsName, i) {
				this.loadFromKiWIS(tsName, start, end, 'json', $.proxy(function(response) {
					data[i] = this.formatData(response[0].data, tsName);

					if(!(this.finished()))
						return;//stop here until all responses are received
					for(var j = 0; j < data.length; j++)
						this.appendData(data[j], j)
					this.display();
				}, this), this.loadFromSql(this.gauge.getTimeSeries(tsName, true), tsName, start, end, 'json'));
			}, this)(params[i], i);
		}
	}
	DataDisplay.prototype.reload = function(start, end){
		var params = this.gauge.getOrderedSeries();//get the column list for the tsNames

		this.displayLoad();

		for(let i = 0; i < params.length; i++) {
			$.proxy(function(tsName, i) {
				this.loadFromKiWIS(tsName, start, end, 'json', function(response) {
					this.refresh(response[0].data, tsName);

					if(!this.finished())
						return;//stop here if this is not the last response
					this.display(true);
				}, this.loadFromSql(this.gauge.getTimeSeries(tsName, true), tsName, start, end, 'json'));
			}, this)(params[i], i);
		}
	}
	DataDisplay.prototype.getId = function(tsName, start, end){
		return this.gauge.getTimeSeries(tsName).getTsId(start, end);
	}

	DataDisplay.prototype.createDisplay = function() {}
	DataDisplay.prototype.formatData = function(dat, tsName){
		return dat;
	}
	DataDisplay.prototype.appendData = function(dat, i) {}

	DataDisplay.prototype.displayLoad = function() {}
	DataDisplay.prototype.refresh = function(is_reload) {}

	DataDisplay.prototype.display = function(is_reload) {}

	return DataDisplay;
})()