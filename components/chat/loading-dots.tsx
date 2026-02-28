export function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5 py-4">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-2 rounded-full bg-ink-light"
          style={{
            animation: 'bounce-dot 1.2s ease infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  )
}
