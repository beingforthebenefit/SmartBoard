import './App.css';
import { Grid, NextUIProvider, Spacer, Col } from '@nextui-org/react';
import Clock from './components/Clock';
import Weather from './components/Weather';
import BackgroundImage from './components/BackgroundImage';

const imageUrls = [
  'https://upload.wikimedia.org/wikipedia/commons/8/8d/Frog_on_palm_frond.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/3/3b/Downtown_Chicago_Marina_City_CornCob_Sky_Scrapers.jpg',
  'https://i.insider.com/6340783eb3e94d0019781b4e?width=1300&format=jpeg&auto=webp',
];
const imageInterval = 5; // change image every 5 minutes

function App() {
  return (
    <NextUIProvider>
      <BackgroundImage imageUrls={imageUrls} interval={imageInterval} />
      <Grid.Container gap={2} justify="center">
        <Col span={6} justify="center">
          <Clock />
        </Col>
        <Col span={6}>
          <Weather />
        </Col>
      </Grid.Container>
    </NextUIProvider>
  );
}

export default App;
