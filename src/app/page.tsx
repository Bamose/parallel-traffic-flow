"use client";

import { useEffect, useState } from 'react';

import ControlPanel from './components/ControlPanel';
import SimulationCanvas from './components/simulationCanvas';

export default function Home() {
  const [positions, setPositions] = useState<number[]>([]);
  const ROAD_LENGTH = 1000;

  useEffect(() => {
    let animationId: number;

    async function fetchStep() {
      const res = await fetch('/api/step');
      if (res.ok) {
        const data = await res.json();
        console.log("Fetched data:", res);
        setPositions(data.positions);
      } else {
        console.error("API call failed");
      }
      animationId = requestAnimationFrame(fetchStep);
    }

    fetchStep();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Traffic Flow Simulation (Server-Side Parallelism)</h1>
      <ControlPanel />
      <SimulationCanvas positions={positions} roadLength={ROAD_LENGTH} />
    </div>
  );
}
