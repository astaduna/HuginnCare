import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import MainLayout from '../pages/Layout/MainLayout';
import { Home } from '../pages/Home/Home';
import { Reports } from '../pages/Reports/Reports';
import { Profile } from '../pages/Profile/Profile';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="reports" element={<Reports />} />
    <Route path="profile" element={<Profile />} />
  </Route>
));

export default router;