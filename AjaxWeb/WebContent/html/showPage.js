// 210106
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

	// 아래쪽 function 가져오기
	let headerTr = titleRow(data); //data = 실제 값
	let dataTr = contentRow(data);

	tableTag.appendChild(headerTr);
	for (let i = 0; i < dataTr.length; i++) {
		tableTag.appendChild(dataTr[i]);
	}

	document.getElementById('show').appendChild(tableTag);
}

// Title
function titleRow(result) { //result = 매개변수
	console.log(result[0].childNodes[3].nodeName);

	let trTag = document.createElement('tr');
	for (let i = 0; i < result[0].childNodes.length; i++) {
		let tdTag = document.createElement('th');
		let textNode = document.createTextNode(result[0].childNodes[i].nodeName.toUpperCase());
		tdTag.appendChild(textNode);
		trTag.appendChild(tdTag);
		
		//tdTag onmouseover/out
		tdTag.onmouseover = function() {
			tdTag.style.backgroundColor = "yellow";
		}
		tdTag.onmouseout = function() {
			tdTag.style.backgroundColor = "";
		}// tdTag onmouseover/out end
		
	}

	return trTag;




}//end of titleRow

// Content
function contentRow(result) {

	let trTags = [];

	for (let j = 0; j < result.length; j++) {
		let trTag = document.createElement('tr');
		for (let i = 0; i < result[0].childNodes.length; i++) {
			let tdTag = document.createElement('td');
			let textNode = document.createTextNode(result[j].childNodes[i].firstChild.nodeValue);
			// result[j] = record 단위
			// result[i] = record 하위

			tdTag.appendChild(textNode);
			trTag.appendChild(tdTag);
		}

		// td에 onmouseover/out 적용

		trTag.onmouseover = function() {
			trTag.style.backgroundColor = "turquoise";
		}

		trTag.onmouseout = function() {
			trTag.style.backgroundColor = "";
		}

		// td에 onmouseover/out 적용
		//trTag.addEventListener("mouseover", function(event){
		//	event.target.style.backgroundColor = "yellow";

		//});

		//trTag.addEventListener("mouseout",function(event){
		//	event.target.style.backgroundColor = "";
		//});


		// 임의 버튼 추가
		let button = document.createElement('button');
		button.innerHTML = '삭제';
		button.onclick = function() {

			// parentNode 하나씩 추가 할때마다 td-tr-table 순으로 적용됨
			console.log(this.parentNode.parentNode.remove());
			let id = this.parentNode.parentNode.childNodes[0].firstChild.nodeValue;
			let req = new XMLHttpRequest();
			req.open('get', '../deleteEmp?empId=' + id);
			req.send();
			req.onload = function() {
				console.log(req.responseText);
			}
		}
		let tdTag = document.createElement('td');
		tdTag.appendChild(button);
		trTag.appendChild(tdTag);

		trTags.push(trTag);

	}//end of contentRow
	return trTags;

}// end of contentRow
