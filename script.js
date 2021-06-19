/*
 * Modandezato Menu Scripts
 * Author: Robin Joshua Del Mundo
 * Version: 1.0
 * Note: So much to do, so many functions, still a novice, a lot of revisions incoming
 * MVC: Control
 * Script: Production
 */

function startup(){
	add_event_listeners();
}

document.addEventListener("DOMContentLoaded", startup);

function add_event_listeners(){

	device_notice();

	setTimeout(()=>{ tap_here_add() }, 4000);
	setTimeout(()=>{ tap_here_remove() }, 10000);

	document.addEventListener('scroll', tap_here_remove);
	document.addEventListener('click', tap_here_remove);

	const noProducts = document.querySelector('.add-a-product');
	noProducts.addEventListener('click', no_items_add_a_product);

	const circlesCount = [...document.querySelectorAll('.circle')];

	circlesCount.map(circle => {
		circle.addEventListener('click', float_circles);
	});

	const copyButton = document.querySelector('.copy-button p');
	copyButton.addEventListener("click", copy_order_form);

	let dropdown = document.querySelector('#product-categories');

	dropdown.addEventListener("change", function(){
		let selectedOption = this[this.selectedIndex];
		let text = selectedOption.text;

		collections_change( filter_text_from_string("Categories:", text) );
	});

	const addToCartButton = document.querySelector('#addToCart');
	
	addToCartButton.addEventListener('click', function(){
		const thisProduct = this.parentElement.parentElement.querySelector('.modal-heading').textContent;
		const thisProductPrice = this.parentElement.parentElement.querySelector('.modal-price').textContent;
		const thisProductQuantity = this.parentElement.parentElement.querySelector('.quantityCart input').value;

		add_to_cart(thisProductQuantity, thisProduct, thisProductPrice);

		addToCartButton.classList.add('no-pointer-events');

		setTimeout( () => { addToCartButton.classList.remove('no-pointer-events') }, 800 );
	});

	document.addEventListener('click', function(e){
	
		if (e.target && e.target.id == 'remove-item'){
			let thisProduct = e.target.parentElement.querySelector('.product').textContent;

			remove_from_cart(thisProduct);
		}
	});

	modal();

}

function collections_change(text){
	let collectionID = text.replace(/\s/g, "").replace("Collection", "-Collection").toLowerCase();
	let newID = collectionID;
	const collection = [...document.querySelectorAll(".collection")];
	let bool = false;

	collection.map( 
		x => {
			if (collectionID.indexOf('-collection') < 1){
				newID = collectionID + '-collection';
			}

			if(x.classList.contains('active') ){
				x.classList.remove('active');
			}

			document.querySelector('.' + newID).classList.add('active');
			bool = true;
	});

	lazy_loading(bool, newID);
}

function lazy_loading(bool, collection){
	const lazy_images_parent = [...document.querySelectorAll('.' + collection + '.active' + ' .item-container')]

	if (bool == true){
		let image = lazy_images_parent.map( x => x.querySelector('.image img').src = x.querySelector('.image img').dataset.src  );
	}

}

function modalHeight(){
	const modalContainer = document.querySelector('.modal-content-container');
	const modalImageContainer = document.querySelector('.modal-image-container');
	const windowHeight = window.innerHeight;
	const windowWidth = window.innerWidth;

	modalImageContainer.style.maxHeight = windowHeight - (windowHeight * 0.2) + 'px';

	if (windowWidth <= 992 ){
		modalImageContainer.style.maxHeight = (windowHeight/2) - ((windowHeight/2) * 0.3) + 'px';
	}
}

function add_class_to_modal_elements(name){
	const modalHeading = document.querySelector('.modal-heading');
	const modalImage = document.querySelector('.modal-image');
	let className = sanitize_text(name);

	modalHeading.classList.add( className );
	modalImage.classList.add( className + '-image' );
}

function remove_classes_from_modal_elements(){
	const modalHeading = document.querySelector('.modal-heading');
	const modalImage = document.querySelector('.modal-image');

	modalHeading.className ="modal-heading";
	modalImage.className = "modal-image";
}

