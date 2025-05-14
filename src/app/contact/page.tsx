"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { useThemeColors } from "@/shared/hooks/useThemeColors";
import { RenderContainer } from "@/shared/components/RenderContainer";
import Link from "next/link";

export default function ContactPage() {
  const { t } = useTranslation();
  const { isDark } = useThemeColors();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de envio de formulário
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <RenderContainer>
      <section
        className="py-10 md:py-24 px-4 relative overflow-hidden min-h-[calc(100vh-80px)]"
        style={{
          backgroundColor: isDark ? "#000508" : "#ffffff",
          backgroundImage: isDark
            ? `radial-gradient(circle at 25% 25%, rgba(153, 69, 255, 0.05), transparent 25%), radial-gradient(circle at 75% 75%, rgba(20, 241, 149, 0.05), transparent 25%)`
            : `radial-gradient(circle at 25% 25%, rgba(122, 53, 204, 0.03), transparent 25%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.03), transparent 25%)`,
        }}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -left-20 top-40 w-80 h-80 rounded-full opacity-5 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${
                isDark ? "#14F195" : "#14F195"
              } 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          <motion.div
            className="absolute -right-20 bottom-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${
                isDark ? "#9945FF" : "#9945FF"
              } 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 12,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1,
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <motion.h1
              className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 dark:text-white text-black"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t("contact.title")}
            </motion.h1>
            <motion.h2
              className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-5 md:mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t("contact.subtitle")}
            </motion.h2>
            <motion.p
              className="text-sm md:text-base text-gray-600 dark:text-gray-400 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("contact.description")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {/* Coluna Esquerda - Informações de Contato */}
            <motion.div
              className="flex flex-col space-y-8 md:space-y-12 order-2 md:order-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-black dark:text-white">
                  {t("contact.info.title")}
                </h3>

                <div className="relative p-4 md:p-6 rounded-xl mb-6 md:mb-8" 
                  style={{
                    backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span className="absolute -top-3 left-4 px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: isDark ? "#14F195" : "#0EA66B",
                      color: isDark ? "black" : "white",
                    }}
                  >
                    {t("contact.availability")}
                  </span>
                  <div className="space-y-5 md:space-y-6">
                    {/* LinkedIn */}
                    <div className="flex items-start py-1">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0"
                        style={{
                          backgroundColor: isDark ? "rgba(20, 241, 149, 0.1)" : "rgba(14, 166, 107, 0.1)",
                          color: isDark ? "#14F195" : "#0EA66B",
                        }}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 mb-1">
                          {t("contact.info.linkedin")}
                        </h4>
                        <Link 
                          href="https://www.linkedin.com/in/renancesardev"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-600 dark:text-gray-400 hover:underline inline-block truncate max-w-full py-1"
                        >
                          linkedin.com/in/renancesardev
                        </Link>
                      </div>
                    </div>

                    {/* Telefone */}
                    <div className="flex items-start py-1">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0"
                        style={{
                          backgroundColor: isDark ? "rgba(153, 69, 255, 0.1)" : "rgba(122, 53, 204, 0.1)",
                          color: isDark ? "#9945FF" : "#7A35CC",
                        }}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 mb-1">
                          {t("contact.info.mobile")}
                        </h4>
                        <a
                          href="tel:+5512982389624"
                          className="text-sm text-gray-600 dark:text-gray-400 hover:underline py-1 inline-block"
                        >
                          +55 (12) 98238-9624
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start py-1">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0"
                        style={{
                          backgroundColor: isDark ? "rgba(20, 241, 149, 0.1)" : "rgba(14, 166, 107, 0.1)",
                          color: isDark ? "#14F195" : "#0EA66B",
                        }}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 mb-1">
                          {t("contact.info.email")}
                        </h4>
                        <div className="space-y-2">
                          <a
                            href="mailto:skynancemusic@gmail.com"
                            className="block text-sm text-gray-600 dark:text-gray-400 hover:underline truncate max-w-full py-1"
                          >
                            skynancemusic@gmail.com
                          </a>
                          <a
                            href="mailto:renan.correa@hubweb3.com"
                            className="block text-sm text-gray-600 dark:text-gray-400 hover:underline truncate max-w-full py-1"
                          >
                            renan.correa@hubweb3.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botão LinkedIn */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <a
                    href="https://www.linkedin.com/in/renancesardev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 md:px-6 py-3 md:py-3 rounded-full transition-colors w-full justify-center text-sm md:text-base"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(20, 241, 149, 0.1)"
                        : "rgba(14, 166, 107, 0.1)",
                      color: isDark ? "#14F195" : "#0EA66B",
                      border: `1px solid ${
                        isDark
                          ? "rgba(20, 241, 149, 0.3)"
                          : "rgba(14, 166, 107, 0.3)"
                      }`,
                    }}
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    {t("contact.connect")}
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Coluna Direita - Formulário */}
            <motion.div
              className="order-1 md:order-2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative p-5 md:p-8 rounded-xl"
                style={{
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
                  border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-5 md:mb-6 text-black dark:text-white">
                  {t("contact.form.title")}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-white dark:bg-black/30 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-hub-primary dark:focus:ring-hub-primary text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.form.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-white dark:bg-black/30 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-hub-primary dark:focus:ring-hub-primary text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-white dark:bg-black/30 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-hub-primary dark:focus:ring-hub-primary resize-none text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 md:py-3 px-4 md:px-6 rounded-full font-medium transition-all text-sm md:text-base"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(153, 69, 255, 0.8)"
                          : "rgba(122, 53, 204, 0.8)",
                        color: "white",
                        opacity: isSubmitting ? 0.7 : 1,
                      }}
                    >
                      {isSubmitting
                        ? t("contact.form.sending")
                        : t("contact.form.submit")}
                    </button>
                  </div>

                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-lg text-center text-sm ${
                        submitStatus === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      {submitStatus === "success"
                        ? t("contact.form.success")
                        : t("contact.form.error")}
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </RenderContainer>
  );
}
