"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [textMessage, setTextMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setTextMessage('Email sent successfully, I will get back to you soon.');
        setIsModalOpen(false);
      } else {
        setTextMessage('An error occurred. Please try again.');
        setIsModalOpen(false);
      }
      setTimeout(() => setTextMessage(''), 3000);
    } catch (error) {
      console.error("Error submitting the form:", error);
      setTextMessage('An error occurred. Please try again.');
      setIsModalOpen(false);
      setTimeout(() => setTextMessage(''), 3000);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("tomozkan0@icloud.com");
    setIsCopied(true);
  };

  return (
    <div>
      {isModalOpen && (
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-black backdrop-blur-md bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 w-3/5 rounded-lg">
            <div
              onClick={() => setIsModalOpen(false)}
              className="flex justify-center text-white font-semibold bg-gray-400 w-6 h-6 hover:bg-red-600 rounded-full cursor-pointer"
            >
              X
            </div>
            <h1 className="my-2 font-semibold text-xl">Contact me</h1>
            <form onSubmit={handleSubmit}>
              <div className="my-2">
                <label className="block font-semibold">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="my-2">
                <label className="block font-semibold">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="my-2">
                <label className="block font-semibold">Message:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 px-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-lg mt-8"
      >
        Contact me!
      </button>
      <div
        onClick={handleCopy}
        className="cursor-pointer text-center mt-2 mb-12 flex flex-row gap-1 items-center"
      >
                <p className="inline-flex font-light text-sm text-gray-500 "> Or take my mail ;)  </p> 
        {isCopied ? (
          <Image src="/Copywhite.png" alt="check icon" width={20} height={20} />
        ) : (
          <Image src="/Copy.png" alt="copy icon" width={20} height={20} />
        )}
      </div>
      <AnimatePresence>
        {textMessage && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 m-4 rounded-md z-50 left-0 text-center text-lg font-semibold bg-blue-500 hover:bg-blue-700 duration-100 cursor-pointer text-white p-2"
          >
            {textMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
