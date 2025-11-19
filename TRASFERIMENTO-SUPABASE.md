# 🔄 Trasferimento Database Supabase - Guida Completa

## 📋 Panoramica

Trasferire un database Supabase da un account a un altro richiede:
1. Export dello schema e dei dati dal vecchio progetto
2. Creazione nuovo progetto nel nuovo account
3. Import dello schema e dei dati

## 🎯 Metodo 1: Export/Import Completo (Consigliato)

### Step 1: Export dal Vecchio Progetto

#### A. Via Dashboard Supabase

1. **Accedi al vecchio account Supabase**
   - https://app.supabase.com

2. **Seleziona il progetto da esportare**

3. **Vai su SQL Editor**
   - Sidebar → SQL Editor

4. **Esporta Schema**
   ```sql
   -- Copia questo comando e eseguilo
   SELECT 
       table_schema,
       table_name,
       column_name,
       data_type,
       is_nullable
   FROM information_schema.columns
   WHERE table_schema = 'public'
   ORDER BY table_name, ordinal_position;
   ```

5. **Esporta Dati**
   - Settings → Database → Connection String
   - Copia la connection string

#### B. Via CLI (Più Completo)

```bash
# 1. Installa Supabase CLI
npm install -g supabase

# 2. Login al vecchio account
supabase login

# 3. Link al progetto
supabase link --project-ref TUO-PROJECT-REF

# 4. Export schema
supabase db dump -f schema.sql

# 5. Export dati
supabase db dump --data-only -f data.sql

# 6. Export tutto (schema + dati)
supabase db dump -f backup_completo.sql
```

---

### Step 2: Crea Nuovo Progetto

1. **Accedi al nuovo account Supabase**
   - https://app.supabase.com

2. **Crea nuovo progetto**
   - New Project
   - Nome: `webnovis-db` (o quello che preferisci)
   - Database Password: **Salva questa password!**
   - Region: Scegli la più vicina
   - Pricing Plan: Free o Pro

3. **Aspetta creazione** (2-3 minuti)

---

### Step 3: Import nel Nuovo Progetto

#### A. Via Dashboard

1. **Vai su SQL Editor** nel nuovo progetto

2. **Crea le tabelle**
   - Incolla lo schema SQL esportato
   - Run

3. **Importa i dati**
   - Incolla i dati SQL
   - Run

#### B. Via CLI

```bash
# 1. Link al nuovo progetto
supabase link --project-ref NUOVO-PROJECT-REF

# 2. Import schema
supabase db push

# 3. Import dati
psql "postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres" < data.sql

# Oppure import completo
psql "postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres" < backup_completo.sql
```

---

## 🎯 Metodo 2: Export/Import Manuale Tabelle

### Step 1: Export Tabelle Singole

Per ogni tabella:

```sql
-- 1. Esporta struttura
SHOW CREATE TABLE nome_tabella;

-- 2. Esporta dati
COPY nome_tabella TO STDOUT WITH CSV HEADER;
```

### Step 2: Import nel Nuovo Progetto

```sql
-- 1. Crea tabella
CREATE TABLE nome_tabella (...);

-- 2. Importa dati
COPY nome_tabella FROM STDIN WITH CSV HEADER;
-- Incolla i dati CSV
```

---

## 🎯 Metodo 3: Usando pgAdmin o DBeaver

### Step 1: Connetti al Vecchio Database

1. **Ottieni connection string**
   - Settings → Database → Connection String
   - Formato: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

2. **Apri pgAdmin/DBeaver**
   - New Connection
   - Incolla i dettagli

3. **Export Database**
   - Right click su database → Backup
   - Format: Plain
   - Salva come `backup.sql`

### Step 2: Connetti al Nuovo Database

1. **Ottieni nuova connection string**

2. **Crea connessione in pgAdmin/DBeaver**

3. **Import Database**
   - Right click su database → Restore
   - Seleziona `backup.sql`
   - Restore

---

## 🔐 Gestione Credenziali

### Vecchio Progetto

```env
# .env.old
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Nuovo Progetto

```env
# .env
SUPABASE_URL=https://yyy.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Dove trovare le chiavi:**
- Settings → API → Project URL
- Settings → API → Project API keys

---

## 📦 Checklist Trasferimento

### Pre-Trasferimento
- [ ] Backup completo del vecchio database
- [ ] Lista di tutte le tabelle
- [ ] Lista di tutte le policies RLS
- [ ] Lista di tutte le functions
- [ ] Lista di tutti i triggers
- [ ] Credenziali salvate

### Durante Trasferimento
- [ ] Nuovo progetto creato
- [ ] Schema importato
- [ ] Dati importati
- [ ] Policies RLS ricreate
- [ ] Functions ricreate
- [ ] Triggers ricreati

