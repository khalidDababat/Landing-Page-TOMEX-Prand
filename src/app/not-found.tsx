import Link from 'next/link';
import './globals.scss';
const NotFound = () => {
  return (
    <div className="notFound">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <div>
        <Link href="/">Go Back Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
