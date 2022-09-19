// Modules
import { IconContext } from "react-icons";

// Icons
import { AiOutlineDashboard } from "react-icons/ai";

// Components
import StatCard from "../components/StatCard";

const Dashboard = () => {
  return (
    <main className="dashboard">
      <div className="container">
        <div className="dashboard inner">
          <div className="dashboard__head">
            <IconContext.Provider value={{ color: "#8DD77F" }}>
              <AiOutlineDashboard className="dashboard__img" />
            </IconContext.Provider>

            <h1>Dashboard</h1>
          </div>
          <div className="dashboard__content__stats">
            <StatCard
              color="yellow"
              text="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
              topNumber={123}
            />
            <StatCard
              color="green"
              text="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
              topNumber={123}
            />
            <StatCard
              color="violet"
              text="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
              topNumber={123}
            />
            <StatCard
              color="black"
              text="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
              topNumber={123}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
