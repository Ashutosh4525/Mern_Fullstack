import { Suspense } from "react"
import axios from "axios"
import Loading from "../loading"

const DynamicContent=async()=>{
  await new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },3000)
  })
  const res=await axios.get('https://dummyjson.com/products');
  console.log(res.data.products);
  const products=res.data.products  

  return(
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <img
                alt={product.imageAlt}
                src={product.thumbnail}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
            </a>
          ))}
        </div>
  )

}
export default function Example() {
  
  return (
    <>
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="mt-20 text-5xl text-black">Products List</h2> 
        <Suspense fallback={<Loading/>}>
        <DynamicContent/>
        </Suspense>
        </div>
    </div>

  </>
  )
}
