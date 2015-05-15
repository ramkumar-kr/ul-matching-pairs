<?php
error_reporting(E_ERROR);
session_start();
$content=file_get_contents("https://script.google.com/macros/s/AKfycbwFYj0LiqWIFM4m3q0W_WD9bw5fuOEZO3gxYFI0JRe1_JgLDo5w/exec");
$json = json_decode($content,true);
//var_dump($json);
for($i=0; $i < count($json);$i++)
{
	copy($json[$i]["image"], 'tmp/'.$i.'.png');
}
$_SESSION["json"]=$content;


?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>		
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="pairs.css" type="text/css" media="screen" charset="utf-8" />	
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">	
		<script src="lib/mootools/mootools-1.2-all.js" type="text/javascript"></script>  
		<script src="pairs.js" type="text/javascript"></script>
<script type="text/javascript" charset="utf-8">
			function initPage() {
				window.setTimeout(function(){},4000);
				var width = 768;
				var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
				console.log("Width : "+width);
				console.log("Height : "+ height);
				var cols = 4, rows = 6;
				
				var pairsGame = new PairsGame({
					containerId: 'playfield',
					cardWidth: width/5,
					cardHeight: height/8,
					cols: cols,
					rows: rows,
					imageBase: 'tmp/',
					//imageBase: 'https://www.urbanladder.com/assets/',
					hiddenImage: 'tmp/logo_new.png', 
					/* hiddenImage: 'images/schneeschuhe_big.jpg',*/
					images: ['0.png','1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png','11.png']
					//images: ['logo.png','logo_new.png']
				});		
			}



			window.addEvent('domready', initPage);	
 
		</script>		
		
		<title>Pairs Game</title>
	</head>
	<body>
		<div class="container" id="page">
			<div class="row">
				<div class="col-lg-4 col-md-4 col-sm-8 col-xs-8 col-lg-offset-4 col-md-offset-4 col-sm-offset-2 col-xs-offset-2">
					<a class="btn btn-lg btn-warning" onclick="initPage();return false;" href="#">Restart Game</a>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1">
					<div id="playfield"></div>
				</div>
			</div>
		</div>

	</body>
</html>