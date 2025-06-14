
import { FC } from "react";

type Project = {
  title: string;
  description: string;
  mediaType: "image" | "video" | "code";
  media: string;
  code?: string;
  tags?: string[];
  demoUrl?: string;
};

type Props = {
  projects: Project[];
  onSelect: (project: Project | null) => void;
};

const ProjectsGrid: FC<Props> = ({ projects, onSelect }) => (
  <section className="mb-12 mt-10">
    <h3 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">AI Projects</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((proj, i) => (
        <div
          key={proj.title}
          className="group bg-card rounded-xl shadow-lg cursor-pointer overflow-hidden transition-all duration-200 hover:scale-105 hover:ring-4 hover:ring-blue-400 animate-fade-in"
          onClick={() => onSelect(proj)}
        >
          {proj.mediaType === "image" && (
            <img loading="lazy" src={proj.media} alt={proj.title} className="object-cover w-full h-44" />
          )}
          {proj.mediaType === "video" && (
            <video controls className="w-full h-44 object-cover">
              <source src={proj.media} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {proj.mediaType === "code" && (
            <pre className="w-full h-44 bg-slate-950 text-green-200 text-xs p-4 font-mono overflow-auto">
              {proj.code}
            </pre>
          )}
          <div className="p-5">
            <div className="font-semibold text-lg mb-1 text-primary">{proj.title}</div>
            <p className="text-slate-700 dark:text-slate-300 mb-2 min-h-[40px]">{proj.description}</p>
            <div className="flex flex-wrap gap-2">
              {proj.tags?.map((tag) => (
                <span key={tag} className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs px-2 py-1 rounded-md font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ProjectsGrid;
