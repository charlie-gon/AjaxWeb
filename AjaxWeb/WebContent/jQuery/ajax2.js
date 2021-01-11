// 210111

$(function () {
    // ajax 호출.
    $.ajax({
        url: '../data/MOCK_DATA.json',
        dataType: 'json',
        success: showContent,
        error: function (result) {
            console.log('에러: ' + result.statusText);
        }
    });

    // button 클릭 이벤트
    $('#btn').on('click', function(){
        $('input:checked').parent().parent().remove();
        // $('tr :checked').parent().parent().remove(); 와 동일
        // tr 태그 사용 시 checked 사이 띄울 것(하위요소를 지정한다는 의미를 가지기 때문)
    });

    // all_check 클릭 이벤트(라이브이벤트방식)
    // $('#all_checked').on('click, function()) ~ 이렇게 하면 안됨(위에서 아래로 컴파일 되는데, id가 선언되기 전 function이 먼저 실행되기 때문)
    // 상위 요소인 document나 'body' 를 활용해야 한다
    $('body').on('click', '#all_check', function(){
        console.log('checked');
        // td태그 하위요소인 input 태그만 적용되도록

        // Ver.01
        $('td > input').prop('checked',$('#all_check').is(":checked"));

        // Ver.02
        // if($('#all_check').is(":checked"))
        //     $('td > input').prop('checked', true);
        // else{
        //    $('td > input').prop('checked', false);
        // }
    });
    
});

function showContent(result) {
    let headers = ['chkbox','id', 'first_name', 'last_name', 'email'];

    let data = result;
    let table = $('<table id="tbl" />').attr('border', '1');
    let titles = $('<tr />');
    
    for (field of headers) {
        let td = $('<td />');
        if(field == 'chkbox'){
            let checkbox = $('<input />').attr('type','checkbox').attr('id','all_check');
            td.attr('width','50px').attr('align','center');
            td.append(checkbox);
        }else{
            td = $('<th />').html(field.replace('_', ' ').toUpperCase());
        }
        titles.append(td);
    }
    table.append(titles);
    $(data).each(function (idx, obj) {
        if (idx < 5) {
            let tr = $('<tr />');
            $(tr).attr('id', obj.id);
            
            $(tr).on({
                'mouseover': function () {
                    $(this).css('background-color', 'turquoise')
                },
                'mouseout': function () {
                    $(this).css('background-color', '')
                }
                });
            for (field of headers) {
                let td = $('<td />');
                if(field == 'chkbox'){
                    let checkbox = $('<input />').attr('type','checkbox');
                    td.attr('align','center'); // align 속성은 td 태그에 적용되어야 한다.(input 아님)
                    td.append(checkbox);
                }else{
                    td.html(obj[field]);
                }
                tr.append(td);
            }
            table.append(tr);
        }
    })
    $('#show').append(table);
}