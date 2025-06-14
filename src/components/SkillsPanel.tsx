
import { Brain, Code, Database, Activity, Layers, Chip } from "lucide-react";

const skills = [
  { name: "Python", icon: <Code className="text-yellow-400" /> },
  { name: "TypeScript", icon: <Code className="text-sky-500" /> },
  { name: "TensorFlow", icon: <Brain className="text-orange-500" /> },
  { name: "PyTorch", icon: <Brain className="text-red-500" /> },
  { name: "OpenAI API", icon: <Chip className="text-violet-400" /> },
  { name: "Computer Vision", icon: <Activity className="text-green-400" /> },
  { name: "NLP", icon: <Layers className="text-cyan-500" /> },
  { name: "Data Engineering", icon: <Database className="text-teal-400" /> },
  { name: "LangChain", icon: <Chip className="text-fuchsia-400" /> },
  { name: "FastAPI", icon: <Code className="text-indigo-400" /> }
];

const SkillsPanel = () => (
  <section className="w-full my-12 p-6 bg-slate-50 dark:bg-slate-900/60 rounded-xl shadow-md">
    <h3 className="text-xl font-bold mb-5 text-slate-800 dark:text-slate-100">Skills & Tools</h3>
    <div className="flex flex-wrap justify-center gap-5">
      {skills.map((s) => (
        <div key={s.name} className="flex flex-col items-center gap-2 w-28">
          <div className="text-3xl">{s.icon}</div>
          <span className="text-sm text-slate-700 dark:text-slate-300 font-semibold">{s.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export default SkillsPanel;
