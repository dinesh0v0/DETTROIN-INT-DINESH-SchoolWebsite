import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Admission } from './pages/Admission';
import { Academics } from './pages/Academics';
import { CoCurricular } from './pages/CoCurricular';
import { Events } from './pages/Events';
import { Portal } from './pages/Portal';
import { Gallery } from './pages/Gallery';
import { JoinUs } from './pages/JoinUs';
import { ScrollToTop } from './components/ScrollToTop';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="admission" element={<Admission />} />
          <Route path="academics" element={<Academics />} />
          <Route path="co-curricular" element={<CoCurricular />} />
          <Route path="events" element={<Events />} />
          <Route path="portal" element={<Portal />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="join-us" element={<JoinUs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
