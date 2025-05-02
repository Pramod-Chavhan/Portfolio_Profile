"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Database, BarChartIcon as ChartBar, Code, Cpu } from "lucide-react"
import DataVisualization from "@/components/data-visualization"
import CodeSnippet from "@/components/code-snippet"

export default function DataScienceShowcase() {
  const [activeTab, setActiveTab] = useState("ml")

  // Sample data for visualizations
  const mlAccuracyData = [
    { label: "Random Forest", value: 92, color: "#7c3aed" },
    { label: "SVM", value: 87, color: "#8b5cf6" },
    { label: "Neural Network", value: 95, color: "#6d28d9" },
    { label: "Decision Tree", value: 82, color: "#5b21b6" },
    { label: "KNN", value: 78, color: "#4c1d95" },
  ]

  const dataDistributionData = [
    { label: "Training", value: 70, color: "#7c3aed" },
    { label: "Validation", value: 15, color: "#8b5cf6" },
    { label: "Testing", value: 15, color: "#6d28d9" },
  ]

  const timeSeriesData = [
    { label: "Jan", value: 65, color: "#7c3aed" },
    { label: "Feb", value: 72, color: "#7c3aed" },
    { label: "Mar", value: 68, color: "#7c3aed" },
    { label: "Apr", value: 78, color: "#7c3aed" },
    { label: "May", value: 82, color: "#7c3aed" },
    { label: "Jun", value: 87, color: "#7c3aed" },
    { label: "Jul", value: 76, color: "#7c3aed" },
  ]

  const skillsData = [
    { label: "Python", value: 90, color: "#7c3aed" },
    { label: "ML", value: 85, color: "#7c3aed" },
    { label: "Data Analysis", value: 88, color: "#7c3aed" },
    { label: "Statistics", value: 80, color: "#7c3aed" },
    { label: "Visualization", value: 85, color: "#7c3aed" },
    { label: "Big Data", value: 75, color: "#7c3aed" },
  ]

  // Sample code snippets
  const mlModelCode = `import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load and prepare data
X = df.drop('target', axis=1)
y = df['target']

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
    reverse=True
)[:5]:
    print(f"{feature}: {importance:.4f}")
`

  const dataProcessingCode = `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

# Load data
df = pd.read_csv('data.csv')

# Explore data
print(f"Shape: {df.shape}")
print(df.info())
print(df.describe())

# Handle missing values
imputer = SimpleImputer(strategy='mean')
df_numeric = df.select_dtypes(include=[np.number])
df[df_numeric.columns] = imputer.fit_transform(df_numeric)

# Feature engineering
df['ratio'] = df['feature_a'] / df['feature_b']
df['log_feature'] = np.log1p(df['feature_c'])

# Normalize features
scaler = StandardScaler()
df_scaled = pd.DataFrame(
    scaler.fit_transform(df_numeric),
    columns=df_numeric.columns
)

# Save processed data
df_scaled.to_csv('processed_data.csv', index=False)
`

  const visualizationCode = `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# Load data
df = pd.read_csv('data.csv')

# Set style
plt.style.use('dark_background')
sns.set_palette('viridis')

# Create figure with subplots
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Plot 1: Distribution
sns.histplot(df['feature'], kde=True, ax=axes[0, 0])
axes[0, 0].set_title('Feature Distribution')

# Plot 2: Correlation heatmap
corr = df.corr()
sns.heatmap(
    corr, 
    annot=True, 
    cmap='coolwarm', 
    ax=axes[0, 1]
)
axes[0, 1].set_title('Correlation Matrix')

# Plot 3: Scatter plot
sns.scatterplot(
    x='feature_1', 
    y='feature_2',
    hue='target',
    data=df,
    ax=axes[1, 0]
)
axes[1, 0].set_title('Feature Relationships')

# Plot 4: Box plot
sns.boxplot(
    x='category', 
    y='value',
    data=df,
    ax=axes[1, 1]
)
axes[1, 1].set_title('Value by Category')

plt.tight_layout()
plt.savefig('analysis.png', dpi=300)
plt.show()
`

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-lg text-primary mb-2 font-medium">Data Science Expertise</p>
        <h2 className="text-4xl font-bold mb-4 relative inline-block">
          My Analytical Approach
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
          Leveraging advanced algorithms and statistical methods to extract meaningful insights from complex datasets
        </p>
      </motion.div>

      <Tabs defaultValue="ml" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="ml" className="text-base flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Machine Learning</span>
              <span className="sm:hidden">ML</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="text-base flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Data Processing</span>
              <span className="sm:hidden">Data</span>
            </TabsTrigger>
            <TabsTrigger value="viz" className="text-base flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              <span className="hidden sm:inline">Visualization</span>
              <span className="sm:hidden">Viz</span>
            </TabsTrigger>
            <TabsTrigger value="tech" className="text-base flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              <span className="hidden sm:inline">Technologies</span>
              <span className="sm:hidden">Tech</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="ml" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/80 backdrop-blur-sm border border-primary/20 shadow-xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Machine Learning Expertise</h3>
                    <p className="text-muted-foreground mb-4">
                      I specialize in developing and deploying machine learning models that solve real-world problems
                      across various domains. My approach combines statistical rigor with practical implementation.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-primary/10">
                        Supervised Learning
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Unsupervised Learning
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Deep Learning
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Natural Language Processing
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Computer Vision
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Time Series Analysis
                      </Badge>
                    </div>
                    <h4 className="font-semibold mb-2">Key Algorithms:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Random Forest & Gradient Boosting</li>
                      <li>Neural Networks & Deep Learning</li>
                      <li>Support Vector Machines</li>
                      <li>Clustering & Dimensionality Reduction</li>
                      <li>Bayesian Methods</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <CodeSnippet
                  code={mlModelCode}
                  language="python"
                  title="Random Forest Classifier"
                  description="Implementation of a machine learning model with feature importance analysis"
                />
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <DataVisualization title="Model Accuracy Comparison" data={mlAccuracyData} type="bar" height={300} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <DataVisualization title="Data Distribution" data={dataDistributionData} type="pie" height={300} />
              </motion.div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="data" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/80 backdrop-blur-sm border border-primary/20 shadow-xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Data Processing & Engineering</h3>
                    <p className="text-muted-foreground mb-4">
                      Transforming raw data into valuable insights requires meticulous processing and feature
                      engineering. I excel at preparing data for analysis and model training.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-primary/10">
                        Data Cleaning
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Feature Engineering
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        ETL Pipelines
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Dimensionality Reduction
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Anomaly Detection
                      </Badge>
                    </div>
                    <h4 className="font-semibold mb-2">Key Skills:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Missing Value Imputation</li>
                      <li>Outlier Detection & Handling</li>
                      <li>Data Normalization & Scaling</li>
                      <li>Feature Selection & Extraction</li>
                      <li>Data Augmentation</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <DataVisualization title="Time Series Analysis" data={timeSeriesData} type="line" height={300} />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <CodeSnippet
                code={dataProcessingCode}
                language="python"
                title="Data Processing Pipeline"
                description="Comprehensive data preparation workflow including cleaning, feature engineering, and normalization"
              />
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="viz" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <CodeSnippet
                code={visualizationCode}
                language="python"
                title="Data Visualization"
                description="Creating insightful visualizations using matplotlib and seaborn"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/80 backdrop-blur-sm border border-primary/20 shadow-xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Data Visualization</h3>
                    <p className="text-muted-foreground mb-4">
                      Effective data visualization is crucial for communicating insights and findings. I create clear,
                      informative, and visually appealing representations of complex data.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-primary/10">
                        Interactive Dashboards
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Statistical Visualization
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Geospatial Mapping
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Network Graphs
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Real-time Visualization
                      </Badge>
                    </div>
                    <h4 className="font-semibold mb-2">Tools & Libraries:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Matplotlib & Seaborn</li>
                      <li>Plotly & Dash</li>
                      <li>Tableau & Power BI</li>
                      <li>D3.js</li>
                      <li>Bokeh & Altair</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <DataVisualization title="Skills Proficiency" data={skillsData} type="radar" height={300} />
              </motion.div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tech" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/80 backdrop-blur-sm border border-primary/20 shadow-xl h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Code className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold">Programming</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">Python</Badge>
                      <span className="text-sm text-muted-foreground">Primary language for data science</span>
                    </li>
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">R</Badge>
                      <span className="text-sm text-muted-foreground">Statistical analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">SQL</Badge>
                      <span className="text-sm text-muted-foreground">Database querying</span>
                    </li>
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">JavaScript</Badge>
                      <span className="text-sm text-muted-foreground">Web visualization</span>
                    </li>
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">Julia</Badge>
                      <span className="text-sm text-muted-foreground">High-performance computing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/80 backdrop-blur-sm border border-primary/20 shadow-xl h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Brain className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold">ML & AI</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">scikit-learn</Badge>
                      <span className="text-sm text-muted-foreground">ML algorithms</span>
                    </li>
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">TensorFlow</Badge>
                      <span className="text-sm text-muted-foreground">Deep learning</span>
                    </li>
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">PyTorch</Badge>
                      <span className="text-sm text-muted-foreground">Neural networks</span>
                    </li>
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">Keras</Badge>
                      <span className="text-sm text-muted-foreground">High-level API</span>
                    </li>
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">NLTK/spaCy</Badge>
                      <span className="text-sm text-muted-foreground">NLP</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/80 backdrop-blur-sm border border-primary/20 shadow-xl h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Database className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold">Data Infrastructure</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">PostgreSQL</Badge>
                      <span className="text-sm text-muted-foreground">Relational DB</span>
                    </li>
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">MongoDB</Badge>
                      <span className="text-sm text-muted-foreground">NoSQL DB</span>
                    </li>
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">Spark</Badge>
                      <span className="text-sm text-muted-foreground">Big data processing</span>
                    </li>
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">Hadoop</Badge>
                      <span className="text-sm text-muted-foreground">Distributed storage</span>
                    </li>
                    <li className="flex items-center">
                      <Badge className="mr-2 bg-primary/20 hover:bg-primary/30 text-primary">Airflow</Badge>
                      <span className="text-sm text-muted-foreground">Workflow orchestration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
