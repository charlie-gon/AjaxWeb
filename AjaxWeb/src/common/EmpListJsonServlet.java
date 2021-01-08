// 210108
// JSON 첫 수업

package common;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/empListJson")
public class EmpListJsonServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public EmpListJsonServlet() {
        super();
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		EmpDAO dao = new EmpDAO();
		List<EmployeeVO> list = dao.getEmpList();
		
		//JSON 파일 형식에 맞게 작성
		//JSON 파일 노트패드로 열어 형식 참고할 것
		String jsonFile = "[";
		int i = 1;
		for(EmployeeVO emp : list) {
			
		jsonFile += "{";
		jsonFile += "\"id\":"+emp.getEmployeeId()+"";
		jsonFile += ",\"firstName\":\""+emp.getFirstName()+"\"";
		jsonFile += ",\"lastName\":\""+emp.getLastName()+"\"";
		jsonFile += ",\"email\":\""+emp.getEmail()+"\"";
		jsonFile += ",\"salary\":\""+emp.getSalary()+"\"";
		jsonFile += "}";
		
		//마지막 데이터 처리
		//마지막 데이터 = , 제거
		//마지막 데이터 아니면 = , 추가
		if(list.size() != i++) {
			jsonFile += ",";
		}
		
		}
		
		jsonFile += "]";
		
		response.getWriter().append(jsonFile);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
