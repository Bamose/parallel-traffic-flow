import { parentPort } from 'worker_threads';

interface Vehicle {
  position: number;
  speed: number;
  braking: boolean;
}

interface WorkData {
  vehicles: Vehicle[];
  roadLength: number;
}

function updateVehicles(vehicles: Vehicle[], roadLength: number): Vehicle[] {
  // Update speed based on proximity (simple logic)
  for (let i = 0; i < vehicles.length; i++) {
    const nextIdx = (i + 1) % vehicles.length;
    let gap = vehicles[nextIdx].position - vehicles[i].position;
    if (gap < 0) gap += roadLength;
    if (gap < 10) {
      vehicles[i].speed = Math.max(vehicles[i].speed * 0.8, 5.0);
      vehicles[i].braking = true;
    } else {
      vehicles[i].speed = Math.min(vehicles[i].speed + 0.5, 30.0);
      vehicles[i].braking = false;
    }
  }

  // Update positions
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].position = (vehicles[i].position + vehicles[i].speed) % roadLength;
  }

  return vehicles;
}

if (parentPort) {
  parentPort.on('message', (data: WorkData) => {
    const updated = updateVehicles(data.vehicles, data.roadLength);
    parentPort?.postMessage(updated);
  });
}
