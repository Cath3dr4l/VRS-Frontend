import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed w-screen h-screen bg-background top-0 z-[100] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <HashLoader color="#fff" size={150} />
        <div className="text-text font-poppins text-4xl mt-10">VIDEODOG</div>
      </div>
    </div>
  );
};

export default Loader;
