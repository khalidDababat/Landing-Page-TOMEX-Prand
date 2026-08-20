import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '@/components/layout/Layout/Layout';
import Careers from '@/pages/Careers/Careers';
import Home from '@/pages/Home/Home';
import Portfolio from '@/pages/Portfolio/Portfolio';
import { ROUTES } from '@/utils/navigation';

/** TOMEX application routes. */
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.portfolio} element={<Portfolio />} />
        <Route path={ROUTES.careers} element={<Careers />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
