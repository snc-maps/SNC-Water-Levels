var GraphDisplay = (function(){
	var today = (new Date()).dateStr()[0];
	var first = Date.dateStr('1900/01/01 00:00:00')[0];

	var tempDat = null;

	function GraphDisplay(gauge, container){
		DataDisplay.call(this, gauge, container);
		this.chart = null;
		this.selectRange = selectRange;
		this.start = undefined;
		this.end = undefined;
		this.loaded = false;
	}

	GraphDisplay.prototype = Object.create(DataDisplay.prototype);
	GraphDisplay.prototype.constructor = GraphDisplay;

	function selectRange(event) {
		$('input.highcharts-range-selector').datepicker('hide');
		this.start = event.userMin;
		this.end = event.userMax;
		//console.log(event)
		this.reload(Date.dateStr(this.start)[0], Date.dateStr(this.end)[0]);//update the chart data
	}

	GraphDisplay.prototype.load = function(start,end){
		if(end === "")
			end = today;
		if(start === "")
			start = Date.dateStr((new Date(end.replace_('-', '/') + ' 00:00:00')).nMonths(-3))[0];
		this.loaded = false;
		this.start = start.replace_('-', '/');
		this.end = end.replace_('-', '/') + ' 23:59:59';
		DataDisplay.prototype.load.call(this, first, today);
	}
	GraphDisplay.prototype.reload = function(start,end){
		if(this.chart === null)
			return;
		DataDisplay.prototype.reload.call(this, start, end);
	}
	GraphDisplay.prototype.getId = function(tsName, start, end){
		if(this.loaded)
			return DataDisplay.prototype.getId.call(this, tsName, start, end)
		return this.gauge.getTimeSeries(tsName).getTsId('domain');
	}

	/**
	 * This function creates the Highstock chart.
	**/
	GraphDisplay.prototype.createDisplay = function(){
		var cols = this.gauge.getOrderedSeries();

		/* 
		 * Create the Highstock chart.  Go to the Highstock section of Highcharts's website for more information 
		 * on chart options
		 */
		var options = {
			chart: {
				renderTo: this.container,
				className: 'mvc-chart-fixed'
			},
			plotOptions: {
				showInNavigator: false,
			},
			navigator: {
				adaptToUpdatedData: false,
			},
			scrollbar: {
				liveRedraw: false,
			},
			legend: {enabled: true},
			rangeSelector: {
				inputDateParser: function(value) {
					let delta = new Date(value.replace_('-', '/')).nUTC(-5);
					if(delta.dateStr()[0] !== value)
						return delta.nDays(1).valueOf();
					return new Date(value.replace_('-', '/')).valueOf();
				}
			},
			title: {
				text: $('#table-title')[0] !== undefined? $('#table-title')[0].innerHTML : "",
			},
			series: [],
			responsive: {
				rules: [],
			},
			xAxis: {
				events: {
					afterSetExtremes: $.proxy(this.selectRange, this),
				},
				max: new Date(today.replace_('-', '/')).valueOf(),
				ordinal: false
			},
			yAxis: [
				{ // Primary yAxis
					labels: {
						format: "{value} " + this.gauge.getTimeSeries().getUnits(),
						style: {
							color: Highcharts.getOptions().colors[cols.indexOf(this.gauge.getTimeSeries().getName())]
						}
					},
					title: {
						text: this.gauge.getTimeSeries().toString(),
						style: {
							color: Highcharts.getOptions().colors[cols.indexOf(this.gauge.getTimeSeries().getName())]
						}
					},
					opposite: false,
					floor: 0,
				},
			],
			tooltip: {
				valueDecimals: 2,
				shared: true, 
				split: false,
			},
		};

		primary_flow = this.gauge.getTimeSeries().getName() === "Flow";

		if(-1 < cols.indexOf('Precipitation')) {
			options.yAxis.push({ // Secondary yAxis
				gridLineWidth: 0,
				title: {
					text: "Precipitation (mm)",
					style: {
						color: Highcharts.getOptions().colors[cols.indexOf('Precipitation')]
					}
				},
				labels: {
					format: "{value} mm",
					style: {
						color: Highcharts.getOptions().colors[cols.indexOf('Precipitation')]
					}
				},
				opposite: true
			});
		}

		if(-1 < cols.indexOf('Snow Depth')) {
			options.yAxis.push({ // Secondary yAxis
				gridLineWidth: 0,
				title: {
					text: "Snow Depth (cm)",
					style: {
						color: Highcharts.getOptions().colors[cols.indexOf('Snow Depth')]
					}
				},
				labels: {
					format: "{value} cm",
					style: {
						color: Highcharts.getOptions().colors[cols.indexOf('Snow Depth')]
					}
				},
				opposite: true
			});
		}

		if(-1 < cols.indexOf('Snow Water Equivalent')) {
			options.yAxis.push({ // Secondary yAxis
				gridLineWidth: 0,
				title: {
					text: "Snow Water Equivalent (mm)",
					style: {
						color: Highcharts.getOptions().colors[cols.indexOf('Snow Water Equivalent')]
					}
				},
				labels: {
					format: "{value} mm",
					style: {
						color: Highcharts.getOptions().colors[cols.indexOf('Snow Water Equivalent')]
					}
				},
				opposite: true
			});
		}

		if(-1 < cols.indexOf('Flow') && -1 < cols.indexOf('Level')) {
			options.yAxis.push({
				title: {
					text: primary_flow? "Level (MASL)" : "Flow (m\xB3/s)",
					style: {
						color: Highcharts.getOptions().colors[cols.indexOf(primary_flow? 'Level' : 'Flow')]
					}
				},
				labels: {
					format: "{value}" + (primary_flow? " (MASL)" : " (m\xB3/s)"),
					style: {
						color: Highcharts.getOptions().colors[cols.indexOf(primary_flow? 'Level' : 'Flow')]
					}
				},
				opposite: false,
			})
		}

		this.chart = new Highcharts.StockChart(options);
		this.chart.showLoading();

		var rngs = this.gauge.getOrderedRanges();
		for(let i = 0; i < rngs.length; i++) {
			this.gauge.getRange(rngs[i]).reset();
		}
	}
	/**
	 * This function creates a Highstock series from an http response
	 * 
	 * @param dat		- pointer to KVP parent object
	 * @param tsName	- the name of the measurement that the series will represent
	 * 
	 * @return	- the newly created series
	 
	**/
	GraphDisplay.prototype.formatData = function(dat, tsName){
		var cols = this.gauge.getOrderedSeries();
		var units = this.gauge.getTimeSeries(tsName) !== undefined? this.gauge.getTimeSeries(tsName).getUnits() : this.gauge.getTimeSeries().getUnits();

		//populate the series for the chart (type and tooltip default to their values for flow rate)
		var singleSeries = {
			_colorIndex: cols.indexOf(tsName) % 10,
			_symbolIndex: 0,//cols.indexOf(tsName),
			connectNulls: true,
			name: tsName,//Can also extract name directly from query
			data: dat,
			type: "spline",//Both flow rate and water level use line charts
			yAxis: 0,
			zIndex: -cols.indexOf(tsName),
			tooltip: {
				valueSuffix: " " + units,
			},
			dataGrouping: {
				smoothed: true,//put point in the center of a group to avoid shifting data to the left
				units: [
					[
						'minute',
						[5, 15, 30]
					],
					[
						'hour',
						[1, 2, 3, 4, 6, 8, 12]
					],
					[
						'day',
						[1]
					],
					[
						'week',
						[1]
					],
					[
						'month',
						[1, 3, 6]
					],
				],
			},
		};

		if(tsName === this.gauge.getTimeSeries().getName())
			singleSeries.showInNavigator = true;
		if(units !== this.gauge.getTimeSeries().getUnits())
			singleSeries.yAxis = 1 + (-1 < cols.indexOf('Precipitation')? 1 : 0);

		if(tsName === "Historical Maximum")
			singleSeries.dataGrouping.approximation = "high";
		if(tsName === "Historical Minimum")
			singleSeries.dataGrouping.approximation = "low";
		if(tsName === "Historical Range") {
			singleSeries.type = "areasplinerange";
			singleSeries.color = '#D0D0D0';
			singleSeries.lineWidth = 2;
			singleSeries.zIndex = -(cols.length + 2);
		}
		if(tsName === "Target Range") {
			singleSeries.type = "areasplinerange";
			singleSeries.color = '#B0B0B0';
			singleSeries.zIndex = -(cols.length + 1);
		}
		if(tsName === "Precipitation") {
			singleSeries.type = "column";//Precipitation uses a bar chart, instead of a line chart
			singleSeries.yAxis = 1;
		}
		if(tsName === "Staff Level") {
			singleSeries.marker = {
				enabled: true
			};
			singleSeries.lineWidth = 0;
			singleSeries.states = {
				hover: {
					lineWidthPlus: 0
				}
			};
		}
		
		return singleSeries;
	}
	GraphDisplay.prototype.appendData = function(dat, i){
		var rngs = this.gauge.getOrderedRanges();
		var tsName = i < 0? this.gauge.getOrderedRanges()[-(i+1)] : this.gauge.getOrderedSeries()[i];

		if(rngs.length === 0)
			return this.chart.addSeries(dat, false);
		for(let j = 0; j < rngs.length; j++)
		{
			if(tsName === this.gauge.getRange(rngs[j]).getLow())
				break;
			if(tsName === this.gauge.getRange(rngs[j]).getHigh())
				break;
			if(j + 1 < rngs.length)
				continue;
			this.chart.addSeries(dat, false);
			break;
		}

		var appendRange = $.proxy(function(dat, rngName) {
			let temp = this.formatData(dat, rngName);
			if(temp === undefined)
				return;
			this.appendData(temp, -(rngs.indexOf(rngName)+1));
		}, this);
		for(let j = 0; j < rngs.length; j++) {
			this.gauge.getRange(rngs[j]).useData(dat.data, tsName, appendRange);
		}
	}

	GraphDisplay.prototype.displayLoad = function(){
		this.chart.showLoading();
		var rngs = this.gauge.getOrderedRanges();
		for(let i = 0; i < rngs.length; i++) {
			this.gauge.getRange(rngs[i]).reset();
		}
	}
	GraphDisplay.prototype.refresh = function(dat, tsName){
		var series = null;

		var refreshRange = $.proxy(function(dat, rngName) {
			this.refresh(dat, rngName);
		}, this);

		var rngs = this.gauge.getOrderedRanges();
		for(let i = 0; i < rngs.length; i++) {
			this.gauge.getRange(rngs[i]).useData(dat, tsName, refreshRange);
		}

		for(var j = 0; j < this.chart.series.length; j++) {
			if(this.chart.series[j].name !== tsName)
				continue;//skip this iteration if the jth series is not the one we're updating
			series = this.chart.series[j];//set series to the jth series
		}

		if(series === null && !this.finished())
			return;//stop without doing anything if series is still null and this is not the last response
		if(series === null)
			return this.chart.hideLoading();//hide loading and stop here if series is still null
		series.setData(dat, false);//update the series's data
	}

	GraphDisplay.prototype.display = function(is_reload){
		if(!is_reload)
			this.chart.xAxis[0].setExtremes((new Date(this.start)).valueOf(), (new Date(this.end)).valueOf(), false);
		if(!is_reload)
			this.loaded = true
		this.chart.hideLoading();//hide the loading display
		this.chart.redraw();//update the chart's display
		if(!is_reload)
			$('#chart-info').removeClass('disabled');//display the units of measurement legend
		$('input.highcharts-range-selector').datepicker();
		//$('input.mvc-range-selector.mvc-graph').datepicker();
		let chart = this.chart
		$('input.highcharts-range-selector').datepicker('option', 'onselect', function(dateText) {
				chart.xAxis[0].setExtremes(
					$('input.highcharts-range-selector:eq(0)').datepicker("getDate").nUTC().getTime(), 
					$('input.highcharts-range-selector:eq(1)').datepicker("getDate").nUTC().getTime()); 
				this.onchange();
			});
		$('input.mvc-range-selector.mvc-graph').datepicker('option', 'onSelect', function(dateText) {
			chart.xAxis[0].setExtremes(
				$('input.mvc-range-selector.mvc-graph:eq(0)').datepicker("getDate").nUTC().getTime(), 
				$('input.mvc-range-selector.mvc-graph:eq(1)').datepicker("getDate").nUTC().getTime()
			);
			this.value = dateText;
			$(this).trigger('blur');
		});
		tempDat = null;
	}

	return GraphDisplay;
})()