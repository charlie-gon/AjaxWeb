// 210111
// $(document).ready(function(){}) 방식 대신 -> $(function()) 이렇게 해도 됨

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
    // 버튼이벤트.
    $('#btn').click(addRow);
    // 찾기 이벤트
    $('#findBtn').on('click', function () {
        let findId = $('#find_id').val();
        let findRow = $('#' + findId + '').css('background-color', 'gray')
        // 신규 row 생성.
        let tr = makeNewTr();
        findRow.before(tr);
        // after = 해당 ID값 이전에 값 삽입
        // before = 해당 ID값 이후에 값 삽입
    });
});

function makeNewTr() {
    let inputs = $('.input_val');
    let tr = $('<tr />');
    $(tr).click(trToInputFunc);
    $(tr).hover(function () {
        $(this).css('background-color', 'yellow');
    }, function () {
        $(this).css('background-color', '');
    });
    for (let i = 0; i < inputs.length; i++) {
        let td = $('<td />').html(inputs[i].value);
        tr.append(td);
    }
    return tr;
}

function addRow() {
    let tr = makeNewTr();
    $('#tbl').append(tr);
}

function btnFunc() {
    console.log($(this));
    let tr = $('<tr />');
    let tdId = $('<td />').html($('#id').val());
    let tdFirst = $('<td />').html($('#first_name').val());
    let tdLast = $('<td />').html($('#last_name').val());
    let tdEmail = $('<td />').html($('#email').val());
    let trVal = $(tr).append(tdId, tdFirst, tdLast, tdEmail);
    $('#tbl').append(trVal);
}

function showContent(result) {
    let headers = ['id', 'first_name', 'last_name', 'email'];
    let data = result;
    let table = $('<table id="tbl" />').attr('border', '1');
    let titles = $('<tr />');
    for (field of headers) {
        let td = $('<th />').html(field.replace('_', ' ').toUpperCase());
        titles.append(td);
    }
    table.append(titles);
    $(data).each(function (idx, obj) {
        if (idx < 5) {
            let tr = $('<tr />');
            $(tr).attr('id', obj.id);

            // $(tr).click(trToInputFunc);
            // $(tr).mouseover(function () {
            //     $(this).css('background-color', 'yellow')
            // })
            // $(tr).mouseout(function () {
            //     $(this).css('background-color', '')
            // })

            // 교재 247-248 참고
            $(tr).on({
                'click': trToInputFunc,
                'mouseover': function () {
                    $(this).css('background-color', 'yellow')
                },
                'mouseout': function () {
                    $(this).css('background-color', '')
                }
            });


            for (field of headers) {
                let td = $('<td />');
                td.html(obj[field]);
                tr.append(td);
            }
            table.append(tr);
        }
    })
    $('#show').append(table);
}

function trToInputFunc() {
    console.log($(this).children().eq(0).html());
    $('#id').val($(this).children().eq(0).html());
    $('#first_name').val($(this).children().eq(1).html());
    $('#last_name').val($(this).children().eq(2).html());
    $('#email').val($(this).children().eq(3).html());
}