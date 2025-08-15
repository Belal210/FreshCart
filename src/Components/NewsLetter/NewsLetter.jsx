
export default function NewsLetter() {

    return (
        <>
        <div className="py-10 bg-primary-50">
            <div className="container text-center space-y-5">
                <h2 className="text-2xl md:text-3xl font-bold">Subscribe to our Newsletter</h2>
                <p className="text-sm md:text-[16px]">Stay update with latest offers, and health tips.</p>
                <div className="md:w-2/3 xl:w-1/2 mx-auto relative">
                    <input type="email" placeholder="Your email address" className="form-control w-full border bg-white text-gray-800" />
                    <button className="btn absolute bottom-0 right-0 border border-primary-600 rounded-r-md rounded-l-none text-white bg-primary-600 font-medium hover:bg-primary-700">Subscribe</button>
                </div>
            </div>
        </div>
        </>
    )
}