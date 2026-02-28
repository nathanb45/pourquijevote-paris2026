export function AnalysisBox({ text }: { text: string }) {
  return (
    <div className="rounded-r-lg border-l-[3px] border-l-analysis-border bg-analysis-bg px-4 py-3">
      <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-analysis-border">
        ⚡ Analyse factuelle
      </div>
      <p className="text-[13.5px] leading-relaxed text-analysis-text">{text}</p>
    </div>
  )
}
