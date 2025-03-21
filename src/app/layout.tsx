'use client'; // Tornamos o layout client-side para gerenciar o estado do tema

import { useState, useEffect } from 'react';
import '../styles/globals.css';
import Header from '@/components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  // Carrega a preferência do tema do localStorage ao montar
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Alterna o tema ao clicar no botão
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
      return newMode;
    });
  };

  return (
    <html lang="pt-BR" className={darkMode ? 'dark' : ''}>
      <body className="transition-colors duration-300">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        {children}
      </body>
    </html>
  );
}