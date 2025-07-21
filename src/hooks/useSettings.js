import { useState, useEffect } from 'react';

export const useSettings = () => {
  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app-settings');
      return saved ? JSON.parse(saved) : {
        backgroundIndex: 0,
        autoChange: false,
        animationSpeed: 'normal'
      };
    }
    return {
      backgroundIndex: 0,
      autoChange: false,
      animationSpeed: 'normal'
    };
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