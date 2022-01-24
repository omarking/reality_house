<?php
    require_once "model/mdlQuery.php";

    class ControllerQuery{
        /* A traves de este archivo mandamos la informacion que requieren los procedimientos almacenados para
        que las consultas funcionen correctamente, si es necesaria alguna otra accion como almacenar una imagen
        en este archivo tambien va la logica de ese tipo de acciones */

        static public function getQuery($param){
            $response = ModelQuery::getQuery($param);
            return $response;
        }

        static public function getProductsFromStore($store){
            $response = ModelQuery::getProductsFromStore($store);
            return $response;
        }

        static public function searchProduct($store, $word){
            $response = ModelQuery::searchProduct($store, $word);
            return $response;
        }

        static public function getProductForCategory($store, $category){
            $response = ModelQuery::getProductForCategory($store, $category);
            return $response;
        }

        static public function getProductForId($store, $id){
            $response = ModelQuery::getProductForId($store, $id);
            return $response;
        }

        static public function getUserDataSesion($email, $pass){
            $response = ModelQuery::getUserDataSesion($email, $pass);
            $u = $response['emailUsuario'];
            $p = $response['contrasenaUsuario'];
            if( $u == $email && $p == $pass){
                $arr [] = array("idUsuario" => $response['usuario'], "rol" => $response['descripcionRol'], "nombre" => $response['nombreUsuario'], "nombreTienda" => $response['nombreTienda']);
                return $arr;
            }else{
                return "Error";
            }
        }

        static public function getAllProductsForCategory($category){
            $response = ModelQuery::getAllProductsForCategory($category);
            return $response;
        }

        static public function searchAllProducts($word){
            $response = ModelQuery::searchAllProducts($word);
            return $response;
        }

        static public function saveProduct($datos, $imagenes){
            $ruta = "images/".$datos['tienda']."/";
            if(!file_exists($ruta)){
                mkdir($ruta, 0777, true);
            }
            $rutas = array();

            for($i = 1 ; $i <= 4 ; $i++){
                $rutImg = $datos['nombre'].$imagenes['img'.$i]['name'];
                $pathImg = $ruta.str_replace(" ", "", $rutImg);
                if(move_uploaded_file($imagenes["img".$i]['tmp_name'], $pathImg));
                array_push($rutas, $pathImg);
            }

            $random = rand(10, 10000);
            $res = substr($datos['nombre'], 0, 3);
            $res2 = substr($datos['nombre'], -3);
            $id = $res.$res2.$random;
            $datos["idProducto"] = $id;
            $response = ModelQuery::saveProducts($datos, $rutas);
            if ($response == false){
                return "Ok";
            }else{
                return "Error";
            }
        }

        static public function deleteProduct($idProducto){
            $response = ModelQuery::deleteProduct($idProducto);
            return $response;
        }

        static public function getInfoUser($idUser){
            $response = ModelQuery::getInfoUser($idUser);
            return $response;
        }

        static public function changePassword($email, $newPass){
            $response = ModelQuery::changePassword($email, $newPass);
            return $response;
        }
        
        static public function changeProduct($datos){
            $ruta = "images/".$datos['tienda']."/";
            $rutas = array();
            for( $i = 1 ; $i <=4 ; $i++){
                if(is_string($datos['img'.$i])){
                    array_push($rutas, $datos['img'.$i]);
                }else{
                    $rutImg = $datos['nombre'].$datos['img'.$i]['name'];
                    $pathImg = $ruta.str_replace(" ", "", $rutImg);
                    if(move_uploaded_file($datos['img'.$i]['tmp_name'], $pathImg)){
                        array_push($rutas, $pathImg);
                    }
                }
            }

            $getUrlProduct = ModelQuery::getProductForId($datos['tienda'], $datos['id']);
            $rutaActual = array(
                "img1" => $getUrlProduct[0]['imgPrincipal'],
                "img2" => $getUrlProduct[0]['img1'],
                "img3" => $getUrlProduct[0]['img2'],
                "img4" => $getUrlProduct[0]['img3'] 
            );
            
            if($rutaActual['img1'] == $rutas[0] || $rutaActual['img1'] == $rutas[1] || $rutaActual['img1'] == $rutas[2] || $rutaActual['img1'] == $rutas[3]){
            }else{
                $rutaActual['img1'];
            }

            for( $i = 1 ; $i <= 4 ; $i++){
                if($rutaActual['img'.$i] == $rutas[0] || $rutaActual['img'.$i] == $rutas[1] || $rutaActual['img'.$i] == $rutas[2] || $rutaActual['img'.$i] == $rutas[3]){
                }else{
                    unlink($rutaActual['img'.$i]);
                }
            }

            $response = ModelQuery::changeProduct($datos, $rutas);
            return $response;
        }

        static public function changeMembresia($datos){
            $arr = array(
                "idTienda" => $datos["idTienda"],
                "membresia" => ($datos['membresia']== "Free") ? 1 : 2
            );

            $response = ModelQuery::changeMembresia($arr);
            return $response;
        }

        static public function changeQR($datos){
            $validateQr = ModelQuery::getProductForId($datos['tienda'], $datos['codigoProducto']);

            if(file_exists($validateQr[0]['imagenQR'])){
                unlink($validateQr[0]['imagenQR']);
            }
            $rutaFinal = "";
            $ruta = "images/".$datos['tienda'];
            $rutImg = str_replace(" ", "", $datos['nombreProducto'].rand(10,99).".png");
            $pathImg = $ruta."/CodeQR".rand(10,99).$rutImg;
            if(move_uploaded_file($datos['img']['tmp_name'], $pathImg)){
                $rutaFinal = $pathImg;
            }
            $arr = array(
                'codigo' => $rutaFinal,
                'idProducto' => $datos['codigoProducto']
            );
            $response = ModelQuery::changeQR($arr);
            return $response;
        }

        static public function changeStatusModel($datos){
            $response = ModelQuery::changeStatusModel($datos);
            return $response;
        }

        static public function saveAdmin($datos){
            $datos += ['id' => substr($_POST['nombre'], 0, 2).substr($_POST['apellidoUno'],0,2).rand(1000, 9999).substr($_POST['nombre'],-2).rand(10,99)];
            $validateEmail = ModelQuery::validateDataUser('1', $datos['email']);
            $validateTelefono = ModelQuery::validateDataUser('3', $datos['telefono']);
            if( $validateEmail['emailUsuario'] == $datos['email']){
                return 'email';
            }else if( $validateTelefono['telefonoUsuario'] == $datos['telefono']){
                return 'telefono';
            }else{
                $response = ModelQuery::saveAdmin($datos);
                return $response;
            }
        }

        static public function saveUser($datos){
            $datos+= ['id' => substr($datos['nombre'], 0, 2).substr($datos['ap1'],0,2).rand(1000, 9999).substr($datos['nombre'],-2).rand(10, 99)];
            $validateEmail = ModelQuery::validateDataUser('1', $datos['email']);
            $validateTienda = ModelQuery::validateDataUser('2', $datos['tienda']);
            $validateTelefono = ModelQuery::validateDataUser('3', $datos['telefono']);
            if( $validateEmail['emailUsuario'] == $datos['email']){
                return 'email';
            }else if( $validateTienda['nombreTienda'] == $datos['tienda']){
                return 'tienda';
            }else if( $validateTelefono['telefonoUsuario'] == $datos['telefono']){
                return 'telefono';
            }else{
                $ruta = "images/".$datos['tienda']."/";
                mkdir($ruta);
                $response = ModelQuery::saveUser($datos);
                return $response;
            }
        }

        static public function getModel($tienda){
            $response1 = ModelQuery::getModel($tienda, 'getAllModel');
            $response2 = ModelQuery::getModel($tienda, 'getModelComplete');
            $arr = array(
                'total' => $response1[0][0],
                'terminado' => $response2[0][0],
            );
            return $arr;
        }

        static public function changeImgProfile($datos){
            $validacion = ModelQuery::getInfoUser($datos['tienda']);
            $ruta = "images/".$datos['tienda'];
            $rutImg = str_replace(" ", "", 'Profile'.$datos['img']['name']);
            $pathImg = $ruta."/".$rutImg;

            if( $validacion['logoTienda'] != $pathImg){
                unlink($validacion['logoTienda']);
                if(move_uploaded_file($datos['img']['tmp_name'], $pathImg)){
                    ModelQuery::changeImgProfile($datos['idUsuario'], $pathImg);
                    return 'exito';
                }else{
                    return 'error';
                }
            }
        }

        static public function changeUser($datos){
            $response = ModelQuery::changeUser($datos);
            return $response;
        }

        static public function changeStatusUser($datos){
            $response = ModelQuery::changeStatusUser($datos);
            return $response;
        }


    }
