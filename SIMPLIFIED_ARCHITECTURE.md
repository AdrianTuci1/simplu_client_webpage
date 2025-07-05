# Arhitectură Simplificată

## Prezentare Generală

Aplicația a fost simplificată pentru a reduce complexitatea și a face codul mai ușor de înțeles și întreținut. Noua arhitectură păstrează toate funcționalitățile dar cu o structură mai directă.

## Structura Simplificată

### 1. Configurare (`src/config/simplifiedConfig.js`)

**În loc de:** Pattern-uri complexe (Strategy, Factory, Singleton)
**Acum:** Configurare directă și simplă

```javascript
// Configurare directă pentru fiecare business type
const BUSINESS_CONFIGS = {
  hotel: {
    name: 'Hotel',
    homeLayout: [11, 61, 111, 21, 101, 92, 71],
    availablePages: ['ROOMS', 'FACILITIES', 'ATTRACTIONS']
  },
  gym: {
    name: 'Gym', 
    homeLayout: [11, 61, 21, 44, 51, 92, 71],
    availablePages: ['PACKAGES', 'CLASSES']
  },
  clinic: {
    name: 'Clinic',
    homeLayout: [11, 61, 22, 81, 31, 71], 
    availablePages: ['MEDICS', 'TREATMENTS']
  }
};
```

### 2. Gestionarea Datelor (`src/hooks/useSimplifiedData.js`)

**În loc de:** Hook-uri complexe cu multiple opțiuni
**Acum:** Hook simplu care încarcă automat datele corecte

```javascript
// Folosire simplă
const { data, loading, error } = useHeroData();
const { data: rooms } = useRooms();
const { data: packages } = usePackages();
```

### 3. Routing (`src/routes/index.jsx`)

**În loc de:** Logică complexă de routing
**Acum:** Routing direct bazat pe configurare

```javascript
// Routing automat pentru multiple locații
{allLocations.map(location => (
  <Route 
    path={`/${location.slug}`}
    element={<Home location={location} />}
  />
))}
```

## Avantajele Simplificării

### 1. **Configurare Directă**
- Fără pattern-uri complexe
- Configurare clară și ușor de modificat
- Mai puțină abstractizare

### 2. **Hook-uri Simple**
- Un singur hook pentru toate tipurile de date
- Încărcare automată bazată pe business type
- API consistent

### 3. **Routing Simplu**
- Logică directă pentru multiple locații
- Mai puțină complexitate în routing
- Ușor de înțeles și modificat

### 4. **Mentenanță Ușoară**
- Cod mai puțin abstract
- Mai puține fișiere de configurare
- Logică mai directă

## Cum Funcționează

### 1. **Business Type Detection**
```javascript
// Din environment variables
VITE_BUSINESS_TYPE=hotel
VITE_TENANT_ID=demo-tenant-123
VITE_LOCATIONS='[{"id":"loc1","name":"Unirii","slug":"unirii"}]'
```

### 2. **Component Loading**
```javascript
// Configurare directă
homeLayout: [11, 61, 111, 21, 101, 92, 71]
// Se mapează la componente
11 -> HeroVariant1
61 -> DescriptionVariant1
111 -> AttractionsVariant1
// etc.
```

### 3. **Data Loading**
```javascript
// Automat bazat pe business type și locație
const { data } = useHeroData(); // Încarcă datele corecte automat
```

### 4. **Location Management**
```javascript
// Suport pentru multiple locații
/unirii -> Home pentru locația Unirii
/centru -> Home pentru locația Centru
/unirii/rooms -> Rooms pentru locația Unirii
```

## Migrarea de la Arhitectura Complexă

### 1. **Înlocuiește Configurarea**
```javascript
// În loc de
import { businessConfig } from '../config/businessConfig';

// Folosește
import simplifiedConfig from '../config/simplifiedConfig';
```

### 2. **Înlocuiește Hook-urile**
```javascript
// În loc de
import { useSimplifiedData } from '../hooks/useSimplifiedData';

// Folosește
import { useHeroData, useRooms } from '../hooks/useSimplifiedData';
```

### 3. **Înlocuiește Routing-ul**
```javascript
// În loc de
import AppRoutes from '../routes/index';

// Folosește
// Routing-ul este deja în src/routes/index.jsx
```

## Beneficii

1. **Cod mai ușor de înțeles** - Logică directă fără abstractizări complexe
2. **Mentenanță simplificată** - Mai puține fișiere și dependențe
3. **Debugging mai ușor** - Flux de date mai direct
4. **Performanță îmbunătățită** - Mai puțină overhead din pattern-uri
5. **Onboarding mai rapid** - Noi dezvoltatori înțeleg mai repede codul

## Concluzie

Noua arhitectură simplificată păstrează toate funcționalitățile dar cu o complexitate mult redusă. Este mai ușor de înțeles, modificat și întreținut, făcând aplicația mai accesibilă pentru dezvoltatori. 