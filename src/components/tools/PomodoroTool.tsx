'use client';

import { useState, useEffect, useRef } from 'react';
import { LocalStorage } from '@/lib/storage';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  pomodoros: number;
  estimatedPomodoros: number;
}

interface PomodoroSettings {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  longBreakInterval: number;
}

type TimerType = 'pomodoro' | 'shortBreak' | 'longBreak';

export default function PomodoroTool() {
  const [settings, setSettings] = useState<PomodoroSettings>({
    pomodoroTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    longBreakInterval: 4
  });

  const [timerType, setTimerType] = useState<TimerType>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(settings.pomodoroTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedTasks = LocalStorage.get<Task[]>('pomodoro-tasks', []);
    const savedPomodoros = LocalStorage.get<number>('completed-pomodoros', 0);
    const savedSettings = LocalStorage.get<PomodoroSettings>('pomodoro-settings', settings);
    
    setTasks(savedTasks || []);
    setCompletedPomodoros(savedPomodoros || 0);
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

  useEffect(() => {
    LocalStorage.set('pomodoro-tasks', tasks);
  }, [tasks]);

  useEffect(() => {
    LocalStorage.set('completed-pomodoros', completedPomodoros);
  }, [completedPomodoros]);

  useEffect(() => {
    LocalStorage.set('pomodoro-settings', settings);
  }, [settings]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    const resetTime = () => {
      switch (timerType) {
        case 'pomodoro':
          return settings.pomodoroTime * 60;
        case 'shortBreak':
          return settings.shortBreakTime * 60;
        case 'longBreak':
          return settings.longBreakTime * 60;
        default:
          return settings.pomodoroTime * 60;
      }
    };
    
    setTimeLeft(resetTime());
    setIsRunning(false);
  }, [timerType, settings]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (timerType === 'pomodoro') {
      const newCount = completedPomodoros + 1;
      setCompletedPomodoros(newCount);
      
      // Auto switch to break
      if (newCount % settings.longBreakInterval === 0) {
        setTimerType('longBreak');
      } else {
        setTimerType('shortBreak');
      }
      
      // Play notification sound (using Web Audio API as fallback)
      playNotificationSound();
    } else {
      // Switch back to pomodoro after break
      setTimerType('pomodoro');
      playNotificationSound();
    }
  };

  const playNotificationSound = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const skipToNext = () => {
    switch (timerType) {
      case 'pomodoro':
        setTimerType('shortBreak');
        break;
      case 'shortBreak':
        setTimerType('pomodoro');
        break;
      case 'longBreak':
        setTimerType('pomodoro');
        break;
    }
  };

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        pomodoros: 0,
        estimatedPomodoros: 1
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
      setShowTaskInput(false);
    }
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const updateSetting = (key: keyof PomodoroSettings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const getTimerColor = () => {
    switch (timerType) {
      case 'pomodoro':
        return 'bg-red-500';
      case 'shortBreak':
        return 'bg-green-500';
      case 'longBreak':
        return 'bg-blue-500';
      default:
        return 'bg-red-500';
    }
  };

  const getTimerBgColor = () => {
    switch (timerType) {
      case 'pomodoro':
        return 'from-red-50 to-red-100';
      case 'shortBreak':
        return 'from-green-50 to-green-100';
      case 'longBreak':
        return 'from-blue-50 to-blue-100';
      default:
        return 'from-red-50 to-red-100';
    }
  };

  const getProgressPercentage = () => {
    const totalTime = settings[timerType === 'pomodoro' ? 'pomodoroTime' : timerType === 'shortBreak' ? 'shortBreakTime' : 'longBreakTime'] * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Settings Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowSettings(true)}
          className="text-gray-600 hover:text-gray-800 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          ⚙️ Settings
        </button>
      </div>

      <div className={`bg-gradient-to-b ${getTimerBgColor()} rounded-lg p-8 mb-6`}>
        {/* Timer Type Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setTimerType('pomodoro')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              timerType === 'pomodoro' 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            Pomodoro ({settings.pomodoroTime}m)
          </button>
          <button
            onClick={() => setTimerType('shortBreak')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              timerType === 'shortBreak' 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            Short Break ({settings.shortBreakTime}m)
          </button>
          <button
            onClick={() => setTimerType('longBreak')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              timerType === 'longBreak' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            Long Break ({settings.longBreakTime}m)
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className="text-7xl font-bold text-gray-800 mb-6 font-mono">
            {formatTime(timeLeft)}
          </div>
          
          {/* Control Buttons */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={toggleTimer}
              className={`${getTimerColor()} text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg`}
            >
              {isRunning ? 'PAUSE' : 'START'}
            </button>
            <button
              onClick={skipToNext}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              SKIP
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/50 rounded-full h-2 mb-4">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${getTimerColor()}`}
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        {/* Stats */}
        <div className="text-center text-gray-600">
          <p>Completed Pomodoros: <span className="font-bold text-gray-800">{completedPomodoros}</span></p>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Tasks</h3>
          <div className="flex gap-2">
            {tasks.some(task => task.completed) && (
              <button
                onClick={clearCompletedTasks}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Clear Completed
              </button>
            )}
            {tasks.length > 0 && (
              <button
                onClick={clearAllTasks}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Add Task */}
        {showTaskInput ? (
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Enter task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              autoFocus
            />
            <button
              onClick={addTask}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowTaskInput(false);
                setNewTaskText('');
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowTaskInput(true)}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
          >
            + Add Task
          </button>
        )}

        {/* Task List */}
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No tasks yet. Add your first task to get started!</p>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 bg-white rounded-md border ${task.completed ? 'border-gray-200 opacity-60' : 'border-gray-300'}`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskComplete(task.id)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {task.text}
                </span>
                <span className="text-sm text-gray-500">
                  {task.pomodoros}/{task.estimatedPomodoros} 🍅
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={() => setShowSettings(false)}>
          <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-lg p-6 w-full max-w-md border border-gray-200 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Timer Settings</h3>
              <button 
                onClick={() => setShowSettings(false)} 
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pomodoro Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={settings.pomodoroTime}
                  onChange={(e) => updateSetting('pomodoroTime', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Break Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={settings.shortBreakTime}
                  onChange={(e) => updateSetting('shortBreakTime', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Long Break Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={settings.longBreakTime}
                  onChange={(e) => updateSetting('longBreakTime', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Long Break Interval (pomodoros)
                </label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={settings.longBreakInterval}
                  onChange={(e) => updateSetting('longBreakInterval', parseInt(e.target.value) || 4)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Number of pomodoros before a long break
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
