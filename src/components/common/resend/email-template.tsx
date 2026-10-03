
interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '24px',
        color: '#0B2A4A',
        lineHeight: 1.6,
      }}
    >
      <h2>New Contact Message - TOMEX</h2>

      <hr />

      <p>
        <strong>Name:</strong> {name}
      </p>

      <p>
        <strong>Email:</strong> {email}
      </p>

      <h3>Message:</h3>

      <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>

      <hr />

      <p style={{ fontSize: '12px', color: '#777' }}>
        This message was sent through the TOMEX website.
      </p>
    </div>
  );
}
