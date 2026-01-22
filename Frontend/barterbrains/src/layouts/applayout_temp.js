import Navbar from "../components/Navbar";

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container py-5">{children}</div>
    </>
  );
};

export default AppLayout;
