import React, { useState, useEffect, useMemo } from "react";
import { FiMapPin, FiSearch, FiPhone, FiMail } from "react-icons/fi";
import axios from "axios";
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DaftarKantor = () => {
  // State untuk menyimpan data dari API dan CSV
  const [offices, setOffices] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]); // Akan menyimpan semua kota dari CSV

  // State untuk filter dan UI
  const [loading, setLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState(""); // Menyimpan NAMA provinsi
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Fetch data kantor dari API saat komponen dimuat
  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await axios.get('/api/form-pendaftaran-kantor/approved');
        if (response.data) {
          setOffices(response.data);
        }
      } catch (error) {
        console.error('Error fetching offices:', error);
        toast.error('Gagal memuat daftar kantor');
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
  }, []);

  // 2. Load data provinsi dan kota dari file CSV saat komponen dimuat
  useEffect(() => {
    // Fungsi helper untuk mengambil dan mem-parse data CSV
    const fetchCsvData = (filePath, setter) => {
      Papa.parse(filePath, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setter(results.data);
        },
        error: (err) => {
          console.error(`Gagal memuat atau mem-parse ${filePath}:`, err);
          toast.error(`Gagal memuat data dari ${filePath}`);
        },
      });
    };

    fetchCsvData("/provinces.csv", setProvinces);
    fetchCsvData("/regencies.csv", setCities);
  }, []); // Dependensi kosong memastikan ini hanya berjalan sekali

  // 3. Filter daftar kota berdasarkan provinsi yang dipilih
  const filteredCities = useMemo(() => {
    if (!selectedProvince) {
      return []; // Jika tidak ada provinsi yang dipilih, kembalikan array kosong
    }
    // Cari object provinsi yang dipilih untuk mendapatkan ID-nya
    const province = provinces.find(p => p.name === selectedProvince);
    if (!province) {
      return [];
    }
    // Filter kota berdasarkan province_id
    return cities.filter(city => city.province_id === province.id);
  }, [selectedProvince, provinces, cities]);

  // 4. Filter daftar kantor berdasarkan semua kriteria (search, provinsi, kota)
  const filteredOffices = offices.filter((office) => {
    // Mencocokkan nama provinsi dan kota dari data office dengan yang dipilih di filter
    const matchProvince = !selectedProvince || office.provinsi === selectedProvince;
    const matchCity = !selectedCity || office.kota === selectedCity;
    const searchLower = searchQuery.toLowerCase();
    const matchSearch = !searchQuery ||
      office.nama_kantor.toLowerCase().includes(searchLower) ||
      office.alamat.toLowerCase().includes(searchLower);
    
    return matchProvince && matchCity && matchSearch;
  });

  return (
    <section className="min-h-screen bg-surface">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 py-8">
          Daftar Kantor Hukum
        </h2>

        {/* Search & Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          {/* Search Input */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari nama atau alamat kantor hukum..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setSelectedCity(""); // Reset pilihan kota saat provinsi berubah
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Provinsi</option>
              {provinces.map((prov) => (
                <option key={prov.id} value={prov.name}>
                  {prov.name}
                </option>
              ))}
            </select>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!selectedProvince} // Nonaktifkan jika tidak ada provinsi yang dipilih
            >
              <option value="">Semua Kota</option>
              {filteredCities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* List Kantor */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {filteredOffices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOffices.map((office) => (
                  <div
                    key={office.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-xl mb-3">{office.nama_kantor}</h3>
                    
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-start gap-2">
                        <FiMapPin className="mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm">{office.alamat}</p>
                          <p className="text-sm">{office.kota}, {office.provinsi}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FiPhone className="flex-shrink-0" />
                        <p className="text-sm">{office.no_telepon}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FiMail className="flex-shrink-0" />
                        <p className="text-sm">{office.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 min-h-[200px] flex items-center justify-center">
                <p>Tidak ada kantor hukum yang ditemukan sesuai kriteria Anda.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default DaftarKantor;