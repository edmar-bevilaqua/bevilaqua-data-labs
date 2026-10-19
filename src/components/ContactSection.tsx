import React, { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  AlertCircle,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Loader2,
  Send,
} from 'lucide-react';
import { SiGithub, SiLinkedin, SiGmail } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Language, siteContent } from '@/content/siteContent';
import { SectionNodeStation } from './SectionGraphSpine';

interface ContactSectionProps {
  language: Language;
  isNodeActive?: boolean;
  isNodeCurrent?: boolean;
}

const CONTACT_EMAIL = 'edmar.bevi@gmail.com';

const ContactSection = ({
  language,
  isNodeActive = true,
  isNodeCurrent = false,
}: ContactSectionProps) => {
  const copy = siteContent[language].contact;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  useEffect(() => {
    emailjs.init('l8s4zO3aYgl-d3dOb');
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const clearFeedbackOnInput = () => {
    if (feedback && feedback.type !== 'success') {
      setFeedback(null);
    }
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = formRef.current;
    if (form) {
      const name = (form['name'] as unknown as HTMLInputElement).value.trim();
      const email = (form['email'] as unknown as HTMLInputElement).value.trim();
      const message = (form['message'] as unknown as HTMLTextAreaElement).value.trim();

      if (!name || !email || !message) {
        setFeedback({
          type: 'warning',
          message: copy.form.requiredAlert,
        });
        return;
      }
    }

    if (formRef.current) {
      setIsSubmitting(true);
      setFeedback(null);

      emailjs
        .sendForm('service_9w4s4j6', 'template_2f545m9', formRef.current)
        .then(
          () => {
            setIsSubmitting(false);
            setFeedback({
              type: 'success',
              message: copy.form.successAlert,
            });
            formRef.current?.reset();
          },
          () => {
            setIsSubmitting(false);
            setFeedback({
              type: 'error',
              message: copy.form.errorAlert,
            });
          }
        );
    }
  };

  return (
    <section
      id="contact"
      className="section-spacing px-4 sm:px-6 md:px-12 lg:px-24 relative border-t border-white/5"
    >
      <SectionNodeStation
        sectionKey="contact"
        language={language}
        isActive={isNodeActive}
        isCurrent={isNodeCurrent}
      >
        <div className="space-y-8 md:space-y-12">
          {/* Header */}
          <div className="max-w-3xl">
            <h2 className="section-heading">{copy.title}</h2>
            <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
              {copy.intro}
            </p>
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
              <form
                ref={formRef}
                onSubmit={sendEmail}
                onChange={clearFeedbackOnInput}
                noValidate
                className="space-y-4"
              >
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

                {feedback && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm transition-all ${
                      feedback.type === 'success'
                        ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
                        : feedback.type === 'warning'
                        ? 'border-amber-400/40 bg-amber-400/10 text-amber-300'
                        : 'border-rose-400/40 bg-rose-400/10 text-rose-300'
                    }`}
                  >
                    {feedback.type === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    )}
                    <span>{feedback.message}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-lg bg-sky-400 font-semibold text-slate-950 hover:bg-sky-300 transition-all disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {language === 'pt' ? 'Enviando mensagem...' : 'Sending message...'}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {copy.form.submit}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </SectionNodeStation>
    </section>
  );
};

export default ContactSection;
