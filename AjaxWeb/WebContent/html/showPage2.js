/**
 * 
 */// 210106
// employeeForm.html 과 연동

/**
 * showPage.js
 */

function showPage() {
	let doc = xhtp.responseXML;

	console.log(doc); // 출력 테스트

	let data = doc.getElementsByTagName('record');
	console.log(data);	 // 출력 테스트

	// 테이블 생성
	let tableTag = document.createElement('table');
	tableTag.setAttribute('border', '1');
	tableTag.setAttribute('id', 'tbl');

	// 아래쪽 function 가져오기
	// title tr
	// data tr =?[배열]
	let headerTr = titleRow(data); //data = 실제 값
	let dataTrs = contentRow(data);

	tableTag.appendChild(headerTr);
	for(let i = 0; i < dataTrs.length; i++) {
	tableTag.appendChild(addBtn(dataTrs[i], delFunc));


	}

document.getElementById('show').appendChild(tableTag);

} // end of showPage()


function delFunc() {
	this.parentNode.parentNode.remove();
	let id = this.parentNode.parentNode.childNodes[0].firstChild.nodeValue;
	let req = new XMLHttpRequest();
	req.open('get', '../deleteEmp?empId=' + id);
	req.send();
	req.onload = function() {
		console.log(req.responseText);
	}
} // end of delFunc()


//오후수업_버튼 추가 및 이벤트 등록
function addBtn(tr, callBackFunc) {
	let butn = document.createElement('button');
	butn.innerHTML = '삭제';
	butn.onclick = callBackFunc;
	let tdTag = document.createElement('td');
	tdTag.appendChild(butn);
	tr.append(tdTag);
	return tr;
}

// Title
function titleRow(result) { //result = 매개변수

	let trTag = document.createElement('tr');
	for (let i = 0; i < result[0].childNodes.length; i++) {
		let tdTag = document.createElement('th');
		let textNode = document.createTextNode(result[0].childNodes[i].nodeName.toUpperCase());
		tdTag.appendChild(textNode);
		trTag.appendChild(tdTag);



	}
	return trTag;

}//end of titleRow

// Content
function contentRow(result) {

	let trTags = [];

	for (let j = 0; j < result.length; j++) {
		let trTag = document.createElement('tr');
		let empId = result[j].childNodes[0].firstChild.nodeValue;
		trTag.setAttribute('id', 'emp_' + empId);

		for (let i = 0; i < result[0].childNodes.length; i++) {
			let tdTag = document.createElement('td');
			let textNode = document.createTextNode(result[j].childNodes[i].firstChild.nodeValue);
			// result[j] = record 단위
			// result[i] = record 하위

			tdTag.appendChild(textNode);
			trTag.appendChild(tdTag);


			trTag.onmouseover = function() {
				trTag.style.backgroundColor = "yellow";
			}//

			trTag.onmouseout = function() {
				trTag.style.backgroundColor = "";
			}//

			trTag.onclick = function() {

				let input = document.getElementsByTagName('input');
				for (i = 0; i < 4; i++) {
					input[i].value = this.childNodes[i].firstChild.nodeValue;
				}
			}


		}
		trTags.push(trTag);

	}//end of contentRow
	return trTags;



}// end of contentRow




