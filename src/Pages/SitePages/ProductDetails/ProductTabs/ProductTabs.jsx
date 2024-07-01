import { useState } from "react";
import InfoTab from "../../../../components/InfoTab/InfoTab";
import Reviews from "../../../../components/Reviews/Reviews";

const ProductTabs = ({ gallery }) => {
  const [activeTab, setActiveTab] = useState("des");

  const description = (
    <div className="text-[#9f9f9f]">
      <div className="px-[10%]">
        <p className="mb-7">
          Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
          portable active stereo speaker takes the unmistakable look and sound
          of Marshall, unplugs the chords, and takes the show on the road.
        </p>
        <p>
          Weighing in under 7 pounds, the Kilburn is a lightweight piece of
          vintage styled engineering. Setting the bar as one of the loudest
          speakers in its class, the Kilburn is a compact, stout-hearted hero
          with a well-balanced audio which boasts a clear midrange and extended
          highs for a sound that is both articulate and pronounced. The analogue
          knobs allow you to fine tune the controls to your personal preferences
          while the guitar-influenced leather strap enables easy and stylish
          travel.
        </p>
      </div>
      <div className="mt-9 gap-7 md:flex">
        <img
          src={gallery[0]}
          alt="sofa three seated"
          className="h-full max-h-[348px] w-full rounded-[10px] object-cover object-center md:w-1/2"
        />
        <img
          src={gallery[1]}
          alt="sofa three seated"
          className="h-full max-h-[348px] w-full rounded-[10px] object-cover object-center md:w-1/2"
        />
      </div>
    </div>
  );

  return (
    <div className="pt-12">
      {/* tab buttons */}
      <div className="mb-9 flex items-center justify-center space-x-2 sm:space-x-7 md:gap-12">
        <button
          onClick={() => setActiveTab("des")}
          className={`text-base text-[#9f9f9f] md:text-lg lg:text-xl xl:text-2xl ${activeTab === "des" && "font-medium text-black"}`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("addInfo")}
          className={`text-base text-[#9f9f9f] md:text-lg lg:text-xl xl:text-2xl ${activeTab === "addInfo" && "font-medium text-black"}`}
        >
          Additional <span className="sm:hidden">Info</span>
          <span className="hidden sm:inline-block">Information</span>
        </button>
        <button
          onClick={() => setActiveTab("rev")}
          className={`text-base text-[#9f9f9f] md:text-lg lg:text-xl xl:text-2xl ${activeTab === "rev" && "font-medium text-black"}`}
        >
          Reviews [5]
        </button>
      </div>

      {/* render active tab content */}
      {activeTab === "des" && description}
      {activeTab === "addInfo" && <InfoTab />}
      {activeTab === "rev" && <Reviews />}
    </div>
  );
};

export default ProductTabs;
