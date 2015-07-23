/**
 * HUGE Navigation Exercise
 * @author Juan Diego Rodriguez
 */
(function(NAVEXERCISE){
	'use strict';

	var NAV_SERVICE_URL = '/api/nav.json';

	/**
	 * General Data function handler
	 * @return {Function} Exposing the data getter function
	 */
	function dataGetter () {
		var xmlhttp = new XMLHttpRequest(),
			data,
			dataListener;

		/**
		 * Retrieve data from specified URL
		 * @param  {Function} callback [description]
		 */
		function getData(callback){
			dataListener = callback;
			xmlhttp.onload = processData;
			xmlhttp.open("GET", NAV_SERVICE_URL, true);
			xmlhttp.send();
		}

		/**
		 * Processing the response from the AJAX call
		 * @return {[type]} [description]
		 */
		function processData () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				// Parse JSON response
			    data = JSON.parse(xmlhttp.responseText);

			    // Create Nav elements with response data
			    dataListener(data);
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