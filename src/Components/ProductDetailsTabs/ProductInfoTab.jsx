

export default function ProductInfoTab({ productDetails }) {

    return (
        <>
        <div className="">
            <h3 className="mb-2 font-semibold">
                Product Description
            </h3>
            <p className="text-xs lg:text-sm">{productDetails.description}</p>
        </div>
        </>
    )
}