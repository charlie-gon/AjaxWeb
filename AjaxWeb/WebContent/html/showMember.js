/**
 * 
 */

// exam05

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
	let dataTrs = contentRow(data);

	tableTag.appendChild(headerTr);
	for (let i = 0; i < dataTrs.length; i++) {
		tableTag.appendChild(dataTrs[i]);
	}

	document.getElementById('show').appendChild(tableTag);
}