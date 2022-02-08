(function() {
	Highcharts.setOptions({
		global: {
			timezoneOffset: 5*60,
		},
	});

	var today = (new Date()).dateStr()[0];
	var first = Date.dateStr('1900/01/01 00:00:00')[0];

	var stations = new StationList();

	window.init = function(table_id, chart_id)
	{
		window.loadGraph = function(tsId, start, end) {
			if(GraphDisplay === undefined){
				console.error('RecentData class is not included!');
			}
			var graph_ = new GraphDisplay(stations.get(tsId), chart_id);
			graph_.load(start, end);
		};
		window.loadTable = function(tsId, start, end) {
			if(TableDisplay === undefined){
				console.error('RecentData class is not included!');
			}
			var table_ = new TableDisplay(stations.get(tsId), table_id);
			table_.load(start, end);
		};
	}

	window.loadRecnt = function(tsId, container_1, container_2, range) {
		if(RecentData === undefined){
			console.error('RecentData class is not included!');
		}
		var temp = new RecentData(stations.get(tsId), container_1, container_2, range);
		temp.load();
	}
	window.chckRecnt = function(tsId, container, range) {
		if(RecntDisplay === undefined){
			console.error('RecentData class is not included!');
		}
		var temp = new RecntDisplay(stations.get(tsId), container, range);
		temp.load();
	};
	window.download  = function(tsId, container, start, end) {
		if(CSVDownload === undefined){
			console.error('RecentData class is not included!');
		}
		var csv_ = new CSVDownload(stations.get(tsId), container);
		csv_.load(start, end);
	};
	window.stations = stations
})()