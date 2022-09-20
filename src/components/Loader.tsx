// Icons
import loader from "../assets/icons/loader.svg";

const Loader = () => {
  return (
    <div className={"loader"}>
      <div className="loader inner">
        <img src={loader} alt="" />
      </div>
    </div>
  );
};

export default Loader;
