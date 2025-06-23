# Ghid de Migrare - Business Data Hooks

Acest ghid te ajută să migrezi de la hook-ul original `useBusinessData.js` la noua structură modulară.

## Schimbări Principale

### 1. Structura Modulară

**Înainte:**
```
src/hooks/
└── useBusinessData.js (846 linii)
```

**După:**
```
src/hooks/
├── patterns/           # Design patterns
├── utils/              # Utilitare
├── business/           # Hook principal
├── current/            # Hooks pentru datele curente
├── specific/           # Hooks pentru tipuri specifice
├── entities/           # Hooks pentru entități
├── config/             # Hooks pentru configurație
├── __tests__/          # Teste
└── index.js            # Export principal
```

### 2. Importuri

**Înainte:**
```javascript
import { useBusinessData } from './hooks/useBusinessData.js';
```

**După:**
```javascript
// Import principal (recomandat)
import { useBusinessData } from './hooks/index.js';

// Sau import specific
import { useBusinessData } from './hooks/business/useBusinessData.js';
```

### 3. Compatibilitate

Fișierul original `useBusinessData.js` a fost păstrat pentru compatibilitate și va afișa un warning când este folosit. Toate funcționalitățile rămân compatibile.

## Pași de Migrare

### Pasul 1: Actualizează Importurile

Înlocuiește toate importurile din fișierul original:

```javascript
// Înainte
import { 
    useBusinessData, 
    useCurrentBusinessData,
    useAttractions 
} from './hooks/useBusinessData.js';

// După
import { 
    useBusinessData, 
    useCurrentBusinessData,
    useAttractions 
} from './hooks/index.js';
```

### Pasul 2: Folosește Hooks Specializate

În loc să folosești `useBusinessData` cu `dataType`, folosește hooks specializate:

```javascript
// Înainte
const { data: attractions } = useBusinessData('hotel', { dataType: 'attractions' });

// După
const { data: attractions } = useAttractions('hotel');
```

### Pasul 3: Folosește Utilitarele

Pentru funcționalități avansate, folosește utilitarele:

```javascript
// Înainte
// Nu existau utilitare

// După
import { 
    useDataState, 
    createObserverId, 
    validateBusinessType 
} from './hooks/utils/hookUtils.js';

// Creează hook-uri custom
const useCustomData = () => {
    const loadData = async () => {
        // Custom logic
        return await fetch('/api/custom-data');
    };
    
    return useDataState('custom-data', loadData, true, []);
};
```

## Exemple de Migrare

### Exemplu 1: Hook Principal

**Înainte:**
```javascript
const MyComponent = () => {
    const { data, loading, error, refresh } = useBusinessData('hotel', {
        autoLoad: true,
        dataType: 'attractions'
    });
    
    // Component logic
};
```

**După:**
```javascript
const MyComponent = () => {
    // Opțiunea 1: Hook principal (pentru date complexe)
    const { data, loading, error, refresh } = useBusinessData('hotel', {
        autoLoad: true,
        dataType: 'attractions'
    });
    
    // Opțiunea 2: Hook specializat (recomandat)
    const { data: attractions, loading, error, refresh } = useAttractions('hotel');
    
    // Component logic
};
```

### Exemplu 2: Datele Curente

**Înainte:**
```javascript
const { data, loading, error } = useCurrentBusinessData();
```

**După:**
```javascript
// Același cod funcționează
const { data, loading, error } = useCurrentBusinessData();
```

### Exemplu 3: Multiple Hooks

**Înainte:**
```javascript
const { data: attractions } = useBusinessData('hotel', { dataType: 'attractions' });
const { data: facilities } = useBusinessData('hotel', { dataType: 'facilities' });
const { data: rooms } = useBusinessData('hotel', { dataType: 'rooms' });
```

**După:**
```javascript
const { data: attractions } = useAttractions('hotel');
const { data: facilities } = useFacilities('hotel');
const { data: rooms } = useRooms('hotel');
```

## Avantaje ale Migrării

1. **Cod mai curat**: Hooks specializate sunt mai ușor de înțeles
2. **Performanță mai bună**: Fiecare hook se optimizează pentru cazul său specific
3. **Mentenabilitate**: Codul este mai ușor de modificat și extins
4. **Testabilitate**: Fiecare modul poate fi testat independent
5. **Reutilizabilitate**: Utilitarele pot fi folosite în multiple locuri

## Verificare

După migrare, verifică că:

1. Toate importurile funcționează
2. Nu există erori în consolă
3. Funcționalitatea rămâne aceeași
4. Performanța este cel puțin la fel de bună

## Suport

Dacă întâmpini probleme în timpul migrării:

1. Verifică documentația din `README.md`
2. Uită-te la exemplele din `examples/UsageExample.jsx`
3. Rulează testele pentru a verifica funcționalitatea
4. Folosește fișierul original ca referință dacă este necesar

## Timeline Recomandat

- **Săptămâna 1**: Actualizează importurile principale
- **Săptămâna 2**: Înlocuiește hooks-urile cu versiuni specializate
- **Săptămâna 3**: Adaugă utilitare pentru cazuri avansate
- **Săptămâna 4**: Testează și optimizează

După 4 săptămâni, poți șterge fișierul original `useBusinessData.js` dacă toate funcționează corect. 