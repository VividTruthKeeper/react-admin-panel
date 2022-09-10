// Modules
import { useState } from "react";

// Components
import Nav from "../components/Nav";
import Aside from "../components/Aside";

const Main = ({ child }: any) => {
  const [aside, setAside] = useState(true);

  return (
    <main className="main">
      <div className="main__top">
        <Nav aside={aside} setAside={setAside} />
      </div>
      <div className="main__mid">
        <Aside aside={aside} setAside={setAside} />
        <div className="main-inner">{child}</div>
      </div>
    </main>
  );
};

export default Main;