### Post-Trasferimento
- [ ] Verifica integrità dati
- [ ] Test connessioni
- [ ] Aggiorna credenziali in app
- [ ] Test funzionalità
- [ ] Elimina vecchio progetto (opzionale)

---

## 🔧 Script Automatico

### export-supabase.sh

```bash
#!/bin/bash

# Configurazione
OLD_PROJECT_REF="xxx"
OLD_PASSWORD="password_vecchio"
OLD_HOST="db.xxx.supabase.co"

# Export completo
echo "📦 Export database..."
pg_dump "postgresql://postgres:${OLD_PASSWORD}@${OLD_HOST}:5432/postgres" \
  --clean \
  --if-exists \
  --no-owner \
  --no-privileges \
  > backup_completo.sql

echo "✅ Export completato: backup_completo.sql"

# Export solo schema
pg_dump "postgresql://postgres:${OLD_PASSWORD}@${OLD_HOST}:5432/postgres" \
  --schema-only \
  --no-owner \
  --no-privileges \
  > schema.sql

echo "✅ Schema esportato: schema.sql"

# Export solo dati
pg_dump "postgresql://postgres:${OLD_PASSWORD}@${OLD_HOST}:5432/postgres" \
  --data-only \
  --no-owner \
  --no-privileges \
  > data.sql

echo "✅ Dati esportati: data.sql"
```

### import-supabase.sh

```bash
#!/bin/bash

# Configurazione
NEW_PROJECT_REF="yyy"
NEW_PASSWORD="password_nuovo"
NEW_HOST="db.yyy.supabase.co"

# Import completo
echo "📥 Import database..."
psql "postgresql://postgres:${NEW_PASSWORD}@${NEW_HOST}:5432/postgres" \
  < backup_completo.sql

echo "✅ Import completato!"

# Verifica
psql "postgresql://postgres:${NEW_PASSWORD}@${NEW_HOST}:5432/postgres" \
  -c "\dt"

echo "✅ Tabelle importate"
```

---

## 🐛 Troubleshooting

### Errore: "Permission denied"

**Causa:** Mancano permessi

**Soluzione:**
```sql
-- Esegui come superuser
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres;
```

### Errore: "Relation already exists"

**Causa:** Tabella già presente

**Soluzione:**
```sql
-- Elimina tabelle esistenti
DROP TABLE IF EXISTS nome_tabella CASCADE;
```

### Errore: "Connection refused"

**Causa:** IP non autorizzato

**Soluzione:**
- Settings → Database → Connection Pooling
- Abilita "Allow connections from anywhere"

### Dati non importati

**Causa:** Foreign key constraints

**Soluzione:**
```sql
-- Disabilita constraints temporaneamente
SET session_replication_role = 'replica';
-- Import dati
-- Riabilita constraints
SET session_replication_role = 'origin';
```

---

## 🔒 Sicurezza

### Durante il Trasferimento

1. **Non committare credenziali**
   ```gitignore
   .env
   .env.*
   backup*.sql
   ```

2. **Usa variabili ambiente**
   ```bash
   export SUPABASE_PASSWORD="xxx"
   ```

3. **Elimina backup dopo import**
   ```bash
   rm backup_completo.sql
   rm schema.sql
   rm data.sql
   ```

---

## 📊 Verifica Post-Trasferimento

### SQL di Verifica

```sql
-- 1. Conta tabelle
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public';

-- 2. Conta righe per tabella
SELECT 
    schemaname,
    tablename,
    n_live_tup as row_count
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;

-- 3. Verifica policies
SELECT * FROM pg_policies;

-- 4. Verifica functions
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public';
```

---

## 💰 Costi

### Supabase Free Tier
- ✅ 500MB database
- ✅ 2GB bandwidth
- ✅ 50MB file storage
- ✅ Progetti illimitati

### Supabase Pro ($25/mese)
- ✅ 8GB database
- ✅ 250GB bandwidth
- ✅ 100GB file storage
- ✅ Backup giornalieri

---

## 🎯 Prossimi Passi

1. **Ora:** Scegli il metodo di trasferimento
2. **Poi:** Export dal vecchio progetto
3. **Infine:** Import nel nuovo progetto
4. **Test:** Verifica tutto funzioni
5. **Deploy:** Aggiorna credenziali in produzione

---

## 📞 Supporto

- **Supabase Docs:** https://supabase.com/docs
- **Community:** https://github.com/supabase/supabase/discussions
- **Discord:** https://discord.supabase.com

---

**Tempo stimato:** 30-60 minuti
**Difficoltà:** ⭐⭐⭐☆☆ Media
**Rischio:** Basso (con backup)
