import { motion } from 'framer-motion';
import { Upload, Brain, UserCheck, CalendarCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const steps = [
  {
    icon: Upload,
    title: 'Upload & Describe',
    titleNe: 'अपलोड र वर्णन',
    desc: 'Upload your medical reports and describe your symptoms',
    descNe: 'आफ्नो मेडिकल रिपोर्टहरू अपलोड गर्नुहोस् र आफ्ना लक्षणहरू वर्णन गर्नुहोस्',
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    titleNe: 'एआई विश्लेषण',
    desc: 'Our AI analyzes your data and suggests specialists',
    descNe: 'हाम्रो एआईले तपाईंको डाटा विश्लेषण गर्छ र विशेषज्ञहरू सुझाव दिन्छ',
  },
  {
    icon: UserCheck,
    title: 'Choose Doctor',
    titleNe: 'डाक्टर छान्नुहोस्',
    desc: 'Select from recommended doctors based on your needs',
    descNe: 'तपाईंको आवश्यकता अनुसार सिफारिस गरिएका डाक्टरहरूबाट छान्नुहोस्',
  },
  {
    icon: CalendarCheck,
    title: 'Book & Pay',
    titleNe: 'बुक र भुक्तानी',
    desc: 'Book your slot and complete payment online',
    descNe: 'आफ्नो स्लट बुक गर्नुहोस् र अनलाइन भुक्तानी पूरा गर्नुहोस्',
  },
];

export function HowItWorksSection() {
  const { language } = useLanguage();

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'en' ? 'How It Works' : 'यो कसरी काम गर्छ'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {language === 'en' 
              ? 'Get started in just a few simple steps'
              : 'केही सरल चरणहरूमा सुरु गर्नुहोस्'
            }
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step Number */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center shadow-glow mb-6"
                >
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center shadow-accent">
                    {index + 1}
                  </div>
                </motion.div>

                {/* Arrow - Mobile/Tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <ArrowRight className="w-5 h-5 text-primary rotate-90 sm:rotate-0" />
                  </div>
                )}

                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {language === 'en' ? step.title : step.titleNe}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? step.desc : step.descNe}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
