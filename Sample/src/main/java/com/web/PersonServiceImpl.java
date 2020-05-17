package com.web;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonServiceImpl implements PersonService {

	@Autowired
	private PersonDaoImplWithDB dao;

	public JSONObject getPerson() {
		// TODO Auto-generated method stub
		return dao.getPerson();
	}

	public String addPerson(Person person) {
		return dao.addPerson(person);
	}

	public String updatePerson(Person person) {
		return dao.updatePerson(person);

	}

	public String deletePerson(Person person) {
		return dao.deletePerson(person);
	}

}

