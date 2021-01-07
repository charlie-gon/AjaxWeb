package common;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class PutEmpServlet
 */
@WebServlet("/addEmp")
public class PutEmpServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public PutEmpServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		// request.getParameter() = 클라이언트로부터 들어온 요청을 분석하는 것
		String fName = request.getParameter("fName");
		String lName = request.getParameter("lName");
		String email = request.getParameter("email");
		String jobId = request.getParameter("jobId");
		
		EmployeeVO vo = new EmployeeVO();
		vo.setFirstName(fName);
		vo.setLastName(lName);
		vo.setEmail(email);
		vo.setJobId(jobId);
		
		EmpDAO dao = new EmpDAO();
		EmployeeVO v = dao.insertEmp(vo);
		
		// 순서 중요!
		String result = "<result>";
		result += "<empId>" + v.getEmployeeId() + "</empId>";
		result += "<fName>" + v.getFirstName() + "</fName>";
		result += "<lName>" + v.getLastName() + "</lName>";
		result += "<email>" + v.getEmail() + "</email>";
		result += "<hDate>" + v.getHireDate() + "</hDate>";
		result += "<jId>" + v.getJobId() + "</jId>";
		result += "<salary>" + v.getSalary() + "</salary>";
		result += "</result>";
		
		response.getWriter().append(result);
		// getWriter method  = returns an object of PrintWriter class
		// response 변수는 클라이언트로부터 들어온 요청을 수행하여
		// response.getWriter() 메소드로 스트림(데이터 흐름)에 텍스트 기록
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
