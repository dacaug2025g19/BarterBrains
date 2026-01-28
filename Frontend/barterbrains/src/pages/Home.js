
import AppLayout from "../layouts/applayout_temp";
import "../css/Home.css";

const Home = () => {
  return (
    <AppLayout>
      <div className="home-hero-bg">
        <div className="home-hero">

          <h1 className="home-main-title">
            Exchange Skills.<br />
            <span className="home-main-title-accent">Not Money.</span>
          </h1>
          <div className="home-main-desc">
            BarterBrains is a modern skill-sharing platform where learning and teaching happen through a point-based system. Teach to earn, learn to grow.
          </div>
          <div className="home-hero-actions">
            <a href="/register" className="home-hero-btn primary">Start Learning Free</a>
            <a href="/login" className="home-hero-btn secondary">Login</a>
          </div>
        </div>
      </div>
      <div className="home-features-section">
        <h2 className="home-features-title">Everything you need to <span className="home-features-title-accent">grow</span></h2>
        <div className="home-features-desc">A complete platform designed to make skill-sharing seamless, rewarding, and fun.</div>
        <div className="home-features-grid">
          {[
            {
              icon: "🎓",
              title: "Teach What You Know",
              desc: "Host sessions and earn points by sharing your expertise with eager learners.",
            },
            {
              icon: "👥",
              title: "Learn Anything",
              desc: "Spend points to learn directly from skilled people in your community.",
            },
            {
              icon: "🏆",
              title: "Build Your Profile",
              desc: "Grow credibility through reviews and unlock better opportunities.",
            },
            {
              icon: "⚡",
              title: "Instant Matching",
              desc: "Our smart algorithm connects you with the perfect learning partners.",
            },
            {
              icon: "🌐",
              title: "Global Community",
              desc: "Connect with learners and teachers from around the world.",
            },
            {
              icon: "💡",
              title: "Inspire & Be Inspired",
              desc: "Share your journey, discover new passions, and motivate others in a thriving, supportive network.",
            },
            
          ].map((item, i) => (
            <div className="home-feature-card" key={i}>
              <div className="home-feature-icon">{item.icon}</div>
              <div className="home-feature-title">{item.title}</div>
              <div className="home-feature-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

     
    </AppLayout>
  );
};

export default Home;
