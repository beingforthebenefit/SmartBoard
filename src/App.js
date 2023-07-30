import './App.css';
import { Grid, NextUIProvider, Spacer, Col } from '@nextui-org/react';
import Clock from './components/Clock';
import Weather from './components/Weather';

function App() {
  return (
    <NextUIProvider>
      <Grid.Container gap={2} justify="center">
        <Col span={6} justify="center">
          <Clock />
        </Col>
        <Col span={6}>
          <Weather />
        </Col>
        <Col span={12}>
          <Spacer y={30} />
        </Col>
      </Grid.Container>
    </NextUIProvider>
  );
}

export default App;
