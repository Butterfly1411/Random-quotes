import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useSettings } from '../hooks/useSettings';
import ThemeToggle from './ThemeToggle';
import QuoteCard from './QuoteCard';
import BackgroundOverlay from './BackgroundOverlay';
import SettingsModal from './SettingsModal';

// Import images
import blueBg from '../assets/blue-bg.jpg';
import blueClouds from '../assets/blue-clouds.jpg';
import lightBg from '../assets/light-bg.jpg';
import rainBg from '../assets/rain-bg.jpg';
import rainWindow from '../assets/rain-window-bg.jpg';
import stairsBg from '../assets/stairs-mountain-bg.jpg';
import turkeyBg from '../assets/turkey-bg.jpg';
import winterBg from '../assets/winter-ng.webp';
import clouds from '../assets/coluds.jpg';
import mountain from '../assets/mountain-bg.jpg';
import raintraffic from '../assets/rain-traffic.jpg';
import space from '../assets/space-bg.jpg';
import font from '../assets/font-bg.jpg';

const quotes = [
    { text: "Ilmni boshi mashaqqat, oxiri bitmas foyda-yu manfaatdir", author: "Omad kaliting yuzinchi kitobi" },
    { text: "Qalb insonning borliq olamidir", author: "Qalb iffati" },
    { text: "Ko'ngil og'rigan bolsa, ham kongil og'ritma", author: "Ishqga oshiqman" },
    { text: "Yashamoq degani esa dunyoga, hayotga va o'limga konikmoq deganidir", author: "Ishqga oshiqman" },
    { text: "Biroq dunyoga maftun bolgan ko'nglim emas, balki unga oshiq nafsimdir", author: "Ishqga oshiqman" },
    { text: "Inson ko'rmaganiga oshiq bo'ladi, ko'rganiga esa muxlis", author: "Ishqga oshiqman" },
    { text: "Muvaffaqiyat yolidagi eng katta tosiq muvaffaqiyatsizlik emas, balki zerikishdir", author: "Atom Odatlari" },
    { text: "Odat + Ongli mashgulot = yuksak maxorat", author: "Atom Odatlari" },
    { text: "Sog'inch — Ruh bora oladigan joyga tananing bora olmasligidir", author: "Kitob" },
    { text: "Sabr bu qalbingni yorishtiradigan otashdir", author: "Barchasi senga atalgan" },
    { text: "Axloq xayodir, xayo esa iffatdir", author: "Qalb iffati" },
    { text: "Agar baxtli bolmoqchi bolsangiz, boshqalarni baxtli qiling", author: "Kitob" },
    { text: "Taffakur - bu bir g'oya, fikr yoki haqiqatni olish va uni chuqur tahlil qilishdir", author: "Gayriixtiyoriy ong mojizasi" },
    { text: "Ajaldan ko'ra ko'proq, rizqing seni ta'qib qiladi", author: "Omad kaliting yuzinchi kitobi" },
    { text: "Eslash uchun unutish kerak-ku!", author: "Ishqga oshiqman" },
];

const images = [
    blueBg, blueClouds, lightBg, rainBg, rainWindow, stairsBg, 
    turkeyBg, winterBg, clouds, mountain, space, font, raintraffic
];

const Quotes = () => {
    const { theme, toggleTheme } = useTheme();
    const { settings, updateSetting } = useSettings();
    const [quote, setQuote] = useState(quotes[0]);
    const [bgImage, setBgImage] = useState(images[settings.backgroundIndex]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        getRandom();
    }, []);

    // Update background when settings change
    useEffect(() => {
        setBgImage(images[settings.backgroundIndex]);
    }, [settings.backgroundIndex]);

    // Auto change quotes
    useEffect(() => {
        if (settings.autoChange) {
            const interval = setInterval(() => {
                getRandom();
            }, 10000); // 10 seconds

            return () => clearInterval(interval);
        }
    }, [settings.autoChange]);
    const getRandom = async () => {
        setIsLoading(true);
        
        // Simulate loading for better UX
        const loadingTime = settings.animationSpeed === 'fast' ? 400 : 
                           settings.animationSpeed === 'slow' ? 1200 : 800;
        await new Promise(resolve => setTimeout(resolve, loadingTime));
        
        const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
        
        setQuote(quotes[randomQuoteIndex]);
        
        // Don't change background when getting random quote
        // Background only changes through settings
        
        setIsLoading(false);
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <motion.div
                key={bgImage}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                    duration: settings.animationSpeed === 'fast' ? 0.8 : 
                             settings.animationSpeed === 'slow' ? 2.2 : 1.5, 
                    ease: "easeOut" 
                }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bgImage})` }}
            />
            
            {/* Background Overlay */}
            <BackgroundOverlay />
            
            {/* Theme Toggle & Settings */}
            <ThemeToggle 
                theme={theme} 
                toggleTheme={toggleTheme} 
                onSettingsClick={() => setShowSettings(true)}
            />

            {/* Settings Modal */}
            <SettingsModal
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                settings={settings}
                updateSetting={updateSetting}
                images={images}
                currentBgIndex={settings.backgroundIndex}
            />
            
            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <AnimatePresence mode="wait">
                    <QuoteCard
                        quote={quote} 
                        onGenerate={getRandom}
                        isLoading={isLoading}
                        animationSpeed={settings.animationSpeed}
                    />
                </AnimatePresence>
            </div>
            
            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
            >
                <p className="text-white/70 dark:text-gray-400/70 text-sm text-center drop-shadow-md">
                    Ilhomli iqtiboslar to'plami
                </p>
            </motion.footer>
        </div>
    );
};

export default Quotes;