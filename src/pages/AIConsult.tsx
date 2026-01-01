import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Upload, Mic, FileText, Image, AlertTriangle, Bot, User, Sparkles, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  attachments?: { type: 'image' | 'document'; name: string }[];
  isTyping?: boolean;
  priority?: 'normal' | 'urgent' | 'critical';
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: '',
    timestamp: new Date(),
  },
];

const suggestedQuestions = [
  { en: "I have a persistent headache for 3 days", ne: "मलाई ३ दिनदेखि टाउको दुखेको छ" },
  { en: "I need to see a cardiologist", ne: "मलाई हृदय विशेषज्ञ हेर्न चाहिन्छ" },
  { en: "Upload my lab report", ne: "मेरो ल्याब रिपोर्ट अपलोड गर्नुहोस्" },
  { en: "I have chest pain and shortness of breath", ne: "मलाई छातीमा दुखाइ र सास फेर्न गाह्रो छ" },
];

export default function AIConsult() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set welcome message based on language
  useEffect(() => {
    setMessages([{
      id: '1',
      type: 'ai',
      content: t('chat.welcome'),
      timestamp: new Date(),
    }]);
  }, [language, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string) => {
    setIsProcessing(true);
    
    // Add typing indicator
    const typingId = Date.now().toString();
    setMessages(prev => [...prev, {
      id: typingId,
      type: 'ai',
      content: '',
      timestamp: new Date(),
      isTyping: true,
    }]);

    // Simulate AI processing
    setTimeout(() => {
      const isUrgent = userMessage.toLowerCase().includes('chest pain') || 
                       userMessage.toLowerCase().includes('breathing') ||
                       userMessage.toLowerCase().includes('छातीमा');
      
      let response = '';
      let priority: 'normal' | 'urgent' | 'critical' = 'normal';
      
      if (isUrgent) {
        priority = 'critical';
        response = language === 'en' 
          ? "⚠️ **URGENT CASE DETECTED**\n\nBased on your symptoms (chest pain, breathing difficulty), this appears to be a potentially serious condition. I recommend:\n\n1. **Immediate Action**: If symptoms are severe, please call emergency services or visit the nearest emergency room.\n\n2. **Recommended Specialists**:\n   - Dr. Rajesh Kumar - Cardiologist at Grande Hospital\n   - Dr. Sita Sharma - Emergency Medicine at Bir Hospital\n\n3. **Priority Booking**: I can book an urgent appointment for you right now.\n\nWould you like me to proceed with priority booking?"
          : "⚠️ **आपातकालीन केस पत्ता लाग्यो**\n\nतपाईंको लक्षणहरू (छातीमा दुखाइ, सास फेर्न गाह्रो) को आधारमा, यो सम्भावित गम्भीर अवस्था हो। म सिफारिस गर्छु:\n\n1. **तत्काल कार्य**: यदि लक्षणहरू गम्भीर छन् भने, कृपया आपातकालीन सेवाहरू कल गर्नुहोस् वा नजिकको आपातकालीन कक्षमा जानुहोस्।\n\n2. **सिफारिस गरिएका विशेषज्ञहरू**:\n   - डा. राजेश कुमार - ग्राण्डे अस्पतालमा हृदय विशेषज्ञ\n   - डा. सीता शर्मा - वीर अस्पतालमा आपातकालीन चिकित्सा\n\n3. **प्राथमिकता बुकिङ**: म तपाईंको लागि अहिले नै जरुरी अपोइन्टमेन्ट बुक गर्न सक्छु।\n\nके तपाईं प्राथमिकता बुकिङसँग अगाडि बढ्न चाहनुहुन्छ?";
      } else if (userMessage.toLowerCase().includes('headache') || userMessage.toLowerCase().includes('टाउको')) {
        response = language === 'en'
          ? "I understand you're experiencing persistent headaches. Let me ask a few questions to better understand your condition:\n\n1. **Duration**: How many hours does each headache episode last?\n2. **Location**: Is the pain on one side or both sides of your head?\n3. **Severity**: On a scale of 1-10, how would you rate the pain?\n4. **Triggers**: Have you noticed any patterns - stress, certain foods, or lack of sleep?\n\nBased on your answers, I can recommend:\n- **Neurologist** for migraine evaluation\n- **General Physician** for primary assessment\n\nPlease share more details so I can provide accurate recommendations."
          : "म बुझ्छु कि तपाईंलाई लगातार टाउको दुखेको छ। तपाईंको अवस्था राम्ररी बुझ्न मलाई केही प्रश्नहरू सोध्न दिनुहोस्:\n\n1. **अवधि**: प्रत्येक टाउको दुखाइको एपिसोड कति घण्टा रहन्छ?\n2. **स्थान**: दुखाइ तपाईंको टाउकोको एक छेउमा वा दुवै छेउमा छ?\n3. **गम्भीरता**: १-१० को स्केलमा, तपाईं दुखाइलाई कसरी मूल्याङ्कन गर्नुहुन्छ?\n4. **ट्रिगरहरू**: तपाईंले कुनै ढाँचाहरू देख्नुभएको छ - तनाव, निश्चित खानेकुरा, वा निद्राको कमी?\n\nतपाईंको जवाफहरूको आधारमा, म सिफारिस गर्न सक्छु:\n- माइग्रेन मूल्याङ्कनको लागि **न्यूरोलोजिस्ट**\n- प्राथमिक मूल्याङ्कनको लागि **सामान्य चिकित्सक**\n\nकृपया थप विवरणहरू साझा गर्नुहोस् ताकि म सही सिफारिसहरू प्रदान गर्न सकूँ।";
      } else if (userMessage.toLowerCase().includes('cardiologist') || userMessage.toLowerCase().includes('हृदय')) {
        response = language === 'en'
          ? "I can help you find a cardiologist. Here are the top recommended specialists in your area:\n\n**Available Cardiologists:**\n\n1. 🏥 **Dr. Prakash Sayami** - Grande Hospital\n   - Experience: 15 years\n   - Next Available: Tomorrow, 10:00 AM\n   - Fee: Rs. 1,500\n   - Rating: ⭐ 4.9/5\n\n2. 🏥 **Dr. Arun Maskey** - Bir Hospital\n   - Experience: 20 years\n   - Next Available: Today, 3:00 PM\n   - Fee: Rs. 1,200\n   - Rating: ⭐ 4.8/5\n\n3. 🏥 **Dr. Sunil Sharma** - Norvic Hospital\n   - Experience: 12 years\n   - Next Available: Friday, 11:00 AM\n   - Fee: Rs. 1,800\n   - Rating: ⭐ 4.7/5\n\nWould you like me to book an appointment with any of these doctors?"
          : "म तपाईंलाई हृदय विशेषज्ञ खोज्न मद्दत गर्न सक्छु। यहाँ तपाईंको क्षेत्रमा शीर्ष सिफारिस गरिएका विशेषज्ञहरू छन्:\n\n**उपलब्ध हृदय विशेषज्ञहरू:**\n\n1. 🏥 **डा. प्रकाश सयामी** - ग्राण्डे अस्पताल\n   - अनुभव: १५ वर्ष\n   - अर्को उपलब्ध: भोलि, बिहान १०:०० बजे\n   - शुल्क: रु. १,५००\n   - रेटिङ: ⭐ ४.९/५\n\n2. 🏥 **डा. अरुण मास्के** - वीर अस्पताल\n   - अनुभव: २० वर्ष\n   - अर्को उपलब्ध: आज, दिउँसो ३:०० बजे\n   - शुल्क: रु. १,२००\n   - रेटिङ: ⭐ ४.८/५\n\n3. 🏥 **डा. सुनिल शर्मा** - नोर्भिक अस्पताल\n   - अनुभव: १२ वर्ष\n   - अर्को उपलब्ध: शुक्रबार, बिहान ११:०० बजे\n   - शुल्क: रु. १,८००\n   - रेटिङ: ⭐ ४.७/५\n\nके तपाईं यी मध्ये कुनै डाक्टरसँग अपोइन्टमेन्ट बुक गर्न चाहनुहुन्छ?";
      } else {
        response = language === 'en'
          ? "Thank you for sharing that information. To provide you with the best recommendations, could you please tell me more about:\n\n1. When did these symptoms start?\n2. Are there any other symptoms you're experiencing?\n3. Do you have any pre-existing medical conditions?\n4. Have you taken any medication for this?\n\nYou can also upload any recent medical reports or test results for a more accurate assessment."
          : "त्यो जानकारी साझा गर्नुभएकोमा धन्यवाद। तपाईंलाई उत्कृष्ट सिफारिसहरू प्रदान गर्न, कृपया मलाई थप बताउनुहोस्:\n\n1. यी लक्षणहरू कहिलेदेखि सुरु भयो?\n2. तपाईंले अनुभव गरिरहनुभएको अरू कुनै लक्षणहरू छन्?\n3. तपाईंलाई कुनै पहिलेदेखिको चिकित्सा अवस्थाहरू छन्?\n4. तपाईंले यसको लागि कुनै औषधि लिनुभएको छ?\n\nथप सटीक मूल्याङ्कनको लागि तपाईं कुनै पनि भर्खरको मेडिकल रिपोर्ट वा परीक्षण परिणामहरू पनि अपलोड गर्न सक्नुहुन्छ।";
      }

      setMessages(prev => prev.filter(m => m.id !== typingId).concat({
        id: Date.now().toString(),
        type: 'ai',
        content: response,
        timestamp: new Date(),
        priority,
      }));
      setIsProcessing(false);
    }, 2000);
  };

  const handleSend = () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    simulateAIResponse(inputValue);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: language === 'en' ? `Uploaded: ${file.name}` : `अपलोड गरियो: ${file.name}`,
        timestamp: new Date(),
        attachments: [{ type: file.type.includes('image') ? 'image' : 'document', name: file.name }],
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate AI response to upload
      setIsProcessing(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'ai',
          content: language === 'en'
            ? `I've received your ${file.type.includes('image') ? 'image' : 'document'} "${file.name}". Let me analyze it...\n\n📊 **Analysis Complete**\n\nI've extracted the following information from your report:\n- Report Type: Lab Test Results\n- Date: Recent\n- Key Findings: Values within normal range\n\nBased on this report and your symptoms, I recommend scheduling a follow-up consultation. Would you like me to find available doctors?`
            : `मैले तपाईंको ${file.type.includes('image') ? 'छवि' : 'कागजात'} "${file.name}" प्राप्त गरेको छु। मलाई यसको विश्लेषण गर्न दिनुहोस्...\n\n📊 **विश्लेषण पूरा भयो**\n\nमैले तपाईंको रिपोर्टबाट निम्न जानकारी निकालेको छु:\n- रिपोर्ट प्रकार: ल्याब परीक्षण परिणामहरू\n- मिति: भर्खरको\n- मुख्य निष्कर्षहरू: मानहरू सामान्य दायरामा\n\nयो रिपोर्ट र तपाईंको लक्षणहरूको आधारमा, म फलो-अप परामर्श तालिका बनाउन सिफारिस गर्छु। के तपाईं चाहनुहुन्छ कि म उपलब्ध डाक्टरहरू खोजूँ?`,
          timestamp: new Date(),
        }]);
        setIsProcessing(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 pb-4 flex flex-col">
        <div className="container mx-auto px-4 flex-1 flex flex-col max-w-4xl">
          {/* Chat Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-4 mb-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg text-foreground">{t('chat.title')}</h1>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Powered by AI • Available 24/7' : 'एआई द्वारा संचालित • २४/७ उपलब्ध'}
              </p>
            </div>
          </motion.div>

          {/* Messages Area */}
          <div className="flex-1 glass-card rounded-2xl p-4 mb-4 overflow-y-auto max-h-[calc(100vh-340px)]">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 mb-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                    message.type === 'ai' ? 'gradient-bg' : 'bg-accent'
                  }`}>
                    {message.type === 'ai' ? (
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <User className="w-4 h-4 text-accent-foreground" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                    {message.isTyping ? (
                      <div className="glass-card rounded-xl p-4 inline-flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-sm text-muted-foreground">{t('chat.analyzing')}</span>
                      </div>
                    ) : (
                      <div className={`rounded-xl p-4 inline-block text-left ${
                        message.type === 'user' 
                          ? 'gradient-bg text-primary-foreground' 
                          : message.priority === 'critical'
                            ? 'bg-critical/10 border border-critical/30'
                            : 'glass-card'
                      }`}>
                        {message.priority === 'critical' && (
                          <div className="flex items-center gap-2 mb-2 text-critical">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-sm font-semibold">
                              {language === 'en' ? 'Urgent Case' : 'आपातकालीन केस'}
                            </span>
                          </div>
                        )}
                        {message.attachments && (
                          <div className="flex gap-2 mb-2">
                            {message.attachments.map((att, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm bg-primary-foreground/20 rounded-lg px-3 py-1">
                                {att.type === 'image' ? <Image className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                <span>{att.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.content.split('\n').map((line, i) => (
                            <span key={i}>
                              {line.startsWith('**') && line.endsWith('**') ? (
                                <strong>{line.slice(2, -2)}</strong>
                              ) : line.startsWith('- ') ? (
                                <span className="block ml-2">{line}</span>
                              ) : (
                                line
                              )}
                              {i < message.content.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex flex-wrap gap-2"
            >
              {suggestedQuestions.map((q, i) => (
                <Button
                  key={i}
                  variant="glass"
                  size="sm"
                  onClick={() => {
                    setInputValue(language === 'en' ? q.en : q.ne);
                  }}
                  className="text-xs"
                >
                  {language === 'en' ? q.en : q.ne}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              ))}
            </motion.div>
          )}

          {/* Input Area */}
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
              >
                <Upload className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" disabled={isProcessing}>
                <Mic className="w-5 h-5" />
              </Button>
              
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('chat.placeholder')}
                disabled={isProcessing}
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
              />
              
              <Button
                variant="hero"
                size="icon"
                onClick={handleSend}
                disabled={!inputValue.trim() || isProcessing}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
