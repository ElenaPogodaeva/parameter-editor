import './App.css';
import React from 'react';

type T = string | number;

interface Param {
  id: number;
  name: string;
  type: T;
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Color {
  color: string;
}
interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}

const initParams = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string',
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string',
  },
];

const initModel = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],
  colors: [],
};

type AppProps = Record<string, never>;

type AppState = {
  params: Param[];
  model: Model;
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      params: initParams,
      model: initModel,
    };
  }

  render() {
    return <ParamEditor params={this.state.params} model={this.state.model} />;
  }
}

export default App;
