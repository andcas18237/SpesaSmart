# Design System - Spesa App

## Overview

Spesa è un'app mobile per la gestione intelligente della spesa. L'utente scansiona gli scontrini, l'app estrae i prodotti e i prezzi, e salva la spesa nel database. L'app suggerisce liste della spesa basate sulla cronologia e permette di visualizzare tutte le spese effettuate.

**Target Design:** Seguire le Apple Human Interface Guidelines (HIG) per un'esperienza iOS-first, con supporto Android.

---

## Screen List

1. **Home / Storico Spese** — Visualizza tutte le spese effettuate con costo totale per ciascuna
2. **Scanner Scontrino** — Cattura foto dello scontrino, mostra anteprima e risultati OCR
3. **Dettaglio Spesa** — Visualizza i prodotti di una singola spesa, con possibilità di modifica
4. **Lista della Spesa** — Crea una nuova lista basata su: ultima spesa o prodotti più acquistati
5. **Modifica Prodotto** — Input vocale per correggere nomi prodotti ambigui
6. **Impostazioni** — Tema, lingua, gestione dati (placeholder per future feature)

---

## Primary Content & Functionality

### 1. Home / Storico Spese
**Purpose:** Dashboard principale che mostra la cronologia delle spese.

**Content:**
- Header con titolo "Le mie Spese"
- Pulsante FAB (Floating Action Button) per aggiungere nuova spesa (scanner)
- Lista verticale di carte spese, ordinate per data (più recenti in alto)
- Ogni carta mostra:
  - Data della spesa (es. "12 Maggio 2026")
  - Numero di articoli acquistati
  - Costo totale in evidenza
  - Tap per visualizzare dettagli

**Functionality:**
- Tap su una carta → Dettaglio Spesa
- Tap su FAB → Scanner Scontrino
- Swipe left (iOS) / long-press (Android) → Opzioni (modifica, elimina)

---

### 2. Scanner Scontrino
**Purpose:** Cattura e processa lo scontrino tramite fotocamera.

**Content:**
- Overlay fotocamera a schermo intero
- Rettangolo guida (frame) al centro per inquadrare lo scontrino
- Pulsante "Scatta" grande e ben visibile in basso
- Pulsante "Annulla" in alto a sinistra
- Flash toggle in alto a destra

**Functionality:**
- Tap "Scatta" → Cattura foto e passa a "Anteprima"
- Tap "Annulla" → Torna a Home
- Tap Flash → Attiva/disattiva flash

**Anteprima Foto:**
- Mostra foto catturata
- Pulsante "Conferma" (verde) e "Riprova" (grigio)
- Tap "Conferma" → Invia a OCR e mostra "Elaborazione..."
- Tap "Riprova" → Torna a fotocamera

**Risultati OCR:**
- Mostra lista di prodotti estratti
- Ogni riga: nome prodotto + prezzo
- Se ambiguità: icona "?" accanto al prodotto
- Tap su "?" → Modale input vocale
- Pulsante "Salva Spesa" in basso

---

### 3. Dettaglio Spesa
**Purpose:** Visualizza i prodotti di una singola spesa.

**Content:**
- Header con data della spesa
- Sottotitolo con numero di articoli
- Lista verticale di prodotti:
  - Nome prodotto
  - Prezzo unitario
  - Quantità (se disponibile)
  - Subtotale
- Sezione totale in basso (sticky):
  - Subtotale
  - Imposte (se presenti)
  - **Totale** in grande

**Functionality:**
- Tap su prodotto → Modifica prodotto
- Tap "Modifica" (header) → Abilita edit mode
- Tap "Elimina" → Rimuove la spesa con conferma
- Tap "Crea Lista" → Apre sheet per creare lista della spesa da questa spesa

---

### 4. Lista della Spesa
**Purpose:** Crea e gestisce liste della spesa intelligenti.

**Content:**
- Header "Nuova Lista"
- Due opzioni di creazione:
  - **"Basata su Ultima Spesa"** — Copia prodotti dall'ultima spesa
  - **"Basata su Prodotti Frequenti"** — Suggerisce i 10 prodotti più acquistati
- Dopo selezione: lista modificabile
  - Checkbox per marcare articoli come "acquistati"
  - Tap per modificare quantità
  - Swipe per eliminare

**Functionality:**
- Tap su opzione → Carica lista
- Checkbox → Segna come acquistato (visual feedback: strikethrough)
- Tap "Salva Lista" → Salva come template
- Tap "Converti in Spesa" → Crea una nuova spesa da questa lista

---

### 5. Modifica Prodotto (Input Vocale)
**Purpose:** Corregge nomi prodotti ambigui tramite input vocale.

**Content:**
- Modale con:
  - Testo: "Cosa hai acquistato?" (con prodotto ambiguo mostrato)
  - Pulsante "Registra Voce" grande e ben visibile
  - Animazione durante registrazione (onda sonora)
  - Trascrizione visualizzata in tempo reale
  - Pulsanti "Conferma" e "Annulla"

**Functionality:**
- Tap "Registra Voce" → Attiva microfono
- Parla → Trascrizione in tempo reale
- Tap "Conferma" → Salva il nome corretto
- Tap "Annulla" → Scarta la registrazione

---

