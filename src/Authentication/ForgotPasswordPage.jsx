import ForgotPassword from "./ForgotPassword";
import signUpImages from "./SignupImages";
import Carousel from "./Carousel";
function ForgotPasswordPage() {
  return (
    <section className="flex">
      <ForgotPassword />
      <Carousel carouselImages={signUpImages} />
    </section>
  );
}

export default ForgotPasswordPage;
