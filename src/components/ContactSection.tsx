
import React, { useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SiGithub, SiLinkedin, SiGmail, SiSquare, SiInstagram } from 'react-icons/si';

const ContactSection = () => {
  useEffect(() => {
    emailjs.init('l8s4zO3aYgl-d3dOb'); // Substitua pelo seu Public Key
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const form = formRef.current;
    if (form) {
      const name = (form['name'] as unknown as HTMLInputElement).value.trim();
      const email = (form['email'] as unknown as HTMLInputElement).value.trim();
      const message = (form['message'] as unknown as HTMLTextAreaElement).value.trim();

      if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return;
      }
    }

    if (formRef.current) {
      emailjs
        .sendForm(
          'service_9w4s4j6',
          'template_2f545m9',
          formRef.current,
        )
        .then(
          (result) => {
            console.log('Email enviado com sucesso:', result.text);
            alert('Mensagem enviada com sucesso!');
          },
          (error) => {
            console.error('Erro ao enviar o email:', error.text);
            alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
          }
        );
    }
  };

  return (
    <section id="contact" className="section-spacing px-6 md:px-12 lg:px-24 relative bg-card-gradient">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading">Get In Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-foreground/80 mb-8">
              Feel free to reach out if you're looking for a data scientist, have a question, or just want to connect.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <SiGmail className="w-5 h-5 mr-3 text-foreground/60" />
                <a href="mailto:john.doe@example.com" className="text-foreground/80 hover:text-foreground transition-colors">
                  edmar.bevi@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <SiSquare className="w-5 h-5 mr-3 text-foreground/60" />
                <span className="text-foreground/80">Available for freelance and full-time positions</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://github.com/edmar-bevilaqua" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/50 hover:bg-secondary transition-colors"
                aria-label="Github"
              >
                <SiGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/edmar-bevilaqua/" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/50 hover:bg-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/edmar_bevilaqua/" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/50 hover:bg-secondary transition-colors"
                aria-label="Twitter"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-lg">
            <form ref={formRef} onSubmit={sendEmail}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <Input id="name" name="name" placeholder="Your name" className="bg-background/50 border-foreground/10" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input id="email" name="email" type="email" placeholder="Your email" className="bg-background/50 border-foreground/10" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <Textarea id="message" name="message" placeholder="Your message" className="bg-background/50 border-foreground/10 min-h-[150px]" />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 border-none">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
