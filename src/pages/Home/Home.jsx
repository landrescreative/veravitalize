import React from "react";
import Navbar from "../../components/ui/Navbar";
import Header from "../../components/ui/Header";
import Scene from "../../components/threejs/Scene";
import RewardsRegister from "../../components/ui/RewardsRegister";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Header></Header>
      <RewardsRegister></RewardsRegister>
      <Scene></Scene>
    </div>
  );
}
