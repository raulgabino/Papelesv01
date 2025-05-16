"use client"

interface CaseData {
  title?: string
  sender?: string
  recipient?: string
  subject?: string
  body: string
  attachments?: string[]
}

interface PixelatedCaseDocumentProps {
  caseData: CaseData
}

export function PixelatedCaseDocument({ caseData }: PixelatedCaseDocumentProps) {
  return (
    <div className="bg-amber-100 text-slate-800 border border-slate-400 w-full h-full overflow-auto font-mono p-3 min-h-[calc(100vh-250px)]">
      {caseData.title && (
        <h3 className="text-lg font-mono font-bold mb-2 text-center border-b border-slate-300 pb-2">
          {caseData.title}
        </h3>
      )}

      <div className="mb-3">
        {caseData.sender && (
          <div className="mb-1 text-sm">
            <span className="font-bold">De:</span> {caseData.sender}
          </div>
        )}
        {caseData.recipient && (
          <div className="mb-1 text-sm">
            <span className="font-bold">Para:</span> {caseData.recipient}
          </div>
        )}
        {caseData.subject && (
          <div className="mb-1 text-sm">
            <span className="font-bold">Asunto:</span> {caseData.subject}
          </div>
        )}
      </div>

      <div className="text-sm whitespace-pre-wrap leading-relaxed border-t border-slate-300 pt-2">{caseData.body}</div>

      {caseData.attachments && caseData.attachments.length > 0 && (
        <div className="mt-3 border-t border-slate-300 pt-2">
          <div className="text-xs font-bold mb-1">Archivos adjuntos:</div>
          <ul className="mt-1 text-xs list-disc list-inside">
            {caseData.attachments.map((attachment, index) => (
              <li key={index} className="mb-0.5">
                {attachment}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
