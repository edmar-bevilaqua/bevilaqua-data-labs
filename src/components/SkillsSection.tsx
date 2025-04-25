
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: number;
}

const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    skills: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 95 },
      { name: "JavaScript", level: 80 },
      { name: "Java", level: 75 },
    ]
  },
  {
    name: "Machine Learning",
    skills: [
      { name: "Scikit-Learn", level: 95 },
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 80 },
      { name: "Keras", level: 85 },
    ]
  },
  {
    name: "Data Processing",
    skills: [
      { name: "Pandas", level: 95 },
      { name: "NumPy", level: 95 },
      { name: "PySpark", level: 80 },
      { name: "Dask", level: 75 },
    ]
  },
  {
    name: "Visualization",
    skills: [
      { name: "Matplotlib", level: 90 },
      { name: "Seaborn", level: 90 },
      { name: "Plotly", level: 80 },
      { name: "D3.js", level: 70 },
    ]
  }
];

const tools = [
  "Python", "Jupyter", "Azure", "Git", "Docker", "AWS", "GCP", 
  "Databricks", "Power BI", "Tableau", "Airflow", "Kubernetes"
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-spacing px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading">Skills</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="glass-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">{category.name}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-foreground/70">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2 bg-secondary" 
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-6">Tools & Technologies</h3>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, index) => (
              <Badge 
                key={index} 
                className="bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white/90 border border-white/10 px-4 py-2 hover:brightness-125 transition-all"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
