'use client';

import Button from '@/components/common/Button/Button';
import { useContactForm } from '@/hooks/useContactForm';
import { iconRegistry } from '@/utils/iconRegistry';

import styles from './Contact.module.scss';

const EmailIcon = iconRegistry.email;
const PhoneIcon = iconRegistry.phone;
const LocationIcon = iconRegistry.location;

/** Contact section: project enquiry copy, contact details and the message form. */
const Contact = () => {
  const { values, errors, status, feedback, handleChange, handleSubmit } = useContactForm();
  const isSubmitting = status === 'submitting';

  return (
    <section className={styles.contact} id="contact" aria-labelledby="contact-title">
      <div className={styles.inner}>
        <div className={styles.panel}>
          <div className={styles.info}>
            <h2 className={styles.title} id="contact-title">
              Got a Project in Mind?
            </h2>

            <p className={styles.description}>
              Let's discuss how our technology and design expertise can accelerate your business
              objectives.
            </p>

            <ul className={styles.details}>
              <li className={styles.detail}>
                <EmailIcon className={styles.detailIcon} fontSize="inherit" aria-hidden="true" />
                <a className={styles.detailLink} href="mailto:khaliddababat@gmail.com">
                  khaliddababat@gmail.com
                </a>
              </li>
              <li className={styles.detail}>
                <PhoneIcon className={styles.detailIcon} fontSize="inherit" aria-hidden="true" />
                <a className={styles.detailLink} href="tel:+972597088178">
                  +972 59-708-8178
                </a>
              </li>
              <li className={styles.detail}>
                <LocationIcon className={styles.detailIcon} fontSize="inherit" aria-hidden="true" />
                <span>Global Remote</span>
              </li>
            </ul>
          </div>

          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-name">
                  Name
                </label>
                <input
                  className={styles.input}
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  value={values.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className={styles.error} id="contact-name-error">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-email">
                  Email
                </label>
                <input
                  className={styles.input}
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="john@company.com"
                  value={values.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className={styles.error} id="contact-email-error">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  className={styles.textarea}
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  value={values.message}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  onChange={handleChange}
                />
                {errors.message && (
                  <span className={styles.error} id="contact-message-error">
                    {errors.message}
                  </span>
                )}
              </div>

              <Button className={styles.submit} type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>

              <p
                className={`${styles.feedback} ${status === 'success' ? styles.feedbackSuccess : ''}`}
                role="status"
                aria-live="polite"
              >
                {feedback}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
