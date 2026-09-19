import React, { useState, useEffect } from "react";
import Preloader from "../../components/ui/Preloader";
import Navbar2 from "../../components/ui/Navbar2";
import Header from "../../components/ui/Header";
import RewardsRegister from "../../components/ui/RewardsRegister";
import Mission from "../../components/ui/Mission";
import Services from "../../components/ui/Services";
import Footer from "../../components/ui/Footer";
import Scene from "../../components/threejs/Scene";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(15);

  const handleProgress = (realProgress) => {
    setProgress((prev) => Math.max(prev, realProgress));
  };

  const handleLoaded = () => {
    setProgress(100);
    setTimeout(() => {
      setIsLoaded(true);
    }, 600);
  };

  useEffect(() => {
    // Smooth progress simulation while real assets stream
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.floor(Math.random() * 8 + 3);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Preloader progress={progress} isLoaded={isLoaded} />
      <Navbar2 />
      <Header />
      <RewardsRegister />
      <Mission />
      <Services />
      <Footer />
      <Scene onProgress={handleProgress} onLoaded={handleLoaded} />
    </div>
  );
}
