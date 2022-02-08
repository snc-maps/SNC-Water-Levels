map_options = {
	'zoom': {
		'max': 17,
		'min': 8,
	},
	'home': {
		'pos': [
			45.114,
			-75.3915
		],
		'zoom': 10,
	},
	'basemap': "Topographic",
	'gauges': [
		{
			'fields': ["OBJECTID", "Station_name"],
			'url': "https://services1.arcgis.com/d0ZCwU7eGKVeNiEE/ArcGIS/rest/services/FFW_App_Data/FeatureServer/0",
			'labels': "Station_name",
			'ids': "OBJECTID",
			'icon': "mvc-marker-level",
			'iWidth': 30,
			'iHeight': 30
		},//*/
		{
			'fields': ["OBJECTID_1", "F1"],
			'url': "https://services1.arcgis.com/d0ZCwU7eGKVeNiEE/ArcGIS/rest/services/FFW_App_Data/FeatureServer/2",
			'labels': "F1",
			'ids': "OBJECTID_1",
			'icon': "mvc-marker-climate",
			'iWidth': 30,
			'iHeight': 30
		},//*/
		{
			'fields': ["OBJECTID", "Site"],
			'url': "https://services1.arcgis.com/d0ZCwU7eGKVeNiEE/ArcGIS/rest/services/FFW_App_Data/FeatureServer/1",
			'labels': "Site",
			'ids': "OBJECTID",
			'icon': "mvc-marker-snow",
			'iWidth': 30,
			'iHeight': 30
		},//*/
	],
	'buttons': {
		'Gauge - South Nation River at Casselman': [{"button-name": "Automated Gauge Data", "station-id": "Gauge - South Nation River at Casselman"}],
		'Gauge - South Nation River at Chesterville': [{"button-name": "Automated Gauge Data", "station-id": "Gauge - South Nation River at Chesterville"}],
		'Gauge - South Nation River at Spencerville': [{"button-name": "Automated Gauge Data", "station-id": "Gauge - South Nation River at Spencerville"}],
		'Gauge - South Nation River near Plantagenet': [{"button-name": "Automated Gauge Data", "station-id": "Gauge - South Nation River near Plantagenet"}],
		'Gauge - Payne River near Berwick': [{"button-name": "Automated Gauge Data", "station-id": "Gauge - Payne River near Berwick"}],
		'Gauge - Bear Brook River near Bourget': [{"button-name": "Automated Gauge Data", "station-id": "Gauge - Bear Brook River near Bourget"}],
		'Gauge - Castor River at Russell': [{"button-name": "Automated Gauge Data", "station-id": "Gauge - Castor River at Russell"}],
		'Gauge - South Castor at Kenmore': [{"button-name": "Automated Gauge Data", "station-id": "Gauge - South Castor at Kenmore"}],
		'Gauge - SNR North Branch near Heckston': [{"button-name": "Automated Gauge Data", "station-id": "Gauge - SNR North Branch near Heckston"}],
		'Gauge - SNR South Branch near Winchester Springs': [{"button-name": "Automated Gauge Data", "station-id": "Gauge - SNR South Branch near Winchester Springs"}],
		'Gauge - West Branch Scotch River Near St.Isidore': [{"button-name": "Automated Gauge Data", "station-id": "Gauge - West Branch Scotch River Near St.Isidore"}],

		'Berwick': [{"button-name": "Climate Station Data", "station-id": "Berwick SNC Shop AWP"}],
		'SNC Office Finch': [{"button-name": "Climate Station Data", "station-id": "Finch SNC Office AWP"}],
		'Pleasant Valley': [{"button-name": "Climate Station Data", "station-id": "Pleasant Valley, South Mountain AWP"}],
		'Maynard': [{"button-name": "Climate Station Data", "station-id": "Maynard"}],
		'Warina A': [{"button-name": "Climate Station Data", "station-id": "Seguin Rd nesr CR138 AWP"}],
		'Russell CC': [{"button-name": "Climate Station Data", "station-id": "Wade Road, Russell AWP"}],
		'Watson Road': [{"button-name": "Climate Station Data", "station-id": "Watson Road, Vars AWP"}],
		'Atocas Bay': [{"button-name": "Climate Station Data", "station-id": "Atocas Bay near Lefaivre AWP"}],
		'Marcella Drive': [{"button-name": "Climate Station Data", "station-id": "SNC 155 Greely"}],

		'Bear Brook': [{"button-name": "Snow Station Data", "station-id": "Bear Brook - 3506"}],
		'Felton': [{"button-name": "Snow Station Data", "station-id": "Felton - 3502"}],
		'Larose Forest': [{"button-name": "Snow Station Data", "station-id": "Larose Forest - 3501"}],
		'Spencerville': [{"button-name": "Snow Station Data", "station-id": "Spencerville - 3503"}],
		'St-Isidore': [{"button-name": "Snow Station Data", "station-id": "St.Isidore - 3505"}],
		'Vernon': [{"button-name": "Snow Station Data", "station-id": "Vernon - 3507"}],
		'Williamsburg': [{"button-name": "Snow Station Data", "station-id": "Williamsburg - 3504"}],
	},
	'boundary': {
		'url': "https://services1.arcgis.com/d0ZCwU7eGKVeNiEE/ArcGIS/rest/services/FFW_App_Data/FeatureServer/4",
	},
	'subwatersheds': {
		'url': "https://services1.arcgis.com/d0ZCwU7eGKVeNiEE/ArcGIS/rest/services/FFW_App_Data_April_1/FeatureServer/3",
	},
};