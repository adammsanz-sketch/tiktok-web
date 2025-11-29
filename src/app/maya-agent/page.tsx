"use client";
import { useState } from 'react';
import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import SidebarContent from '@/components/sanztech/dashboard/SidebarContent';
import Header from '@/components/sanztech/dashboard/Header';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MayaAgentPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const apiUrl = (process.env.NEXT_PUBLIC_MAYA_API_URL as string) || 'http://localhost:3000/api/analytics';

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setInput('');
    try {
      const resp = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'maya_chat', message: text, history: next.map(m => ({ role: m.role, content: m.content })) }),
      });
      if (resp.ok) {
        const data = await resp.json();
        const reply = data.message as string;
        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Server error' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error' }]);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent />
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6">
              <h1 className="text-2xl font-bold text-[hsl(var(--gold))] mb-4">Maya Agent</h1>
              <div className="h-[50vh] overflow-y-auto border border-gray-700 rounded-md p-4 space-y-3 bg-gray-900">
                {messages.length === 0 && (
                  <div className="text-gray-400">Cakap je bro. Maya standby.</div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                    <div className={`inline-block px-3 py-2 rounded-md ${m.role === 'user' ? 'bg-[hsl(var(--gold))] text-black' : 'bg-gray-800 text-gray-200'}`}>
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tanya apa-apa pasal automation" />
                <Button onClick={sendMessage}>Hantar</Button>
              </div>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
