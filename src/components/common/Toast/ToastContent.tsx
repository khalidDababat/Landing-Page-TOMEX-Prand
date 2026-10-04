import styles from './ToastContent.module.scss';

interface ToastContentProps {
  title: string;
  message: string;
}

/** Title + message body rendered inside a react-toastify toast. */
const ToastContent = ({ title, message }: ToastContentProps) => (
  <div>
    <strong className={styles.title}>{title}</strong>
    <p className={styles.message}>{message}</p>
  </div>
);

export default ToastContent;
