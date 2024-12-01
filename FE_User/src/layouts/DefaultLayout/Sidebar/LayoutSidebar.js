
import styles from './Sidebar.module.scss';
import classNames from "classnames/bind";
import Menu, {MenuItem} from './Menu'
import config from '~/config';
const cx = classNames.bind(styles);

function Sidebar() {
  return (

  <Menu className={cx('wrapper')}>
    <MenuItem title="For your" to={config.routes.home} icon={<i className="fa-solid fa-house"></i>}/>
    <MenuItem title="Following" to={config.routes.following} icon={<i className="fa-solid fa-users"></i>}/>
    <MenuItem title="Message" to={config.routes.message} icon={<i className="fa-solid fa-message"></i>}/>

  </Menu>

)
}

export default Sidebar;
