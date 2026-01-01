import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Clock, Filter, ChevronDown, Heart, Calendar, DollarSign } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const specialties = [
  { en: 'All Specialties', ne: 'सबै विशेषताहरू' },
  { en: 'Cardiologist', ne: 'हृदय विशेषज्ञ' },
  { en: 'Neurologist', ne: 'न्यूरोलोजिस्ट' },
  { en: 'Orthopedic', ne: 'हड्डी विशेषज्ञ' },
  { en: 'Dermatologist', ne: 'छाला विशेषज्ञ' },
  { en: 'Pediatrician', ne: 'बाल चिकित्सक' },
  { en: 'General Physician', ne: 'सामान्य चिकित्सक' },
];

const locations = [
  { en: 'All Locations', ne: 'सबै स्थानहरू' },
  { en: 'Kathmandu', ne: 'काठमाडौं' },
  { en: 'Lalitpur', ne: 'ललितपुर' },
  { en: 'Bhaktapur', ne: 'भक्तपुर' },
  { en: 'Pokhara', ne: 'पोखरा' },
  { en: 'Biratnagar', ne: 'विराटनगर' },
];

const doctors = [
  {
    id: 1,
    name: 'Dr. Prakash Sayami',
    nameNe: 'डा. प्रकाश सयामी',
    specialty: 'Cardiologist',
    specialtyNe: 'हृदय विशेषज्ञ',
    hospital: 'Grande Hospital',
    hospitalNe: 'ग्राण्डे अस्पताल',
    location: 'Kathmandu',
    locationNe: 'काठमाडौं',
    experience: 15,
    rating: 4.9,
    reviews: 234,
    fee: 1500,
    available: true,
    nextSlot: 'Today, 3:00 PM',
    nextSlotNe: 'आज, दिउँसो ३:०० बजे',
    image: 'PS',
  },
  {
    id: 2,
    name: 'Dr. Sita Sharma',
    nameNe: 'डा. सीता शर्मा',
    specialty: 'Neurologist',
    specialtyNe: 'न्यूरोलोजिस्ट',
    hospital: 'Bir Hospital',
    hospitalNe: 'वीर अस्पताल',
    location: 'Kathmandu',
    locationNe: 'काठमाडौं',
    experience: 12,
    rating: 4.8,
    reviews: 189,
    fee: 1200,
    available: true,
    nextSlot: 'Tomorrow, 10:00 AM',
    nextSlotNe: 'भोलि, बिहान १०:०० बजे',
    image: 'SS',
  },
  {
    id: 3,
    name: 'Dr. Arun Maskey',
    nameNe: 'डा. अरुण मास्के',
    specialty: 'Cardiologist',
    specialtyNe: 'हृदय विशेषज्ञ',
    hospital: 'Norvic Hospital',
    hospitalNe: 'नोर्भिक अस्पताल',
    location: 'Lalitpur',
    locationNe: 'ललितपुर',
    experience: 20,
    rating: 4.9,
    reviews: 312,
    fee: 1800,
    available: true,
    nextSlot: 'Today, 5:00 PM',
    nextSlotNe: 'आज, साँझ ५:०० बजे',
    image: 'AM',
  },
  {
    id: 4,
    name: 'Dr. Bindu Tamang',
    nameNe: 'डा. बिन्दु तामाङ',
    specialty: 'Pediatrician',
    specialtyNe: 'बाल चिकित्सक',
    hospital: 'Kanti Children Hospital',
    hospitalNe: 'कान्ति बाल अस्पताल',
    location: 'Kathmandu',
    locationNe: 'काठमाडौं',
    experience: 8,
    rating: 4.7,
    reviews: 156,
    fee: 1000,
    available: true,
    nextSlot: 'Friday, 2:00 PM',
    nextSlotNe: 'शुक्रबार, दिउँसो २:०० बजे',
    image: 'BT',
  },
  {
    id: 5,
    name: 'Dr. Ramesh Koirala',
    nameNe: 'डा. रमेश कोइराला',
    specialty: 'Orthopedic',
    specialtyNe: 'हड्डी विशेषज्ञ',
    hospital: 'Medicare Hospital',
    hospitalNe: 'मेडिकेयर अस्पताल',
    location: 'Pokhara',
    locationNe: 'पोखरा',
    experience: 18,
    rating: 4.8,
    reviews: 267,
    fee: 1400,
    available: false,
    nextSlot: 'Next Week',
    nextSlotNe: 'अर्को हप्ता',
    image: 'RK',
  },
  {
    id: 6,
    name: 'Dr. Sunita Rai',
    nameNe: 'डा. सुनिता राई',
    specialty: 'Dermatologist',
    specialtyNe: 'छाला विशेषज्ञ',
    hospital: 'Skin Care Center',
    hospitalNe: 'स्किन केयर सेन्टर',
    location: 'Kathmandu',
    locationNe: 'काठमाडौं',
    experience: 10,
    rating: 4.6,
    reviews: 198,
    fee: 1300,
    available: true,
    nextSlot: 'Today, 4:30 PM',
    nextSlotNe: 'आज, साँझ ४:३० बजे',
    image: 'SR',
  },
];

