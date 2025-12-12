import image from "../assets/image1.jpg";
import BodyHome from "../components/componentHome/BodyHome";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <div className="overlayHome"></div>
      <div
        className="bg-cover bg-center h-full w-full"
        style={{ backgroundImage: `url(${image})` }}
      >
        <Header />
        <BodyHome />
      </div>
      <Footer />
    </>
  );
}
