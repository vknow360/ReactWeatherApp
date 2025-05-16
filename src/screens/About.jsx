import React from "react";
import HeroSection from "../components/about/HeroSection";
import FeaturesSection from "../components/about/FeaturesSection";
import TeamSection from "../components/about/TeamSection";
import TechnologyStackSection from "../components/about/TechnologyStackSection";
import PrivacySection from "../components/about/PrivacySection";
import FooterInfo from "../components/about/FooterInfo";
import Footer from "../components/Footer";

const About = () => {
    return (
        <div className="w-full h-full overflow-auto bg-[#162438] text-white pt-20 p-3 sm:p-2">
            <HeroSection />
            <FeaturesSection />
            <TechnologyStackSection />
            <TeamSection />
            <Footer></Footer>
        </div>
    );
};

export default About;
