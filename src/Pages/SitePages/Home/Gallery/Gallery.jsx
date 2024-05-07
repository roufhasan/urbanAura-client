import img1 from "../../../../assets/images/home/gallery-1.png";
import img2 from "../../../../assets/images/home/gallery-2.png";
import img3 from "../../../../assets/images/home/gallery-3.png";
import img4 from "../../../../assets/images/home/gallery-4.png";
import img5 from "../../../../assets/images/home/gallery-5.png";
import img6 from "../../../../assets/images/home/gallery-6.png";
import img7 from "../../../../assets/images/home/gallery-7.png";
import img8 from "../../../../assets/images/home/gallery-8.png";
import img9 from "../../../../assets/images/home/gallery-9.png";

const Gallery = () => {
  return (
    <section className="mb-[50px]">
      {/* section title */}
      <div className="text-center">
        <p className="text-lg font-bold text-[#616161] md:text-xl">
          Share your setup with
        </p>
        <h1 className="text-3xl font-bold text-[#3a3a3a] md:text-[40px]">
          #FuniroFurniture
        </h1>

        {/* grid images container */}
        <div className="grid h-[90vh] grid-cols-12 grid-rows-12 gap-2 md:gap-4">
          <img
            src={img1}
            alt="interior design"
            className="col-start-1 col-end-4 row-start-1 row-end-6 h-full w-full object-cover md:col-end-2 md:md:row-start-1 md:md:row-end-7"
          />
          <img
            src={img2}
            alt="interior design"
            className="col-start-1 col-end-4 row-start-6 row-end-10 h-full w-full object-cover md:col-start-2 md:col-end-6 md:row-start-2 md:row-end-7"
          />
          <img
            src={img3}
            alt="interior design"
            className="col-start-4 col-end-10 row-start-3 row-end-11 h-full w-full object-cover md:col-start-1 md:col-end-3 md:row-start-7 md:row-end-13"
          />
          <img
            src={img4}
            alt="interior design"
            className="col-start-10 col-end-13 row-start-1 row-end-7 h-full w-full object-cover md:col-start-3 md:col-end-6 md:row-start-7 md:row-end-11"
          />
          <img
            src={img5}
            alt="interior design"
            className="col-start-10 col-end-13 row-start-7 row-end-13 h-full w-full object-cover md:col-start-6 md:col-end-8 md:row-start-3 md:row-end-10"
          />
          <img
            src={img6}
            alt="interior design"
            className="hidden h-full w-full object-cover md:col-start-8 md:col-end-11 md:row-start-2 md:row-end-8 md:block"
          />
          <img
            src={img7}
            alt="interior design"
            className="hidden h-full w-full object-cover md:col-start-11 md:col-end-13 md:row-start-1 md:row-end-8 md:block"
          />
          <img
            src={img8}
            alt="interior design"
            className="hidden h-full w-full object-cover md:col-start-8 md:col-end-10 md:row-start-8 md:row-end-13 md:block"
          />
          <img
            src={img9}
            alt="interior design"
            className="hidden h-full w-full object-cover md:col-start-10 md:col-end-12 md:row-start-8 md:row-end-11 md:block"
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
