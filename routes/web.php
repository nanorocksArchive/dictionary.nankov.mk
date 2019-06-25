<?php

//Routes here
Flight::route('GET /', array('EnWordController','load'));
Flight::route('GET /api/search/@name', array('EnWordController','searchWordByName'));
Flight::route('GET /api/search/like/@name', array('EnWordController','searchWordLikeName'));

// 404 page
Flight::map('notFound', function(){
    echo '<h2 class="error">404 PAGE NOT FOUND !!!</h2>';
});