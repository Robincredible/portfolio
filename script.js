/*
* Modandezato Menu Scripts
* Author: Robin Joshua Del Mundo
*/

function startup(){
	add_event_listeners();
}

document.addEventListener("DOMContentLoaded", startup);

function add_event_listeners(){
	const about = document.querySelector('.about');
	about.addEventListener('click', toggle_dark_mode);
}

function toggle_dark_mode(){
	const doc = document.body.parentElement;

	if (doc.classList.contains('dark-mode') ){
		doc.classList.remove('dark-mode');
	} else{
		doc.classList.add('dark-mode');
	}
}