import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactEmail from '@/emails/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, email, servizio, messaggio, azienda, telefono } = body;

    if (!nome || !email || !servizio || !messaggio) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'WebNovis <onboarding@resend.dev>', // Dominio da configurare su Resend
      to: ['massimilianociconte9@gmail.com'],
      subject: `Nuova richiesta da ${nome} per ${servizio}`,
      react: ContactEmail({ nome, email, servizio, messaggio, azienda, telefono }),
    });

    if (error) {
      console.error('Errore invio email:', error);
      return NextResponse.json({ error: 'Errore durante l\'invio dell\'email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email inviata con successo!' });

  } catch (error) {
    console.error('Errore nel server:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}