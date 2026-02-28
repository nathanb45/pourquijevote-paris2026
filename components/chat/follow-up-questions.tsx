interface FollowUpQuestionsProps {
  questions: string[]
  onSelect: (question: string) => void
}

export function FollowUpQuestions({ questions, onSelect }: FollowUpQuestionsProps) {
  if (!questions.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="cursor-pointer rounded-2xl border-[1.5px] border-beige-border bg-white px-3.5 py-1.5 text-[13px] font-medium text-navy transition-all before:mr-1 before:opacity-50 before:content-['→'] hover:border-navy hover:bg-navy hover:text-white"
        >
          {q}
        </button>
      ))}
    </div>
  )
}
