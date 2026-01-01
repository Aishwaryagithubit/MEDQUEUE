import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const testimonials = [
  {
    name: 'Ramesh Sharma',
    nameNe: 'रमेश शर्मा',
    role: 'Patient',
    roleNe: 'बिरामी',
    text: 'MediQueue saved me hours of waiting. I booked my appointment online, got notified when my turn was near, and saw the doctor without any hassle.',
    textNe: 'मेडिक्यूले मलाई घण्टौं कुर्नुबाट बचायो। मैले अनलाइन अपोइन्टमेन्ट बुक गरें, मेरो पालो नजिक हुँदा सूचना पाएँ, र कुनै झन्झट बिना डाक्टरलाई भेटें।',
    rating: 5,
  },
  {
    name: 'Dr. Sita Poudel',
    nameNe: 'डा. सीता पौडेल',
    role: 'Cardiologist',
    roleNe: 'हृदय विशेषज्ञ',
    text: 'As a doctor, this platform helps me manage my schedule efficiently. The AI triage system ensures critical patients get priority attention.',
    textNe: 'डाक्टरको रूपमा, यो प्लेटफर्मले मलाई मेरो तालिका प्रभावकारी रूपमा व्यवस्थापन गर्न मद्दत गर्छ। एआई ट्रायज प्रणालीले गम्भीर बिरामीहरूलाई प्राथमिकता ध्यान दिन सुनिश्चित गर्छ।',
    rating: 5,
  },
  {
    name: 'Bindu Tamang',
    nameNe: 'बिन्दु तामाङ',
    role: 'Hospital Admin',
    roleNe: 'अस्पताल प्रशासक',
    text: 'Managing our hospital operations has never been easier. The dashboard provides real-time insights and the queue system is seamless.',
    textNe: 'हाम्रो अस्पताल सञ्चालन व्यवस्थापन गर्न कहिल्यै यति सजिलो भएको थिएन। ड्यासबोर्डले वास्तविक-समय अन्तर्दृष्टि प्रदान गर्दछ र लाइन प्रणाली निर्बाध छ।',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const { language } = useLanguage();

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
            {language === 'en' ? 'What People Say' : 'मानिसहरू के भन्छन्'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {language === 'en' 
              ? 'Trusted by thousands of patients and healthcare providers'
              : 'हजारौं बिरामी र स्वास्थ्य सेवा प्रदायकहरूद्वारा विश्वसनीय'
            }
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-6 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/20">
                <Quote className="w-10 h-10" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6">
                "{language === 'en' ? testimonial.text : testimonial.textNe}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-heading font-bold">
                  {(language === 'en' ? testimonial.name : testimonial.nameNe).charAt(0)}
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">
                    {language === 'en' ? testimonial.name : testimonial.nameNe}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? testimonial.role : testimonial.roleNe}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