function hide_overflow(scrollAmount){
	const body = document.body;
	const html = document.body.parentElement;

	window.scrollTo(0, scrollAmount - 400);

	html.style.overflowY = 'hidden';
	body.style.overflowY = 'hidden';
}

function visible_overflow(){
	const body = document.body;
	const html = document.body.parentElement;

	html.style.overflowY = 'visible';
	body.style.overflowY = 'visible';
}

function findPos(obj) {
	let curleft = curtop = 0;

	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		return [curleft,curtop];
	}
}

function modal(){
	const closeModal = document.querySelector('.close-modal');
	const imageAll = [...document.querySelectorAll('.image')];
	let openModal, currentSelectPrice, clickedObject, scrollAmount;

	window.onresize = modalHeight;
	window.addEventListener('resize', modalHeight);

	imageAll.map(x => {

		openModal = x;
		openModal.click = modalHeight;
		openModal.addEventListener('click', modalHeight);

		openModal.addEventListener('click', function(e){
			const thisItem = x;
			const thisItemName = x.parentElement.parentElement.querySelector('.product-name');
			const targetName = e.target.parentElement.parentElement.parentElement.querySelector('.product-name');

			if (thisItemName.textContent === targetName.textContent){
				let sanitizedName = sanitize_text(targetName.textContent);
	
				clickedObject = document.querySelector('.' + sanitizedName + '-image');
				scrollAmount = findPos(clickedObject)[1];
			}

			let currentSelect = thisItem.parentElement.parentElement.querySelector('.product-name').textContent;
			let currentSelectDesc = thisItem.parentElement.parentElement.querySelector('.product-desc').innerHTML;
			let currentSelectImage = thisItem.parentElement.parentElement.querySelector('.image img').src;
			if (thisItem.parentElement.parentElement.querySelector('.box-price') != null){
				currentSelectPrice = thisItem.parentElement.parentElement.querySelector('.box-price').textContent;
			}

			modal_open(currentSelect, currentSelectImage, currentSelectDesc, currentSelectPrice, scrollAmount);

		});

	});

	closeModal.addEventListener("click", () => { modal_close() });
}

function modal_open(name, image, info, price, scrollAmount){

	hide_overflow(scrollAmount);

	let className = sanitize_text(name);
	const modalBG = document.querySelector('.modal-bg');
	const modal = document.querySelector('.modal-container');
	const imageModal = document.querySelector('.modal-image-container img');
	const modalHeading = document.querySelector('.modal-heading');
	const modalDesc = document.querySelector('.modal-description');
	const modalPrice = document.querySelector('.modal-price');
	const addToCart = document.querySelector('.addToCartContainer');

	add_class_to_modal_elements(name);

	if (className === 'cookie-cake' || className === 'bite-sized-cookies'){
		modal.querySelector('.' + className).parentElement.querySelector('.addToCartContainer').classList.add('hide');
		modal.querySelector('.' + className).parentElement.querySelector('.modal-price').classList.add('hide');
	} 

	else{
		modal.querySelector('.' + className).parentElement.querySelector('.addToCartContainer').classList.remove('hide');
		modal.querySelector('.' + className).parentElement.querySelector('.modal-price').classList.remove('hide');
	}

	imageModal.src = image;
	imageModal.alt = name;
	modalHeading.textContent = name;
	modalDesc.innerHTML = info;
	modalPrice.textContent = price;
	modal.classList.add('active');
	modalBG.classList.add('active');
}

function modal_close(){
	const modalBG = document.querySelector('.modal-bg');
	const modal = document.querySelector('.modal-container');
	const added = document.querySelector('.added');
	const productQuantity = document.querySelector('.quantityCart input');

	productQuantity.value = 1;
	added.classList.remove('shown');
	modal.classList.remove('active');
	modalBG.classList.remove('active');

	remove_classes_from_modal_elements();
	visible_overflow();
}

