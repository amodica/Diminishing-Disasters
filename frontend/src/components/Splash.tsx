import '../styles/Splash.css'
import {Button, Card, Container, Row, Col} from 'react-bootstrap'

const Splash = () => {
    return (
    <div className="Splash">
       <Row>
                <div className="col-lg-12 text-center">
                    <h2 className="section-heading text-uppercase">Diminishing Disasters</h2>
                    <h3 className="section-subheading text-muted">Learn more about disasters going on around the world and the organizations dedicated to supporting relief efforts</h3>
                </div>
        </Row>
       <div className='bg'>
    
       </div>
       
        <Container>
            <Row>
                <Col>
                    <Card className='text-center' 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100%',
                            padding: '15px', 
                            borderRadius: '20px',
                            boxShadow: '0px 5px 15px 0px rgb(0 0 0 / 20%)'
                        }}>
                        <h4 className="col-lg-12 text-center">Countries</h4>
                        <a href="/countries">
                        <img src={ require('../images/worldmap.jpg')} className='img' alt=""></img>
                        </a>
                        <Button href="/countries">Learn more about countries where disasters are happening </Button>
                    </Card>
                </Col>
                <Col>
                    <Card className='text-center' 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100%',
                            padding: '15px', 
                            borderRadius: '20px',
                            boxShadow: '0px 5px 15px 0px rgb(0 0 0 / 20%)'
                        }}>
                        <h4 className="col-lg-12 text-center">Disasters</h4>
                        <a href="/disasters">
                        <img src={ require('../images/disasters.jpg')} className='img' alt=""></img>
                        </a>
                        <Button href="/disasters">Learn more about current and past disasters</Button>
                    </Card>
                </Col>
                <Col>
                    <Card className='text-center' 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100%',
                            padding: '15px', 
                            borderRadius: '20px',
                            boxShadow: '0px 5px 15px 0px rgb(0 0 0 / 20%)'
                        }} >
                        <h4 className="col-lg-12 text-center">International Organizations</h4>
                        <a href="/organizations">
                        <img src={ require('../images/orgs.jpg')} className='img' alt=""></img>
                        </a>
                        <Button href="/organizations">Learn more about organizations dedicated to disaster relief</Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    </div>
    );
}

export default Splash;