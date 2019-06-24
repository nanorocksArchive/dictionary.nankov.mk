<?php
	
	namespace App\Model;
	
	/**
	 * Class Word
	 * @package App\Model
	 */
	class Word
	{
		
		/**
		 * @var string
		 */
		protected $wordKey;
		
		/**
		 * @var string
		 */
		protected $wordValue;
		
		/**
		 * Set word key
		 * @param $key
		 */
		public function setWordKey($key)
		{
			$this->wordKey = $key;
		}
		
		/**
		 * @return string
		 */
		public function getWordKey()
		{
			return $this->wordKey;
		}
		
		/**
		 * Set word value
		 * @param $value
		 */
		public function setWordValue($value)
		{
			$this->wordValue = $value;
		}
		
		/**
		 * @return string
		 */
		public function getWordValue()
		{
			return $this->wordValue;
		}
	}