function copy_order_form(){

    const orderForm = document.querySelector("#order-form");
    const name = orderForm.querySelector("input[name='order-name']");
    const number = orderForm.querySelector("input[name='order-number']");
    const address = orderForm.querySelector("textarea[name='order-address']");
    const products = orderForm.querySelector("div[name='order-product-quantity']");
    const schedule = orderForm.querySelector("input[name='order-schedule']");
    const modeOfPayment = orderForm.querySelector("input[type='radio'][name='order-mode-of-payment']");
    const modeOfPaymentChecked = orderForm.querySelector("input[type='radio'][name='order-mode-of-payment']:checked") || 'Waley';

    const label_name = name.previousElementSibling.textContent;
    const label_number = number.previousElementSibling.textContent;
    const label_address = address.previousElementSibling.textContent;
    const label_products = products.previousElementSibling.textContent;
    const label_schedule = schedule.previousElementSibling.textContent;
    const label_modeOfPayment = modeOfPayment.parentElement.previousElementSibling.textContent;

    let order_products = [...products.querySelectorAll('.cart-item')];
    let products_final = "";

	order_products.map(x => {
		let product_order_name = x.querySelector('.product').textContent;
    	let product_order_quantity = x.querySelector('.quantity').textContent;
    	let product_order_price = x.querySelector('.total-price').textContent;
    	let product_boxes = ' Box of 6';

    	if (product_order_name == 'Assorted'){
    		product_boxes = ' Box of 8';
    	}

    	products_final += product_order_quantity + 'x ' + product_order_name + ' ' + product_boxes + ' ' + product_order_price + ' PHP' + '\n';
	});

    let totalCopy;

    if (get_total_price() > 0){
    	totalCopy = 'Total Price: ' + get_total_price() + ' PHP';
    } else{
    	totalCopy = "";
    }

    let order = label_name + " " + name.value + '\n';
		order += label_number + " " + number.value + '\n';
		order += label_address + " \n" + address.value + '\n\n';
		order += label_products + " \n" + products_final + '\n';
		order += totalCopy + '\n\n';
		order += label_schedule + '(Year/Month/Day)' + '\n' + schedule.value + '\n\n';
		order += label_modeOfPayment + " " + modeOfPaymentChecked.value;

    let input = document.createElement("textarea");

    if(order){
    	input.value = strip_whitespaces(order);
	    document.body.appendChild(input);
	    input.value = input.value.replace("(i.e. 1 - Assorted Box of 6, etc..)", "")
								 .replace("(Please attach a google map link)", "")
								 .replace("(BPI/BDO/GCash)", "").trim();
	    input.select();
	    document.execCommand("Copy");
	    input.remove();

	    confirm_copy();

	    setTimeout( () => {
	    	scroll_to_socmed();
	      dm_us();
	    }, 500);
    }
}

function tap_here_add(){
	const firstItem = document.querySelector('.item-container:first-child');
	firstItem.querySelector('.tap-bubble-container').classList.add('show');
}

function tap_here_remove(){
	const firstItem = document.querySelector('.item-container:first-child');
	firstItem.querySelector('.tap-bubble-container').classList.remove('show');
}

function confirm_copy(){
	const chatBubble = document.querySelector('.confirm-bubble');
	if (chatBubble.classList.contains('confirming')){
		chatBubble.classList.remove("confirming");
	}
	else{
		chatBubble.classList.add("confirming");
		setTimeout(() => {chatBubble.classList.remove("confirming")}, 2000);
	}
}

function dm_us(){
	const chatBubble = document.querySelector('.socmed-bubble');
	if (chatBubble.classList.contains('dm-us')){
		chatBubble.classList.remove("dm-us");
	}
	else{
		chatBubble.classList.add("dm-us");
		setTimeout(() => {chatBubble.classList.remove("dm-us")}, 6000);
	}
}

function sanitize_text(texts){
	return texts.trim().toLowerCase()
							.replaceAll(" ", "-")
							.replaceAll("'", "")
							.replaceAll("&", "")
							.replaceAll("--", "-");
}

