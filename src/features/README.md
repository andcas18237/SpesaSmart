# Features Directory

Architettura feature-based per la separazione delle responsabilità.

## Struttura

Ogni feature è organizzata in:

```
features/
├── history/                 # Storico spese
│   ├── components/          # Componenti UI specifici della feature
│   ├── screens/             # Screen della feature
│   ├── hooks/               # Custom hooks
│   ├── types.ts             # Type definitions
│   └── index.ts             # Barrel export
│
├── scanner/                 # Scansione scontrini
│   ├── components/
│   ├── screens/
│   ├── services/            # Servizi (OCR, camera)
│   ├── types.ts
│   └── index.ts
│
├── shopping-list/           # Gestione liste della spesa
│   ├── components/
│   ├── screens/
│   ├── hooks/
│   ├── types.ts
│   └── index.ts
│
└── shared/                  # Componenti e utilità condivise
    ├── components/          # Componenti riutilizzabili
    ├── hooks/               # Custom hooks globali
    ├── services/            # Servizi globali (API, storage)
    ├── types/               # Type definitions globali
    └── utils/               # Utility functions
```

## Principi

- **Isolamento:** Ogni feature è indipendente e testabile
- **Riusabilità:** Componenti comuni in `shared/`
- **Chiarezza:** Nomi espliciti e struttura prevedibile
- **Scalabilità:** Facile aggiungere nuove feature senza refactor

## Evitare

- Dipendenze circolari tra feature
- Logica di business nei componenti UI
- Hardcoding di dati o configurazioni
