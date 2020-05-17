function addData() {
	var pd = '<h1>Persons Data</h1>' 
		    + '<div>' 
		    + '<label>Name:</label>'
			+ '</div>' 
			+ '<div>'
			+ '<input type="text" name="name" id="pname" class="form-control">'
			+ '</div>' 
			+ '<div class="form-group">' 
			+ '<label>Age:</label>'
			+ '<select class="form-control" id="page" name="age">';
	for (var i = 1; i <= 100; i++) {
		pd += '<option>' + i + '</option>';
	}
	pd += '</select>';
	pd += '<div>'
			+ '<label>Gender</label>'
			+ '</div>'
			+ '<div class="btn-group" id="indgen">'
			+ '<label><input type="radio" name="gender" value="male" id="indgen">Male<label>'
			+ '<label><input type="radio" name="gender" value="female" id="indgen">Female</label>'
			+ '</div><br>'
			+ '<div>'
			+ '<label for="lab">Labs</label>'
			+ '</div>'
			+ '<div class="checkbox"><label><input type="checkbox" name="lab" value="Java">Java</label></div>'
			+ '<div class="checkbox"><label><input type="checkbox" name="lab" value="JavaScript">JavaScript</label></div>'
			+ '<div class="checkbox"><label><input type="checkbox" name="lab" value="Python">Python</label></div>'
			+ '<div class="checkbox"><label><input type="checkbox" name="lab" value="PHP">PHP</label></div>'
			+ '<div class="checkbox"><label><input type="checkbox" name="lab" value="HTML">HTML</label></div>'
			+ '<div class="checkbox"><label><input type="checkbox" name="lab" value="DataBase">DataBase</label></div>'
			+ '<div>'
			+ '<button type="button" onclick="pdata()" class="btn btn-primary">Submit</button>'
			+ '</div>';
	$("#personData").html(pd);
}
function pdata() {

	jAjx = {}
	jAjx["name"] = $("#pname").val();
	jAjx["age"] = $("#page").val();
	jAjx["gender"] = $("input[type='radio']:checked").val();
	var labvalues = [];
	$.each($('input[name="lab"]:checked'), function() {
		labvalues.push($(this).val());
	});
	jAjx["lab"] = labvalues;
alert(JSON.stringify(jAjx));
	$.ajax({
		url : 'http://mavensampleapp.herokuapp.com/personDetails',
		type : 'POST',
		contentType : 'application/json',
		data : JSON.stringify(jAjx),
		datatype : 'json',
		success : function(response) {

			console.log("successfully added");

		},
		error : function() {
			console.log('Error while request..');

		}
	});

}

function viewList() {

	$.ajax({
				url : 'http://mavensampleapp.herokuapp.com/tablevalues',
				type : 'GET',
				contentType : "application/json; charset=utf-8",
				dataType : "json",
				success : function(tab) {
					var row = tab.persons;
					alert("hello" + JSON.stringify(tab));

					var tblval = '<h1>Persons List</h1>'
							+ '<table class="table table-bordered table-striped">';
					tblval += '<thead><tr>';

					tblval += '<th>' + "Name" + '</th>';
					tblval += '<th>' + "Gender" + '</th>';
					tblval += '<th>' + "Age" + '</th>';
					tblval += '<th>' + "Labs" + '</th>';
					tblval += '<th>' + "Action" + '</th>';
					tblval += '<th class="hidden">' + "Id" + '</th>';
					tblval += '</tr></thead><tbody>';

					for (var i = 0; i < row.length; i++) {
						tblval += '<tr>';
						tblval += '<td id="pername">' + row[i].name + '</td>';
						tblval += '<td id="pergen">' + row[i].gender + '</td>';
						tblval += '<td id="perage">' + row[i].age + '</td>';
						tblval += '<td id="perlab">' + row[i].lab + '</td>';
						tblval += '<td class="hidden" id="perid">' + row[i].id + '</td>';
						tblval += '<td>'
								+ '<span class="glyphicon glyphicon-edit btn btn-success" id="editdt" name="editbtn" onclick="alterdata(this)">'
								+ '</span>'
								+ '<span id="dt" class="glyphicon glyphicon-trash btn btn-danger" name="dltbtn" onclick="deletedata(this)">'
								+ '</span>'
								+ '<span class="glyphicon glyphicon-ok btn btn-success " id="save" name="savedt" onclick="savebtn(this)" style=display:none; >'
								+ '</span>'
								+ '<span class="glyphicon glyphicon-remove btn btn-danger " id="cancel" name="backdt" onclick="cancelbtn(this)" style=display:none; >'
								+ '</span>'
								+ '<input id="chng" type="hidden" value="'+ row[i].name + ',' + row[i].age + ','+ row[i].gender + ',' + row[i].lab + ',' + row[i].id + '">'+ '</td>' 
								+ '</tr>';
					}

					tblval += '</tbody></table>';
					$("#personData").html(tblval);

				},
				error : function() {
					alert('Error while request..');

				}

			});
}


