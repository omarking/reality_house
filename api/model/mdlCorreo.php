<?php
    class ModelCorreo{
        static public function sendMailContact($datos){
            try{
                $to='danielsantiago@dannsan.com';
                $message = $datos['message'].'\n'.' Correo Electronico: '.$datos['to'].'\n Nombre:'.$datos['nombre'];
                $subject = 'Reality House: '.$datos['subject'];
                mail($to, $subject, $message, $to);
                return 'exito';
            }catch(Exception $e){
                print $e;
            }
        }

        static public function sendRegPassword($email, $pass){
            try{
                $newPass = md5($pass);
                $stmt = Connection::connect()->prepare((('CALL changePassword( ?, ? )')));
                $stmt->bindParam(1, $email, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $newPass, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                return $stmt->fetch();
                $stmt = Connection::disconnect();

            }catch(Exception $e){
                print $e;
            }
        }
    }
?>