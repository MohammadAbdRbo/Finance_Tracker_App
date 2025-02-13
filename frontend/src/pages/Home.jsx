import React from "react";
import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import  "../styles/global.css"
const Home = () => {
    return (
        <div>
            
            <CustomNavbar />

            
            <section id="about-us" className="fullscreen-bg d-flex align-items-center justify-content-center text-white" >
                <div className="container" >
                    <h2 className="text-center">Empowering Financial Decisions</h2>
                    <br/>
                    <p style={{fontSize:"20px"}} className="text-center">My partner and I are software engineering students passionate about developing innovative solutions. Our final project is a personal finance tracker app that helps users manage expenses and plan for future goals.<br/> Built with React.js, Node.js, and PostgreSQL, our goal is to simplify financial planning and empower users to make better financial decisions.</p>
                </div>
            </section>

            
            <section id="our-project" className="fullscreen-bg1 d-flex align-items-center justify-content-center text-white">
                <div className="container">
                    <h3 className="text-center">Plan Your Finances Wisely</h3>
                    <br/>
                    <p style={{fontSize:"20px"}} className="text-center">My project is a personal finance tracker app that helps users manage expenses and plan for future goals.<br/> It is built with React.js, Node.js, and PostgreSQL as part of my final college project.</p>
                </div>
            </section>

            
            <Footer />
        </div>
    );
};

export default Home;