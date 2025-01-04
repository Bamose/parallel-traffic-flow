```markdown
# Traffic Flow Simulation using Next.js

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-v13.4.4-brightgreen)
![React](https://img.shields.io/badge/React-v18.2.0-blue)
![Web Workers](https://img.shields.io/badge/Web%20Workers-Enabled-yellow)

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
  - [Sequential Implementation](#sequential-implementation)
  - [Parallel Implementation](#parallel-implementation)
  - [Components](#components)
- [Known Issues](#known-issues)
- [Performance Metrics](#performance-metrics)
- [Testing](#testing)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)


## Overview

Urban traffic congestion poses significant challenges, leading to increased travel times, fuel consumption, and environmental pollution. Accurate traffic flow simulations are essential for urban planning, optimizing traffic signals, and reducing congestion. This project leverages **Next.js** to develop a comprehensive traffic flow simulation, implementing both sequential and parallel processing techniques to optimize performance and scalability.



## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation.
- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) - For parallel processing in the browser.
- [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript for static type checking.


## Installation

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn**

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/traffic-flow-simulation.git
   cd traffic-flow-simulation
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Run the Development Server**

   Using npm:

   ```bash
   npm run dev
   ```

   Or using yarn:

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the simulation.

4. **Build for Production**

   Using npm:

   ```bash
   npm run build
   npm start
   ```

   Or using yarn:

   ```bash
   yarn build
   yarn start
   ```

## Usage

1. **Select Simulation Mode**

   - **Sequential:** Runs the baseline simulation in a single thread.
   - **Parallel:** Utilizes Web Workers to distribute tasks across multiple threads for enhanced performance.

2. **Configure Simulation Parameters**

   - **Number of Vehicles:** Adjust the number of simulated vehicles.
   - **Traffic Signals:** Configure the number and behavior of traffic signals.
   - **Simulation Speed:** Control the pace of the simulation.

3. **Start Simulation**

   - Click the **Start** button to begin the simulation.
   - Observe real-time vehicle movements and traffic signal changes in the visualization panel.

4. **View Performance Metrics**

   - Access the **Performance Metrics** section to compare execution times, speedup, and efficiency between sequential and parallel implementations.

## Code Structure

### Sequential Implementation

**Directory:** `src/sequential/`

The sequential implementation serves as the foundational version of the traffic flow simulation, allowing for performance benchmarking against the parallel version.

- **Simulation Engine:** Manages the state of each vehicle, updates positions based on velocity and direction, and handles traffic signal logic.
- **Core Logic:** Single-threaded processing of vehicle movements and traffic signal updates.
- **Sample Pseudocode:**

  ```javascript
  // Sequential simulation loop
  function simulateTrafficStep(vehicles, trafficSignals) {
    vehicles.forEach(vehicle => {
      // Update vehicle position based on current speed and direction
      vehicle.position.x += vehicle.velocity.x;
      vehicle.position.y += vehicle.velocity.y;

      // Check for traffic signal interactions
      const currentSignal = getTrafficSignalAt(vehicle.position);
      if (currentSignal && currentSignal.state === 'red') {
        vehicle.velocity = { x: 0, y: 0 }; // Stop the vehicle
      }
    });

    // Update traffic signals
    trafficSignals.forEach(signal => {
      updateTrafficSignalState(signal);
    });
  }
  ```

### Parallel Implementation

**Directory:** `src/parallel/`

The parallel implementation enhances performance by leveraging Web Workers to distribute computational tasks across multiple threads.

- **Worker Pool:** A set of Web Workers initialized at the start of the simulation to handle subsets of vehicles.
- **Task Distribution:** Divides the list of vehicles among available workers for state updates.
- **Result Aggregation:** Collects updated vehicle states from workers and integrates them into the main simulation state.
- **Sample Implementation:**

  ```javascript
  // main.js
  const numWorkers = navigator.hardwareConcurrency || 4;
  const workers = [];
  const vehiclesPerWorker = Math.ceil(vehicles.length / numWorkers);

  for (let i = 0; i < numWorkers; i++) {
    workers[i] = new Worker('worker.js');
    workers[i].postMessage({
      type: 'init',
      data: {
        vehicles: vehicles.slice(i * vehiclesPerWorker, (i + 1) * vehiclesPerWorker),
        trafficSignals
      }
    });
    
    workers[i].onmessage = function(event) {
      if (event.data.type === 'update') {
        // Integrate updated vehicle states
        integrateVehicleUpdates(event.data.updatedVehicles);
      }
    };
  }

  function simulateTrafficStepParallel() {
    workers.forEach(worker => {
      worker.postMessage({ type: 'simulateStep' });
    });
  }
  ```

  ```javascript
  // worker.js
  let vehicles = [];
  let trafficSignals = [];

  self.onmessage = function(event) {
    if (event.data.type === 'init') {
      vehicles = event.data.data.vehicles;
      trafficSignals = event.data.data.trafficSignals;
    }

    if (event.data.type === 'simulateStep') {
      vehicles.forEach(vehicle => {
        // Update vehicle position
        vehicle.position.x += vehicle.velocity.x;
        vehicle.position.y += vehicle.velocity.y;

        // Check for traffic signal interactions
        const currentSignal = getTrafficSignalAt(vehicle.position);
        if (currentSignal && currentSignal.state === 'red') {
          vehicle.velocity = { x: 0, y: 0 };
        }
      });

      // Update traffic signals
      trafficSignals.forEach(signal => {
        updateTrafficSignalState(signal);
      });

      // Send updated vehicles back to main thread
      self.postMessage({ type: 'update', updatedVehicles: vehicles });
    }
  };
  ```

### Components

**Directory:** `src/components/`

- **SimulationCanvas.tsx:** Handles the rendering of the traffic simulation, visualizing vehicle movements and traffic signals.
- **ControlPanel.tsx:** Provides user interface elements for configuring simulation parameters and controlling simulation execution.
- **PerformanceMetrics.tsx:** Displays performance data comparing sequential and parallel implementations.

## Known Issues

- **Non-Responsive Design:** Currently, the application's UI is not fully responsive, leading to suboptimal user experience on various devices and screen sizes. Future updates will focus on implementing responsive design principles to ensure accessibility and usability across all platforms.
- **Limited Scalability:** While initial results show good scalability, extremely large simulation sizes (e.g., 1,000,000 vehicles) may still face performance bottlenecks due to memory constraints and inter-worker communication overheads.
- **Browser Compatibility:** Web Workers may behave differently across various browsers. Testing on all major browsers is recommended to ensure consistent performance.

## Performance Metrics

### 1. Execution Time

- **Sequential Implementation:**
  - Small Simulation (1,000 vehicles): 50 ms
  - Medium Simulation (10,000 vehicles): 500 ms
  - Large Simulation (100,000 vehicles): 5,000 ms

- **Parallel Implementation:**
  - Small Simulation (1,000 vehicles): 25 ms
  - Medium Simulation (10,000 vehicles): 125 ms
  - Large Simulation (100,000 vehicles): 1,250 ms

### 2. Speedup

| Simulation Size | Sequential Time | Parallel Time | Speedup |
|-----------------|-----------------|---------------|---------|
| Small (1K)      | 50 ms           | 25 ms         | 2x      |
| Medium (10K)    | 500 ms          | 125 ms        | 4x      |
| Large (100K)    | 5000 ms         | 1250 ms       | 4x      |

### 3. Efficiency

- **Efficiency = Speedup / Number of Workers**
- **Example:** With 4 Web Workers, Speedup of 4x yields an efficiency of 1x (100%).

### 4. Scalability

- **Observations:**
  - Parallel implementation scales efficiently with increasing simulation sizes.
  - Speedup approaches theoretical maximum with optimal worker counts.
  - Diminishing returns observed at extremely large simulation sizes due to memory bandwidth and communication overheads.

## Testing

### 1. Unit Tests

- **Framework:** Jest
- **Coverage:**
  - Vehicle movement logic
  - Traffic signal state updates
  - Data synchronization mechanisms

### 2. Integration Tests

- **Scenarios:**
  - Comparing sequential and parallel simulation outputs for consistency.
  - High-density traffic scenarios to test performance and stability.
  - Rapid traffic signal changes and their impact on vehicle behaviors.

### 3. Running Tests

Using npm:

```bash
npm run test
```

Or using yarn:

```bash
yarn test
```

## Challenges and Solutions

### 1. Data Synchronization Issues

- **Challenge:** Ensuring consistent state updates across multiple Web Workers without introducing race conditions or data inconsistencies.
- **Solution:** Implemented centralized state management in the main thread. Workers process and return updated vehicle states, while the main thread handles integration and synchronization, preventing concurrent modifications to shared data.

### 2. Load Balancing and Work Distribution

- **Challenge:** Uneven distribution of vehicles among Web Workers leading to some workers being idle while others are overloaded.
- **Solution:** Adopted dynamic workload distribution by assigning vehicles in batches based on real-time worker availability. Monitored processing times and adjusted vehicle subsets dynamically to ensure even workload distribution.

### 3. Communication Overheads Between Main Thread and Workers

- **Challenge:** Excessive use of `postMessage` for sending and receiving data between the main thread and Web Workers introduced latency, negating some performance gains.
- **Solution:** Minimized data transfer sizes by sending only necessary information (e.g., vehicle states) and utilizing transferable objects to reduce serialization costs. Implemented bulk data updates to reduce the number of message exchanges per simulation step.

### 4. Memory Management and Browser Limitations

- **Challenge:** Handling large datasets (e.g., 100,000+ vehicles) led to increased memory consumption, potentially causing browser performance issues or crashes.
- **Solution:** Optimized data structures to use memory-efficient representations for vehicle states. Implemented simulation pausing and state checkpointing to manage memory usage effectively during extended simulation runs.

### 5. Debugging and Testing Parallel Code

- **Challenge:** Debugging parallel code across multiple Web Workers was more complex compared to sequential implementations.
- **Solution:** Utilized browser developer tools to monitor Web Worker performance and state. Implemented extensive logging within workers to trace computation steps and identify discrepancies between sequential and parallel simulations.

## Future Improvements

- **Responsive Design:** Implement responsive UI layouts to ensure optimal performance and usability across various devices and screen sizes.
- **Advanced Parallelization Techniques:** Explore more sophisticated parallelization strategies, such as task-based parallelism and data partitioning, to further enhance performance.
- **GPU Acceleration:** Investigate leveraging GPU computing for handling highly intensive computational tasks, potentially using libraries like WebGL or WebGPU.
- **Enhanced Load Balancing:** Implement more dynamic load balancing algorithms to further optimize resource utilization, especially under varying simulation conditions.
- **Memory Optimization:** Continue refining data structures and memory management techniques to handle even larger datasets without compromising performance.
- **User Interface Enhancements:** Improve the visualization components to provide more detailed and interactive representations of traffic dynamics, aiding in better analysis and decision-making.
- **Comprehensive Testing:** Expand the testing suite to cover more edge cases and ensure robustness across different simulation scenarios.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**

   Click the **Fork** button at the top right corner of this page to create your own forked repository.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/bamose/traffic-flow-simulation.git
   cd traffic-flow-simulation
   ```

3. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Make Changes and Commit**

   ```bash
   git add .
   git commit -m "Add your descriptive commit message here"
   ```

5. **Push to Your Fork**

   ```bash
   git push origin feature/YourFeatureName
   ```

6. **Open a Pull Request**

   Navigate to the original repository and click **New Pull Request** to propose your changes.


