import type { SvgIconComponent } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

import type { IconName, SocialIconName } from '@/types';

/** Content icons, keyed by the `icon` field used in `src/data/db.json`. */
export const iconRegistry: Record<IconName, SvgIconComponent> = {
  code: CodeIcon,
  school: SchoolIcon,
  video: MovieCreationIcon,
  vision: VisibilityIcon,
  rocket: RocketLaunchIcon,
  laptop: LaptopMacIcon,
  book: MenuBookIcon,
  ai: SmartToyIcon,
  email: MailOutlineIcon,
  location: LocationOnOutlinedIcon,
};

/** Social network icons used by the footer. */
export const socialIconRegistry: Record<SocialIconName, SvgIconComponent> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
};
