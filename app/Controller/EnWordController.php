<?php
	
	use \App\Model\WordRepository;
	
	/**
	 * Class EnWordController
	 */
	class EnWordController
	{
		/**
		 *
		 */
		public static function load()
		{
			$twig = Flight::get('twig');
			echo $twig->render('home.html.twig', ['name' => 'Fabien']);;
		}
		
		/**
		 * Json response - search by name
		 * @param $name
		 */
		public static function searchWordByName($name)
		{
			$wer = new WordRepository(Flight::db());
			$data = $wer->searchByName($name);
			echo Flight::json($data);
		}
		
		/**
		 * Json response - search by pattern
		 * @param $pattern
		 */
		public static function searchWordLikeName($pattern)
		{
			$wer = new WordRepository(Flight::db());
			$data = $wer->searchLikeName($pattern);
			echo Flight::json($data);
		}
		
	}