function strip_whitespaces(string){
	return string.replace(/\t+/g, "");
}

function filter_text_from_string(text,string){
	let filtered = string.replace(text, "");
	return filtered;
}

function filter_price_from_string(string){
	let pattern = /[0-9]+/;
	let price = string.slice(string.length - 7);
	let filteredPrice = price.match(pattern);
	return Math.max(filteredPrice);
}

function no_items_add_a_product(){
	scroll_to('.our-products-header');
}

function scroll_to(element){
	const elementToScrollTo = document.querySelector(element);
	const topPos = elementToScrollTo.offsetTop - 0;
	window.scrollTo(0, topPos);
}

function scroll_to_socmed(){
	const socmed = document.querySelector('.socmed');
	const topPos = socmed.offsetTop - 400;
	window.scrollTo(0, topPos);
}

function float_circles(){
	if (this.classList.contains('float')){
		this.classList.remove("float");
	} else {
		this.classList.add("float");
	}
	this.addEventListener("animationend", float_circles);
}

function store_to_cart(quantity, name, price){
	const productQuantityElement = document.querySelector('.order-product-quantity');
	const productQuantityStore = document.createElement('div');
	const productStorage = document.createElement('div');
	const quantityStorage = document.createElement('div');
	const priceStorage = document.createElement('div');
	const totalPriceStorage = document.createElement('div');
	const removeItem = document.createElement('div');

	let sameName, sameNameQuantity, sameNamePrice;
	let added_already_bool = already_added_to_cart(name);
	let sanitizedName = sanitize_text(name);

	if (added_already_bool === true){
		sameName = productQuantityElement.querySelector('.order-' + sanitizedName + ' .product').textContent;
		sameNameQuantity = parseFloat(productQuantityElement.querySelector('.order-' + sanitizedName + ' .quantity').textContent);
		sameNamePrice = parseFloat(productQuantityElement.querySelector('.order-' + sanitizedName + ' .price').textContent);
		
		if (sameName == name){
			let newQuantity = parseInt(quantity) + sameNameQuantity;
			let newPrice = parseFloat(filter_price_from_string(price)) + parseFloat(sameNamePrice * sameNameQuantity);

			productQuantityElement.querySelector('.order-' + sanitizedName + ' .quantity').textContent = newQuantity;
			productQuantityElement.querySelector('.order-' + sanitizedName + ' .total-price').textContent = newPrice;
		}
	}

	else{

		if (sameName != name){
			productQuantityElement.appendChild(productQuantityStore).classList.add('order-' + sanitizedName, 'cart-item');
			productQuantityStore.appendChild(quantityStorage).classList.add('quantity');
			productQuantityStore.appendChild(productStorage).classList.add('product');
			productQuantityStore.appendChild(priceStorage).classList.add('price');
			productQuantityStore.appendChild(totalPriceStorage).classList.add('total-price');
			productQuantityStore.appendChild(removeItem).classList.add('remove-item');

			document.querySelector('.order-product-quantity .order-' + sanitizedName + ' .quantity').textContent = quantity;
			document.querySelector('.order-product-quantity .order-' + sanitizedName + ' .product').textContent = name;
			document.querySelector('.order-product-quantity .order-' + sanitizedName + ' .price').textContent = filter_price_from_string(price);
			document.querySelector('.order-product-quantity .order-' + sanitizedName + ' .total-price').textContent = (parseInt(filter_price_from_string(price)) * parseInt(quantity));
			document.querySelector('.order-product-quantity .order-' + sanitizedName + ' .remove-item').id = 'remove-item';
			document.querySelector('.order-product-quantity .order-' + sanitizedName + ' .remove-item').textContent = '+';

			let productCount = document.querySelectorAll('.order-product-quantity > div').length;
			let filteredPrice = filter_price_from_string(price);
			let totalPrice = filteredPrice * quantity;
		}

	}
	
}

