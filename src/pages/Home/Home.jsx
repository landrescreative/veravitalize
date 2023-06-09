import React from "react";
import Navbar from "../../components/ui/Navbar";
import Header from "../../components/ui/Header";
import Scene from "../../components/threejs/Scene";
import RewardsRegister from "../../components/ui/RewardsRegister";
import Mission from "../../components/ui/Mission";
import Services from "../../components/ui/Services";
import Footer from "../../components/ui/Footer";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Header></Header>
      <RewardsRegister></RewardsRegister>
      <Mission></Mission>
      <Services></Services>
      <Footer></Footer>
      <Scene></Scene>
    </div>
  );
}
