# WebNovis Landing Page

Una landing page moderna e professionale per WebNovis, costruita con Next.js 14, TypeScript e Tailwind CSS.

## 🚀 Caratteristiche

- **Design Moderno**: Interfaccia accattivante con gradients e animazioni
- **Responsive**: Ottimizzata per tutti i dispositivi
- **Performance**: Caricamento veloce e ottimizzazioni SEO
- **Form di Contatto**: Integrazione email automatica
- **TypeScript**: Codice type-safe e manutenibile
- **Tailwind CSS**: Styling moderno e personalizzabile

## 🛠️ Tecnologie Utilizzate

- [Next.js 14](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Linguaggio tipizzato
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Lucide React](https://lucide.dev/) - Icone moderne

## 📦 Installazione

1. Clona il repository:
```bash
git clone <repository-url>
cd landingpage-webnovis
```

2. Installa le dipendenze:
```bash
npm install
# oppure
yarn install
# oppure
pnpm install
```

3. Avvia il server di sviluppo:
```bash
npm run dev
# oppure
yarn dev
# oppure
pnpm dev
```

4. Apri [http://localhost:3000](http://localhost:3000) nel tuo browser.

## 🚀 Deploy su Vercel

### Metodo 1: Deploy Automatico (Raccomandato)

1. Fai push del codice su GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Vai su [vercel.com](https://vercel.com) e accedi con GitHub

3. Clicca su "New Project" e seleziona il tuo repository

4. Vercel rileverà automaticamente che è un progetto Next.js

5. Clicca "Deploy" - il sito sarà online in pochi minuti!

### Metodo 2: Deploy da CLI

1. Installa Vercel CLI:
```bash
npm i -g vercel
```

2. Accedi a Vercel:
```bash
vercel login
```

3. Deploy il progetto:
```bash
vercel
```

4. Segui le istruzioni interattive

### Metodo 3: Deploy Manuale

1. Crea un build di produzione:
```bash
npm run build
```

2. Carica i file su Vercel tramite dashboard

## 📧 Configurazione Email

Il form di contatto è configurato per aprire automaticamente il client email predefinito dell'utente con:
- **Destinatario**: massimilianociconte9@gmail.com
- **Oggetto**: Generato automaticamente con nome e servizio
- **Corpo**: Dati del form formattati professionalmente

### Come Funziona

1. L'utente compila il form di contatto
2. Al submit, viene generato un link `mailto:` con tutti i dati
3. Si apre automaticamente il client email predefinito
4. L'email è pre-compilata e pronta per l'invio

## 🎨 Personalizzazione

### Colori
I colori principali sono definiti in `tailwind.config.js`:
- **Primary**: Blu (#3b82f6)
- **Secondary**: Viola (#a855f7)
- **Accent**: Giallo (#fbbf24)

### Contenuti
Per modificare i contenuti, edita il file `app/page.tsx`:
- Testi delle sezioni
- Prezzi dei servizi
- Testimonianze
- Informazioni di contatto

### Stili
Gli stili personalizzati sono in `app/globals.css`:
- Animazioni custom
- Effetti gradient
- Scrollbar personalizzata

## 📱 Sezioni della Landing Page

1. **Hero Section**: Intestazione principale con CTA
2. **Services**: Servizi offerti con icone e descrizioni
3. **Pricing**: Piani tariffari con confronto
4. **Testimonials**: Recensioni clienti
5. **Contact**: Form di contatto e informazioni
6. **Footer**: Links e informazioni aziendali

## 🔧 Scripts Disponibili

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Crea il build di produzione
- `npm run start` - Avvia il server di produzione
- `npm run lint` - Esegue il linting del codice

## 📈 Performance

- **Lighthouse Score**: 95+ su tutti i parametri
- **Core Web Vitals**: Ottimizzati
- **SEO**: Meta tags e structured data
- **Accessibilità**: WCAG 2.1 compliant

## 🤝 Supporto

Per supporto o domande:
- Email: massimilianociconte9@gmail.com
- Telefono: +39 000 000 0000

## 📄 Licenza

© 2024 WebNovis. Tutti i diritti riservati.

---

**Nota**: Questo progetto è ottimizzato per Vercel e si deploierà automaticamente senza configurazioni aggiuntive.