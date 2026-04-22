import Sidebar from "./components/sidebar/Sidebar";
import WorkflowCanvas from "./components/canvas/WorkflowCanvas";
import NodeConfigPanel from "./components/forms/NodeConfigPanel";

function App() {
  return (
    <div className="h-screen flex">

      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 p-4 border-r">
        <Sidebar />
      </div>

      {/* Canvas */}
      <div className="w-3/5 h-full">
        <WorkflowCanvas />
      </div>

      {/* Config Panel */}
      <div className="w-1/5 bg-gray-50 p-4 border-l">
        <NodeConfigPanel />
      </div>

    </div>
  );
}

export default App;