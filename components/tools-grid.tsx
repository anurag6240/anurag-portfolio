import { toolLogos } from "@/components/tool-logos"

const tools: Array<{
  name: string;
  key: keyof typeof toolLogos;
  description: string;
}> = [
  { name: "Tailwind CSS", key: "tailwind", description: "Styling" },
  { name: "Redux", key: "redux", description: "State Management" },
  { name: "GitHub", key: "github", description: "Version Control" },
  { name: "Supabase", key: "supabase", description: "Database" },
  { name: "OpenAI API", key: "openai", description: "AI Integration" },
  { name: "Framer Motion", key: "framer", description: "Animation" },
  { name: "Vercel", key: "vercel", description: "Deployment" },
  { name: "Postman", key: "postman", description: "API Testing" },
]

export function ToolsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-8">
      {tools.map((tool) => (
        <div key={tool.key} className="flex flex-col items-center text-center group">
          <div className="rounded-full p-0 mb-3 transition-transform group-hover:scale-110">
            <img src={toolLogos[tool.key]} alt={tool.name + ' logo'} className="w-10 h-10 object-contain" />
          </div>
          <div className="font-semibold text-base text-foreground mb-1 group-hover:text-neon-purple transition-colors">
            {tool.name}
          </div>
          <div className="text-xs text-muted-foreground">{tool.description}</div>
        </div>
      ))}
    </div>
  )
}
