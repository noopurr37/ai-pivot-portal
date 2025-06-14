
import { FC } from "react";

type Project = {
  title: string;
  description: string;
  mediaType: "image" | "video" | "code";
  media: string;
  code?: string;
  tags?: readonly string[];
  demoUrl?: string;
};

type Props = {
  project: Project | null;
  onClose: () => void;
};

const ProjectModal: FC<Props> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center animate-fade-in">
      <div className="bg-card rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 bg-slate-200 hover:bg-red-400 text-slate-800 font-bold w-8 h-8 rounded-full flex items-center justify-center hover-scale"
        >
          ×
        </button>
        <div className="mb-4">
          <h4 className="text-xl font-bold text-primary">{project.title}</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags?.map(tag => (
              <span key={tag} className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs px-2 py-1 rounded font-semibold">{tag}</span>
            ))}
          </div>
          <p className="text-md text-slate-700 dark:text-slate-200 mb-2">{project.description}</p>
        </div>
        {project.mediaType === "image" && (
          <img src={project.media} alt={project.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        )}
        {project.mediaType === "video" && (
          <video controls className="w-full h-64 object-cover rounded-lg mb-4">
            <source src={project.media} type="video/mp4"/>
            Sorry, your browser doesn't support embedded videos.
          </video>
        )}
        {project.mediaType === "code" && (
          <pre className="w-full h-64 bg-slate-900 text-green-200 text-xs p-4 font-mono overflow-auto rounded-lg mb-4">{project.code}</pre>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded shadow transition">
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
