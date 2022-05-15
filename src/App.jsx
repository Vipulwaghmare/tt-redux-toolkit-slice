import Counter from "components/Counter";
import Employee from "components/Employee";
import ToDo from "components/Todo";
import { useSelector } from "react-redux";
import "./styles.scss";

const App = () => {
  const state = useSelector((state) => state);
  console.log({ state });
  return (
    <div className="app">
      <h1>Redux Toolkit</h1>
      <Counter />
      <ToDo />
      <Employee />
    </div>
  );
};

export default App;
