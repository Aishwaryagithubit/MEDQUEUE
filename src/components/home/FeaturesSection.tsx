import { motion } from 'framer-motion';
import { Brain, Clock, CreditCard, AlertTriangle, Bell, Hospital, UserCheck, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const features = [
  {
    icon: Brain,
    titleKey: 'features.ai.title',
    descKey: 'features.ai.desc',
    color: 'primary',
  },
  {
    icon: Clock,
    titleKey: 'features.queue.title',
    descKey: 'features.queue.desc',
    color: 'accent',
  },
  {
    icon: CreditCard,
    titleKey: 'features.booking.title',
    descKey: 'features.booking.desc',
    color: 'success',
  },
  {
    icon: AlertTriangle,
    titleKey: 'features.triage.title',
    descKey: 'features.triage.desc',
    color: 'warning',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    titleNe: 'स्मार्ट सूचनाहरू',
    desc: 'Get timely reminders for appointments and queue updates.',
    descNe: 'अपोइन्टमेन्ट र लाइन अपडेटहरूको लागि समयमै रिमाइन्डरहरू पाउनुहोस्।',
    color: 'primary',
  },
  {
    icon: Hospital,
    title: 'Hospital Network',
    titleNe: 'अस्पताल नेटवर्क',
    desc: 'Access top hospitals and clinics across Nepal.',
    descNe: 'नेपालभरका शीर्ष अस्पताल र क्लिनिकहरूमा पहुँच।',
    color: 'accent',
  },
  {
    icon: UserCheck,
    title: 'Verified Doctors',
    titleNe: 'प्रमाणित डाक्टरहरू',
    desc: 'All doctors are verified with their credentials.',
    descNe: 'सबै डाक्टरहरू आफ्नो प्रमाणपत्रहरूसँग प्रमाणित छन्।',
    color: 'success',
  },
  {
    icon: FileText,
    title: 'Digital Records',
    titleNe: 'डिजिटल रेकर्डहरू',
    desc: 'Keep all your medical records in one secure place.',
    descNe: 'तपाईंको सबै मेडिकल रेकर्डहरू एक सुरक्षित ठाउँमा राख्नुहोस्।',
    color: 'warning',
  },
];

const colorClasses = {
  primary: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground',
  accent: 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground',
  success: 'bg-success/10 text-success group-hover:bg-success group-hover:text-success-foreground',
  warning: 'bg-warning/10 text-warning group-hover:bg-warning group-hover:text-warning-foreground',
};

export function FeaturesSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {feature.titleKey ? t(feature.titleKey) : (language === 'en' ? feature.title : feature.titleNe)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.descKey ? t(feature.descKey) : (language === 'en' ? feature.desc : feature.descNe)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
