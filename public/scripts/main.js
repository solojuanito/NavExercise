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
	function getData(){
		var xmlhttp = new XMLHttpRequest();
		var url = 'api/nav.json';

		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			    var data = JSON.parse(xmlhttp.responseText);
			    buildNavigation (data.items || []);
		    }
		}

		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}

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

			//Creating links
			navLink = document.createElement("a");
			navLink.href = dataArray[i].url || "#";
			navLink.target = "_blank";
			navLink.appendChild( document.createTextNode( dataArray[i].label ) );

			navElement.className = "nav-item";

			subMenuChildren = dataArray[i].items;

			if (subMenuChildren.length){
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
				navElement.className += " nav-has-children";
			}

			navElement.appendChild(navLink);
			
			if (subMenuFragment){
				navElement.appendChild(subMenuFragment);
			}

			fragment.appendChild(navElement);
		}

		mainNav.appendChild(fragment);
	}

	function init(){
		getData();
	}

	return {
		init : init
	}
})();

document.addEventListener('DOMContentLoaded', NAVEXERCISE.init);

