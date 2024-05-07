import Categories from "./Categories/Categories";
import Gallery from "./Gallery/Gallery";
import Hero from "./Hero/Hero";
import Products from "./Products/Products";
import RoomSlider from "./RoomSlider/RoomSlider";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Products />
      <RoomSlider />
      <Gallery />
    </>
  );
};

export default Home;
