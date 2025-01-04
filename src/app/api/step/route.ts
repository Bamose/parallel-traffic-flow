import { getVehicles, stepSimulation } from '@/app/lib/simulation-manager';
import { NextResponse } from 'next/server';



export async function GET() {
    console.log("GET /api/step called");
    console.log("Starting stepSimulation");
    await stepSimulation();
    console.log("Finished stepSimulation");
    
  const vehicles = await getVehicles();
  
  if (!vehicles) {
    return NextResponse.json(
      { error: 'not found' },
      { status: 404 },
    );
  }

  console.log("Vehicles on server:", vehicles);
  const positions = vehicles.map(v => v.position);
  if (!positions) {
    return NextResponse.json(
      { error: 'not found' },
      { status: 404 },
    );
  }

  return NextResponse.json({ positions });
}
