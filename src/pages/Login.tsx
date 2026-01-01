import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Stethoscope, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Login() {
  const { language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl gradient-text">MediQueue</span>
          </Link>

          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            {language === 'en' ? 'Welcome back' : 'फेरि स्वागत छ'}
          </h1>
          <p className="text-muted-foreground mb-8">
            {language === 'en' 
              ? 'Sign in to your account to continue'
              : 'जारी राख्न आफ्नो खातामा साइन इन गर्नुहोस्'
            }
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === 'en' ? 'Email' : 'इमेल'}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'en' ? 'Enter your email' : 'आफ्नो इमेल प्रविष्ट गर्नुहोस्'}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === 'en' ? 'Password' : 'पासवर्ड'}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'en' ? 'Enter your password' : 'आफ्नो पासवर्ड प्रविष्ट गर्नुहोस्'}
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                <span className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Remember me' : 'मलाई सम्झनुहोस्'}
                </span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                {language === 'en' ? 'Forgot password?' : 'पासवर्ड बिर्सनुभयो?'}
              </Link>
            </div>

            <Button variant="hero" size="lg" className="w-full">
              {language === 'en' ? 'Sign In' : 'साइन इन'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {language === 'en' ? "Don't have an account?" : 'खाता छैन?'}{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                {language === 'en' ? 'Sign up' : 'साइन अप'}
              </Link>
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="mt-8 p-4 rounded-xl bg-secondary/50 border border-border">
            <p className="text-sm font-medium text-foreground mb-2">
              {language === 'en' ? 'Demo Accounts:' : 'डेमो खाताहरू:'}
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>👤 Patient: patient@demo.com</p>
              <p>🩺 Doctor: doctor@demo.com</p>
              <p>🏥 Admin: admin@demo.com</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-primary-foreground max-w-lg"
        >
          <div className="w-32 h-32 rounded-3xl bg-primary-foreground/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-8">
            <Stethoscope className="w-16 h-16" />
          </div>
          <h2 className="font-heading text-3xl font-bold mb-4">
            {language === 'en' 
              ? 'Smart Healthcare Management'
              : 'स्मार्ट स्वास्थ्य व्यवस्थापन'
            }
          </h2>
          <p className="text-primary-foreground/80">
            {language === 'en'
              ? 'AI-powered queue management, instant appointments, and seamless patient care.'
              : 'एआई-संचालित लाइन व्यवस्थापन, तत्काल अपोइन्टमेन्ट, र निर्बाध बिरामी हेरचाह।'
            }
          </p>
        </motion.div>
      </div>
    </div>
  );
}
