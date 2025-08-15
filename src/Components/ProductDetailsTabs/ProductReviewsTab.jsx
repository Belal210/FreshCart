import Rating from "../Rating/Rating";


export default function ProductReviewsTab({ productDetails }) {

    return (
        <>
        <div className="">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Customer Reviews</h3>
                <button className="p-2 bg-primary-600 text-white rounded-md text-xs md:text-sm hover:bg-primary-700 transition-colors duration-300">
                    Write a Review
                </button>
            </div>
            <div className="flex items-center gap-3 mb-1">
                <Rating rating={productDetails?.ratingsAverage} />
                <span>{productDetails?.ratingsAverage} out of 5</span>
            </div>
            <p className="mb-2">Based on {productDetails?.ratingsQuantity} reviews</p>

            <div>
                <div className="space-y-2 py-3 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm lg:text-[16px]">
                            <span>Belal Mohamed</span>
                            <Rating rating={4.6} />
                
                        </div>
                        <span className="text-xs lg:text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-sm lg:text-[16px]">"البضاعة دي صح الصح و صاحبها راجل صح الصح ربنا يوفقه يارب 👍😉."</p>
                </div>
                <div className="space-y-2 py-3 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm lg:text-[16px]">
                            <span>Mariam Ahmed</span>
                            <Rating rating={4} />
                
                        </div>
                        <span className="text-xs lg:text-sm text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-sm lg:text-[16px]">"This product is really great I think I will buy it again."</p>
                </div>
            </div>
        </div>
        </>
    )
}