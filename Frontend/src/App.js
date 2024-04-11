import {BrowserRouter, Route, Routes} from 'react-router-dom';

//Pages & Components
import Home from './pages/Home';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import UserProfilePage from './pages/UserProfilePage';
// import ProjectListingPage from './pages/ProjectListingPage';
// import ProjectDetailPage from './pages/ProjectDetailPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className='pages'>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/projects" element={<ProjectListingPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} /> */}
      </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
