//210105
//boardList.html


package common.changon;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class studentServlet
 */
@WebServlet("/studentServlet")
public class studentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public studentServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		studentDAO dao = new studentDAO();
		List<studentVO> list = dao.getStdList();
		String xml = "<dataset>";
		
		for(studentVO std : list) {
			xml += "<record>";
			xml += "<empNo>" + std.getEmpNo() + "</empNo>"
					+ "<firstName>" + std.getFirstName() + "</firstName>"
					+ "<lastName>" + std.getLastName() + "</lastName>"
					+ "<email>" + std.getEmail() + "</email>";
			xml += "</record>";
		}
		xml += "</dataset>";
		response.getWriter().append(xml);
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
