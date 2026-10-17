import React, { useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowUpRight, Building2, Send, Terminal } from 'lucide-react';
import { SiGithub, SiLinkedin, SiGmail } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Language, siteContent } from '@/content/siteContent';

interface ContactSectionProps {
  language: Language;
}

const CONTACT_EMAIL = 'edmar.bevi@gmail.com';

const ContactSection = ({ language }: ContactSectionProps) => {
  const copy = siteContent[language].contact;

  useEffect(() => {
    emailjs.init('l8s4zO3aYgl-d3dOb');
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const form = formRef.current;
    if (form) {
      const name = (form['name'] as unknown as HTMLInputElement).value.trim();
      const email = (form['email'] as unknown as HTMLInputElement).value.trim();
      const message = (form['message'] as unknown as HTMLTextAreaElement).value.trim();

      if (!name || !email || !message) {
        alert(copy.form.requiredAlert);
        return;
      }
    }

    if (formRef.current) {
      emailjs
        .sendForm('service_9w4s4j6', 'template_2f545m9', formRef.current)
        .then(
          (result) => {
            console.log('Email enviado com sucesso:', result.text);
            alert(copy.form.successAlert);
            formRef.current?.reset();
          },
          (error) => {
            console.error('Erro ao enviar o email:', error.text);
            alert(copy.form.errorAlert);
          }
        );
    }
  };

  return (
    <section
      id="contact"
      className="section-spacing px-6 md:px-12 lg:px-24 relative border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="section-kicker">
              <span>{copy.kicker}</span>
              <span aria-hidden="true" className="hidden sm:inline-flex items-center gap-1">
                {[3, 4, 4, 2, 3, 4, 4, 3, 4, 4].map((lvl, i) => (
                  <i
                    key={i}
                    className="inline-block h-2 w-2 rounded-[2px]"
                    style={{
                      backgroundColor:
                        lvl === 4
                          ? '#34d399'
                          : lvl === 3
                          ? '#38bdf8'
                          : lvl === 2
                          ? '#0284c7'
                          : '#0c4a6e',
                    }}
                  />
                ))}
              </span>
            </div>
            <h2 className="section-heading">{copy.title}</h2>
            <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
              {copy.intro}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-background/85 px-4 py-3 font-mono text-xs shrink-0 space-y-1">
            <div className="flex items-center justify-between gap-6 text-foreground/50">
              <span className="inline-flex items-center gap-1.5 text-sky-400 font-medium">
                <Terminal className="h-3.5 w-3.5" />
                {copy.telemetryHash}
              </span>
              <span>{copy.telemetryStep}</span>
            </div>
            <div className="text-foreground/85">
              <span className="text-emerald-400">feat(contact):</span>{' '}
              {copy.telemetryCommit.replace('feat(contact): ', '')}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Channels Spotlight Grid */}
          <div className="lg:col-span-5 space-y-6">
            <p className="font-mono text-xs uppercase tracking-wider text-foreground/55">
              {copy.directChannelsLabel}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              <a
                href="https://www.linkedin.com/in/edmar-bevilaqua/"
                target="_blank"
                rel="noopener noreferrer"
                onPointerMove={handlePointerMove}
                className="spotlight-card spotlight-lift rounded-xl p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/25 bg-sky-400/10 text-sky-400">
                    <SiLinkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <b className="font-display text-base font-bold text-foreground block">
                      LinkedIn
                    </b>
                    <span className="font-mono text-xs text-foreground/60">
                      /in/edmar-bevilaqua
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-sky-400 shrink-0" />
              </a>

              <a
                href="https://github.com/edmar-bevilaqua"
                target="_blank"
                rel="noopener noreferrer"
                onPointerMove={handlePointerMove}
                className="spotlight-card spotlight-lift rounded-xl p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/25 bg-sky-400/10 text-sky-400">
                    <SiGithub className="h-5 w-5" />
                  </div>
                  <div>
                    <b className="font-display text-base font-bold text-foreground block">
                      GitHub
                    </b>
                    <span className="font-mono text-xs text-foreground/60">
                      @edmar-bevilaqua
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-sky-400 shrink-0" />
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onPointerMove={handlePointerMove}
                className="spotlight-card spotlight-lift sm:col-span-2 lg:col-span-1 rounded-xl p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/25 bg-sky-400/10 text-sky-400">
                    <SiGmail className="h-5 w-5" />
                  </div>
                  <div>
                    <b className="font-display text-base font-bold text-foreground block">
                      {copy.emailLabel}
                    </b>
                    <span className="font-mono text-xs text-foreground/60">
                      {CONTACT_EMAIL}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-sky-400 shrink-0" />
              </a>
            </div>

            <div className="rounded-xl border border-white/10 bg-background/60 p-4 flex items-start gap-3">
              <Building2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/70 leading-relaxed">
                {copy.availability}
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div
            onPointerMove={handlePointerMove}
            className="lg:col-span-7 spotlight-card rounded-2xl p-6 md:p-8"
          >
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-mono text-xs uppercase tracking-wider text-foreground/70 mb-1.5"
                  >
                    {copy.form.name}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={copy.form.namePlaceholder}
                    className="bg-background/70 border-white/10 focus-visible:ring-sky-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-mono text-xs uppercase tracking-wider text-foreground/70 mb-1.5"
                  >
                    {copy.form.email}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={copy.form.emailPlaceholder}
                    className="bg-background/70 border-white/10 focus-visible:ring-sky-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block font-mono text-xs uppercase tracking-wider text-foreground/70 mb-1.5"
                >
                  {copy.form.company}
                </label>
                <Input
                  id="company"
                  name="company"
                  placeholder={copy.form.companyPlaceholder}
                  className="bg-background/70 border-white/10 focus-visible:ring-sky-400"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-xs uppercase tracking-wider text-foreground/70 mb-1.5"
                >
                  {copy.form.message}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={copy.form.messagePlaceholder}
                  className="bg-background/70 border-white/10 min-h-[140px] focus-visible:ring-sky-400"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 rounded-lg bg-sky-400 font-semibold text-slate-950 hover:bg-sky-300 transition-all"
              >
                <Send className="mr-2 h-4 w-4" />
                {copy.form.submit}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
