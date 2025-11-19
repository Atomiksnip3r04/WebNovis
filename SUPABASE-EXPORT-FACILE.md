# 🔄 Export Supabase - Metodo Facile (Dashboard)

## 🎯 Metodo Più Semplice: Table Editor

### Step 1: Export Tabelle dal Vecchio Progetto

1. **Vai su** https://app.supabase.com
2. **Apri il vecchio progetto**
3. **Table Editor** (sidebar sinistra)
4. **Per ogni tabella:**
   - Clicca sulla tabella
   - Clicca sui 3 puntini (⋮) in alto a destra
   - Seleziona **"Export as CSV"**
   - Salva il file

Ripeti per tutte le tabelle.

---

### Step 2: Export Schema (Struttura Tabelle)

1. **SQL Editor** nel vecchio progetto
2. **New Query**
3. **Copia e incolla questo comando:**

```sql
SELECT 
    'CREATE TABLE ' || table_name || ' (' || 
    string_agg(
        column_name || ' ' || 
        CASE 
            WHEN data_type = 'character varying' THEN 'VARCHAR(' || character_maximum_length || ')'
            WHEN data_type = 'timestamp without time zone' THEN 'TIMESTAMP'
            WHEN data_type = 'timestamp with time zone' THEN 'TIMESTAMPTZ'
            ELSE UPPER(data_type)
        END ||
        CASE WHEN is_nullable = 'NO' THEN ' NOT NULL' ELSE '' END,
        ', '
    ) || ');' as create_statement
FROM information_schema.columns
WHERE table_schema = 'public'
GROUP BY table_name
ORDER BY table_name;
```

4. **Run**
5. **Copia tutti i risultati** (i comandi CREATE TABLE)

---

### Step 3: Crea Nuovo Progetto

1. **Accedi al nuovo account** Supabase
2. **New Project**
   - Nome: `webnovis-db`
   - Password: **Salvala!**
   - Region: Europe West (Ireland)
3. **Create Project**
4. **Aspetta 2-3 minuti**

---

### Step 4: Import Schema nel Nuovo Progetto

1. **SQL Editor** nel nuovo progetto
2. **New Query**
3. **Incolla i comandi CREATE TABLE** copiati prima
4. **Run**

✅ Le tabelle sono create!

---

### Step 5: Import Dati

1. **Table Editor** nel nuovo progetto
2. **Per ogni tabella:**
   - Clicca sulla tabella
   - Clicca **"Insert"** → **"Import from CSV"**
   - Seleziona il file CSV esportato
   - **Import**

✅ Dati importati!

---

## 🔑 Aggiorna Credenziali

### Nel Nuovo Progetto

1. **Settings → API**
2. **Copia:**
   - Project URL
   - anon/public key
   - service_role key

### Aggiorna .env

```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ✅ Verifica

### Test Connessione

Nel nuovo progetto, SQL Editor:

```sql
-- Conta tabelle
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public';

-- Conta righe
SELECT 
    tablename,
    n_live_tup as rows
FROM pg_stat_user_tables
ORDER BY tablename;
```

---

## 🐛 Problemi Comuni

### "Import CSV failed"

**Causa:** Formato CSV non compatibile

**Soluzione:**
1. Apri CSV in Excel
2. Salva come → CSV UTF-8
3. Riprova import

### "Column mismatch"

**Causa:** Colonne non corrispondono

**Soluzione:**
1. Verifica che la tabella sia stata creata correttamente
2. Controlla che il CSV abbia le stesse colonne
3. Rimuovi colonne extra dal CSV

### "Foreign key constraint"

**Causa:** Ordine import sbagliato

**Soluzione:**
1. Importa prima le tabelle "parent"
2. Poi le tabelle "child" con foreign keys

---

## 📊 Checklist

### Export
- [ ] Lista tutte le tabelle
- [ ] Export CSV di ogni tabella
- [ ] Export schema (CREATE TABLE)
- [ ] Salva tutto in una cartella

### Import
- [ ] Nuovo progetto creato
- [ ] Schema importato (CREATE TABLE)
- [ ] Dati importati (CSV)
- [ ] Verifica conteggio righe

### Post-Import
- [ ] Credenziali aggiornate in .env
- [ ] Test connessione
- [ ] Test query
- [ ] Elimina vecchio progetto (opzionale)

---

## ⏱️ Tempo Stimato

- **Export:** 5-10 minuti
- **Nuovo progetto:** 3 minuti
- **Import:** 10-15 minuti
- **Totale:** 20-30 minuti

---

## 💡 Tips

### Organizza i File

```
supabase-backup/
├── schema.sql
├── tabella1.csv
├── tabella2.csv
└── tabella3.csv
```

### Backup Prima di Tutto

Prima di eliminare il vecchio progetto:
- ✅ Verifica che tutto funzioni nel nuovo
- ✅ Testa tutte le query
- ✅ Controlla conteggio dati

---

**Questo metodo funziona al 100% senza installare nulla!** 🚀

Vuoi che ti aiuti con i comandi SQL specifici per le tue tabelle?
