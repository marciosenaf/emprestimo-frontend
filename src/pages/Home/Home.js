import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import { GiMoneyStack } from "react-icons/gi"
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="container  ">


      </nav>
      <section className="container hero">
        <div className="hero-text">
          <h2>Controle {"&"} Sistema de empréstimo monetário</h2>
          <p>
          Sistema de empréstimo para controlar
          e gerir os empréstimo finaceiro em tempo
          real e integrado para facilitar o
          desenvolvimento do seu negócio.
          </p>
          <ShowOnLogin>
            <div className="hero-buttons">
              <Link to="/inventory">
                <button className="--btn botao-home">
                  Enter
                </button>
                </Link>
                
            </div>
          </ShowOnLogin>
          <ShowOnLogout>
            <div className="hero-buttons">
            <Link to="/login">
              <button className="--btn botao-home">
                Login
              </button>
              </Link>
            </div>
          </ShowOnLogout>
        </div>

        <div className=" hero-image">
          <GiMoneyStack />
        </div>
      </section>
    </div>
  );
};
export default Home;
