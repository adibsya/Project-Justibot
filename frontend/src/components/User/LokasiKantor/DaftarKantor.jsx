import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiMapPin, FiSearch } from "react-icons/fi";

const DaftarKantor = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await axios.get("/api/lawyers");
        setOffices(response.data);
        
        // Extract unique provinces from office data
        const uniqueProvinces = [...new Set(response.data.map(office => office.provinsi))];
        setProvinces(uniqueProvinces);
      } catch (error) {
        console.error("Error fetching offices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
  }, []);

  // Update cities when province is selected
  useEffect(() => {
    if (selectedProvince) {
      const provinceCities = offices
        .filter(office => office.provinsi === selectedProvince)
        .map(office => office.lokasi);
      setCities([...new Set(provinceCities)]);
    } else {
      setCities([]);
    }
  }, [selectedProvince, offices]);

  // Enhanced filter function with search
  const filteredOffices = offices.filter(office => {
    const matchProvince = !selectedProvince || office.provinsi === selectedProvince;
    const matchCity = !selectedCity || office.lokasi === selectedCity;
    const matchSearch = !searchQuery || 
      office.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.alamat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchProvince && matchCity && matchSearch;
  });

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Daftar Kantor</h2>
        
        {/* Search and Filters Container */}
        <div className="max-w-4xl mx-auto mb-8">
          {/* Search Input */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari kantor atau alamat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setSelectedCity("");
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Provinsi</option>
              {provinces.map(province => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!selectedProvince}
            >
              <option value="">Pilih Kota</option>
              {cities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Office List */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredOffices.map((office) => (
              <div
                key={office.id}
                className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-lg md:text-xl mb-2">{office.nama}</h3>
                <div className="flex items-start gap-2 text-gray-600 mb-2">
                  <FiMapPin className="mt-1 flex-shrink-0" />
                  <p className="text-sm md:text-base">{office.lokasi}, {office.provinsi}</p>
                </div>
                <p className="text-sm md:text-base text-gray-600">{office.alamat}</p>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredOffices.length === 0 && (
          <div className="text-center text-gray-500 min-h-[200px] flex items-center justify-center">
            <p>Tidak ada kantor yang ditemukan untuk filter yang dipilih</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DaftarKantor;