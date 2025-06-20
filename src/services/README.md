# Data Service Documentation - Environment-Based Design Patterns

Acest serviciu folosește design patterns și configurația de mediu pentru a oferi o arhitectură scalabilă și menținabilă pentru accesarea datelor pentru diferite tipuri de business (hotel, clinică, sală de fitness) în componentele React.

## 🏗️ Design Patterns + Environment Configuration

### 1. **Factory Pattern** - Crearea Provider-ilor de Date
- `DataProviderFactory` creează provider-i specifici pentru fiecare tip de business
- Encapsulează logica de creare și permite extensibilitate ușoară

### 2. **Strategy Pattern** - Strategii pentru Tipuri de Business
- Fiecare tip de business (Hotel, Clinic, Gym) are propria strategie
- Interfața comună `DataProviderStrategy` permite schimbarea strategiilor
- Extensibilitate pentru noi tipuri de business

### 3. **Singleton Pattern** - Instanța Serviciului
- O singură instanță `DataService` în întreaga aplicație
- Cache-ing automat al provider-ilor
- Acces global consistent

### 4. **Observer Pattern** - Observarea Schimbărilor de Date
- Componentele se abonează automat la schimbările de date
- Notificări în timp real când datele se modifică
- Decuplarea între sursa de date și componente

### 5. **Command Pattern** - Operațiuni de Date
- Operațiunile de date sunt încapsulate în comenzi
- Ușurință în testare și debugging
- Posibilitatea de a adăuga operațiuni noi

### 6. **Environment Configuration** - Configurația de Mediu
- `VITE_BUSINESS_TYPE` - determină automat tipul de business
- `VITE_TENANT_ID` - determină automat ID-ul tenant-ului (format: TN25-100000)
- Configurație automată la build pentru fiecare aplicație

## 📁 Structura

- `dataService.js` - Serviciul principal cu design patterns și configurația de mediu
- `useBusinessData.js` - Hook-uri React cu Observer, Command patterns și suport pentru mediu
- `DataServiceExample.jsx` - Componentă de exemplu pentru demonstrarea pattern-urilor și configurației
- `README.md` - Documentația completă

## 🌍 Configurația de Mediu

### Variabile de Mediu

```bash
# .env
VITE_BUSINESS_TYPE=hotel    # hotel, clinic, gym
VITE_TENANT_ID=TN25-100000  # Format: TN25-{tenant_number}
```

### Parsarea Configurației

```javascript
// Parsarea automată a business type-ului
const businessType = import.meta.env.VITE_BUSINESS_TYPE; // "hotel"

// Parsarea automată a tenant ID-ului (TN25-100000 -> 100000)
const tenantId = import.meta.env.VITE_TENANT_ID; // "TN25-100000" -> 100000
```

### Validarea Configurației

```javascript
// Validarea automată
const envConfig = getEnvironmentConfig();
console.log(envConfig.isValid); // true/false
console.log(envConfig.businessType); // "hotel"
console.log(envConfig.tenantId); // 100000
```

## 🚀 Utilizarea în Componente

### Hook-uri Bazate pe Mediu (Recomandate)

```javascript
import { 
    useCurrentBusinessData, 
    useCurrentHomeData, 
    useCurrentSettings,
    useCurrentDataByType,
    useCurrentBusinessConfig,
    useEnvironmentConfig 
} from '../hooks/useBusinessData.js';

// Folosește automat VITE_BUSINESS_TYPE și VITE_TENANT_ID
const MyComponent = () => {
    const { data, loading, error } = useCurrentBusinessData();
    const { data: heroData } = useCurrentDataByType('hero');
    const { data: settings } = useCurrentSettings();
    const envConfig = useEnvironmentConfig();

    if (loading) return <div>Se încarcă...</div>;
    if (error) return <div>Eroare: {error.message}</div>;

    return (
        <div>
            <h1>{data.homeData.locationData.hero.bussinesName}</h1>
            <p>Business Type: {envConfig.businessType}</p>
            <p>Tenant ID: {envConfig.tenantId}</p>
        </div>
    );
};
```

### Hook-uri cu Parametri Opționali

```javascript
import { useBusinessData, useDataByType, BUSINESS_TYPES } from '../hooks/useBusinessData.js';

// Folosește mediul dacă nu se specifică business type
const Component1 = () => {
    const { data } = useBusinessData(); // Folosește VITE_BUSINESS_TYPE
    const { data } = useDataByType(null, 'hero'); // Folosește VITE_BUSINESS_TYPE
};

// Override pentru business type specific
const Component2 = () => {
    const { data } = useBusinessData(BUSINESS_TYPES.HOTEL); // Override
    const { data } = useDataByType(BUSINESS_TYPES.CLINIC, 'hero'); // Override
};
```

### Hook-uri pentru Configurația de Mediu

