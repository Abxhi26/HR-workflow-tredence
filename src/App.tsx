import Sidebar from "./components/sidebar/Sidebar";
import WorkflowCanvas from "./components/canvas/WorkflowCanvas";
import NodeConfigPanel from "./components/forms/NodeConfigPanel";
import SimulationPanel from "./components/sandbox/SimulationPanel";

function App() {
  return (
    <div className="h-screen w-screen flex bg-gray-900 text-white overflow-hidden">

      {/* LEFT SIDEBAR */}
      <div className="w-[220px] min-w-[220px] bg-gray-800 border-r border-gray-700 p-4">
        <Sidebar />
      </div>

      {/* CANVAS */}
      <div className="flex-1 h-full relative">
        <WorkflowCanvas />
      </div>

      {/* RIGHT PANEL */}
      <div className="w-[300px] min-w-[300px] bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto space-y-4">
        <NodeConfigPanel />
        <SimulationPanel />
      </div>

    </div>
  );
}

export default App;