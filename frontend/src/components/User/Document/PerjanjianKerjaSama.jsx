import React, { useState } from "react";
import Stepper, { Step } from "./Stepper"; // Assuming Stepper is imported from a separate file
import { saveAs } from "file-saver"; // You'll need to install this: npm install file-saver
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Header,
  Footer,
  Spacing,
} from "docx"; // For DOCX: npm install docx
import { jsPDF } from "jspdf"; // For PDF: npm install jspdf

const PerjanjianKerjaSama = () => {
  const [formData, setFormData] = useState({
    pihakPertama: "",
    organisasiPertama: "",
    alamatPertama: "",
    pihakKedua: "",
    organisasiKedua: "",
    alamatKedua: "",
    ruangLingkup: "",
    hakKewajibanPertama: "",
    hakKewajibanKedua: "",
    tanggalMulai: "",
    tanggalBerakhir: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to format date to Indonesian format
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  // Generate DOCX document
  const generateDocx = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              text: "PERJANJIAN KERJA SAMA",
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              text: `Pada hari ini, ${formatDate(new Date().toISOString().split("T")[0])}, yang bertanda tangan di bawah ini:`,
              spacing: {
                after: 300,
              },
            }),
            new Paragraph({
              text: `1. ${formData.pihakPertama}, mewakili ${formData.organisasiPertama}, beralamat di ${formData.alamatPertama}, selanjutnya disebut sebagai PIHAK PERTAMA.`,
              spacing: {
                after: 300,
              },
            }),
            new Paragraph({
              text: `2. ${formData.pihakKedua}, mewakili ${formData.organisasiKedua}, beralamat di ${formData.alamatKedua}, selanjutnya disebut sebagai PIHAK KEDUA.`,
              spacing: {
                after: 300,
              },
            }),
            new Paragraph({
              text: "PIHAK PERTAMA dan PIHAK KEDUA selanjutnya secara bersama-sama disebut sebagai PARA PIHAK.",
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              text: "RUANG LINGKUP KERJA SAMA",
              spacing: {
                before: 400,
                after: 300,
              },
            }),
            new Paragraph({
              text: formData.ruangLingkup,
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              text: "HAK DAN KEWAJIBAN PIHAK PERTAMA",
              spacing: {
                before: 400,
                after: 300,
              },
            }),
            new Paragraph({
              text: formData.hakKewajibanPertama,
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              text: "HAK DAN KEWAJIBAN PIHAK KEDUA",
              spacing: {
                before: 400,
                after: 300,
              },
            }),
            new Paragraph({
              text: formData.hakKewajibanKedua,
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              text: "JANGKA WAKTU PERJANJIAN",
              spacing: {
                before: 400,
                after: 300,
              },
            }),
            new Paragraph({
              text: `Perjanjian ini berlaku sejak ${formatDate(formData.tanggalMulai)} sampai dengan ${formatDate(formData.tanggalBerakhir)}.`,
              spacing: {
                after: 600,
              },
            }),
            new Paragraph({
              text: "",
              spacing: {
                after: 600,
              },
            }),
            new Paragraph({
              text: "PIHAK PERTAMA,                                                                PIHAK KEDUA,",
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 1200,
              },
            }),
            new Paragraph({
              text: `${formData.pihakPertama}                                                                ${formData.pihakKedua}`,
              alignment: AlignmentType.CENTER,
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    saveAs(new Blob([buffer]), "Perjanjian_Kerja_Sama.docx");
  };

  // Generate PDF document with improved spacing
  const generatePdf = () => {
    const doc = new jsPDF();
    let yPos = 20; // Starting Y position
    const lineHeight = 7; // Line height
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    // Helper function to add text with proper spacing
    const addText = (
      text,
      fontSize = 12,
      isBold = false,
      alignment = "left",
      spacing = lineHeight,
    ) => {
      if (isBold) doc.setFont("helvetica", "bold");
      else doc.setFont("helvetica", "normal");

      doc.setFontSize(fontSize);

      // Check if we need to move to next page
      if (yPos > 270) {
        // Close to bottom of page
        doc.addPage();
        yPos = 20; // Reset Y position for new page
      }

      // Handle multiline text
      const lines = doc.splitTextToSize(text, contentWidth);

      // Add text with proper alignment
      if (alignment === "center") {
        doc.text(lines, pageWidth / 2, yPos, { align: "center" });
      } else {
        doc.text(lines, margin, yPos);
      }

      // Move Y position down after text plus extra spacing
      yPos += lines.length * lineHeight + spacing;
    };

    // Title
    addText("PERJANJIAN KERJA SAMA", 18, true, "center", 10);

    // Introduction
    addText(
      `Pada hari ini, ${formatDate(new Date().toISOString().split("T")[0])}, yang bertanda tangan di bawah ini:`,
    );

    // Party 1
    addText(
      `1. ${formData.pihakPertama}, mewakili ${formData.organisasiPertama}, beralamat di ${formData.alamatPertama}, selanjutnya disebut sebagai PIHAK PERTAMA.`,
    );

    // Party 2
    addText(
      `2. ${formData.pihakKedua}, mewakili ${formData.organisasiKedua}, beralamat di ${formData.alamatKedua}, selanjutnya disebut sebagai PIHAK KEDUA.`,
    );

    // Both parties
    addText(
      "PIHAK PERTAMA dan PIHAK KEDUA selanjutnya secara bersama-sama disebut sebagai PARA PIHAK.",
      12,
      false,
      "left",
      10,
    );

    // Agreement scope
    addText("RUANG LINGKUP KERJA SAMA", 14, true, "left", 3);
    addText(formData.ruangLingkup, 12, false, "left", 10);

    // Party 1 rights
    addText("HAK DAN KEWAJIBAN PIHAK PERTAMA", 14, true, "left", 3);
    addText(formData.hakKewajibanPertama, 12, false, "left", 10);

    // Party 2 rights
    addText("HAK DAN KEWAJIBAN PIHAK KEDUA", 14, true, "left", 3);
    addText(formData.hakKewajibanKedua, 12, false, "left", 10);

    // Agreement timeline
    addText("JANGKA WAKTU PERJANJIAN", 14, true, "left", 3);
    addText(
      `Perjanjian ini berlaku sejak ${formatDate(formData.tanggalMulai)} sampai dengan ${formatDate(formData.tanggalBerakhir)}.`,
      12,
      false,
      "left",
      15,
    );

    // Signatures section
    yPos = Math.min(yPos, 230); // Ensure signatures are not too low on the page
    addText(
      "PIHAK PERTAMA,                                                      PIHAK KEDUA,",
      12,
      true,
      "center",
      25,
    );
    addText(
      `${formData.pihakPertama}                                                      ${formData.pihakKedua}`,
      12,
      true,
      "center",
    );

    doc.save("Perjanjian_Kerja_Sama.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-secondary">
      <div className="bg-secondary w-full mt-12 py-10 px-4">
        <h2 className="text-center text-2xl font-bold text-onPrimary">
          Formulir Perjanjian Kerja Sama
        </h2>
        <p className="text-center text-lg px-20 text-onPrimary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          eveniet, blanditiis dolore praesentium, natus laborum nisi et velit
          commodi vitae, corrupti quia? Cum suscipit commodi enim atque amet nam
          sunt.
        </p>
      </div>

      <div className="flex flex-col bg-onPrimary items-center justify-center w-full px-4 py-6">
        <div className="w-full max-w-4xl">
          <Stepper
            onFinalStepCompleted={() => {}}
            stepCircleContainerClassName="bg-primary rounded-t-lg p-4"
            stepContainerClassName="bg-primary"
            contentClassName="bg-primary"
            footerClassName="bg-primary rounded-b-lg"
            nextButtonProps={{
              className:
                "bg-secondary flex flex-row items-center p-3 rounded-md text-onPrimary font-bold hover:bg-accent transition duration-300",
            }}
            backButtonProps={{
              className:
                "text-gray-700 font-medium hover:text-gray-900 transition duration-300",
            }}
            nextButtonText="Lanjut"
            backButtonText="Kembali"
          >
            {/* Step 1: Input Form */}
            <Step>
              <div className="bg-primary p-6">
                <h3 className="text-xl font-bold mb-4">
                  Form Input Perjanjian Kerja Sama
                </h3>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Pihak Pertama:
                      </label>
                      <input
                        type="text"
                        name="pihakPertama"
                        placeholder="Masukkan nama pihak pertama"
                        value={formData.pihakPertama}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary placeholder-gray-400 text-black transition duration-200 ease-in-out hover:border-secondary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Organisasi Pihak Pertama:
                      </label>
                      <input
                        type="text"
                        name="organisasiPertama"
                        placeholder="Masukkan nama organisasi pihak pertama"
                        value={formData.organisasiPertama}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary placeholder-gray-400 text-black transition duration-200 ease-in-out hover:border-secondary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Alamat Pihak Pertama:
                    </label>
                    <input
                      type="text"
                      name="alamatPertama"
                      placeholder="Masukkan alamat pihak pertama"
                      value={formData.alamatPertama}
                      onChange={handleChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary placeholder-gray-400 text-black transition duration-200 ease-in-out hover:border-secondary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Pihak Kedua:
                      </label>
                      <input
                        type="text"
                        name="pihakKedua"
                        placeholder="Masukkan nama pihak kedua"
                        value={formData.pihakKedua}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary placeholder-gray-400 text-black transition duration-200 ease-in-out hover:border-secondary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Organisasi Pihak Kedua:
                      </label>
                      <input
                        type="text"
                        name="organisasiKedua"
                        placeholder="Masukkan nama organisasi pihak kedua"
                        value={formData.organisasiKedua}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary placeholder-gray-400 text-black transition duration-200 ease-in-out hover:border-secondary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Alamat Pihak Kedua:
                    </label>
                    <input
                      type="text"
                      name="alamatKedua"
                      placeholder="Masukkan alamat pihak kedua"
                      value={formData.alamatKedua}
                      onChange={handleChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary placeholder-gray-400 text-black transition duration-200 ease-in-out hover:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ruang Lingkup Kerja Sama:
                    </label>
                    <textarea
                      name="ruangLingkup"
                      placeholder="Masukkan ruang lingkup kerja sama"
                      value={formData.ruangLingkup}
                      onChange={handleChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary placeholder-gray-400 text-black transition duration-200 ease-in-out hover:border-secondary resize-y"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Hak dan Kewajiban Pihak Pertama:
                    </label>
                    <textarea
                      name="hakKewajibanPertama"
                      placeholder="Masukkan hak dan kewajiban pihak pertama"
                      value={formData.hakKewajibanPertama}
                      onChange={handleChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary placeholder-gray-400 text-black transition duration-200 ease-in-out hover:border-secondary resize-y"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Hak dan Kewajiban Pihak Kedua:
                    </label>
                    <textarea
                      name="hakKewajibanKedua"
                      placeholder="Masukkan hak dan kewajiban pihak kedua"
                      value={formData.hakKewajibanKedua}
                      onChange={handleChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary placeholder-gray-400 text-black transition duration-200 ease-in-out hover:border-secondary resize-y"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal Mulai:
                      </label>
                      <input
                        type="date"
                        name="tanggalMulai"
                        value={formData.tanggalMulai}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary placeholder-gray-400 text-black transition duration-200 ease-in-out hover:border-secondary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal Berakhir:
                      </label>
                      <input
                        type="date"
                        name="tanggalBerakhir"
                        value={formData.tanggalBerakhir}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary placeholder-gray-400 text-black transition duration-200 ease-in-out hover:border-secondary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Step>

            {/* Step 2: Preview - Fixed to prevent content overlapping */}
            <Step>
              <div className="bg-primary p-6">
                <h3 className="text-xl font-bold mb-4">Preview Dokumen</h3>
                <div className="bg-white text-black p-8 rounded-lg shadow-lg overflow-auto max-h-[600px]">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold uppercase">
                      PERJANJIAN KERJA SAMA
                    </h1>
                  </div>

                  <div className="space-y-6">
                    {" "}
                    {/* Added proper spacing between sections */}
                    <div className="mb-6">
                      <p>
                        Pada hari ini,{" "}
                        {formatDate(new Date().toISOString().split("T")[0])},
                        yang bertanda tangan di bawah ini:
                      </p>
                    </div>
                    <div className="mb-6">
                      <p className="mb-3">
                        1. {formData.pihakPertama}, mewakili{" "}
                        {formData.organisasiPertama}, beralamat di{" "}
                        {formData.alamatPertama}, selanjutnya disebut sebagai
                        PIHAK PERTAMA.
                      </p>

                      <p>
                        2. {formData.pihakKedua}, mewakili{" "}
                        {formData.organisasiKedua}, beralamat di{" "}
                        {formData.alamatKedua}, selanjutnya disebut sebagai
                        PIHAK KEDUA.
                      </p>
                    </div>
                    <div className="mb-8">
                      <p>
                        PIHAK PERTAMA dan PIHAK KEDUA selanjutnya secara
                        bersama-sama disebut sebagai PARA PIHAK.
                      </p>
                    </div>
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-3">
                        RUANG LINGKUP KERJA SAMA
                      </h2>
                      <p className="whitespace-pre-wrap">
                        {formData.ruangLingkup || "Belum diisi"}
                      </p>
                    </div>
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-3">
                        HAK DAN KEWAJIBAN PIHAK PERTAMA
                      </h2>
                      <p className="whitespace-pre-wrap">
                        {formData.hakKewajibanPertama || "Belum diisi"}
                      </p>
                    </div>
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-3">
                        HAK DAN KEWAJIBAN PIHAK KEDUA
                      </h2>
                      <p className="whitespace-pre-wrap">
                        {formData.hakKewajibanKedua || "Belum diisi"}
                      </p>
                    </div>
                    <div className="mb-10">
                      <h2 className="text-xl font-bold mb-3">
                        JANGKA WAKTU PERJANJIAN
                      </h2>
                      <p>
                        Perjanjian ini berlaku sejak{" "}
                        {formatDate(formData.tanggalMulai) || "[tanggal mulai]"}{" "}
                        sampai dengan{" "}
                        {formatDate(formData.tanggalBerakhir) ||
                          "[tanggal berakhir]"}
                        .
                      </p>
                    </div>
                  </div>

                  {/* Signature section with improved layout */}
                  <div className="mt-16 pt-8 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="text-center">
                        <p className="font-bold mb-16">PIHAK PERTAMA,</p>
                        <p>{formData.pihakPertama || "[Nama Pihak Pertama]"}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold mb-16">PIHAK KEDUA,</p>
                        <p>{formData.pihakKedua || "[Nama Pihak Kedua]"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Step>

            {/* Step 3: Download */}
            <Step>
              <div className="bg-primary p-6">
                <h3 className="text-xl font-bold mb-4">Download Dokumen</h3>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <p className="text-center text-lg mb-8">
                    Pilih format dokumen yang ingin Anda unduh:
                  </p>

                  <div className="flex flex-col md:flex-row justify-center gap-6">
                    <button
                      onClick={generateDocx}
                      className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-lg hover:border-secondary hover:bg-gray-50 transition duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="#2B579A"
                      >
                        <path d="M21.17 3.25H2.83c-.46 0-.83.37-.83.82v15.79c0 .45.37.82.83.82h18.34c.46 0 .83-.37.83-.82V4.07c0-.45-.37-.82-.83-.82zM8.04 8.25H6.22V7.35h1.82V8.25zm9.78 6.01l-4.34-.04v1.04H9.07v-1.04l-4.05.04v-1.21l3.51-3.6c.53-.54.77-1.01.77-1.47 0-.25-.08-.45-.24-.58-.16-.14-.37-.21-.64-.21-.25 0-.47.08-.65.23-.18.15-.31.37-.38.65l-1.43-.58c.14-.45.4-.83.79-1.14.38-.31.88-.46 1.49-.46.7 0 1.26.19 1.66.58.4.39.61.9.61 1.53 0 .5-.13.95-.39 1.35-.26.4-.64.83-1.15 1.3L7.58 12.8h2.76v-1.93h1.75v1.93h2.72v1.46h.01z" />
                      </svg>
                      <span className="text-xl mt-3 font-medium">DOCX</span>
                      <span className="text-sm text-gray-500 mt-1">
                        Microsoft Word
                      </span>
                    </button>

                    <button
                      onClick={generatePdf}
                      className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-lg hover:border-secondary hover:bg-gray-50 transition duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="#F40F02"
                      >
                        <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
                      </svg>
                      <span className="text-xl mt-3 font-medium">PDF</span>
                      <span className="text-sm text-gray-500 mt-1">
                        Portable Document Format
                      </span>
                    </button>
                  </div>

                  <div className="text-center mt-8 text-gray-600">
                    <p>
                      Dokumen yang diunduh akan berisi semua informasi yang
                      telah Anda masukkan.
                    </p>
                  </div>
                </div>
              </div>
            </Step>
          </Stepper>
        </div>
      </div>
    </div>
  );
};

export default PerjanjianKerjaSama;
