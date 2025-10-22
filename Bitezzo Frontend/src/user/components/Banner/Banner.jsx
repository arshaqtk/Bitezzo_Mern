import React, { useEffect, useState } from "react";
import BannerBg from "../../../assets/images/slide1.png";
import Slide2 from "../../../assets/images/slide2.jpg";
import mobileslide1 from "../../../assets/images/mobileimg1.jpg";
import mobileslide2 from "../../../assets/images/mobileimg2.jpg";
import { ArrowRight, Play, ChefHat, Star, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Banner() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const desktopSlides = [BannerBg, Slide2];
    const mobileSlides = [mobileslide1, mobileslide2];

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // This effect updates the isMobile state on window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const slides = isMobile ? mobileSlides : desktopSlides;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isMobile, desktopSlides, mobileSlides]);

    const slides = isMobile ? mobileSlides : desktopSlides;

    const features = [
        { icon: ChefHat, text: "Expert Chefs" },
        { icon: Star, text: "Premium Quality" },
        { icon: Award, text: "Award Winning" }
    ];

    return (
        <section 
            className="relative h-screen flex items-center justify-center bg-cover bg-center transition-all duration-1000 overflow-hidden"
            style={{
                backgroundImage: `url(${slides[currentSlide]})`,
            }}
        >
            {/* Enhanced Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
            
            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
            
            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
                <div className="text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
                    {/* Content */}
                    <div className="space-y-6 sm:space-y-8" data-aos="fade-right">
                        {/* Badge */}
                        <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-yellow-400/20 backdrop-blur-sm rounded-full border border-yellow-400/30">
                            <span className="text-yellow-300 text-xs sm:text-sm font-medium tracking-wide uppercase">
                                 Since 2025 - Culinary Excellence
                            </span>
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-3 sm:space-y-4">
                            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                                Taste the
                                <span className="block text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text">
                                    Extraordinary
                                </span>
                            </h1>
                            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto lg:mx-0"></div>
                        </div>

                        {/* Description */}
                        <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Experience culinary perfection with our handcrafted dishes made from the finest ingredients, 
                            delivered fresh to your doorstep with love and precision.
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 py-2 sm:py-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-white/90">
                                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                                    <span className="text-xs sm:text-sm font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start">
                            <button
                                onClick={() => navigate("/products")}
                                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                            >
                                <span className="relative z-10 text-sm sm:text-base">Order Now</span>
                                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                            
                            <button className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center">
                                <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                                <span className="text-sm sm:text-base">Watch Story</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Slide Indicators */}
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`relative overflow-hidden transition-all duration-300 ${
                            currentSlide === index 
                                ? "w-8 sm:w-12 h-2 sm:h-3 bg-white rounded-full" 
                                : "w-2 sm:w-3 h-2 sm:h-3 bg-white/50 rounded-full hover:bg-white/70"
                        }`}
                        onClick={() => setCurrentSlide(index)}
                    >
                        {currentSlide === index && (
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default Banner;