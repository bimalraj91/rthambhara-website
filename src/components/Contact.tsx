import Image from "next/image";
import ContactForm from "./ContactForm";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import FontPreload from "./FontPreload";
import styles from "./Contact.module.scss";

export default function Contact() {
  return (
    <section
      id="contact"
      className={styles.contact}
      aria-labelledby="contact-title"
    >
      <FontPreload fonts={["cinzel", "playfair"]} />
      <div className={styles.inner}>
        <Reveal className={styles.warrior} delay={0.05}>
          <Image
            src="/assets/home/contact-warrior.webp"
            alt="A Kalaripayattu practitioner holding a urumi sword"
            width={379}
            height={505}
            sizes="(max-width: 760px) 190px, (max-width: 900px) 540px, 379px"
            className={styles.warriorImage}
          />
        </Reveal>

        <Reveal className={styles.details} delay={0.12}>
          <a href="tel:+919961260009" className={styles.phone}>
            +91 99612 60009
          </a>
          <a href="mailto:mail@rtambhara.com" className={styles.email}>
            mail@rtambhara.com
          </a>

          <div className={styles.address}>
            <p className={styles.addressLabel}>Find us in Tripunithura</p>
            <p>
              TRRA 66, Mahalakshmi, Thevarakkavu Road,
              <br />
              Tripunithura, Kerala
            </p>
            <p>
              Regular Bharatanatyam classes for young students:
              <br />
              Ladies Club Hall, Tripunithura.
            </p>
          </div>

          <p className={styles.note}>
            For trial classes, admissions or a little guidance, leave us a note.
            We&apos;d love to hear from you.
          </p>
        </Reveal>

        <div className={styles.panel}>
          <p className={styles.eyebrow}>
            08 / Let&apos;s begin a conversation
          </p>

          <SplitText
            id="contact-title"
            as="h2"
            className={styles.title}
            delay={0.1}
            stagger={0.06}
            lines={[
              { words: ["Your", "art", "is"], className: styles.titleDark },
              { words: ["waiting", "for", "you."], className: styles.titleDark },
            ]}
          />

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
