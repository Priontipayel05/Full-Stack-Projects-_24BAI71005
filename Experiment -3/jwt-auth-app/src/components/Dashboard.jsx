import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Shield, 
  Calendar, 
  Activity,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Copy,
  CheckCircle,
  Clock,
  Server,
  Database,
  Lock,
  Key
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'User ID', value: user?.id || 'N/A', icon: User, color: 'blue' },
    { label: 'Role', value: user?.role || 'N/A', icon: Shield, color: 'purple' },
    { label: 'Member Since', value: 'Jan 2026', icon: Calendar, color: 'green' },
    { label: 'Status', value: 'Active', icon: Activity, color: 'emerald' },
  ];

  const securityFeatures = [
    { icon: Lock, label: 'JWT Token', status: 'Active', color: 'blue' },
    { icon: Key, label: 'Encryption', status: '256-bit', color: 'purple' },
    { icon: Server, label: 'Session Type', status: 'Stateless', color: 'indigo' },
    { icon: Database, label: 'Storage', status: 'LocalStorage', color: 'cyan' },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user?.email || '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Welcome back to your secure dashboard</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>

        {/* Welcome Card */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-8 text-white mb-8 shadow-xl shadow-purple-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full transform -translate-x-10 translate-y-10"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">
                  Welcome back, {user?.name || 'User'}!
                </h2>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  {user?.role}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Last login: Today
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
              <span className="text-sm font-mono truncate max-w-[200px]">
                {user?.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600',
              purple: 'bg-purple-50 text-purple-600',
              green: 'bg-green-50 text-green-600',
              emerald: 'bg-emerald-50 text-emerald-600',
            };
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${colorClasses[stat.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-400">#{index + 1}</span>
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Security Features */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Security Features</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                const colorClasses = {
                  blue: 'bg-blue-50 text-blue-600 border-blue-200',
                  purple: 'bg-purple-50 text-purple-600 border-purple-200',
                  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
                  cyan: 'bg-cyan-50 text-cyan-600 border-cyan-200',
                };
                return (
                  <div key={index} className={`p-4 rounded-xl border ${colorClasses[feature.color]} bg-opacity-50`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{feature.label}</span>
                      </div>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-xs text-gray-600">{feature.status}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 group">
                <Bell className="w-4 h-4 text-gray-500 group-hover:text-purple-600 transition-colors" />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Notifications</span>
                <span className="ml-auto bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">3</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 group">
                <Settings className="w-4 h-4 text-gray-500 group-hover:text-purple-600 transition-colors" />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Settings</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 group">
                <Activity className="w-4 h-4 text-gray-500 group-hover:text-purple-600 transition-colors" />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Activity Log</span>
              </button>
            </div>
          </div>
        </div>

        {/* Session Info */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">Session Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-gray-500">Token Type</p>
              <p className="font-mono font-semibold text-gray-900">Bearer JWT</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-gray-500">Authentication</p>
              <p className="font-mono font-semibold text-gray-900">Stateless</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-gray-500">Expires In</p>
              <p className="font-mono font-semibold text-gray-900">1 hour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;