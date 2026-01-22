import AppLayout from "../layouts/applayout_temp";

const Home = () => {
  return (
    <AppLayout>

      {/* HERO */}
      <section className="section text-center">
        <h1 className="fw-bold mb-4">
          Exchange Skills.
          <br />
          <span style={{ color: "#8b5cf6" }}>Not Money.</span>
        </h1>

        <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "680px" }}>
          BarterBrains is a modern skill-sharing platform where
          learning and teaching happen through a point-based system.
        </p>

        <div className="mt-5">
          <a href="/register" className="btn btn-primary btn-lg me-3">
            Start Learning
          </a>
          <a href="/login" className="btn btn-outline-primary btn-lg">
            Login
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="row">
          {[
            {
              title: "Teach What You Know",
              desc: "Host sessions and earn points by sharing your expertise.",
            },
            {
              title: "Learn Anything",
              desc: "Spend points to learn directly from skilled people.",
            },
            {
              title: "Build Your Profile",
              desc: "Grow credibility and unlock better opportunities.",
            },
          ].map((item, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="card p-4 h-100">
                <h4 className="mb-3">{item.title}</h4>
                <p className="text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </AppLayout>
  );
};

export default Home;
