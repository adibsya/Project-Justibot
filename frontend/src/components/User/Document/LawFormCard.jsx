import React from "react";

const LawFormCard = ({ title, description, link }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 w-72 bg-secondary text-white">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link}>
        <button className="bg-gray-200 text-black py-2 px-4 border-none rounded cursor-pointer mt-4">
          Isi Formulir
        </button>
      </a>
    </div>
  );
};

export default LawFormCard;
