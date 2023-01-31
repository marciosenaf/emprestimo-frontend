import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";
import "./Header.scss"


const Header = ({ title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);
  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <div></div>
        {!title ?
          <h3 >
            <span className="--fw-thin">Bem vindo, </span>
            <span className="--color-blue">{name}</span>
          </h3>

          : <h3>
            {title}
          </h3>

        }

        <button onClick={logout} className="button123">
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
