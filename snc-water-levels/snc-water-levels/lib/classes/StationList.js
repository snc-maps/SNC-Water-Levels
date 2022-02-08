/**
 * 
**/
StationList = (function(){
	StationList = function(){
		this.list = {}
	}

	StationList.prototype.add = function(station){
		this.list[station.getId()] = station;
		return station;//for chaining with other operations
	}
	StationList.prototype.get = function(id){
		return this.list[id];
	}

	StationList.prototype.toString = function(){
		var out = "";
		for(var str in this.list)
			out += this.get(str).toString() + "\n";
		return out;
	}

	return StationList;
})()