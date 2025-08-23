"use client"

import React, { useRef, useState } from "react"
import ReactMarkdown from "react-markdown"


const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"


function useDraggable(initial = { x: 24, y: 24 }) {
  const [pos, setPos] = useState(initial)
  const dragRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })
  const lastTouch = useRef({ x: 0, y: 0 })

  React.useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragging.current) return
      const width = dragRef.current?.offsetWidth || 320
      const height = dragRef.current?.offsetHeight || 80
      const maxX = window.innerWidth - width - 8
      const maxY = window.innerHeight - height - 8
      let x = e.clientX - offset.current.x
      let y = e.clientY - offset.current.y
      x = Math.max(8, Math.min(x, maxX))
      y = Math.max(8, Math.min(y, maxY))
      setPos({ x, y })
    }
    function onMouseUp() {
      dragging.current = false
    }
    function onTouchMove(e: TouchEvent) {
      if (!dragging.current) return
      const touch = e.touches[0]
      const width = dragRef.current?.offsetWidth || 320
      const height = dragRef.current?.offsetHeight || 80
      const maxX = window.innerWidth - width - 8
      const maxY = window.innerHeight - height - 8
      let x = touch.clientX - offset.current.x
      let y = touch.clientY - offset.current.y
      x = Math.max(8, Math.min(x, maxX))
      y = Math.max(8, Math.min(y, maxY))
      setPos({ x, y })
    }
    function onTouchEnd() {
      dragging.current = false
    }
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    window.addEventListener("touchmove", onTouchMove)
    window.addEventListener("touchend", onTouchEnd)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  function onPointerDown(e: React.MouseEvent | React.TouchEvent) {
    dragging.current = true
    const rect = dragRef.current?.getBoundingClientRect()
    if ('touches' in e && e.touches.length > 0) {
      const touch = e.touches[0]
      offset.current = {
        x: touch.clientX - (rect?.left ?? 0),
        y: touch.clientY - (rect?.top ?? 0),
      }
    } else if ('clientX' in e) {
      offset.current = {
        x: e.clientX - (rect?.left ?? 0),
        y: e.clientY - (rect?.top ?? 0),
      }
    }
  }

  // Clamp position on resize
  React.useEffect(() => {
    function clampToViewport() {
      const width = dragRef.current?.offsetWidth || 320
      const height = dragRef.current?.offsetHeight || 80
      const maxX = window.innerWidth - width - 8
      const maxY = window.innerHeight - height - 8
      setPos(pos => ({
        x: Math.max(8, Math.min(pos.x, maxX)),
        y: Math.max(8, Math.min(pos.y, maxY)),
      }))
    }
    window.addEventListener("resize", clampToViewport)
    return () => window.removeEventListener("resize", clampToViewport)
  }, [])

  return { pos, dragRef, onPointerDown }
}

