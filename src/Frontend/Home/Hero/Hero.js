import React from 'react';
import './Hero.scss';
function Hero() {
  return (
    <section className="hero">
      <div className="container flex flex-col items-center py-20 sm:py-32 md:py-40">
        <h2 className="text-6xl text-primary-loud">Your Day</h2>
        <h3 className="text-4xl text-primary-loud">Any Day..</h3>
      </div>
    </section>
  );
}

export default Hero;
