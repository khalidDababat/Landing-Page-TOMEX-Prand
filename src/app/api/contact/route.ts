import { Resend } from 'resend';

import { EmailTemplate } from '@/components/common/resend/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== 'object') {
      return Response.json({ success: false, message: 'Invalid request.' }, { status: 400 });
    }

    const { name, email, message } = body as Record<string, unknown>;

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      name.length > 100 ||
      email.length > 254 ||
      message.length > 5000
    ) {
      return Response.json({ success: false, message: 'Invalid form data.' }, { status: 400 });
    }

    if (!process.env.CONTACT_EMAIL || !process.env.EMAIL_FROM) {
      return Response.json(
        { success: false, message: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [process.env.CONTACT_EMAIL],
      replyTo: email.trim(),
      subject: 'New TOMEXTech Contact Message',
      react: EmailTemplate({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      }),
    });

    if (error) {
      console.error('Resend error:', error);

      return Response.json({ success: false, message: 'Failed to send message.' }, { status: 500 });
    }

    return Response.json({
      success: true,
      message: 'Your message has been sent successfully.',
    });
  } catch (error) {
    console.error('Contact API error:', error);

    return Response.json({ success: false, message: 'Something went wrong.' }, { status: 500 });
  }
}
