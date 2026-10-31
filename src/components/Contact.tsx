import Image from "next/image";
import ContactForm from "./ContactForm";
import styles from "./Contact.module.scss";

export default function Contact() {
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <div className={styles.decor} aria-hidden="true">
          <div className={styles.swordCrop}>
            <Image
              src="/assets/images/kalari-warrior-contact.webp"
              alt=""
              width={1200}
              height={2150}
              sizes="580px"
              className={styles.swordImage}
            />
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.details}>
            <div className={styles.direct}>
              <a href="tel:+919961260009">+91 99612 60009</a>
              <a href="mailto:mail@rtambhara.com">mail@rtambhara.com</a>
            </div>

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

            <p className={styles.quote}>
              For trial classes, admissions or a little guidance, leave us a
              note. We&apos;d love to hear from you.
            </p>
          </div>

          <div className={styles.panel}>
            <p className={styles.eyebrow}>09 / Let&apos;s begin a conversation</p>
            <h2 id="contact-title">
              Your art is
              <br />
              waiting for you.
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
