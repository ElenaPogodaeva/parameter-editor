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
  onParamChange: (id: number, value: string) => void;
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
    this.handleChange = this.handleChange.bind(this);
    this.getModel = this.getModel.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>, id: number): void {
    const { value } = event.target;
    this.props.onParamChange(id, value);
  }

  getModel() {
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
                  onChange={(e) => this.handleChange(e, param.id)}
                />
              </label>
            ))}
          <button type="submit"></button>
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
    this.handleParamChange = this.handleParamChange.bind(this);
  }

  handleParamChange(id: number, value: string): void {
    this.setState((prevState: AppState) => ({
      model: {
        ...prevState.model,
        paramValues: [
          ...prevState.model.paramValues.filter((item) => item.paramId !== id),
          {
            paramId: id,
            value: value,
          },
        ],
      },

      // model: {
      //   ...prevState.model,
      //   paramValues: [
      //     ...prevState.model.paramValues.map((item) => {
      //       if (item.paramId === id) {
      //         item.value = value;
      //       }
      //       return item;
      //     })
      //   ]
      // }
    }));
  }

  render() {
    return (
      <ParamEditor
        params={this.state.params}
        model={this.state.model}
        onParamChange={this.handleParamChange}
      />
    );
  }
}

export default App;
