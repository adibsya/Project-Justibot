import React, { useState, useEffect } from "react";
import {
  FiEdit2,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
} from "react-icons/fi";
import { IoEye, IoEyeOff } from "react-icons/io5";
import assets from "../../../assets/assets";
import axios from "axios";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profileImage: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showPasswordFieldsState, setShowPasswordFieldsState] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("/api/users/profile", {
          withCredentials: true,
        });

        setUserData({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.no_hp,
          address: res.data.alamat,
          profileImage: res.data.foto_profil || assets.defaultProfileImage,
        });
      } catch (err) {
        console.error("Gagal mengambil profil:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 5000000) { // 5MB limit
      alert("Ukuran file terlalu besar. Maksimal 5MB");
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData(prev => ({
        ...prev,
        profileImage: reader.result
      }));
    };
    reader.readAsDataURL(file);
  }
};

  const handleSubmit = async () => {
    try {
      await axios.patch(
        "/api/users/profile",
        {
          name: userData.name,
          email: userData.email,
          no_hp: userData.phone,
          alamat: userData.address,
          foto_profil: userData.profileImage,
        },
        {
          withCredentials: true,
        },
      );

      setIsEditing(false);
    } catch (err) {
      console.error("Gagal menyimpan profil:", err);
      alert("Gagal memperbarui profil!");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError("Password baru tidak cocok!");
      return;
    }

    try {
      await axios.post(
        "/api/users/update-password",
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        {
          withCredentials: true,
        },
      );

      setPasswordError("");
      setShowPasswordFields(false);
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setIsPasswordModalOpen(true);
    } catch (err) {
      console.error("Gagal ubah password:", err);
      if (err.response?.data?.message) {
        setPasswordError(err.response.data.message);
      } else {
        setPasswordError("Terjadi kesalahan saat mengubah password.");
      }
    }
  };

  return (
    <div className="min-h-screen p-6 py-40 bg-gray-100 text-onSurface">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#122E40]">Profil Saya</h1>
            <div className="flex gap-2">
              {isEditing && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                >
                  Simpan
                </button>
              )}
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  setShowPasswordFields(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition"
              >
                <FiEdit2 /> {isEditing ? "Batal" : "Edit Profil"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-4 border-secondary"
                />
                {isEditing && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute bottom-2 right-2 opacity-0 w-10 h-10 cursor-pointer"
                      title="Unggah Foto"
                    />
                    <button className="absolute bottom-2 right-2 p-2 bg-secondary text-white rounded-full pointer-events-none">
                      <FiEdit2 />
                    </button>
                  </>
                )}
              </div>
              <h2 className="text-xl font-semibold text-center">
                {userData.name}
              </h2>
              <span className="px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                Pengguna
              </span>
            </div>

            <div className="md:col-span-2">
              <form className="space-y-6">
                {[
                  {
                    label: "Nama Lengkap",
                    icon: <FiUser />,
                    key: "name",
                    type: "text",
                    editable: true,
                  },
                  {
                    label: "Email",
                    icon: <FiMail />,
                    key: "email",
                    type: "email",
                    editable: false,
                  },
                  {
                    label: "Nomor Telepon",
                    icon: <FiPhone />,
                    key: "phone",
                    type: "tel",
                    editable: true,
                  },
                ].map(({ label, icon, key, type, editable }) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-gray-600">
                      {icon} {label}
                    </label>
                    {isEditing ? (
                      <input
                        type={type}
                        value={userData[key]}
                        onChange={(e) =>
                          setUserData({ ...userData, [key]: e.target.value })
                        }
                        disabled={!editable}
                        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                          !editable ? "bg-gray-100 text-onSurface/50 border-transparent cursor-not-allowed" : ""
                        }`}
                      />
                    ) : (
                      <p className="text-lg">{userData[key]}</p>
                    )}
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-gray-600">
                    <FiMapPin /> Alamat
                  </label>
                  {isEditing ? (
                    <textarea
                      value={userData.address}
                      onChange={(e) =>
                        setUserData({ ...userData, address: e.target.value })
                      }
                      rows="3"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  ) : (
                    <p className="text-lg">{userData.address}</p>
                  )}
                </div>

                <div className="pt-6 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center gap-2 text-gray-600">
                      <FiLock /> Kata Sandi
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPasswordFields(!showPasswordFields)}
                      className="text-secondary hover:text-secondary/80 text-sm font-medium"
                    >
                      {showPasswordFields ? "Batal" : "Ubah Kata Sandi"}
                    </button>
                  </div>

                  {showPasswordFields && (
                    <div className="space-y-4">
                      {[
                        {
                          placeholder: "Kata Sandi Saat Ini",
                          key: "currentPassword",
                        },
                        { placeholder: "Kata Sandi Baru", key: "newPassword" },
                        {
                          placeholder: "Konfirmasi Kata Sandi Baru",
                          key: "confirmPassword",
                        },
                      ].map(({ placeholder, key }) => (
                        <div key={key} className="relative">
                          <input
                            type={
                              showPasswordFieldsState[key] ? "text" : "password"
                            }
                            placeholder={placeholder}
                            value={passwords[key]}
                            onChange={(e) =>
                              setPasswords({
                                ...passwords,
                                [key]: e.target.value,
                              })
                            }
                            className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswordFieldsState((prev) => ({
                                ...prev,
                                [key]: !prev[key],
                              }))
                            }
                            className="absolute right-3 top-[10px] cursor-pointer text-gray-500 text-2xl"
                          >
                            {showPasswordFieldsState[key] ? (
                              <IoEyeOff />
                            ) : (
                              <IoEye />
                            )}
                          </button>
                        </div>
                      ))}

                      {passwordError && (
                        <p className="text-red-500 text-sm">{passwordError}</p>
                      )}

                      <button
                        type="button"
                        onClick={handlePasswordChange}
                        className="w-full py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition"
                      >
                        Simpan Kata Sandi Baru
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Konfirmasi Perubahan</h2>
            <p className="mb-6 text-gray-700">
              Apakah Anda yakin ingin menyimpan perubahan pada profil Anda?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  handleSubmit();
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Berhasil!</h2>
            <p className="mb-6 text-gray-700">
              Kata sandi Anda telah berhasil diperbarui.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
