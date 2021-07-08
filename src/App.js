import logo from "./logo.svg";
import React, { Component }  from 'react';
import "./App.css";
import MainPageComponent from "./components/MainPageComponent";
import HeaderComponent from "./components/HeaderComponent";
import HirdetesekComponent from "./components/HirdetesekComponent";
import basic from "./css/basic.css";
import hirdetesek from "./css/hirdetesek.css";
import allatok from "./css/allatok.css";
import kapcsolat from "./css/kapcsolat.css";
import tagok from "./css/tagok.css";
import keresek from "./css/keresek.css";
import admin from "./css/admin.css";
import Slider from "./components/Slider.js";
import FooterComponent from "./components/FooterComponent";
import HomePageComponent from "./components/HomePageComponent";
import KeresekComponent from "./components/KeresekComponent";
import KeresKuldComponent from "./components/KeresKuldComponent";
import FajtaleirasokComponent from "./components/FajtaleirasokComponent";
import RolunkComponent from "./components/RolunkComponent";
import KapcsolatComponent from "./components/KapcsolatComponent";
import LoginComponent from "./components/LoginComponent";
import TagokComponent from "./components/TagokComponent";
import HirdetesFeladas from "./components/HirdetesFeladas";
import EgyFajtaComponent from "./components/EgyFajtaComponent";
import AdminComponent from "./components/adminpanel/AdminComponent.jsx";
import TenyesztokComponent from "./components/adminpanel/TenyesztokComponent";
import EgyesuletekComponent from "./components/adminpanel/EgyesuletekComponent";
import AllatokComponent from "./components/adminpanel/AllatokComponent";
import AddTenyesztoComponent from "./components/adminpanel/AddTenyesztoComponent";
import AddEgyesuletComponent from "./components/adminpanel/AddEgyesuletComponent";
import AddAllatComponent from "./components/adminpanel/AddAllatComponent";
import FajtaDetail from "./FajtaDetail";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import KiallitasComponent from "./components/adminpanel/KiallitasComponent";
import AddKiallitasComponent from "./components/adminpanel/AddKiallitasComponent";
import ReszvetelComponent from "./components/adminpanel/ReszvetelComponent";
import AddReszvetelComponent from "./components/adminpanel/AddReszvetelComponent";
import Jovahagyas from "./components/Jovahagyas";
import ProfilComponent from "./components/ProfilComponent";
import HirdeteseimComponent from "./components/HirdeteseimComponent";
import AddImageComponent from "./components/AddImageComponent";
import RegisterComponent from "./components/RegisterComponent";
import EredmenyComponent from "./components/EredmenyComponent";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div>
          <Switch>
            <Route path="/" exact component={HomePageComponent}></Route>
            <Route path="/anunturi" component={HirdetesekComponent}></Route>
            <Route
              path="/descrieri-de-rasa"
              exact
              component={FajtaleirasokComponent}
            ></Route>
            <Route path="/register" component={RegisterComponent}></Route>
            <Route path="/desprenoi" component={RolunkComponent}></Route>
            <Route path="/expozitii" component={KapcsolatComponent}></Route>
            <Route path="/cereri" component={KeresekComponent}></Route>
            <Route
              path="/trimite-cerere"
              component={KeresKuldComponent}
            ></Route>
            <Route path="/membri" component={TagokComponent}></Route>
            <Route path="/adauga-anunt" component={HirdetesFeladas}></Route>
            <Route
              path="/anunturile-mele"
              component={HirdeteseimComponent}
            ></Route>
            <Route path="/adminpanel" exact component={AdminComponent}></Route>
            <Route path="/add-image/:id" component={AddImageComponent}></Route>
            <Route
              path="/descrieri-de-rasa/:rovidites"
              component={EgyFajtaComponent}
            ></Route>
            <Route path="/rezultate/:id" component={EredmenyComponent}></Route>
            <Route
              path="/adminpanel/crescatori"
              exact
              component={TenyesztokComponent}
            ></Route>
            <Route
              path="/add-crescator/:id"
              component={AddTenyesztoComponent}
            ></Route>
            <Route
              path="/adminpanel/asociatii"
              exact
              component={EgyesuletekComponent}
            ></Route>
            <Route
              path="/add-asociatie/:id"
              component={AddEgyesuletComponent}
            ></Route>
            <Route
              path="/adminpanel/animale"
              exact
              component={AllatokComponent}
            ></Route>
            <Route
              path="/add-animale/:id"
              component={AddAllatComponent}
            ></Route>
            <Route
              path="/adminpanel/expozitii"
              exact
              component={KiallitasComponent}
            ></Route>
            <Route
              path="/add-expozitie/:id"
              component={AddKiallitasComponent}
            ></Route>
            <Route
              path="/adminpanel/participare"
              exact
              component={ReszvetelComponent}
            ></Route>
            <Route
              path="/add-participare/:id"
              component={AddReszvetelComponent}
            ></Route>
            <Route path="/confirmare/:id" component={Jovahagyas}></Route>
            <Route path="/profil/:id" component={ProfilComponent}></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}
export default App;
