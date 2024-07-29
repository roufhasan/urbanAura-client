import axios from "axios";

export const uploadImagesToImgbb = async (images) => {
  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_Image_Upload_API_Key
  }`;
  const defaultImageLink =
    "https://i.ibb.co/s3txsYh/ahmed-amir-j-AA28-GP8-JVo-unsplash.jpg";

  const uploadPromises = images.map(async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { success: true, url: response.data.data.url };
    } catch (error) {
      console.error("Error uploading image:", error);
      return { success: false, url: defaultImageLink };
    }
  });

  const results = await Promise.all(uploadPromises);
  return results;
};
