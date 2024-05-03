import { Link } from "react-router-dom";
import categoryImg1 from "../../../../assets/images/home/category-1.png";
import categoryImg2 from "../../../../assets/images/home/category-2.png";
import categoryImg3 from "../../../../assets/images/home/category-3.png";

const Categories = () => {
  const categoryItems = [
    { img: categoryImg1, text: "Dining", link: "/categoy/dining" },
    { img: categoryImg2, text: "Living", link: "/categoy/living" },
    { img: categoryImg3, text: "Bedroom", link: "/categoy/bedroom" },
  ];

  return (
    <section className="px-[4%] text-[#333] md:px-[10%]">
      <h1 className="mt-14 text-center text-3xl font-bold">Browse The Range</h1>
      <p className="text-center text-lg text-[#666] md:text-xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div className="mt-12 gap-x-5 md:flex">
        {categoryItems.map((item) => (
          <div key={item.text}>
            <Link to={item.link}>
              <img
                src={item.img}
                alt={`image of ${item.text} room`}
                className="h-96 rounded-[10px] object-cover md:h-[480px]"
              />
            </Link>
            <Link
              to={item.link}
              className="mb-8 mt-4 block text-center text-xl font-semibold md:mt-7 md:text-2xl"
            >
              {item.text}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
