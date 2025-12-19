import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Alert, getSeverityColor } from './types';

interface AlertsTabProps {
  mockAlerts: Alert[];
}

export const AlertsTab = ({ mockAlerts }: AlertsTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Bell" size={20} />
            Алерты и уведомления
          </CardTitle>
          <CardDescription>Мгновенные оповещения о критических событиях</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAlerts.map(alert => (
              <div
                key={alert.id}
                className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg border border-border/50 animate-slide-in"
              >
                <div className="mt-0.5">
                  <Icon
                    name={alert.severity === 'critical' ? 'AlertCircle' : 'AlertTriangle'}
                    size={20}
                    className={alert.severity === 'critical' ? 'text-destructive' : 'text-warning'}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    <span className="text-xs text-muted-foreground font-mono">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm font-medium">{alert.message}</p>
                  <code className="text-xs font-mono text-muted-foreground">{alert.file}</code>
                </div>
                <Button variant="outline" size="sm">
                  Проверить
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
