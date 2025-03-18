import React from "react";
import DocumentHero from "../components/Document/DocumentHero";
import DocumentForm from "../components/Document/DocumentForm";

const Document = () => {
  return (
    <div className="min-h-screen bg-onPrimary">
      <DocumentHero />
      <DocumentForm />
    </div>
  );
};

export default Document;
