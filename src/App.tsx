import { type FC, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@/shared/components/layout/Header';
import { Footer } from '@/shared/components/layout/Footer';
import { HomePage } from '@/features/home/HomePage';
import { Toaster } from '@/shared/components/ui-forms/sonner';

// Lazy-load form pages (heavy components)
const RegistroMensualPage = lazy(() => import('@/features/formularios/pages/RegistroMensualPage'));
const RegistroTresMesesPage = lazy(() => import('@/features/formularios/pages/RegistroTresMesesPage'));
const RegistroSeisMesesPage = lazy(() => import('@/features/formularios/pages/RegistroSeisMesesPage'));
const RenovacionPage = lazy(() => import('@/features/formularios/pages/RenovacionPage'));

/**
 * Root app component with routing and shared layout
 */
const ScrollToTop: FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const FormLoading = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-white/60 text-lg">Cargando...</div>
  </div>
);

const App: FC = () => {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" />
      <Routes>
        {/* Pages with shared Header/Footer */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePage />
              <Footer />
            </>
          }
        />


        {/* Form pages — own layout, no shared Header/Footer */}
        <Route
          path="/registro-mensual"
          element={
            <Suspense fallback={<FormLoading />}>
              <RegistroMensualPage />
            </Suspense>
          }
        />
        <Route
          path="/registro-3meses"
          element={
            <Suspense fallback={<FormLoading />}>
              <RegistroTresMesesPage />
            </Suspense>
          }
        />
        <Route
          path="/registro-6meses"
          element={
            <Suspense fallback={<FormLoading />}>
              <RegistroSeisMesesPage />
            </Suspense>
          }
        />
        <Route
          path="/renovacion"
          element={
            <Suspense fallback={<FormLoading />}>
              <RenovacionPage />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default App;

