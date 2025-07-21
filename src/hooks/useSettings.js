import { useState, useEffect } from 'react';

const DEFAULT_SETTINGS = {
  backgroundIndex: 0,
  autoChange: false,
  animationSpeed: 'normal',
  fontSize: 'medium',
  textStyle: 'normal',
  soundEffects: false
};

export const useSettings = () => {
  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app-settings');
      if (saved) {
        try {
          const parsedSettings = JSON.parse(saved);
          // Merge with defaults to ensure all properties exist
          return { ...DEFAULT_SETTINGS, ...parsedSettings };
        } catch (error) {
          console.warn('Failed to parse settings from localStorage:', error);
          return DEFAULT_SETTINGS;
        }
      }
      return DEFAULT_SETTINGS;
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-settings', JSON.stringify(settings));
    }
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return { settings, updateSetting };
};