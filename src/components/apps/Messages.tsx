import { useState } from 'react';
import { Search, Edit, Phone, Video, Info, User } from 'lucide-react';

const chats = [
    {
        id: 1,
        name: 'Sarah Jen (Mentor)',
        avatar: '👩‍💻',
        lastMessage: 'Aladin is one of the most dedicated devs I know...',
        time: 'Yesterday',
        messages: [
            { id: 1, text: 'Hey Sarah! Do you have a minute to write a quick recommendation?', sender: 'me', time: 'Yesterday 9:41 AM' },
            { id: 2, text: 'Absolutely! Here you go:', sender: 'them', time: 'Yesterday 10:00 AM' },
            { id: 3, text: 'Aladin is one of the most dedicated developers I know. He never gives up on a bug and always finds creative solutions. His UI work is top-notch!', sender: 'them', time: 'Yesterday 10:05 AM' },
            { id: 4, text: 'Thank you so much! 🙏', sender: 'me', time: 'Yesterday 10:06 AM' }
        ]
    },
    {
        id: 2,
        name: 'Tech Lead (Previous Job)',
        avatar: '👨‍💼',
        lastMessage: 'Great job on the migration!',
        time: 'Tuesday',
        messages: [
            { id: 1, text: 'Great job on the migration project, Aladin.', sender: 'them', time: 'Tuesday 2:30 PM' },
            { id: 2, text: 'Your attention to detail saved us a lot of headaches in production. Keep it up!', sender: 'them', time: 'Tuesday 2:31 PM' }
        ]
    },
    {
        id: 3,
        name: 'Project Client',
        avatar: '🚀',
        lastMessage: 'The new design increased our conversions by 20%!',
        time: 'Monday',
        messages: [
            { id: 1, text: 'Just wanted to share some stats with you.', sender: 'them', time: 'Monday 9:00 AM' },
            { id: 2, text: 'The new design you implemented increased our conversions by 20% in just one week! 📈', sender: 'them', time: 'Monday 9:01 AM' },
            { id: 3, text: 'That is amazing news! Glad I could help.', sender: 'me', time: 'Monday 9:15 AM' }
        ]
    }
];

const Messages = () => {
    const [selectedChatId, setSelectedChatId] = useState(1);
    const selectedChat = chats.find(c => c.id === selectedChatId) || chats[0];
    const [inputText, setInputText] = useState('');

    return (
        <div className="flex h-full bg-white dark:bg-[#1e1e1e] text-sm overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 border-r border-gray-200 dark:border-neutral-800 flex flex-col bg-white/50 dark:bg-[#252526]/50 backdrop-blur-xl">
                <div className="h-12 flex items-center justify-between px-4 mt-2">
                    <span className="font-bold text-lg text-gray-800 dark:text-gray-100">Messages</span>
                    <Edit className="w-5 h-5 text-blue-500 cursor-pointer" />
                </div>
                <div className="px-4 pb-2">
                    <div className="bg-gray-100 dark:bg-[#333333] rounded-md px-3 py-1.5 flex items-center gap-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-xs w-full" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChatId(chat.id)}
                            className={`px-4 py-3 flex gap-3 cursor-pointer transition-colors ${selectedChatId === chat.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-white/5'}`}
                        >
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg shadow-sm border border-white/10">
                                {chat.avatar}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-baseline">
                                    <span className={`font-semibold truncate ${selectedChatId === chat.id ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>{chat.name}</span>
                                    <span className={`text-xs ${selectedChatId === chat.id ? 'text-blue-100' : 'text-gray-400'}`}>{chat.time}</span>
                                </div>
                                <p className={`text-xs truncate leading-relaxed ${selectedChatId === chat.id ? 'text-blue-50' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {chat.lastMessage}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e]">
                {/* Header */}
                <div className="h-14 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between px-6 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-md z-10">
                    <div className="flex flex-col items-center mx-auto">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm">To: <span className="text-blue-500 font-normal">{selectedChat.name}</span></span>
                        </div>
                    </div>
                    <div className="flex gap-4 absolute right-6">
                        <Video className="w-5 h-5 text-blue-500 cursor-pointer" />
                        <Info className="w-5 h-5 text-blue-500 cursor-pointer" />
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
                    <div className="text-center text-xs text-gray-400 my-4">iMessage with {selectedChat.name}</div>

                    {selectedChat.messages.map(msg => (
                        <div key={msg.id} className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${msg.sender === 'me' ? 'bg-blue-500 text-white self-end rounded-br-sm' : 'bg-gray-200 dark:bg-[#333333] text-gray-800 dark:text-gray-100 self-start rounded-bl-sm'}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 bg-white dark:bg-[#1e1e1e]">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="iMessage"
                            className="w-full border border-gray-300 dark:border-neutral-700 rounded-full py-1.5 pl-4 pr-10 focus:outline-none focus:border-blue-500 bg-transparent"
                            value={inputText}
                            onChange={e => setInputText(e.target.value)}
                            disabled
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">↑</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
