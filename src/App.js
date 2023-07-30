import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import Clock from './components/Clock';

function App() {
  return (
    <NextUIProvider>
      <Clock />
    </NextUIProvider>
  );
}

export default App;
