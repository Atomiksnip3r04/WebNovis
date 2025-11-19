# 🔧 Installazione Supabase CLI - Windows

## ❌ Problema

`npm install -g supabase` non funziona più. Supabase CLI richiede installazione nativa.

## ✅ Soluzione: Scoop (Consigliato per Windows)

### Step 1: Installa Scoop

Apri PowerShell come **Amministratore** ed esegui:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

### Step 2: Installa Supabase CLI

```powershell
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Step 3: Verifica Installazione

```powershell
supabase --version
```

---

## 🎯 Metodo Alternativo: Download Diretto

### Step 1: Download Binary

1. Vai su: https://github.com/supabase/cli/releases/latest
2. Scarica: `supabase_windows_amd64.zip`
3. Estrai in una cartella (es: `C:\supabase`)

### Step 2: Aggiungi al PATH

1. Cerca "Variabili d'ambiente" in Windows
2. Modifica variabile PATH
3. Aggiungi: `C:\supabase`
4. OK e riavvia terminale

### Step 3: Verifica

```powershell
supabase --version
```

---

## 🚀 Dopo l'Installazione

### Login

```bash
supabase login
```

### Link Progetto

```bash
supabase link --project-ref TUO-PROJECT-REF
```

### Export Database

```bash
supabase db dump -f backup.sql
```

---

## ⚡ Metodo Veloce: Senza CLI

Se hai problemi con l'installazione, usa il **Metodo Dashboard** invece:

### Export via Dashboard

1. **SQL Editor** nel vecchio progetto
2. **Esegui questo comando:**

```sql
-- Export schema
SELECT 
    'CREATE TABLE ' || table_name || ' (' ||
    string_agg(
        column_name || ' ' || data_type ||
        CASE WHEN is_nullable = 'NO' THEN ' NOT NULL' ELSE '' END,
        ', '
    ) || ');'
FROM information_schema.columns
WHERE table_schema = 'public'
GROUP BY table_name;
```

3. **Copia il risultato**
4. **Incolla nel nuovo progetto**

### Export Dati

Per ogni tabella:

```sql
SELECT * FROM nome_tabella;
```

Copia i risultati e usa INSERT nel nuovo progetto.

---

## 🎯 Metodo Consigliato per Te

Dato l'errore, ti consiglio:

### Opzione A: Usa Scoop (5 minuti)
- Più pulito e gestibile
- Aggiornamenti automatici
- Installazione semplice

### Opzione B: Dashboard Supabase (10 minuti)
- Nessuna installazione necessaria
- Funziona subito
- Copia/incolla SQL

### Opzione C: pgAdmin (15 minuti)
- Interfaccia grafica
- Backup/Restore visuale
- Più controllo

---

## 📞 Quale Metodo Preferisci?

1. **Scoop** - Installo CLI correttamente
2. **Dashboard** - Export/Import via browser
3. **pgAdmin** - Tool grafico professionale

Dimmi quale preferisci e ti guido passo-passo! 🚀
