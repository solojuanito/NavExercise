/**
 * HUGE Navigation Exercise
 * @author Juan Diego Rodriguez
 */
(function(NAVEXERCISE){
	'use strict';

	function navigation () {

		// Pointing to default nav container
		var mainNavElement = document.getElementById('main-nav-container'),
			itemTemplate = "<li class='nav-item'><a href='%url%' target='_blank'>%label%</a>%submenu%</li>",
			submenuTemplate = "<ul class='sub-nav'>%submenu%</ul>";

		// Use dataArray parameter to build navigation lists
		function buildNav (data, container){
			var mainNav = container || mainNavElement;
			mainNav.innerHTML = (constructHTML(data));
			mainNav.addEventListener('click',attachNavListeners);
		}

		function constructHTML (data){
			var dataArray = data.items || data,
				fragment = "",
				submenu = "",
				attrValue,
				itemHTML;

			for (var i = 0, x = dataArray.length; i<x ; i++){
				itemHTML = itemTemplate;

				for(var key in dataArray[i]){
		            attrValue = dataArray[i][key];

					if (attrValue instanceof Array){
						if(attrValue.length){
							submenu = submenuTemplate.replace('%submenu%', constructHTML(attrValue));
						} else {
							submenu = "";
						}
					} else {
						itemHTML = itemHTML.replace('%'+key+'%',attrValue);
					}   
		        }
		        itemHTML = itemHTML.replace('%submenu%',submenu);
		        fragment += itemHTML;
			}
			return fragment;
		}

		function attachNavListeners (event){
			var element = event.target,
				elementContainer = element.parentNode,
				submenu = element.nextElementSibling;

			// In the case the item has sub-items, avoid open the link, 
			// then display sub-menu
			if (submenu && submenu.hasChildNodes()){
				event.preventDefault();
				elementContainer.className = toggleClass (elementContainer, 'open');
			}
		}

		// Return element classes toggling elemClass specifed  
		function toggleClass (elem, elemClass){
			var regExp = new RegExp('(\\s|^)' + elemClass + '(\\s|$)');
			return elem.className.indexOf(elemClass) >= 0 ? elem.className.replace(regExp , '' ) : elem.className + " " + elemClass;
		}

		return {
			build : buildNav
		}
	}

	NAVEXERCISE.navigation = new navigation;

})(NAVEXERCISE || {});