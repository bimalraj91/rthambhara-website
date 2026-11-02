import Image from "next/image";
import ContactForm from "./ContactForm";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import SplitText from "./motion/SplitText";
import styles from "./Contact.module.scss";

export default function Contact() {
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <Reveal as="div" className={styles.decor} delay={0.05} y={60} scale={0.98}>
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
        </Reveal>

        <div className={styles.layout}>
          <Reveal as="div" className={styles.details} delay={0.1} y={36}>
            <StaggerGroup className={styles.direct} stagger={0.08}>
              <StaggerItem as="a" href="tel:+919961260009">
                +91 99612 60009
              </StaggerItem>
              <StaggerItem as="a" href="mailto:mail@rtambhara.com">
                mail@rtambhara.com
              </StaggerItem>
            </StaggerGroup>

            <Reveal as="div" className={styles.address} delay={0.18} y={24}>
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
            </Reveal>

            <Reveal as="p" className={styles.quote} delay={0.24} y={22}>
              For trial classes, admissions or a little guidance, leave us a
              note. We&apos;d love to hear from you.
            </Reveal>
          </Reveal>

          <div className={styles.panel}>
            <Reveal as="p" className={styles.eyebrow} delay={0.08} y={18}>
              09 / Let&apos;s begin a conversation
            </Reveal>
            <SplitText
              id="contact-title"
              as="h2"
              lines={["Your art is", "waiting for you."]}
              delay={0.12}
            />
            <Reveal delay={0.24} y={32}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
