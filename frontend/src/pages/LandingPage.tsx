import Header from "../components/landingPage/Header";
import Banner from "../components/landingPage/Banner";
import Hero from "../components/landingPage/Hero";
import FaqAccordion from "../components/landingPage/Accordion";
import Footer from "../components/landingPage/Footer";
import { UserService } from "../api/user";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LandingPage() {
  const notifySuccess = () => toast.success("✅ Email subscribed to newsletter !");
  const notifyError = (message: string) => toast.error(`❌ ${message}`);

  const handleNewsletterSubmit = async (email: string) => {
    if (!email.trim()) {
      notifyError("Merci d'entrer un email valide.");
      return;
    }

    try {
      const response = await UserService.addNewsletter(email);

      if (response.success) {
        notifySuccess();
      } else {
        notifyError(response.error || "Une erreur est survenue.");
      }
    } catch (error) {
      notifyError("Erreur lors de l'inscription à la newsletter.");
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <Banner />
      <Hero />
      <FaqAccordion />
      <Footer onSubmitEmail={handleNewsletterSubmit} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}