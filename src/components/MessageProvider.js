import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);

    return (
        <MessageContext.Provider value={{ message, setMessage }}>
            {children}
            {message && 
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
                <div className="bg-gray-900 p-6 rounded shadow-lg max-w-xl w-full max-h-xl">
                    <div className="text-white">{message}</div>
                    
                    <div className="mt-4 flex justify-end">
                        <button
                            className="text-gray-300 bg-gray-700 px-3 py-1 hover:bg-gray-800 transition rounded"
                            onClick={() => {
                               setMessage("");
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>}
        </MessageContext.Provider>
    );
};

export const useMessage = () => useContext(MessageContext);
