import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { useCallGET } from "../../hooks/useCallGET";
import { useForm } from "../../hooks/useForm";
import { useFormData } from "../../hooks/useFormData";

export const AgregarProducto = () => {
  const { user } = useContext(AuthContext);
  const { data, loading } = useCallGET("http://localhost/realityhouse/api/productos.php?p=categorias");
  const category = !!data && data;
  const [cat, setCat] = useState();
  const [ruta, setRuta] = useState({
    ruta1: "https://cdn.pixabay.com/photo/2016/04/12/22/35/watercolour-1325656_960_720.jpg",
    ruta2: "https://cdn.pixabay.com/photo/2016/04/12/22/35/watercolour-1325656_960_720.jpg",
    ruta3: "https://cdn.pixabay.com/photo/2016/04/12/22/35/watercolour-1325656_960_720.jpg",
    ruta4: "https://cdn.pixabay.com/photo/2016/04/12/22/35/watercolour-1325656_960_720.jpg",    
  });
  const [formData, handleFormData] = useFormData('');
  const [formData1, handleFormData1] = useFormData('');
  const [formData2, handleFormData2] = useFormData('');
  const [formData3, handleFormData3] = useFormData('');
  const [formValues, handleInputChange] = useForm({
    nombre: '',
    stock: '',
    precio: '',
    marca: '',
    descripcion: '',
  });
  const { nombre, stock, precio, marca, descripcion } = formValues;
  const f = new FormData();

  const handleImage = (e) =>  {
    const objectURL = URL.createObjectURL(e.target.files[0]);
    setRuta({
      ...ruta,
      [e.target.name]: objectURL
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    f.append('nombre', nombre);
    f.append('stock', stock);
    f.append('precio', precio);
    f.append('categoria', cat);
    f.append('marca', marca);
    f.append('descripcion', descripcion);
    f.append('img1', formData);
    f.append('img2', formData1);
    f.append('img3', formData2);
    f.append('img4', formData3);
    f.append('tienda', user.tienda);
    axios.post("http://localhost/realityhouse/api/productos.php", f,{headers: {
      'Content-Type': 'multipart/form-data'
    }})
    .then(res=>{
      console.log(res);
    });
  };


  return (
    <div>
      <h2 className="w-75 mx-auto mb-4">Agregar Producto</h2>

      <form onSubmit={handleSubmit} className="w-75 m-auto">
        <div className="form-group">
          <label className="ml-2">Nombre <small className="text-danger" >*Campo obligatorio</small> </label>
          <input
            type="text"
            name="nombre"
            value={nombre || ''}
            onChange={handleInputChange}
            placeholder="Silla Caoba"
            className="form-control col-md-2 col-10 ml-2"
          />
        </div>
        {/* Imagenes */}
        <div className="form-group" >
          <div  >
          <label>Seleccione Imagenes</label>
          </div>
         <div className="div_img_select">
         <div className="">
            <input type="file" className="img_select" id="file1" name="ruta1" accept="image/*" onChange={(e)=>{
              handleImage(e)
              handleFormData(e);
              }} />
            <label className="label_img_select" htmlFor="file1"
            style={{backgroundImage: `url(${ruta.ruta1})` }}  >Seleccione Imagen</label>
          </div>

          <div className="">
            <input type="file" className="img_select" id="file2" name="ruta2" accept="image/*" onChange={(e)=>{
              handleImage(e)
              handleFormData1(e);
            }} />
            <label className="label_img_select" htmlFor="file2"
            style={{backgroundImage: `url(${ruta.ruta2})` }}  >Seleccione Imagen</label>
          </div>

          <div className="">
            <input type="file" className="img_select" id="file3" name="ruta3" accept="image/*" onChange={(e)=>{
              handleImage(e)
              handleFormData2(e);
            }} />
            <label className="label_img_select" htmlFor="file3"
            style={{backgroundImage: `url(${ruta.ruta3})` }}  >Seleccione Imagen</label>
          </div>

          <div className="">
            <input type="file" className="img_select" id="file4" name="ruta4" accept="image/*" onChange={(e)=>{
              handleImage(e)
              handleFormData3(e);
            }} />
            <label className="label_img_select" htmlFor="file4"
            style={{backgroundImage: `url(${ruta.ruta4})` }}  >Seleccione Imagen</label>
          </div>
      

         </div>
        </div>

        <div className="form-group">
          <label className="ml-2">Stock <small className="text-danger" >*Campo obligatorio</small></label>
          <input
            type="number"
            name="stock"
            value={stock || ''}
            onChange={handleInputChange}
            className="form-control col-md-2 col-10 ml-2"
          />
        </div>

        <div className="form-group">
          <label className="ml-2">Precio <small className="text-danger" >*Campo obligatorio</small></label>
          <input
            type="number"
            name="precio"
            value={precio || ''}
            onChange={handleInputChange}
            className="form-control col-md-2 col-10 ml-2"
          />
        </div>

        {/* Select Categorias */}
        <div className="form-group">
          <label className="ml-2">Categoria <small className="text-danger" >*Campo obligatorio</small></label>
          <select
            className="form-control col-md-2 col-10 ml-2"
            onChange={e=>setCat(e.target.value)}
          >
            <option>Seleccione</option>
            {!loading &&
              category.map((x, i) => {
                return <option key={i}>{x.categoria}</option>;
              })}
          </select>
        </div>

        <div className="form-group">
          <label className="ml-2">Marca <small className="text-danger" >*Campo obligatorio</small></label>
          <input
            type="text"
            value={marca || ''}
            onChange={handleInputChange}
            name="marca"
            placeholder="SanFra"
            className="form-control col-md-2 col-10 ml-2"
          />
        </div>

        <div className="form-group">
          <label className="ml-2">Descripcion <small className="text-danger" >*Campo obligatorio</small></label>
          <textarea
            className="form-control col-md-4 col-10 ml-2"
            name="descripcion"
            value={descripcion || ''}
            onChange={handleInputChange}
            rows="4"
            style={{ resize: "none" }}
          ></textarea>
        </div>
        {/* Botones */}
        <div className="row col-md-4 col-10">
          <input
          type='submit'
            className="btn color-components ml-2 mr-3"
            value="Agregar">
          </input>
          <Link to="/user/mis-productos" className="btn color-components mx-3">Cancelar</Link>
        </div>
      </form>
    </div>
  );
};
