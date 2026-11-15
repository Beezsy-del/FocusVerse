import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { Character } from '../types/character';
import { audioEngine } from '../utils/audioEngine';
import { UserFocusAction } from '../components/AudioCodeFooter';
import { rpgStore } from '../utils/rpgStore';
import { RPGTask } from '../types/rpg';
import { tutorDialogueService } from '../utils/tutorDialogueService';

export type TimerType = 'POMODORO' | 'STOPWATCH' | 'COUNTDOWN';
export type PomoPhase = 'FOCUS' | 'SHORT_BREAK' | 'LONG_BREAK';
interface CompletedBlock { id: string; noteName: string; freq: number; durationMinutes: number; timestamp: number; }
interface TimerProps { character?: Character | null; initialTask?: RPGTask | null; }
function useTimerController({ character, initialTask }: TimerProps) {
  const [settings, setSettings] = useState(() => rpgStore.getSettings());
  const [action, onActionChange] = useState<UserFocusAction>('IDLE');
  const [mode, onModeChange] = useState('POMO: FOCUS');
  const [timerType, setTimerType] = useState<TimerType>('POMODORO');
  const [pomoPhase, setPomoPhase] = useState<PomoPhase>('FOCUS');

  // Custom durations in seconds
  const [focusDur, setFocusDur] = useState(settings.timerPresets.focus * 60);
  const [shortBreakDur, setShortBreakDur] = useState(settings.timerPresets.shortBreak * 60);
  const [longBreakDur, setLongBreakDur] = useState(settings.timerPresets.longBreak * 60);

  // Active Timer state
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeftMs, setTimeLeftMs] = useState(settings.timerPresets.focus * 60 * 1000);
  const [totalDurationMs, setTotalDurationMs] = useState(settings.timerPresets.focus * 60 * 1000);

  // Stopwatch state
  const [stopwatchMs, setStopwatchMs] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  // Distraction Counter
  const [distractions, setDistractions] = useState<number>(0);

  // Task Association
  const [tasks, setTasks] = useState<RPGTask[]>(() => rpgStore.getTasks());
  const [selectedTaskId, setSelectedTaskId] = useState<string>(initialTask?.id || '');

  // Daily Goal state
  const [todayCompletedMins, setTodayCompletedMins] = useState<number>(() => rpgStore.getTodayMins());

  // Completed Session Notes (Musical Focus Song)
  const [sessionNotes, setSessionNotes] = useState<CompletedBlock[]>(() => {
    try {
      const saved = localStorage.getItem('focusverse_session_notes');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      { id: '1', noteName: 'NOTE 1 (C4)', freq: 261.63, durationMinutes: 25, timestamp: Date.now() - 3600000 },
      { id: '2', noteName: 'NOTE 2 (E4)', freq: 329.63, durationMinutes: 20, timestamp: Date.now() - 1800000 },
    ];
  });

  // Retro Sunset Victory Animation
  const [showVictory, setShowVictory] = useState(false);
  const [breakOffered, setBreakOffered] = useState(false);

  // Timestamp references for drift-free timing
  const endTimeRef = useRef<number>(0);
  const stopwatchStartRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const completionHandled = useRef(false);
  const latestCompletion = useRef<() => void>(() => {});

  useEffect(() => {
    const update = () => setSettings(rpgStore.getSettings());
    window.addEventListener('focusverse_settings_changed', update);
    return () => window.removeEventListener('focusverse_settings_changed', update);
  }, []);

  // New defaults must not reset a running or partially completed session.
  useEffect(() => {
    setFocusDur(settings.timerPresets.focus * 60);
    setShortBreakDur(settings.timerPresets.shortBreak * 60);
    setLongBreakDur(settings.timerPresets.longBreak * 60);
    if (!isRunning && timeLeftMs === totalDurationMs && stopwatchMs === 0) {
      const minutes = pomoPhase === 'SHORT_BREAK' ? settings.timerPresets.shortBreak
        : pomoPhase === 'LONG_BREAK' ? settings.timerPresets.longBreak : settings.timerPresets.focus;
      setTimeLeftMs(minutes * 60000);
      setTotalDurationMs(minutes * 60000);
    }
  }, [settings.timerPresets.focus, settings.timerPresets.shortBreak, settings.timerPresets.longBreak]);

  useEffect(() => {
    const update = () => setTasks(rpgStore.getTasks());
    window.addEventListener('focusverse_tasks_changed', update);
    return () => window.removeEventListener('focusverse_tasks_changed', update);
  }, []);

  // Update selected task when initialTask changes
  useEffect(() => {
    if (initialTask) {
      setSelectedTaskId(initialTask.id);
    }
  }, [initialTask]);

  // Handle visibility change (tab switches, sleep wake)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isRunning) {
        if (timerType === 'STOPWATCH') {
          const now = Date.now();
          setStopwatchMs(now - stopwatchStartRef.current);
        } else {
          const remaining = Math.max(0, endTimeRef.current - Date.now());
          setTimeLeftMs(remaining);
          if (remaining <= 0) {
            latestCompletion.current();
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isRunning, timerType]);

  useEffect(() => {
    try {
      localStorage.setItem('focusverse_session_notes', JSON.stringify(sessionNotes));
    } catch (_) {}
  }, [sessionNotes]);

  // Sync mode with parent
  useEffect(() => {
    if (onModeChange) {
      onModeChange(timerType === 'POMODORO' ? `POMO: ${pomoPhase}` : timerType);
    }
  }, [timerType, pomoPhase, onModeChange]);

  // Reset or switch phases
  const selectPomoPhase = (phase: PomoPhase) => {
    audioEngine.playClick();
    setIsRunning(false);
    setPomoPhase(phase);
    let dur = focusDur;
    if (phase === 'SHORT_BREAK') dur = shortBreakDur;
    if (phase === 'LONG_BREAK') dur = longBreakDur;
    setTotalDurationMs(dur * 1000);
    setTimeLeftMs(dur * 1000);
    onActionChange(phase === 'FOCUS' ? 'IDLE' : 'BREAK');

    if (phase === 'SHORT_BREAK' || phase === 'LONG_BREAK') {
      tutorDialogueService.triggerEvent('BREAK_START', character?.id);
    } else {
      tutorDialogueService.triggerEvent('BREAK_RETURN', character?.id);
    }
  };

  // Change focus preset duration
  const selectFocusPreset = (mins: number) => {
    audioEngine.playClick();
    setIsRunning(false);
    setFocusDur(mins * 60);
    if (pomoPhase === 'FOCUS' || timerType !== 'POMODORO') {
      setTotalDurationMs(mins * 60 * 1000);
      setTimeLeftMs(mins * 60 * 1000);
    }
  };

  // Start / Pause
  const toggleTimer = () => {
    audioEngine.playClick();
    if (isRunning) {
      // Pause
      setIsRunning(false);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      onActionChange(timerType === 'POMODORO' && pomoPhase !== 'FOCUS' ? 'BREAK' : 'IDLE');
      tutorDialogueService.triggerEvent('SESSION_PAUSE', character?.id);
    } else {
      // Start
      completionHandled.current = false;
      setIsRunning(true);
      if (timerType === 'STOPWATCH') {
        stopwatchStartRef.current = Date.now() - stopwatchMs;
      } else {
        endTimeRef.current = Date.now() + timeLeftMs;
      }
      onActionChange(pomoPhase === 'FOCUS' || timerType !== 'POMODORO' ? 'FOCUSING' : 'BREAK');

      if (pomoPhase === 'FOCUS' || timerType !== 'POMODORO') {
        if (timeLeftMs < totalDurationMs) {
          tutorDialogueService.triggerEvent('SESSION_RESUME', character?.id);
        } else {
          tutorDialogueService.triggerEvent('SESSION_START', character?.id);
        }
      }
    }
  };

  // Reset
  const resetTimer = () => {
    audioEngine.playClick();
    setIsRunning(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (timerType === 'STOPWATCH') {
      setStopwatchMs(0);
      setLaps([]);
    } else {
      let dur = focusDur;
      if (timerType === 'POMODORO') {
        if (pomoPhase === 'SHORT_BREAK') dur = shortBreakDur;
        if (pomoPhase === 'LONG_BREAK') dur = longBreakDur;
      }
      setTimeLeftMs(dur * 1000);
      setTotalDurationMs(dur * 1000);
    }
    onActionChange(timerType === 'POMODORO' && pomoPhase !== 'FOCUS' ? 'BREAK' : 'IDLE');
  };

  // Record Lap
  const recordLap = () => {
    audioEngine.playClick();
    if (timerType === 'STOPWATCH' && isRunning) {
      setLaps([stopwatchMs, ...laps]);
    }
  };

  // Drift-Free animation loop using Date.now()
  useEffect(() => {
    if (!isRunning) return;

    const tick = () => {
      const now = Date.now();

      if (timerType === 'STOPWATCH') {
        const elapsed = now - stopwatchStartRef.current;
        setStopwatchMs(elapsed);
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        const remaining = Math.max(0, endTimeRef.current - now);
        setTimeLeftMs(remaining);

        if (remaining <= 0) {
          // Timer Completed!
          latestCompletion.current();
        } else {
          animFrameRef.current = requestAnimationFrame(tick);
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
    const backgroundTick = window.setInterval(() => {
      if (timerType !== 'STOPWATCH' && Date.now() >= endTimeRef.current) latestCompletion.current();
    }, 1000);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.clearInterval(backgroundTick);
    };
  }, [isRunning, timerType]);

  const handleCompletion = () => {
    if (completionHandled.current) return;
    completionHandled.current = true;
    setTimeLeftMs(0);
    setIsRunning(false);
    setShowVictory(true);
    setBreakOffered(true);
    onActionChange('COMPLETED');

    const minutesAdded = Math.round(totalDurationMs / (60 * 1000));

    // Only record focus sessions (exclude breaks from focus minutes)
    if (pomoPhase === 'FOCUS' || timerType !== 'POMODORO') {
      const activeTask = tasks.find((t) => t.id === selectedTaskId);
      const effectiveTutorId = character?.id || 'peter-parker';

      // Record to persistent RPG Store
      rpgStore.addSession({
        durationMinutes: minutesAdded,
        plannedMinutes: Math.round(totalDurationMs / 60000),
        timerType,
        subject: activeTask?.subject || 'General Study',
        taskId: activeTask?.id,
        taskTitle: activeTask?.title,
        tutorId: effectiveTutorId,
        distractionCount: distractions,
        completed: true,
      });

      // Trigger tutor completion dialogue
      tutorDialogueService.triggerEvent('SESSION_COMPLETE', effectiveTutorId);

      // Check daily goal celebration
      const prevMins = todayCompletedMins;
      const newTotalMins = rpgStore.getTodayMins();
      setTodayCompletedMins(newTotalMins);
      if (newTotalMins >= settings.dailyGoalMinutes && prevMins < settings.dailyGoalMinutes) {
        tutorDialogueService.triggerEvent('DAILY_GOAL_REACHED', effectiveTutorId);
      }

      // If tied to task, increment actual minutes
      if (activeTask) {
        rpgStore.updateTask(activeTask.id, {
          actualMinutes: (activeTask.actualMinutes || 0) + minutesAdded,
          sessionsCount: (activeTask.sessionsCount || 0) + 1,
        });
      }

      // Add a note to the Focus Song
      const noteNames = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5'];
      const freqs = character?.synthNotes || [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
      const pickIdx = sessionNotes.length % freqs.length;
      const newBlock: CompletedBlock = {
        id: Date.now().toString(),
        noteName: `NOTE ${sessionNotes.length + 1} (${noteNames[pickIdx % noteNames.length]})`,
        freq: freqs[pickIdx],
        durationMinutes: minutesAdded,
        timestamp: Date.now(),
      };
      setSessionNotes((prev) => [...prev, newBlock]);
    }

    // Play Victory Jingle
    audioEngine.playVictoryJingle(character?.synthNotes);

    // Desktop Notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('FocusSprint Completed! ★', {
        body: `${minutesAdded} minutes of deep focus logged in FocusVerse!`,
        icon: '/favicon.ico',
      });
    }
  };

  latestCompletion.current = handleCompletion;

  // Format Helpers
  const formatTime = (ms: number) => {
    const totalSecs = Math.ceil(ms / 1000);
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const formatStopwatch = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    const cs = Math.floor((ms % 1000) / 10);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };

  // Progress Percent
  const progressPercent =
    totalDurationMs > 0 ? Math.min(100, Math.max(0, ((totalDurationMs - timeLeftMs) / totalDurationMs) * 100)) : 0;

  // Segmented progress bar (20 blocks)
  const dailyGoalMins = settings.dailyGoalMinutes || 100;
  const goalPercent = Math.min(100, Math.round((todayCompletedMins / dailyGoalMins) * 100));
  const activeSegments = Math.round((goalPercent / 100) * 20);

  const activeTask = tasks.find((t) => t.id === selectedTaskId);


  return {
    timerType, setTimerType, pomoPhase, focusDur, shortBreakDur, longBreakDur, isRunning, setIsRunning,
    timeLeftMs, totalDurationMs, stopwatchMs, laps, distractions, setDistractions,
    tasks, selectedTaskId, setSelectedTaskId, todayCompletedMins, sessionNotes,
    showVictory, setShowVictory, breakOffered, setBreakOffered,
    selectPomoPhase, selectFocusPreset, toggleTimer, resetTimer, recordLap,
    formatTime, formatStopwatch, progressPercent,
    dailyGoalMins, goalPercent, activeSegments, activeTask, action, mode,
  };
}
const TimerContext = createContext<ReturnType<typeof useTimerController> | null>(null);
const TimerStatusContext = createContext({ action: 'IDLE' as UserFocusAction, mode: 'POMO: FOCUS' });
export function TimerProvider({ children, ...props }: React.PropsWithChildren<TimerProps>) {
  const timer = useTimerController(props);
  const status = useMemo(() => ({ action: timer.action, mode: timer.mode }), [timer.action, timer.mode]);
  return <TimerContext.Provider value={timer}><TimerStatusContext.Provider value={status}>{children}</TimerStatusContext.Provider></TimerContext.Provider>;
}
export function useStudyTimer() {
  const timer = useContext(TimerContext);
  if (!timer) throw new Error('TimerWidget requires TimerProvider');
  return timer;
}
export const useTimerStatus = () => useContext(TimerStatusContext);
