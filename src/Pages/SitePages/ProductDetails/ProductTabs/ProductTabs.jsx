import { useState } from "react";
// images
import sofa1 from "../../../../assets/images/sofa1.jpg";
import sofa2 from "../../../../assets/images/sofa2.jpg";

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("des");

  const description = (
    <div className="text-[#9f9f9f]">
      <div className="px-[10%]">
        <p className="mb-7 mt-9">
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
          src={sofa1}
          alt="sofa three seated"
          className="h-full max-h-[348px] w-full rounded-[10px] object-cover object-center"
        />
        <img
          src={sofa2}
          alt="sofa three seated"
          className="h-full max-h-[348px] w-full rounded-[10px] object-cover object-center"
        />
      </div>
    </div>
  );

  const additionalInfo = (
    <>
      <p>Additional information</p>
    </>
  );

  const reviews = (
    <>
      <p>reviews i am who are you.</p>
    </>
  );

  return (
    <div className="pt-12">
      {/* tab buttons */}
      <div className="flex items-center justify-center md:gap-12">
        <button
          onClick={() => setActiveTab("des")}
          className={`text-2xl text-[#9f9f9f] ${activeTab === "des" && "font-medium text-black"}`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("addInfo")}
          className={`text-2xl text-[#9f9f9f] ${activeTab === "addInfo" && "font-medium text-black"}`}
        >
          Additional Information
        </button>
        <button
          onClick={() => setActiveTab("rev")}
          className={`text-2xl text-[#9f9f9f] ${activeTab === "rev" && "font-medium text-black"}`}
        >
          Reviews [5]
        </button>
      </div>

      {/* render active tab content */}
      {activeTab === "des" && description}
      {activeTab === "addInfo" && additionalInfo}
      {activeTab === "rev" && reviews}
    </div>
  );
};

export default ProductTabs;
