import React, { useState, useRef } from "react";

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() || file) {
      onSend(input, file);
      setInput("");
      setFile(null);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form className="p-4 border-t border-[#2d2d2d] bg-[#181c23] flex gap-2 items-center w-full min-w-0" onSubmit={handleSubmit}>
      {/* Attach file button */}
      <button
        type="button"
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200 focus:outline-none focus:ring shrink-0"
        aria-label="Attach file"
        onClick={handleAttachClick}
      >
        {/* Paperclip icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l7.07-7.07a4 4 0 10-5.656-5.657l-7.07 7.07a6 6 0 108.485 8.485l6.364-6.364" />
        </svg>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </button>
      <input
        type="text"
        className="flex-1 min-w-0 border border-[#2d2d2d] rounded px-3 py-2 focus:outline-none focus:ring focus:border-red-500 bg-gray-900 text-gray-100"
        placeholder="Ketik pesan..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      {/* Show selected file name */}
      {file && (
        <span className="truncate max-w-[100px] text-xs text-gray-300 bg-gray-700 rounded px-2 py-1">{file.name}</span>
      )}
      {/* Mic button */}
      <button
        type="button"
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200 focus:outline-none focus:ring shrink-0"
        aria-label="Voice input"
        tabIndex={-1}
      >
        {/* Mic icon (OpenAI style) */}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="" className="h-[18px] w-[18px]" fontSize="inherit"><path d="M11.165 4.41699C11.165 3.22048 10.1955 2.25018 8.99902 2.25C7.80241 2.25 6.83203 3.22038 6.83203 4.41699V8.16699C6.83221 9.36346 7.80252 10.333 8.99902 10.333C10.1954 10.3328 11.1649 9.36335 11.165 8.16699V4.41699ZM12.665 8.16699C12.6649 10.1918 11.0238 11.8328 8.99902 11.833C6.97409 11.833 5.33221 10.1919 5.33203 8.16699V4.41699C5.33203 2.39195 6.97398 0.75 8.99902 0.75C11.0239 0.750176 12.665 2.39206 12.665 4.41699V8.16699Z" fill="currentColor"></path><path d="M14.8058 9.11426C14.4089 8.99623 13.9915 9.22244 13.8732 9.61914C13.2481 11.7194 11.3018 13.25 9.00011 13.25C6.69845 13.25 4.75214 11.7194 4.12706 9.61914C4.00876 9.22245 3.59126 8.99626 3.19444 9.11426C2.79744 9.23241 2.57141 9.65085 2.68956 10.0479C3.43005 12.5353 5.60114 14.4067 8.25011 14.707V15.75H6.91612C6.50191 15.75 6.16612 16.0858 6.16612 16.5C6.16612 16.9142 6.50191 17.25 6.91612 17.25H11.0831L11.1593 17.2461C11.5376 17.2078 11.8331 16.8884 11.8331 16.5C11.8331 16.1116 11.5376 15.7922 11.1593 15.7539L11.0831 15.75H9.75011V14.707C12.3991 14.4066 14.5702 12.5353 15.3107 10.0479C15.4288 9.65085 15.2028 9.23241 14.8058 9.11426Z" fill="currentColor"></path></svg>
      </button>
      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 shrink-0">Kirim</button>
    </form>
  );
}
