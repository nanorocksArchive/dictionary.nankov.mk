<?php

//Routes here
Flight::route('GET /', array('EnWordController','load'));
Flight::route('GET /api/search/@name', array('EnWordController','searchWordByName'));
Flight::route('GET /api/search/like/@name', array('EnWordController','searchWordLikeName'));

// 404 page
Flight::map('notFound', function(){
    echo '<h2 style="height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center; color: #6b6e72;font-family: ZCOOL KuaiLe, cursive;">404 PAGE NOT FOUND !!!</h2>';
});