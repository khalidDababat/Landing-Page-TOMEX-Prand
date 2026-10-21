import type { ComponentPropsWithoutRef } from 'react';

import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'accent';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

/** Brand button. For navigation use `next/link` instead. */
const Button = ({
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  className,
  ...rest
}: ButtonProps) => {
  const classes = [styles.button, styles[variant], fullWidth ? styles.fullWidth : '', className]
    .filter(Boolean)
    .join(' ');

  return <button className={classes} type={type} {...rest} />;
};

export default Button;
