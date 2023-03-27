import classNames from 'classnames/bind';
import styles from './LayoutWithSidebar.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../components/Header';

const cx = classNames.bind(styles);

function LayoutWithSidebar({ children, sidebar, col1md = 3, col2md = 9}) {
    
    return (
        <div>
            <Header />
            <Container fluid className='layout-container'>
                <Row className='inner-layout'>
                    <Col md={col1md}>{sidebar}</Col>
                    <Col md={col2md}>{children}</Col>
                </Row>
            </Container>
        </div>
    );
}

export default LayoutWithSidebar;