function already_added_to_cart(name){
	let productCount = [...document.querySelectorAll('.order-product-quantity > div')];
	let added = false;
	let product, productName;

	productCount.map(x => {
		let product = x.querySelector('.product');

		if ( product ) {
			productName = product.textContent;
		} else{
			console.error('No product yet');
		}

		let countProduct = 0;

		if (productName == name){
			countProduct += 1;

			if (countProduct > 0){
				added = true;
			} else{
				added = false;
			}
		}

	});

	return added;
}

function add_to_cart(quantity, name, price){
	const productQuantity = document.querySelector('.order-product-quantity');
	const noProducts = document.querySelector('.no-products-yet');
	const added = document.querySelector('.added');
	const addButton = document.querySelector('#addToCart p');
	const windowHeight = window.screen.height;
	const windowWidth = window.screen.width;

	if (windowWidth <= 768 && windowWidth > 600 ){
		addButton.textContent = "Added!";
	} 	else if ( windowWidth <= 600 && windowWidth > 574 ){
		addButton.textContent = "Added!";
	} else{
		addButton.textContent = "Added to Orders!";
	}

	store_to_cart(quantity, name, price);

	added.classList.add('shown');
	noProducts.classList.add('hide');

	display_total_price(get_total_price());

	setTimeout( () => {
		added.classList.remove('shown');
		addButton.textContent = "Add to Order";
	}, 800);

}

function get_total_price(){
	const priceStore = [...document.querySelectorAll('.order-product-quantity > div')];
	let prices;
	let sum = 0;

	priceStore.map(x => {
		prices = x.querySelector('.total-price').textContent;
		sum += parseInt(prices);
	})

	return sum;
}

function remove_from_cart(name){
	const product = document.querySelector('.order-product-quantity');
	let sanitizedName = sanitize_text(name);
	let priceToBeSubtracted = parseFloat(product.querySelector('.order-' + sanitizedName + ' .total-price').textContent);

	product.querySelector('.order-' + sanitizedName).remove();

	let totalPrice = parseFloat(document.querySelector('.total-price-display').textContent);
	let newTotalPrice = totalPrice - priceToBeSubtracted;

	document.querySelector('.total-price-display').textContent = newTotalPrice;

	if (newTotalPrice == 0){
		document.querySelector('.no-products-yet').classList.remove('hide');
		document.querySelector('.total-price-container').classList.remove('show');
	}
}

function display_total_price(price){
	const totalPrice = document.querySelector('.total-price-display');
	const totalPriceContainer = document.querySelector('.total-price-container');

	totalPriceContainer.classList.add('show');
	totalPrice.textContent = price;
}

function okay_device_notice(){
	document.querySelector('.device-notice').classList.remove('show');
}

function device_notice(){
	let str, str2, chromeVersion, browser;
	let desc = platform.description;
	//desc = "Microsoft Edge 46.04.4";

	if ( desc.includes('Mobile') ){
		str = desc.substring(desc.indexOf("Chrome") + 16);
		str2 = desc.substring(desc.indexOf("Chrome") + 0).replace(str, "").replace("Mobile", "");
		chromeVersion = str2.slice(-2);
		browser = str2.slice(0).replace(chromeVersion, "").trim();
	}

	else if ( desc.includes('Edge') ){
		str = desc.substring(desc.indexOf("Edge") + 7);
		str2 = desc.substring(desc.indexOf("Edge") + 0).replace(str, "");
		chromeVersion = str2.slice(-2);
		browser = str2.slice(0).replace(chromeVersion, "").trim();
	}

	else{
		str = desc.substring(desc.indexOf("Chrome") + 9);
		str2 = desc.substring(desc.indexOf("Chrome") + 0).replace(str, "");
		chromeVersion = str2.slice(-2);
		browser = str2.slice(0).replace(chromeVersion, "").trim();
	}

	if ((browser == "Chrome" || "Edge") && chromeVersion < 87){
		document.querySelector('.device-notice').classList.add('show');
	}

	const deviceNoticeOkay = document.querySelector('.device-notice .okay');
	deviceNoticeOkay.addEventListener('click', okay_device_notice);
}