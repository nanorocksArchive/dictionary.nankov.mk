<?php
	
	require __DIR__ .'/../vendor/autoload.php';
	
	require_once __DIR__ . '/../app/config.php';
	
	require_once __DIR__ . '/../routes/web.php';

	// Starting Flight
	Flight::start();