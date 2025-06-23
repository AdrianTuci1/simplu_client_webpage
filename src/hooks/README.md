# Business Data Hooks

Această colecție de hooks React oferă o interfață modulară și ușor de utilizat pentru gestionarea datelor de business, folosind design patterns precum Observer și Command.

## Structura

```
src/hooks/
├── patterns/           # Design patterns
│   ├── DataStateObserver.js
│   └── DataCommand.js
├── utils/              # Utilitare reutilizabile
│   └── hookUtils.js
├── business/           # Hook principal pentru business data
│   └── useBusinessData.js
├── current/            # Hooks pentru datele curente (environment)
│   └── useCurrentData.js
├── specific/           # Hooks pentru tipuri specifice de date
│   └── useSpecificData.js
├── entities/           # Hooks pentru entități specifice
│   └── useEntityData.js
├── config/             # Hooks pentru configurație
│   └── useEnvironmentConfig.js
├── __tests__/          # Teste
│   ├── patterns/
│   ├── utils/
│   └── business/
└── index.js            # Export principal
```

## Design Patterns

### Observer Pattern (DataStateObserver)
Gestionează subscripțiile și notificările pentru schimbările de date.

```javascript
import { dataObserver } from './hooks/patterns/DataStateObserver.js';

// Subscribe to data changes
const unsubscribe = dataObserver.subscribe('my-data-id', (newData) => {
    console.log('Data changed:', newData);
});

// Notify subscribers
dataObserver.notify('my-data-id', { new: 'data' });

// Unsubscribe
unsubscribe();
```

### Command Pattern (DataCommand)
Encapsulează operațiunile de date ca obiecte.

```javascript
import { DataCommand, CommandInvoker } from './hooks/patterns/DataCommand.js';

const command = new DataCommand('getHomeData', { businessType: 'hotel' });
const result = CommandInvoker.execute(command);
```

## Hooks Principale

### useBusinessData
Hook principal pentru accesarea datelor de business.

```javascript
import { useBusinessData } from './hooks';

const MyComponent = () => {
    const { data, loading, error, refresh, isValidBusinessType, businessType } = useBusinessData('hotel', {
        autoLoad: true,
        dataType: 'attractions',
        locationId: 123
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

    return (
        <div>
            <h1>Business Type: {businessType}</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <button onClick={refresh}>Refresh</button>
        </div>
    );
};
```

### Hooks pentru Datele Curente
Folosesc configurația din environment.

```javascript
import { 
    useCurrentBusinessData, 
    useCurrentHomeData, 
    useCurrentSettings 
} from './hooks';

// Folosește business type-ul din environment
const { data, loading, error } = useCurrentBusinessData();
const { data: homeData } = useCurrentHomeData();
const { data: settings } = useCurrentSettings();
```

### Hooks pentru Tipuri Specifice

```javascript
import { 
    useHomeData, 
    useSettings, 
    useBusinessConfig, 
    useDataByType, 
    useLocationData 
} from './hooks';

// Date specifice pentru un business type
const { data: homeData } = useHomeData('hotel');
const { data: settings } = useSettings('clinic');
const { data: config } = useBusinessConfig('gym');

// Date specifice după tip
const { data: attractions } = useDataByType('hotel', 'attractions');

// Date pentru o locație specifică
const { data: locationData } = useLocationData('hotel', 123);
```

### Hooks pentru Entități

```javascript
import { 
    useAttractions, 
    useFacilities, 
    useServices, 
    useRooms 
} from './hooks';

// Hooks specializate pentru entități
const { data: attractions } = useAttractions('hotel');
const { data: facilities } = useFacilities('hotel');
const { data: services } = useServices('clinic');
const { data: rooms } = useRooms('hotel');
```

### Hook pentru Configurația de Environment

```javascript
import { useEnvironmentConfig } from './hooks';

const MyComponent = () => {
    const config = useEnvironmentConfig();
    
    if (!config) return <div>Loading config...</div>;
    
    return (
        <div>
            <p>Current Business Type: {config.businessType}</p>
            <p>Environment: {config.environment}</p>
        </div>
    );
};
```

## Utilitare

### useDataState
Hook utilitar pentru gestionarea stării datelor cu pattern Observer.

```javascript
import { useDataState } from './hooks/utils/hookUtils.js';

const MyCustomHook = () => {
    const loadData = async () => {
        // Custom data loading logic
        return await fetch('/api/data');
    };

    return useDataState('my-data-id', loadData, true, []);
};
```

### Funcții Utilitare

```javascript
import { 
    createObserverId, 
    validateBusinessType, 
    getTargetBusinessType,
    createDataCommand,
    executeDataCommand 
} from './hooks/utils/hookUtils.js';

// Creează ID pentru observer
const observerId = createObserverId('hotel', 'attractions', 123);

// Validează business type
const isValid = validateBusinessType('hotel'); // true

// Obține business type target (cu fallback la environment)
const targetType = getTargetBusinessType('hotel'); // 'hotel'
const envType = getTargetBusinessType(); // din environment

// Creează și execută comenzi
const command = createDataCommand('getHomeData', { businessType: 'hotel' });
const result = executeDataCommand('getHomeData', { businessType: 'hotel' });
```

## Testare

Fiecare modul are teste dedicate:

```bash
# Teste pentru patterns
npm test src/hooks/__tests__/patterns/

# Teste pentru utilitare
npm test src/hooks/__tests__/utils/

# Teste pentru hooks de business
npm test src/hooks/__tests__/business/
```

## Avantaje ale Structurii Modulare

1. **Separarea Responsabilităților**: Fiecare fișier are o responsabilitate specifică
2. **Reutilizabilitate**: Utilitarele pot fi folosite în multiple hooks
3. **Testabilitate**: Fiecare modul poate fi testat independent
4. **Mentenabilitate**: Codul este mai ușor de înțeles și modificat
5. **Extensibilitate**: Ușor de adăugat noi hooks sau funcționalități
6. **Documentație**: Fiecare modul este bine documentat

## Migrarea de la Hook-ul Original

Pentru a migra de la hook-ul original `useBusinessData.js`, înlocuiește importurile:

```javascript
// Înainte
import { useBusinessData } from './hooks/useBusinessData.js';

// După
import { useBusinessData } from './hooks/index.js';
// sau
import { useBusinessData } from './hooks/business/useBusinessData.js';
```

Toate funcționalitățile rămân compatibile, dar acum sunt organizate într-o structură modulară și mai ușor de gestionat. 