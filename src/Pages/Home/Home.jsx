import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";
import HomeCategories from "../../Components/HomeCategories/HomeCategories";
import HomeDeals from "../../Components/HomeDeals/HomeDeals";
import HomeFeatures from "../../Components/HomeFeatures/HomeFeatures";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function Home() {

    return (
        <>
        <PageMetaData title="Home" />
        <HomeSlider/>
        <HomeFeatures/>
        <HomeCategories/>
        <HomeDeals/>
        <FeaturedProducts/>
        <NewsLetter/>
        </>
    )
}