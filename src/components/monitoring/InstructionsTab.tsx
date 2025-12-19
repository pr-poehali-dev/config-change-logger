import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export const InstructionsTab = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Icon name="BookOpen" size={24} />
            Полная инструкция по использованию системы
          </CardTitle>
          <CardDescription>Руководство по развертыванию и настройке системы мониторинга конфигураций</CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Workflow" size={20} />
            Как работает система
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-muted-foreground">
              Система мониторинга конфигураций состоит из трёх основных компонентов:
            </p>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Monitor" size={20} className="text-primary" />
                  <h4 className="font-semibold">Веб-интерфейс</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Центральная панель управления для визуализации данных, анализа изменений и управления агентами
                </p>
              </div>

              <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Server" size={20} className="text-accent" />
                  <h4 className="font-semibold">API Backend</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Облачный сервер для приёма данных от агентов, их обработки и хранения
                </p>
              </div>

              <div className="p-4 bg-success/10 rounded-lg border border-success/30">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Package" size={20} className="text-success" />
                  <h4 className="font-semibold">Агенты Windows</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Python-скрипты, установленные на целевых машинах для мониторинга конфигураций
                </p>
              </div>
            </div>

            <Alert className="bg-primary/10 border-primary/30">
              <Icon name="Info" size={16} />
              <AlertDescription>
                <strong>Принцип работы:</strong> Агенты на машинах Windows сканируют конфигурационные файлы каждые 60
                секунд, вычисляют контрольные суммы и отправляют данные на API сервер. Веб-интерфейс отображает все
                изменения в реальном времени.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline" className="mr-2">
              Шаг 1
            </Badge>
            <Icon name="Globe" size={20} />
            Запуск веб-интерфейса
          </CardTitle>
          <CardDescription>Этот веб-интерфейс уже доступен онлайн</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm">
              <strong>Текущий URL:</strong>
            </p>
            <div className="p-3 bg-secondary/50 rounded-lg font-mono text-sm flex items-center justify-between">
              <span>{window.location.origin}</span>
              <Badge className="bg-success/20 text-success">Активен</Badge>
            </div>

            <Alert>
              <Icon name="CheckCircle2" size={16} />
              <AlertDescription>
                <strong>Готов к использованию!</strong> Веб-интерфейс уже развёрнут и работает. Просто откройте эту
                страницу в браузере для управления системой мониторинга.
              </AlertDescription>
            </Alert>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Icon name="Key" size={16} />
                Доступ к интерфейсу:
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                <li className="flex items-start gap-2">
                  <Icon name="ChevronRight" size={14} className="mt-0.5" />
                  <span>Откройте браузер (Chrome, Firefox, Edge)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="ChevronRight" size={14} className="mt-0.5" />
                  <span>Перейдите по адресу веб-интерфейса</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="ChevronRight" size={14} className="mt-0.5" />
                  <span>Система доступна с любого устройства в сети</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline" className="mr-2">
              Шаг 2
            </Badge>
            <Icon name="Download" size={20} />
            Установка агента на машину Windows
          </CardTitle>
          <CardDescription>Подробная инструкция по установке агента мониторинга</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                  1
                </span>
                Установка Python
              </h4>
              <div className="ml-8 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Агент работает на Python 3.8 или новее. Установите Python на целевую машину:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon name="Download" size={14} className="mt-0.5 text-primary" />
                    <div>
                      <span>Скачайте Python с официального сайта: </span>
                      <code className="bg-secondary px-2 py-0.5 rounded">https://www.python.org/downloads/</code>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckSquare" size={14} className="mt-0.5 text-primary" />
                    <span>При установке обязательно отметьте галочку "Add Python to PATH"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Play" size={14} className="mt-0.5 text-primary" />
                    <span>Запустите установщик и следуйте инструкциям</span>
                  </li>
                </ul>

                <Alert className="bg-warning/10 border-warning/30">
                  <Icon name="AlertTriangle" size={16} />
                  <AlertDescription>
                    <strong>Важно:</strong> Убедитесь, что Python добавлен в PATH. Проверьте командой{' '}
                    <code className="bg-background px-2 py-0.5 rounded">python --version</code> в командной строке.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                  2
                </span>
                Установка зависимостей
              </h4>
              <div className="ml-8 space-y-2">
                <p className="text-sm text-muted-foreground">Откройте командную строку от имени администратора:</p>
                <div className="space-y-2">
                  <div className="p-3 bg-secondary/80 rounded-lg font-mono text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name="Terminal" size={14} />
                      <span className="text-xs text-muted-foreground">Команда для установки пакетов:</span>
                    </div>
                    python -m pip install requests psutil
                  </div>
                  <p className="text-xs text-muted-foreground flex items-start gap-2">
                    <Icon name="Info" size={12} className="mt-0.5" />
                    <span>
                      <strong>requests</strong> - для отправки HTTP запросов на сервер
                      <br />
                      <strong>psutil</strong> - для сбора системных метрик (CPU, RAM, Disk)
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                  3
                </span>
                Скачивание агента
              </h4>
              <div className="ml-8 space-y-2">
                <p className="text-sm text-muted-foreground">Скачайте готовый агент из веб-интерфейса:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon name="MousePointer" size={14} className="mt-0.5 text-primary" />
                    <span>
                      Перейдите на вкладку <strong>"Агенты"</strong> в веб-интерфейсе
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Download" size={14} className="mt-0.5 text-primary" />
                    <span>
                      Нажмите кнопку <strong>"Скачать агент (Python)"</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="FolderOpen" size={14} className="mt-0.5 text-primary" />
                    <span>
                      Сохраните файл <code className="bg-secondary px-2 py-0.5 rounded">monitoring-agent.py</code> в
                      удобную папку (например, <code className="bg-secondary px-2 py-0.5 rounded">C:\MonitoringAgent\</code>
                      )
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                  4
                </span>
                Запуск агента
              </h4>
              <div className="ml-8 space-y-2">
                <p className="text-sm text-muted-foreground">Запустите агент вручную для проверки:</p>
                <div className="space-y-2">
                  <div className="p-3 bg-secondary/80 rounded-lg font-mono text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name="Terminal" size={14} />
                      <span className="text-xs text-muted-foreground">Откройте командную строку в папке с агентом:</span>
                    </div>
                    cd C:\MonitoringAgent
                    <br />
                    python monitoring-agent.py
                  </div>

                  <Alert className="bg-success/10 border-success/30">
                    <Icon name="CheckCircle2" size={16} />
                    <AlertDescription>
                      <strong>Успешный запуск:</strong> Вы увидите сообщения о сканировании файлов и отправке данных на
                      сервер. Агент будет работать, пока не закроете окно командной строки.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                  5
                </span>
                Автозапуск агента (опционально)
              </h4>
              <div className="ml-8 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Настройте автоматический запуск агента при старте Windows через Планировщик задач:
                </p>

                <div className="space-y-2">
                  <div className="p-3 bg-secondary/50 rounded-lg text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={14} className="text-accent" />
                      <strong>Создание задачи в Планировщике:</strong>
                    </div>
                    <ol className="space-y-1.5 ml-5 list-decimal text-muted-foreground">
                      <li>Откройте "Планировщик заданий" (Task Scheduler)</li>
                      <li>Создать задачу → Имя: "Configuration Monitoring Agent"</li>
                      <li>Триггеры → Создать → "При запуске"</li>
                      <li>Действия → Создать → Программа: python.exe</li>
                      <li>
                        Аргументы:{' '}
                        <code className="bg-background px-2 py-0.5 rounded">C:\MonitoringAgent\monitoring-agent.py</code>
                      </li>
                      <li>Условия → Снять "Запускать только от сети"</li>
                      <li>Параметры → Снять "Останавливать задачу"</li>
                    </ol>
                  </div>

                  <div className="p-3 bg-secondary/50 rounded-lg text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="Ghost" size={14} className="text-accent" />
                      <strong>Альтернатива - запуск в фоне:</strong>
                    </div>
                    <div className="p-2 bg-secondary/80 rounded font-mono text-xs">
                      pythonw monitoring-agent.py
                    </div>
                    <p className="text-xs text-muted-foreground">
                      (pythonw запускает скрипт без окна консоли - полностью в фоне)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline" className="mr-2">
              Шаг 3
            </Badge>
            <Icon name="Network" size={20} />
            Регистрация агента в системе
          </CardTitle>
          <CardDescription>Добавление машины в список мониторинга</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              После установки агента зарегистрируйте машину в веб-интерфейсе:
            </p>

            <div className="space-y-2">
              <div className="p-3 bg-secondary/50 rounded-lg text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Icon name="Plus" size={14} className="text-primary" />
                  <strong>Добавление нового агента:</strong>
                </div>
                <ol className="space-y-1.5 ml-5 list-decimal text-muted-foreground">
                  <li>Откройте вкладку "Агенты" в веб-интерфейсе</li>
                  <li>Нажмите кнопку "Добавить агент"</li>
                  <li>
                    Введите <strong>Имя хоста</strong> (например, srv-web-01)
                  </li>
                  <li>
                    Введите <strong>IP адрес</strong> машины (например, 192.168.1.100)
                  </li>
                  <li>Нажмите "Добавить"</li>
                </ol>
              </div>

              <Alert>
                <Icon name="Info" size={16} />
                <AlertDescription>
                  <strong>Статус агента:</strong> После запуска агента на машине, система автоматически обнаружит его и
                  изменит статус с "Offline" на "Online". Метрики CPU, Memory и Disk начнут обновляться каждую минуту.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Settings" size={20} />
            Настройка мониторинга
          </CardTitle>
          <CardDescription>Конфигурация путей и параметров сканирования</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Агент по умолчанию мониторит стандартные директории. Вы можете настроить пути в файле агента:
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-secondary/80 rounded-lg font-mono text-xs space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="FolderTree" size={14} />
                  <span className="text-muted-foreground">Редактируйте переменную CONFIG_PATHS:</span>
                </div>
                <pre className="text-xs overflow-x-auto">
                  {`CONFIG_PATHS = [
    r"C:\\Windows\\System32\\config",
    r"C:\\inetpub\\wwwroot",
    r"C:\\Program Files",
    r"C:\\ProgramData",
]`}
                </pre>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="p-3 bg-secondary/50 rounded-lg text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="FileType" size={14} className="text-primary" />
                    <strong>Отслеживаемые файлы:</strong>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground font-mono">
                    <div>• .conf</div>
                    <div>• .config</div>
                    <div>• .xml</div>
                    <div>• .json</div>
                    <div>• .ini</div>
                    <div>• .yml / .yaml</div>
                    <div>• .properties</div>
                  </div>
                </div>

                <div className="p-3 bg-secondary/50 rounded-lg text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Clock" size={14} className="text-accent" />
                    <strong>Интервал проверки:</strong>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="font-mono bg-secondary px-2 py-1 rounded">CHECK_INTERVAL = 60</div>
                    <div>По умолчанию: каждые 60 секунд</div>
                    <div className="text-warning">Уменьшение интервала увеличит нагрузку</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="ListChecks" size={20} />
            Использование системы
          </CardTitle>
          <CardDescription>Основные возможности веб-интерфейса</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="LayoutDashboard" size={18} className="text-primary" />
                <h4 className="font-semibold">Дашборд</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Общая статистика: количество изменений, активные пользователи, графики активности за неделю, статус
                безопасности системы
              </p>
            </div>

            <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Server" size={18} className="text-accent" />
                <h4 className="font-semibold">Агенты</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Управление подключёнными машинами: список агентов, статусы (Online/Offline), метрики в реальном времени
                (CPU, RAM, Disk)
              </p>
            </div>

            <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="FileText" size={18} className="text-success" />
                <h4 className="font-semibold">Журнал изменений</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Полная история изменений конфигураций: контрольные суммы до и после, временные метки с миллисекундной
                точностью, данные пользователей
              </p>
            </div>

            <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Bell" size={18} className="text-destructive" />
                <h4 className="font-semibold">Алерты</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Уведомления о критических событиях: несанкционированный доступ, подозрительные изменения, попытки
                взлома
              </p>
            </div>

            <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="BarChart3" size={18} className="text-warning" />
                <h4 className="font-semibold">Аналитика</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Статистика и отчёты: топ изменяемых файлов, активность пользователей, распределение событий по
                категориям
              </p>
            </div>

            <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Settings" size={18} className="text-muted-foreground" />
                <h4 className="font-semibold">Настройки</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Конфигурация системы: управление отслеживаемыми директориями, настройка уведомлений (Email, Telegram,
                Webhook)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="LifeBuoy" size={20} />
            Решение проблем
          </CardTitle>
          <CardDescription>Часто встречающиеся проблемы и их решения</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/30">
              <div className="flex items-start gap-3">
                <Icon name="XCircle" size={18} className="text-destructive mt-0.5" />
                <div className="space-y-2 flex-1">
                  <h4 className="font-semibold">Агент не отправляет данные</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✓ Проверьте подключение к интернету</li>
                    <li>✓ Убедитесь, что Python установлен и доступен в PATH</li>
                    <li>✓ Проверьте, что установлены пакеты: requests, psutil</li>
                    <li>
                      ✓ Откройте порт 443 (HTTPS) в брандмауэре для{' '}
                      <code className="bg-background px-1 rounded">functions.vadim.frolunin</code>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-warning/10 rounded-lg border border-warning/30">
              <div className="flex items-start gap-3">
                <Icon name="AlertTriangle" size={18} className="text-warning mt-0.5" />
                <div className="space-y-2 flex-1">
                  <h4 className="font-semibold">Агент показывает статус "Offline"</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✓ Убедитесь, что агент запущен (проверьте процесс python.exe)</li>
                    <li>✓ Проверьте логи агента в окне командной строки</li>
                    <li>✓ Перезапустите агент</li>
                    <li>✓ Проверьте правильность API endpoint в коде агента</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={18} className="text-primary mt-0.5" />
                <div className="space-y-2 flex-1">
                  <h4 className="font-semibold">Высокая нагрузка на систему</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✓ Увеличьте CHECK_INTERVAL (например, до 300 секунд)</li>
                    <li>✓ Уменьшите количество отслеживаемых директорий</li>
                    <li>✓ Исключите большие директории с частыми изменениями</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Icon name="Rocket" size={32} className="text-primary" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">Система готова к работе!</h3>
              <p className="text-sm text-muted-foreground">
                Следуйте инструкциям выше для развертывания агентов и начните мониторинг конфигураций прямо сейчас
              </p>
            </div>
            <Badge className="bg-success text-success-foreground">v1.0.0</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
