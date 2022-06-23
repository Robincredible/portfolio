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

	console.log(time);

	if (time >= 18 && time >= 6) {
		doc.classList.add('dark-mode');
		para.innerHTML = 'Night Mode: On';
	}
}