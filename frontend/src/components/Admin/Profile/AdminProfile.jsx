import React, { useState } from 'react';
import {
  FiEdit2, FiUser, FiMail, FiPhone, FiMapPin, FiLock
} from 'react-icons/fi';
import assets from '../../../assets/assets';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [userData, setUserData] = useState({
    name: "Justibot Services",
    email: "justibotservice@gmail.com",
    phone: "+62 812-3456-7890",
    address: "Surabaya, Indonesia",
    profileImage: assets.actor
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError('Password baru tidak cocok!');
      return;
    }
    setPasswordError('');
    setShowPasswordFields(false);
    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen p-6 py-40 bg-gray-100 text-onSurface">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#122E40]">Profil Saya</h1>
            <div className="flex gap-2">
              {isEditing && (
                <button
                  onClick={handleSubmit}
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
                <FiEdit2 /> {isEditing ? 'Batal' : 'Edit Profil'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Picture */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-4 border-secondary"
                />
                {isEditing && (
                  <button className="absolute bottom-2 right-2 p-2 bg-secondary text-white rounded-full hover:bg-secondary/80">
                    <FiEdit2 />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-semibold text-center">{userData.name}</h2>
              <span className="px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                Admin
              </span>
            </div>

            {/* User Details */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  {
                    label: 'Nama Lengkap',
                    icon: <FiUser />,
                    key: 'name',
                    type: 'text'
                  },
                  {
                    label: 'Email',
                    icon: <FiMail />,
                    key: 'email',
                    type: 'email'
                  },
                  {
                    label: 'Nomor Telepon',
                    icon: <FiPhone />,
                    key: 'phone',
                    type: 'tel'
                  }
                ].map(({ label, icon, key, type }) => (
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
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    ) : (
                      <p className="text-lg">{userData[key]}</p>
                    )}
                  </div>
                ))}

                {/* Address */}
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

                {/* Password Section */}
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
                      {showPasswordFields ? 'Batal' : 'Ubah Kata Sandi'}
                    </button>
                  </div>

                  {showPasswordFields && (
                    <div className="space-y-4">
                      {[
                        {
                          placeholder: 'Kata Sandi Saat Ini',
                          key: 'currentPassword'
                        },
                        {
                          placeholder: 'Kata Sandi Baru',
                          key: 'newPassword'
                        },
                        {
                          placeholder: 'Konfirmasi Kata Sandi Baru',
                          key: 'confirmPassword'
                        }
                      ].map(({ placeholder, key }) => (
                        <input
                          key={key}
                          type="password"
                          placeholder={placeholder}
                          value={passwords[key]}
                          onChange={(e) =>
                            setPasswords({ ...passwords, [key]: e.target.value })
                          }
                          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
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
    </div>
  );
};

export default AdminProfile;