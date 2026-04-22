import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

function App() {
  return (
    <div className="h-screen flex">

      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 p-4">
        Sidebar
      </div>

      {/* Canvas */}
      <div className="w-3/5 h-full">
        <ReactFlow>
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {/* Config Panel */}
      <div className="w-1/5 bg-gray-50 p-4">
        Config Panel
      </div>

    </div>
  );
}

export default App;