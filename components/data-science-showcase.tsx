"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Database, LineChart, Cpu, Code } from "lucide-react"
import CodeSnippet from "@/components/code-snippet"
import { cn } from "@/lib/utils"

const teal = "#2dd4bf"
const sky = "#38bdf8"
const cyan = "#22d3ee"

type TabId = "ml" | "data" | "viz" | "tech"

const tabs: { id: TabId; label: string; short: string; icon: typeof Brain }[] = [
  { id: "ml", label: "Machine Learning", short: "ML", icon: Brain },
  { id: "data", label: "Data Processing", short: "Data", icon: Database },
  { id: "viz", label: "Visualization", short: "Viz", icon: LineChart },
  { id: "tech", label: "Technologies", short: "Tech", icon: Cpu },
]

const mlModelCode = `import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load and prepare data
X = df.drop("target", axis=1)
y = df["target"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model accuracy: {accuracy:.2f}")

# Feature importance
importances = model.feature_importances_
features = X.columns
for feature, importance in sorted(
    zip(features, importances),
    key=lambda x: x[1],
    reverse=True,
)[:5]:
    print(f"{feature}: {importance:.4f}")
`

const dataProcessingCode = `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

# Load data
df = pd.read_csv("data.csv")

# Explore data
print(f"Shape: {df.shape}")
print(df.info())
print(df.describe())

# Handle missing values
imputer = SimpleImputer(strategy="mean")
df_numeric = df.select_dtypes(include=[np.number])
df[df_numeric.columns] = imputer.fit_transform(df_numeric)

# Feature engineering
df["ratio"] = df["feature_a"] / df["feature_b"]
df["log_feature"] = np.log1p(df["feature_c"])

# Normalize features
scaler = StandardScaler()
df_scaled = pd.DataFrame(
    scaler.fit_transform(df_numeric),
    columns=df_numeric.columns,
)

# Save processed data
df_scaled.to_csv("processed_data.csv", index=False)
`

const visualizationCode = `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# Load data
df = pd.read_csv("data.csv")

# Set style
plt.style.use("dark_background")
sns.set_palette("viridis")

# Create figure with subplots
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Plot 1: Distribution
sns.histplot(df["feature"], kde=True, ax=axes[0, 0])
axes[0, 0].set_title("Feature Distribution")

# Plot 2: Correlation heatmap
corr = df.corr()
sns.heatmap(corr, annot=True, cmap="coolwarm", ax=axes[0, 1])
axes[0, 1].set_title("Correlation Matrix")

# Plot 3: Scatter plot
sns.scatterplot(
    x="feature_1", y="feature_2", hue="target", data=df, ax=axes[1, 0]
)
axes[1, 0].set_title("Feature Relationships")

# Plot 4: Box plot
sns.boxplot(x="category", y="value", data=df, ax=axes[1, 1])
axes[1, 1].set_title("Value by Category")

plt.tight_layout()
plt.savefig("analysis.png", dpi=300)
plt.show()
`

const mlAccuracy = [
  { label: "Neural Network", value: 95 },
  { label: "Random Forest", value: 92 },
  { label: "SVM", value: 87 },
  { label: "Decision Tree", value: 82 },
  { label: "KNN", value: 78 },
]

const dataSplit = [
  { label: "Training", value: 70 },
  { label: "Validation", value: 15 },
  { label: "Testing", value: 15 },
]

const timeSeries = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 72 },
  { label: "Mar", value: 68 },
  { label: "Apr", value: 78 },
  { label: "May", value: 82 },
  { label: "Jun", value: 87 },
  { label: "Jul", value: 76 },
]

const skillRadar = [
  { label: "Python", value: 90 },
  { label: "ML", value: 85 },
  { label: "Analysis", value: 88 },
  { label: "Stats", value: 80 },
  { label: "Viz", value: 85 },
  { label: "Big Data", value: 75 },
]

