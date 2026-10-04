'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';

import Button from '@/components/common/Button/Button';
import ButtonLink from '@/components/common/Button/ButtonLink';
import type { ApplicationFormErrors, ApplicationFormValues, Job } from '@/types';
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '@/utils/countryCodes';
import { ROUTES } from '@/utils/navigation';
import { FILE_ACCEPT, MAX_FILE_SIZE_MB, validateApplication } from '@/utils/validation';

import styles from './ApplicationForm.module.scss';

/** Flip once the destination for applications and file uploads is defined. */
const SUBMISSIONS_OPEN = false;

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

const INITIAL_VALUES: ApplicationFormValues = {
  fullName: '',
  email: '',
  countryCode: DEFAULT_COUNTRY_CODE,
  phone: '',
  level: '',
  about: '',
  coverLetter: '',
  cv: null,
};

type TextFieldName = Exclude<keyof ApplicationFormValues, 'cv'>;

const isTextField = (name: string): name is TextFieldName =>
  name in INITIAL_VALUES && name !== 'cv';

interface FieldProps {
  name: keyof ApplicationFormValues;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

/** Label, control, hint and error message of one form field. */
const Field = ({ name, label, required, error, hint, children }: FieldProps) => (
  <div className={styles.field}>
    <label className={styles.label} htmlFor={`application-${name}`}>
      {label}
      {required && <span aria-hidden="true"> *</span>}
    </label>
    {children}
    {hint && (
      <span className={styles.hint} id={`application-${name}-hint`}>
        {hint}
      </span>
    )}
    {error && (
      <span className={styles.error} id={`application-${name}-error`}>
        {error}
      </span>
    )}
  </div>
);

interface ApplicationFormProps {
  job: Job;
}

/**
 * Application form for every opportunity type: Education asks for WhatsApp,
 * level and a short introduction; Role and Internship ask for email and a
 * required CV. Submission is not connected yet, so Submit stays disabled.
 */
const ApplicationForm = ({ job }: ApplicationFormProps) => {
  const isEducation = job.type === 'Education';
  const [values, setValues] = useState<ApplicationFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ApplicationFormErrors>({});

  const clearError = (name: keyof ApplicationFormValues) =>
    setErrors((previous) => ({ ...previous, [name]: undefined }));

  /** Updates the field named by the control's `name` and clears that field's error. */
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (!isTextField(name)) {
      return;
    }

    setValues((previous) => ({ ...previous, [name]: value }));
    clearError(name);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((previous) => ({ ...previous, cv: event.target.files?.[0] ?? null }));
    clearError('cv');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateApplication(job.type, values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Send the application here once its destination and the file upload are defined.
  };

  /** Attributes that wire a control to its label, hint and error message. */
  const controlProps = (name: keyof ApplicationFormValues, hasHint = false) => {
    const describedBy = [
      hasHint ? `application-${name}-hint` : '',
      errors[name] ? `application-${name}-error` : '',
    ]
      .filter(Boolean)
      .join(' ');

    return {
      id: `application-${name}`,
      name,
      className: styles.input,
      'aria-invalid': Boolean(errors[name]),
      'aria-describedby': describedBy || undefined,
    };
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>Apply for this opportunity</h2>

      <Field name="fullName" label="Full Name" required error={errors.fullName}>
        <input
          {...controlProps('fullName')}
          type="text"
          autoComplete="name"
          placeholder={isEducation ? 'First and last name' : 'John Doe'}
          value={values.fullName}
          onChange={handleChange}
          required
        />
      </Field>

      {!isEducation && (
        <Field name="email" label="Email Address" required error={errors.email}>
          <input
            {...controlProps('email')}
            type="email"
            autoComplete="email"
            placeholder="john@company.com"
            value={values.email}
            onChange={handleChange}
            required
          />
        </Field>
      )}

      <Field
        name="phone"
        label={isEducation ? 'WhatsApp Phone Number' : 'Phone Number'}
        required
        error={errors.phone}
      >
        <div className={styles.phoneRow}>
          {isEducation && (
            <select
              className={`${styles.input} ${styles.countryCode}`}
              name="countryCode"
              aria-label="Country code"
              value={values.countryCode}
              onChange={handleChange}
            >
              {COUNTRY_CODES.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          )}
          <input
            {...controlProps('phone')}
            type="tel"
            autoComplete="tel-national"
            placeholder="59 123 4567"
            value={values.phone}
            onChange={handleChange}
            required
          />
        </div>
      </Field>

      {isEducation && (
        <Field name="level" label="Current Level" required error={errors.level}>
          <select {...controlProps('level')} value={values.level} onChange={handleChange} required>
            <option value="">Select your level</option>
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </Field>
      )}

      {isEducation ? (
        <Field name="about" label="Tell Us About Yourself" required error={errors.about}>
          <textarea
            {...controlProps('about')}
            className={`${styles.input} ${styles.textarea}`}
            rows={4}
            value={values.about}
            onChange={handleChange}
            required
          />
        </Field>
      ) : (
        <Field name="coverLetter" label="Cover Letter" error={errors.coverLetter}>
          <textarea
            {...controlProps('coverLetter')}
            className={`${styles.input} ${styles.textarea}`}
            rows={5}
            value={values.coverLetter}
            onChange={handleChange}
          />
        </Field>
      )}

      <Field
        name="cv"
        label={isEducation ? 'CV / Supporting Attachments' : 'CV / Resume'}
        required={!isEducation}
        hint={`PDF, DOC or DOCX, up to ${MAX_FILE_SIZE_MB} MB.`}
        error={errors.cv}
      >
        <input
          {...controlProps('cv', true)}
          type="file"
          accept={FILE_ACCEPT}
          onChange={handleFileChange}
          required={!isEducation}
        />
      </Field>

      {!SUBMISSIONS_OPEN && (
        <p className={styles.notice} role="status">
          Online applications are not open yet. This form will be enabled soon.
        </p>
      )}

      <div className={styles.actions}>
        <Button type="submit" disabled={!SUBMISSIONS_OPEN}>
          {isEducation ? 'Submit' : 'Submit Your Application'}
        </Button>
        <ButtonLink variant="accent" href={ROUTES.careers}>
          Back
        </ButtonLink>
      </div>
    </form>
  );
};

export default ApplicationForm;
