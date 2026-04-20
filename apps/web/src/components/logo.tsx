import Link from 'next/link'

const Logo = ({ url }: { url?: string }) => {
    return (
        <Link href={url || "/dashboard"} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-none flex items-center justify-center border-2 border-black shadow-brutalist-orange shrink-0">
                <span className="text-black font-black text-xl">P</span>
            </div>
            <h2 className="text-xl font-bold uppercase tracking-tighter">
                promptbox<span className="text-primary">.</span>
            </h2>
        </Link>
    )
}

export default Logo