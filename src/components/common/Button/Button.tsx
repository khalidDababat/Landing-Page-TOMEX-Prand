import type { ReactNode } from 'react';

import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'outline' | 'accent';

interface BaseButtonProps {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

interface ButtonAsLinkProps extends BaseButtonProps {
  href: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  type?: never;
  disabled?: never;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  href?: never;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

/** Brand button rendered as an anchor when `href` is provided, otherwise as a button. */
const Button = ({
  variant = 'primary',
  fullWidth = false,
  children,
  className,
  ...rest
}: ButtonProps) => {
  const classes = [styles.button, styles[variant], fullWidth ? styles.fullWidth : '', className]
    .filter(Boolean)
    .join(' ');

  if ('href' in rest && rest.href) {
    const { href, onClick } = rest;

    return (
      <a className={classes} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }

  const { type = 'button', disabled = false, onClick } = rest as ButtonAsButtonProps;

  return (
    <button className={classes} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
