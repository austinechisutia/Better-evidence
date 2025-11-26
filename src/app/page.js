import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Steps from "./components/Steps";
import PersonalInfoForm from "./components/PersonalInfoForm";
import dynamic from 'next/dynamic';


export default function Home() {
  return (
   <>
      <Navigation />
      <PersonalInfoForm />
    </>
  );
}
