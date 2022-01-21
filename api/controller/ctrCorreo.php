<?php
    require_once('./model/mdlCorreo.php');

    class ControllerCorreo{
        static public function sendMailContact($datos){
            $response = ModelCorreo::sendMailContact($datos);
            return $response;
        }

        static public function sendRegPassword($email){
            $pass = ControllerCorreo::generatePassword(12);
            $response = ModelCorreo::sendRegPassword($email, $pass);
            if($response != false){
                $to= $email;
                $subject = 'Recuperar Contrasena';
                $message = 'Su nueva contrasena es: '.$pass.' asegure de cambiarla en cuando entre a su perfil.';
                mail($to, $subject, $message);
                return 'exito';
            }else{
                return false;
            }
        }
        
        static public function generatePassword($length){
            $key = "";
            $pattern = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_*/=#@?!";
            $max = strlen($pattern)-1;
            for($i = 0; $i < $length; $i++){
                $key .= substr($pattern, mt_rand(0,$max), 1);
            }
            return $key;
}
    }
?>