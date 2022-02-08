(function(){
	var stations = window.stations
	/* 
	 * Climate stations
	 */
	{
		{(stations.add(new Station('Berwick SNC Shop AWP', '02KF006'))
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 0).setSource("38206042"), true)
		)};
		{(stations.add(new Station('Finch SNC Office AWP', '02KF006'))
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 0).setSource("39038042"), true)
		)};
		{(stations.add(new Station('Pleasant Valley, South Mountain AWP', '02KF006'))
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 0).setSource("38785042"), true)
		)};
		{(stations.add(new Station('Maynard', '02KF006'))
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 0).setSource("63110042"), true)
		)};
		{(stations.add(new Station('Seguin Rd nesr CR138 AWP', '02KF006'))
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 0).setSource("38791042"), true)
		)};
		{(stations.add(new Station('Wade Road, Russell AWP', '02KF006'))
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 0).setSource("35290042"), true)
		)};
		{(stations.add(new Station('Watson Road, Vars AWP', '02KF006'))
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 0).setSource("56136042"), true)
		)};
		{(stations.add(new Station('Atocas Bay near Lefaivre AWP', '02KF006'))
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 0).setSource("38714042"), true)
		)};
		{(stations.add(new Station('SNC 155 Greely', '02KF006'))
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 0).setSource("60805042"), true)
		)};
	}

	/* 
	 * Lake stations
	 */
	{
		{(stations.add(new Station('Gauge - South Nation River at Casselman', '02LB013'))
			.addTs(new TimeSeries('Flow', 'm\xB3/s', 'Q', 0).setSource("34955042"))
			.addTs(new TimeSeries('Level', 'MASL', 'HG', 0).setSource("44142042"),true)
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 1).setSource("34964042"))
		)};
		{(stations.add(new Station('Gauge - South Nation River at Chesterville', '02LB009'))
			.addTs(new TimeSeries('Flow', 'm\xB3/s', 'Q', 0).setSource("34948042"))
			.addTs(new TimeSeries('Level', 'MASL', 'HG', 0).setSource("44141042"),true)
		)};
		{(stations.add(new Station('Gauge - South Nation River at Spencerville', '02LB007'))
			.addTs(new TimeSeries('Flow', 'm\xB3/s', 'Q', 0).setSource("34826042"))
			.addTs(new TimeSeries('Level', 'MASL', 'HG', 0).setSource("44145042"),true)
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 1).setSource("35032042"))
		)};
		{(stations.add(new Station('Gauge - South Nation River near Plantagenet', '02LB005'))
			.addTs(new TimeSeries('Flow', 'm\xB3/s', 'Q', 0).setSource("34937042"))
			.addTs(new TimeSeries('Level', 'MASL', 'HG', 0).setSource("56757042"),true)
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 1).setSource("35033042"))
		)};
		{(stations.add(new Station('Gauge - Payne River near Berwick', '02LB022'))
			.addTs(new TimeSeries('Flow', 'm\xB3/s', 'Q', 0).setSource("34939042"))
			.addTs(new TimeSeries('Level', 'MASL', 'HG', 0).setSource("42377042"),true)
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 1).setSource("35555042"))
		)};
		{(stations.add(new Station('Gauge - Bear Brook River near Bourget', '02LB008'))
			.addTs(new TimeSeries('Flow', 'm\xB3/s', 'Q', 0).setSource("34825042"))
			.addTs(new TimeSeries('Level', 'MASL', 'HG', 0).setSource("36890042"),true)
		)};
		{(stations.add(new Station('Gauge - Castor River at Russell', '02LB006'))
			.addTs(new TimeSeries('Flow', 'm\xB3/s', 'Q', 0).setSource("34387042"))
			.addTs(new TimeSeries('Level', 'MASL', 'HG', 0).setSource("44138042"),true)
		)};
		{(stations.add(new Station('Gauge - South Castor at Kenmore', '02LB020'))
			.addTs(new TimeSeries('Flow', 'm\xB3/s', 'Q', 0).setSource("34477042"))
			.addTs(new TimeSeries('Level', 'MASL', 'HG', 0).setSource("44139042"),true)
		)};
		{(stations.add(new Station('Gauge - SNR North Branch near Heckston', '02LB017'))
			.addTs(new TimeSeries('Flow', 'm\xB3/s', 'Q', 0).setSource("34922042"))
			.addTs(new TimeSeries('Level', 'MASL', 'HG', 0).setSource("44144042"),true)
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 1).setSource("35557042"))
		)};
		{(stations.add(new Station('Gauge - SNR South Branch near Winchester Springs', '02LB031'))
			.addTs(new TimeSeries('Flow', 'm\xB3/s', 'Q', 0).setSource("34926042"))
			.addTs(new TimeSeries('Level', 'MASL', 'HG', 0).setSource("44140042"),true)
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 1).setSource("35538042"))
		)};
		{(stations.add(new Station('Gauge - West Branch Scotch River Near St.Isidore', '02LB018'))
			.addTs(new TimeSeries('Flow', 'm\xB3/s', 'Q', 0).setSource("36902042"))
			.addTs(new TimeSeries('Level', 'MASL', 'HG', 0).setSource("44143042"),true)
			.addTs(new TimeSeries('Precipitation', 'mm', 'PP', 1).setSource("35705042"))
		)};
	}

	/* 
	 * Staff stations
	 */
	{
		{(stations.add(new Station('Bear Brook - 3506', '3506'))
			.addTs(new TimeSeries('Snow Depth', 'cm', 'SD', 0).setSource("49245042"), true)
			.addTs(new TimeSeries('Snow Water Equivalent', 'mm', 'SW', 2).setSource("49248042"))
		)};
		{(stations.add(new Station('Felton - 3502', '3502'))
			.addTs(new TimeSeries('Snow Depth', 'cm', 'SD', 0).setSource("49235042"), true)
			.addTs(new TimeSeries('Snow Water Equivalent', 'mm', 'SW', 2).setSource("49250042"))
		)};
		{(stations.add(new Station('Larose Forest - 3501', '3501'))
			.addTs(new TimeSeries('Snow Depth', 'cm', 'SD', 0).setSource("49251042"), true)
			.addTs(new TimeSeries('Snow Water Equivalent', 'mm', 'SW', 2).setSource("49240042"))
		)};
		{(stations.add(new Station('Spencerville - 3503', '3503'))
			.addTs(new TimeSeries('Snow Depth', 'cm', 'SD', 0).setSource("49252042"), true)
			.addTs(new TimeSeries('Snow Water Equivalent', 'mm', 'SW', 2).setSource("49253042"))
		)};
		{(stations.add(new Station('St.Isidore - 3505', '3505'))
			.addTs(new TimeSeries('Snow Depth', 'cm', 'SD', 0).setSource("49254042"), true)
			.addTs(new TimeSeries('Snow Water Equivalent', 'mm', 'SW', 2).setSource("49255042"))
		)};
		{(stations.add(new Station('Vernon - 3507', '3507'))
			.addTs(new TimeSeries('Snow Depth', 'cm', 'SD', 0).setSource("49257042"), true)
			.addTs(new TimeSeries('Snow Water Equivalent', 'mm', 'SW', 2).setSource("49259042"))
		)};
		{(stations.add(new Station('Williamsburg - 3504', '3504'))
			.addTs(new TimeSeries('Snow Depth', 'cm', 'SD', 0).setSource("49261042"), true)
			.addTs(new TimeSeries('Snow Water Equivalent', 'mm', 'SW', 2).setSource("49263042"))
		)};
	}
})()