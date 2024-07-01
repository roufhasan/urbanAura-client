import { Rating } from "@smastrom/react-rating";

const Reviews = () => {
  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <div>
          <p className="mb-2 text-2xl font-semibold">Overall Rating</p>
          <div className="flex items-center">
            <p className="mr-1 text-2xl font-semibold">4.9</p>
            <Rating style={{ maxWidth: 140 }} value={3.5} readOnly />
            <p className="ml-2 mt-2 text-[#9f9f9f]">37512 reviews</p>
          </div>
        </div>
        <div>
          <a
            href="#review"
            className="rounded bg-[#b88e2f] px-6 py-4 font-medium text-white transition-all hover:bg-[#9e7b28]"
          >
            Write a review
          </a>
        </div>
      </div>

      <div className="mt-10 divide-y">
        <div className="mt-7 text-sm">
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <Rating style={{ maxWidth: 110 }} value={3} readOnly />
              <p className="ml-1 mt-1 text-[#9f9f9f]">Jackie Chan</p>
            </div>
            <p className="text-[#9f9f9f]">30-12-2024</p>
          </div>
          <p className="mt-1">Good product. I can recommend you.</p>
        </div>
        <div className="mt-7 text-sm">
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <Rating style={{ maxWidth: 110 }} value={5} readOnly />
              <p className="ml-1 mt-1 text-[#9f9f9f]">Rouf Hasan</p>
            </div>
            <p className="text-[#9f9f9f]">30-12-2024</p>
          </div>
          <p className="mt-1">
            Ilhamduliallah valo peyechi product ta- seller er response onek VBIO
            Silo and behavior iS too good ei tar akta jiniSh durb01 Oita h010
            magnetic system Baki sh0b thik ase..l ecommend anyone easily that u
            can buy this product -this iS value for money in this budget
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
