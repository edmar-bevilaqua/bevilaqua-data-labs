
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, MessageSquare, Twitter } from 'lucide-react';

const ContactSection = () => {
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
                <Mail className="w-5 h-5 mr-3 text-foreground/60" />
                <a href="mailto:john.doe@example.com" className="text-foreground/80 hover:text-foreground transition-colors">
                  john.doe@example.com
                </a>
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-3 text-foreground/60" />
                <span className="text-foreground/80">Available for freelance and full-time positions</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/50 hover:bg-secondary transition-colors"
                aria-label="Github"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/50 hover:bg-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/50 hover:bg-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-lg">
            <form>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <Input id="name" placeholder="Your name" className="bg-background/50 border-foreground/10" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input id="email" type="email" placeholder="Your email" className="bg-background/50 border-foreground/10" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <Textarea id="message" placeholder="Your message" className="bg-background/50 border-foreground/10 min-h-[150px]" />
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
