import { useState } from "react";
import { update, resetPassword, auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayName,
      photoURL: avatar,
    });
    dispatch(
      login({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    );
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword(password);
    if (result) {
      setPassword("");
    }
  };

  return (
    <div className="grid gap-y-10">
      {/* profil güncelle */}
      <form onSubmit={handleSubmit} className="grid gap-y-4">
        <h1 className="text-xl font-bold mb-4">Profili Güncelle</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ad - Soyad
          </label>
          <div className="mt-1">
            <input
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              type="text"
              placeholder="Kullanıcı Adınızı Güncelleyin"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fotoğraf
          </label>
          <div className="mt-1">
            <input
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              type="text"
              placeholder="Profil Fotoğrafınızı Değiştirin"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            className="inline-flex disabled:opacity-30 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 cursor-pointer"
            type="submit"
          >
            Güncelle
          </button>
        </div>
      </form>

      {/* parola güncelle */}
      <form onSubmit={handleResetSubmit} className="grid gap-y-4">
        <h1 className="text-xl font-bold mb-4">Parola Güncelle</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Yeni Parola
          </label>
          <div className="mt-1">
            <input
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              type="password"
              placeholder="yeni parola"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            disabled={!password}
            className="inline-flex disabled:opacity-30 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 cursor-pointer"
            type="submit"
          >
            Parola Güncelle
          </button>
        </div>
      </form>
    </div>
  );
}
