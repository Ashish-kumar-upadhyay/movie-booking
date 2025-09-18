import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="w-4 h-4" />;
    }
    return actualTheme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />;
  };

  const getTooltip = () => {
    if (theme === 'light') return 'Switch to Dark Mode';
    if (theme === 'dark') return 'Switch to System Mode';
    return 'Switch to Light Mode';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={cycleTheme}
        className="relative overflow-hidden group"
        title={getTooltip()}
      >
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {getIcon()}
        </motion.div>
        
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      </Button>
    </motion.div>
  );
}

export function ThemeToggleDropdown() {
  const { theme, setTheme, actualTheme } = useTheme();

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ] as const;

  return (
    <div className="flex items-center space-x-1 bg-card/50 backdrop-blur-sm rounded-lg p-1 border border-border/50">
      {themes.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          variant={theme === value ? "default" : "ghost"}
          size="sm"
          onClick={() => setTheme(value)}
          className={`relative ${
            theme === value
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
              : "hover:bg-accent/50"
          }`}
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
          {theme === value && (
            <motion.div
              layoutId="activeTheme"
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </Button>
      ))}
    </div>
  );
}
