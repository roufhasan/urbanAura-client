const ContactForm = () => {
  return (
    <form>
      <label htmlFor="name" className="mb-3 block font-medium md:mb-5">
        Your name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="John"
        className="border-cadetGray mb-6 rounded-[10px] border  p-3 outline-none focus:border-[#585858] md:mb-9 md:w-80 md:px-7 md:py-6 lg:w-[528px]"
      />
      <label htmlFor="email" className="mb-3 block font-medium md:mb-5">
        Email address
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="john@doe.com"
        className="border-cadetGray mb-6 rounded-[10px] border p-3  outline-none focus:border-[#585858] md:mb-9 md:w-80 md:px-7 md:py-6 lg:w-[528px]"
      />
      <label htmlFor="subject" className="mb-3 block font-medium md:mb-5">
        Subject
      </label>
      <input
        type="text"
        name="subject"
        id="subject"
        placeholder="This is optional"
        className="border-cadetGray mb-6 rounded-[10px] border p-3  outline-none focus:border-[#585858] md:mb-9 md:w-80 md:px-7 md:py-6 lg:w-[528px]"
      />
      <label htmlFor="message" className="mb-3 block font-medium md:mb-5">
        Message
      </label>
      <textarea
        name="message"
        id="message"
        placeholder="Hi! i’d like to ask about"
        className="border-cadetGray mb-6 rounded-[10px] border p-3  pb-6 outline-none focus:border-[#585858] md:mb-9 md:w-80 md:px-7 md:pb-16 md:pt-6 lg:w-[528px]"
      ></textarea>

      <div className="text-center md:text-left">
        <button
          type="submit"
          className="bg-primary px-12 py-3 text-white md:px-16 lg:px-[90px]"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
