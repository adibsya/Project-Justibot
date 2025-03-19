import React from "react";
import BenefitCard from "../components/Lawyer/BenefitCard";
import Iklan from "../components/Lawyer/Iklan";
import LawyerDir from "../components/Lawyer/LawyerDir";
import LawyersList from "../components/Lawyer/LawyersList";

const Lawyer = () => {
  return (
    <div className="min-h-screen bg-onPrimary">
      <LawyerDir />
      <Iklan />
      <BenefitCard />
      <LawyersList />
    </div>
  );
};

export default Lawyer;
