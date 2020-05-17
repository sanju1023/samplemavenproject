package com.web;
import org.json.JSONObject;

public interface PersonDao {
	
    public JSONObject getPerson();
	
	public String addPerson(Person person);
	
	public String updatePerson(Person person);
	
	public String deletePerson(Person person);


}
