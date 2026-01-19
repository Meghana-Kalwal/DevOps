
import { PipelineStatus, PipelineStage, BuildLog, SecurityVulnerability, CodeQualityMetrics } from './types';

export const MOCK_PIPELINE: PipelineStage[] = [
  { id: '1', name: 'Lint & Static Analysis', status: PipelineStatus.SUCCESS, duration: '45s', startedAt: '2023-10-27T10:00:00Z' },
  { id: '2', name: 'Unit Tests', status: PipelineStatus.SUCCESS, duration: '2m 15s', startedAt: '2023-10-27T10:01:00Z' },
  { id: '3', name: 'Integration Tests', status: PipelineStatus.FAILED, duration: '1m 10s', startedAt: '2023-10-27T10:03:15Z' },
  { id: '4', name: 'Docker Image Build', status: PipelineStatus.SKIPPED, duration: '-', startedAt: '-' },
  { id: '5', name: 'Deploy to Staging', status: PipelineStatus.PENDING, duration: '-', startedAt: '-' },
];

export const MOCK_LOGS: BuildLog[] = [
  { timestamp: '10:03:15', level: 'INFO', message: 'Starting Integration Tests...' },
  { timestamp: '10:03:20', level: 'INFO', message: 'Connecting to test database at postgres://localhost:5432' },
  { timestamp: '10:04:10', level: 'INFO', message: 'Running suite: AuthenticationTests' },
  { timestamp: '10:04:15', level: 'WARN', message: 'Deprecated API call detected in login_service.go:45' },
  { timestamp: '10:04:22', level: 'ERROR', message: 'FAIL: TestOAuthCallback - Timeout waiting for response from provider' },
  { timestamp: '10:04:25', level: 'ERROR', message: 'Process exited with status 1' },
];

export const MOCK_VULNERABILITIES: SecurityVulnerability[] = [
  { severity: 'HIGH', title: 'Prototype Pollution in lodash', component: 'lodash@4.17.20', cve: 'CVE-2021-23337' },
  { severity: 'CRITICAL', title: 'Remote Code Execution in log4j', component: 'log4j-core@2.14.1', cve: 'CVE-2021-44228' },
  { severity: 'MEDIUM', title: 'Denial of Service in express', component: 'express@4.16.1', cve: 'CVE-2019-1010266' },
];

export const MOCK_QUALITY: CodeQualityMetrics = {
  score: 82,
  bugs: 12,
  vulnerabilities: 3,
  codeSmells: 45,
  coverage: 76.4,
  duplications: 4.2
};
