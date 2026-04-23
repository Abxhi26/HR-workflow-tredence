# HR Workflow Designer

## Live Demo

https://hr-workflow-vert.vercel.app

---

## Overview

A visual workflow builder that allows HR teams to design, configure, and simulate internal workflows such as onboarding, approvals, and automated processes.

This project demonstrates strong frontend engineering concepts including graph-based UI design, dynamic forms, and state management.

---

## Key Features

### Workflow Builder

* Drag and drop nodes onto canvas
* Connect nodes with edges
* Zoom, pan, and MiniMap support
* Real-time node updates

### Node Configuration Panel

* Dynamic forms based on node type
* Controlled inputs with live updates
* Clean state management using Zustand

### Supported Node Types

**Start Node**

* Start Title

**Task Node**

* Title (required)
* Description
* Assignee
* Due Date

**Approval Node**

* Title
* Approver Role
* Auto-approve Threshold

**Automation Node**

* Title
* Select action from API
* Dynamic parameters based on action

**End Node**

* End Message
* Summary flag

---

## Automation API (Mock)

Returns available automation actions:

* Send Email → params: `to`, `subject`
* Generate Document → params: `template`, `recipient`

---

## Simulation Panel

* Executes workflow step-by-step
* Displays execution logs
* Uses real node data
* Mimics backend processing

---

## JSON Import / Export

* Export full workflow as JSON
* Import JSON to rebuild workflows
* Data normalization ensures compatibility

---

## Architecture

### State Management

* Zustand for global state (nodes, edges, selection)
* Minimal boilerplate and high performance

### UI Layer

* React Flow for graph rendering and interactions
* Tailwind CSS for styling

### Dynamic Forms

* Config-driven (`nodeFormConfig`)
* Easily extendable for new node types

### API Layer

* Mock services for automations and simulation
* Designed for easy backend replacement

### Hooks

* `useSimulation` abstracts simulation logic
* Keeps UI components clean

---

## Folder Structure

```
src/
  components/
    canvas/        React Flow canvas
    forms/         Node configuration panel
    sidebar/       Node drag source
    sandbox/       Simulation panel
  hooks/           Custom hooks
  services/        API layer
  store/           Zustand store
  utils/           Config and helpers
  types/           Type definitions
```

---

## Assumptions

* Linear workflows (no cycle detection implemented)
* At least one start and end node expected
* No backend persistence (in-memory state)
* Minimal validation for faster iteration

---

## How to Run Locally

1. Install dependencies

```
npm install
```

2. Start development server

```
npm run dev
```

3. Open in browser

```
http://localhost:5173
```

---

## Test JSON (Import Example)

Use this to test import functionality:

```json
{
  "nodes": [
    {
      "id": "1",
      "type": "start",
      "position": { "x": 200, "y": 50 },
      "data": { "title": "Employee Onboarding" }
    },
    {
      "id": "2",
      "type": "task",
      "position": { "x": 200, "y": 150 },
      "data": {
        "title": "Collect Documents",
        "description": "Upload ID",
        "assignee": "HR",
        "dueDate": "2026-04-30"
      }
    },
    {
      "id": "3",
      "type": "approval",
      "position": { "x": 200, "y": 250 },
      "data": {
        "title": "Manager Approval",
        "approverRole": "Manager",
        "threshold": 1
      }
    },
    {
      "id": "4",
      "type": "automation",
      "position": { "x": 200, "y": 350 },
      "data": {
        "title": "Send Email",
        "actionId": "send_email",
        "params": {
          "to": "user@mail.com",
          "subject": "Welcome"
        }
      }
    },
    {
      "id": "5",
      "type": "end",
      "position": { "x": 200, "y": 450 },
      "data": {
        "message": "Completed",
        "summary": true
      }
    }
  ],
  "edges": [
    { "id": "e1", "source": "1", "target": "2" },
    { "id": "e2", "source": "2", "target": "3" },
    { "id": "e3", "source": "3", "target": "4" },
    { "id": "e4", "source": "4", "target": "5" }
  ]
}
```

---

## Design Notes

* Node labels dynamically reflect configuration data
* Workflow execution is sequential via edges
* Import JSON is normalized for consistency
* Focused on clarity, modularity, and scalability

---

## Future Improvements

* Workflow validation (missing links, cycles)
* Undo / Redo functionality
* Backend persistence
* Auto layout
* Role-based workflows
* Node version history

---

## Conclusion

This project demonstrates:

* Strong React architecture
* Efficient state handling
* Dynamic UI generation
* Graph-based workflow design

It is structured to scale into a production-ready workflow system.

---
