import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/outline';

export default function ModeSwitcher() {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div>
      {currentTheme === 'dark' ? (
        <SunIcon className="navBtn text-yellow-500" role="button" onClick={() => setTheme('light')} />
      ) : (
        <MoonIcon className="navBtn" role="button" onClick={() => setTheme('dark')} />
      )}
    </div>
  );
}
