import { Worker } from 'worker_threads';
import path from 'path';

interface Vehicle {
  position: number;
  speed: number;
  braking: boolean;
}

const NUM_WORKERS = 2;
const ROAD_LENGTH = 1000;
const NUM_VEHICLES = 100;

// Initialize vehicles
let vehicles: Vehicle[] = Array.from({ length: NUM_VEHICLES }, (_, i) => ({
  position: (i * ROAD_LENGTH) / NUM_VEHICLES,
  speed: 20.0,
  braking: false
}));

const workerPath = path.join(process.cwd(), 'workers', 'simulation-worker.js');


const workers: Worker[] = [];
for (let i = 0; i < NUM_WORKERS; i++) {
  workers.push(new Worker(workerPath));
}

export async function stepSimulation(): Promise<void> {
  const chunkSize = Math.ceil(NUM_VEHICLES / NUM_WORKERS);
  const chunks: Vehicle[][] = [];
  for (let i = 0; i < NUM_VEHICLES; i += chunkSize) {
    chunks.push(vehicles.slice(i, i + chunkSize));
  }

  const results = await Promise.all(chunks.map((chunk, idx) => {
    return new Promise<Vehicle[]>((resolve, reject) => {
      workers[idx].once('message', (msg: Vehicle[]) => {
        resolve(msg);
      });
      workers[idx].once('error', reject);
      workers[idx].postMessage({ vehicles: chunk, roadLength: ROAD_LENGTH });
    });
  }));

  vehicles = ([] as Vehicle[]).concat(...results);
}

export function getVehicles(): Vehicle[] {
  return vehicles;
}
