import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { ConfigChange, getStatusColor } from './types';

interface ChangelogTabProps {
  filteredChanges: ConfigChange[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ChangelogTab = ({ filteredChanges, searchQuery, setSearchQuery }: ChangelogTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
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
    </div>
  );
};
