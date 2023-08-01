import './App.css';
import { Grid, NextUIProvider, Col, Row, Divider } from '@nextui-org/react';
import Clock from './components/Clock';
import Weather from './components/Weather';
import BackgroundImage from './components/BackgroundImage';
import SoberCounter from './components/SoberCounter';
import Calendar from './components/Calendar';
import { TopGradient, BottomGradient } from './components/Gradients';

const imageUrls = [
  'https://upload.wikimedia.org/wikipedia/commons/8/8d/Frog_on_palm_frond.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/3/3b/Downtown_Chicago_Marina_City_CornCob_Sky_Scrapers.jpg',
  'https://i.insider.com/6340783eb3e94d0019781b4e?width=1300&format=jpeg&auto=webp',
];
const imageInterval = .1; // change image every 5 minutes
const icsUrls = [
  "https://p55-caldav.icloud.com/published/2/MTAwMTA1MDY5OTEwMDEwNcR_tgzPDCleovZiKwbmEvqLNmZR2Q-8uMi3IcW12_UH",
  "https://p40-caldav.icloud.com/published/2/Mjc4NDM4OTA3Mjc4NDM4OYtGMLx1oo-hpjvxzsl8_VcgsVNXw4ETUlzBSsVLaG9u_nqSNqTBLJo3W2DiyRgi-2B2DgS80R1FUz-CSGuOylI"
];

function App() {
  return (
    <NextUIProvider>
      <TopGradient />
      <BackgroundImage imageUrls={imageUrls} interval={imageInterval} />
      <Grid.Container direction="column" justify="space-between" style={{height: "100vh"}}>
        <Row>
          <Col span={6}>
            <Clock />
            <Divider y={2} />
            <SoberCounter />
          </Col>
          <Col span={6}>
            <Weather />
          </Col>
        </Row>
        <Row>
          <Col>
            <Calendar icsUrls={icsUrls} />
          </Col>
        </Row>
      </Grid.Container>
      <BottomGradient />
    </NextUIProvider>
  );
}

export default App;
