"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var worker_threads_1 = require("worker_threads");
function updateVehicles(vehicles, roadLength) {
    // Update speed based on proximity (simple logic)
    for (var i = 0; i < vehicles.length; i++) {
        var nextIdx = (i + 1) % vehicles.length;
        var gap = vehicles[nextIdx].position - vehicles[i].position;
        if (gap < 0)
            gap += roadLength;
        if (gap < 10) {
            vehicles[i].speed = Math.max(vehicles[i].speed * 0.8, 5.0);
            vehicles[i].braking = true;
        }
        else {
            vehicles[i].speed = Math.min(vehicles[i].speed + 0.5, 30.0);
            vehicles[i].braking = false;
        }
    }
    // Update positions
    for (var i = 0; i < vehicles.length; i++) {
        vehicles[i].position = (vehicles[i].position + vehicles[i].speed) % roadLength;
    }
    return vehicles;
}
if (worker_threads_1.parentPort) {
    worker_threads_1.parentPort.on('message', function (data) {
        var updated = updateVehicles(data.vehicles, data.roadLength);
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(updated);
    });
}
