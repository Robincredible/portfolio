/*
* Modandezato Menu Scripts
* Author: Robin Joshua Del Mundo
*/

function startup(){
	apply_mode_on_load();
	add_event_listeners();
}

document.addEventListener("DOMContentLoaded", startup);

function add_event_listeners(){
	const about = document.querySelector('.theme-toggle');

	about.addEventListener('click', toggle_dark_mode);
	window.addEventListener('scroll', onScroll);
}

function toggle_dark_mode(){
	const doc = document.body.parentElement;
	const button = document.querySelector('#theme-toggle');
	const para = document.querySelector('.about p');

	if (doc.classList.contains('dark-mode') ){
		doc.classList.remove('dark-mode');
		para.innerHTML = 'Night Mode: Off';
	} else{
		doc.classList.add('dark-mode');
		para.innerHTML = 'Night Mode: On';
	}
}

function get_client_time(){
	const time = new Date().getHours();
	return time;
}

function apply_mode_on_load(){
	const doc = document.body.parentElement;
	const para = document.querySelector('.about p');
	const time = get_client_time();

	if (time >= 18 && time >= 6) {
		doc.classList.add('dark-mode');
		para.innerHTML = 'Night Mode: On';
	}
}

function onScroll(){
	const scroll = window.scrollY;
	const body = document.body;
	const keyMessage = document.querySelector(".key-message");
	const downArrow = document.querySelector(".down-arrow");
	const upArrow = document.querySelector(".up-arrow");

	if (scroll > (keyMessage.offsetHeight * 0.8)){
		remove_class_on_scroll(downArrow, "visible");
	} else {
		add_class_on_scroll(downArrow, "visible");
	}

	if ( scroll >= (body.offsetHeight - 1200)){
		add_class_on_scroll(upArrow, "visible");
	} else {
		remove_class_on_scroll(upArrow, "visible");
	}

}

//e == element, c == class
function remove_class_on_scroll(e, c){
	e.classList.remove(c);
}

function add_class_on_scroll(e, c){
	e.classList.add(c);
}