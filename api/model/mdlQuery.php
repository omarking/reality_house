<?php
    require_once "connection.php";

    class ModelQuery{
        /* Las funciones presenteas aqui llaman a los procedimientos almacenados y 
        si tienen parametros les agrega la informacion que llevan estos */
        static public function getQuery($param){
            try{
                $stmt = Connection::connect()->prepare('CALL get'.$param.'()');
                $stmt->execute();
                return $stmt->fetchAll();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            }
        }

        static public function getProductsFromStore($store){
            try{
                $stmt = Connection::connect()->prepare(('CALL getProductsFromStore(?)'));
                $stmt->bindParam(1, $store, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 400);
                $stmt->execute();
                return $stmt->fetchAll();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            }  
        }

        static public function searchProduct($store, $word){
            try{
                $stmt = Connection::connect()->prepare('CALL searchProduct(?, ?)');
                $stmt->bindParam(1, $store, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $word, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                return $stmt->fetchAll();
                $stmt = Connection::disconnect();
            }catch (Exception $e){
                print $e;
            }
        }
    
        static public function getProductForCategory($store, $category){
            try{
                $stmt = Connection::connect()->prepare('CALL getProductForCategory(?, ?)');
                $stmt->bindParam(1, $store, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $category, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                return $stmt->fetchAll();
                $stmt = Connection::disconnect();
            }catch (Exception $e){
                print $e;
            }
        }

        static public function getProductForId($store, $id){
            try{
                $stmt = Connection::connect()->prepare('CALL getProductForId(?, ?)');
                $stmt->bindParam(1, $store, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                return $stmt->fetchAll();
                $stmt = Connection::disconnect();
            }catch (Exception $e){
                print $e;
            }
        }

        static public function getUserDataSesion($email, $pass){
            try{
                $stmt = Connection::connect()->prepare('CALL getUserDataSesion(?, ?)');
                $stmt->bindParam(1, $email, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $pass, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                return $stmt->fetch();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            }
        }
        
        static public function getAllProductsForCategory($category){
            try{
                $stmt = Connection::connect()->prepare('CALL getAllProductsForCategory(?)');
                $stmt->bindParam(1, $category, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                return $stmt->fetchAll();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            }
        }

        static public function searchAllProducts($word){
            try{
                $stmt = Connection::connect()->prepare('CALL searchAllProducts(?)');
                $stmt->bindParam(1, $word, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                return $stmt->fetchAll();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            }
        }

        static public function saveProducts($datos, $rutas){
            try{
                $stmt = Connection::connect()->prepare('CALL saveProduct( ?,?,?,?,?,?,?,?,?,?,?,?)');
                $stmt->bindParam(1, $datos['marca'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $datos['categoria'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(3, $datos['idProducto'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(4, $datos['nombre'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(5, $datos['descripcion'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(6, $datos['stock'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(7, $datos['precio'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(8, $rutas[0], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(9, $rutas[1], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(10, $rutas[2], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(11, $rutas[3], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(12, $datos['tienda'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                return $stmt->fetch();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            }
        }

        static public function deleteProduct($idProducto){
            try{
                $stmt = Connection::connect()->prepare('CALL deleteProduct(?)');
                $stmt->bindParam(1, $idProducto, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                return $stmt->fetch();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            }
        }

        static public function getInfoUser($idUser){
            try{
                $stmt = Connection::connect()->prepare(('CALL getInfoUser(?)'));
                $stmt->bindParam(1, $idUser, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                return $stmt->fetch();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            }
        }

        static public function changePassword($email, $newPass){
            try{
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

        static public function changeProduct($datos, $rutas){
            try{
                $stmt = Connection::connect()->prepare('CALL changeProduct(?,?,?,?,?,?,?,?,?,?,?)');
                $stmt->bindParam(1, $datos['marca'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $datos['categoria'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(3, $datos['id'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(4, $datos['nombre'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(5, $datos['descripcion'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(6, $datos['stock'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(7, $datos['precio'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(8, $rutas[0], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(9, $rutas[1], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(10, $rutas[2], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(11, $rutas[3], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                return $stmt->execute();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            }
        }

        static public function changeMembresia($datos){
            try{
                $stmt = Connection::connect()->prepare('CALL changeMembresia(?, ?)');
                $stmt->bindParam(1, $datos['idTienda'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $datos['membresia'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                return $stmt->execute();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            }
        }

        static public function changeQR($datos){
            try{
                $stmt = Connection::connect()->prepare('CALL changeQR(?, ?)');
                $stmt->bindParam(1, $datos['codigo'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $datos['idProducto'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                return $stmt->execute();
                $stmt = Connection::disconnect();
            }catch (Exception $e){
                print $e;
            }
        }

        static public function changeStatusModel($datos){
            try{
                $stmt = Connection::connect()->prepare('CALL changeStatusModel(?, ?)');
                $stmt->bindParam(1, $datos['idProducto'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $datos['estado'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                return $stmt->execute();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            }
        }

        static public function saveAdmin($datos){
            try{
                $stmt = Connection::connect()->prepare('CALL saveAdmin(?, ?, ?, ?, ?, ?, ?)');
                $stmt->bindParam(1, $datos['id'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $datos['nombre'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(3, $datos['ap1'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(4, $datos['ap2'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(5, $datos['email'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(6, $datos['telefono'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(7, $datos['pass'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                return $stmt->execute();
                $stmt = Connection::disconnect();
            }catch( Exception $e){
                print $e;
            }
        }

        static public function saveUser($datos){
            try{
                $stmt = Connection::connect()->prepare('CALL saveUser(?, ?, ?, ?, ?, ?, ?, ?)');
                $stmt->bindParam(1, $datos['id'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $datos['nombre'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(3, $datos['ap1'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(4, $datos['ap2'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(5, $datos['email'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(6, $datos['telefono'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(7, $datos['pass'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(8, $datos['tienda'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                return $stmt->execute();
                $stmt = Connection::disconnect();
            }catch( Exception $e){
                print $e;
            }
        }

        static public function getModel($tienda, $procedure){
            try{
                $stmt = Connection::connect()->prepare('CALL '.$procedure.'(?)');
                $stmt->bindParam(1, $tienda, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                return $stmt->fetchAll();
                $stmt = Connection::disconnect();
            }catch( Exception $e){
                print $e;
            }
        }

        static public function changeImgProfile($id, $img){
            try{
                $stmt = Connection::connect()->prepare('CALL changeImgUser(?,?)');
                $stmt->bindParam(1, $id, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $img, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                return $stmt->fetch();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            }
        }

        static public function validateDataUser($campo, $eval){
            try{
                $stmt = Connection::connect()->prepare('CALL validateData(?,?)');
                $stmt->bindParam(1, $campo, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $eval, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->execute();
                return $stmt->fetch();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            }
        }

        static public function changeUser($datos){
            try{
                $stmt = Connection::connect()->prepare('CALL changeDataUser(?, ?, ?, ?, ?)');
                $stmt->bindParam(1, $datos['id'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $datos['nombre'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(3, $datos['ap1'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(4, $datos['ap2'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(5, $datos['telefono'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                return $stmt->execute();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            }  
        }
        
        static public function changeStatusUser($datos){
            try{
                $stmt = Connection::connect()->prepare('CALL changeStatusUser(?, ?)');
                $stmt->bindParam(1, $datos['estado'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                $stmt->bindParam(2, $datos['id'], PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 4000);
                return $stmt->execute();
                $stmt = Connection::disconnect();
            }catch(Exception $e){
                print $e;
            } 
        }
    }
?>