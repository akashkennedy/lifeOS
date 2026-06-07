import { useState } from 'react';
import { LogIn, UserPlus, Loader as Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password);

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-surface-dark p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-2">
            LifeOS
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Your personal operating system
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-border dark:border-gray-800 shadow-lg">
          <div className="flex mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 text-center font-medium transition-all duration-150 ${
                !isSignUp
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-500 dark:text-gray-400 border-b-2 border-transparent'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 text-center font-medium transition-all duration-150 ${
                isSignUp
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-500 dark:text-gray-400 border-b-2 border-transparent'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg border border-border dark:border-gray-700 bg-transparent outline-none focus:border-accent text-[#1a1a1a] dark:text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg border border-border dark:border-gray-700 bg-transparent outline-none focus:border-accent text-[#1a1a1a] dark:text-white placeholder-gray-400"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 transition-all duration-150 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : isSignUp ? (
                <>
                  <UserPlus size={20} />
                  Create Account
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
