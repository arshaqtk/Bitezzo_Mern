import Lottie from "lottie-react";
import searchnotfound from "../../../assets/NO RESULTS.json";

export const SearchNotFound = () => {
  return (
    <Lottie
      animationData={searchnotfound}
      loop={true}
      autoplay={true}
      style={{ width: 200, height: 200 }}
    />
  );
};
