import { library } from '@fortawesome/fontawesome-svg-core';
import {
 
  faIconName1, 
  faIconName2,
  faHouse,
  faHeart,
  faCircleUser,
  faBars,
  faFile,
  faEnvelope,
  faChevronLeft,
  faChevronRight,
  faTimes, // Change from "faX" to "faTimes"
} from '@fortawesome/free-solid-svg-icons';

import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(
  faIconName1, 
  faIconName2,
  faHouse,
  faHeart,
  faCircleUser,
  faBars,
  faFile,
  faEnvelope,
  faTimes, // Use "faTimes" instead of "faX"
);

library.add(faGithub, faLinkedin, faTwitter);