export default function AIAssistant() {
  // Default to bottom right, but clamp on mount
  const [mounted, setMounted] = useState(false)
  // Place at bottom right by default
  const { pos, dragRef, onPointerDown } = useDraggable({
    x: typeof window !== 'undefined' ? window.innerWidth - 88 : 24,
    y: typeof window !== 'undefined' ? window.innerHeight - 88 : 24
  })
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([])
  const [loading, setLoading] = useState(false)

  // Ensure chatbox stays in viewport when opening
  React.useEffect(() => {
    if (!open || !dragRef.current) return;
    const chatbox = dragRef.current.querySelector('.w-80');
    if (!chatbox) return;
    const boxRect = chatbox.getBoundingClientRect();
    const width = boxRect.width;
    const height = boxRect.height;
    const maxX = window.innerWidth - width - 8;
    const maxY = window.innerHeight - height - 8;
    let x = pos.x;
    let y = pos.y;
    let changed = false;
    if (x > maxX) { x = maxX; changed = true; }
    if (y > maxY) { y = maxY; changed = true; }
    if (x < 8) { x = 8; changed = true; }
    if (y < 8) { y = 8; changed = true; }
    if (changed) {
      // Use dragRef to update position
      // @ts-ignore
      dragRef.current.style.left = x + 'px';
      // @ts-ignore
      dragRef.current.style.top = y + 'px';
    }
  }, [open]);

  // Suggestions for the user
  const suggestions = [
  "Explain a technical term (e.g. React, TypeScript)",
  "Summarize my skills or experience",
  "What are the tech stack used in this portfolio?"
  ];

  async function sendMessage(msg?: string) {
    const userInput = typeof msg === 'string' ? msg : input;
    if (!userInput.trim()) return;
    setMessages(msgs => [...msgs, { role: "user", text: userInput }]);
    setLoading(true);
    setInput("");
    try {
      // Add system prompt for Gemini: act as a personal portfolio assistant, keep answers short, only answer about portfolio/dev topics
      const resumeContext =
        `You are a smart AI assistant for the portfolio of Anurag Kumar.\n\nStrictly follow these rules:\n- You MUST answer questions about technical terms (e.g., React, TypeScript, REST API, web development concepts) with clear, concise explanations.\n- You MAY answer questions about Anurag's portfolio, technical skills, experience, or projects.\n- If the question is NOT about a technical term or Anurag's portfolio, DO NOT answer. Instead, reply: 'I can only answer questions about technical terms or Anurag Kumar's portfolio.'\n\nWhen you answer, always use proper Markdown formatting:\n- Use headings (##, ###) for sections.\n- Use bullet points (-) for lists.\n- Use bold for highlights.\n- Always use newlines and blank lines between sections and list items. Never write everything in a single paragraph. Each bullet or section must be on its own line.\n- Do not use HTML.\n\nSummary: Computer Science undergraduate skilled in React, TypeScript, Node.js, MongoDB, REST APIs, and building scalable full-stack apps. Strong in frontend/backend, UI/UX, and teamwork.\n\nKey Skills: JavaScript, TypeScript, React, Next.js, Node.js, Express.js, Python, SQL, HTML, CSS, MongoDB, Tailwind CSS, Git, REST APIs.\n\nProjects:\n- JobInsight (React, Gemini API): AI-powered resume matcher that analyzes job descriptions and resumes, identifies skill gaps, and provides personalized resume improvement tips. Improved compatibility predictions by 35% and reduced response latency by 25%.\n- HashShield (React, Web Crypto API): SHA-256 file integrity checker with drag-and-drop support, QR code generation, and real-time hash comparison. Achieved over 90% tamper detection accuracy across various file types.\n`;
      const res = await fetch(GEMINI_API_URL + `?key=${GEMINI_API_KEY}` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [ { text: resumeContext } ] },
            { role: "user", parts: [ { text: userInput } ] }
          ]
        }),
      });
      const data = await res.json();
      // Debug: log the full response
      console.log('Gemini API response:', data);
      let aiText = "(No response)";
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        aiText = data.candidates[0].content.parts[0].text;
      } else if (data?.error) {
        aiText = `Error: ${data.error.message || JSON.stringify(data.error)}`;
      } else if (data && Object.keys(data).length > 0) {
        aiText = `No valid response. Raw: ${JSON.stringify(data)}`;
      }
      // Render markdown as HTML in the chat window (if you want to support markdown rendering, you can use a library like 'marked' or 'react-markdown')
      setMessages(msgs => [...msgs, { role: "ai", text: aiText }]);
    } catch (e) {
      setMessages(msgs => [...msgs, { role: "ai", text: "Error: " + (e as any)?.message }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      ref={dragRef}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        zIndex: 1000,
        minWidth: 0,
        maxWidth: '100vw',
        maxHeight: '100vh',
        touchAction: 'none',
      }}
      className="select-none"
    >
      {/* Floating button */}
      {!open && (
        <button
          onMouseDown={onPointerDown}
          onTouchStart={onPointerDown}
          onClick={() => setOpen(true)}
          className="flex items-center justify-center text-4xl bg-transparent p-0 m-0 border-0 outline-none shadow-none hover:scale-105 transition-transform"
          aria-label="Open AI Assistant"
          style={{ background: 'none', border: 'none', outline: 'none', boxShadow: 'none', width: 80, height: 80, minWidth: 0, minHeight: 0 }}
        >
          🤖
        </button>
      )}
      {/* Chat window */}
      {open && (
        <>
          {/* Overlay for outside click */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'transparent',
            }}
          />
          <div
            className="w-80 max-w-[96vw] min-w-[220px] bg-card text-card-foreground rounded-xl shadow-2xl border border-border flex flex-col"
            style={{ minHeight: 220, maxWidth: '96vw', maxHeight: '90vh', overflow: 'hidden', position: 'relative', zIndex: 1000 }}
          >
            <div
              className="flex items-center justify-between px-4 py-2 border-b border-border cursor-move bg-primary/10 rounded-t-xl select-none"
              onMouseDown={onPointerDown}
              onTouchStart={onPointerDown}
            >
              <span className="font-semibold text-primary">AI Assistant</span>
              <button
                className="text-xl text-muted-foreground hover:text-destructive px-2"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-2 py-0.5 space-y-0.5 text-xs" style={{ maxHeight: 180 }}>
              {messages.length === 0 && (
                <div className="text-muted-foreground text-center mt-8">Ask me anything about this site, tech, or your queries!</div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
                  {msg.role === "user" ? (
                    <span className="inline-block bg-primary/10 rounded px-1 py-0.5">{msg.text}</span>
                  ) : (
                    <span className="inline-block bg-muted/60 rounded px-1 py-0.5 text-left whitespace-pre-wrap" style={{ maxWidth: 320, display: 'block' }}>
                      <div className="markdown-container">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    </span>
                  )}
                </div>
              ))}
              {loading && <div className="text-muted-foreground">AI is typing...</div>}
            </div>
            <form
              className="flex border-t border-border"
              onSubmit={e => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <input
                className="flex-1 px-3 py-2 bg-transparent outline-none text-sm"
                placeholder="Type your question..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
                style={{ minWidth: 0 }}
              />
              <button
                type="submit"
                className="px-3 py-2 text-primary font-semibold disabled:opacity-50"
                disabled={loading || !input.trim()}
              >
                Send
              </button>
            </form>
            {/* Suggestions */}
            <div className="flex flex-wrap gap-2 px-4 py-2">
              {suggestions.map((s, i) => {
                // Custom answer for tech stack suggestion
                if (s === "What are the tech stack used in this portfolio?") {
                  return (
                    <button
                      key={i}
                      type="button"
                      className="bg-muted text-muted-foreground rounded px-2 py-1 text-xs hover:bg-primary/10 transition"
                      onClick={() => setMessages(msgs => [...msgs, { role: "user", text: s }, { role: "ai", text: `**Tech Stack Used:**\n- Next.js (App Router)\n- React\n- TypeScript\n- Tailwind CSS\n- next-themes (dark mode)\n- Gemini API (AI assistant)\n- react-markdown (markdown rendering)\nThis portfolio uses a modern, full-stack JavaScript/TypeScript toolchain focused on performance and UI.` }])}
                      disabled={loading}
                    >
                      {s}
                    </button>
                  );
                }
                return (
                  <button
                    key={i}
                    type="button"
                    className="bg-muted text-muted-foreground rounded px-2 py-1 text-xs hover:bg-primary/10 transition"
                    onClick={() => sendMessage(s)}
                    disabled={loading}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
      <style jsx>{`
  .markdown-container p {
    margin: 0;
    padding: 0;
  }
  .markdown-container ul {
    margin: 0;
    padding-left: 1rem;
  }
  .markdown-container li {
    margin: 0;
    padding: 0;
  }
`}</style>
    </div>
  )
}