```javascript
import { useEnvironmentConfig } from '../hooks/useBusinessData.js';

const ConfigComponent = () => {
    const envConfig = useEnvironmentConfig();

    return (
        <div>
            <h2>Environment Configuration</h2>
            <p>Business Type: {envConfig.businessType}</p>
            <p>Tenant ID: {envConfig.tenantId}</p>
            <p>Is Valid: {envConfig.isValid ? 'Yes' : 'No'}</p>
        </div>
    );
};
```

## 🏭 Factory Pattern - Utilizare Directă cu Mediu

```javascript
import dataService, { BUSINESS_TYPES } from '../services/dataService.js';

// Factory Pattern cu configurația de mediu
const currentProvider = dataService.getProvider(); // Folosește VITE_BUSINESS_TYPE
const hotelProvider = dataService.getProvider(BUSINESS_TYPES.HOTEL); // Override

// Fiecare provider are propria strategie și tenant ID
console.log('Current business type:', dataService.getCurrentBusinessType());
console.log('Current tenant ID:', dataService.getCurrentTenantId());
console.log('Hotel rooms:', hotelProvider.getRoomsData());
console.log('Clinic medics:', clinicProvider.getMedicsData());
```

## 🎯 Strategy Pattern - Extensibilitate cu Mediu

```javascript
// Adăugarea unui nou tip de business
class RestaurantDataProvider extends DataProviderStrategy {
    constructor(tenantId) {
        super(tenantId); // Primește tenant ID-ul din mediu
    }
    
    getHomeData() { 
        const data = { ...restaurantData };
        return this.updateTenantId(data); // Actualizează automat tenant ID-ul
    }
    
    getMenuData() { return menu; } // Metodă specifică pentru restaurant
}

// În factory
case BUSINESS_TYPES.RESTAURANT:
    return new RestaurantDataProvider(tenantId); // Tenant ID din mediu
```

## 🔄 Observer Pattern - Notificări Automate

```javascript
// Componentele se abonează automat la schimbări
const Component1 = () => {
    const { data } = useCurrentBusinessData(); // Folosește mediul
    return <div>{data?.homeData?.locationData?.hero?.bussinesName}</div>;
};

const Component2 = () => {
    const { data } = useCurrentBusinessData(); // Folosește mediul
    return <div>{data?.homeData?.businessType}</div>;
};

// Când datele se schimbă, ambele componente se actualizează automat
```

## ⚡ Command Pattern - Operațiuni de Date cu Mediu

```javascript
import { DataCommand, CommandInvoker } from '../hooks/useBusinessData.js';

// Crearea unei comenzi cu configurația de mediu
const command = new DataCommand('getCurrentDataByType', { 
    dataType: 'hero' // Nu trebuie business type, folosește mediul
});

// Executarea comenzii
const result = CommandInvoker.execute(command);

// Adăugarea unei comenzi noi
class CustomDataCommand extends DataCommand {
    execute() {
        // Implementare personalizată cu acces la configurația de mediu
        const envConfig = getEnvironmentConfig();
        return customDataOperation(this.params, envConfig);
    }
}
```

## 🏗️ Singleton Pattern - Instanța Unică cu Mediu

```javascript
import dataService from '../services/dataService.js';

// Aceeași instanță în toată aplicația cu configurația de mediu
const instance1 = dataService;
const instance2 = dataService;
console.log(instance1 === instance2); // true

// Configurația de mediu este partajată
console.log('Current business type:', dataService.getCurrentBusinessType());
console.log('Current tenant ID:', dataService.getCurrentTenantId());

// Cache-ing automat al provider-ilor cu tenant ID-ul din mediu
const provider1 = dataService.getProvider(); // Folosește mediul
const provider2 = dataService.getProvider(); // Folosește mediul
console.log(provider1 === provider2); // true
```

## 📊 Tipuri de Date Disponibile

### Pentru Hotel:
- `hero` - Datele secțiunii hero
- `locations` - Lista locațiilor
- `footer` - Datele footer-ului
- `facilities` - Facilitățile hotelului
- `attractions` - Atracțiile turistice
- `rooms` - Camerele disponibile
- `roomscalendar` - Calendarul camerelor

### Pentru Clinică:
- `hero` - Datele secțiunii hero
- `locations` - Lista locațiilor
- `footer` - Datele footer-ului
- `services` - Serviciile medicale
- `gallery` - Galeria de imagini
- `availabilitycalendar` - Calendarul de disponibilitate

### Pentru Sală de Fitness:
- `hero` - Datele secțiunii hero
- `locations` - Lista locațiilor
- `footer` - Datele footer-ului
- `facilities` - Facilitățile sălii
- `packages` - Pachetele disponibile
- `classes` - Clasele disponibile

## 🔧 Funcții Directe din DataService

