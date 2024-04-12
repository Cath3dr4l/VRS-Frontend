import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed w-screen h-screen bg-background top-0 z-[100] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <HashLoader color="#fff" size={200} />
        <div className="text-text font-poppins text-5xl mt-10">
          <span className="text-red-500 text-6xl font-semibold">V</span>IDEO
          <span className="inline-block text-red-500 font-semibold text-6xl transform rotate-30">
            D
          </span>
          OG
        </div>
      </div>
    </div>
  );
};

export default Loader;
