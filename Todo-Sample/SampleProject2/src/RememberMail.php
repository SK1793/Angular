<?php

use  PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../PHPMailer-master/src/Exception.php';
require '../PHPMailer-master/src/PHPMailer.php';
require '../PHPMailer-master/src/SMTP.php';


    //Email validation and sending mail

     echo "<script>console.log('inside PHP')</script>";
    // echo "<script>console.log('".$_POST['_id']."')</script>";
    // echo "<script>alert('".$_POST['_id']."')</script>";
    if(filter_var($_POST['userMail'],FILTER_VALIDATE_EMAIL)){

        /* APi Call uing CUrl */
        // Initialize the curl object

            // Decode the JSON response
            // echo "<script>alert(Title: ".$jsonData->title.")</script>";

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
        $mailid->AltBody='Hi '.'.'.' (Since Html Document cannot be loaded),
        here are the details about your added content: Name:,
        Year:,Rating:';

$mailid->setFrom('manjusk017@gmail.com','Manjunath SK');

$mailid->addAddress($_POST['userMail'],"manjunath");
$mailid->isHTML(true);

$mailid->Subject='Verification Code';
$mailid->Body='Hi <b>'.ucfirst($_POST['userMail'] ).'<b>.<br>'.

'The Verification code for Password Reset is:
'. $_POST['VerCode'];

$mailid->send();

echo "<script> alert('Message sent!Check the mail for Verification Code.');
      </script>";
    }
    catch(Exception $e){
        echo "error: " .$mailid->ErrorInfo;
    }

}else{
    echo("Given Email is not correct!");
    echo "<script>alert('mail couldnot be sent!Check mail id');</script>";
}



?>
