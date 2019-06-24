<?php
	// Database connection
	Flight::register('db', 'PDO', array('sqlite:' . __DIR__ . '/../db/mydb.db'));
	
	// Set twig as template engine
	$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/View');
	$twig = new \Twig\Environment($loader, [
		'cache' => false
	]);
	Flight::set('twig', $twig);

	// Autoload for controllers / Can be changed with psr-4 and namespaces ?
	spl_autoload_register(function($class){
		require_once __DIR__ . "/../app/Controller/{$class}.php";
	});