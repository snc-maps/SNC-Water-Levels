	var TableDisplay = (function() {
	function TableDisplay(gauge, container) {
		DataDisplay.call(this, gauge, container);

		this.getTemplate = getTemplate;
		this.tooltips = {}
	}


	TableDisplay.prototype= Object.create(DataDisplay.prototype);
	TableDisplay.prototype.constructor = TableDisplay;

	function getTemplate() {
		var cols = this.gauge.getOrderedSeries();
		var template = {
			'Date': null,
			'Time': null,
		};

		for(var i = 0; i < cols.length; i++)
			template[cols[i]] = null;//add the station's columns to the template
		return template;
	}

	TableDisplay.prototype.createDisplay = function() {
		Tooltip.unbind();
		$('#' + this.container)[0].innerHTML = "<h3>Now Loading...</h3>";
	}
	TableDisplay.prototype.appendData = function(dat, j) {
		var tsName = this.gauge.getOrderedSeries()[j];
		for(var i = 0; i < dat.length; i++) {
			if(this.data[dat[i][0]] === undefined)
				this.data[dat[i][0]] = this.getTemplate();//Add this row to the table if no row with this timestamp exists
			var timestamp = new Date(dat[i][0]).nUTC(-5);//get the timestamp
			var row = this.data[dat[i][0]];//get the actual data

			function getTimeVal(val) {
				return (9 < val? "" : "0") + val;
			}

			/* 
			 * Set the row's timestamp
			 */
			if(row['Date'] === null)
				row['Date'] = timestamp.dateStr()[0];
			if(row['Time'] === null)
				row['Time'] = timestamp.dateStr()[1];
			if(row[tsName] === undefined)
				continue;//do nothing if this column does not exist
			if(row[tsName] !== null)
				continue;//do nothing if there is already data in this column
			row[tsName] = dat[i][1];//add the data for this tsName's column
			this.data[dat[i][0]] = row;//set the row at this timestamp
		}
	}

	TableDisplay.prototype.display = function() {
		var $table = $('#' + this.container);
		$table[0].innerHTML = "<style>"
								+ this.setStyles()
							+ "</style>"
							+ "<table class=\"data-table\">"
								+ this.makeTable()
							+ "</table>";//create the table
		Tooltip.bind();
		$('#table-title').removeClass('disabled');//display the table's title
	}

	TableDisplay.prototype.makeTable = 	function() {
		var html = "";
		var cols = [];

		var keys = []
		for(var k in this.data)
			keys.push(k);
		keys.sort(function(a, b) {
			//> 1 means b goes before a
			//> 0 means do nothing
			//>-1 means a goes before b
			let compare = function(a, b) {
				if(a < b)
					return -1;
				if(b < a)
					return 1;
				return 0;
			}
			return compare(parseInt(a), parseInt(b));
		});

		for(var k = 0; k < keys.length; k++) {
			if(keys[k] === undefined)
				continue;
			/* 
			 * if the column headers haven't been added, add them
			 */
			if(cols.length === 0) {
				cols = ["Date", "Time"].concat(this.gauge.getOrderedSeries());
				html += this.setHeaders(cols);
			}
			html += this.buildRow(this.data[keys[k]], cols);
		}
		this.data = [];//clear the table array, as we no longer need it
		return html;
	}
	TableDisplay.prototype.setStyles = function() {
		var css = "";
		var cols = this.gauge.getOrderedSeries();

		for(let i = 0; i < cols.length; i++) {
			css += "#" + this.container + ".mvc-hide-" + cols[i].replace_(' ', '-') + " ." + cols[i].replace_(' ', '-') + "\
			{\
				visibility: collapse;\
			}";
		}

		function subset(list, n) {
			if(n === 0)
				return [];
			var prev = subset(list, n-1);
			var next = [[list[n-1]]];
			for(let i = 0; i < prev.length; i++)
				next.push(prev[i].concat([list[n-1]]));
			return prev.concat(next);
		}

		let list = subset(cols, cols.length);
		for(let i = 0; i < list.length; i++) {
			if(list[i].length < 1)
				continue;
			for(let j = 0; j < list[i].length; j++) {
				css += ".mvc-hide-" + list[i][j].replace_(' ', '-');
			}
			css += " tr.mvc-row-" + list[i].join('-').replace_(' ', '-') + " {display: none;}\n";
		}

		return css;
	}
	TableDisplay.prototype.buildToggles = function() {
		var html = "";
		var cols = this.gauge.getOrderedSeries();

		for(let i = 0; i < cols.length; i++) {
			html += "<div class=\"mvc-column-toggle mvc-button\" data-target=\"" + cols[i].replace_(' ', '-') + "\">" + cols[i].replace_(' ', '-') + "</div>"
		}

		return html;
	}
	TableDisplay.prototype.setHeaders = function(cols) {
		var html = "";

		var getCell = $.proxy(function(col) {
			if(this.gauge.getTimeSeries(col) === undefined)
				return col;
			return (col + " (" + this.tooltips[cols[i]] + ")");
		}, this);
		var getAttr = $.proxy(function(col) {
			if(this.gauge.getTimeSeries(col) === undefined)
				return "";
			return " class=\"mvc-column-toggle mvc-button\" data-target =\"" + col.replace_(' ', '-') + "\""
		}, this);

		for(var i = 0; i < cols.length; i++) {
			this.tooltips[cols[i]] = new Tooltip(this.gauge.getTimeSeries(cols[i]))
			html += ("<th" + getAttr(cols[i]) + ">"
					 + getCell(cols[i])
				 + "</th>");
		}
		return "<tr>" + html + "</tr>";
	}
	TableDisplay.prototype.buildRow = function(row, cols) {
		var html = "";
		var params = [];
		for(let i = 0; i < cols.length; i++) {
			let val = "";
			if(row[cols[i]] !== null) {
				val = row[cols[i]];
				if(cols[i] !== "Date" && cols[i] !== "Time")
					params.push(cols[i]);
			}
			html += "<td class=\"" + cols[i].replace_(' ', '-') + "\">" + val + "</td>";//Add the data to the row
		}
		return "<tr class=\"mvc-row-" + params.join('-').replace_(' ', '-') + "\">" + html + "</tr>";
	}

	return TableDisplay;
})()