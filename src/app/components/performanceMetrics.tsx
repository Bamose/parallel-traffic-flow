// src/components/PerformanceMetrics.tsx

import React from 'react';
import { Table, Text } from '@mantine/core';

interface PerformanceMetricsProps {
  sequentialTime: number;
  parallelTime: number;
  speedup: number;
  efficiency: number;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  sequentialTime,
  parallelTime,
  speedup,
  efficiency,
}) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Text weight={500} size="lg" mb="sm">
        Performance Metrics
      </Text>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sequential Execution Time (ms)</td>
            <td>{sequentialTime.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Parallel Execution Time (ms)</td>
            <td>{parallelTime.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Speedup</td>
            <td>{speedup.toFixed(2)}x</td>
          </tr>
          <tr>
            <td>Efficiency</td>
            <td>{efficiency.toFixed(2)}x</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default PerformanceMetrics;