export default function FindDoctor() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = searchQuery === '' || 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === 0 || 
      doctor.specialty === specialties[selectedSpecialty].en;
    
    const matchesLocation = selectedLocation === 0 || 
      doctor.location === locations[selectedLocation].en;

    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('nav.findDoctor')}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Find and book appointments with the best doctors near you'
                : 'आफ्नो नजिकका उत्कृष्ट डाक्टरहरूसँग अपोइन्टमेन्ट खोज्नुहोस् र बुक गर्नुहोस्'
              }
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-4 md:p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('doctor.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                />
              </div>

              {/* Specialty Filter */}
              <div className="relative">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(Number(e.target.value))}
                  className="appearance-none w-full md:w-48 px-4 py-3 pr-10 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                >
                  {specialties.map((s, i) => (
                    <option key={i} value={i}>{language === 'en' ? s.en : s.ne}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Location Filter */}
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(Number(e.target.value))}
                  className="appearance-none w-full md:w-48 px-4 py-3 pr-10 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
                >
                  {locations.map((l, i) => (
                    <option key={i} value={i}>{language === 'en' ? l.en : l.ne}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              <Button variant="hero" className="md:w-auto">
                <Filter className="w-4 h-4" />
                {language === 'en' ? 'Filter' : 'फिल्टर'}
              </Button>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              {language === 'en' 
                ? `Showing ${filteredDoctors.length} doctors`
                : `${filteredDoctors.length} डाक्टरहरू देखाउँदै`
              }
            </p>
          </div>

          {/* Doctor Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl p-6 relative group"
              >
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(doctor.id)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors ${
                      favorites.includes(doctor.id) ? 'fill-critical text-critical' : 'text-muted-foreground'
                    }`} 
                  />
                </button>

                {/* Doctor Info */}
                <div className="flex gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground font-heading font-bold text-lg">
                    {doctor.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-foreground">
                      {language === 'en' ? doctor.name : doctor.nameNe}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {language === 'en' ? doctor.specialty : doctor.specialtyNe}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'en' ? doctor.hospital : doctor.hospitalNe}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{language === 'en' ? doctor.location : doctor.locationNe}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span>{doctor.rating} ({doctor.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{doctor.experience} {language === 'en' ? 'yrs' : 'वर्ष'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span>Rs. {doctor.fee}</span>
                  </div>
                </div>

                {/* Availability */}
                <div className={`flex items-center gap-2 text-sm mb-4 px-3 py-2 rounded-lg ${
                  doctor.available ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                }`}>
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">
                    {language === 'en' ? doctor.nextSlot : doctor.nextSlotNe}
                  </span>
                </div>

                {/* Book Button */}
                <Button 
                  variant={doctor.available ? "hero" : "secondary"} 
                  className="w-full"
                  disabled={!doctor.available}
                >
                  {t('doctor.book')}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
