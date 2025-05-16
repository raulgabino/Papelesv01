"use client"
import { Paperclip } from "lucide-react"

interface Attachment {
  name: string
  id: string
}

interface PixelatedCaseDocumentProps {
  title?: string
  sender?: string
  recipient?: string
  subject?: string
  body: string
  attachments?: Attachment[]
}

export function PixelatedCaseDocument({
  title,
  sender,
  recipient,
  subject,
  body,
  attachments = [],
}: PixelatedCaseDocumentProps) {
  return (
    <div className="bg-amber-100 text-slate-800 border border-slate-400 w-full h-full overflow-auto font-mono p-4 relative">
      {/* Barra de scroll personalizada */}
      <style jsx global>{`
        .pixelated-scroll::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        .pixelated-scroll::-webkit-scrollbar-track {
          background: #d6d3d1;
          border-left: 1px solid #94a3b8;
        }
        .pixelated-scroll::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border: 1px solid #64748b;
        }
        .pixelated-scroll::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>

      <div className="pixelated-scroll overflow-auto max-h-[calc(100%-2rem)]">
        {title && (
          <div className="text-center border-b border-slate-400 pb-2 mb-4">
            <h2 className="text-lg font-bold uppercase tracking-wide">{title}</h2>
          </div>
        )}

        {(sender || recipient || subject) && (
          <div className="mb-4 border-b border-slate-400 pb-2">
            {sender && (
              <div className="mb-1">
                <span className="font-bold mr-2">De:</span>
                <span>{sender}</span>
              </div>
            )}
            {recipient && (
              <div className="mb-1">
                <span className="font-bold mr-2">Para:</span>
                <span>{recipient}</span>
              </div>
            )}
            {subject && (
              <div className="mb-1">
                <span className="font-bold mr-2">Asunto:</span>
                <span>{subject}</span>
              </div>
            )}
          </div>
        )}

        <div className="whitespace-pre-line mb-4">{body}</div>

        {attachments.length > 0 && (
          <div className="mt-4 pt-2 border-t border-slate-400">
            <div className="font-bold mb-1">Adjuntos:</div>
            <ul className="list-none">
              {attachments.map((attachment) => (
                <li key={attachment.id} className="flex items-center mb-1">
                  <Paperclip className="w-4 h-4 mr-2 inline-block" />
                  <span>{attachment.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
