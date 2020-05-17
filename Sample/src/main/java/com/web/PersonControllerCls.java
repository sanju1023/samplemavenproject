package com.web;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PersonControllerCls {

	@Autowired
	PersonServiceImpl service;

	@GetMapping("/newpage")
	public String newpage() {
		return "page";
	}

	@RequestMapping(value = "/personDetails", method = RequestMethod.POST)
	public @ResponseBody void savestudent(@RequestBody Person person) throws Exception {
		service.addPerson(person);
	}

	@RequestMapping(value = "/tablevalues", method = RequestMethod.GET)
	public @ResponseBody String getTableValues() {
       JSONObject personValues = service.getPerson();

		System.out.println(personValues.toString());
		return personValues.toString();

	}

	@RequestMapping(value = "/deleteperson", method = RequestMethod.DELETE)
	public @ResponseBody void deleteValue(@RequestBody Person person) {
		System.out.println(person.getName());
		System.out.println(person.getId());
		service.deletePerson(person);

	}

	@RequestMapping(value = "/editperson", method = RequestMethod.PUT)
	public @ResponseBody void editValue(@RequestBody Person person) {
		System.out.println(person.getName());
		service.updatePerson(person);

	}

}
