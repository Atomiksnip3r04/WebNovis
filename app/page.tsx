'use client'

import { useState } from 'react'
import { Star, Rocket, Globe, Smartphone, Shield, Headphones, Zap, CheckCircle, Mail, Phone, MapPin } from 'lucide-react'

interface FormData {
  nome: string
  email: string
  telefono: string
  azienda: string
  servizio: string
  messaggio: string
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefono: '',
    azienda: '',
    servizio: '',
    messaggio: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!formData.nome || !formData.email || !formData.servizio || !formData.messaggio) {
      setSubmitStatus({ success: false, message: 'Per favore compila tutti i campi obbligatori.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Grazie per la tua richiesta! Ti risponderemo al più presto.' });
        setFormData({ nome: '', email: '', telefono: '', azienda: '', servizio: '', messaggio: '' });
      } else {
        setSubmitStatus({ success: false, message: result.error || 'Si è verificato un errore. Riprova più tardi.' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Si è verificato un errore di rete. Controlla la tua connessione e riprova.' });
    }

    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen text-center text-white">
          <div className="mb-6 inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            <Rocket className="w-4 h-4 mr-2" />
            Siti Web di Nuova Generazione
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Il Tuo <span className="text-yellow-400">Futuro Digitale</span><br />
            Inizia Qui
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl leading-relaxed opacity-90">
            Trasformiamo le tue idee in <strong>esperienze digitali straordinarie</strong>. Siti web moderni, veloci e ottimizzati che convertono visitatori in clienti.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button 
              onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Inizia il Tuo Progetto
            </button>
            <button 
              onClick={() => document.getElementById('prezzi')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              Scopri i Prezzi
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">Focus</div>
              <div className="text-lg opacity-80">sul Risultato</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">Meno di 24h</div>
              <div className="text-lg opacity-80">Tempo di Risposta</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-lg opacity-80">Soddisfazione Clienti</div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Servizi che <span className="gradient-text">Trasformano</span> il Tuo Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ogni progetto è unico come la tua visione. Creiamo soluzioni digitali su misura che rispecchiano la tua identità e raggiungono i tuoi obiettivi.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Landing Page Performanti</h3>
              <p className="text-gray-600 mb-6">Pagine ottimizzate per la conversione con design moderne e caricamento ultra-veloce</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Design moderno e responsivo</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Ottimizzazione SEO base</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Caricamento ultra-veloce</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Siti Web Professionali</h3>
              <p className="text-gray-600 mb-6">Soluzioni complete per la tua presenza online con CMS integrato e SEO avanzato</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Fino a 3 pagine + Home</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />CMS per gestione contenuti</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />SEO avanzato</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Smartphone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Design Responsive</h3>
              <p className="text-gray-600 mb-6">Esperienza perfetta su tutti i dispositivi, dal mobile al desktop</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Analisi dettagliata del progetto</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Soluzioni completamente personalizzate</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Architetture online e web</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Performance Ottimizzate</h3>
              <p className="text-gray-600 mb-6">Siti super veloci con tecnologie all'avanguardia per il massimo delle prestazioni</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Ottimizzazione delle prestazioni</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Elementi multimediali avanzati</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Elementi interattivi</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Sicurezza Garantita</h3>
              <p className="text-gray-600 mb-6">Protezione avanzata e backup automatici per la massima tranquillità</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Protezione avanzata e backup automatici</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Sicurezza garantita</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Monitoraggio continuo</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <Headphones className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Supporto Dedicato</h3>
              <p className="text-gray-600 mb-6">Assistenza personalizzata e manutenzione continua per il tuo successo</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Assistenza personalizzata e manutenzione continua</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Supporto dedicato</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Scalabilità garantita</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="prezzi" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-6">
              Prezzi Trasparenti
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Scegli il Piano <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Perfetto</span> per Te
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Ogni progetto è unico. I nostri prezzi sono competitivi e trasparenti, con la possibilità di personalizzare ogni soluzione in base alle tue esigenze specifiche.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              ⚡ I prezzi possono variare in base alle specifiche del progetto
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Landing Page */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Landing Page</h3>
              <p className="text-gray-600 mb-6">Perfetta per startup e freelance</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">€350</span>
                <span className="text-gray-500 ml-2">una tantum</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-900">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Design moderno e responsivo</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Ottimizzazione SEO base</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Modulo contatti integrato</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Caricamento ultra-veloce</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Hosting e dominio per 1 anno</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />1 revisione inclusa</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Consegna in 5-7 giorni</li>
              </ul>
              <button 
                onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-300"
              >
                Inizia Ora
              </button>
            </div>
            
            {/* Sito Multi-Pagina */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-3xl p-8 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-yellow-400 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">
                Più Popolare
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Sito Multi-Pagina</h3>
              <p className="text-purple-100 mb-6">La soluzione completa per il tuo business</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">€850</span>
                <span className="text-purple-200 ml-2">una tantum</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-white">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-3" />Tutto del piano Landing Page</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-3" />Fino a 3 pagine + Home</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-3" />CMS per gestione contenuti</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-3" />SEO avanzato</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-3" />Blog integrato</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-3" />Analytics e tracking</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-3" />2 revisioni incluse</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-3" />Supporto 30 giorni</li>
              </ul>
              <button 
                onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                Inizia Ora
              </button>
            </div>
            
            {/* Sito Professionale */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Sito Professionale</h3>
              <p className="text-gray-600 mb-6">La soluzione completa per il tuo business</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-purple-600">€1300</span>
                <span className="text-gray-500 ml-2">una tantum</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-900">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Tutto del piano Multi-Pagina</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />5+ pagine personalizzate</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Elementi multimediali avanzati</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Elementi interattivi</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Mappe e geolocalizzazione</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Form avanzati e integrazioni</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Assistenza prioritaria</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Revisioni illimitate</li>
              </ul>
              <button 
                onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors duration-300"
              >
                Inizia Ora
              </button>
            </div>
            
            {/* Soluzioni Custom */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-green-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Soluzioni Custom</h3>
              <p className="text-gray-600 mb-6">Applicazioni e CRM aziendali</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-green-600">Su Misura</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-900">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Tutti i servizi dei piani precedenti</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Analisi dettagliata del progetto</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Soluzioni completamente personalizzate</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Architetture online e web</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Sistemi CRM e gestionali</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Integrazioni API avanzate</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Supporto dedicato continuo</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-3" />Scalabilità garantita</li>
              </ul>
              <button 
                onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors duration-300"
              >
                Richiedi Preventivo
              </button>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Non trovi quello che cerchi?</p>
            <button 
              onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Richiedi Consulenza Gratuita
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Cosa Dicono i Nostri <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Clienti</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La soddisfazione dei nostri clienti è la nostra priorità. Ecco cosa pensano di noi i professionisti che hanno scelto WebNovis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 italic">
                "WebNovis ha trasformato completamente la nostra presenza online. Il nuovo sito ha aumentato le conversioni del 300% in soli 3 mesi!"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  MR
                </div>
                <div>
                  <div className="font-semibold">Marco Rossi</div>
                  <div className="text-gray-600 text-sm">CEO, TechStart</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 italic">
                "Professionalità eccezionale e risultati straordinari. Il team ha compreso perfettamente la nostra visione e l'ha realizzata oltre le aspettative."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  GB
                </div>
                <div>
                  <div className="font-semibold">Giulia Bianchi</div>
                  <div className="text-gray-600 text-sm">Founder, StyleBoutique</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 italic">
                "La qualità del lavoro è impeccabile. Supporto sempre disponibile e consegna rispettati. Consiglio vivamente!"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  LV
                </div>
                <div>
                  <div className="font-semibold">Luca Verdi</div>
                  <div className="text-gray-600 text-sm">Marketing Director, InnovateCorp</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contatti" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto a <span className="text-blue-400">Trasformare</span> la Tua Presenza Online?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Iniziamo insieme il tuo viaggio verso il successo digitale. Contattaci oggi per una consulenza gratuita!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Inizia il Tuo Progetto</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium mb-2">Nome *</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
                      placeholder="Il tuo nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
                      placeholder="la-tua-email@esempio.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium mb-2">Telefono</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
                      placeholder="+39 123 456 7890"
                    />
                  </div>
                  <div>
                    <label htmlFor="azienda" className="block text-sm font-medium mb-2">Azienda</label>
                    <input
                      type="text"
                      id="azienda"
                      name="azienda"
                      value={formData.azienda}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
                      placeholder="Nome azienda"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="servizio" className="block text-sm font-medium mb-2">Servizio di Interesse *</label>
                  <select
                    id="servizio"
                    name="servizio"
                    value={formData.servizio}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  >
                    <option value="" className="text-gray-800">Seleziona un servizio</option>
                    <option value="Landing Page" className="text-gray-800">Landing Page (€350)</option>
                    <option value="Sito Multi-Pagina" className="text-gray-800">Sito Multi-Pagina (€850)</option>
                    <option value="Sito Professionale" className="text-gray-800">Sito Professionale (€1300)</option>
                    <option value="Soluzioni Custom" className="text-gray-800">Soluzioni Custom (Su Misura)</option>
                    <option value="Consulenza" className="text-gray-800">Consulenza Gratuita</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="messaggio" className="block text-sm font-medium mb-2">Messaggio *</label>
                  <textarea
                    id="messaggio"
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300 resize-none"
                    placeholder="Descrivi il tuo progetto e le tue esigenze..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Invio in corso...' : 'Invia Richiesta'}
                </button>

                {submitStatus && (
                  <div className={`mt-4 text-center p-3 rounded-lg text-sm ${submitStatus.success ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Informazioni di Contatto</h3>
                <p className="text-gray-300 mb-8">
                  Trasformiamo idee in esperienze digitali straordinarie. Il tuo partner di fiducia per siti web moderni, performanti e ottimizzati per il successo.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <a href="mailto:massimilianociconte9@gmail.com" className="text-gray-300 hover:text-white">massimilianociconte9@gmail.com</a>
                    <div className="text-sm text-gray-400">Rispondiamo in meno di 24h</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Telefono</div>
                    <a href="tel:+393802647367" className="text-gray-300 hover:text-white">+39 380 264 7367</a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Ubicazione</div>
                    <div className="text-gray-300">Italia</div>
                    <div className="text-sm text-gray-400">Serviamo tutto il territorio</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-semibold mb-3">Perché Scegliere WebNovis?</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Esperienza comprovata nel settore</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Tecnologie all'avanguardia</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Supporto continuo post-lancio</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Prezzi trasparenti e competitivi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">WebNovis</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Trasformiamo idee in esperienze digitali straordinarie. Il tuo partner di fiducia per siti web moderni, performanti e ottimizzati per il successo.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Mail className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Servizi</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Landing Page</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Siti Multi-Pagina</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Siti Professionali</a></li>
                <li><a href="#" className="hover:text-white transition-colors">App Mobili</a></li>
                <li><a href="#" className="hover:text-white transition-colors">CRM Aziendali</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contatti</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>massimilianociconte9@gmail.com</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+39 000 000 0000</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Italia</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 WebNovis. Tutti i diritti riservati.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Termini di Servizio</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}