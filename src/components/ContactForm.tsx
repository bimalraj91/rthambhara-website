"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./ContactForm.module.scss";

const disciplines = [
  "Bharatanatyam",
  "Contemporary Kalaripayattu",
  "Training Programs",
  "Yoga Sadhana",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Your name *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-phone">Phone *</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 00000 00000"
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-discipline">Interested discipline *</label>
          <select
            id="contact-discipline"
            name="discipline"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select an art form
            </option>
            {disciplines.map((discipline) => (
              <option key={discipline} value={discipline}>
                {discipline}
              </option>
            ))}
          </select>
          <Image
            src="/assets/icons/chevron-down.svg"
            alt=""
            width={15}
            height={15}
            className={styles.chevron}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className={styles.message}>
        <label htmlFor="contact-message">
          Anything you&apos;d like us to know?
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Tell us a little about your interest"
        />
      </div>

      <div className={styles.consent}>
        <input id="contact-consent" name="consent" type="checkbox" />
        <label htmlFor="contact-consent">
          I agree to be contacted about classes, admissions and events.
        </label>
      </div>

      <div className={styles.submitRow}>
        <motion.button
          type="submit"
          className={styles.submit}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
        >
          Contact us
          <Image
            src="/assets/icons/arrow-right-circle.svg"
            alt=""
            width={14}
            height={14}
            aria-hidden="true"
          />
        </motion.button>
        <span className={styles.required}>* Required fields</span>
      </div>

      <div className={styles.status} role="status" aria-live="polite">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.p
              key="sent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              Thank you for reaching out. This demo form does not send messages
              yet — please call or email us directly.
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}
