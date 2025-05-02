"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Github, ExternalLink, Code, BarChart2, Database, BrainCircuit, ChevronRight, ChevronDown } from "lucide-react"
import EnhancedSectionHeading from "@/components/enhanced-section-heading"
import { useTheme } from "next-themes"

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [visibleProjects, setVisibleProjects] = useState(6)
  const { theme } = useTheme()
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  // Enhanced project data with more detailed information
  const projects = [
    {
      id: 1,
      title: "Face Recognition Attendance System",
      description:
        "Developed a face recognition-based attendance system for colleges using computer vision and deep learning. The system achieved 97.8% accuracy in identifying students and reduced administrative workload by 85%.",
      image: "/facereg.jpg?height=400&width=600",
      tags: ["python", "ml", "opencv", "deep-learning"],
      category: "computer-vision",
      github: "https://github.com/Pramod-Chavhan/face-recognition-attendance",
      demo: "https://face-recognition-demo.vercel.app",
      metrics: [
        { label: "Accuracy", value: "97.8%" },
        { label: "Processing Time", value: "<1s" },
        { label: "Admin Time Saved", value: "85%" },
      ],
      technologies: ["Python", "OpenCV", "TensorFlow", "Flask", "SQLite"],
      icon: <BrainCircuit className="h-6 w-6 text-purple-400" />,
    },
    {
      id: 2,
      title: "Second Hand Car Price Prediction",
      description:
        "Built a machine learning model to predict the market value of used cars based on features like make, model, year, mileage, and condition. The model helps both buyers and sellers make informed decisions in the used car market.",
      image: "/car.png?height=400&width=600",
      tags: ["python", "ml", "regression", "data-analysis"],
      category: "predictive-analytics",
      github: "https://github.com/Pramod-Chavhan/car-price-prediction",
      demo: "https://car-price-predictor-demo.vercel.app",
      metrics: [
        { label: "R² Score", value: "0.89" },
        { label: "RMSE", value: "±$1,245" },
        { label: "Prediction Time", value: "0.3s" },
      ],
      technologies: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Flask", "Streamlit"],
      icon: <BarChart2 className="h-6 w-6 text-blue-400" />,
    },
    {
      id: 3,
      title: "Forest Fire Prediction",
      description:
        "Developed a regression model to predict the spread and intensity of forest fires using meteorological data and geographical features. The system helps forestry departments allocate resources and plan preventive measures more effectively.",
      image: "/forest.jpg?height=400&width=600",
      tags: ["python", "ml", "regression", "environmental"],
      category: "predictive-analytics",
      github: "https://github.com/Pramod-Chavhan/forest-fire-prediction",
      demo: "https://forest-fire-predictor.vercel.app",
      metrics: [
        { label: "Accuracy", value: "86.4%" },
        { label: "Early Detection", value: "+72hrs" },
        { label: "Resource Efficiency", value: "+41%" },
      ],
      technologies: ["Python", "Random Forest", "Gradient Boosting", "GeoPandas", "Matplotlib", "Django"],
      icon: <BarChart2 className="h-6 w-6 text-green-400" />,
    },
    {
      id: 4,
      title: "Credit Score Prediction",
      description:
        "Created a machine learning model to predict credit scores based on financial history, payment patterns, and demographic information. The model helps financial institutions assess creditworthiness and make informed lending decisions.",
      image: "/credit.PNG?height=400&width=600",
      tags: ["python", "ml", "classification", "finance"],
      category: "finance",
      github: "https://github.com/Pramod-Chavhan/credit-score-prediction",
      demo: "https://creditcard-score.onrender.com/",
      metrics: [
        { label: "Accuracy", value: "91.2%" },
        { label: "F1 Score", value: "0.89" },
        { label: "Default Reduction", value: "27%" },
      ],
      technologies: ["Python", "Scikit-learn", "LightGBM", "Pandas", "Flask", "React"],
      icon: <Database className="h-6 w-6 text-indigo-400" />,
    },
    {
      id: 5,
      title: "Backorder Prediction",
      description:
        "Implemented a classification model to predict product backorders in supply chain management. The system analyzes inventory levels, lead times, and demand patterns to identify products at risk of going out of stock, enabling proactive inventory management.",
      image: "/backorder.PNG?height=400&width=600",
      tags: ["python", "ml", "classification", "supply-chain"],
      category: "predictive-analytics",
      github: "https://github.com/Pramod-Chavhan/backorder-prediction",
      demo: "https://backorder-predictor.vercel.app",
      metrics: [
        { label: "Accuracy", value: "93.7%" },
        { label: "Inventory Costs", value: "-18%" },
        { label: "Stockout Reduction", value: "34%" },
      ],
      technologies: ["Python", "Scikit-learn", "CatBoost", "Pandas", "FastAPI", "Docker"],
      icon: <BarChart2 className="h-6 w-6 text-amber-400" />,
    },
    {
      id: 6,
      title: "House Price Prediction",
      description:
        "Developed a regression model to predict residential property prices based on features like location, size, amenities, and market trends. The model helps buyers, sellers, and real estate agents make data-driven decisions in the housing market.",
      image: "/house.PNG?height=400&width=600",
      tags: ["python", "ml", "regression", "real-estate"],
      category: "predictive-analytics",
      github: "https://github.com/Pramod-Chavhan/house-price-prediction",
      demo: "https://house-price-predictor.vercel.app",
      metrics: [
        { label: "R² Score", value: "0.92" },
        { label: "RMSE", value: "±$8,450" },
        { label: "Valuation Time", value: "<1s" },
      ],
      technologies: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Flask", "Plotly"],
      icon: <BarChart2 className="h-6 w-6 text-pink-400" />,
    },
    {
      id: 7,
      title: "Breast Cancer Survival Prediction",
      description:
        "Built a machine learning model to predict breast cancer survival rates based on clinical, genomic, and demographic features. The model helps oncologists develop personalized treatment plans and provide more accurate prognoses to patients.",
      image: "/cancer.PNG?height=400&width=600",
      tags: ["python", "ml", "healthcare", "survival-analysis"],
      category: "healthcare",
      github: "https://github.com/Pramod-Chavhan/cancer-survival-prediction",
      demo: "https://cancer-survival-predictor.vercel.app",
      metrics: [
        { label: "Accuracy", value: "89.3%" },
        { label: "AUC-ROC", value: "0.91" },
        { label: "Treatment Optimization", value: "32%" },
      ],
      technologies: ["Python", "Scikit-learn", "Survival Analysis", "Pandas", "Streamlit", "Plotly"],
      icon: <BrainCircuit className="h-6 w-6 text-red-400" />,
    },
    {
      id: 8,
      title: "ChatGPT Clone (GenAI)",
      description:
        "Created a generative AI chatbot similar to ChatGPT using transformer-based language models. The system can answer questions, generate text, and engage in natural conversations across a wide range of topics with contextual awareness.",
      image: "/clone.PNG?height=400&width=600",
      tags: ["python", "nlp", "transformers", "gen-ai"],
      category: "nlp",
      github: "https://github.com/Pramod-Chavhan/chatgpt-clone",
      demo: "https://genai-chatbot-demo.vercel.app",
      metrics: [
        { label: "Response Quality", value: "87%" },
        { label: "Response Time", value: "1.2s" },
        { label: "Context Retention", value: "15 turns" },
      ],
      technologies: ["Python", "PyTorch", "Transformers", "ONNX", "FastAPI", "React"],
      icon: <Code className="h-6 w-6 text-purple-400" />,
    },
    {
      id: 9,
      title: "Custom Trained Chatbot",
      description:
        "Developed a domain-specific chatbot trained on custom data for specialized knowledge areas. The system can be fine-tuned for different industries like healthcare, finance, or customer support, providing accurate and relevant responses.",
      image: "/chatbot.PNG?height=400&width=600",
      tags: ["python", "nlp", "fine-tuning", "chatbot"],
      category: "nlp",
      github: "https://github.com/Pramod-Chavhan/custom-chatbot",
      demo: "https://custom-chatbot-demo.vercel.app",
      metrics: [
        { label: "Domain Accuracy", value: "94.2%" },
        { label: "Training Time", value: "-65%" },
        { label: "User Satisfaction", value: "4.7/5" },
      ],
      technologies: ["Python", "TensorFlow", "BERT", "Flask", "MongoDB", "React"],
      icon: <Code className="h-6 w-6 text-blue-400" />,
    },
    {
      id: 10,
      title: "Health Chatbot",
      description:
        "Built a specialized healthcare chatbot that can answer medical questions, provide basic health advice, and help users navigate healthcare resources. The system is trained on verified medical information and follows healthcare guidelines.",
      image: "/helthcare.PNG?height=400&width=600",
      tags: ["python", "nlp", "healthcare", "chatbot"],
      category: "healthcare",
      github: "https://github.com/Pramod-Chavhan/health-chatbot",
      demo: "https://health-chatbot-demo.vercel.app",
      metrics: [
        { label: "Medical Accuracy", value: "92.8%" },
        { label: "User Queries Resolved", value: "78%" },
        { label: "Response Time", value: "0.8s" },
      ],
      technologies: ["Python", "TensorFlow", "BioBERT", "FastAPI", "PostgreSQL", "Vue.js"],
      icon: <BrainCircuit className="h-6 w-6 text-green-400" />,
    },
    {
      id: 11,
      title: "Image to Text Generation",
      description:
        "Developed a computer vision system that generates descriptive text from images. The model can identify objects, scenes, actions, and relationships in images and produce natural language descriptions, making visual content more accessible.",
      image: "/testimage.PNG?height=400&width=600",
      tags: ["python", "computer-vision", "nlp", "image-captioning"],
      category: "computer-vision",
      github: "https://github.com/Pramod-Chavhan/image-to-text",
      demo: "https://image-to-text-demo.vercel.app",
      metrics: [
        { label: "BLEU Score", value: "0.76" },
        { label: "Object Detection", value: "94.3%" },
        { label: "Processing Time", value: "1.5s" },
      ],
      technologies: ["Python", "PyTorch", "CNN", "LSTM", "Transformers", "Flask"],
      icon: <BrainCircuit className="h-6 w-6 text-indigo-400" />,
    },
    {
      id: 12,
      title: "Question Answering System",
      description:
        "Created an advanced question answering system that can extract precise answers from documents and knowledge bases. The system understands complex queries, retrieves relevant information, and formulates accurate answers with proper citations.",
      image: "/question-answer.PNG?height=400&width=600",
      tags: ["python", "nlp", "information-retrieval", "qa"],
      category: "nlp",
      github: "https://github.com/Pramod-Chavhan/question-answering",
      demo: "https://qa-system-demo.vercel.app",
      metrics: [
        { label: "Answer Accuracy", value: "87.5%" },
        { label: "Retrieval Precision", value: "92.1%" },
        { label: "Response Time", value: "2.3s" },
      ],
      technologies: ["Python", "BERT", "Elasticsearch", "Hugging Face", "FastAPI", "React"],
      icon: <Code className="h-6 w-6 text-amber-400" />,
    },
    {
      id: 13,
      title: "Sonar Rock vs Mine Prediction",
      description:
        "Implemented a classification model to distinguish between rocks and mines using sonar signal data. This system has applications in maritime safety, underwater exploration, and defense, helping to identify potentially dangerous objects underwater.",
      image: "/sonar.PNG?height=400&width=600",
      tags: ["python", "ml", "classification", "signal-processing"],
      category: "data-science",
      github: "https://github.com/Pramod-Chavhan/sonar-classification",
      demo: "https://sonar-classifier-demo.vercel.app",
      metrics: [
        { label: "Accuracy", value: "95.2%" },
        { label: "False Positives", value: "3.8%" },
        { label: "Detection Range", value: "+15%" },
      ],
      technologies: ["Python", "Scikit-learn", "SVM", "Signal Processing", "Flask", "D3.js"],
      icon: <Database className="h-6 w-6 text-blue-400" />,
    },
    // {
    //   id: 14,
    //   title: "Water Forecasting System",
    //   description:
    //     "Developed a time series forecasting model to predict water demand, availability, and quality for urban planning and resource management. The system helps utilities optimize distribution, plan infrastructure, and prepare for seasonal variations.",
    //   image: "/placeholder.svg?height=400&width=600",
    //   tags: ["python", "time-series", "forecasting", "environmental"],
    //   category: "predictive-analytics",
    //   github: "https://github.com/Pramod-Chavhan/water-forecasting",
    //   demo: "https://water-forecasting-demo.vercel.app",
    //   metrics: [
    //     { label: "Forecast Accuracy", value: "91.7%" },
    //     { label: "Resource Optimization", value: "23%" },
    //     { label: "Planning Horizon", value: "12 months" },
    //   ],
    //   technologies: ["Python", "Prophet", "ARIMA", "TensorFlow", "Pandas", "Plotly"],
    //   icon: <BarChart2 className="h-6 w-6 text-cyan-400" />,
    // },
    {
      id: 15,
      title: "Text to Image Generation",
      description:
        "Built a generative AI system that creates realistic images from textual descriptions. The model can generate diverse visual content based on detailed prompts, with applications in design, content creation, and creative industries.",
      image: "/image.PNG?height=400&width=600",
      tags: ["python", "deep-learning", "gan", "gen-ai"],
      category: "computer-vision",
      github: "https://github.com/Pramod-Chavhan/text-to-image",
      demo: "https://text-to-image-demo.vercel.app",
      metrics: [
        { label: "FID Score", value: "18.3" },
        { label: "User Satisfaction", value: "4.6/5" },
        { label: "Generation Time", value: "3.2s" },
      ],
      technologies: ["Python", "PyTorch", "Diffusion Models", "CLIP", "FastAPI", "React"],
      icon: <BrainCircuit className="h-6 w-6 text-pink-400" />,
    },
    {
      id: 16,
      title: "Appointment Scheduler for Sample Collection",
      description:
        "Built an intelligent scheduling system that optimizes routes and time slots for medical sample collection. Implemented machine learning algorithms to predict optimal collection times based on historical data and traffic patterns.",
      image: "/ASFSK.png?height=400&width=600",
      tags: ["python", "data-science", "optimization", "web"],
      category: "data-science",
      github: "https://github.com/Pramod-Chavhan/appointment-scheduler",
      demo: "https://v0-frontend-ui-design-murex.vercel.app/",
      metrics: [
        { label: "Delay Reduction", value: "43%" },
        { label: "Efficiency Gain", value: "37%" },
        { label: "User Satisfaction", value: "92%" },
      ],
      technologies: ["Python", "Scikit-learn", "Pandas", "Django", "PostgreSQL", "Google Maps API"],
      icon: <BarChart2 className="h-6 w-6 text-blue-400" />,
    },
    {
      id: 17,
      title: "Smart Irrigation System",
      description:
        "Designed and implemented an IoT-based smart irrigation system using AI and real-time soil moisture monitoring. The system predicts crop water needs and controls valves for precise irrigation, resulting in significant water conservation.",
      image: "/errigation.jpg?height=400&width=600",
      tags: ["iot", "python", "ml", "time-series"],
      category: "iot",
      github: "https://github.com/Pramod-Chavhan/smart-irrigation",
      demo: "https://smart-irrigation-iot.vercel.app",
      metrics: [
        { label: "Water Saved", value: "32%" },
        { label: "Crop Yield Increase", value: "18%" },
        { label: "Energy Efficiency", value: "27%" },
      ],
      technologies: ["Python", "TensorFlow", "Arduino", "MQTT", "Time Series Analysis", "React"],
      icon: <Database className="h-6 w-6 text-green-400" />,
    },
    {
      id: 18,
      title: "Advanced Virtual Assistant (Jarvis)",
      description:
        "Created a Jarvis-inspired virtual assistant with natural language processing and machine learning capabilities. The system can perform voice-activated tasks, answer questions, automate workflows, and integrate with various APIs and services.",
      image: "/virtual.jpg?height=400&width=600",
      tags: ["python", "ml", "nlp", "voice-recognition"],
      category: "nlp",
      github: "https://github.com/Pramod-Chavhan/jarvis-assistant",
      demo: "https://jarvis-assistant-demo.vercel.app",
      metrics: [
        { label: "Command Accuracy", value: "94%" },
        { label: "Response Time", value: "1.2s" },
        { label: "Supported Tasks", value: "120+" },
      ],
      technologies: ["Python", "NLTK", "spaCy", "PyTorch", "Google Speech API", "Flask"],
      icon: <Code className="h-6 w-6 text-pink-400" />,
    },
  ]

  // Enhanced filters with data science categories
  const filters = [
    { id: "all", label: "All Projects" },
    { id: "data-science", label: "Data Science" },
    { id: "ml", label: "Machine Learning" },
    { id: "nlp", label: "NLP" },
    { id: "computer-vision", label: "Computer Vision" },
    { id: "predictive-analytics", label: "Predictive Analytics" },
    { id: "healthcare", label: "Healthcare" },
    { id: "iot", label: "IoT" },
    { id: "gen-ai", label: "Generative AI" },
  ]

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter) || project.category === activeFilter)

  // Get currently visible projects
  const currentProjects = filteredProjects.slice(0, visibleProjects)

  // Check if there are more projects to load
  const hasMoreProjects = visibleProjects < filteredProjects.length

  // Function to load more projects
  const loadMoreProjects = () => {
    setVisibleProjects((prev) => prev + 6)
  }

  // Reset visible projects when filter changes
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
    setVisibleProjects(6) // Reset to show only first 6 projects when filter changes
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="container mx-auto px-4 py-16" ref={containerRef}>
      <EnhancedSectionHeading
        subtitle="My Recent Work"
        title="Data Science Projects"
        description="Explore my portfolio of projects showcasing expertise in machine learning, data analysis, and innovative solutions that transform complex data into actionable insights."
      />

      {/* Filter buttons with enhanced styling */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            className={`
              rounded-full px-5 transition-all duration-300 
              ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  : theme === "dark"
                    ? "border-gray-700 text-gray-300 hover:bg-gray-800/50"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100/50"
              }
            `}
            onClick={() => handleFilterChange(filter.id)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Projects grid with enhanced cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
            >
              <Card
                className={`h-full overflow-hidden transition-all duration-500 hover:shadow-xl group ${
                  theme === "dark"
                    ? "bg-gray-800/70 border-gray-700 hover:shadow-purple-500/10"
                    : "bg-white/70 border-gray-200 hover:shadow-purple-500/5"
                }`}
              >
                <CardContent className="p-0 h-full flex flex-col">
                  {/* Project image with overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        theme === "dark" ? "from-gray-900" : "from-gray-800"
                      } to-transparent opacity-60`}
                    ></div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <Badge
                        className={`${theme === "dark" ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-sm text-primary`}
                      >
                        {project.icon}
                        <span className="ml-1 capitalize">{project.category}</span>
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.description}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {project.metrics.map((metric, i) => (
                        <div
                          key={i}
                          className={`text-center p-2 rounded-lg ${
                            theme === "dark" ? "bg-gray-700/50" : "bg-gray-100/80"
                          }`}
                        >
                          <p className="text-primary font-bold text-lg">{metric.value}</p>
                          <p className="text-xs text-muted-foreground">{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Technologies:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className={`text-xs ${
                              theme === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50/50"
                            }`}
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              theme === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50/50"
                            }`}
                          >
                            +{project.technologies.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 text-xs rounded-full ${
                            theme === "dark" ? "bg-primary/10 text-primary-foreground" : "bg-primary/5 text-primary"
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 mt-auto">
                      <Button
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        onClick={() => window.open(project.demo, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button
                        variant="outline"
                        className={`flex-1 ${
                          theme === "dark" ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-100"
                        }`}
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load More button */}
      {hasMoreProjects && (
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
            onClick={loadMoreProjects}
          >
            Load More Projects
            <ChevronDown className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-y-1" />
          </Button>
        </motion.div>
      )}

      {/* View all projects button */}
      <div className="flex justify-center mt-8">
        <Button
          className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
          onClick={() => window.open("https://github.com/Pramod-Chavhan", "_blank")}
        >
          View All Projects
          <ChevronRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  )
}
