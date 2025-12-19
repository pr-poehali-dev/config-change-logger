export interface ConfigChange {
  id: string;
  timestamp: string;
  file: string;
  user: string;
  checksumBefore: string;
  checksumAfter: string;
  action: string;
  status: 'legitimate' | 'suspicious' | 'unauthorized';
}

export interface Alert {
  id: string;
  timestamp: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  file: string;
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'legitimate':
      return 'bg-success/20 text-success border-success/30';
    case 'suspicious':
      return 'bg-warning/20 text-warning border-warning/30';
    case 'unauthorized':
      return 'bg-destructive/20 text-destructive border-destructive/30';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-destructive text-destructive-foreground';
    case 'warning':
      return 'bg-warning text-background';
    case 'info':
      return 'bg-primary text-primary-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};
