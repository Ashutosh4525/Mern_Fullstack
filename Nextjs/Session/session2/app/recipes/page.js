import { Suspense } from "react";
import axios from "axios";
import Loading from "../loading";

export const metadata={
    title:'Home'
  }
const DynamicContent=async()=>{
  await new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },3000)
  })

  
  const res=await axios.get('https://dummyjson.com/recipes');
  console.log(res.data.recipes);
  const products=res.data.recipes 

  return(
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <img
                alt={product.imageAlt}
                src={product.image}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <div className="flex justify-between align-middle items-center">
              <h3 className="mt-4 text-md text-gray-700">{product.name}</h3>
              <h3 className="mt-4 text-md font-medium text-blue-600">Read more..</h3>
              </div>
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
        <h2 className="mt-20 text-5xl text-black">Recipes List</h2> 
        <Suspense fallback={<Loading/>}>
        <DynamicContent/>
        </Suspense>
        </div>
    </div>

  </>
  )
}
