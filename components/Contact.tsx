'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Mail, Linkedin, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendContactEmail } from '@/app/actions';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await sendContactEmail(formData);
      
      if (result?.error) {
        setStatus('error');
        setErrorMessage(result.error);
      } else if (result?.success) {
        setStatus('success');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
      setErrorMessage('An unexpected error occurred while sending your message.');
    }
  };

  return (
    <section id="contact" className="w-full py-32 px-8 md:px-16 lg:px-24 bg-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-deep-accent/5 to-bg pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between h-full space-y-12 lg:space-y-0 py-2"
          >
            <div>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                Let&apos;s Build <br />
                Something <br />
                <span className="whitespace-nowrap"><span className="text-accent italic">Scalable</span> Together.</span>
              </h2>
              <div className="w-16 h-1 bg-deep-accent mb-8" />
              <p className="font-sans text-lg text-subtitle max-w-md leading-relaxed">
                Whether you need to untangle a complex platform, align a divided team, or architect a resilient product roadmap—I&apos;m ready to help translate your complexity into clarity.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <div className="flex items-center space-x-6">
                <div className="p-3 rounded-full border border-deep-accent/60 bg-deep-accent/10">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <span className="font-sans text-text text-lg">Barcelona, Spain</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="p-3 rounded-full border border-deep-accent/60 bg-deep-accent/10">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <a href="mailto:golubeva.mash@gmail.com" className="font-sans text-text text-lg hover:text-accent transition-colors hover:underline hover:underline-offset-4 hover:decoration-accent">
                  golubeva.mash@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-6">
                <div className="p-3 rounded-full border border-deep-accent/60 bg-deep-accent/10">
                  <Linkedin className="w-5 h-5 text-accent" />
                </div>
                <a href="https://www.linkedin.com/in/mariia-golubieva/" target="_blank" rel="noopener noreferrer" className="font-sans text-text text-lg hover:text-accent transition-colors hover:underline hover:underline-offset-4 hover:decoration-accent">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#0a0a0a] border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl relative h-full flex flex-col"
          >
            {status === 'success' ? (
              <div className="flex-grow flex flex-col items-center justify-center space-y-6 py-12 text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-text">Message Sent!</h3>
                <p className="font-sans text-subtitle max-w-sm">
                  Thank you for reaching out. I&apos;ve received your message and will get back to you shortly.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6 relative z-10 flex-grow flex flex-col" onSubmit={handleSubmit}>
                <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
                <div className="space-y-2">
                  <label htmlFor="name" className="font-mono text-xs text-subtitle tracking-widest uppercase">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={status === 'loading'}
                    className="w-full bg-[#111111] border border-white/20 rounded-lg px-4 py-4 text-text font-sans focus:outline-none focus:border-accent focus:bg-[#1a1a1a] transition-colors duration-300 disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-xs text-subtitle tracking-widest uppercase">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={status === 'loading'}
                    className="w-full bg-[#111111] border border-white/20 rounded-lg px-4 py-4 text-text font-sans focus:outline-none focus:border-accent focus:bg-[#1a1a1a] transition-colors duration-300 disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="space-y-2 flex-grow flex flex-col">
                  <label htmlFor="message" className="font-mono text-xs text-subtitle tracking-widest uppercase">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    disabled={status === 'loading'}
                    className="w-full flex-grow bg-[#111111] border border-white/20 rounded-lg px-4 py-4 text-text font-sans focus:outline-none focus:border-accent focus:bg-[#1a1a1a] transition-colors duration-300 resize-none disabled:opacity-50"
                    placeholder="How can we build together?"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-4 rounded-lg">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{errorMessage}</p>
                  </div>
                )}

                <div className="pt-4 mt-auto flex justify-center">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative flex items-center justify-center rounded-full p-[2px] font-sans font-bold shadow-lg disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                  >
                    {/* Static background acting as border */}
                    <span className="absolute inset-0 bg-deep-accent transition-colors duration-300 group-hover:bg-deep-accent/20" />

                    {/* Spinning snake */}
                    <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_180deg,#840032_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Inner background */}
                    <span className="relative flex h-full w-full items-center justify-center space-x-3 rounded-full bg-[#050505] px-10 py-4 text-white">
                      <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
                      {status !== 'loading' && <Send className="w-5 h-5 text-white" />}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
          
        </div>
        
        <div className="mt-32 text-center border-t border-subtitle/10 pt-8">
          <p className="font-mono text-xs text-subtitle tracking-widest uppercase">
            © {new Date().getFullYear()} Mariia Golubieva. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
