import Carousel from "./Carousel";
import signUpImages from "../Authentication/SignupImages";
import SignUpForm from "./SignUpForm";
import Preloader from "../OtherComponents/Preloader";
function SignupPage() {
  return (
    <>
      <section className="flex">
        <SignUpForm />
        <Carousel carouselImages={signUpImages} />
      </section>
    </>
  );
}

export default SignupPage;
