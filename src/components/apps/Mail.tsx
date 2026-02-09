import { useState } from 'react';
import { Send, User, Paperclip, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

const Mail = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        // TODO: Replace these with your actual EmailJS credentials
        // Get them from https://dashboard.emailjs.com/
        const SERVICE_ID = 'service_8uc5bcv';
        const TEMPLATE_ID = 'template_bgbx2hy';
        const PUBLIC_KEY = 'w86jvR7s91ic5TmZF';

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: formState.email, // Or separate name field
                    to_name: 'Aladin',
                    message: formState.message,
                    subject: formState.subject,
                    reply_to: formState.email,
                },
                PUBLIC_KEY
            );

            setIsSent(true);
            setFormState({ name: '', email: '', subject: '', message: '' });
            toast.success('Message sent successfully!');
            setTimeout(() => setIsSent(false), 3000);
        } catch (error) {
            console.error('Email error:', error);
            // Fallback for demo purposes if keys aren't set
            if (SERVICE_ID === 'service_8uc5bcv') {
                toast.error('EmailJS keys are missing! Check the code in Mail.tsx');
            } else {
                toast.error('Failed to send message. Please checking your EmailJS configuration.');
            }
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="flex h-full bg-white dark:bg-[#1e1e1e] text-sm">
            {/* Sidebar */}
            <div className="w-48 bg-gray-50 dark:bg-[#252526] border-r border-gray-200 dark:border-neutral-700 flex flex-col pt-4">
                <div className="px-4 mb-4">
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-1.5 px-3 font-medium transition-colors text-xs flex items-center justify-center gap-2 shadow-sm">
                        <Send className="w-3 h-3" />
                        New Message
                    </button>
                </div>

                <nav className="space-y-0.5 px-2">
                    {['Inbox', 'Sent', 'Drafts', 'Junk', 'Trash'].map((item, i) => (
                        <div key={item} className={`px-3 py-1.5 rounded-md cursor-pointer flex items-center gap-2 ${i === 1 ? 'bg-gray-200/50 dark:bg-white/10 font-medium' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'}`}>
                            {/* Icon placeholders */}
                            <span className="text-xs">{item}</span>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e]">
                {/* Header */}
                <div className="h-12 border-b border-gray-200 dark:border-neutral-700 flex items-center px-4 justify-between bg-white dark:bg-[#1e1e1e]">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">New Message</span>
                    <div className="flex gap-2">
                        <Paperclip className="w-4 h-4 text-gray-400" />
                    </div>
                </div>

                {/* Compose Form */}
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-neutral-800 flex items-center gap-2">
                        <span className="text-gray-400 w-16 text-xs font-medium">To:</span>
                        <div className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded text-xs">dalyalaeddine@gmail.com</div>
                    </div>
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-neutral-800 flex items-center gap-2">
                        <span className="text-gray-400 w-16 text-xs font-medium">Cc/Bcc:</span>
                        <input
                            type="email"
                            placeholder="Your email (optional)"
                            className="flex-1 bg-transparent outline-none"
                            value={formState.email}
                            onChange={e => setFormState({ ...formState, email: e.target.value })}
                        />
                    </div>
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-neutral-800 flex items-center gap-2">
                        <span className="text-gray-400 w-16 text-xs font-medium">Subject:</span>
                        <input
                            type="text"
                            placeholder="Project Inquiry..."
                            className="flex-1 bg-transparent outline-none font-medium"
                            value={formState.subject}
                            onChange={e => setFormState({ ...formState, subject: e.target.value })}
                            required
                        />
                    </div>

                    <textarea
                        className="flex-1 p-4 resize-none outline-none bg-transparent font-sans"
                        placeholder="Hi Aladin, I'd like to hire you..."
                        value={formState.message}
                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                        required
                    />

                    {/* Toolbar / Send */}
                    <div className="p-3 border-t border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-[#252526] flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                            {isSent && <span className="text-green-600 font-medium animate-pulse">Email sent successfully! 🚀</span>}
                        </div>
                        <button
                            type="submit"
                            disabled={isSending || !formState.message}
                            className={`bg-blue-500 text-white px-4 py-1.5 rounded-md text-xs font-medium shadow-sm transition-all ${isSending ? 'opacity-70 cursor-wait' : 'hover:bg-blue-600 hover:shadow transform active:scale-95'}`}
                        >
                            {isSending ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Mail;
