import React from "react";
import BenefitCard from "../../components/User/Lawyer/BenefitCard";
import Iklan from "../../components/User/Lawyer/Iklan";
import LawyerDir from "../../components/User/Lawyer/LawyerDir";
import LawyersList from "../../components/User/Lawyer/LawyersList";

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
