import type { Skill } from "@/types/portfolio"

/** Resume: Languages & Frameworks */
export const languageSkills: Skill[] = [
  { name: "Python", level: 92 },
  { name: "SQL", level: 82 },
  { name: "Scikit-learn", level: 90 },
  { name: "TensorFlow", level: 78 },
  { name: "Pandas", level: 92 },
  { name: "NumPy", level: 92 },
  { name: "Matplotlib", level: 85 },
  { name: "Seaborn", level: 82 },
  { name: "Flask", level: 84 },
  { name: "FastAPI", level: 86 },
  { name: "HTML / CSS", level: 78 },
  { name: "JavaScript", level: 72 },
]

/** Resume: Machine Learning & AI */
export const mlAiSkills: Skill[] = [
  { name: "Machine Learning (ML)", level: 90 },
  { name: "Deep Learning (DL)", level: 82 },
  { name: "Natural Language Processing (NLP)", level: 86 },
  { name: "Neural Networks", level: 80 },
  { name: "Computer Vision", level: 84 },
  { name: "Generative AI", level: 88 },
  { name: "Large Language Models (LLMs)", level: 86 },
  { name: "Hugging Face", level: 85 },
  { name: "Fine-tuning", level: 82 },
  { name: "RAG (Retrieval Augmented Generation)", level: 88 },
  { name: "Agentic AI", level: 80 },
  { name: "OpenCV", level: 82 },
]

/** Resume: Tools & Platforms + CI/CD */
export const toolsSkills: Skill[] = [
  { name: "Jupyter / Google Colab", level: 92 },
  { name: "Git / GitHub", level: 85 },
  { name: "Docker", level: 72 },
  { name: "VS Code", level: 90 },
  { name: "Pinecone", level: 84 },
  { name: "Qdrant DB", level: 86 },
  { name: "AWS", level: 74 },
  { name: "Azure", level: 70 },
  { name: "OpenAI API", level: 88 },
  { name: "Sentence Transformers", level: 84 },
  { name: "ML Pipelines / CI-CD", level: 78 },
  { name: "Data Cleaning & Feature Engineering", level: 90 },
  { name: "Tableau", level: 78 },
  { name: "Postman", level: 75 },
]

export const softSkills: Skill[] = [
  { name: "Problem Solving", level: 92 },
  { name: "Communication", level: 85 },
  { name: "Teamwork", level: 90 },
  { name: "Critical Thinking", level: 90 },
  { name: "Adaptability", level: 88 },
  { name: "Time Management", level: 82 },
  { name: "Leadership", level: 78 },
  { name: "Decision Making", level: 84 },
]

/** @deprecated use languageSkills — kept for compatibility */
export const technicalSkills = [...languageSkills, ...mlAiSkills]
