
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
              Data scientist and machine learning engineer with more than 4 years of experience in industry, retail, services and startups. My career combines business intelligence, data engineering and machine learning techniques.
            </p>
            <p className="text-lg text-foreground/80 mb-6">
              With an academic background in areas ranging from nature to technology, I combine different views in an attempt to solve complex problems.
            </p>
            <p className="text-lg text-foreground/80 mb-6">
              Curious by nature and trying to stay at the forefront of the ever-evolving field of data science, I continually explore new tools, models and methodologies.
            </p>
            <p className="text-lg text-foreground/80 mb-6">
              A bit about what I've developed in the professional field: I've contributed to data-driven projects, from validating the effectiveness of promotional campaigns to designing predictive models that support strategic decision-making.
              I collaborate to translate raw data and analytical findings into practical and viable actions, that may improve performance, efficiency, and/or profitability.
            </p>
            <p className="text-lg text-foreground/80 mb-6">
              My experience also includes building scalable pipelines, from automating reporting workflows to structuring datasets for advanced analytics.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button 
                onClick={() => {
                  window.open(
                    "https://drive.google.com/uc?id=1LciOMrvWBoe8BfVjCv0-8QJ3XUXbzgyn&export=download",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 border-none"
              >
                <FileText className="mr-2 h-4 w-4" /> Download CV
              </Button>
            </div>
          </div>
          <div className="md:col-span-2 glass-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Education</h3>
            <div className="mb-4">
              <p className="font-medium">MSc in Computer Science</p>
              <p className="text-foreground/70">Federal University of Rio Grande do Sul, 2025-Present</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">MBA in Data Science & AI</p>
              <p className="text-foreground/70">PUC-RS, 2023-2025</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Associate Degree in Systems Analysis and Development</p>
              <p className="text-foreground/70">UNINTER, 2022-Present</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">BSc in Forestry Engineer</p>
              <p className="text-foreground/70">Federal University of Santa Maria, 2018-2023</p>
            </div>
            
            <h3 className="text-xl font-semibold mb-4 mt-6">Experience</h3>
            <div className="mb-4">
              <p className="font-medium">Machine Learning Engineer</p>
              <p className="text-foreground/70">
                <a 
                  href="https://www.linkedin.com/company/aprix/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Aprix, 2025-Present
                </a>
              </p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Data Analyst</p>
              <p className="text-foreground/70">
                <a 
                  href="https://www.linkedin.com/company/lojas-quero-quero-s-a/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Lojas Quero-Quero S.A., 2024-2025
                </a>
              </p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Data Science Intern</p>
              <p className="text-foreground/70">
                <a 
                  href="https://www.linkedin.com/company/cmpc-brasil/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  CMPC, 2023-2024
                </a>
              </p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Remote Sensing Laboratory Technician</p>
              <p className="text-foreground/70">
                <a 
                  href="https://www.ufsm.br/laboratorios/labsere" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  LABSERE - UFSM, 2022-2023
                </a>
              </p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Forest Engineering Assistant</p>
              <p className="text-foreground/70">
                <a 
                  href="https://www.linkedin.com/company/rs-florestal/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  RS Florestal, 2021-2022
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
