<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Http;
require 'PHPMailer/PHPMailer/src/Exception.php';
require 'PHPMailer/PHPMailer/src/PHPMailer.php';
require 'PHPMailer/PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST" ){

    //Email validation and sending mail
    if(filter_var('manjusk1793@gmail.com',FILTER_VALIDATE_EMAIL)){

        echo "<script>console.log('inside php');</script>";
        /* APi Call uing CUrl */
        // Initialize the curl object
            $curl = curl_init();

            // Set the curl options
            curl_setopt($curl, CURLOPT_URL, $api_);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

            // Execute the curl request
            $response = curl_exec($curl);

            // Close the curl object
            curl_close($curl);

            // Decode the JSON response
            $jsonData = json_decode($response);

    try{

        $mailid=new PHPMailer(true);
        $mailid->isSMTP();
        $mailid->Host='smtp.gmail.com';
        $mailid->SMTPAuth=true;
        $mailid->Username='manjusk017@gmail.com';
        // $mailid->Password='leesgvgvagpsuqbu';
        $mailid->Password='bksqjylsvuqgnrfz';
        $mailid->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mailid->Port=465;
        $mailid->AltBody='Hi '.ucfirst($_POST['user_name']).'.'.' (Since Html Document cannot be loaded),
        here are the details about your added content: Name:,
        Year:,Rating:';

$mailid->setFrom('manjusk017@gmail.com','Manjunath SK');

$mailid->addAddress('manjusk1793@gmail.com',$_POST['user_name']);
$mailid->isHTML(true);

$mailid->Subject='Thank you for Using the website';
$mailid->Body='Hi <b>'.ucfirst($_POST['user_name']).'<b>.<br>'.

'
<!doctype html>
<html lang="en">

<head>
  <title>IMDbzClone</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS v5.2.1 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">

</head>
<body style="background-color:#000;color:#fff;margin:5px 15px;">
<p>Hello Checking Mail...

</body>

</html>
'  ;

$mailid->send();

echo "<script> alert('Message sent! we will send you a confirmation mail.');
        document.location.href='index.html';
      </script>";
    }
    catch(Exception $e){
        echo "error: " .$mailid->ErrorInfo;
    }

}else{
    echo("Given Email is not correct!");
    echo "<script>alert('mail couldnot be sent!Check mail id');</script>";
}

}
else{
    echo "<script>alert('failed to load POST')</script>";

}

?>
