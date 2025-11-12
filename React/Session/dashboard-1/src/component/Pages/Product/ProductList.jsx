import { useEffect } from "react"
import axiosNew from "../../../utils/axiosNew"
import {useDispatch,useSelector} from "react-redux"

import { fetchProducts,createProduct } from "../../../redux/action/product.action";


// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
//   {
//     id: 2,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
//     imageAlt: "Front of men's Basic Tee in white.",
//     price: '$35',
//     color: 'Aspen White',
//   },
//   {
//     id: 3,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
//     imageAlt: "Front of men's Basic Tee in dark gray.",
//     price: '$35',
//     color: 'Charcoal',
//   },
//   {
//     id: 4,
//     name: 'Artwork Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
//     imageAlt: "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
//     price: '$35',
//     color: 'Iso Dots',
//   },
// ]

export default function ProductList() {
  const dispatch=useDispatch();
  const {product,loading,error}=useSelector((state)=>state.product)
    useEffect(()=>{
        // axiosNew.get("/product")
        // .then((r)=>console.log(r))
        // .catch((e)=>console.log(e))

        // axiosNew.post("/product",values,{
        //     header:{
        //       Authorization: "Bearer "
        //     }
        // })
        dispatch(fetchProducts());
    },[])


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {/* Customers also purchased */}
          {loading&& "loading"} Product list
          </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {product.map((products) => (
            <div key={products.id} className="group relative">
              <img
                alt={products.imageAlt}
                src={products.avatar}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={products.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {products.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{products.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{products.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
