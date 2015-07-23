/**
 * HUGE Navigation Exercise
 * @author Juan Diego Rodriguez
 */
(function(NAVEXERCISE){
	'use strict';

	var NAV_SERVICE_URL = '/api/nav.json';

	function dataGetter () {
		var xmlhttp = new XMLHttpRequest(),
			data,
			dataListener;

		// Retrieve data from nav.json
		function getData(callback){
			dataListener = callback;
			xmlhttp.onload = processData;
			xmlhttp.open("GET", NAV_SERVICE_URL, true);
			xmlhttp.send();
		}

		function processData () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				// Parse JSON response
			    data = JSON.parse(xmlhttp.responseText);
			    dataListener(data);
			    // Create Nav elements with response data
			    //buildNavigation (data.items || []);
		    } else {
		    	// error handling should be implemented otherwise
		   	}
		}

		return {
			getData : getData
		}
	};

	NAVEXERCISE.dataGetter = new dataGetter;

})(NAVEXERCISE || {});