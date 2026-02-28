import ToolList from "./Components/ToolList/ToolList";
import "./index.css";

export function App() {
  return (
    <div className="app">
      <h1>KAI-Tools</h1>
      <p>
        CRUD KAI tools
      </p>
      <ToolList />

    </div>
  );
}

export default App;
