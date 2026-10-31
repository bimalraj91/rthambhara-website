"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import styles from "./ContactForm.module.scss";

const disciplines = [
  "Bharatanatyam",
  "Contemporary Kalaripayattu",
  "Training Programs",
  "Yoga Sadhana",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

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
        <button type="submit" className={styles.submit}>
          Contact us
          <Image
            src="/assets/icons/arrow-right-circle.svg"
            alt=""
            width={14}
            height={14}
            aria-hidden="true"
          />
        </button>
        <span className={styles.required}>* Required fields</span>
      </div>

      <p className={styles.status} role="status" aria-live="polite">
        {submitted
          ? "Thank you for reaching out. This demo form does not send messages yet — please call or email us directly."
          : ""}
      </p>
    </form>
  );
}
