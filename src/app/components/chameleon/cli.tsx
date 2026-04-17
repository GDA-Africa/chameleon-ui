import React, { useState, useEffect } from "react";
import {
  Terminal,
  Copy,
  Check,
  ChevronRight,
  HardDrive,
  Package,
  Search,
  Download,
} from "lucide-react";
import { cn } from "./utils";

export const CLIMockup = () => {
  const [copied, setCopied] = useState(false);
  const [activeCmd, setActiveCmd] = useState(0);

  const commands = [
    { cmd: "chameleon init", desc: "Initialize your project with Chameleon UI (interactive)" },
    { cmd: "chameleon add button", desc: "Scaffold the Button atom into your project" },
    { cmd: "chameleon add auth-form", desc: "Scaffold the authentication template (login/signup)" },
    { cmd: "chameleon list", desc: "List available components and templates" },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl bg-[#0d1117] border border-white/10 font-mono text-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-2 text-white/40">
          <Terminal className="w-3 h-3" />
          <span className="text-[10px] uppercase tracking-widest">zsh — chameleon</span>
        </div>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 text-[#c9d1d9]">
        <div className="space-y-1">
          <p className="text-white/40"># Install the official CLI</p>
          <div className="flex items-center justify-between group bg-white/5 p-3 rounded-lg border border-white/10">
            <code className="text-indigo-400">
              <span className="text-emerald-400">npm i -g</span> @chameleon-ui-lib/react
            </code>
            <button
              onClick={() => handleCopy("npm i -g @chameleon-ui-lib/react")}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-white/40"># Popular commands</p>
          <div className="space-y-2">
            {commands.map((c, i) => (
              <div
                key={i}
                className={cn(
                  "p-3 rounded-lg border transition-all cursor-pointer group",
                  activeCmd === i
                    ? "bg-indigo-500/10 border-indigo-500/30"
                    : "bg-transparent border-transparent hover:bg-white/5",
                )}
                onClick={() => setActiveCmd(i)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ChevronRight
                      className={cn(
                        "w-4 h-4",
                        activeCmd === i ? "text-indigo-400" : "text-white/20",
                      )}
                    />
                    <code className="text-white">{c.cmd}</code>
                  </div>
                  <Copy className="w-3 h-3 opacity-0 group-hover:opacity-40" />
                </div>
                <p className="text-xs text-white/40 ml-7 mt-1">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="font-bold">➜</span>
            <span className="text-indigo-400">~/projects/my-app</span>
            <span className="text-white">chameleon add dashboard</span>
            <span className="animate-pulse bg-white/50 w-2 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
