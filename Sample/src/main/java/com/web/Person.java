package com.web;

public class Person {
	private String name;
	private String gender;
	private int age;
	private String[] lab;
    private int Id;
    
	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String[] getLab() {
		return lab;
	}

	public void setLab(String[] list) {
		this.lab = list;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

}

