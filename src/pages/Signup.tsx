import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Stethoscope, ArrowRight, User, Phone, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const userTypes = [
  { id: 'patient', label: 'Patient', labelNe: 'बिरामी', icon: User },
  { id: 'doctor', label: 'Doctor', labelNe: 'डाक्टर', icon: Stethoscope },
  { id: 'hospital', label: 'Hospital', labelNe: 'अस्पताल', icon: Building },
];

export default function Signup() {
  const { language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('patient');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Illustration */}
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
              ? 'Join Nepal\'s Smartest Healthcare Platform'
              : 'नेपालको स्मार्ट स्वास्थ्य प्लेटफर्ममा सामेल हुनुहोस्'
            }
          </h2>
          <p className="text-primary-foreground/80">
            {language === 'en'
              ? 'Experience AI-powered consultations, smart queue management, and instant appointments.'
              : 'एआई-संचालित परामर्श, स्मार्ट लाइन व्यवस्थापन, र तत्काल अपोइन्टमेन्ट अनुभव गर्नुहोस्।'
            }
          </p>

          <div className="mt-12 grid grid-cols-3 gap-4">
            {[
              { value: '500+', label: 'Doctors', labelNe: 'डाक्टरहरू' },
              { value: '50+', label: 'Hospitals', labelNe: 'अस्पतालहरू' },
              { value: '50K+', label: 'Patients', labelNe: 'बिरामीहरू' },
            ].map((stat, i) => (
              <div key={i} className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
                <p className="font-heading text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-primary-foreground/70">
                  {language === 'en' ? stat.label : stat.labelNe}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
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
            {language === 'en' ? 'Create an account' : 'खाता बनाउनुहोस्'}
          </h1>
          <p className="text-muted-foreground mb-6">
            {language === 'en' 
              ? 'Get started with MediQueue today'
              : 'आज मेडिक्यूसँग सुरु गर्नुहोस्'
            }
          </p>

          {/* User Type Selection */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {userTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setUserType(type.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                  userType === type.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <type.icon className={`w-6 h-6 ${userType === type.id ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-sm font-medium ${userType === type.id ? 'text-primary' : 'text-muted-foreground'}`}>
                  {language === 'en' ? type.label : type.labelNe}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === 'en' ? 'Full Name' : 'पूरा नाम'}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === 'en' ? 'Enter your full name' : 'आफ्नो पूरा नाम प्रविष्ट गर्नुहोस्'}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === 'en' ? 'Email' : 'इमेल'}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={language === 'en' ? 'Enter your email' : 'आफ्नो इमेल प्रविष्ट गर्नुहोस्'}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === 'en' ? 'Phone Number' : 'फोन नम्बर'}
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+977 98XXXXXXXX"
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={language === 'en' ? 'Create a password' : 'पासवर्ड बनाउनुहोस्'}
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

            <div className="flex items-start gap-2">
              <input 
                type="checkbox" 
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 rounded border-border text-primary focus:ring-primary" 
                required
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                {language === 'en' 
                  ? 'I agree to the Terms of Service and Privacy Policy, including consent for medical data processing'
                  : 'म सेवाका सर्तहरू र गोपनीयता नीतिमा सहमत छु, मेडिकल डाटा प्रोसेसिंगको लागि सहमति सहित'
                }
              </label>
            </div>

            <Button variant="hero" size="lg" className="w-full" disabled={!agreeTerms}>
              {language === 'en' ? 'Create Account' : 'खाता बनाउनुहोस्'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {language === 'en' ? 'Already have an account?' : 'पहिले नै खाता छ?'}{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                {language === 'en' ? 'Sign in' : 'साइन इन'}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
