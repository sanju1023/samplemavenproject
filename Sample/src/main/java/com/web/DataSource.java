package com.web;


import java.sql.Connection;
import java.sql.DriverManager;
import org.springframework.stereotype.Component;
@Component
public class DataSource {
	
	public Connection getConnection() {
		Connection con = null;

		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://remotemysql.com:3306/dSfcCIX0z7", "dSfcCIX0z7", "WYSngDMDjW");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return con;
	}


}

