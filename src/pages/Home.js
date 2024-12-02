import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, auth, emailVerification } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import UpdateProfile from "../components/UpdateProfile";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true,
    });
  };

  const handleVerification = async () => {
    await emailVerification();
  };

  if (user) {
    return (
      <div className="max-w-xl mx-auto py-5">
        <h1 className="flex gap-x-4 items-center">
          {auth.currentUser.photoURL && (
            <img
              src={auth.currentUser.photoURL}
              className="w-8 h-8 rounded-full"
            />
          )}
          Hoşgeldiniz ({user.email})
        </h1>
        <button
          onClick={handleLogout}
          className="inline-flex disabled:opacity-30 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 cursor-pointer"
          type="submit"
        >
          Çıkış Yap
        </button>

        {!user.emailVerified && (
          <button
            onClick={handleVerification}
            className="inline-flex disabled:opacity-30 items-center px-4 ms-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 cursor-pointer"
            type="submit"
          >
            E-posta Onayla
          </button>
        )}

        <UpdateProfile />
      </div>
    );
  }
  return (
    <div>
      <Link to="/register">Kayıt Ol</Link>
      <Link to="/login">Giriş Yap</Link>
    </div>
  );
}
