import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//Pages & Components
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import UserProfilePage from './pages/UserProfilePage';
// import ProjectListingPage from './pages/ProjectListingPage';
// import ProjectDetailPage from './pages/ProjectDetailPage';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import PostProject from './pages/PostProject';
import ApplicationForm from './components/ApplicationForm';
import AvailableGigs from './pages/AvailableGigs'
import GigApplications from './pages/GigApplications'
import FinishedProject from './pages/FinishedProject';
import Feedbacks from './pages/Feedback';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={ <HomePage />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/Feedbacks"
              element={<Feedbacks />}
            />
            <Route
              path="/FinishedProject"
              element={user ? <FinishedProject /> : <Navigate to="/login" />}
            />
            <Route
              path="/GigApplications"
              element={user ? <GigApplications /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/post-project"
              element={user ? <PostProject /> : <Navigate to="/login" />}
            />
            <Route
              path="/available-gigs"
              element={user ? <AvailableGigs /> : <Navigate to="/login" />}
            />
            <Route
              path="/gigs/1"
              element={user ? <GigApplications /> : <Navigate to="/login" />}
            />
            <Route
              path="/gigs/2"
              element={user ? <GigApplications /> : <Navigate to="/login" />}
            />
            <Route
              path="/application-form/:gigId" 
              component={ApplicationForm}
              element={user ? <ApplicationForm /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
