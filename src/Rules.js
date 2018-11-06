import React, { Component } from "react";
import monsieurSucre from "./monsieurSucre/monsieur-sucre.png";
import Epee from "./images/sword_icon-icons.com_64425.png";
import Bouclier from "./images/security-shield_icon-icons.com_55078.png";

import "./Rules.css";

class Rules extends Component {
  render() {
    return (
      <div className="Rules">
        <div className="rules">
          <div className="rulesContainer">
            <h1>Monsieur Sucre te met au défis !</h1>

            <p>
              <img className="sugar" src={monsieurSucre} alt="Monsieur Sucre" />
              Rassembles tes troupes, et entres dans l'arène. Le principe est
              simple, tu dois battre Monsieur sucre à son propre jeu. Envoies
              lui tes soldats les plus sucrés et vérifie l'adage : "Trop de
              sucre, tue le sucre."
            </p>
            <p>
              <img className="sword" src={Epee} alt="Epée" />
              Plus ton bonbon est sucré, plus son attaque sera puissante ! En
              revanche, si son attaque est à 0, tu regagnes des points de vie.
            </p>
            <p>
              <img className="shield" src={Bouclier} alt="bouclier" />
              Le bonbon ayant la plus faible défense perdra le duel, mais il
              peut te permetre de limiter les dégats.
            </p>
            <button className="button" onClick={this.props.close}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Rules;
