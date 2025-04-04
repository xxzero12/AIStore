import type { ReactNode } from "react"

interface CategoryHeaderProps {
  title: string
  description: string
  icon?: ReactNode
  backgroundClass?: string
}

export default function CategoryHeader({
  title,
  description,
  icon,
  backgroundClass = "bg-gradient-to-r from-blue-600 to-blue-800",
}: CategoryHeaderProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl px-6 py-10 text-white md:px-10 ${backgroundClass}`}>
      <div className="relative z-10 max-w-3xl">
        <div className="flex items-center gap-3">
          {icon && <div className="rounded-full bg-white/20 p-2">{icon}</div>}
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">{title}</h1>
        </div>
        <p className="mt-2 text-lg text-white/80 md:text-xl">{description}</p>
      </div>
      <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
    </div>
  )
}

