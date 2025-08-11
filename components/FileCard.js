import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const FileCard = ({ file }) => {
  return (
    <motion.article
      className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={file.img} alt={file.title} className="w-24 h-24 rounded-lg shadow-md mb-4 object-cover" />
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">{file.title}</h3>
        <p className="text-sm text-gray-300 mb-4">{file.description}</p>
        <span className="text-xl font-extrabold text-red-400 block mb-4">{file.price}</span>
        <motion.a
          href={file.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaWhatsapp className="mr-2" /> Comprar
        </motion.a>
      </div>
    </motion.article>
  );
};

export default FileCard;