import './Home.scss';
import Products from '../components/Products';
import Hero from './Hero/Hero';

function Home() {
  return (
    <div className="home">
      <Hero />
      <Products />
    </div>
  );
}

export default Home;
