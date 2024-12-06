// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Banner from "../components/Banner";
import Description from "../components/Description";
import About from "../components/About";

export default function Homepage() {
  return (
    <div>
      <Banner />
      <Description />
      {/* <About /> */}
    </div>
  );
}
