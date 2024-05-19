import { useState } from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook, BsLinkedin } from "react-icons/bs";

const images = [
  "https://i.ibb.co/QnH1cQr/xie-yujie-nick-et-FRTql2qp-M-unsplash.jpg",
  "https://i.ibb.co/610rDYv/andrea-davis-z-OPRKa-YLSd-E-unsplash.jpg",
  "https://i.ibb.co/s3txsYh/ahmed-amir-j-AA28-GP8-JVo-unsplash.jpg",
  "https://i.ibb.co/gDzSpbn/behnam-norouzi-ph-Xwn-WWz-BM-unsplash.jpg",
  "https://i.ibb.co/4KcwSbP/armin-djuhic-mc-L2f-J74-GY-unsplash.jpg",
];

const ProductOverview = () => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="justify-between md:flex">
      {/* gallery container */}
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        {/* thumbnail */}
        <div className="flex justify-evenly md:flex-col md:justify-start md:gap-8">
          {images.slice(1, 5).map((image, index) => {
            return (
              <img
                key={index}
                src={image}
                alt="shop image"
                onMouseEnter={() => setMainImage(image)}
                className={`size-16 rounded-[10px] border-[3px] object-cover object-center transition-all duration-150 ease-in md:h-20 md:w-[76px] ${image === mainImage ? "border-[#b88e2f]" : "border-transparent"}`}
              ></img>
            );
          })}
        </div>
        {/* main image */}
        <div>
          <img
            src={mainImage}
            alt=""
            className="h-[450px] w-full rounded-[10px] object-cover object-center md:h-[500px] md:max-h-[500px] md:w-[420px] md:max-w-[420px]"
          />
        </div>
      </div>

      {/* product info container */}
      <div className="mt-8">
        <h1 className="text-[42px]">Asgaard sofa</h1>
        <p className="text-2xl font-medium text-[#9f9f9f]">$ 250,000.00</p>
        <div className="mb-4 mt-3 flex flex-wrap items-center gap-5">
          <p>⭐⭐⭐⭐⭐</p>
          <div className="h-8 w-0.5 bg-[#9f9f9f]"></div>
          <p className="text-sm text-[#9f9f9f]">5 customer review</p>
        </div>

        <p className="mb-6 w-full max-w-md text-sm">
          Setting the bar as one of the loudest speakers in its class, the
          Kilburn is a compact, stout-hearted hero with a well-balanced audio
          which boasts a clear midrange and extended highs for a sound.
        </p>

        <div className="text-sm">
          <p className="text-[#9f9f9f]">Size</p>
          <div className="mt-3 flex gap-4">
            <button className="size-8 rounded-md bg-[#b88e2f] text-white">
              L
            </button>
            <button className="size-8 rounded-md bg-[#f9f1e7]">XL</button>
            <button className="size-8 rounded-md bg-[#f9f1e7]">XS</button>
          </div>
        </div>

        <div className="mt-5 text-sm">
          <p className="text-[#9f9f9f]">Color</p>
          <div className="mt-3 flex gap-4">
            <div className="size-8 rounded-full bg-violet-500"></div>
            <div className="size-8 rounded-full bg-black"></div>
            <div className="size-8 rounded-full bg-[#b88e2f]"></div>
          </div>
        </div>

        {/* buttons */}
        <div className="mb-16 mt-8 flex flex-col gap-4 md:flex-row">
          <button className="flex justify-center gap-9 rounded-[10px] border border-[#9f9f9f] p-4 md:p-5">
            -<span className="font-medium">1</span>+
          </button>
          <button className="flex justify-center rounded-[10px] border border-black py-4 text-xl md:px-12">
            Add To Cart
          </button>
          <button className="flex justify-center gap-2.5 rounded-[10px] border border-black py-[14px] text-2xl md:px-12">
            + <span className="text-xl">Compare</span>
          </button>
        </div>

        <div className="border-t border-[#d9d9d9] pt-10">
          <div className="grid gap-3 text-[#9f9f9f]">
            <div className="grid grid-cols-[90px_34px_auto]">
              <span>SKU</span>
              <span className="text-center">:</span>
              <span>SS001</span>
            </div>
            <div className="grid grid-cols-[90px_34px_auto]">
              <span>Category</span>
              <span className="text-center">:</span>
              <span>Sofas</span>
            </div>
            <div className="grid grid-cols-[90px_34px_auto]">
              <span>Tags</span>
              <span className="text-center">:</span>
              <span>Sofa, Chair, Home, Shop</span>
            </div>
            <div className="grid grid-cols-[90px_34px_auto]">
              <span>Share</span>
              <span className="text-center">:</span>
              <span className="flex items-center gap-6">
                <a href="#" className="text-black">
                  <BsFacebook size={20} />
                </a>
                <a href="#" className="text-black">
                  <BsLinkedin size={20} />
                </a>
                <a href="#" className="text-black">
                  <AiFillTwitterCircle size={25} />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
