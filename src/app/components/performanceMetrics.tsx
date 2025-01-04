// src/components/PerformanceMetrics.tsx

import React from 'react';

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
    <div style={styles.container}>
      <h2>Performance Metrics</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Metric</th>
            <th style={styles.th}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>Sequential Execution Time (ms)</td>
            <td style={styles.td}>{sequentialTime.toFixed(2)}</td>
          </tr>
          <tr>
            <td style={styles.td}>Parallel Execution Time (ms)</td>
            <td style={styles.td}>{parallelTime.toFixed(2)}</td>
          </tr>
          <tr>
            <td style={styles.td}>Speedup</td>
            <td style={styles.td}>{speedup.toFixed(2)}x</td>
          </tr>
          <tr>
            <td style={styles.td}>Efficiency</td>
            <td style={styles.td}>{efficiency.toFixed(2)}x</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '8px',
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: '8px',
  },
};

export default PerformanceMetrics;
