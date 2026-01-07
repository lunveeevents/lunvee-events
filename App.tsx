
import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import { getUsers, saveUser } from './store';
import { DashboardClient } from './components/DashboardClient';
import { DashboardManager } from './components/DashboardManager';
import { DashboardAdmin } from './components/DashboardAdmin';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: UserRole.CLIENT
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getUsers();

    if (isLogin) {
      const user = users.find(u => u.email === authData.email && u.password === authData.password);
      if (user) {
        setCurrentUser(user);
      } else {
        alert('Invalid credentials');
      }
    } else {
      if (users.find(u => u.email === authData.email)) {
        alert('Email already exists');
        return;
      }
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: authData.name,
        email: authData.email,
        password: authData.password,
        phone: authData.phone,
        role: authData.role
      };
      saveUser(newUser);
      setCurrentUser(newUser);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setAuthData({ name: '', email: '', password: '', phone: '', role: UserRole.CLIENT });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-serif text-indigo-950 mb-2">Lunvée</h1>
            <p className="text-slate-500 tracking-widest uppercase text-xs">Exquisite Event Management</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100 p-8 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              {isLogin ? 'Sign In to your Account' : 'Create an Account'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="John Doe"
                      value={authData.name}
                      onChange={e => setAuthData({...authData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="+1 234 567 890"
                      value={authData.phone}
                      onChange={e => setAuthData({...authData, phone: e.target.value})}
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="name@email.com"
                  value={authData.email}
                  onChange={e => setAuthData({...authData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input
                  required
                  type="password"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={authData.password}
                  onChange={e => setAuthData({...authData, password: e.target.value})}
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Register As</label>
                  <div className="flex gap-4">
                    <label className="flex-1 flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-700">
                      <input
                        type="radio"
                        name="role"
                        className="hidden"
                        checked={authData.role === UserRole.CLIENT}
                        onChange={() => setAuthData({...authData, role: UserRole.CLIENT})}
                      />
                      <span className="text-sm font-medium">Client</span>
                    </label>
                    <label className="flex-1 flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-700">
                      <input
                        type="radio"
                        name="role"
                        className="hidden"
                        checked={authData.role === UserRole.MANAGER}
                        onChange={() => setAuthData({...authData, role: UserRole.MANAGER})}
                      />
                      <span className="text-sm font-medium">Manager</span>
                    </label>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all hover:translate-y-[-1px]"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 font-medium hover:underline text-sm"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            </div>
            
            {isLogin && (
              <div className="mt-4 text-[10px] text-slate-400 text-center">
                Admin: admin@lunvee.com / admin
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-serif text-indigo-950">Lunvée</h1>
            <span className="hidden md:inline px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-widest rounded">
              {currentUser.role}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-slate-900 leading-tight">{currentUser.name}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">{currentUser.email}</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
                {currentUser.role === UserRole.CLIENT && <DashboardClient user={currentUser} />}
        {currentUser.role === UserRole.MANAGER && <DashboardManager user={currentUser} />}
        {currentUser.role === UserRole.ADMIN && <DashboardAdmin />}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Lunvée Events. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
