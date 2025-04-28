import React, { useState } from "react";
import CallToAction from "./CallToAction";
import { Link } from "react-router-dom";
import Features from "./Features";

const Home = () => {
  return (
    <section className="overflow-hidden pb-24 bg-gray-50 min-h-screen">
      <div className="hidden navbar-menu fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80" />
      </div>
      <div className="container px-4 mx-auto relative">
        <div className="relative z-20 text-center">
          <h1 className="text-5xl lg:text-7xl font-extrabold font-heading mb-6 mt-16 max-w-3xl mx-auto leading-tight text-gray-800">
            <span>Explore the Power of</span>
            <span className="block text-orange-600">Shared Wisdom</span>
          </h1>
          <p className="text-lg mb-10 max-w-2xl mx-auto text-gray-600">
            Embark on a journey of discovery and growth. Connect, collaborate,
            and create with a global network of enthusiastic learners and
            thinkers.
          </p>
          <div className="flex justify-center lg:pb-56">
            <Link
              to="/register"
              className="w-full sm:w-auto h-16 inline-flex items-center justify-center py-4 px-8 rounded-full bg-orange-600 border border-orange-700 shadow-lg text-white font-bold font-heading hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-200 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {/* <FeaturedPost post={featuredPost} /> */}
      {/* Features */}
      <Features />
      {/* Call to action */}
      <CallToAction />
    </section>
  );
};

export default Home;
