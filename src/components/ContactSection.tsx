
import React, { useEffect, useMemo, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SiGithub, SiLinkedin, SiGmail } from 'react-icons/si';
import { Language, siteContent } from '@/content/siteContent';
import SectionHeading from './SectionHeading';
import { useInView, revealClass } from '@/hooks/useInView';

interface ContactSectionProps {
  language: Language;
}

const CONTACT_EMAIL = 'edmar.bevi@gmail.com';
const EMAILJS_SERVICE_ID = 'service_9w4s4j6';
const EMAILJS_TEMPLATE_ID = 'template_2f545m9';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const ContactSection = ({ language }: ContactSectionProps) => {
  const copy = siteContent[language].contact;
  const [status, setStatus] = useState<FormStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const { ref, isVisible } = useInView<HTMLDivElement>();

  useEffect(() => {
    emailjs.init('l8s4zO3aYgl-d3dOb');
  }, []);

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(1, copy.form.nameRequired),
        email: z.string().trim().email(copy.form.emailInvalid),
        company: z.string().trim().optional(),
        message: z.string().trim().min(1, copy.form.messageRequired),
      }),
    [copy.form]
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', company: '', message: '' },
  });

  const onSubmit = async () => {
    if (!formRef.current) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current);
      setStatus('success');
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-spacing px-6 md:px-12 lg:px-24">
      <div ref={ref} className={`mx-auto max-w-6xl ${revealClass(isVisible)}`}>
        <SectionHeading title={copy.title} className="mb-14 md:mb-16" />

        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="mb-8 max-w-[45ch] text-lg text-foreground/80">{copy.intro}</p>

            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-3">
                <SiGmail className="h-4 w-4 text-foreground/50" aria-hidden="true" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <p className="pl-7 text-sm text-foreground/70">{copy.availability}</p>
            </div>

            <div className="flex gap-3">
              <a
                href="https://github.com/edmar-bevilaqua"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground/70 transition-colors hover:border-foreground hover:bg-accent/10 hover:text-foreground"
                aria-label="GitHub"
              >
                <SiGithub className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/edmar-bevilaqua/"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground/70 transition-colors hover:border-foreground hover:bg-accent/10 hover:text-foreground"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-7">
            <Form {...form}>
              <form
                ref={formRef}
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{copy.form.name}</FormLabel>
                        <FormControl>
                          <Input placeholder={copy.form.namePlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{copy.form.email}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={copy.form.emailPlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{copy.form.company}</FormLabel>
                      <FormControl>
                        <Input placeholder={copy.form.companyPlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{copy.form.message}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={copy.form.messagePlaceholder}
                          className="min-h-[140px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-accent text-accent-foreground transition-transform hover:bg-accent/90 active:scale-[0.98] disabled:opacity-60"
                >
                  {status === 'sending' ? copy.form.sending : copy.form.submit}
                </Button>

                <div role="status" aria-live="polite">
                  {status === 'success' && (
                    <p className="rounded-md border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground">
                      {copy.form.successMessage}
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="rounded-md border border-destructive/30 px-4 py-3 text-sm text-destructive">
                      {copy.form.errorMessage}
                    </p>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
