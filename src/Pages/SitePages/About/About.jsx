import { useLocation } from "react-router-dom";
import PageBanner from "../../../components/PageBanner/PageBanner";
import img1 from "../../../assets/images/about/about-1.jpg";
import img2 from "../../../assets/images/about/about-2.jpg";
import img3 from "../../../assets/images/about/about-3.jpg";

const About = () => {
  const { pathname } = useLocation();

  return (
    <section>
      <PageBanner pathname={pathname} />
      <div className="px-[4%] pb-32 md:px-[7%]">
        {/* Our values section */}
        <div className="mb-40 justify-between pt-10 md:flex md:pt-20">
          {/* our values images */}
          <div className="mb-10 flex min-h-80 w-full justify-center md:mb-0 md:w-1/2">
            <div className="relative w-full">
              <img
                className="absolute left-0 top-0 h-60 w-52 rounded-md object-cover object-center shadow-lg md:w-56 lg:h-80 lg:w-72 xl:h-96 xl:w-80"
                src={img2}
                alt="urbanAura board room"
                loading="lazy"
              />
              <img
                className="absolute left-[80px] top-[65px] h-60 w-52 rounded-md object-cover object-center shadow-lg md:w-56 lg:h-80 lg:w-72 xl:left-[30%] xl:top-[25%] xl:h-96 xl:w-80"
                src={img1}
                alt="urbanAura employee"
                loading="lazy"
              />
            </div>
          </div>
          {/* our values details */}
          <div className="w-full md:w-1/2">
            <h2 className="mb-4 uppercase tracking-widest text-gray-400">
              Our Values
            </h2>
            <h1 className="mb-4 font-Montserrat text-[26px] font-bold md:text-3xl lg:text-4xl">
              Meet UrbanAura.
              <br />
              <span className="block">stylish.</span>
              <span className="block">quality.</span>
              <span className="block">comfortable.</span>
              <span className="block">sustainable.</span>
            </h1>
            <p className="mt-6 max-w-md text-gray-400 lg:text-lg">
              At UrbanAura, we believe that furniture is more than just a
              collection of wooden pieces. It&apos;s a way of life. Established
              in 2005, our journey began with a simple mission: to provide
              high-quality, stylish furniture that fits every home and
              lifestyle.
            </p>
          </div>
        </div>

        {/* Our mission section */}
        <div className="justify-between gap-4 md:flex lg:pt-32">
          {/* our mission list */}
          <div className="w-full md:w-1/2">
            <h2 className="mb-4 uppercase tracking-widest text-gray-400">
              Our mission
            </h2>
            <h1 className="mb-4 max-w-md font-Montserrat text-[26px] font-bold md:text-3xl lg:text-4xl">
              Transforming spaces, enriching lives with quality furniture.
            </h1>
            <p className="mt-6 max-w-md text-gray-400">
              We are dedicated to offering high-quality, stylish furniture that
              elevates your living spaces and fits your lifestyle.
            </p>
            <ul className="mt-6 space-y-4">
              <li>
                <h3 className="mb-1 text-xl font-medium">Quality</h3>
                <p className="text-sm">
                  We use the finest materials to create furniture that lasts.
                </p>
              </li>
              <li>
                <h3 className="mb-1 text-xl font-medium">Sustainability</h3>
                <p className="text-sm">Committed to eco-friendly practices.</p>
              </li>
              <li>
                <h3 className="mb-1 text-xl font-medium">Satisfaction</h3>
                <p className="text-sm">Your happiness is our priority.</p>
              </li>
            </ul>
          </div>
          {/* our mission delivery guy img */}
          <div className="mt-10 w-full md:mt-0 md:w-1/2">
            <img
              className="w-[340px] rounded-md"
              src={img3}
              alt="urbanAura delivery"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
