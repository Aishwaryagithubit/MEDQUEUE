import { motion } from 'framer-motion';
import { 
  Users, Calendar, Clock, AlertTriangle, TrendingUp, 
  CheckCircle, XCircle, Activity, Hospital, Stethoscope,
  ChevronRight, Bell, Settings
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const stats = [
  { 
    label: 'Total Patients', 
    labelNe: 'कुल बिरामीहरू', 
    value: '1,234', 
    change: '+12%', 
    icon: Users,
    color: 'primary' 
  },
  { 
    label: 'Today\'s Appointments', 
    labelNe: 'आजको अपोइन्टमेन्ट', 
    value: '48', 
    change: '+5%', 
    icon: Calendar,
    color: 'accent' 
  },
  { 
    label: 'Avg. Wait Time', 
    labelNe: 'औसत प्रतीक्षा समय', 
    value: '18 min', 
    change: '-8%', 
    icon: Clock,
    color: 'success' 
  },
  { 
    label: 'Critical Cases', 
    labelNe: 'गम्भीर केसहरू', 
    value: '3', 
    change: '0%', 
    icon: AlertTriangle,
    color: 'critical' 
  },
];

const todayQueue = [
  { 
    id: 1, 
    patient: 'Ramesh Sharma', 
    patientNe: 'रमेश शर्मा',
    time: '9:00 AM', 
    status: 'in-progress', 
    priority: 'normal' 
  },
  { 
    id: 2, 
    patient: 'Sita Poudel', 
    patientNe: 'सीता पौडेल',
    time: '9:30 AM', 
    status: 'waiting', 
    priority: 'high' 
  },
  { 
    id: 3, 
    patient: 'Hari Thapa', 
    patientNe: 'हरि थापा',
    time: '10:00 AM', 
    status: 'waiting', 
    priority: 'critical' 
  },
  { 
    id: 4, 
    patient: 'Gita Rai', 
    patientNe: 'गीता राई',
    time: '10:30 AM', 
    status: 'waiting', 
    priority: 'normal' 
  },
  { 
    id: 5, 
    patient: 'Krishna KC', 
    patientNe: 'कृष्ण केसी',
    time: '11:00 AM', 
    status: 'completed', 
    priority: 'normal' 
  },
];

const recentAppointments = [
  {
    id: 1,
    patient: 'Bindu Tamang',
    patientNe: 'बिन्दु तामाङ',
    doctor: 'Dr. Prakash Sayami',
    doctorNe: 'डा. प्रकाश सयामी',
    specialty: 'Cardiology',
    specialtyNe: 'हृदय रोग',
    time: '2 hours ago',
    timeNe: '२ घण्टा अघि',
    status: 'completed',
  },
  {
    id: 2,
    patient: 'Suresh Koirala',
    patientNe: 'सुरेश कोइराला',
    doctor: 'Dr. Sita Sharma',
    doctorNe: 'डा. सीता शर्मा',
    specialty: 'Neurology',
    specialtyNe: 'न्यूरोलोजी',
    time: '3 hours ago',
    timeNe: '३ घण्टा अघि',
    status: 'completed',
  },
  {
    id: 3,
    patient: 'Maya Gurung',
    patientNe: 'माया गुरुङ',
    doctor: 'Dr. Arun Maskey',
    doctorNe: 'डा. अरुण मास्के',
    specialty: 'Cardiology',
    specialtyNe: 'हृदय रोग',
    time: '5 hours ago',
    timeNe: '५ घण्टा अघि',
    status: 'no-show',
  },
];

const priorityColors = {
  normal: 'bg-secondary text-secondary-foreground',
  high: 'bg-warning/20 text-warning',
  critical: 'bg-critical/20 text-critical animate-pulse',
};

const statusColors = {
  'in-progress': 'bg-primary/20 text-primary',
  'waiting': 'bg-secondary text-muted-foreground',
  'completed': 'bg-success/20 text-success',
  'no-show': 'bg-muted text-muted-foreground',
};

export default function Dashboard() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                {t('dashboard.welcome')}, <span className="gradient-text">Dr. Admin</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === 'en' 
                  ? 'Here\'s what\'s happening today'
                  : 'आज के हो यहाँ'
                }
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="glass">
                <Bell className="w-4 h-4" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-critical opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-critical"></span>
                </span>
              </Button>
              <Button variant="glass">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    stat.color === 'primary' ? 'gradient-bg' :
                    stat.color === 'accent' ? 'bg-accent/20' :
                    stat.color === 'success' ? 'bg-success/20' :
                    'bg-critical/20'
                  }`}>
                    <stat.icon className={`w-6 h-6 ${
                      stat.color === 'primary' ? 'text-primary-foreground' :
                      stat.color === 'accent' ? 'text-accent' :
                      stat.color === 'success' ? 'text-success' :
                      'text-critical'
                    }`} />
                  </div>
                  <span className={`text-sm font-medium flex items-center gap-1 ${
                    stat.change.startsWith('+') ? 'text-success' : 
                    stat.change.startsWith('-') ? 'text-critical' : 
                    'text-muted-foreground'
                  }`}>
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </span>
                </div>
                <p className="font-heading text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === 'en' ? stat.label : stat.labelNe}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Today's Queue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  {t('dashboard.today')}
                </h2>
                <Button variant="ghost" size="sm">
                  {t('common.viewAll')}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {todayQueue.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                      item.priority === 'critical' ? 'bg-critical/5 border border-critical/20' :
                      item.status === 'in-progress' ? 'bg-primary/5 border border-primary/20' :
                      'bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'in-progress' ? 'bg-primary animate-pulse' :
                        item.status === 'completed' ? 'bg-success' :
                        item.priority === 'critical' ? 'bg-critical animate-pulse' :
                        'bg-muted'
                      }`} />
                      <div>
                        <p className="font-medium text-foreground">
                          {language === 'en' ? item.patient : item.patientNe}
                        </p>
                        <p className="text-sm text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {item.priority !== 'normal' && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[item.priority]}`}>
                          {item.priority === 'critical' 
                            ? (language === 'en' ? 'Critical' : 'गम्भीर')
                            : (language === 'en' ? 'High' : 'उच्च')
                          }
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status as keyof typeof statusColors]}`}>
                        {item.status === 'in-progress' ? (language === 'en' ? 'In Progress' : 'प्रगतिमा') :
                         item.status === 'waiting' ? (language === 'en' ? 'Waiting' : 'कुर्दै') :
                         (language === 'en' ? 'Completed' : 'सम्पन्न')}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  {language === 'en' ? 'Recent Activity' : 'भर्खरको गतिविधि'}
                </h2>
                <Activity className="w-5 h-5 text-primary" />
              </div>

              <div className="space-y-4">
                {recentAppointments.map((apt, index) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      apt.status === 'completed' ? 'bg-success/20' : 'bg-muted'
                    }`}>
                      {apt.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <XCircle className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {language === 'en' ? apt.patient : apt.patientNe}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? apt.doctor : apt.doctorNe} • {language === 'en' ? apt.specialty : apt.specialtyNe}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {language === 'en' ? apt.time : apt.timeNe}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 grid sm:grid-cols-3 gap-4"
          >
            <Button variant="glass" className="h-auto py-6 flex-col gap-3">
              <Hospital className="w-8 h-8 text-primary" />
              <span>{language === 'en' ? 'Manage Hospital' : 'अस्पताल व्यवस्थापन'}</span>
            </Button>
            <Button variant="glass" className="h-auto py-6 flex-col gap-3">
              <Stethoscope className="w-8 h-8 text-accent" />
              <span>{language === 'en' ? 'Doctor Profiles' : 'डाक्टर प्रोफाइल'}</span>
            </Button>
            <Button variant="glass" className="h-auto py-6 flex-col gap-3">
              <Users className="w-8 h-8 text-success" />
              <span>{language === 'en' ? 'Patient Records' : 'बिरामी रेकर्ड'}</span>
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
