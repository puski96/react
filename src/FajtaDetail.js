import React, { useState, useEffect } from "react";
import "./App.js";

function FajtaDetail({ match }) {
  useEffect(() => {
    fetchFajta();
  }, []);

  const [fajta, setFajta] = useState({});
  const fetchFajta = async () => {
    const fetchFajta = await fetch(`http://localhost:8090/api/fajta/`);
    const fajta = await fetchFajta.json();
    setFajta(fajta);
    console.log(fajta);
  };
  return <div>{fajta.fajtaleiras}</div>;
}
export default FajtaDetail;