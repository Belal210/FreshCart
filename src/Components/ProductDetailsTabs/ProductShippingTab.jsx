

export default function ProductShippingTab() {

    return (
        <>
        <div className="">
            <h3 className="mb-3 font-semibold">Shipping & Returns</h3>
            <div className="flex flex-col gap-5 lg:flex-row lg:gap-64 text-xs lg:text-sm">
                <div className="space-y-2">
                    <p className="text-[16px] mb-3">Shipping Information</p>
                    <p>Standerd: <span className="ml-11">3-5 business days (4.99 EGP)</span></p>
                    <p>Express: <span className="ml-14">1-2 business days (9.99 EGP)</span></p>
                    <p>Free shipping: <span className="ml-3">Orders over 500 EGP</span></p>
                </div>
                <div className="space-y-2">
                    <p className="text-[16px] mb-3">Return Policy</p>
                    <p>Time limit: <span className="ml-3">30 days</span></p>
                    <p>Condition: <span className="ml-3">Unopened original packaging</span></p>
                    <p>Refund: <span className="ml-8">Full refund available</span></p>
                </div>
            </div>
        </div>
        </>
    )
}