
export enum PipelineStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS',
  SKIPPED = 'SKIPPED',
  PENDING = 'PENDING'
}

export interface PipelineStage {
  id: string;
  name: string;
  status: PipelineStatus;
  duration: string;
  startedAt: string;
}

export interface BuildLog {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

export interface SecurityVulnerability {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  component: string;
  cve: string;
}

export interface CodeQualityMetrics {
  score: number;
  bugs: number;
  vulnerabilities: number;
  codeSmells: number;
  coverage: number;
  duplications: number;
}
