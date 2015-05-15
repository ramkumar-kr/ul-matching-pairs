<?
session_start();
$json = json_decode($_SESSION["json"],true);
$score = $_GET["score"];
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>

		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>		
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
		<script src="https://code.jquery.com/jquery.min.js" type="text/javascript"></script>
		<style>
			#progressbar{
				width:<?echo $score."%"?>;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="row">
				<div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1">
					<br/>
					<h1 class="h1 text-center">Your Score : <?echo $score?></h1>
					<div class="progress">
  					<div class="progress-bar progress-bar-striped active" role="progressbar" id="progressbar"
  						aria-valuenow= <?echo $score ?> aria-valuemin="0" aria-valuemax="100" >
    					<?echo $score?>
  					</div>
					</div>

					<div><ul class="list-group">
					<?
						for($i=0; $i < count($json);$i++)
						{	
							echo '<li class="list-group-item"><a href="https://www.urbanladder.com/products/'.$json[$i]["id"].'"><img class="img-thumbnail" width = "90px" height="90px" src="'. $json[$i]["image"].'"/><p class="pull-right">'.$json[$i]["name"].'</p></a><br/><br/><br/></li>';
						}				
					?>
					</ul></div>
					<a class="btn btn-block  btn-lg btn-success" href="index.php">Play Again </a>
					<br/>
			</div>
		</div>
	</div>
	</body>
	</html>