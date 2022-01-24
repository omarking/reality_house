<?php
    class Connection{
        static public function connect(){
            try{
                $mdb = new PDO('mysql:; dbname=', "", "");
                $mdb->exec("set names utf8");
                return $mdb;
            }catch (PDOException $e){
                print $e;
            }
        }

        static public function disconnect(){
            return $mdb=null;
        }
    }
?>