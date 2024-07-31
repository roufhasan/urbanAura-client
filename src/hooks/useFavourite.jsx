import { useContext } from "react";
import { FavouriteContext } from "../Providers/FavouriteProvider";

const useFavourite = () => {
  const favourite = useContext(FavouriteContext);
  return favourite;
};

export default useFavourite;
