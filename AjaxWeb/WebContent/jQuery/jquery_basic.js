//ready = document를 다 읽은 다음 내부 기능 수행하시오
$(document).ready(function () {
    console.log('second');
    console.log(document.getElementById('food_1').childNodes[0].childNodes.nodeValue);
    
    console.log(document.getElementById('food_1').childNodes[1].firstChild.nodeValue); //한식!

    //제이쿼리 표현식
    //children = childNode
    console.log($('#food_1').children().eq(0).html());
    //스타일 지정
    $('#food_1 > ul > li').eq(0).css('background', 'red');
    $('#food_1 > ul > li').eq(1).html('bulgogi'); //값 삽입
}); 