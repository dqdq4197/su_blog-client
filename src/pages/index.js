import 'semantic-ui-css/semantic.min.css';

import JavascriptTimeAgo from 'javascript-time-ago';
import withSplitting from '../lib/withSplitting';
import ko from 'javascript-time-ago/locale/ko';
 
// Initialize the desired locales.
JavascriptTimeAgo.locale(ko)

export const About = withSplitting(() => import('./About'));
export { default as Login } from './Login';
export { default as Home } from './Home';
export { default as Board} from './Board';
export { default as Signup} from './Signup';
export { default as Poster} from './Poster';
export { default as Search} from './Search';
export { default as PosterModal} from './PosterModal';
export { default as TagList} from './TagList';
export { default as OneTag} from './OneTag';
export { default as Setting} from './Setting';
export { default as SocialLogin} from './SocialLogin';
export { default as NotFound} from './NotFound';