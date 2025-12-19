import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Agent {
  id: string;
  hostname: string;
  ipAddress: string;
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
  version: string;
  os: string;
  cpu: number;
  memory: number;
  disk: number;
}

export const AgentsTab = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      hostname: 'srv-web-01',
      ipAddress: '192.168.1.100',
      status: 'online',
      lastSeen: '2024-12-19 14:30:15',
      version: '1.0.0',
      os: 'Windows Server 2022',
      cpu: 45,
      memory: 68,
      disk: 72
    },
    {
      id: '2',
      hostname: 'srv-db-01',
      ipAddress: '192.168.1.101',
      status: 'online',
      lastSeen: '2024-12-19 14:30:12',
      version: '1.0.0',
      os: 'Windows Server 2019',
      cpu: 78,
      memory: 85,
      disk: 45
    },
    {
      id: '3',
      hostname: 'workstation-dev',
      ipAddress: '192.168.1.50',
      status: 'warning',
      lastSeen: '2024-12-19 14:25:08',
      version: '1.0.0',
      os: 'Windows 11 Pro',
      cpu: 92,
      memory: 95,
      disk: 88
    },
    {
      id: '4',
      hostname: 'srv-backup',
      ipAddress: '192.168.1.102',
      status: 'offline',
      lastSeen: '2024-12-19 13:15:45',
      version: '1.0.0',
      os: 'Windows Server 2016',
      cpu: 0,
      memory: 0,
      disk: 0
    }
  ]);

  const [newAgent, setNewAgent] = useState({ hostname: '', ipAddress: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-success/20 text-success border-success/30';
      case 'offline':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'warning':
        return 'bg-warning/20 text-warning border-warning/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 90) return 'text-destructive';
    if (value >= 75) return 'text-warning';
    return 'text-success';
  };

  const handleAddAgent = () => {
    if (!newAgent.hostname || !newAgent.ipAddress) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    const agent: Agent = {
      id: Date.now().toString(),
      hostname: newAgent.hostname,
      ipAddress: newAgent.ipAddress,
      status: 'offline',
      lastSeen: 'Никогда',
      version: '-',
      os: '-',
      cpu: 0,
      memory: 0,
      disk: 0
    };

    setAgents([...agents, agent]);
    setNewAgent({ hostname: '', ipAddress: '' });
    setIsDialogOpen(false);

    toast({
      title: 'Агент добавлен',
      description: `${newAgent.hostname} (${newAgent.ipAddress}) ожидает подключения`
    });
  };

  const handleDownloadAgent = async () => {
    try {
      const response = await fetch('/monitoring-agent.py');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'monitoring-agent.py';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Агент загружен',
        description: 'Следуйте инструкциям в файле для установки'
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить агент',
        variant: 'destructive'
      });
    }
  };

  const onlineAgents = agents.filter(a => a.status === 'online').length;
  const offlineAgents = agents.filter(a => a.status === 'offline').length;
  const warningAgents = agents.filter(a => a.status === 'warning').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего агентов</CardTitle>
            <Icon name="Server" size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{agents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Зарегистрировано</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Онлайн</CardTitle>
            <Icon name="CheckCircle2" size={16} className="text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-success">{onlineAgents}</div>
            <p className="text-xs text-muted-foreground mt-1">Активны</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Предупреждения</CardTitle>
            <Icon name="AlertTriangle" size={16} className="text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-warning">{warningAgents}</div>
            <p className="text-xs text-muted-foreground mt-1">Высокая нагрузка</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Оффлайн</CardTitle>
            <Icon name="XCircle" size={16} className="text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-destructive">{offlineAgents}</div>
            <p className="text-xs text-muted-foreground mt-1">Недоступны</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Download" size={20} />
                Установка агента мониторинга
              </CardTitle>
              <CardDescription>Скачайте и установите агент на целевые системы Windows</CardDescription>
            </div>
            <Button onClick={handleDownloadAgent} className="gap-2">
              <Icon name="Download" size={16} />
              Скачать агент (Python)
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-secondary/50 rounded-lg border border-border/50">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="Package" size={16} />
                Инструкция по установке:
              </h4>
              <ol className="space-y-2 text-sm text-muted-foreground ml-6 list-decimal">
                <li>Установите Python 3.8+ на целевую систему Windows</li>
                <li>
                  Установите зависимости: <code className="bg-background px-2 py-0.5 rounded">pip install requests psutil</code>
                </li>
                <li>Скачайте агент и отредактируйте API_ENDPOINT</li>
                <li>
                  Запустите агент: <code className="bg-background px-2 py-0.5 rounded">python monitoring-agent.py</code>
                </li>
                <li>Для автозапуска добавьте в планировщик задач Windows</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Server" size={20} />
                Подключённые агенты
              </CardTitle>
              <CardDescription>Список всех зарегистрированных систем мониторинга</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Icon name="Plus" size={16} />
                  Добавить агент
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить новый агент</DialogTitle>
                  <DialogDescription>Зарегистрируйте новую систему для мониторинга</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="hostname">Имя хоста</Label>
                    <Input
                      id="hostname"
                      placeholder="srv-web-01"
                      value={newAgent.hostname}
                      onChange={e => setNewAgent({ ...newAgent, hostname: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ip">IP адрес</Label>
                    <Input
                      id="ip"
                      placeholder="192.168.1.100"
                      value={newAgent.ipAddress}
                      onChange={e => setNewAgent({ ...newAgent, ipAddress: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleAddAgent} className="w-full">
                    Добавить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {agents.map(agent => (
              <div
                key={agent.id}
                className="p-4 bg-secondary/30 rounded-lg border border-border/50 space-y-3 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold font-mono">{agent.hostname}</h4>
                      <Badge className={getStatusColor(agent.status)}>{agent.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Globe" size={14} />
                        {agent.ipAddress}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Monitor" size={14} />
                        {agent.os}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {agent.lastSeen}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <Icon name="Eye" size={12} className="mr-1" />
                      Детали
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs text-destructive hover:text-destructive">
                      <Icon name="Trash2" size={12} className="mr-1" />
                      Удалить
                    </Button>
                  </div>
                </div>

                {agent.status !== 'offline' && (
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border/30">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">CPU</span>
                        <span className={`font-mono font-semibold ${getMetricColor(agent.cpu)}`}>{agent.cpu}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${agent.cpu >= 90 ? 'bg-destructive' : agent.cpu >= 75 ? 'bg-warning' : 'bg-success'}`}
                          style={{ width: `${agent.cpu}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Memory</span>
                        <span className={`font-mono font-semibold ${getMetricColor(agent.memory)}`}>{agent.memory}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${agent.memory >= 90 ? 'bg-destructive' : agent.memory >= 75 ? 'bg-warning' : 'bg-success'}`}
                          style={{ width: `${agent.memory}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Disk</span>
                        <span className={`font-mono font-semibold ${getMetricColor(agent.disk)}`}>{agent.disk}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${agent.disk >= 90 ? 'bg-destructive' : agent.disk >= 75 ? 'bg-warning' : 'bg-success'}`}
                          style={{ width: `${agent.disk}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};