import About from '@/sections/About/About';
import Contact from '@/sections/Contact/Contact';
import Hero from '@/sections/Hero/Hero';
import Services from '@/sections/Services/Services';
import { homeContent } from '@/data/content';

const Home = () => (
  <>
    <Hero content={homeContent.hero} />
    <About content={homeContent.about} />
    <Services content={homeContent.services} />
    <Contact content={homeContent.contact} />
  </>
);

export default Home;
