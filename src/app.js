import  express from "express";
import productManager from "../ProductManager.js"

const app = express()
app.use(express.json())

const producto=new productManager("../productos.json")
app.get('/productos',async(request, response)=>{
const limit =parseInt(req.query.limit);
if(limit){
    try{
const products = await producto.getProduct();
const limitProducts=products.slice(0,limit);

 return response.status(200).json(limitProducts);
    }catch(error){
      return  response.status(404).json({error: "Error al obtener la lista de productos"})
    }
}else{
    const products = await producto.getProduct();
    return response.status(200).json(products)
}

})

app.get("/productos:id", (req, res) => {
  const id = parseInt(req.params.id);

  const products= producto.find((p) => p.id === id);

  if (!products) res.send({ error: "Productos not found" });
  else res.send(products);
});

app.listen(8080, () => console.log("Running on 8080 ..."));