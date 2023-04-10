<html lang="en">
<head>
	<meta charset="utf-8">
	<link href="assets/css/boilerplate.css" rel="stylesheet" type="text/css">
	<link href="assets/css/styles.css" rel="stylesheet" type="text/css">
	<link href="styles.css" rel="stylesheet" type="text/css">
	<title> Contact Me! </title>
	<link rel="icon" href="assets/coding_icon.png">
</head>
<body>
<div class="container">
<header>
	<a href="index.html">
	<img src="assets/Banner.png" alt="Jonathan Park Banner Portfolio Logo">
	</a>
</header>
</div>
	<nav class="fluid nav_ul" style="text-align: center" >
		<a href="index.html"> Index </a> - 
		<a href="about.md"> About Me </a> - 
		<a href="Services.md"> Services </a> -
		<a href="Contact.md"> Contact </a>
	</nav>
<div class="fluid intro_paragraph">
	<img src="assets/forms-concept-illustration.jpg" alt="forms image" width="335" height="209" class= "img">
	<a href="http://www.freepik.com" style="text-align:center">Designed by stories / Freepik</a>
	<h1>Please contact me!</h1>
  <p>Generally, I should be available to contact!</p>
  <p>Leave your contact and inquiries below:</p><br>

<form action="action_page.php" method="post">
	<label for="First_Name">First Name:</label>
		<input type="text" id="First_Name" name="First_Name"><br><br>

	<label for="Last_Name">Last Name:</label>
		<input type="text" id="Last_Name" name="Last_Name"><br><br>
	
	<label for="Email">*Email:</label>
		<input type="text" id="Email" name="Email" required ><br><br>
		
	<label for="Messages">*Tell me what you want to say!</label><br>
	<textarea id="Messages" name="Messages" placeholder="Write here!" required></textarea><br>
	<p>*Important boxes you need to fill!</p>
	<input type="Submit" value="Submit" >
</form>
</div>
<div class="Handles">
	<h3>Here are my handles!</h3>
		<a href="mailto:jjpark1@my.waketech.edu">
		<img src="assets/Email_Icon.png" alt="Email" style="width:4%" title="E-mail">
		</a>
		<a href="https://www.linkedin.com/in/jonathan-park-653736265/">
		<img src="assets/Linkedin_Icon.png" alt="LinkedIn" style="width:4%" title="Linkedin">
		</a>
		<a href="https://github.com/simplemilk">
		<img src="assets/Github_Icon.png" alt="Github" style="width:4%" title="Github">
		</a>
</div>
<div class="fluid footer_div" style="text-align: center">
	<span class="small_text">
		Copyright 2023<br> 
		Last updated on February 19, 2023
	</span>
</div>
</body>
</html>
