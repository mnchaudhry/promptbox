import "~style.css"

function IndexPopup() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      {/* Header */}
      <header className="border-3 border-primary flex items-center justify-between p-3 bg-surface-lowest">
        <h1 className="text-xl font-bold uppercase tracking-tighter text-primary">
          Promptly
        </h1>
        <div className="w-4 h-4 bg-secondary" />
      </header>

      {/* Main Content */}
      <main className="space-y-4">
        <div className="border-3 border-outline p-4 bg-surface flex flex-col space-y-2">
          <label className="text-[10px] uppercase font-mono text-secondary">Active Selection</label>
          <p className="text-sm font-mono leading-tight">
            No text selected. Highlight text on any page to capture it.
          </p>
        </div>

        <button className="w-full bg-primary text-black font-bold py-3 uppercase tracking-widest border-3 border-black shadow-brutalist active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
          Save Prompt
        </button>
      </main>

      {/* Footer */}
      <footer className="pt-4 border-t-3 border-outline">
        <div className="flex justify-between items-center text-[10px] font-mono uppercase text-highest">
          <span>v0.0.1</span>
          <span className="text-secondary">Connected to Dashboard</span>
        </div>
      </footer>
    </div>
  )
}

export default IndexPopup
