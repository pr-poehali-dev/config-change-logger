import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const SettingsTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
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
    </div>
  );
};
