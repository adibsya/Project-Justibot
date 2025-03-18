import React from "react";
import LawFormCard from "./LawFormCard";

const DocumentForm = () => {
  const forms = [
    {
      title: "Surat Perjanjian Kerjasama",
      description:
        "Surat Perjanjian Kerjasama adalah dokumen resmi yang berisi kesepakatan antara dua pihak atau lebih yang bekerja sama dalam suatu proyek, usaha, atau kegiatan tertentu. Surat ini bertujuan untuk mengatur hak dan kewajiban masing-masing pihak serta memastikan bahwa kerja sama berjalan sesuai dengan ketentuan yang telah disepakati.",
      link: "/form/surat-perjanjian-kerjasama",
    },
    {
      title: "Surat Perjanjian Kerjasama",
      description:
        "Surat Perjanjian Kerjasama adalah dokumen resmi yang berisi kesepakatan antara dua pihak atau lebih yang bekerja sama dalam suatu proyek, usaha, atau kegiatan tertentu. Surat ini bertujuan untuk mengatur hak dan kewajiban masing-masing pihak serta memastikan bahwa kerja sama berjalan sesuai dengan ketentuan yang telah disepakati.",
      link: "/form/surat-perjanjian-kerjasama",
    },
    {
      title: "Surat Perjanjian Kerjasama",
      description:
        "Surat Perjanjian Kerjasama adalah dokumen resmi yang berisi kesepakatan antara dua pihak atau lebih yang bekerja sama dalam suatu proyek, usaha, atau kegiatan tertentu. Surat ini bertujuan untuk mengatur hak dan kewajiban masing-masing pihak serta memastikan bahwa kerja sama berjalan sesuai dengan ketentuan yang telah disepakati.",
      link: "/form/surat-perjanjian-kerjasama",
    },
    {
      title: "Surat Perjanjian Kerjasama",
      description:
        "Surat Perjanjian Kerjasama adalah dokumen resmi yang berisi kesepakatan antara dua pihak atau lebih yang bekerja sama dalam suatu proyek, usaha, atau kegiatan tertentu. Surat ini bertujuan untuk mengatur hak dan kewajiban masing-masing pihak serta memastikan bahwa kerja sama berjalan sesuai dengan ketentuan yang telah disepakati.",
      link: "/form/surat-perjanjian-kerjasama",
    },
    {
      title: "Surat Perjanjian Kerjasama",
      description:
        "Surat Perjanjian Kerjasama adalah dokumen resmi yang berisi kesepakatan antara dua pihak atau lebih yang bekerja sama dalam suatu proyek, usaha, atau kegiatan tertentu. Surat ini bertujuan untuk mengatur hak dan kewajiban masing-masing pihak serta memastikan bahwa kerja sama berjalan sesuai dengan ketentuan yang telah disepakati.",
      link: "/form/surat-perjanjian-kerjasama",
    },
    {
      title: "Surat Perjanjian Kerjasama",
      description:
        "Surat Perjanjian Kerjasama adalah dokumen resmi yang berisi kesepakatan antara dua pihak atau lebih yang bekerja sama dalam suatu proyek, usaha, atau kegiatan tertentu. Surat ini bertujuan untuk mengatur hak dan kewajiban masing-masing pihak serta memastikan bahwa kerja sama berjalan sesuai dengan ketentuan yang telah disepakati.",
      link: "/form/surat-perjanjian-kerjasama",
    },
    {
      title: "Surat Perjanjian Kerjasama",
      description:
        "Surat Perjanjian Kerjasama adalah dokumen resmi yang berisi kesepakatan antara dua pihak atau lebih yang bekerja sama dalam suatu proyek, usaha, atau kegiatan tertentu. Surat ini bertujuan untuk mengatur hak dan kewajiban masing-masing pihak serta memastikan bahwa kerja sama berjalan sesuai dengan ketentuan yang telah disepakati.",
      link: "/form/surat-perjanjian-kerjasama",
    },
    {
      title: "Surat Perjanjian Kerjasama",
      description:
        "Surat Perjanjian Kerjasama adalah dokumen resmi yang berisi kesepakatan antara dua pihak atau lebih yang bekerja sama dalam suatu proyek, usaha, atau kegiatan tertentu. Surat ini bertujuan untuk mengatur hak dan kewajiban masing-masing pihak serta memastikan bahwa kerja sama berjalan sesuai dengan ketentuan yang telah disepakati.",
      link: "/form/surat-perjanjian-kerjasama",
    },
    // Add more forms as needed
  ];

  return (
    <div className="bg-primary rounded-t-3xl p-8">
      <div className="flex flex-wrap gap-5 justify-center">
        {forms.map((form, index) => (
          <LawFormCard
            key={index}
            title={form.title}
            description={form.description}
            link={form.link}
          />
        ))}
      </div>
    </div>
  );
};

export default DocumentForm;
