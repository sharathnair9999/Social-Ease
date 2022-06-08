import React from "react";
import { Brand } from "../../components";
import "./SplashScreen.css";

const SplashScreen = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-cta-dark/70 to-accent-1/70 flex justify-start items-center pt-40 flex-col">
      <Brand full large />
      <div class="w-full bg-transparent">
        <div class="snippet" data-title=".dot-revolution">
          <div class="stage">
            <div class="dot-revolution"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
