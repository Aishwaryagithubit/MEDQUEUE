import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Phone, FileText, Check, X, Bell } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const appointments = [
  {
    id: 1,
    doctor: 'Dr. Prakash Sayami',
    doctorNe: 'डा. प्रकाश सयामी',
    specialty: 'Cardiologist',
    specialtyNe: 'हृदय विशेषज्ञ',
    hospital: 'Grande Hospital',
    hospitalNe: 'ग्राण्डे अस्पताल',
    date: '2024-01-15',
    time: '10:00 AM',
    timeNe: 'बिहान १०:०० बजे',
    status: 'upcoming',
    queueNumber: 5,
    estimatedWait: '30 min',
    estimatedWaitNe: '३० मिनेट',
  },
  {
    id: 2,
    doctor: 'Dr. Sita Sharma',
    doctorNe: 'डा. सीता शर्मा',
    specialty: 'Neurologist',
    specialtyNe: 'न्यूरोलोजिस्ट',
    hospital: 'Bir Hospital',
    hospitalNe: 'वीर अस्पताल',
    date: '2024-01-20',
    time: '2:30 PM',
    timeNe: 'दिउँसो २:३० बजे',
    status: 'upcoming',
    queueNumber: 3,
    estimatedWait: '15 min',
    estimatedWaitNe: '१५ मिनेट',
  },
  {
    id: 3,
    doctor: 'Dr. Arun Maskey',
    doctorNe: 'डा. अरुण मास्के',
    specialty: 'Cardiologist',
    specialtyNe: 'हृदय विशेषज्ञ',
    hospital: 'Norvic Hospital',
    hospitalNe: 'नोर्भिक अस्पताल',
    date: '2024-01-10',
    time: '11:00 AM',
    timeNe: 'बिहान ११:०० बजे',
    status: 'completed',
    queueNumber: null,
    estimatedWait: null,
  },
  {
    id: 4,
    doctor: 'Dr. Bindu Tamang',
    doctorNe: 'डा. बिन्दु तामाङ',
    specialty: 'Pediatrician',
    specialtyNe: 'बाल चिकित्सक',
    hospital: 'Kanti Children Hospital',
    hospitalNe: 'कान्ति बाल अस्पताल',
    date: '2024-01-05',
    time: '3:00 PM',
    timeNe: 'दिउँसो ३:०० बजे',
    status: 'cancelled',
    queueNumber: null,
    estimatedWait: null,
  },
];

const statusColors = {
  upcoming: 'bg-primary/10 text-primary border-primary/30',
  completed: 'bg-success/10 text-success border-success/30',
  cancelled: 'bg-critical/10 text-critical border-critical/30',
};

const statusLabels = {
  upcoming: { en: 'Upcoming', ne: 'आगामी' },
  completed: { en: 'Completed', ne: 'सम्पन्न' },
  cancelled: { en: 'Cancelled', ne: 'रद्द' },
};

export default function Appointments() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const filteredAppointments = appointments.filter(apt => 
    activeTab === 'upcoming' 
      ? apt.status === 'upcoming'
      : apt.status === 'completed' || apt.status === 'cancelled'
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === 'en' ? 'My Appointments' : 'मेरो अपोइन्टमेन्टहरू'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Manage and track all your medical appointments'
                : 'आफ्ना सबै चिकित्सा अपोइन्टमेन्टहरू व्यवस्थापन र ट्र्याक गर्नुहोस्'
              }
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 mb-6"
          >
            <Button
              variant={activeTab === 'upcoming' ? 'hero' : 'glass'}
              onClick={() => setActiveTab('upcoming')}
            >
              <Calendar className="w-4 h-4" />
              {language === 'en' ? 'Upcoming' : 'आगामी'}
              <span className="ml-2 px-2 py-0.5 rounded-full bg-primary-foreground/20 text-xs">
                {appointments.filter(a => a.status === 'upcoming').length}
              </span>
            </Button>
            <Button
              variant={activeTab === 'past' ? 'hero' : 'glass'}
              onClick={() => setActiveTab('past')}
            >
              <Clock className="w-4 h-4" />
              {language === 'en' ? 'Past' : 'विगत'}
            </Button>
          </motion.div>

          {/* Appointments List */}
          <div className="space-y-4">
            {filteredAppointments.map((apt, index) => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground font-heading font-bold">
                      {(language === 'en' ? apt.doctor : apt.doctorNe).split(' ').slice(1).map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        {language === 'en' ? apt.doctor : apt.doctorNe}
                      </h3>
                      <p className="text-sm text-primary">
                        {language === 'en' ? apt.specialty : apt.specialtyNe}
                      </p>
                    </div>
                  </div>
                  
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusColors[apt.status as keyof typeof statusColors]}`}>
                    {apt.status === 'completed' && <Check className="w-4 h-4 mr-1" />}
                    {apt.status === 'cancelled' && <X className="w-4 h-4 mr-1" />}
                    {statusLabels[apt.status as keyof typeof statusLabels][language]}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{apt.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{language === 'en' ? apt.time : apt.timeNe}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{language === 'en' ? apt.hospital : apt.hospitalNe}</span>
                  </div>
                  {apt.queueNumber && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4 text-primary" />
                      <span>Queue #{apt.queueNumber}</span>
                    </div>
                  )}
                </div>

                {apt.status === 'upcoming' && (
                  <>
                    {/* Queue Info */}
                    <div className="bg-secondary/50 rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          {language === 'en' ? 'Your Queue Position' : 'तपाईंको लाइन स्थिति'}
                        </span>
                        <span className="font-heading font-bold text-2xl gradient-text">#{apt.queueNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">
                          {language === 'en' ? 'Estimated wait:' : 'अनुमानित प्रतीक्षा:'}{' '}
                          <span className="text-foreground font-medium">
                            {language === 'en' ? apt.estimatedWait : apt.estimatedWaitNe}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Button variant="hero">
                        <Bell className="w-4 h-4" />
                        {language === 'en' ? 'Get Notified' : 'सूचना पाउनुहोस्'}
                      </Button>
                      <Button variant="glass">
                        <FileText className="w-4 h-4" />
                        {language === 'en' ? 'View Details' : 'विवरण हेर्नुहोस्'}
                      </Button>
                      <Button variant="glass">
                        <Phone className="w-4 h-4" />
                        {language === 'en' ? 'Contact' : 'सम्पर्क'}
                      </Button>
                      <Button variant="outline" className="text-critical border-critical/30 hover:bg-critical/10">
                        <X className="w-4 h-4" />
                        {language === 'en' ? 'Cancel' : 'रद्द गर्नुहोस्'}
                      </Button>
                    </div>
                  </>
                )}

                {apt.status === 'completed' && (
                  <div className="flex gap-3">
                    <Button variant="glass">
                      <FileText className="w-4 h-4" />
                      {language === 'en' ? 'View Prescription' : 'प्रेस्क्रिप्शन हेर्नुहोस्'}
                    </Button>
                    <Button variant="hero">
                      <Calendar className="w-4 h-4" />
                      {language === 'en' ? 'Book Follow-up' : 'फलो-अप बुक गर्नुहोस्'}
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}

            {filteredAppointments.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Calendar className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {language === 'en' 
                    ? 'No appointments found'
                    : 'कुनै अपोइन्टमेन्ट भेटिएन'
                  }
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
