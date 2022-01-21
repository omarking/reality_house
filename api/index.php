<?php
/* Requiere */
require_once "./controller/ctrQuery.php";
require_once "./controller/ctrCorreo.php";

/* Header's */
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

switch ($_SERVER['REQUEST_METHOD']){
    case 'POST':
        if(isset($_POST['p'])){
            if($_POST['p'] == 'query'){
                $response = ModelQuery::getQuery($_POST['w']);
                print json_encode($response);
            }else if ($_POST['p']== 'getProductsFromStore'){
                $response = ControllerQuery::getProductsFromStore($_POST['w']);
                print json_encode($response);
            }else if($_POST['p'] == 'searchProduct'){
                $response = ControllerQuery::searchProduct($_POST['s'], $_POST['w']);
                print json_encode($response);
            }else if($_POST['p'] == 'getProductForCategory'){
                $response = ControllerQuery:: getProductForCategory($_POST['s'], $_POST['c']);
                print json_encode($response);
            }else if($_POST['p'] == 'getProductForId'){
                $response = ControllerQuery:: getProductForId($_POST['s'], $_POST['id']);
                print json_encode($response);
            }else if($_POST['p'] == 'iniSesion'){
                $response = ControllerQuery::getUserDataSesion($_POST['e'], $_POST['pass']);
                print json_encode($response);
            }else if($_POST['p'] == 'allProductsC'){
                $response = ControllerQuery::getAllProductsForCategory($_POST['c']);
                print json_encode($response);
            }else if($_POST['p'] == 'allProductsS'){
                $response = ControllerQuery::searchAllProducts($_POST['w']);
                print json_encode($response);
            }else if($_POST['p'] == 'saveProduct'){
                $datos = array(
                    "nombre" => $_POST['nombre'],
                    "stock" => $_POST['stock'],
                    "precio" => $_POST['precio'],
                    "marca" => $_POST['marca'],
                    "descripcion" => $_POST['descripcion'],
                    "categoria" => $_POST['categoria'],
                    "tienda" => $_POST['u']
                );
                $imagenes = array(
                    "img1" => $_FILES['ruta1'],
                    "img2" => $_FILES['ruta2'],
                    "img3" => $_FILES['ruta3'],
                    "img4" => $_FILES['ruta4']
                );
                $response = ControllerQuery::saveProduct($datos, $imagenes);
                print json_encode($response);
            }else if ($_POST['p'] == 'deleteProduct'){
                $response = ControllerQuery::deleteProduct($_POST['idProducto']);
                print json_encode($response);
            }else if($_POST['p'] == 'getInfoUser'){
                $response = ControllerQuery::getInfoUser($_POST['idUser']);
                print (json_encode($response));
            }else if($_POST['p'] == 'changePassword'){
                $response = ControllerQuery::changePassword($_POST['e'], $_POST['pass']);
                print json_encode($response);
            }else if($_POST['p'] == 'updateProduct' ){
                $urlServer = "http://realityhouse.codewaymx.com/api/";
             $datos = array(
                 "id" => $_POST['id'],
                 "tienda" => $_POST['tienda'],
                 "nombreActual" => $_POST['nombreActual'],
                 "nombre" => $_POST['nombre'],
                 "stock" => $_POST['stock'],
                 "precio" => $_POST['precio'],
                 "marca" => $_POST['marca'],
                 "descripcion" => $_POST['descripcion'],
                 "categoria" => $_POST['categoria'],
                 "img1" => (isset($_FILES['ruta1'])) ? $_FILES['ruta1'] : (str_replace($urlServer, "", $_POST['ruta1'])),
                 "img2" => (isset($_FILES['ruta2'])) ? $_FILES['ruta2'] : (str_replace($urlServer, "", $_POST['ruta2'])),
                 "img3" => (isset($_FILES['ruta3'])) ? $_FILES['ruta3'] : (str_replace($urlServer, "", $_POST['ruta3'])),
                 "img4" => (isset($_FILES['ruta4'])) ? $_FILES['ruta4'] : (str_replace($urlServer, "", $_POST['ruta4']))
             );
                $response = ControllerQuery::changeProduct($datos);
                print json_encode($response);
            }else if($_POST['p'] == 'changeMembresia'){
                $response = ControllerQuery::changeMembresia($_POST);
                print json_encode($response);
            }else if($_POST['p'] == 'changeQR'){
                $datos = array(
                    "img" => $_FILES['code'],
                    "codigoProducto" => $_POST['codigoProducto'],
                    "tienda" => $_POST['tienda'],
                    "nombreProducto" => $_POST['nombreProducto']    
                );
                $response = ControllerQuery::changeQR($datos);
                print json_encode($response);
            }else if($_POST['p'] == 'changeStatusModel'){
                $datos = array(
                    'idProducto' => $_POST['idProducto'],
                    'estado' => $_POST['estado']
                );
                $response = ControllerQuery::changeStatusModel($datos);
                print json_encode($response);
            }else if($_POST['p'] == 'regUser'){
                $datos = array(
                    'nombre' => $_POST['nombre'],
                    'ap1' => $_POST['apellidoUno'],
                    'ap2' => $_POST['apellidoDos'],
                    'email' => $_POST['correo'],
                    'telefono' => $_POST['telefono'],
                    'pass' => $_POST['contrasena'],
                    'tienda' => $_POST['tienda']
                );
                $response = ControllerQuery::saveUser($datos);
                print json_encode($response);
            }else if($_POST['p'] == 'regAdmin'){
                $datos = array(
                    'nombre' => $_POST['nombre'],
                    'ap1' => $_POST['apellidoUno'],
                    'ap2' => $_POST['apellidoDos'],
                    'email' => $_POST['correo'],
                    'telefono' => $_POST['telefono'],
                    'pass' => $_POST['contrasena']
                );
                $response = ControllerQuery::saveAdmin($datos);
                print json_encode($response);
            }else if($_POST['p'] =='emailContact' ){
                $datos = array(
                    'to' => $_POST['to'],
                    'subject' => $_POST['subject'],
                    'message' => $_POST['message']
                );
                $response = ControllerCorreo::sendMailContact($datos);  
                print json_encode($response);
            }else if($_POST['p'] == 'recPassword' ){
                $response = ControllerCorreo::sendRegPassword($_POST['email']);
                print json_encode($response);
            }else if($_POST['p'] == 'getModel'){
                $response = ControllerQuery::getModel($_POST['tienda']);
                print json_encode($response);
            }else if($_POST['p'] == 'changeImgProfile'){
                $arr = array(
                    'idUsuario' => $_POST['idUser'],
                    'tienda' => $_POST['tienda'],
                    'img' => $_FILES['img']
                );

                $response = ControllerQuery::changeImgProfile($arr);
                print json_encode($response);
            }else if($_POST['p'] == 'emailContact'){
                $datos = array(
                    'to' => $_POST['to'],
                    'nombre' => $_POST['nombre'],
                    'subject' => $_POST['subject'],
                    'message' => $_POST['message']
                );
                $response = ControllerCorreo::sendMailContact($datos);
                print json_encode($response);
            }else if($_POST['p'] == 'recPassword'){
                $response = ControllerCorreo::sendRegPassword($_POST['email']);
                print json_encode($response);
            }else if($_POST['p'] == 'changeUser'){
                $datos = array(
                    'id' => $_POST['id'],
                    'nombre' => $_POST['nombre'],
                    'ap1' => $_POST['apellidoUno'],
                    'ap2' => $_POST['apellidoDos'],
                    'telefono' => $_POST['telefono'],
                    'tienda' => $_POST['tienda']
                );
                $response = ControllerQuery::changeUser($datos);
                print json_encode($response);   
            }else if($_POST['p'] == 'changeStatusUser'){
                $datos = array(
                    'estado' => $_POST['estado'],
                    'id' => $_POST['id']
                );
                $response = ControllerQuery::changeStatusUser($datos);
                print json_encode($response);
            }
        } 
    break;
    case 'GET':
        print "Get";
    break;
}

?>