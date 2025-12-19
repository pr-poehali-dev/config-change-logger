import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { ConfigChange, getStatusColor } from './types';

interface DashboardTabProps {
  stats: {
    totalChanges: number;
    todayChanges: number;
    suspicious: number;
    activeUsers: number;
    avgResponseTime: number;
  };
  mockChanges: ConfigChange[];
}

export const DashboardTab = ({ stats, mockChanges }: DashboardTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего изменений</CardTitle>
            <Icon name="Database" size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats.totalChanges}</div>
            <p className="text-xs text-muted-foreground mt-1">За всё время</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Сегодня</CardTitle>
            <Icon name="Activity" size={16} className="text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-primary">{stats.todayChanges}</div>
            <p className="text-xs text-muted-foreground mt-1">+12% от среднего</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Подозрительных</CardTitle>
            <Icon name="AlertTriangle" size={16} className="text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-warning">{stats.suspicious}</div>
            <p className="text-xs text-muted-foreground mt-1">Требуют проверки</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активных пользователей</CardTitle>
            <Icon name="Users" size={16} className="text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-accent">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">В данный момент</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ср. время отклика</CardTitle>
            <Icon name="Zap" size={16} className="text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-success">{stats.avgResponseTime}ms</div>
            <p className="text-xs text-muted-foreground mt-1">Отличная производительность</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={20} />
              Активность за последние 7 дней
            </CardTitle>
            <CardDescription>Количество изменений конфигураций</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[45, 62, 38, 71, 52, 68, 23].map((value, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground w-16">
                    {new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit'
                    })}
                  </span>
                  <div className="flex-1 bg-secondary rounded-full h-8 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 flex items-center justify-end pr-3"
                      style={{ width: `${(value / 80) * 100}%` }}
                    >
                      <span className="text-xs font-mono font-semibold">{value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Shield" size={20} />
              Статус безопасности
            </CardTitle>
            <CardDescription>Распределение событий по категориям</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-success">Легитимные</span>
                  <span className="font-mono font-semibold">85%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-warning">Подозрительные</span>
                  <span className="font-mono font-semibold">10%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-warning rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-destructive">Несанкционированные</span>
                  <span className="font-mono font-semibold">5%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-destructive rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border">
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/30">
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle2" size={20} className="text-success" />
                    <span className="text-sm font-medium">Общий уровень безопасности</span>
                  </div>
                  <span className="text-lg font-bold font-mono text-success">ВЫСОКИЙ</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Clock" size={20} />
            Последние изменения
          </CardTitle>
          <CardDescription>Реальное время отслеживания событий</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockChanges.slice(0, 3).map(change => (
              <div
                key={change.id}
                className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg border border-border/50 hover:bg-secondary/80 transition-colors animate-slide-in"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono text-primary">{change.file}</code>
                    <Badge className={getStatusColor(change.status)}>{change.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{change.action}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                    <span>{change.timestamp}</span>
                    <span>•</span>
                    <span>{change.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
