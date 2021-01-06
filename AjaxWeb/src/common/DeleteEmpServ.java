//210106

package common;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class DeleteEmpServ
 */
@WebServlet("/deleteEmp")
public class DeleteEmpServ extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public DeleteEmpServ() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//localhost/AjaxWeb/deleteEmp?empId=?
		
		String id = request.getParameter("empId"); // empId = parameter name
		
		//null 발생했을 경우 처리하는 구문
		//null값을 parseInt하면 에러 발생하므로 아래와 같이 null값 처리 구문 삽입
		id = id == null ? "0" : id; 
		
		int employeeId = Integer.parseInt(id); 		
		EmployeeVO vo = new EmployeeVO();
		vo.setEmployeeId(employeeId);
		
		EmpDAO dao = new EmpDAO();
		dao.deleteEmp(vo);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
