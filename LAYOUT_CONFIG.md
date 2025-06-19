# Layout Configuration din .env

Acest document explică cum să configurezi layout-ul paginii principale și locațiile folosind variabilele de mediu din fișierul `.env`.

## Configurare

### 1. Creează fișierul .env

Creează un fișier `.env` în directorul rădăcină al proiectului:

```bash
# Tipul de business
VITE_BUSINESS_TYPE = HOTEL
# Opțiuni: HOTEL, GYM, DENTAL

# Paginile active pentru business type
VITE_ACTIVE_PAGES = [ROOMS, FACILITIES, ATTRACTIONS]

# Layout-ul paginii principale - codurile componentelor în ordine
VITE_HOME_LAYOUT = [11, 61, 111, 21, 101, 92, 71]

# Locațiile disponibile
VITE_LOCATIONS = [
  {
    "id": "location-1",
    "name": "Unirii",
    "slug": "unirii",
    "address": "Strada Unirii, Nr. 123, București",
    "phone": "+40 123 456 789",
    "email": "unirii@business.ro",
    "isActive": true
  },
  {
    "id": "location-2",
    "name": "Centru",
    "slug": "centru", 
    "address": "Strada Victoriei, Nr. 45, București",
    "phone": "+40 123 456 790",
    "email": "centru@business.ro",
    "isActive": false
  }
]
```

### 2. Codurile componentelor disponibile

| Cod | Component | Descriere |
|-----|-----------|-----------|
| 0   | - | Dezactivează secțiunea |
| 11  | HeroVariant1 | Secțiunea hero principală |
| 21  | FeaturesVariant1 | Caracteristici varianta 1 |
| 22  | FeaturesVariant2 | Caracteristici varianta 2 |
| 31  | GalleryVariant1 | Galerie de imagini |
| 44  | PackagesVariant1 | Pachete de servicii |
| 51  | ClassesVariant1 | Clase varianta 1 |
| 52  | ClassesVariant2 | Clase varianta 2 |
| 61  | DescriptionVariant1 | Descriere varianta 1 |
| 71  | FooterVariant1 | Footer |
| 81  | ClinicStatsVariant1 | Statistici clinică |
| 91  | ReviewsVariant1 | Recenzii |
| 92  | EndInfo | Informații finale |
| 101 | RoomsVariant1 | Camere hotel |
| 111 | AttractionsVariant1 | Atracții turistice |

### 3. Layout-uri predefinite pentru fiecare tip de business

#### Hotel
```env
VITE_HOME_LAYOUT = [11, 61, 111, 21, 101, 92, 71]
```
Secțiuni: Hero → Descriere → Atracții → Caracteristici → Camere → Info Final → Footer

#### Gym
```env
VITE_HOME_LAYOUT = [11, 61, 21, 51, 92, 71]
```
Secțiuni: Hero → Descriere → Caracteristici → Clase → Info Final → Footer

#### Dental
```env
VITE_HOME_LAYOUT = [11, 61, 22, 81, 31, 92, 71]
```
Secțiuni: Hero → Descriere → Caracteristici → Statistici → Galerie → Info Final → Footer

### 4. Configurarea locațiilor

#### Structura unei locații
```json
{
  "id": "unique-id",
  "name": "Numele locației",
  "slug": "slug-pentru-url",
  "address": "Adresa completă",
  "phone": "Numărul de telefon",
  "email": "Email-ul locației"
}
```

**Notă importantă:** Prima locație din configurație va fi automat setată ca locația inițială/activă, indiferent de valoarea `isActive` din configurație.

#### Exemple de configurare locații

**Hotel cu multiple locații:**
```env
VITE_LOCATIONS = [
  {
    "id": "hotel-unirii",
    "name": "Hotel Unirii",
    "slug": "unirii",
    "address": "Strada Unirii, Nr. 123, București",
    "phone": "+40 123 456 789",
    "email": "unirii@hotel.ro"
  },
  {
    "id": "hotel-centru",
    "name": "Hotel Centru",
    "slug": "centru",
    "address": "Strada Victoriei, Nr. 45, București", 
    "phone": "+40 123 456 790",
    "email": "centru@hotel.ro"
  }
]
```
*Prima locație (Hotel Unirii) va fi automat locația inițială.*

**Gym cu o singură locație:**
```env
VITE_LOCATIONS = [
  {
    "id": "gym-main",
    "name": "Gym Central",
    "slug": "central",
    "address": "Bulevardul Unirii, Nr. 100, București",
    "phone": "+40 123 456 791",
    "email": "info@gym.ro"
  }
]
```

### 5. Navigarea între locații

Sistemul suportă navigarea între locații în mai multe moduri:

#### Rute bazate pe locații
- `/unirii` - Pagina principală pentru locația Unirii
- `/unirii/rooms` - Camerele pentru locația Unirii
- `/centru/attractions` - Atracțiile pentru locația Centru

#### Selector de locații în Hero
- Selector dropdown în colțul din stânga sus
- Butoane de navigare rapidă
- Link-uri în informațiile despre locație

#### Funcționalități
- Schimbare automată de locație la navigare
- Persistența locației selectate
- Validare automată a locațiilor
- Fallback la prima locație disponibilă

### 6. Funcții helper disponibile

```javascript
import { 
  getHomeLayout, 
  getLayoutInfo, 
  validateLayout,
  getLayoutComponents,
  getBusinessLayout,
  getAvailableLayouts,
  getAllLocations,
  getCurrentLocation,
  getLocationBySlug
} from './config/businessConfig';

import {
  switchLocation,
  switchLocationBySlug,
  getLocationInfo,
  resetToInitialLocation
} from './store/locationStore';

// Layout functions
const layout = getHomeLayout();
const info = getLayoutInfo();

// Location functions
const allLocations = getAllLocations();
const currentLocation = getCurrentLocation();
const initialLocation = getInitialLocation();
const locationInfo = getLocationInfo();

// Switch location
switchLocation('location-id');
switchLocationBySlug('unirii');
resetToInitialLocation(); // Reset to first location

// Check location status
const hasMultiple = hasMultipleLocations();
const locationCount = getLocationCount();
```

### 7. Validare și fallback

Sistemul include validare automată:

- Dacă `VITE_HOME_LAYOUT` nu este setat, se folosește layout-ul predefinit pentru tipul de business
- Dacă conține coduri invalide, se folosește layout-ul de fallback
- Dacă `VITE_LOCATIONS` nu este setat, se folosesc locațiile predefinite
- Se asigură că cel puțin o locație este activă
- Se afișează avertismente în consolă pentru configurații invalide

### 8. Restart aplicației

După modificarea fișierului `.env`, repornește aplicația pentru ca modificările să fie aplicate:

```bash
npm run dev
``` 