$(document).ready(function () { // 실행 함수 정의
    $.ajax({ // ajax 호출 메소드
        url: '../data/MOCK_DATA.json',
        dataType: 'json',
        success: showContent,
        error: function (result) {
            console.log('클났네 클났어!: ' + result.statusText);
        }
    });
    // 버튼 이벤트 ver.02('추가' 버튼 클릭 시 데이터 출력)
    $('#btn').click(function () {
        console.log($('.input_val'));
        let inputs = $('.input_val');

        let tr = $('<tr />');

        // 클릭 시 데이터 삭제되는 버튼 생성
        let btnTag = $('<td />');
        let btn = $('<button />').html('삭제');
        $(btn).click(clickToDelete);

        for (let i = 0; i < inputs.length; i++) {
            let td = $('<td />').html(inputs[i].value);
            tr.append(td);
            btnTag.append(btn);
            tr.append(btnTag);
        }
        $('#tbl').append(tr);
    });

    // 찾기 이벤트
    $('#findBtn').on('click',function(){ // on = 해당되는 요소의 이벤트 및 함수 설정
       let findId =  $('#find_id').val();
       $('#' + findId + '').css('background-color','turquoise');
    });
});

// 버튼 이벤트 ver.01('추가' 버튼 클릭 시 데이터 출력)
function btnFunc() {

    console.log($(this));
    let id = $('#id').val();
    let fName = $('#first_name').val();
    let lName = $('#last_name').val();
    let email = $('#email').val();

    let tr = $('<tr />');
    let tdId = $('<td />').html(id);
    let tdFirst = $('<td />').html(fName);
    let tdLast = $('<td />').html(lName);
    let tdEmail = $('<td />').html(email);
    $('#tbl').append($(tr).append(tdId, tdFirst, tdLast, tdEmail));

}

// 아래쪽에 success 함수 기능 정의하여 간결하게 표현
function showContent(result) {
    let headers = ['id', 'first_name', 'last_name', 'email'];
    console.log(result);
    let data = result;

    let table = $('<table id="tbl" />').attr('border', '1');
    let title = $('<tr />');

    for (head of headers) {
        let td = $('<th />').html(head);
        title.append(td);
    }
    table.append(title);

    $.each(data, function (idx, obj) { // = $(data).each(function())
        if (idx < 5) {
            let tr = $('<tr />');
            $(tr).attr('id',obj.id); // tr에 고유 아이디 값 부여

            // 클릭 시 데이터 삭제되는 버튼 생성
            let btnTag = $('<td />');
            let btn = $('<button />').html('삭제');
            $(btn).click(clickToDelete);

            // tr 클릭 시 input에 데이터 출력
            $(tr).click(trToInputFunc); // 아래 trToInputFunc 함수 정의
            $(tr).hover(function(){
                $(this).css('background-color','tomato');
            }, function(){
                $(this).css('background-color','');
            });

            for (field of headers) {
                let td = $('<td />');
                td.html(obj[field]);

                tr.append(td);
                btnTag.append(btn);
                tr.append(btnTag);
            }
            table.append(tr);
        }
    });
    $('#show').append(table);


    // tr 클릭 시 input에 데이터 출력
    function trToInputFunc() {
        console.log($(this).children().eq(0).html());
        console.log($(this).children().eq(0));
        $('#id').val($(this).children().eq(0).html());
        $('#first_name').val($(this).children().eq(1).html());
        $('#last_name').val($(this).children().eq(2).html());
        $('#email').val($(this).children().eq(3).html());

        // eq() = 선택한 요소 중 지정한 인덱스가 참조하는 요소만 선택.
        // val = 선택한 양식(form)의 값을 가져오거나 설정한다.
    }

}

// 버튼 클릭 시 데이터 삭제되는 함수
function clickToDelete() {
    console.log($(this));
    $(this).parent().parent().remove();
}