import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../api/products";
import { useNavigate} from "react-router";
import { getProduct } from "../api/products";
import { useParams } from "react-router";
import toast from "react-hot-toast";
export default function ProductForm(){

    const [product,setProduct]=useState({
        nombre:"",
        precio:"0",
        descripcion:"",
    })

    const navigate=useNavigate()
    const params=useParams()

    useEffect(()=>{
        const loadProduct=async()=>{
            if(params.id){
                const response=await getProduct(params.id)
                setProduct(response.data)
            }
        }
        loadProduct()
    },[params.id])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const productData={
            nombre: product.nombre,
            precio: parseFloat(product.precio),
            descripcion: product.descripcion
        }
        if (params.id) {
            await updateProduct(params.id,product)
            toast.success("Producto actualizado correctamente")
        }
        else{
        await createProduct(product)
        toast.success("Producto creado correctamente")

        }
        navigate("/")
    }
    return(

        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Nombre</label>
            <input
            value={product.nombre}
            type="text"
            onChange={(e)=>setProduct({...product,nombre: e.target.value})}
            className="w-full mt-1 p-2 border border-gray-300"
            />
        </div>

        <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Precio</label>
            <input 
            value={product.precio}
            type="number"
            onChange={(e)=>setProduct({...product,precio: e.target.value})}
            className="w-full mt-1 p-2 border border-gray-300"
            />
        </div>

        <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Descripcion</label>
            <textarea
            value={product.descripcion}
            onChange={(e)=>setProduct({...product,descripcion: e.target.value})}
            className="w-full mt-1 p-2 border border-gray-300 rounded">

            </textarea>
        </div>

        <div className="mb-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Guardar
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg ml-2" onClick={() => navigate("/")}>
                Cancelar
            </button>
        </div>
        </form>
    )
}