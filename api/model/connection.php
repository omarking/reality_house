<?php
    class Connection{
        static public function connect(){
            try{
                $mdb = new PDO('mysql:host=162.241.62.191; dbname=dannsanc_prueba_reality', "dannsanc_danns", "Wd9ky[9i+Zwt");
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