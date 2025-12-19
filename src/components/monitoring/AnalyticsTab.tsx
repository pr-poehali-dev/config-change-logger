import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { getStatusColor } from './types';

export const AnalyticsTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="PieChart" size={20} />
              Топ изменяемых файлов
            </CardTitle>
            <CardDescription>За последние 30 дней</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { file: '/etc/nginx/nginx.conf', count: 145 },
                { file: '/var/www/config.json', count: 98 },
                { file: '/etc/ssh/sshd_config', count: 67 },
                { file: '/etc/postgresql/postgresql.conf', count: 52 },
                { file: '/etc/apache2/apache2.conf', count: 34 }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-lg font-mono font-bold text-primary w-8">{i + 1}</span>
                  <code className="flex-1 text-sm font-mono">{item.file}</code>
                  <Badge variant="outline" className="font-mono">
                    {item.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Users" size={20} />
              Активность пользователей
            </CardTitle>
            <CardDescription>Количество изменений по пользователям</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { user: 'admin@company.com', count: 234, status: 'legitimate' },
                { user: 'dev@company.com', count: 187, status: 'legitimate' },
                { user: 'ops@company.com', count: 156, status: 'legitimate' },
                { user: 'unknown', count: 23, status: 'suspicious' },
                { user: 'root', count: 12, status: 'unauthorized' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-2">
                    <Icon name="User" size={14} className="text-muted-foreground" />
                    <code className="text-sm font-mono">{item.user}</code>
                    <Badge className={`${getStatusColor(item.status)} text-xs`}>{item.status}</Badge>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    {item.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
