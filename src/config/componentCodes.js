import { HeroVariant1 } from '../components/Hero';
import { FeaturesVariant1, FeaturesVariant2 } from '../components/Features';
import { DescriptionVariant1 } from '../components/Description';
import { PackagesVariant1 } from '../components/Packages';
import { ClassesVariant1 } from '../components/Classes';
import { ClassesVariant2 } from '../components/Classes/ClassesVariant2';
import FooterVariant1 from '../components/Footer/FooterVariant1';
import ClinicStatsVariant1 from '../components/ClinicStats/ClinicStatsVariant1';
import GalleryVariant1 from '../components/Gallery/GalleryVariant1';
import RoomsVariant1 from '../components/Rooms/RoomsVariant1';
import AttractionsVariant1 from '../components/Attractions/AttractionsVariant1';
import EndInfo from '../components/EndInfo/EndInfo';

// Mapare coduri componente
export const COMPONENT_CODES = {
  // Hero variants
  11: HeroVariant1,

  // Features variants
  21: FeaturesVariant1,
  22: FeaturesVariant2,

  // Gallery variants
  31: GalleryVariant1,

  // Description variants
  61: DescriptionVariant1,

  // Packages variants
  44: PackagesVariant1,

  // Classes variants
  51: ClassesVariant1,
  52: ClassesVariant2,

  // Footer variants
  71: FooterVariant1,

  // Clinic Stats variants
  81: ClinicStatsVariant1,

  // End Info variants
  92: EndInfo,

  // Rooms variants
  101: RoomsVariant1,

  // Attractions variants
  111: AttractionsVariant1,
}; 