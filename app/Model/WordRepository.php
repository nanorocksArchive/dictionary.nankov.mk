<?php
	
	namespace App\Model;
	
	/**
	 * Class WordRepository
	 * @package App\Model
	 */
	class WordRepository extends Word
	{
		/**
		 * @var string
		 */
		protected $db;
		
		/**
		 * WordRepository constructor.
		 */
		public function __construct($db)
		{
			$this->db = $db;
		}
		
		/**
		 * Search word by name
		 * @param $wordKey
		 * @return mixed
		 */
		public function searchByName($wordKey)
		{
			$this->setWordKey($wordKey);
			$word = $this->db->query("SELECT * FROM WORD WHERE WORD_KEY = :wordKey");
			$word->execute(array(':wordKey' => $this->getWordKey()));
			return $word->fetchAll();
		}
		
		/**
		 * Search word by pattern
		 * @param $pattern
		 * @return mixed
		 */
		public function searchLikeName($pattern)
		{
			$this->setWordKey($pattern);
			$word = $this->db->query("SELECT WORD_KEY FROM WORD WHERE WORD_KEY LIKE :pattern");
			$word->execute(array(':pattern' => $this->getWordKey() . "%"));
			return $word->fetchAll();
		}
	}