function alterdata(edt) {

	var ind = edt.closest('tr').rowIndex;

	$(edt).closest('td').find("#editdt").hide();
	$(edt).closest('td').find("#dt").hide();
	$(edt).closest('td').find("#save").show();
	$(edt).closest('td').find("#cancel").show();

	var alterdt = $(edt).closest('tr');
	var editrow = alterdt.find('#chng').val();
	var chdata = editrow.split(",");
	alert(editrow);

	alterdt.find("#pername").html(
			'<input type="text" class="form-control" value="' + chdata[0]
					+ '" id="personname" name="changedname">');

	var selage = '<select class="form-control" id="personage">';
	for (var i = 1; i <= 100; i++) {
		selage += '<option value=' + i + '>' + i + '</option>';
	}

	selage += '</select>';
	alterdt.find("#perage").html(selage);
	alterdt.find(" option[value='" + chdata[1] + "']").attr('selected', true);

	alterdt.find("#pergen").html(
			'<div class="btn-group" id="indgen">'
					+ '<label><input type="radio" name="gender' + ind + '" value="male">Male<label>'
					+ '<label><input type="radio" name="gender' + ind + '" value="female">Female</label>' 
					+ '</div>').find('#indgen [value="' + chdata[2] + '"]:radio').attr('checked', true);
	alterdt.find("#perlab").html(
					'<div class="checkbox"><label><input type="checkbox" name="lab" value="Java">Java</label></div>'
					+ '<div class="checkbox"><label><input type="checkbox" name="lab" value="JavaScript">JavaScript</label></div>'
					+ '<div class="checkbox"><label><input type="checkbox" name="lab" value="Python">Python</label></div>'
					+ '<div class="checkbox"><label><input type="checkbox" name="lab" value="PHP">PHP</label></div>'
					+ '<div class="checkbox"><label><input type="checkbox" name="lab" value="HTML">HTML</label></div>'
					+ '<div class="checkbox"><label><input type="checkbox" name="lab" value="DataBase">DataBase</label></div>');
	for (var i = 3; i < chdata.length; i++) {

		alterdt.find('.checkbox [value="' + chdata[i] + '"]:checkbox ').attr('checked', true);
	}

}
function deletedata(dlt) {
	var currentdt = ' ';
	var currentrow = $(dlt).closest("tr");
	var nm = currentrow.find("#pername").text();
	var age = currentrow.find("#perage").text();
	var gen = currentrow.find("#pergen").text();
	var lab = currentrow.find("#perlab").text();
	var newlab=lab.split(',');
    var id =currentrow.find("#perid").text();
    
	currentdt += 'Name:' + nm + '\n Age:' + age + '\n Gender:' + gen + '\n Lab:' + lab + '\n Id:' +id;
	//alert(id);
	var dr = confirm(currentdt);
	if (dr == true) {
		$(dlt).closest('tr').remove();

		var drow = {"name" : nm, "gender" : gen, "age" : age, "lab" : newlab, "id" : id};

		$.ajax({
			url : 'http://mavensampleapp.herokuapp.com/deleteperson',
			type : 'DELETE',
			contentType : 'application/json',
			data : JSON.stringify(drow),
			success : function(result) {
				// alert(JSON.stringify(result));
				console.log("successfully deleted");

			},
			error : function() {
				console.log('Error while request..');

			}
		});
	}

}

function savebtn(sd) {

	var ind = sd.closest('tr').rowIndex;

	var editedname = $(sd).closest("tr").find("#personname").val();
	var editedage = $(sd).closest("tr").find("#personage").val();
	var editedgen = $(sd).closest("tr").find(
			".btn-group input[name='gender" + ind + "']:checked").val();
	var editedlab = [];
	$(sd).closest("tr").find(".checkbox input[name='lab']:checked").each(
			function() {
				editedlab.push(this.value);
			});
	var id=$(sd).closest("tr").find("#perid").text();
	//var oldval = $(sd).closest('tr').find("#chng").val();
	//var ct = oldval.split(",");
    
	alert(id);
	// var oldName = $(sd).closest('tr').find('#pername').text(ct[0]);
	// var oldName= $(sd).closest('tr').find("#pername").val();
	// alert(oldName);
	//var combinedname = editedname + ':' + ct[0];

	$(sd).closest('tr').find('#pername').empty();
	$(sd).closest('tr').find('#pername').text(editedname);

	$(sd).closest('tr').find('#perage').empty();
	$(sd).closest('tr').find('#perage').text(editedage);

	$(sd).closest('tr').find('#pergen').empty();
	$(sd).closest('tr').find('#pergen').text(editedgen);

	$(sd).closest('tr').find('#perlab').empty();
	$(sd).closest('tr').find('#perlab').text(editedlab);

	$(sd).closest('tr').find("#chng").val(
			editedname + ',' + editedage + ',' + editedgen + ',' + editedlab + ',' +id);

	var svdata = {"gender" : editedgen, "name" : editedname, "lab" : editedlab, "age" : editedage, "id" : id};
	alert(JSON.stringify(svdata));
	$.ajax({
		url : 'http://mavensampleapp.herokuapp.com/editperson',
		type : 'PUT',
		contentType : 'application/json',
		data : JSON.stringify(svdata),
		success : function(ans) {
			// alert(JSON.stringify(result));
			console.log("successfully edited");

		},
		error : function() {
			console.log('Error while request..');

		}

	});

	$(sd).closest('td').find("#editdt").show();
	$(sd).closest('td').find("#dt").show();
	$(sd).closest('td').find("#save").hide();
	$(sd).closest('td').find("#cancel").hide();

}

function cancelbtn(rd) {

	var oldval = $(rd).closest('tr').find("#chng").val();
	var ct = oldval.split(",");

	$(rd).closest('tr').find('#pername').text(ct[0]);

	$(rd).closest('tr').find('#perage').text(ct[1]);

	$(rd).closest('tr').find('#pergen').text(ct[2]);
    
	$(rd).closest('tr').find('#perlab').text(ct[3]);

	$(rd).closest('td').find("#editdt").show();
	$(rd).closest('td').find("#dt").show();
	$(rd).closest('td').find("#save").hide();
	$(rd).closest('td').find("#cancel").hide();

}
