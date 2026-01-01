import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Shield, Clock, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl" />
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 border border-primary/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-48 h-48 border border-accent/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Healthcare</span>
            </motion.div>

            {/* Title */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {t('hero.title').split(' ').map((word, i) => (
                <span key={i}>
                  {i === 1 || i === 2 ? (
                    <span className="gradient-text">{word} </span>
                  ) : (
                    `${word} `
                  )}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/ai-consult">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <MessageSquare className="w-5 h-5" />
                  {t('hero.startConsult')}
                </Button>
              </Link>
              <Link to="/find-doctor">
                <Button variant="glass" size="xl" className="w-full sm:w-auto">
                  <Search className="w-5 h-5" />
                  {t('hero.findDoctor')}
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center"
                  >
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="font-heading font-bold text-foreground">50,000+</p>
                <p className="text-sm text-muted-foreground">{t('hero.patients')}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* AI Diagnosis Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card rounded-2xl p-6 col-span-2"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {t('features.ai.title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.ai.desc')}
                </p>
              </motion.div>

              {/* Queue Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  {t('features.queue.title')}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Real-time updates
                </p>
              </motion.div>

              {/* Secure Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-success" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  Secure & Private
                </h3>
                <p className="text-xs text-muted-foreground">
                  HIPAA compliant
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="col-span-2 grid grid-cols-3 gap-4"
              >
                {[
                  { value: '500+', label: 'Doctors' },
                  { value: '50+', label: 'Hospitals' },
                  { value: '99%', label: 'Satisfaction' },
                ].map((stat, i) => (
                  <div key={i} className="glass-card rounded-xl p-4 text-center">
                    <p className="font-heading font-bold text-xl gradient-text">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
