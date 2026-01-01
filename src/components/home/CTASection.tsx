import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function CTASection() {
  const { language } = useLanguage();

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-8"
          >
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </motion.div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            {language === 'en' 
              ? 'Ready to Experience Smart Healthcare?'
              : 'स्मार्ट स्वास्थ्य सेवा अनुभव गर्न तयार हुनुहुन्छ?'
            }
          </h2>

          <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
            {language === 'en'
              ? 'Join thousands of patients and doctors already using MediQueue for seamless healthcare experiences.'
              : 'हजारौं बिरामी र डाक्टरहरूसँग सामेल हुनुहोस् जसले पहिले नै निर्बाध स्वास्थ्य सेवा अनुभवको लागि मेडिक्यू प्रयोग गर्दैछन्।'
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button 
                size="xl" 
                className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold shadow-lg"
              >
                {language === 'en' ? 'Get Started Free' : 'नि:शुल्क सुरु गर्नुहोस्'}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/ai-consult">
              <Button 
                variant="outline" 
                size="xl" 
                className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                {language === 'en' ? 'Try AI Consultation' : 'एआई परामर्श प्रयास गर्नुहोस्'}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