function MetricBars({
  title,
  data,
}: {
  title: string
  data: { label: string; value: number }[]
}) {
  return (
    <div className="surface p-5">
      <h4 className="text-sm font-medium text-slate-300 mb-4">{title}</h4>
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">{d.label}</span>
              <span className="text-teal-400 tabular-nums">{d.value}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-sky-400"
                initial={{ width: 0 }}
                whileInView={{ width: `${d.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DataScienceShowcase() {
  const [active, setActive] = useState<TabId>("ml")

  return (
    <section className="section-pad border-t border-white/[0.04]">
      <div className="container-pro">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Data Science Expertise</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-50 mb-4">
            My Analytical Approach
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Leveraging advanced algorithms and statistical methods to extract meaningful insights from complex
            datasets.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map((t) => {
            const Icon = t.icon
            const on = active === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all",
                  on
                    ? "border-teal-400/40 bg-teal-500/10 text-teal-200"
                    : "border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-slate-200",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.short}</span>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {active === "ml" && (
            <motion.div
              key="ml"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              <div className="space-y-6">
                <div className="surface p-6">
                  <h3 className="font-display text-xl font-semibold text-slate-100 mb-3">
                    Machine Learning Expertise
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    I specialize in developing and deploying machine learning models that solve real-world problems
                    across various domains. My approach combines statistical rigor with practical implementation.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      "Supervised Learning",
                      "Unsupervised Learning",
                      "Deep Learning",
                      "Natural Language Processing",
                      "Computer Vision",
                      "Time Series Analysis",
                    ].map((b) => (
                      <span key={b} className="rounded-full border border-white/[0.08] px-2.5 py-1 text-xs text-slate-300">
                        {b}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs uppercase tracking-wider text-teal-400 mb-2">Key Algorithms</p>
                  <ul className="space-y-1.5 text-sm text-slate-400">
                    {[
                      "Random Forest & Gradient Boosting",
                      "Neural Networks & Deep Learning",
                      "Support Vector Machines",
                      "Clustering & Dimensionality Reduction",
                      "Bayesian Methods",
                    ].map((a) => (
                      <li key={a} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <CodeSnippet
                  code={mlModelCode}
                  language="python"
                  title="Random Forest Classifier"
                  description="Implementation of a machine learning model with feature importance analysis"
                />
              </div>
              <div className="space-y-6">
                <MetricBars title="Model Accuracy Comparison" data={mlAccuracy} />
                <MetricBars title="Data Distribution" data={dataSplit} />
              </div>
            </motion.div>
          )}

          {active === "data" && (
            <motion.div
              key="data"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              <div className="space-y-6">
                <div className="surface p-6">
                  <h3 className="font-display text-xl font-semibold text-slate-100 mb-3">
                    Data Processing & Engineering
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Transforming raw data into valuable insights requires meticulous processing and feature
                    engineering. I excel at preparing data for analysis and model training.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      "Data Cleaning",
                      "Feature Engineering",
                      "ETL Pipelines",
                      "Dimensionality Reduction",
                      "Anomaly Detection",
                    ].map((b) => (
                      <span key={b} className="rounded-full border border-white/[0.08] px-2.5 py-1 text-xs text-slate-300">
                        {b}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs uppercase tracking-wider text-teal-400 mb-2">Key Skills</p>
                  <ul className="space-y-1.5 text-sm text-slate-400">
                    {[
                      "Missing Value Imputation",
                      "Outlier Detection & Handling",
                      "Data Normalization & Scaling",
                      "Feature Selection & Extraction",
                      "Data Augmentation",
                    ].map((a) => (
                      <li key={a} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <MetricBars title="Time Series Analysis" data={timeSeries} />
              </div>
              <CodeSnippet
                code={dataProcessingCode}
                language="python"
                title="Data Processing Pipeline"
                description="Cleaning, feature engineering, and normalization workflow"
              />
            </motion.div>
          )}

          {active === "viz" && (
            <motion.div
              key="viz"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              <CodeSnippet
                code={visualizationCode}
                language="python"
                title="Data Visualization"
                description="Insightful plots with matplotlib and seaborn"
              />
              <div className="space-y-6">
                <div className="surface p-6">
                  <h3 className="font-display text-xl font-semibold text-slate-100 mb-3">Data Visualization</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Effective visualization communicates insights clearly. I create informative, visually sharp
                    representations of complex data for stakeholders.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      "Interactive Dashboards",
                      "Statistical Visualization",
                      "Geospatial Mapping",
                      "Network Graphs",
                      "Real-time Visualization",
                    ].map((b) => (
                      <span key={b} className="rounded-full border border-white/[0.08] px-2.5 py-1 text-xs text-slate-300">
                        {b}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs uppercase tracking-wider text-teal-400 mb-2">Tools & Libraries</p>
                  <ul className="space-y-1.5 text-sm text-slate-400">
                    {[
                      "Matplotlib & Seaborn",
                      "Plotly & Dash",
                      "Tableau & Power BI",
                      "D3.js",
                      "Bokeh & Altair",
                    ].map((a) => (
                      <li key={a} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <MetricBars title="Skills Proficiency" data={skillRadar} />
              </div>
            </motion.div>
          )}

          {active === "tech" && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <TechCard
                icon={Code}
                title="Programming"
                items={[
                  { name: "Python", note: "Primary language for data science" },
                  { name: "R", note: "Statistical analysis" },
                  { name: "SQL", note: "Database querying" },
                  { name: "JavaScript", note: "Web visualization" },
                  { name: "Julia", note: "High-performance computing" },
                ]}
              />
              <TechCard
                icon={Brain}
                title="ML & AI"
                items={[
                  { name: "scikit-learn", note: "ML algorithms" },
                  { name: "TensorFlow", note: "Deep learning" },
                  { name: "PyTorch", note: "Neural networks" },
                  { name: "Hugging Face", note: "LLMs & Transformers" },
                  { name: "NLTK / spaCy", note: "NLP" },
                ]}
              />
              <TechCard
                icon={Database}
                title="Data Infrastructure"
                items={[
                  { name: "PostgreSQL", note: "Relational DB" },
                  { name: "MongoDB", note: "NoSQL DB" },
                  { name: "Pinecone / Qdrant", note: "Vector databases" },
                  { name: "AWS / Azure", note: "Cloud platforms" },
                  { name: "Docker / Airflow", note: "Deploy & pipelines" },
                ]}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function TechCard({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Code
  title: string
  items: { name: string; note: string }[]
}) {
  return (
    <div className="surface p-6 h-full">
      <div className="flex items-center gap-3 mb-5">
        <Icon className="h-6 w-6 text-teal-400" />
        <h3 className="font-display text-lg font-semibold text-slate-100">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.name} className="flex flex-col gap-0.5">
            <span className="inline-flex w-fit rounded-md bg-teal-500/15 px-2 py-0.5 text-xs text-teal-300">
              {item.name}
            </span>
            <span className="text-xs text-slate-500">{item.note}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
