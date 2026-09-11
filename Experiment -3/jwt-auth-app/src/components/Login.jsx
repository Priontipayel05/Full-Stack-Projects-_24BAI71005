import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, 
  Mail, 
  AlertCircle, 
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  CheckCircle
} from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Login failed. Please try again.');
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const demoCredentials = [
    { role: 'Admin', email: 'admin.24BAI71013@CUCHD.IN', password: 'a.24BAI71013', color: 'purple' },
    { role: 'User', email: 'user.24BAI71013@CUCHD.IN', password: 'u.24BAI71013', color: 'blue' }
  ];

  const fillCredentials = (email, password) => {
    setFormData({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
          {/* Decorative Top */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-3 shadow-lg shadow-purple-500/30">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Secure Access</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h2>
            <p className="text-gray-600 mt-2">Sign in to your secure dashboard</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-start gap-3 mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === 'email' ? 'scale-[1.02]' : ''
              }`}>
                <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  focusedField === 'email' ? 'text-purple-600' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className={`relative transition-all duration-300 ${
                focusedField === 'password' ? 'scale-[1.02]' : ''
              }`}>
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  focusedField === 'password' ? 'text-purple-600' : 'text-gray-400'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-gray-500 backdrop-blur-sm">Demo Credentials</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-3">
              {demoCredentials.map((cred, index) => (
                <button
                  key={index}
                  onClick={() => fillCredentials(cred.email, cred.password)}
                  className="group flex items-center gap-3 p-3 bg-gray-50 hover:bg-white rounded-xl border-2 border-gray-200 hover:border-purple-400 transition-all duration-300 hover:shadow-md w-full text-left"
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r ${
                    cred.color === 'purple' 
                      ? 'from-purple-500 to-pink-500' 
                      : 'from-blue-500 to-cyan-500'
                  } flex items-center justify-center text-white text-xs font-bold`}>
                    {cred.role[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-700">{cred.role}</p>
                    <p className="text-[10px] text-gray-500 font-mono truncate">{cred.email}</p>
                  </div>
                  <div className="text-xs text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to fill
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span>Secured with JWT authentication</span>
            <span className="w-px h-3 bg-gray-300"></span>
            <span>256-bit encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;