import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './components/Toast'
import SkipLink from './components/SkipLink'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
import Plans from './pages/Plans'
import StudentPlans from './pages/StudentPlans'
import Quote from './pages/Quote'
import Appointment from './pages/Appointment'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <div className="app">
            <SkipLink />
            <Navbar />
            <main id="main-content" className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/plans/student" element={<StudentPlans />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              </Routes>
            </main>
            <Chatbot />
            <Footer />
          </div>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
