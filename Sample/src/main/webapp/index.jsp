<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1" isELIgnored="false"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>DemoWebProject</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script src="scriptfile/PersonData.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-3">
				<div>
					<button type="button" class="btn btn-light" onclick="addData()">Add
						Data</button>
					<br> <br>
					<button type="button" class=" btn btn-light" onclick="viewList()">List
						of Data</button>
					<div id="feedback"></div>
				</div>
			</div>
			<div class="col-md-9" id="personData"></div>
		</div>
	</div>
</body>
</html>

