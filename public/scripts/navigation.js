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
			toggleButton = document.getElementsByClassName('navbar-toggle')[0],
			itemTemplate = "<li class='nav-item %has-children%'><a class='nav-item-link' href='%url%' target='_blank'>%label%</a>%submenu%</li>",
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
			toggleButton.addEventListener('click',attachNavToggleListener);
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
						submenu = "";
						if(attrValue.length){
							//Recursive call to build sub-navs
							submenu = submenuTemplate.replace('%submenu%', constructHTML(attrValue));
						} 
						itemHTML = submenu ? itemHTML.replace('%has-children%','has-children') : itemHTML.replace('%has-children%','');
					} else {
						itemHTML = itemHTML.replace('%'+key+'%',attrValue);
					}   
		        }
		        itemHTML = itemHTML.replace('%submenu%',submenu).replace('%has-children%','');
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
				if (elementContainer.className.indexOf('open')>=0){
					displayOverlay(true);
					event.stopPropagation();
					document.addEventListener('click',clickOutsideHandler); 
				} else {
					displayOverlay(false);
				}
			} else {
				displayOverlay(false);
			}
		}

		/**
		 * Handle behaviors for burguer menu
		 * @param  {OnClick} event [description]
		 */
		function attachNavToggleListener (event) {
			toggleButton.className = toggleClass(toggleButton, 'collapsed');
			mainNavElement.parentNode.className = toggleClass(mainNavElement.parentNode, 'collapsed');
			slideSite();
		}

		/**
		 * Handler of the translucent black overlay
		 * @param  {Boolean} isDisplayed - If the overlay should be 
		 *                               displayed (true) or not(false)
		 */
		function displayOverlay (isDisplayed){
			var overlay = document.getElementsByClassName('overlay')[0],
				overlayClasses = overlay.className,
				elementsOpen,
				element;

			if (isDisplayed){
				if (overlayClasses.indexOf('open') == -1) {
					overlay.className = overlayClasses + " open";
				}
			} else {
				elementsOpen = document.getElementsByClassName('open');
				for (var i=0, x=elementsOpen.length; i<x; i++){
					element = elementsOpen[0];
					element.className = toggleClass(element, 'open', true);
				}
			}
		}

		function clickOutsideHandler(event){
			displayOverlay(false);
			document.removeEventListener('click',clickOutsideHandler);
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

		function slideSite(display){
			var slide = display || toggleButton.className.indexOf('collapsed') >= 0,
				title = document.getElementsByClassName('main-title')[0],
				content = document.getElementsByClassName('content')[0];
			
			displayOverlay(!slide);
			title.className = toggleClass (title, 'slide');
			content.className = toggleClass (content, 'slide');
		}

		return {
			build : buildNav
		}
	}

	NAVEXERCISE.navigation = new navigation;

})(NAVEXERCISE || {});