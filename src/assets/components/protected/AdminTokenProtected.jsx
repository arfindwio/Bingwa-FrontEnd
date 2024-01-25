import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Helper
import { showErrorToast } from "../../../helper/ToastHelper";

// Cookies
import { CookieStorage, CookiesKeys } from "../../../utils/cookie";

// Redux Action
import { getUserAuthenticate } from "../../../redux/action/auth/getUserAuthenticate";

function AdminTokenProtected({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storeUserAuthenticate = useSelector(
    (state) => state.users.userAuthenticate,
  );

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    dispatch(getUserAuthenticate());
  }, [dispatch]);

  if (!token) {
    showErrorToast("Please log in first");
    return navigate("/admin/login");
  } else if (storeUserAuthenticate?.role !== "admin") {
    showErrorToast("You are not an admin");
    return navigate("/");
  } else {
    return children;
  }
}

export default AdminTokenProtected;
