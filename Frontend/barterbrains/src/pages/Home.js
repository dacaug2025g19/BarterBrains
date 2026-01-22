import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/applayout_temp";

const Home = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      {/* HERO SECTION */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Learn • Teach • Exchange Skills</h1>

        <p className="text-secondary mt-3">
          A skill-sharing platform where users learn and teach
          through a point-based barter system instead of money.
        </p>

        <div className="mt-4">
          <button
            className="btn btn-info btn-lg text-dark me-3"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

          <button
            className="btn btn-outline-info btn-lg"
            onClick={() => navigate("/skills")}
          >
            Explore Skills
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card bg-black text-light h-100 border-secondary">
            <div className="card-body">
              <h5 className="card-title text-info">Teach Skills</h5>
              <p className="card-text text-secondary">
                Create sessions and share your knowledge with others.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card bg-black text-light h-100 border-secondary">
            <div className="card-body">
              <h5 className="card-title text-info">Learn Skills</h5>
              <p className="card-text text-secondary">
                Book sessions and learn from skilled users.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card bg-black text-light h-100 border-secondary">
            <div className="card-body">
              <h5 className="card-title text-info">Earn Points</h5>
              <p className="card-text text-secondary">
                Get rewarded for teaching and learning activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;

