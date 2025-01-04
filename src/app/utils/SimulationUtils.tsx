
export interface Vehicle {
    id: number;
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    direction: string;
  }
  
  export interface TrafficSignal {
    id: number;
    position: { x: number; y: number };
    state: 'red' | 'green';
    timer: number;
  }
  
  export const initializeVehicles = (count: number): Vehicle[] => {
    const vehicles: Vehicle[] = [];
    for (let i = 0; i < count; i++) {
      vehicles.push({
        id: i,
        position: { x: Math.random() * 800, y: Math.random() * 600 },
        velocity: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 },
        direction: 'N/A',
      });
    }
    return vehicles;
  };
  
  export const initializeTrafficSignals = (count: number): TrafficSignal[] => {
    const signals: TrafficSignal[] = [];
    for (let i = 0; i < count; i++) {
      signals.push({
        id: i,
        position: { x: Math.random() * 800, y: Math.random() * 600 },
        state: Math.random() > 0.5 ? 'red' : 'green',
        timer: 0,
      });
    }
    return signals;
  };
  