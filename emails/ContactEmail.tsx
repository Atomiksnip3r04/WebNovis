import React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Text,
  Section,
  Hr,
  Preview,
} from '@react-email/components';

interface ContactEmailProps {
  nome: string;
  email: string;
  servizio: string;
  messaggio: string;
  azienda?: string;
  telefono?: string;
}

const ContactEmail: React.FC<ContactEmailProps> = ({ 
  nome, 
  email, 
  servizio, 
  messaggio, 
  azienda, 
  telefono 
}) => {
  return (
    <Html>
      <Head />
      <Preview>Nuova richiesta di contatto da {nome}</Preview>
      <Body style={{ backgroundColor: '#f6f6f6', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ 
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <Heading style={{ color: '#333', fontSize: '24px' }}>Nuova Richiesta di Contatto</Heading>
          
          <Section>
            <Text style={{ fontSize: '16px' }}>Hai ricevuto una nuova richiesta dal form di contatto del tuo sito.</Text>
            <Hr style={{ borderColor: '#cccccc' }} />
            
            <Heading as="h2" style={{ fontSize: '20px', color: '#555' }}>Dettagli del Richiedente:</Heading>
            <Text><strong>Nome:</strong> {nome}</Text>
            <Text><strong>Email:</strong> {email}</Text>
            {telefono && <Text><strong>Telefono:</strong> {telefono}</Text>}
            {azienda && <Text><strong>Azienda:</strong> {azienda}</Text>}
            
            <Hr style={{ borderColor: '#cccccc' }} />
            
            <Heading as="h2" style={{ fontSize: '20px', color: '#555' }}>Dettagli della Richiesta:</Heading>
            <Text><strong>Servizio Richiesto:</strong> {servizio}</Text>
            <Text><strong>Messaggio:</strong></Text>
            <Text style={{
              padding: '10px',
              border: '1px solid #dddddd',
              borderRadius: '4px',
              whiteSpace: 'pre-wrap'
            }}>{messaggio}</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmail;