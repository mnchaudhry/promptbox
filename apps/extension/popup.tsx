import "~style.css"

function IndexPopup() {
  return (
    <div className="flex flex-col p-4 space-y-4 min-w-[320px]">
      {/* Header */}
      <header className="border-3 border-primary flex items-center justify-between p-3 bg-surface-lowest">
        <h1 className="text-xl font-bold uppercase tracking-tighter text-primary">
          promptbox
        </h1>
        <div className="w-4 h-4 bg-secondary" />
      </header>

      {/* Main Content */}
      <main className="space-y-3">
        <div className="border-3 border-outline p-3 bg-surface flex flex-col space-y-1">
          <label className="text-[10px] uppercase font-mono text-secondary">Selected text</label>
          <p className="text-sm font-mono leading-tight">
            No text selected. Highlight text on any page to capture it.
          </p>
        </div>

        <button className="w-full bg-primary text-black font-bold py-2.5 uppercase tracking-widest border-3 border-black shadow-brutalist active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
          Save prompt
        </button>
      </main>

      {/* Footer */}
      <footer className="pt-3 border-t-3 border-outline">
        <div className="flex justify-between items-center text-[10px] font-mono uppercase text-highest">
          <span>v0.0.1</span>
          <span className="text-secondary">Everything is working</span>
        </div>
      </footer>
    </div>
  )
}

export default IndexPopup
