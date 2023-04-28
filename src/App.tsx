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

// ParamEditor Component

type State = Record<string, never>;

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getModel = this.getModel.bind(this);
  }

  public getModel() {
    console.log(this.props.model);
  }

  render() {
    return (
      <div className="container">
        <h2 className="title">Параметры</h2>
        <form className="form">
          {this.props.params &&
            this.props.params.map((param) => (
              <label className="label" key={param.id}>
                <p>{param.name}</p>
                <input
                  type="text"
                  className="input"
                  value={
                    this.props.model.paramValues.find((item) => item.paramId === param.id)?.value
                  }
                />
              </label>
            ))}
          <button onClick={this.getModel}></button>
        </form>
      </div>
    );
  }
}

// App Component

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