```javascript
import dataService, { 
    getCurrentBusinessData,
    getCurrentHomeData,
    getCurrentDataByType,
    getCurrentSettings,
    getCurrentBusinessConfig,
    getCurrentTenantId,
    getCurrentBusinessType,
    getEnvironmentConfig
} from '../services/dataService.js';

// Funcții pentru business-ul curent (folosesc mediul)
const allData = getCurrentBusinessData();
const homeData = getCurrentHomeData();
const heroData = getCurrentDataByType('hero');
const settings = getCurrentSettings();
const config = getCurrentBusinessConfig();

// Funcții pentru configurația de mediu
const tenantId = getCurrentTenantId();
const businessType = getCurrentBusinessType();
const envConfig = getEnvironmentConfig();

// Funcții cu override pentru business type specific
const hotelData = getAllBusinessData(BUSINESS_TYPES.HOTEL);
const clinicHero = getDataByType(BUSINESS_TYPES.CLINIC, 'hero');
```

## 🧪 Testarea Design Patterns și Configurației

```javascript
import DataServiceExample from '../components/DataServiceExample.jsx';

// În componenta principală
<DataServiceExample />

// Testarea directă în consolă
console.log('Environment Test:', dataService.getEnvironmentConfig());
console.log('Current Business Type:', dataService.getCurrentBusinessType());
console.log('Current Tenant ID:', dataService.getCurrentTenantId());
console.log('Factory Test:', dataService.getAvailableBusinessTypes());
console.log('Strategy Test:', dataService.getProvider());
console.log('Singleton Test:', dataService === dataService);
```

## 🎯 Avantajele Design Patterns + Environment Configuration

### 1. **Configurație Automată**
- Fiecare build primește automat `VITE_BUSINESS_TYPE` și `VITE_TENANT_ID`
- Nu este nevoie de configurare manuală în cod
- Tenant ID-ul este actualizat automat în toate datele

### 2. **Extensibilitate**
- Adăugarea de noi tipuri de business fără modificarea codului existent
- Implementarea de noi strategii pentru date
- Suport pentru noi variabile de mediu

### 3. **Mentenabilitate**
- Codul este organizat în clase și module clare
- Separarea responsabilităților
- Configurația centralizată în variabile de mediu

### 4. **Testabilitate**
- Fiecare pattern poate fi testat independent
- Mock-uri ușoare pentru teste
- Configurația de mediu poate fi testată separat

### 5. **Performanță**
- Cache-ing automat al provider-ilor
- Observer pattern pentru actualizări eficiente
- Singleton pentru consistență

### 6. **Flexibilitate**
- Schimbarea strategiilor la runtime
- Comenzi pentru operațiuni complexe
- Override pentru business type specific

## 📝 Configurația Build-ului

### Package.json Scripts

```json
{
  "scripts": {
    "build:hotel": "VITE_BUSINESS_TYPE=hotel VITE_TENANT_ID=TN25-100000 vite build",
    "build:clinic": "VITE_BUSINESS_TYPE=clinic VITE_TENANT_ID=TN25-200000 vite build",
    "build:gym": "VITE_BUSINESS_TYPE=gym VITE_TENANT_ID=TN25-300000 vite build",
    "dev:hotel": "VITE_BUSINESS_TYPE=hotel VITE_TENANT_ID=TN25-100000 vite",
    "dev:clinic": "VITE_BUSINESS_TYPE=clinic VITE_TENANT_ID=TN25-200000 vite",
    "dev:gym": "VITE_BUSINESS_TYPE=gym VITE_TENANT_ID=TN25-300000 vite"
  }
}
```

### .env Files

```bash
# .env.hotel
VITE_BUSINESS_TYPE=hotel
VITE_TENANT_ID=TN25-100000

# .env.clinic
VITE_BUSINESS_TYPE=clinic
VITE_TENANT_ID=TN25-200000

# .env.gym
VITE_BUSINESS_TYPE=gym
VITE_TENANT_ID=TN25-300000
```

## 📝 Note Importante

1. **Configurația de Mediu**: Sistemul citește automat `VITE_BUSINESS_TYPE` și `VITE_TENANT_ID` din variabilele de mediu.

2. **Validarea Configurației**: Sistemul validează automat configurația și oferă fallback-uri pentru cazurile de eroare.

3. **Tenant ID Parsing**: Formatul `TN25-100000` este parsat automat pentru a extrage ID-ul numeric.

4. **Hook-uri Recomandate**: Folosiți hook-urile `useCurrent*` pentru utilizarea automată a configurației de mediu.

5. **Override Capability**: Puteți overrida configurația de mediu prin specificarea explicită a business type-ului.

6. **Error Handling**: Erorile de configurație sunt gestionate automat și returnate în starea hook-ului.

7. **Observer Pattern**: Componentele se abonează automat la schimbările de date și se actualizează când datele se modifică.

8. **Command Pattern**: Operațiunile de date sunt încapsulate în comenzi pentru o mai bună organizare.

9. **Singleton Pattern**: O singură instanță a serviciului în toată aplicația pentru consistență.

10. **Factory Pattern**: Provider-ii sunt creați automat prin factory pentru extensibilitate.

11. **Strategy Pattern**: Fiecare tip de business are propria strategie pentru accesarea datelor.

12. **Environment Configuration**: Configurația automată bazată pe variabilele de mediu pentru fiecare build. 