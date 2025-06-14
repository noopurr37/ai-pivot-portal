import HeroSection from "../components/HeroSection";
import ProjectsGrid from "../components/ProjectsGrid";
import SkillsPanel from "../components/SkillsPanel";
import AboutSection from "../components/AboutSection";
import { useState } from "react";
import ProjectModal from "../components/ProjectModal";

const DEMO_PROJECTS = [
  {
    title: "AI Image Generator",
    description: "Stable Diffusion-based app for creative image synthesis using custom prompts and style transfer.",
    mediaType: "image",
    media: "/placeholder.svg",
    code: `const result = await generateImage(prompt, style)\nshowImage(result);`,
    tags: ["Computer Vision", "Generative AI", "Python", "Stable Diffusion"],
    demoUrl: "#",
  },
  {
    title: "Conversational Agent",
    description: "A ChatGPT-like assistant for technical support, built with OpenAI API and custom retrieval.",
    mediaType: "video",
    media: "https://www.w3schools.com/html/mov_bbb.mp4",
    code: `response = await fetch("/api/ask", { body: JSON.stringify({ prompt }) })`,
    tags: ["NLP", "Chatbots", "OpenAI", "TypeScript"],
    demoUrl: "#",
  },
  {
    title: "Time Series Forecasting",
    description: "LSTM-powered forecasting for stock prices using TensorFlow and real-world finance data.",
    mediaType: "code",
    media: "",
    code: `model = Sequential([...]);\nmodel.fit(X_train, y_train, epochs=20)`,
    tags: ["Timeseries", "TensorFlow", "Python", "Finance"],
    demoUrl: "#",
  }
] as const;

export default function Index() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center px-0">
      <HeroSection />
      <div className="max-w-6xl w-full mt-10">
        <ProjectsGrid projects={DEMO_PROJECTS} onSelect={setSelectedProject} />
        <SkillsPanel />
        <AboutSection />
      </div>
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
