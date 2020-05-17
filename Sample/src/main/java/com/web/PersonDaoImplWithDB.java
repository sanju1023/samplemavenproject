package com.web;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class PersonDaoImplWithDB implements PersonDao {
	@Autowired
	private DataSource ds;
	
	public String addPerson(Person person) {
		// TODO Auto-generated method stub
		
		String sql = "INSERT INTO person( name,gender,age,lab )VALUES(?,?,?,?)";
		String string="";
		String[] labs=person.getLab();
		for(String str : labs)
		{
			string += str + ",";
		}
		
		try {
			Connection con=ds.getConnection();
			
			PreparedStatement ps=con.prepareStatement(sql);
			ps.setString(1, person.getName());
			ps.setString(2, person.getGender());
			ps.setInt(3, person.getAge());
			ps.setString(4, string.toString()); 
			
			ps.executeUpdate();
			con.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return person.toString();
	}

	public JSONObject getPerson() {
		String query = "select * from person";
		JSONObject json = new JSONObject();
		Connection con=null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		List<Person> ls=new ArrayList<Person>();
		try {
			con = ds.getConnection();
			ps = con.prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()){
				Person person = new Person();
				
				person.setName(rs.getString("name"));
				person.setGender(rs.getString("gender"));
				person.setAge(rs.getInt("age"));
				person.setId(rs.getInt("id"));
				String[] labs=rs.getString("lab").split(",");
				person.setLab(labs);
				ls.add(person);
				
			}
			json.put("persons", ls);
			rs.close();
			ps.close();
			con.close();
		}catch(SQLException  e) {
			e.printStackTrace();
		}
		
		// TODO Auto-generated method stub
		return json;
	}

	
	public String updatePerson(Person person) {
		// TODO Auto-generated method stub
		String string="";
		String[] labs=person.getLab();
		for(String str : labs)
		{
			string += str + ",";
		}
		String query = "update person set name=?, gender=?, age=?, lab=? where person.id=?";
		Connection con = null;
		PreparedStatement ps = null;
		try{
			con = ds.getConnection();
			ps = con.prepareStatement(query);
			
			ps.setString(1, person.getName());
			ps.setString(2, person.getGender());
			ps.setInt(3, person.getAge());
			ps.setString(4, string.toString());
			ps.setInt(5, person.getId());
			ps.executeUpdate();
			con.close();
			ps.close();
	    }catch(SQLException e){
			e.printStackTrace();
		}
		return null;
	}

	public String deletePerson(Person person) {
		// TODO Auto-generated method stub
		String query = "delete from person where person.id=?";
		Connection con = null;
		PreparedStatement ps = null;
		try{
			con = ds.getConnection();
			ps = con.prepareStatement(query);
			ps.setInt(1, person.getId());
			ps.executeUpdate();
		}catch(SQLException e){
			e.printStackTrace();
		}
		return null;
	}

}

