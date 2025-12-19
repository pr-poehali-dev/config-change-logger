import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { ConfigChange, Alert } from '@/components/monitoring/types';
import { DashboardTab } from '@/components/monitoring/DashboardTab';
import { ChangelogTab } from '@/components/monitoring/ChangelogTab';
import { AlertsTab } from '@/components/monitoring/AlertsTab';
import { AnalyticsTab } from '@/components/monitoring/AnalyticsTab';
import { SettingsTab } from '@/components/monitoring/SettingsTab';

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

          <TabsContent value="dashboard">
            <DashboardTab stats={stats} mockChanges={mockChanges} />
          </TabsContent>

          <TabsContent value="changelog">
            <ChangelogTab filteredChanges={filteredChanges} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsTab mockAlerts={mockAlerts} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
