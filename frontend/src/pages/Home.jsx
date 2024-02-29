import { Link } from "react-router-dom";
import Hero from "../../public/hero-img.png";
function Home() {
  return (
    <>
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h1>Better Platform For Your Creativity</h1>
              <h2>I am full stack developer making websites with Bootstrap</h2>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <Link to="/blogs" className="btn-get-started scrollto">
                  Get Started
                </Link>
              </div>
            </div>
            <div
              className="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img src={Hero} className="img-fluid animated" alt="" />
            </div>
          </div>
          {/* yaha tak  */}
        </div>
      </section>
    </>
  );
}

export default Home;
