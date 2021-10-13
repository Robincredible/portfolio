/*
* Modandezato Menu Scripts
* Author: Robin Joshua Del Mundo
*/

function startup(){
	add_event_listeners();
}

document.addEventListener("DOMContentLoaded", startup);

function add_event_listeners(){
	const about = document.querySelector('.theme-toggle');
	about.addEventListener('click', toggle_dark_mode);
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