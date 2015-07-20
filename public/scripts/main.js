/**
 * HUGE Navigation Exercise
 * @author Juan Diego Rodriguez
 */
'use strict';

/**
 * Declaring a namespace for the exercise
 */
var NAVEXERCISE = {
    version : '1.0',
    fastClick : 'ontouchstart' in document.documentElement ? 'touchstart' : 'click',
    init : function (){
    	NAVEXERCISE.populateNavigation.init();
    } 
};

NAVEXERCISE.populateNavigation = (function(){

	// Retrieve data from nav.json
	function getData(){
		var xmlhttp = new XMLHttpRequest();
		var url = 'api/nav.json';

		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				// Parse JSON response
			    var data = JSON.parse(xmlhttp.responseText);

			    // Create Nav elements with response data
			    buildNavigation (data.items || []);
		    } else {
		    	// error handling should be implemented otherwise
		   	}
		}

		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}

	// Use dataArray parameter to build navigation lists
	function buildNavigation (dataArray){
		var mainNav = document.getElementById('main-nav-container'),
			fragment = document.createDocumentFragment(),
			navElement,
			navLink,
			subMenuChildren;

		for (var i = 0, x = dataArray.length; i<x ; i++){
			//Creating LI containers
			navElement = document.createElement("li");
			navElement.className = "nav-item";

			//Creating inner links
			navLink = document.createElement("a");
			navLink.href = dataArray[i].url || "#";
			navLink.target = "_blank";
			navLink.appendChild( document.createTextNode( dataArray[i].label ) );

			// Add event listener on click to primary links
			navLink.addEventListener("click", navListeners);

			navElement.className = "nav-item";

			// Check if the item has sub-items
			subMenuChildren = dataArray[i].items;

			if (subMenuChildren.length){
				// Generate sub-menu for the item
				var subMenuFragment = document.createDocumentFragment(),
					subMenu = document.createElement("ul"),
					subMenuElement,
					subMenuLink;

				for (var j=0 ; j< subMenuChildren.length ; j++){
					subMenuElement = document.createElement("li");

					subMenuLink = document.createElement("a");
					subMenuLink.href = subMenuChildren[j].url || "#";
					subMenuLink.target = "_blank";

					subMenuLink.appendChild( document.createTextNode( subMenuChildren[j].label ) );
					subMenuElement.appendChild(subMenuLink);
					subMenu.appendChild(subMenuElement);
				}

				subMenu.className = "sub-nav";

				subMenuFragment.appendChild(subMenu);

				// Mark the "parent" node with children 
				navElement.className += " nav-has-children";
			}

			navElement.appendChild(navLink);
			
			// If there was some sub-menu created, append it to current fragment
			if (subMenuFragment){
				navElement.appendChild(subMenuFragment);
			}

			// Append main nav element to fragment
			fragment.appendChild(navElement);
		}

		// Append built fragment to DOM
		mainNav.appendChild(fragment);
	}

	// Return element classes toggling elemClass specifed  
	function toggleClass (elem, elemClass){
		var regExp = new RegExp('(\\s|^)' + elemClass + '(\\s|$)');
		return elem.className.indexOf(elemClass) >= 0 ? elem.className.replace(regExp , '' ) : elem.className + " " + elemClass;
	}

	// Main nav links handler
	function navListeners(event){
		var parent = this.parentNode,
			overlay = document.getElementsByClassName('overlay')[0];

		// In the case the item has sub-items, avoid open the link, 
		// then display sub-menu
		if (parent.className.indexOf('nav-has-children')>=0){
			event.preventDefault();
			parent.className = toggleClass (parent, 'open');
			overlay.className = toggleClass (overlay, 'open');
		}
	}


	function init(){
		getData();
	}

	// Exposing init function 
	return {
		init : init
	}

})();


// Once the document has loaded, call init function
document.addEventListener('DOMContentLoaded', NAVEXERCISE.init);

