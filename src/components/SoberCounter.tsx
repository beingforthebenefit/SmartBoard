import React, { useEffect, useMemo, useState } from 'react';
import { Text, Grid, Card } from '@nextui-org/react';

const SoberCounter = () => {
  const soberDate = useMemo(() => new Date('2022-07-19 22:57:00'), []);
  const [timePassed, setTimePassed] = useState(Date.now() - soberDate.getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimePassed(Date.now() - soberDate.getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [soberDate]);

  const seconds = Math.floor(timePassed / 1000) % 60;
  const minutes = Math.floor(timePassed / (1000 * 60)) % 60;
  const hours = Math.floor(timePassed / (1000 * 60 * 60)) % 24;
  const days = Math.floor(timePassed / (1000 * 60 * 60 * 24));

  return (
    <div>
      <Text h3 style={{textAlign: 'center'}}>Sober Time</Text>
      <Grid.Container gap={2} justify="center">
        <Grid xs={24} sm={3}>
          <Card>
            <Text h4 style={{textAlign: 'center'}}>{days}</Text>
            <Text style={{textAlign: 'center'}}>Days</Text>
          </Card>
        </Grid>
        <Grid xs={24} sm={3}>
          <Card>
            <Text h4 style={{textAlign: 'center'}}>{hours}</Text>
            <Text style={{textAlign: 'center'}}>Hours</Text>
          </Card>
        </Grid>
        <Grid xs={24} sm={3}>
          <Card>
            <Text h4 style={{textAlign: 'center'}}>{minutes}</Text>
            <Text style={{textAlign: 'center'}}>Minutes</Text>
          </Card>
        </Grid>
        <Grid xs={24} sm={3}>
          <Card>
            <Text h4 style={{textAlign: 'center'}}>{seconds}</Text>
            <Text style={{textAlign: 'center'}}>Seconds</Text>
          </Card>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default SoberCounter;
