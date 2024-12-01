import Header from "./Header/LayoutHeader";
// import Sidebar from "./Sidebar/LayoutSidebar";
import styles from './DefaultLayout.module.scss'
import classNames from "classnames/bind";
import { Container, Col } from 'react-bootstrap';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header className={cx('header')}/>
      <Container fluid className={cx('main-container')}>
    
          <Col  className={cx('content')}>
            {children}
          </Col>
 
      </Container>
    </div>
  );
}

export default DefaultLayout;
