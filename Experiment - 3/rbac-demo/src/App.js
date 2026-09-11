import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Editor from './pages/Editor';
import Viewer from './pages/Viewer';
import Unauthorized from './components/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/editor"
          element={
            <ProtectedRoute allowedRoles={["Editor"]}>
              <Editor />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/viewer"
          element={
            <ProtectedRoute allowedRoles={["Viewer"]}>
              <Viewer />
            </ProtectedRoute>
          }
        />
        
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Catch all route for undefined paths */}
        <Route path="*" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;