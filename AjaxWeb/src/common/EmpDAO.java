//210105

package common;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class EmpDAO {
	
	Connection conn = null;
	
	public EmpDAO() { // static이므로 인스턴스 없이 바로 실행 가능
		try {
			String user = "hr"; // hr로 수정
			String pw = "hr"; // hr로 수정
			String url = "jdbc:oracle:thin:@localhost:1521:xe";

			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = DriverManager.getConnection(url, user, pw);

			System.out.println("Database에 연결되었습니다.\n");

		} catch (ClassNotFoundException cnfe) {
			System.out.println("DB 드라이버 로딩 실패 :" + cnfe.toString());
		} catch (SQLException sqle) {
			System.out.println("DB 접속실패 : " + sqle.toString());
		} catch (Exception e) {
			System.out.println("Unknown error");
			e.printStackTrace();
		}
	}//end of 생성자
	
	// 삭제 기능 추가_210106
	public boolean deleteEmp(EmployeeVO vo) {
		String sql = "delete from emp_temp where employee_id = ?";
		int r = 0;
		try {
			PreparedStatement pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, vo.getEmployeeId());
			
			r = pstmt.executeUpdate();
			System.out.println(r + "건 삭제됨.");
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//r값 1이면 true or false
		return r == 1 ? true : false;
		
	} // end of deleteEmp
	
	public List<EmployeeVO> getEmpList() {
		String sql = "select * from emp_temp order by 1 desc";
		List<EmployeeVO> list = new ArrayList<>();
		
		try {
			PreparedStatement pstmt = conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			while(rs.next()) {
				EmployeeVO vo = new EmployeeVO();
				vo.setEmployeeId(rs.getInt("employee_id"));
				vo.setFirstName(rs.getString("first_name"));
				vo.setLastName(rs.getString("last_name"));
				vo.setEmail(rs.getString("email"));
				vo.setPhoneNumber(rs.getString("phone_number"));
				vo.setHireDate(rs.getString("hire_date"));
				vo.setJobId(rs.getString("job_id"));
				vo.setSalary(rs.getInt("salary"));
				
				list.add(vo);
				
			}
		}catch(SQLException e) {
			e.printStackTrace();
		}finally {
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		return list;
	}//end of getEmpList()
	
	
}
