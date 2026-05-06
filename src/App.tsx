import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext.tsx';
import { PublicLayout } from './layouts/PublicLayout.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { CourseCatalogPage } from './pages/CourseCatalogPage.tsx';
import { CourseDetailPage } from './pages/CourseDetailPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { CheckoutPage } from './pages/CheckoutPage.tsx';
import { StudentDashboardPage } from './pages/StudentDashboardPage.tsx';
import { InstructorDashboardPage } from './pages/InstructorDashboardPage.tsx';
import { CreateCoursePage } from './pages/CreateCoursePage.tsx';
import { LessonPlayerPage } from './pages/LessonPlayerPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage.tsx';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="courses" element={<CourseCatalogPage />} />
            <Route path="courses/:courseSlug" element={<CourseDetailPage />} />
            <Route path="dashboard" element={<StudentDashboardPage />} />
            <Route path="instructor" element={<InstructorDashboardPage />} />
            <Route path="instructor/courses/new" element={<CreateCoursePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/courses/:courseSlug/learn" element={<LessonPlayerPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
