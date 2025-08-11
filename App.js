import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initThreeBackground } from './utils/threeBackground';
import FileCard from './components/FileCard';
import RickNotification from './components/RickNotification';
import { filesData, freeFile } from './mock/filesData';
import { FaWhatsapp } from 'react-icons/fa'; // ¡Aquí está la magia!

const App = () => {
  const [activeTab, setActiveTab] = useState('inicio');
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    initThreeBackground('bg');

    const calculateTimeLeft = () => {
      const now = new Date();
      const nextMonday = new Date(now);
      nextMonday.setDate(now.getDate() + (1 + 7 - now.getDay()) % 7);
      nextMonday.setHours(0, 0, 0, 0);

      const difference = nextMonday - now;

      if (difference <= 0) {
        setTimeLeft("¡Tiempo agotado!");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 pb-8 relative">
      <canvas id="bg" className="absolute inset-0"></canvas>

      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-900 to-indigo-900 bg-opacity-80 backdrop-blur-md p-4 text-center shadow-lg z-50">
        <h1 className="text-3xl font-extrabold text-white mb-1">SEÑOR RICK</h1>
        <p className="text-gray-300 text-lg">Bienvenido internauta :D 👩‍🚀</p>
      </div>

      <div className="fixed top-24 left-1/2 transform -translate-x-1/2 w-11/12 max-w-xl bg-white/10 backdrop-blur-lg rounded-full p-2 shadow-xl flex justify-around z-40">
        <motion.button
          className={`flex-1 py-3 px-4 rounded-full text-lg font-semibold transition-colors duration-300 ${activeTab === 'inicio' ? 'bg-white text-purple-800 shadow-md' : 'text-white hover:bg-white/20'}`}
          onClick={() => setActiveTab('inicio')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Inicio
        </motion.button>
        <motion.button
          className={`flex-1 py-3 px-4 rounded-full text-lg font-semibold transition-colors duration-300 ${activeTab === 'servicios' ? 'bg-white text-purple-800 shadow-md' : 'text-white hover:bg-white/20'}`}
          onClick={() => setActiveTab('servicios')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Archivo gratis
        </motion.button>
        <motion.button
          className={`flex-1 py-3 px-4 rounded-full text-lg font-semibold transition-colors duration-300 ${activeTab === 'contacto' ? 'bg-white text-purple-800 shadow-md' : 'text-white hover:bg-white/20'}`}
          onClick={() => setActiveTab('contacto')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contacto
        </motion.button>
      </div>

      <motion.div
        className="w-11/12 max-w-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl mt-40 relative z-30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {activeTab === 'inicio' && (
            <motion.section
              key="inicio"
              className="text-center"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Archivos Disponibles 📁</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filesData.map(file => (
                  <FileCard key={file.id} file={file} />
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === 'servicios' && (
            <motion.section
              key="servicios"
              className="text-center"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Archivo gratis de la semana 📂</h2>
              <p className="text-xl font-semibold text-red-400 mb-4">Tiempo restante: <span id="tiempo-restante">{timeLeft}</span></p>
              <img src={freeFile.img} alt="Dragon Ball Archivo Gratis" className="w-full max-w-xs mx-auto rounded-lg shadow-lg mb-6" />
              <p className="text-gray-300 mb-6">{freeFile.description}</p>
              <motion.a
                href={freeFile.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="mr-2" /> Obtener Archivo
              </motion.a>
            </motion.section>
          )}

          {activeTab === 'contacto' && (
            <motion.section
              key="contacto"
              className="text-center"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Por si necesitas a Rick 👽</h2>
              <RickNotification />
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;