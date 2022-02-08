var CSVDownload = (function() {
	function CSVDownload(gauge, container) {
		TableDisplay.call(this, gauge, container);
		$(this.container).attr('disabled', '')
	}

	CSVDownload.prototype= Object.create(TableDisplay.prototype);
	CSVDownload.prototype.constructor = CSVDownload;

	CSVDownload.prototype.load = function(start, end) {
		if(end === "")
			end = today.replace_('-', '/');
		if(start === "")
			start = Date.dateStr((new Date(end + ' 00:00:00')).setMonth((new Date(end + ' 00:00:00')).getMonth() - 3))[0];
		this.start = start;
		this.end = end;
		DataDisplay.prototype.load.call(this, start, end);
	}
	CSVDownload.prototype.getId = function(tsName, start, end) {
		return DataDisplay.prototype.getId.call(this, tsName);
	}

	CSVDownload.prototype.createDisplay = DataDisplay.prototype.createDisplay

	CSVDownload.prototype.display = function() {
		$(this.container).removeAttr('disabled');
		var csv = this.makeTable();//create the table
		var anchor = document.createElement('a');
		document.body.appendChild(anchor);
		anchor.style = "display: none;"
		var dat = new Blob(['\ufeff', csv], { type: "text/csv" });
		var fileName = this.gauge.getId() + " Gauge Data - " + this.start + " to " + this.end + ".csv";
		if(window.navigator.msSaveBlob) {
			window.navigator.msSaveBlob(dat, fileName);
		}
		anchor.href = URL.createObjectURL(dat);
		anchor.download = fileName;
		anchor.click();
		document.body.removeChild(anchor);
	}

	CSVDownload.prototype.setHeaders = function(cols) {
		var contents = "";

		for(var i = 0; i < cols.length; i++) {
			contents += cols[i];//add the tsName
			if(this.gauge.getTimeSeries(cols[i]) !== undefined)
				contents += (" (" + this.gauge.getTimeSeries(cols[i]).getUnits() + ")");//don't add a tooltip if the tsName has no units value
			contents += ",";
		}
		return contents + "\n";
	}
	CSVDownload.prototype.buildRow = function(row, cols) {
		var contents = "";
		for(var i = 0; i < cols.length; i++)
			contents += (row[cols[i]] !== null? row[cols[i]] : "") + ",";//Add the data to the row
		return contents + "\n";
	}

	return CSVDownload;
})()