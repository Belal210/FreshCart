import { Link } from "react-router";
import notFoundImg from "../../assets/images/undraw_page-not-found_6wni.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";

export default function NotFound() {
  return (
    <>
      <PageMetaData
        title="Not Found"
        description="The page you are looking for does not exist."
        keywords="Not found page"
      />
      <section className="py-20 text-center">
        <div className="w-[26rem] mx-auto mb-5">
          <img src={notFoundImg} alt="Not Found Image" className="w-full" />
        </div>
        <h3 className="text-3xl font-bold mb-4">Oops! Page Not Found</h3>
        <p>The page you are looking for seems to have gone shopping!</p>
        <p className="text-gray-600 mt-2">
          Don't worry, our fresh products are still available for you.
        </p>
        <Link
          to={"/"}
          className="mt-5 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faHome} className="me-2" />
          Back to Home
        </Link>
      </section>
      <NewsLetter/>
    </>
  );
}
