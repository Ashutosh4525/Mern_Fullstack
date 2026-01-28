import product from "../Models/product.model";
import brand from "../Models/brand.model";
import category from "../Models/category.model";

export const createProduct= async (req,res) => {
    try {
        const {name, description, BrandId,CategoryId, price, discount, tags}=req.body;

        const existingBrand= await brand.findById(BrandId);
        const existingCategory= await brand.findById(CategoryId);
        if (!existingBrand) {
            return res.status(400).json({
            message:"category does not exist",
            success:false
            })}

        if (!existingCategory) {
            return res.status(400).json({
            message:"category does not exist",
            success:false
            })}
        

        const newProduct = await product.create({name, description, BrandId, price, discount, tags, CategoryId})

         return res.status(201).json({
            data:newProduct,
            message:"All Good",
            success:true
        })
        } catch (error) {
         console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false
        })
    }
}

export const getProduct= async (req,res) => {
    try {
        const {limit, page, inStock, search, sort, minPrice, maxPrice ,brandId, categoryId}=req.query;
        const skipval = limit * (page-1);

        let filter={}
        if(inStock){
           filter.inStock=inStock
        }

        if (search) {
            const searchReqx=new RegExp(`.*${search}.*`);
            console.log(searchReqx);
            
            const [brands, categories] = await Promise.all([
                brand.find({ name: searchRegex }).select("_id"),
                category.find({ name: searchRegex }).select("_id")
            ]);

            filter={
                ...filter,
                $or: [
                    {name:searchReqx},
                    {description:searchReqx},
                    { BrandId: { $in: brands.map(b => b._id) } },
                    { CategoryId: { $in: categories.map(c => c._id) } }
                ]
            }
        }

        let sortValue={_id:-1}
        if (sort==='htl') {
            sortValue={price:-1}
        }else if(sort==='lth'){
            sortValue={price:1}
        }

      // products less than price
    //   if (minPrice) {
    //     filter.price={};
    //     if (minPrice) {
    //         filter.price.$gte=minPrice
    //     }
    //     console.log(minPrice);
        
    //   }
      // products greater than price
    //   if (maxPrice) {
    //     filter.price={};
    //     if (maxPrice) {
    //         filter.price.$gte=Number(maxPrice)
    //     }
    //   }
      // product in range of 
      if (maxPrice||minPrice) {
        filter.price={};
        if (maxPrice) {
            filter.price.$lte=Number(maxPrice)
        }
        if (minPrice) {
            filter.price.$gte=Number(minPrice)
        }
      }
      // product in particular brand
    //   if (brandId||search) {
    //     const searchReqx=new RegExp(`.*${search}.*`);
    //     filter.BrandId={brandId,
    //         $lookup: [
    //                 {name:searchReqx},
    //                 {description:searchReqx}
    //             ]}
    //   }
      // product in particular category
      if (categoryId) {
        filter.CategoryId=categoryId
      }
        const products=await product.find(filter).populate("BrandId").populate("CategoryId").limit(limit).skip(skipval).sort(sortValue);
        return res.status(201).json({
            data:products,
            message:"All Good",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false})
    }
}