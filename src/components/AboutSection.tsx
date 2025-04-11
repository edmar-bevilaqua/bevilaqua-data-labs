
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="section-spacing px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-heading">About Me</h2>
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3">
            <p className="text-lg text-foreground/80 mb-6">
              I'm a Data Scientist with expertise in machine learning, statistical analysis, and data visualization. With 5+ years of experience working with complex datasets, I've developed a passion for turning data into actionable insights.
            </p>
            <p className="text-lg text-foreground/80 mb-6">
              My background combines strong technical skills with business acumen, allowing me to bridge the gap between data and real-world applications. I'm constantly exploring new technologies and methodologies to stay at the forefront of data science.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 border-none">
                <FileText className="mr-2 h-4 w-4" /> Download CV
              </Button>
            </div>
          </div>
          <div className="md:col-span-2 glass-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Education</h3>
            <div className="mb-4">
              <p className="font-medium">MSc in Data Science</p>
              <p className="text-foreground/70">Stanford University, 2018-2020</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">BSc in Computer Science</p>
              <p className="text-foreground/70">MIT, 2014-2018</p>
            </div>
            
            <h3 className="text-xl font-semibold mb-4 mt-6">Experience</h3>
            <div className="mb-4">
              <p className="font-medium">Senior Data Scientist</p>
              <p className="text-foreground/70">Tech Company, 2020-Present</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Data Analyst</p>
              <p className="text-foreground/70">Analytics Firm, 2018-2020</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
