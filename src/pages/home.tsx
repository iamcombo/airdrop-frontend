import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { BackTop, Button, Col, Collapse, Form, Input, Row } from 'antd';
import { CaretUpOutlined } from '@ant-design/icons';
import onSubmit from '../utils/submit';
import Spinner from '../components/Spinner';
import ModalHowto from '../components/ModalHowto';
import info from '../assets/info.svg';
import facebook from '../assets/facebook.png';
import telegram from '../assets/telegram.png';
import { useNavigate } from 'react-router-dom';

const { Panel } = Collapse;

const Home = () => {
  let navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);
  const [submitAble, setSubmitAble] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [wallet, setWallet] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onShareClick = async() => {
    if (navigator.share) {
      try {
        await navigator
          .share({
            url: 'https://www.facebook.com/khnearguild/posts/pfbid0fHuAt49ANTXzRvWNWiowk8PiNj69AwTg4AvXNz14gaMNDLAFjwJCGj4XSYMATHbql',
            title: 'hello world',
            text: 'hello world'
          })
          .then(() =>
            console.log("Hooray! Your content was shared to tha world")
          );
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      // fallback code
      // console.log(
      //   alert('web share is not supported'),
      //   "Web share is currently not supported on this browser. Please provide a callback"
      // );
      window.FB.ui({
        method: 'share',
        link: 'https://www.facebook.com/khnearguild/posts/pfbid0fHuAt49ANTXzRvWNWiowk8PiNj69AwTg4AvXNz14gaMNDLAFjwJCGj4XSYMATHbql',
        href: 'https://www.facebook.com/khnearguild/posts/pfbid0fHuAt49ANTXzRvWNWiowk8PiNj69AwTg4AvXNz14gaMNDLAFjwJCGj4XSYMATHbql',
        hashtag: '#KHNEAR',
      }, function(res: any) {})
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({email, wallet});
    toast.success('Congratulations, Thank you for joining our airdrop program!')
    setEmail('');
    setWallet('');
    setLoading(false);
    localStorage.setItem('submitAble', 'false');
    navigate('/success');
  }

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId            : '593326535761123',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v14.0'
      });
    };
    (function (d, s, id) {
      var js: any, fjs: any = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <div className='home__container'>
      <div className='spacing' />
      <h1>KHNEAR Airdrop 🚀</h1>
      <p>KHNEAR is a chapter of the NEAR.org, a decentralized autonomous organization (DAO). KHNEAR is built with a mission to support and encourage the use of the NEAR Protocol, as well as educate people about Layer 1 blockchain, with the aim of promoting the creative and technological industries of Cambodia.</p>
      <p>To celibrate our first official grand launch event We want onborading new wallet buy providing an airdrop to new wallet with very simple step.</p>
      <div className='home__bgStep'>
        <h3>3 Step To Get Airdrop</h3>
      </div>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className="site-collapse-custom-collapse"
      >
        <Panel header="Step 1: Join @KHNEAR Community on Telegram" key="1" className="site-collapse-custom-panel">
          <Row justify='center'>
            <button className='button-50'>
              <a style={{color: 'inherit'}} href='https://t.me/khnear' target='_blank' rel="noreferrer">
                <Row gutter={[8,8]} align='middle'>
                  <Col>
                    <img src={telegram} alt='' height={20} />
                  </Col>
                  <Col>
                    <span>Join Community</span>
                  </Col>
                </Row>
              </a>
            </button>
          </Row>
        </Panel>
        <Panel header="Step 2: Share post on Facebook" key="2" className="site-collapse-custom-panel">
          <Row justify='center'>
            <button className='button-50' onClick={onShareClick}>
              <Row gutter={[8,8]} align='middle'>
                <Col>
                  <img src={facebook} alt='' height={20} />
                </Col>
                <Col>
                  <span>Share to Facebook</span>
                </Col>
              </Row>
            </button>
          </Row>
        </Panel>
        <Panel 
          header={
            <Row justify='space-between'>
              <Col><span>Step 3: Submit Your Wallet Address</span></Col>
              <Col><img onClick={()=> setVisible(!visible)} src={info} alt='' width={20} /></Col>
            </Row>
          } 
          key="3" 
          className="site-collapse-custom-panel"
        >
          <div>
            <Form layout='vertical'>
              <Form.Item label='Email Address:'>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} size='large' placeholder='piset@khnear.org' />
              </Form.Item>
              <Form.Item label='Wallet Address:'>
                <Input value={wallet} onChange={(e) => setWallet(e.target.value)} size='large' placeholder='7faf682b....' />
              </Form.Item>
              <Form.Item>
                { submitAble ?
                  <button onClick={handleSubmit} style={{width: '100%'}} className='button-50'>
                    <Row gutter={[8,8]} justify='center'>
                      <Col>{ loading && <Spinner /> }</Col>
                      <Col><span>Submit</span></Col>
                    </Row>
                  </button>
                  :
                  <Button disabled={true} block size='large'>Submit</Button>
                }
              </Form.Item>
            </Form>
          </div>
        </Panel>
      </Collapse>

      <ModalHowto />
      <BackTop>
        <Button shape='round' size='large'>
          <CaretUpOutlined />
        </Button>
      </BackTop>
    </div>
  )
}

export default Home;