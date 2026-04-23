# HR Workflow Designer (React + React Flow)

A visual workflow builder that allows HR teams to design, configure, and simulate internal workflows such as onboarding, approvals, and automated processes.

---

## Overview

This project demonstrates:

* Interactive graph-based UI using React Flow
* Dynamic node configuration forms
* Workflow simulation using a mock API
* JSON import/export for portability
* Clean and scalable frontend architecture

---

## Features

### Workflow Canvas

* Drag and drop nodes
* Connect nodes with edges
* MiniMap + zoom controls
* Dynamic node labels (reflect form data)

### Node Types

**Start Node**

* Start Title

**Task Node**

* Title
* Description
* Assignee
* Due Date

**Approval Node**

* Title
* Approver Role
* Auto-approve Threshold

**Automation Node**

* Title
* Select Action (from API)
* Dynamic parameters

**End Node**

* End Message
* Summary flag

---

## Automation (Mock API)

Returns actions like:

* Send Email → params: to, subject
* Generate Document → params: template, recipient

---

## Simulation Panel

* Runs workflow step-by-step
* Displays execution logs
* Uses actual node data
* Simulates async execution

---

## JSON Import / Export

* Export workflow as JSON
* Import JSON to rebuild workflow
* Includes transformation logic to normalize data

---

## Folder Structure

```
src/
  components/
    canvas/        → React Flow canvas
    forms/         → Node config panel
    sidebar/       → Drag nodes
    sandbox/       → Simulation panel
  hooks/           → Custom hooks
  services/        → API layer
  store/           → Zustand store
  utils/           → Config files
  types/           → Types
```

---

## Architecture Decisions

### Zustand (State Management)

* Lightweight
* No boilerplate
* Centralized node + edge state

### React Flow

* Handles graph logic (nodes, edges, drag, zoom)
* Avoids reinventing graph system

### Config-driven Forms

* Forms generated via `nodeFormConfig`
* Easy to scale for new node types

### Hooks Separation

* Simulation logic in `useSimulation`
* UI stays clean and maintainable

### Mock API Layer

* Keeps frontend decoupled
* Easy to replace with real backend

---

## Assumptions

* Linear workflows (no cycle detection)
* At least one start + end node
* No backend persistence (in-memory only)
* Minimal validation
* Single-user usage

---

## How to Run

### 1. Install dependencies

```
npm install
```

### 2. Start development server

```
npm run dev
```

### 3. Open in browser

```
http://localhost:5173
```

---

## Test JSON (Import Example)

Paste this into Import JSON:

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

* Node labels dynamically reflect form data
* Workflow execution is sequential based on edges
* Import JSON normalizes external structure
* Tailwind used for fast UI styling
* Minimal custom nodes to keep system stable

---

## Future Improvements

* Cycle detection
* Undo / Redo
* Backend persistence
* Validation UI on nodes
* Auto layout
* Role-based workflows

---

## Conclusion

This project focuses on:

* Clean architecture
* Dynamic UI handling
* Graph-based workflows
* Extensibility

It can easily scale into a production-grade workflow system with backend integration.

---
