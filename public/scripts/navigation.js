/**
 * HUGE Navigation Exercise
 * @author Juan Diego Rodriguez
 */
(function(NAVEXERCISE){
	'use strict';

	function navigation () {

		// Pointing to default nav container
		// Items and sub-nav templates
		var mainNavElement = document.getElementById('main-nav-container'),
			itemTemplate = "<li class='nav-item'><a class='nav-item-link' href='%url%' target='_blank'>%label%</a>%submenu%</li>",
			submenuTemplate = "<ul class='sub-nav'>%submenu%</ul>";

		/**
		 * Build Navigaton list, in the container provided 
		 * @param  {Object} data      		Parsed JSON with nav information
		 * @param  {HTMLElement} container 	Parent nav element
		 */
		function buildNav (data, container){
			var mainNav = container || mainNavElement;
			mainNav.innerHTML = (constructHTML(data));
			mainNav.addEventListener('click',attachNavListeners);
		}

		/**
		 * Build HTML lists according to JSON parsed info provided
		 * @param  {Array} data Parsed JSON with labels, urls and submenus
		 * @return {String}      Raw HTML containing new lists according data provided
		 */
		function constructHTML (data){
			var dataArray = data.items || data,
				fragment = "",
				submenu = "",
				attrValue,
				itemHTML;

			for (var i = 0, x = dataArray.length; i<x ; i++){
				itemHTML = itemTemplate;

				//Replace each data slot (url, label, sub-nav) in the 
				//templates with the right info
				for(var key in dataArray[i]){
		            attrValue = dataArray[i][key];

		            // Check if in the JSON object, comes an Array with sub-nav information
					if (attrValue instanceof Array){
						if(attrValue.length){
							//Recursive call to build sub-navs
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

		/**
		 * Attach Nav listeners when OnClick event is being triggered
		 * @param  {OnClick} event
		 */
		function attachNavListeners (event){
			var element = event.target,
				elementContainer = element.parentNode,
				submenu = element.nextElementSibling;

			// In the case the item has sub-items, avoid open the link, 
			// then display sub-menu
			if (submenu && submenu.hasChildNodes()){
				event.preventDefault();
				elementContainer.className = toggleClass (elementContainer, 'open');
				displayOverlay(true);
			} else {
				displayOverlay(false);
			}
		}

		/**
		 * Handler of the translucent black overlay
		 * @param  {Boolean} isDisplayed - If the overlay should be 
		 *                               displayed (true) or not(false)
		 */
		function displayOverlay (isDisplayed){
			var overlay = document.getElementsByClassName('overlay')[0],
				overlayClasses = overlay.className;

			if (isDisplayed){
				if (overlayClasses.indexOf('open') == -1) {
					overlay.className = overlayClasses + " open";
				} 
			} else {
				overlay.className = toggleClass(overlay, 'open', !isDisplayed);
			}
		}

		/**
		 * [Return element classes toggling elemClass specifed 
		 * @param  {Object} elem        Element with classes to be modified
		 * @param  {String} elemClass   Class to be toggled
		 * @param  {Boolean} forceRemove If the class should be removed instead of toggled
		 * @return {String}             Element classes with/without the specified class
		 */
		function toggleClass (elem, elemClass, forceRemove){
			var regExp = new RegExp('(\\s|^)' + elemClass + '(\\s|$)');

			return forceRemove || elem.className.indexOf(elemClass) >= 0 ? elem.className.replace(regExp , '' ) : elem.className + " " + elemClass;
		}

		return {
			build : buildNav
		}
	}

	NAVEXERCISE.navigation = new navigation;

})(NAVEXERCISE || {});