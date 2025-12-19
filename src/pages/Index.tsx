import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface ConfigChange {
  id: string;
  timestamp: string;
  file: string;
  user: string;
  checksumBefore: string;
  checksumAfter: string;
  action: string;
  status: 'legitimate' | 'suspicious' | 'unauthorized';
}

interface Alert {
  id: string;
  timestamp: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  file: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const mockChanges: ConfigChange[] = [
    {
      id: '1',
      timestamp: '2024-12-19 14:23:45.123',
      file: '/etc/nginx/nginx.conf',
      user: 'admin@company.com',
      checksumBefore: 'a3f5d9e2b1c4',
      checksumAfter: 'b7e8f3a1d2c5',
      action: 'Изменение параметров SSL',
      status: 'legitimate'
    },
    {
      id: '2',
      timestamp: '2024-12-19 13:45:12.456',
      file: '/etc/ssh/sshd_config',
      user: 'unknown',
      checksumBefore: 'c8d4f2a9e1b3',
      checksumAfter: 'd9e5f3b1a2c4',
      action: 'Попытка изменения портов',
      status: 'suspicious'
    },
    {
      id: '3',
      timestamp: '2024-12-19 12:15:33.789',
      file: '/var/www/config.json',
      user: 'dev@company.com',
      checksumBefore: 'e1f6a3b4c5d2',
      checksumAfter: 'f2g7b4c5d3e1',
      action: 'Обновление API ключей',
      status: 'legitimate'
    },
    {
      id: '4',
      timestamp: '2024-12-19 11:30:21.234',
      file: '/etc/postgresql/postgresql.conf',
      user: 'root',
      checksumBefore: 'g3h8c5d6e4f2',
      checksumAfter: 'h4i9d6e7f5g3',
      action: 'Изменение лимитов подключений',
      status: 'unauthorized'
    }
  ];

  const mockAlerts: Alert[] = [
    {
      id: '1',
      timestamp: '2024-12-19 13:45:12',
      severity: 'critical',
      message: 'Несанкционированный доступ к /etc/ssh/sshd_config',
      file: '/etc/ssh/sshd_config'
    },
    {
      id: '2',
      timestamp: '2024-12-19 11:30:21',
      severity: 'critical',
      message: 'Попытка изменения конфигурации БД неавторизованным пользователем',
      file: '/etc/postgresql/postgresql.conf'
    },
    {
      id: '3',
      timestamp: '2024-12-19 10:15:45',
      severity: 'warning',
      message: 'Множественные попытки доступа к защищённым файлам',
      file: 'multiple'
    }
  ];

  const stats = {
    totalChanges: 1247,
    todayChanges: 23,
    suspicious: 5,
    activeUsers: 12,
    avgResponseTime: 145
  };

  const getStatusColor = (status: string) => {
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

  const getSeverityColor = (severity: string) => {
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

  const filteredChanges = mockChanges.filter(
    change =>
      change.file.toLowerCase().includes(searchQuery.toLowerCase()) ||
      change.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      change.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Система мониторинга конфигураций</h1>
            <p className="text-muted-foreground mt-1">
              Отслеживание изменений и контроль доступа в режиме реального времени
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow"></div>
              <span className="text-sm font-mono">ONLINE</span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="changelog" className="gap-2">
              <Icon name="FileText" size={16} />
              Журнал
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2">
              <Icon name="Bell" size={16} />
              Алерты
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <Icon name="BarChart3" size={16} />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Icon name="Settings" size={16} />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
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
          </TabsContent>

          <TabsContent value="changelog" className="space-y-4 animate-fade-in">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="FileText" size={20} />
                      Журнал изменений конфигурации
                    </CardTitle>
                    <CardDescription>Полная легенда изменений с контрольными суммами</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Поиск по файлам, пользователям..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-64 font-mono"
                    />
                    <Button variant="outline" size="icon">
                      <Icon name="Download" size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {filteredChanges.map(change => (
                      <div
                        key={change.id}
                        className="p-4 bg-secondary/30 rounded-lg border border-border/50 space-y-3 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <code className="text-sm font-mono text-primary font-semibold">{change.file}</code>
                              <Badge className={getStatusColor(change.status)}>{change.status}</Badge>
                              <span className="text-xs text-muted-foreground font-mono">{change.timestamp}</span>
                            </div>
                            <p className="text-sm">{change.action}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/30">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Контрольная сумма (до)</p>
                            <code className="text-xs font-mono text-destructive/80 bg-destructive/10 px-2 py-1 rounded">
                              {change.checksumBefore}
                            </code>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">
                              Контрольная сумма (после)
                            </p>
                            <code className="text-xs font-mono text-success/80 bg-success/10 px-2 py-1 rounded">
                              {change.checksumAfter}
                            </code>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border/30">
                          <div className="flex items-center gap-2 text-sm">
                            <Icon name="User" size={14} className="text-muted-foreground" />
                            <span className="font-mono">{change.user}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              <Icon name="RotateCcw" size={12} className="mr-1" />
                              Откатить
                            </Button>
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              <Icon name="Eye" size={12} className="mr-1" />
                              Детали
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4 animate-fade-in">
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 animate-fade-in">
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
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 animate-fade-in">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Settings" size={20} />
                  Настройки системы мониторинга
                </CardTitle>
                <CardDescription>Конфигурация параметров отслеживания и уведомлений</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Отслеживаемые директории</h3>
                  <div className="space-y-2">
                    {['/etc', '/var/www', '/usr/local', '/opt'].map(dir => (
                      <div key={dir} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <code className="text-sm font-mono">{dir}</code>
                        <Badge variant="outline" className="bg-success/20 text-success">
                          активно
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить директорию
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Уведомления</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Icon name="Mail" size={16} />
                        <span className="text-sm">Email уведомления</span>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">включено</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Icon name="MessageSquare" size={16} />
                        <span className="text-sm">Telegram уведомления</span>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">включено</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Icon name="Webhook" size={16} />
                        <span className="text-sm">Webhook интеграции</span>
                      </div>
                      <Badge variant="outline">отключено</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
