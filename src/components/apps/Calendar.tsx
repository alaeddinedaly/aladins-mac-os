import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Event {
  date: number;
  title: string;
  type: 'work' | 'study' | 'personal';
}

const Calendar = () => {
  const [currentDate] = useState(new Date());
  const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const year = currentDate.getFullYear();

  const events: Event[] = [
    { date: 5, title: 'LynkAi Development', type: 'work' },
    { date: 12, title: 'AI/ML Study Session', type: 'study' },
    { date: 15, title: 'Spring Boot Workshop', type: 'work' },
    { date: 20, title: 'React Native Project', type: 'work' },
    { date: 25, title: 'Portfolio Review', type: 'personal' },
  ];

  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'bg-primary/20 text-primary';
      case 'study':
        return 'bg-accent/20 text-accent';
      default:
        return 'bg-muted/40 text-foreground';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button className="p-2 rounded-lg hover:bg-muted/30 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-xl font-semibold">
          {month} {year}
        </div>
        <button className="p-2 rounded-lg hover:bg-muted/30 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {blanks.map((blank) => (
            <div key={`blank-${blank}`} className="aspect-square" />
          ))}
          {days.map((day) => {
            const dayEvents = events.filter((e) => e.date === day);
            const isToday = day === currentDate.getDate();

            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.05 }}
                className={`aspect-square rounded-lg p-2 cursor-pointer transition-all ${
                  isToday
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'hover:bg-muted/30'
                }`}
              >
                <div className="text-sm">{day}</div>
                {dayEvents.length > 0 && (
                  <div className="mt-1 flex gap-0.5">
                    {dayEvents.map((event, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-current"
                        title={event.title}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-2 pt-4 border-t border-border/30">
        <h3 className="font-semibold">Upcoming Events</h3>
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-3 rounded-lg ${getEventColor(event.type)}`}
          >
            <div className="font-medium">{event.title}</div>
            <div className="text-sm opacity-70">
              {month} {event.date}, {year}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