### 6. Impostazioni (Placeholder)
**Purpose:** Configurazioni app (placeholder per future feature).

**Content:**
- Tema (Light/Dark/Auto)
- Lingua (Italiano/Inglese)
- Gestione dati (Esporta, Cancella tutto)

---

## Key User Flows

### Flow 1: Aggiungere una Nuova Spesa
1. Utente apre app → Home (lista spese)
2. Tap FAB → Scanner Scontrino
3. Fotocamera si apre
4. Tap "Scatta" → Anteprima foto
5. Tap "Conferma" → Elaborazione OCR
6. Risultati OCR mostrati
7. Se ambiguità: Tap "?" → Modale input vocale → Parla → Conferma
8. Tap "Salva Spesa" → Spesa salvata
9. Torna a Home (nuova spesa in cima alla lista)

### Flow 2: Visualizzare Dettagli di una Spesa
1. Home → Tap su carta spesa
2. Dettaglio Spesa aperto
3. Visualizza prodotti e totale
4. Opzione: Tap "Crea Lista" → Crea lista basata su questa spesa

### Flow 3: Creare una Lista della Spesa
1. Home → Tap su pulsante "Liste" (tab bar)
2. Schermata "Nuova Lista"
3. Scegli: "Ultima Spesa" o "Prodotti Frequenti"
4. Lista caricata e modificabile
5. Checkbox per marcare articoli
6. Tap "Salva Lista" o "Converti in Spesa"

---

## Color Choices

### Primary Palette (Spesa Brand)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| **primary** | `#10B981` | `#10B981` | CTA buttons, accents, success states |
| **background** | `#FFFFFF` | `#0F172A` | Screen backgrounds |
| **surface** | `#F8FAFC` | `#1E293B` | Cards, elevated surfaces |
| **foreground** | `#0F172A` | `#F1F5F9` | Primary text |
| **muted** | `#64748B` | `#94A3B8` | Secondary text, hints |
| **border** | `#E2E8F0` | `#334155` | Dividers, borders |
| **success** | `#10B981` | `#10B981` | Success states |
| **warning** | `#F59E0B` | `#FBBF24` | Warning states |
| **error** | `#EF4444` | `#F87171` | Error states |

**Rationale:**
- **Green (#10B981)** = Natura, crescita, spesa consapevole
- **Neutral palette** = Leggibilità, focus su contenuto
- **High contrast** = Accessibilità (WCAG AA+)

---

## Typography

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| **H1 (Screen Title)** | System | 32px | Bold (700) | 1.2 |
| **H2 (Section Title)** | System | 24px | Semibold (600) | 1.3 |
| **H3 (Card Title)** | System | 18px | Semibold (600) | 1.4 |
| **Body (Regular Text)** | System | 16px | Regular (400) | 1.5 |
| **Small (Captions)** | System | 14px | Regular (400) | 1.4 |
| **Tiny (Hints)** | System | 12px | Regular (400) | 1.3 |
| **Button Text** | System | 16px | Semibold (600) | 1.5 |

**Font Family:** System fonts (SF Pro Display on iOS, Roboto on Android) — nessun font custom per mantenere performance.

---

## Component Library (Base)

### Buttons
- **Primary Button** — Green background, white text, rounded corners (12px)
- **Secondary Button** — Gray background, dark text
- **Tertiary Button** — Text-only, green color
- **Destructive Button** — Red background (for delete actions)

### Cards
- **Spesa Card** — Surface background, border, rounded (12px), shadow (light)
- **Product Card** — Minimal, divider-based layout

### Modals
- **Bottom Sheet** — Slides from bottom, semi-transparent backdrop
- **Alert Dialog** — Centered, with confirm/cancel buttons

### Input
- **Text Input** — Border-based, focus state with green border
- **Voice Input** — Animated waveform during recording

### List
- **FlatList** — Optimized for performance, dividers between items

---

## Spacing & Layout

- **Padding (screens):** 16px (default)
- **Gap (between elements):** 8px, 12px, 16px (hierarchy-based)
- **Corner radius:** 12px (standard), 8px (smaller elements)
- **Safe area:** Handled by `ScreenContainer`

---

## Interaction Patterns

### Press Feedback
- **Buttons:** Scale 0.97 + haptic feedback (Light)
- **Cards:** Opacity 0.7
- **Icons:** Opacity 0.6

### Loading States
- **Spinner** — Centered, with text "Elaborazione..."
- **Skeleton screens** — Placeholder cards while loading

### Empty States
- **No spese:** Illustrazione + testo "Nessuna spesa registrata"
- **No prodotti:** Testo "Nessun prodotto trovato"

---

## Accessibility

- **Color contrast:** WCAG AA+ (4.5:1 for text)
- **Font sizes:** Min 16px for body text
- **Touch targets:** Min 44x44pt (Apple HIG standard)
- **Semantic labels:** VoiceOver support for all interactive elements
- **Dark mode:** Full support with CSS variables

---

## Next Steps

1. **Phase 2:** Implementare design system in `theme.config.js` e componenti base
2. **Phase 3:** Creare navigazione (tab bar + stack navigation)
3. **Phase 4:** Costruire UI degli screen con mockup dati
4. **Phase 5:** Integrazione con backend (OCR, voice recognition, database)
