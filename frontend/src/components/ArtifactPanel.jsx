import React, { useMemo, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { X, Copy, Check, Download, Code2, Eye, FileCode2 } from "lucide-react";

function getFileIcon(name) {
  if (/\.(html?)$/i.test(name)) return "🌐";
  if (/\.(css)$/i.test(name)) return "🎨";
  if (/\.(js|jsx|ts|tsx)$/i.test(name)) return "⚡";
  if (/\.(py)$/i.test(name)) return "🐍";
  if (/\.(json)$/i.test(name)) return "{ }";
  return "📄";
}

function getLanguage(file) {
  if (file.language) return file.language;
  const ext = file.path.split(".").pop()?.toLowerCase();
  const map = {
    js: "javascript",
    jsx: "jsx",
    ts: "typescript",
    tsx: "tsx",
    py: "python",
    css: "css",
    html: "markup",
    json: "json",
    md: "markdown",
  };
  return map[ext] || "text";
}

function buildPreviewDoc(files) {
  const html = files.find((f) => /\.html?$/i.test(f.path));
  const css = files.find((f) => /\.css$/i.test(f.path));
  const js = files.find((f) => /\.(js|jsx)$/i.test(f.path));

  if (!html) return null;

  let doc = html.content;

  // inline the css/js so the iframe renders standalone, regardless of
  // whether the model's <link>/<script> tags actually resolve
  if (css) {
    doc = doc.includes("</head>")
      ? doc.replace("</head>", `<style>${css.content}</style></head>`)
      : `<style>${css.content}</style>${doc}`;
  }

  if (js) {
    doc = doc.includes("</body>")
      ? doc.replace("</body>", `<script>${js.content}</script></body>`)
      : `${doc}<script>${js.content}</script>`;
  }

  return doc;
}

function ArtifactPanel({ artifact, onClose }) {
  const normalizedFiles = (artifact?.files || []).map((file) => ({
    ...file,
    name: file.name || file.path.split("/").pop(),
  }));
  const files = normalizedFiles;
  const [activeFileIdx, setActiveFileIdx] = useState(0);
  const [view, setView] = useState("code"); // "code" | "preview"
  const [copied, setCopied] = useState(false);

  const activeFile = files[activeFileIdx];

  const previewDoc = useMemo(() => buildPreviewDoc(files), [files]);
  const canPreview = Boolean(previewDoc);

  const handleCopy = async () => {
    if (!activeFile) return;
    try {
      await navigator.clipboard.writeText(activeFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("copy failed", err);
    }
  };

  const handleDownload = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeFile.path.split("/").pop();
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!artifact || files.length === 0) return null;

  return (
    <aside className="relative h-full w-full sm:w-[50%] min-w-[360px] border-l border-black/[0.07] bg-white/70 backdrop-blur-xl flex flex-col z-20 motion-safe:animate-[fadeUp_0.3s_ease-out_both] shadow-[-8px_0_24px_rgba(0,0,0,0.04)]">
      {/* Header — same glass treatment as Nav */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-black/[0.07] bg-white/35 backdrop-blur-xl shrink-0">
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
          style={{ background: "rgba(30,122,86,0.1)" }}
        >
          <FileCode2 size={15} className="text-[#1E7A56]" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-black/85 truncate">
            {artifact.title || "Artifact"}
          </p>
          <p className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/40 truncate">
            {artifact.description ||
              `${files.length} file${files.length > 1 ? "s" : ""}`}
          </p>
        </div>

        <button
          onClick={onClose}
          title="Close"
          className="w-8 h-8 shrink-0 rounded-md flex items-center justify-center text-black/40 hover:text-black hover:bg-black/[0.06] transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* File tabs */}
      {files.length > 1 && (
        <div className="flex items-center gap-1 px-3 pt-3 overflow-x-auto shrink-0">
          {files.map((file, idx) => {
            const isActive = idx === activeFileIdx;
            return (
              <button
                key={file.path + idx}
                onClick={() => setActiveFileIdx(idx)}
                className={`shrink-0 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-[IBM_Plex_Mono,monospace] transition-colors ${
                  isActive
                    ? "bg-[#1E7A56]/10 text-[#1E7A56] border border-[#1E7A56]/30"
                    : "text-black/45 hover:bg-black/[0.04] hover:text-black/70 border border-transparent"
                }`}
              >
                <span>{getFileIcon(file.path)}</span>
                <span className="truncate max-w-[150px]">
                  {file.path.split("/").pop()}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Code / Preview toggle */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
        <div className="flex items-center gap-1 bg-black/[0.04] rounded-md p-0.5">
          <button
            onClick={() => setView("code")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              view === "code"
                ? "bg-white text-black/80 shadow-sm"
                : "text-black/40 hover:text-black/70"
            }`}
          >
            <Code2 size={13} /> Code
          </button>

          {canPreview && (
            <button
              onClick={() => setView("preview")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                view === "preview"
                  ? "bg-white text-black/80 shadow-sm"
                  : "text-black/40 hover:text-black/70"
              }`}
            >
              <Eye size={13} /> Preview
            </button>
          )}
        </div>

        {view === "code" && (
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              title="Copy file"
              className="w-7 h-7 rounded-md flex items-center justify-center text-black/40 hover:text-[#1E7A56] hover:bg-black/[0.06] transition-colors"
            >
              {copied ? (
                <Check size={14} className="text-[#1E7A56]" />
              ) : (
                <Copy size={14} />
              )}
            </button>
            <button
              onClick={handleDownload}
              title="Download file"
              className="w-7 h-7 rounded-md flex items-center justify-center text-black/40 hover:text-[#1E7A56] hover:bg-black/[0.06] transition-colors"
            >
              <Download size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden px-4 pb-4">
        {view === "code" ? (
          <div className="h-full rounded-lg border border-black/[0.07] overflow-auto bg-white">
            <SyntaxHighlighter
              language={getLanguage(activeFile)}
              style={oneLight}
              showLineNumbers
              customStyle={{
                margin: 0,
                padding: "14px",
                fontSize: "12.5px",
                lineHeight: 1.6,
                background: "transparent",
                minHeight: "100%",
              }}
              lineNumberStyle={{
                color: "rgba(0,0,0,0.25)",
                minWidth: "2.2em",
              }}
            >
              {activeFile?.content || ""}
            </SyntaxHighlighter>
          </div>
        ) : (
          <div className="h-full rounded-lg border border-black/[0.07] overflow-hidden bg-white">
            <iframe
              title="artifact-preview"
              srcDoc={previewDoc}
              sandbox="allow-scripts"
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </aside>
  );
}

export default ArtifactPanel;
