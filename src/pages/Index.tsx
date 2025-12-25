import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ReflectionEntry {
  id: string;
  prompt: string;
  answer: string;
  confidence: number;
  date: string;
}

const prompts = [
  "When I learn a foreign language, I feel...",
  "For me, learning English / Chinese now is difficult because...",
  "I learn best when...",
  "My main goal for now in learning a foreign language is...",
  "Today I noticed that...",
  "The most interesting thing in my language journey is..."
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [confidence, setConfidence] = useState([3]);
  const [entries, setEntries] = useState<ReflectionEntry[]>([
    {
      id: '1',
      prompt: prompts[0],
      answer: "more confident each day",
      confidence: 4,
      date: '2025-12-20'
    },
    {
      id: '2',
      prompt: prompts[1],
      answer: "lack of practice time",
      confidence: 3,
      date: '2025-12-22'
    },
    {
      id: '3',
      prompt: prompts[2],
      answer: "I have clear structure and regular practice",
      confidence: 5,
      date: '2025-12-24'
    }
  ]);

  const chartData = entries.map((entry, idx) => ({
    day: idx + 1,
    motivation: entry.confidence,
    confidence: entry.confidence
  }));

  const averageMotivation = entries.length > 0 
    ? Math.round((entries.reduce((sum, e) => sum + e.confidence, 0) / entries.length) * 10) / 10
    : 0;

  const handleSubmit = () => {
    if (answer.trim()) {
      const newEntry: ReflectionEntry = {
        id: Date.now().toString(),
        prompt: prompts[currentPromptIndex],
        answer: answer.trim(),
        confidence: confidence[0],
        date: new Date().toISOString().split('T')[0]
      };
      setEntries([...entries, newEntry]);
      setAnswer('');
      setConfidence([3]);
      setCurrentPromptIndex((currentPromptIndex + 1) % prompts.length);
      setActiveTab('progress');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] via-white to-[#E5DEFF]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="BookOpen" size={40} className="text-primary" />
            <h1 className="text-5xl font-bold text-primary">LangStep</h1>
          </div>
          <p className="text-xl text-muted-foreground italic">One step — one insight.</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Icon name="Home" size={18} />
              <span>Главная</span>
            </TabsTrigger>
            <TabsTrigger value="reflection" className="flex items-center gap-2">
              <Icon name="PenLine" size={18} />
              <span>Рефлексия</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Icon name="TrendingUp" size={18} />
              <span>Прогресс</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="animate-scale-in">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" size={24} className="text-primary" />
                    Для кого LangStep?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="GraduationCap" size={20} className="text-primary mt-1" />
                    <p>Студенты-филологи</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Languages" size={20} className="text-primary mt-1" />
                    <p>Студенты, изучающие два иностранных языка</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Sparkles" size={20} className="text-primary mt-1" />
                    <p>Начинающие и продолжающие изучать английский и/или китайский</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Lightbulb" size={24} className="text-primary" />
                    Что вы получите?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="MessageSquare" size={20} className="text-primary mt-1" />
                    <p>Короткие рефлексивные задания для осознанности</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="BarChart3" size={20} className="text-primary mt-1" />
                    <p>Отслеживание мотивации и уверенности</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={20} className="text-primary mt-1" />
                    <p>История изменений и личная динамика</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 bg-gradient-to-r from-primary/5 to-accent/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <Icon name="Compass" size={28} />
                  Начните свой путь
                </CardTitle>
                <CardDescription className="text-center text-base">
                  Каждый шаг саморефлексии — это шаг к глубокому пониманию вашего процесса обучения
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  size="lg" 
                  onClick={() => setActiveTab('reflection')}
                  className="gap-2"
                >
                  <Icon name="ArrowRight" size={20} />
                  Перейти к рефлексии
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reflection" className="animate-scale-in">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="PenLine" size={24} className="text-primary" />
                  Завершите фразу
                </CardTitle>
                <CardDescription>
                  Вопрос {currentPromptIndex + 1} из {prompts.length}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-accent/30 rounded-lg border border-primary/20">
                  <p className="text-lg font-medium text-foreground italic">
                    "{prompts[currentPromptIndex]}"
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Ваш ответ</label>
                  <Textarea 
                    placeholder="Напишите ваши мысли..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Уровень уверенности
                    </label>
                    <span className="text-2xl font-bold text-primary">
                      {confidence[0]}
                    </span>
                  </div>
                  <Slider 
                    value={confidence}
                    onValueChange={setConfidence}
                    min={1}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Не уверен</span>
                    <span>Очень уверен</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={handleSubmit} 
                    className="flex-1 gap-2"
                    disabled={!answer.trim()}
                  >
                    <Icon name="Check" size={18} />
                    Сохранить ответ
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setCurrentPromptIndex((currentPromptIndex + 1) % prompts.length);
                      setAnswer('');
                      setConfidence([3]);
                    }}
                  >
                    <Icon name="SkipForward" size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="animate-scale-in space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Всего записей
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Icon name="FileText" size={32} className="text-primary" />
                    <span className="text-4xl font-bold">{entries.length}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Средняя мотивация
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Icon name="Heart" size={32} className="text-primary" />
                    <span className="text-4xl font-bold">{averageMotivation}</span>
                    <span className="text-muted-foreground">/5</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Прогресс
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Progress value={(averageMotivation / 5) * 100} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {averageMotivation >= 4 ? "Отличная динамика!" : 
                     averageMotivation >= 3 ? "Стабильный рост" : 
                     "Нужна поддержка"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="LineChart" size={24} className="text-primary" />
                  Динамика мотивации
                </CardTitle>
                <CardDescription>
                  График изменения уровня уверенности и мотивации
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5DEFF" />
                      <XAxis 
                        dataKey="day" 
                        label={{ value: 'День', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        domain={[0, 5]}
                        label={{ value: 'Уровень', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="motivation" 
                        stroke="#6E59A5" 
                        strokeWidth={3}
                        dot={{ fill: '#6E59A5', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="History" size={24} className="text-primary" />
                  История ответов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {entries.slice().reverse().map((entry) => (
                  <div 
                    key={entry.id} 
                    className="p-4 bg-accent/20 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium italic text-muted-foreground">
                        {entry.prompt}
                      </p>
                      <div className="flex items-center gap-1 shrink-0 ml-3">
                        <Icon name="Star" size={16} className="text-primary fill-primary" />
                        <span className="font-bold">{entry.confidence}</span>
                      </div>
                    </div>
                    <p className="text-foreground mb-2">{entry.answer}</p>
                    <p className="text-xs text-muted-foreground">{entry.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
