import React, { useState } from 'react';
import { Grid, Header, Form, Segment } from 'semantic-ui-react';

const App: React.FC = () => {
  const [translit, setTranslit] = useState('');
  const [cyrillic, setCyrillic] = useState('');

  const t2c = {};

  const translitToCyrillic = (s: string): string => {
    return s.toUpperCase();
  };

  const cyrillcToTranslit = (s: string): string => {
    return s.toLowerCase();
  };

  const handleChange = (e: any, data: any): void => {
    const name: string = data.name;
    const value: string = data.value;
    if (name === 'translit') {
      setTranslit(value);
      setCyrillic(translitToCyrillic(value));
    } else {
      setCyrillic(value);
      setTranslit(cyrillcToTranslit(value));
    }
  };
  return (
    <Grid>
      <Grid.Column width={8}>
        <Segment>
          <Header>Translit</Header>
          <Form>
            <Form.TextArea
              name='translit'
              rows={16}
              placeholder='Translit'
              value={translit}
              onChange={handleChange}
            />
          </Form>
        </Segment>
      </Grid.Column>
      <Grid.Column width={8}>
        <Segment>
          <Header>Cyrillic</Header>
          <Form>
            <Form.TextArea
              name='cyrillic'
              rows={16}
              placeholder='Cyrillic'
              value={cyrillic}
              onChange={handleChange}
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default App;
