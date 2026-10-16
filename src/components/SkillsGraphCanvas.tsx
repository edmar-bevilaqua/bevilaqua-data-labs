import React, { useEffect, useRef, useState } from 'react';
import { Lock, Unlock, RotateCcw, Sparkles } from 'lucide-react';
import { Language } from '@/content/siteContent';

interface SkillsGraphCanvasProps {
  language: Language;
}

type StageIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface SkillNodeDef {
  id: string;
  stage: StageIndex;
  rx: number;
  ry: number;
  radius: number;
  isHub?: boolean;
  label: { pt: string; en: string };
  repoContext: { pt: string; en: string };
}

const STAGE_COLORS: Record<StageIndex, string> = {
  0: '#38bdf8', // Sky - Linguagens & Base
  1: '#60a5fa', // Blue - Computação & Plataformas de Dados
  2: '#818cf8', // Indigo - Estatística, EDA & Pipelines
  3: '#a78bfa', // Violet - Engenharia de Atributos & Grafos
  4: '#c084fc', // Purple - Machine Learning & Forecasting
  5: '#f472b6', // Pink/Fuchsia - Deep Learning, GNNs & Validação
  6: '#34d399', // Emerald - Cloud, Containers, BI & Produtos
};

const STAGE_HEADERS: Record<Language, string[]> = {
  pt: [
    '01 · LINGUAGENS',
    '02 · DADOS & ENGINE',
    '03 · ESTATÍSTICA & ETL',
    '04 · FEATURE ENG.',
    '05 · MACHINE LEARNING',
    '06 · DEEP LEARNING',
    '07 · CLOUD, BI & PROD',
  ],
  en: [
    '01 · LANGUAGES',
    '02 · DATA ENGINES',
    '03 · STATS & ETL',
    '04 · FEATURE ENG.',
    '05 · MACHINE LEARNING',
    '06 · DEEP LEARNING',
    '07 · CLOUD, BI & PROD',
  ],
};

const LEGEND_ITEMS: Record<Language, { label: string; color: string }[]> = {
  pt: [
    { label: 'Linguagens & Base', color: '#38bdf8' },
    { label: 'Motores de Dados', color: '#60a5fa' },
    { label: 'Estatística & ETL', color: '#818cf8' },
    { label: 'Feature Eng.', color: '#a78bfa' },
    { label: 'Machine Learning', color: '#c084fc' },
    { label: 'Deep Learning / GNN', color: '#f472b6' },
    { label: 'Cloud, BI & Entrega', color: '#34d399' },
  ],
  en: [
    { label: 'Core & Languages', color: '#38bdf8' },
    { label: 'Data Engines', color: '#60a5fa' },
    { label: 'Stats & ETL', color: '#818cf8' },
    { label: 'Feature Eng.', color: '#a78bfa' },
    { label: 'Machine Learning', color: '#c084fc' },
    { label: 'Deep Learning / GNN', color: '#f472b6' },
    { label: 'Cloud, BI & Delivery', color: '#34d399' },
  ],
};

// 44 Atomic, Unbundled Skill Nodes across 7 progression stages
const SKILL_NODES: SkillNodeDef[] = [
  // ================= STAGE 0: LINGUAGENS & CORE (0..5) =================
  {
    id: 'python',
    stage: 0,
    rx: 0.065,
    ry: 0.14,
    radius: 10,
    isHub: true,
    label: { pt: 'Python', en: 'Python' },
    repoContext: {
      pt: 'Linguagem principal · data_science, store-sales & AML GNN',
      en: 'Primary language · data_science, store-sales & AML GNN',
    },
  },
  {
    id: 'sql',
    stage: 0,
    rx: 0.095,
    ry: 0.29,
    radius: 9,
    isHub: true,
    label: { pt: 'SQL', en: 'SQL' },
    repoContext: {
      pt: 'Consultas analíticas, window functions e estruturação de bases',
      en: 'Analytical queries, window functions & dataset preparation',
    },
  },
  {
    id: 'jupyter',
    stage: 0,
    rx: 0.06,
    ry: 0.44,
    radius: 7.5,
    label: { pt: 'Jupyter', en: 'Jupyter' },
    repoContext: {
      pt: 'Notebooks interativos e reprodutíveis · data_science & Kaggle',
      en: 'Interactive reproducible notebooks · data_science & Kaggle',
    },
  },
  {
    id: 'git',
    stage: 0,
    rx: 0.095,
    ry: 0.59,
    radius: 7.5,
    label: { pt: 'Git', en: 'Git' },
    repoContext: {
      pt: 'Versionamento de código, experimentos e CI/CD no GitHub',
      en: 'Code/experiment version control & GitHub CI/CD',
    },
  },
  {
    id: 'linux',
    stage: 0,
    rx: 0.06,
    ry: 0.74,
    radius: 7,
    label: { pt: 'Linux CLI', en: 'Linux CLI' },
    repoContext: {
      pt: 'Automação de ambientes, shell scripts e servidores cloud',
      en: 'Environment automation, shell scripting & cloud servers',
    },
  },
  {
    id: 'typescript',
    stage: 0,
    rx: 0.09,
    ry: 0.89,
    radius: 7.5,
    label: { pt: 'TypeScript', en: 'TypeScript' },
    repoContext: {
      pt: 'Tipagem estática para interfaces e produtos de dados · bevilaqua-data-labs',
      en: 'Static typing for analytical interfaces · bevilaqua-data-labs',
    },
  },

  // ================= STAGE 1: COMPUTAÇÃO & MOTORES DE DADOS (6..11) =================
  {
    id: 'numpy',
    stage: 1,
    rx: 0.20,
    ry: 0.13,
    radius: 8.5,
    isHub: true,
    label: { pt: 'NumPy', en: 'NumPy' },
    repoContext: {
      pt: 'Computação vetorial, matrizes e álgebra linear · data_science',
      en: 'Vectorized arrays, matrices & linear algebra · data_science',
    },
  },
  {
    id: 'pandas',
    stage: 1,
    rx: 0.23,
    ry: 0.28,
    radius: 9.5,
    isHub: true,
    label: { pt: 'Pandas', en: 'Pandas' },
    repoContext: {
      pt: 'Manipulação tabular, séries temporais e joins · todos os projetos',
      en: 'Tabular data wrangling, time series & joins · all projects',
    },
  },
  {
    id: 'scipy',
    stage: 1,
    rx: 0.195,
    ry: 0.43,
    radius: 7.5,
    label: { pt: 'SciPy', en: 'SciPy' },
    repoContext: {
      pt: 'Distribuições probabilísticas, otimização e testes estatísticos',
      en: 'Probability distributions, optimization & statistical tests',
    },
  },
  {
    id: 'pyspark',
    stage: 1,
    rx: 0.23,
    ry: 0.58,
    radius: 8,
    label: { pt: 'PySpark', en: 'PySpark' },
    repoContext: {
      pt: 'Processamento distribuído de grandes volumes de dados',
      en: 'Distributed big data processing in Python',
    },
  },
  {
    id: 'databricks',
    stage: 1,
    rx: 0.195,
    ry: 0.73,
    radius: 8.5,
    isHub: true,
    label: { pt: 'Databricks', en: 'Databricks' },
    repoContext: {
      pt: 'Plataforma Lakehouse unificada para Engenharia de Dados e ML',
      en: 'Unified Lakehouse platform for Data Engineering & ML',
    },
  },
  {
    id: 'airflow',
    stage: 1,
    rx: 0.225,
    ry: 0.88,
    radius: 8.5,
    label: { pt: 'Airflow', en: 'Airflow' },
    repoContext: {
      pt: 'Orquestração e agendamento de pipelines de dados e ML',
      en: 'Workflow orchestration & scheduling for data/ML pipelines',
    },
  },

  // ================= STAGE 2: ESTATÍSTICA, EDA & PIPELINES (12..17) =================
  {
    id: 'data-cleaning',
    stage: 2,
    rx: 0.34,
    ry: 0.14,
    radius: 8,
    label: { pt: 'Data Cleaning', en: 'Data Cleaning' },
    repoContext: {
      pt: 'Imputação, tratamento de ruídos e padronização · data_science',
      en: 'Imputation, outlier handling & standardization · data_science',
    },
  },
  {
    id: 'eda',
    stage: 2,
    rx: 0.37,
    ry: 0.29,
    radius: 9,
    isHub: true,
    label: { pt: 'Análise Exploratória', en: 'Exploratory Analysis' },
    repoContext: {
      pt: 'Descoberta de padrões, correlações e diagnósticos visuais · data_science',
      en: 'Pattern discovery, correlations & visual diagnostics · data_science',
    },
  },
  {
    id: 'stat-inference',
    stage: 2,
    rx: 0.335,
    ry: 0.44,
    radius: 8,
    label: { pt: 'Inferência Estatística', en: 'Statistical Inference' },
    repoContext: {
      pt: 'Estimação, intervalos de confiança e modelagem probabilística',
      en: 'Estimation, confidence intervals & probabilistic modeling',
    },
  },
  {
    id: 'hyp-testing',
    stage: 2,
    rx: 0.37,
    ry: 0.59,
    radius: 8,
    label: { pt: 'Testes de Hipóteses', en: 'Hypothesis Testing' },
    repoContext: {
      pt: 'Validação rigorosa de premissas de negócio e experimentos A/B',
      en: 'Rigorous validation of business assumptions & A/B experiments',
    },
  },
  {
    id: 'etl-pipelines',
    stage: 2,
    rx: 0.335,
    ry: 0.74,
    radius: 8.5,
    isHub: true,
    label: { pt: 'Pipelines ETL / ELT', en: 'ETL / ELT Pipelines' },
    repoContext: {
      pt: 'Fluxos automatizados de ingestão e transformação analítica',
      en: 'Automated ingestion and analytical transformation workflows',
    },
  },
  {
    id: 'dim-modeling',
    stage: 2,
    rx: 0.365,
    ry: 0.89,
    radius: 8,
    label: { pt: 'Modelagem de Dados', en: 'Data Modeling' },
    repoContext: {
      pt: 'Arquitetura Medallion e esquemas dimensionais para BI e IA',
      en: 'Medallion architecture & dimensional schemas for BI and AI',
    },
  },

  // ================= STAGE 3: FEATURE ENGINEERING & GRAFOS (18..23) =================
  {
    id: 'feat-eng',
    stage: 3,
    rx: 0.48,
    ry: 0.13,
    radius: 9.5,
    isHub: true,
    label: { pt: 'Feature Engineering', en: 'Feature Engineering' },
    repoContext: {
      pt: 'Criação de variáveis preditivas de alto sinal · todos os projetos ML',
      en: 'High-signal predictive variable creation · all ML projects',
    },
  },
  {
    id: 'lags-rolling',
    stage: 3,
    rx: 0.51,
    ry: 0.28,
    radius: 9,
    isHub: true,
    label: { pt: 'Lags & Rolling Windows', en: 'Lags & Rolling Windows' },
    repoContext: {
      pt: 'Defasagens temporais e médias móveis · store-sales-tsf-kaggle',
      en: 'Temporal lags & moving averages · store-sales-tsf-kaggle',
    },
  },
  {
    id: 'seasonality',
    stage: 3,
    rx: 0.475,
    ry: 0.43,
    radius: 8,
    label: { pt: 'Sazonalidade & Eventos', en: 'Seasonality & Events' },
    repoContext: {
      pt: 'Ciclos de calendário, feriados e choques exógenos · store-sales-tsf',
      en: 'Calendar cycles, holidays & exogenous shocks · store-sales-tsf',
    },
  },
  {
    id: 'encoding-scaling',
    stage: 3,
    rx: 0.51,
    ry: 0.58,
    radius: 8,
    label: { pt: 'Encoding & Scaling', en: 'Encoding & Scaling' },
    repoContext: {
      pt: 'Normalização robusta e codificação categórica · data_science',
      en: 'Robust scaling & categorical encoding · data_science',
    },
  },
  {
    id: 'pca-dim',
    stage: 3,
    rx: 0.475,
    ry: 0.73,
    radius: 7.5,
    label: { pt: 'PCA & Seleção', en: 'PCA & Feature Selection' },
    repoContext: {
      pt: 'Redução de dimensionalidade e poda de colinearidade · data_science',
      en: 'Dimensionality reduction & collinearity pruning · data_science',
    },
  },
  {
    id: 'graph-topology',
    stage: 3,
    rx: 0.505,
    ry: 0.88,
    radius: 9.5,
    isHub: true,
    label: { pt: 'Topologia de Grafos', en: 'Graph Topology' },
    repoContext: {
      pt: 'Modelagem de contas e transações em grafos · anti-money-laundering',
      en: 'Modeling accounts & transfers as graphs · anti-money-laundering',
    },
  },

  // ================= STAGE 4: MACHINE LEARNING & SÉRIES TEMPORAIS (24..29) =================
  {
    id: 'scikit-learn',
    stage: 4,
    rx: 0.62,
    ry: 0.14,
    radius: 10,
    isHub: true,
    label: { pt: 'Scikit-Learn', en: 'Scikit-Learn' },
    repoContext: {
      pt: 'Ecossistema principal de ML clássico e pipelines · data_science',
      en: 'Core classical ML & pipeline ecosystem · data_science',
    },
  },
  {
    id: 'reg-class',
    stage: 4,
    rx: 0.65,
    ry: 0.29,
    radius: 8,
    label: { pt: 'Classificação & Regressão', en: 'Classification & Regression' },
    repoContext: {
      pt: 'Modelos lineares, árvores e SVMs · data_science',
      en: 'Linear models, decision trees & SVMs · data_science',
    },
  },
  {
    id: 'ensemble-ml',
    stage: 4,
    rx: 0.615,
    ry: 0.44,
    radius: 9.5,
    isHub: true,
    label: { pt: 'Ensemble Learning', en: 'Ensemble Learning' },
    repoContext: {
      pt: 'Combinação de múltiplos estimadores · store-sales-tsf-kaggle',
      en: 'Combining multiple estimators · store-sales-tsf-kaggle',
    },
  },
  {
    id: 'grad-boosting',
    stage: 4,
    rx: 0.65,
    ry: 0.59,
    radius: 8.5,
    label: { pt: 'Gradient Boosting', en: 'Gradient Boosting' },
    repoContext: {
      pt: 'Boosting de árvores para dados tabulares e séries temporais',
      en: 'Tree boosting for tabular data & time-series competition',
    },
  },
  {
    id: 'ts-forecasting',
    stage: 4,
    rx: 0.615,
    ry: 0.74,
    radius: 9.5,
    isHub: true,
    label: { pt: 'Forecasting Temporal', en: 'Time Series Forecasting' },
    repoContext: {
      pt: 'Previsão multi-loja de demanda futura · store-sales-tsf-kaggle',
      en: 'Multi-store future demand prediction · store-sales-tsf-kaggle',
    },
  },
  {
    id: 'clustering',
    stage: 4,
    rx: 0.645,
    ry: 0.89,
    radius: 8,
    label: { pt: 'Clusterização & Anomalias', en: 'Clustering & Anomalies' },
    repoContext: {
      pt: 'Detecção de padrões atípicos e agrupamento não-supervisionado',
      en: 'Outlier pattern detection & unsupervised clustering',
    },
  },

  // ================= STAGE 5: DEEP LEARNING, GNN & VALIDAÇÃO (30..35) =================
  {
    id: 'out-of-time-val',
    stage: 5,
    rx: 0.76,
    ry: 0.13,
    radius: 8.5,
    isHub: true,
    label: { pt: 'Validação Out-of-Time', en: 'Out-of-Time Validation' },
    repoContext: {
      pt: 'Splits temporais estritos sem data leakage · store-sales-tsf',
      en: 'Strict temporal splits with zero leakage · store-sales-tsf',
    },
  },
  {
    id: 'hyper-tuning',
    stage: 5,
    rx: 0.79,
    ry: 0.28,
    radius: 8,
    label: { pt: 'Hyperparameter Tuning', en: 'Hyperparameter Tuning' },
    repoContext: {
      pt: 'Otimização sistemática de hiperparâmetros e métricas de erro',
      en: 'Systematic hyperparameter search & error metric optimization',
    },
  },
  {
    id: 'pytorch',
    stage: 5,
    rx: 0.755,
    ry: 0.44,
    radius: 9.5,
    isHub: true,
    label: { pt: 'PyTorch', en: 'PyTorch' },
    repoContext: {
      pt: 'Tensores, autograd e treinamento neural · anti-money-laundering',
      en: 'Tensors, autograd & neural training · anti-money-laundering',
    },
  },
  {
    id: 'deep-learning',
    stage: 5,
    rx: 0.79,
    ry: 0.59,
    radius: 8.5,
    label: { pt: 'Deep Learning', en: 'Deep Learning' },
    repoContext: {
      pt: 'Arquiteturas neurais multicamadas e representações latentes',
      en: 'Multi-layer neural architectures & latent representations',
    },
  },
  {
    id: 'pyg',
    stage: 5,
    rx: 0.755,
    ry: 0.74,
    radius: 9.5,
    isHub: true,
    label: { pt: 'PyTorch Geometric', en: 'PyTorch Geometric' },
    repoContext: {
      pt: 'Biblioteca de Deep Learning para Grafos · anti-money-laundering',
      en: 'Graph Deep Learning library · anti-money-laundering',
    },
  },
  {
    id: 'gnn',
    stage: 5,
    rx: 0.785,
    ry: 0.89,
    radius: 10,
    isHub: true,
    label: { pt: 'Graph Neural Networks', en: 'Graph Neural Networks' },
    repoContext: {
      pt: 'Message Passing relacional multi-hop · anti-money-laundering',
      en: 'Multi-hop relational message passing · anti-money-laundering',
    },
  },

  // ================= STAGE 6: CLOUD, BI & PRODUTOS DE NEGÓCIO (36..43) =================
  {
    id: 'aws',
    stage: 6,
    rx: 0.91,
    ry: 0.11,
    radius: 8.5,
    label: { pt: 'AWS', en: 'AWS' },
    repoContext: {
      pt: 'Infraestrutura cloud, armazenamento S3 e serviços gerenciados de IA',
      en: 'Cloud infrastructure, S3 storage & managed AI services',
    },
  },
  {
    id: 'azure-gcp',
    stage: 6,
    rx: 0.935,
    ry: 0.22,
    radius: 8,
    label: { pt: 'Azure & GCP', en: 'Azure & GCP' },
    repoContext: {
      pt: 'Ambientes analíticos corporativos e plataformas de dados em nuvem',
      en: 'Enterprise analytical environments & cloud data platforms',
    },
  },
  {
    id: 'docker',
    stage: 6,
    rx: 0.905,
    ry: 0.34,
    radius: 8.5,
    label: { pt: 'Docker', en: 'Docker' },
    repoContext: {
      pt: 'Empacotamento reprodutível de modelos e dependências',
      en: 'Reproducible packaging of models and dependencies',
    },
  },
  {
    id: 'kubernetes',
    stage: 6,
    rx: 0.935,
    ry: 0.45,
    radius: 8,
    label: { pt: 'Kubernetes', en: 'Kubernetes' },
    repoContext: {
      pt: 'Orquestração elástica de containers e microsserviços analíticos',
      en: 'Elastic orchestration of containers & analytical services',
    },
  },
  {
    id: 'aml-scoring',
    stage: 6,
    rx: 0.905,
    ry: 0.57,
    radius: 9,
    isHub: true,
    label: { pt: 'Detecção Fraude / AML', en: 'AML Fraud Detection' },
    repoContext: {
      pt: 'Impacto · Identificação de lavagem de dinheiro em redes financeiras',
      en: 'Impact · Money laundering ring detection in financial networks',
    },
  },
  {
    id: 'power-bi',
    stage: 6,
    rx: 0.935,
    ry: 0.69,
    radius: 8.5,
    label: { pt: 'Power BI', en: 'Power BI' },
    repoContext: {
      pt: 'Dashboards executivos, modelagem DAX e indicadores de negócio',
      en: 'Executive dashboards, DAX modeling & business KPIs',
    },
  },
  {
    id: 'tableau',
    stage: 6,
    rx: 0.905,
    ry: 0.80,
    radius: 8,
    label: { pt: 'Tableau', en: 'Tableau' },
    repoContext: {
      pt: 'Visualização analítica interativa e storytelling executivo',
      en: 'Interactive analytical visualization & executive storytelling',
    },
  },
  {
    id: 'react-apps',
    stage: 6,
    rx: 0.935,
    ry: 0.91,
    radius: 8.5,
    label: { pt: 'React Data Apps', en: 'React Data Apps' },
    repoContext: {
      pt: 'Produtos digitais orientados por dados · bevilaqua-data-labs',
      en: 'Data-driven digital products · bevilaqua-data-labs',
    },
  },
];

// 98 Directed Acyclic Edges connecting the 44 atomic skills
const SKILL_EDGES: [number, number][] = [
  // Stage 0 internal & Stage 0 -> Stage 1
  [0, 2],  [0, 6],  [0, 7],  [0, 8],  [0, 9],  [0, 11],
  [1, 7],  [1, 9],  [1, 10], [1, 16], [1, 17],
  [2, 6],  [2, 7],  [2, 13],
  [3, 4],  [3, 10], [3, 11], [3, 38],
  [4, 11], [4, 38],
  [5, 43],

  // Stage 1 internal & Stage 1 -> Stage 2
  [6, 7],  [6, 8],  [6, 12], [6, 14],
  [7, 12], [7, 13], [7, 16],
  [8, 14], [8, 15],
  [9, 10], [9, 16],
  [10, 16], [10, 17],
  [11, 16], [11, 17],

  // Stage 2 internal & Stage 2 -> Stage 3
  [12, 13], [12, 18], [12, 21],
  [13, 14], [13, 18], [13, 19], [13, 20],
  [14, 15], [14, 20], [14, 22],
  [15, 18], [15, 22],
  [16, 18], [16, 19], [16, 23],
  [17, 23], [17, 41], [17, 42],

  // Stage 3 internal & Stage 3 -> Stage 4
  [18, 19], [18, 21], [18, 23], [18, 24], [18, 26],
  [19, 20], [19, 26], [19, 27], [19, 28],
  [20, 28], [20, 26],
  [21, 22], [21, 24], [21, 25],
  [22, 24], [22, 29],
  [23, 29], [23, 34], [23, 35],

  // Stage 4 internal & Stage 4 -> Stage 5
  [24, 25], [24, 26], [24, 29], [24, 30], [24, 31],
  [25, 26], [25, 31], [25, 32],
  [26, 27], [26, 28], [26, 30], [26, 31],
  [27, 28], [27, 30], [27, 31],
  [28, 30], [28, 32],
  [29, 34], [29, 35],

  // Stage 5 internal & Stage 5 -> Stage 6
  [30, 31], [30, 36], [30, 41],
  [31, 36], [31, 37], [31, 38],
  [32, 33], [32, 34], [32, 36], [32, 38],
  [33, 35], [33, 37], [33, 40],
  [34, 35], [34, 40],
  [35, 40], [35, 38], [35, 43],

  // Stage 6 internal chains
  [36, 37], [38, 39], [39, 36], [39, 37],
  [40, 41], [40, 43], [41, 42], [42, 43],
];

type EdgeCascadeStatus = 'inactive' | 'traveling' | 'completed';

interface EdgeCascadeState {
  status: EdgeCascadeStatus;
  direction: 'forward' | 'backward';
  progress: number;
  speed: number;
}

const SkillsGraphCanvas: React.FC<SkillsGraphCanvasProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [rootNodeIdx, setRootNodeIdx] = useState<number>(0);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [progressStats, setProgressStats] = useState<{ lit: number; total: number }>({
    lit: 1,
    total: 1,
  });

  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -10000,
    y: -10000,
    active: false,
  });
  const rootNodeRef = useRef<number>(0);
  const isPinnedRef = useRef<boolean>(false);
  const startCascadeRef = useRef<(startIdx: number) => void>(() => {});

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animId = 0;
    let isRunning = false;
    let isVisible = true;

    const nodeCount = SKILL_NODES.length;
    const edgeCount = SKILL_EDGES.length;

    let width = 1050;
    let height = 500;
    let dpr = 1;

    const hx = new Float32Array(nodeCount);
    const hy = new Float32Array(nodeCount);
    const px = new Float32Array(nodeCount);
    const py = new Float32Array(nodeCount);
    const vx = new Float32Array(nodeCount);
    const vy = new Float32Array(nodeCount);

    // Pre-cached text widths so ctx.measureText is NEVER called inside the 60fps loop!
    const labelWidthNormal = new Float32Array(nodeCount);
    const labelWidthBold = new Float32Array(nodeCount);

    const nodeLit = new Uint8Array(nodeCount);
    const nodeForwardReady = new Uint8Array(nodeCount);
    const nodeBackwardReady = new Uint8Array(nodeCount);
    const nodeActivation = new Float32Array(nodeCount);
    const nodeFlash = new Float32Array(nodeCount);
    const nodeInSubgraph = new Uint8Array(nodeCount);

    const edgeStates: EdgeCascadeState[] = Array.from({ length: edgeCount }, () => ({
      status: 'inactive',
      direction: 'forward',
      progress: 0,
      speed: 0.025,
    }));

    const ctx =
      canvas.getContext('2d', { desynchronized: true }) || canvas.getContext('2d');

    const cacheLabelWidths = (isCompact: boolean) => {
      if (!ctx) return;
      const size = isCompact ? '9px' : '9.8px';
      ctx.font = `500 ${size} "JetBrains Mono", monospace`;
      for (let i = 0; i < nodeCount; i++) {
        labelWidthNormal[i] = ctx.measureText(SKILL_NODES[i].label[language]).width;
      }
      ctx.font = `600 ${size} "JetBrains Mono", monospace`;
      for (let i = 0; i < nodeCount; i++) {
        labelWidthBold[i] = ctx.measureText(SKILL_NODES[i].label[language]).width;
      }
    };

    const computeReachableSubgraph = (startIdx: number) => {
      nodeInSubgraph.fill(0);
      nodeInSubgraph[startIdx] = 1;

      const fwdQueue = [startIdx];
      const fwdVisited = new Set<number>([startIdx]);
      while (fwdQueue.length > 0) {
        const curr = fwdQueue.shift()!;
        for (let e = 0; e < edgeCount; e++) {
          const [u, v] = SKILL_EDGES[e];
          if (u === curr && !fwdVisited.has(v)) {
            fwdVisited.add(v);
            nodeInSubgraph[v] = 1;
            fwdQueue.push(v);
          }
        }
      }

      const bwdQueue = [startIdx];
      const bwdVisited = new Set<number>([startIdx]);
      while (bwdQueue.length > 0) {
        const curr = bwdQueue.shift()!;
        for (let e = 0; e < edgeCount; e++) {
          const [u, v] = SKILL_EDGES[e];
          if (v === curr && !bwdVisited.has(u)) {
            bwdVisited.add(u);
            nodeInSubgraph[u] = 1;
            bwdQueue.push(u);
          }
        }
      }

      let totalReachable = 0;
      for (let i = 0; i < nodeCount; i++) {
        if (nodeInSubgraph[i]) totalReachable++;
      }
      return totalReachable;
    };

    const spawnOutgoingFrom = (uIdx: number) => {
      for (let eIdx = 0; eIdx < edgeCount; eIdx++) {
        if (SKILL_EDGES[eIdx][0] === uIdx && edgeStates[eIdx].status === 'inactive') {
          edgeStates[eIdx].status = 'traveling';
          edgeStates[eIdx].direction = 'forward';
          edgeStates[eIdx].progress = 0;
          edgeStates[eIdx].speed = 0.024 + (eIdx % 4) * 0.0025;
        }
      }
    };

    const spawnIncomingTo = (vIdx: number) => {
      for (let eIdx = 0; eIdx < edgeCount; eIdx++) {
        if (SKILL_EDGES[eIdx][1] === vIdx && edgeStates[eIdx].status === 'inactive') {
          edgeStates[eIdx].status = 'traveling';
          edgeStates[eIdx].direction = 'backward';
          edgeStates[eIdx].progress = 0;
          edgeStates[eIdx].speed = 0.024 + (eIdx % 4) * 0.0025;
        }
      }
    };

    let currentTotalReachable = 1;
    let lastReportedLit = -1;

    const startCascade = (startIdx: number) => {
      rootNodeRef.current = startIdx;
      setRootNodeIdx(startIdx);

      currentTotalReachable = computeReachableSubgraph(startIdx);

      nodeLit.fill(0);
      nodeForwardReady.fill(0);
      nodeBackwardReady.fill(0);
      nodeFlash.fill(0);

      for (let e = 0; e < edgeCount; e++) {
        edgeStates[e].status = 'inactive';
        edgeStates[e].progress = 0;
      }

      if (prefersReducedMotion) {
        for (let i = 0; i < nodeCount; i++) {
          if (nodeInSubgraph[i]) {
            nodeLit[i] = 1;
            nodeActivation[i] = 1;
          } else {
            nodeActivation[i] = 0;
          }
        }
        setProgressStats({ lit: currentTotalReachable, total: currentTotalReachable });
        return;
      }

      nodeLit[startIdx] = 1;
      nodeForwardReady[startIdx] = 1;
      nodeBackwardReady[startIdx] = 1;
      nodeActivation[startIdx] = 1;
      nodeFlash[startIdx] = 1.0;

      spawnOutgoingFrom(startIdx);
      spawnIncomingTo(startIdx);

      lastReportedLit = 1;
      setProgressStats({ lit: 1, total: currentTotalReachable });
    };

    startCascadeRef.current = startCascade;

    const updateLayout = () => {
      width = container.clientWidth || 1050;
      height = Math.max(460, Math.min(540, Math.round(window.innerHeight * 0.58)));
      container.style.height = `${height}px`;

      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      for (let i = 0; i < nodeCount; i++) {
        hx[i] = SKILL_NODES[i].rx * width;
        hy[i] = SKILL_NODES[i].ry * height;
        if (px[i] === 0 && py[i] === 0) {
          px[i] = hx[i];
          py[i] = hy[i];
        }
      }

      cacheLabelWidths(width < 760);
    };

    updateLayout();
    startCascade(rootNodeRef.current);

    const getCubicBezierPoint = (
      t: number,
      x1: number,
      y1: number,
      cx1: number,
      cy1: number,
      cx2: number,
      cy2: number,
      x2: number,
      y2: number
    ) => {
      const mt = 1 - t;
      const x =
        mt * mt * mt * x1 +
        3 * mt * mt * t * cx1 +
        3 * mt * t * t * cx2 +
        t * t * t * x2;
      const y =
        mt * mt * mt * y1 +
        3 * mt * mt * t * cy1 +
        3 * mt * t * t * cy2 +
        t * t * t * y2;
      return { x, y };
    };

    const render = (now: number) => {
      if (!isVisible || document.hidden || !ctx) {
        isRunning = false;
        return;
      }

      const isCompact = width < 760;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // 1. Batched Stage Dividers + Headers
      const stageX = [0.08, 0.215, 0.355, 0.495, 0.635, 0.775, 0.92].map((r) => r * width);
      const dividerPath = new Path2D();
      for (let s = 0; s < stageX.length; s++) {
        dividerPath.moveTo(stageX[s], 26);
        dividerPath.lineTo(stageX[s], height - 12);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.stroke(dividerPath);
      ctx.setLineDash([]);

      if (!isCompact) {
        ctx.font = '600 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        for (let s = 0; s < stageX.length; s++) {
          ctx.fillStyle = STAGE_COLORS[s as StageIndex] + 'bb';
          ctx.fillText(STAGE_HEADERS[language][s], stageX[s], 15);
        }
      }

      // 2. Update node physics & fast hover detection
      const mx = pointerRef.current.x;
      const my = pointerRef.current.y;
      const isPointerActive = pointerRef.current.active;
      let hoveredCandidate: number | null = null;
      let closestDistSq = 1350;

      for (let i = 0; i < nodeCount; i++) {
        const floatX = prefersReducedMotion ? 0 : Math.sin(now * 0.001 + i * 1.3) * 1.8;
        const floatY = prefersReducedMotion ? 0 : Math.cos(now * 0.0012 + i * 1.7) * 1.8;

        const targetX = hx[i] + floatX;
        const targetY = hy[i] + floatY;

        let dvx = (vx[i] + (targetX - px[i]) * 0.11) * 0.8;
        let dvy = (vy[i] + (targetY - py[i]) * 0.11) * 0.8;

        if (isPointerActive) {
          const dx = mx - px[i];
          if (dx < 70 && dx > -70) {
            const dy = my - py[i];
            if (dy < 70 && dy > -70) {
              const dSq = dx * dx + dy * dy;
              if (dSq < closestDistSq) {
                closestDistSq = dSq;
                hoveredCandidate = i;
              }
              if (dSq < 4900 && dSq > 4) {
                const d = Math.sqrt(dSq);
                const pull = (1 - d / 70) * 0.24;
                dvx += (dx / d) * pull;
                dvy += (dy / d) * pull;
              }
            }
          }
        }

        vx[i] = dvx;
        vy[i] = dvy;
        px[i] += dvx;
        py[i] += dvy;

        const targetAct = nodeLit[i] ? 1 : 0;
        nodeActivation[i] += (targetAct - nodeActivation[i]) * 0.17;
        nodeFlash[i] *= 0.9;
      }

      if (
        !isPinnedRef.current &&
        isPointerActive &&
        hoveredCandidate !== null &&
        hoveredCandidate !== rootNodeRef.current
      ) {
        startCascade(hoveredCandidate);
      }

      // 3. Step Progressive Cascade along Edges
      for (let eIdx = 0; eIdx < edgeCount; eIdx++) {
        const st = edgeStates[eIdx];
        if (st.status !== 'traveling') continue;

        st.progress += st.speed;
        if (st.progress >= 1) {
          st.progress = 1;
          st.status = 'completed';

          const [u, v] = SKILL_EDGES[eIdx];
          if (st.direction === 'forward') {
            if (!nodeLit[v]) {
              nodeLit[v] = 1;
              nodeFlash[v] = 1.0;
            }
            if (!nodeForwardReady[v]) {
              nodeForwardReady[v] = 1;
              spawnOutgoingFrom(v);
            }
          } else {
            if (!nodeLit[u]) {
              nodeLit[u] = 1;
              nodeFlash[u] = 1.0;
            }
            if (!nodeBackwardReady[u]) {
              nodeBackwardReady[u] = 1;
              spawnIncomingTo(u);
            }
          }
        }
      }

      let litSum = 0;
      for (let i = 0; i < nodeCount; i++) {
        if (nodeLit[i]) litSum++;
      }
      if (litSum !== lastReportedLit) {
        lastReportedLit = litSum;
        setProgressStats({ lit: litSum, total: currentTotalReachable });
      }

      // 4. Batched Edge Rendering (reduces 98 draw calls down to 9 batched Path2D calls!)
      const activeSubgraphEdges = new Path2D();
      const dimBackgroundEdges = new Path2D();
      const completedPathsByStage = [0, 1, 2, 3, 4, 5, 6].map(() => new Path2D());

      for (let eIdx = 0; eIdx < edgeCount; eIdx++) {
        const [u, v] = SKILL_EDGES[eIdx];
        const st = edgeStates[eIdx];

        const x1 = px[u];
        const y1 = py[u];
        const x2 = px[v];
        const y2 = py[v];
        const cx1 = x1 + (x2 - x1) * 0.45;
        const cy1 = y1;
        const cx2 = x1 + (x2 - x1) * 0.55;
        const cy2 = y2;

        if (st.status === 'completed') {
          const targetStage = SKILL_NODES[v].stage;
          completedPathsByStage[targetStage].moveTo(x1, y1);
          completedPathsByStage[targetStage].bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
        } else {
          const targetBase =
            nodeInSubgraph[u] && nodeInSubgraph[v]
              ? activeSubgraphEdges
              : dimBackgroundEdges;
          targetBase.moveTo(x1, y1);
          targetBase.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
        }
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.045)';
      ctx.stroke(dimBackgroundEdges);

      ctx.strokeStyle = 'rgba(148, 163, 184, 0.14)';
      ctx.stroke(activeSubgraphEdges);

      ctx.lineWidth = 1.85;
      ctx.globalAlpha = 0.8;
      for (let s = 0; s < 7; s++) {
        ctx.strokeStyle = STAGE_COLORS[s as StageIndex];
        ctx.stroke(completedPathsByStage[s]);
      }
      ctx.globalAlpha = 1;

      // Draw active traveling trails + glowing balls (only for edges currently in 'traveling' state)
      for (let eIdx = 0; eIdx < edgeCount; eIdx++) {
        const st = edgeStates[eIdx];
        if (st.status !== 'traveling') continue;

        const [u, v] = SKILL_EDGES[eIdx];
        const x1 = px[u];
        const y1 = py[u];
        const x2 = px[v];
        const y2 = py[v];
        const cx1 = x1 + (x2 - x1) * 0.45;
        const cy1 = y1;
        const cx2 = x1 + (x2 - x1) * 0.55;
        const cy2 = y2;

        const steps = 12;
        const isFwd = st.direction === 'forward';
        const sx = isFwd ? x1 : x2;
        const sy = isFwd ? y1 : y2;
        const ballColor = isFwd
          ? STAGE_COLORS[SKILL_NODES[v].stage]
          : STAGE_COLORS[SKILL_NODES[u].stage];

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        let tipX = sx;
        let tipY = sy;

        for (let s = 1; s <= steps; s++) {
          const frac = (s / steps) * st.progress;
          const t = isFwd ? frac : 1 - frac;
          const pt = getCubicBezierPoint(t, x1, y1, cx1, cy1, cx2, cy2, x2, y2);
          ctx.lineTo(pt.x, pt.y);
          if (s === steps) {
            tipX = pt.x;
            tipY = pt.y;
          }
        }

        ctx.strokeStyle = ballColor;
        ctx.lineWidth = 2.1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(tipX, tipY, 7, 0, Math.PI * 2);
        ctx.fillStyle = `${ballColor}38`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(tipX, tipY, 3.3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(tipX, tipY, 2.3, 0, Math.PI * 2);
        ctx.fillStyle = ballColor;
        ctx.fill();
      }

      // 5. Draw 44 Skill Nodes & Labels (using pre-cached label widths!)
      const activeRoot = rootNodeRef.current;
      const fontSizeStr = isCompact ? '9px' : '9.8px';
      ctx.textAlign = 'center';

      for (let i = 0; i < nodeCount; i++) {
        const node = SKILL_NODES[i];
        const x = px[i];
        const y = py[i];
        const color = STAGE_COLORS[node.stage];
        const act = nodeActivation[i];
        const flash = nodeFlash[i];
        const isRoot = i === activeRoot;
        const r = node.radius * (0.8 + 0.22 * act + (isRoot ? 0.16 : 0)) + flash * 3.5;

        if (flash > 0.05) {
          ctx.beginPath();
          ctx.arc(x, y, r + (1 - flash) * 16, 0, Math.PI * 2);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.8 * flash;
          ctx.globalAlpha = flash;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        if (act > 0.1) {
          ctx.beginPath();
          ctx.arc(x, y, r + 5 * act, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${isRoot ? '38' : '20'}`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#0B0F19';
        ctx.fill();
        ctx.lineWidth = isRoot ? 2.6 : 1.3 + act * 1.0;
        ctx.strokeStyle = act > 0.15 ? color : 'rgba(148, 163, 184, 0.24)';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, r * (0.34 + 0.24 * act), 0, Math.PI * 2);
        ctx.fillStyle = act > 0.15 ? color : 'rgba(100, 116, 139, 0.34)';
        ctx.fill();

        if (!isCompact || act > 0.25 || node.isHub) {
          const isBold = isRoot || act > 0.5;
          const textWidth = isBold ? labelWidthBold[i] : labelWidthNormal[i];
          const labelY = y + r + 11;
          const padX = 5;

          ctx.globalAlpha = 0.28 + 0.72 * act;

          ctx.fillStyle =
            act > 0.5 ? 'rgba(15, 23, 42, 0.94)' : 'rgba(11, 15, 25, 0.7)';
          ctx.beginPath();
          ctx.roundRect(
            x - textWidth * 0.5 - padX,
            labelY - 8,
            textWidth + padX * 2,
            12.5,
            3.5
          );
          ctx.fill();

          if (act > 0.5) {
            ctx.strokeStyle = isRoot ? color : `${color}66`;
            ctx.lineWidth = isRoot ? 1.2 : 0.85;
            ctx.stroke();
          }

          ctx.font = `${isBold ? '600' : '500'} ${fontSizeStr} "JetBrains Mono", monospace`;
          ctx.fillStyle = act > 0.5 ? '#f8fafc' : 'rgba(148, 163, 184, 0.72)';
          ctx.fillText(node.label[language], x, labelY + 0.5);
          ctx.globalAlpha = 1;
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    const startLoop = () => {
      if (!isRunning && isVisible && !document.hidden) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    // Pause rendering completely when scrolled off-screen
    const intersectionObs = new IntersectionObserver(
      (entries) => {
        const nowVisible = entries[0]?.isIntersecting ?? true;
        const wasHidden = !isVisible && nowVisible;
        isVisible = nowVisible;
        if (wasHidden) {
          // Replay cascade freshly when the user scrolls into the Skills section!
          startCascade(rootNodeRef.current);
        }
        if (isVisible) startLoop();
      },
      { rootMargin: '10% 0px' }
    );
    intersectionObs.observe(container);

    const handleVisibilityChange = () => {
      if (!document.hidden && isVisible) startLoop();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const resizeObs = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateLayout();
        startLoop();
      }, 100);
    });
    resizeObs.observe(container);

    startLoop();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      intersectionObs.disconnect();
      resizeObs.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [language]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: -10000, y: -10000, active: false };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    let clickedNode: number | null = null;
    let bestDistSq = 1800;
    SKILL_NODES.forEach((node, idx) => {
      const nx = node.rx * width;
      const ny = node.ry * height;
      const dSq = (clickX - nx) ** 2 + (clickY - ny) ** 2;
      if (dSq < bestDistSq) {
        bestDistSq = dSq;
        clickedNode = idx;
      }
    });

    if (clickedNode !== null) {
      if (isPinnedRef.current && rootNodeRef.current === clickedNode) {
        isPinnedRef.current = false;
        setIsPinned(false);
        startCascadeRef.current(clickedNode);
      } else {
        isPinnedRef.current = true;
        setIsPinned(true);
        startCascadeRef.current(clickedNode);
      }
    } else if (isPinnedRef.current) {
      isPinnedRef.current = false;
      setIsPinned(false);
    }

    pointerRef.current = { x: clickX, y: clickY, active: true };
  };

  const inspectedNode = SKILL_NODES[rootNodeIdx] || SKILL_NODES[0];
  const isComplete = progressStats.lit >= progressStats.total;

  return (
    <div className="relative rounded-2xl border border-white/10 bg-card/85 backdrop-blur-md p-4 md:p-6 shadow-xl">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3.5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-background/90 px-2.5 py-1 font-mono text-xs text-foreground">
            <i
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: STAGE_COLORS[inspectedNode.stage] }}
            />
            <b>{inspectedNode.label[language]}</b>
            <span className="hidden md:inline text-foreground/55">
              · {inspectedNode.repoContext[language]}
            </span>
          </span>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] transition-colors ${
              isComplete
                ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
                : 'border-sky-400/40 bg-sky-400/10 text-sky-300'
            }`}
          >
            <Sparkles className="h-3 w-3" />
            <span>
              {language === 'pt'
                ? `Trilha ativa: ${progressStats.lit}/${progressStats.total} skills`
                : `Active path: ${progressStats.lit}/${progressStats.total} skills`}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => startCascadeRef.current(rootNodeRef.current)}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-background/70 px-2.5 py-1 text-foreground/75 hover:border-sky-400/50 hover:text-sky-300 transition-colors"
            title={language === 'pt' ? 'Repetir propagação' : 'Replay propagation'}
          >
            <RotateCcw className="h-3 w-3" />
            <span>{language === 'pt' ? 'Repetir Onda' : 'Replay Wave'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const next = !isPinned;
              isPinnedRef.current = next;
              setIsPinned(next);
            }}
            className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 transition-colors ${
              isPinned
                ? 'border-amber-400/50 bg-amber-400/10 text-amber-300'
                : 'border-white/10 bg-background/70 text-foreground/65 hover:text-foreground'
            }`}
          >
            {isPinned ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
            <span>
              {isPinned
                ? language === 'pt'
                  ? 'Trilha Fixada'
                  : 'Path Locked'
                : language === 'pt'
                ? 'Hover Livre'
                : 'Free Hover'}
            </span>
          </button>
        </div>
      </div>

      {/* Stage Legend Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 font-mono text-[11px] text-foreground/65 border-b border-white/5">
        <div className="flex flex-wrap items-center gap-3">
          {LEGEND_ITEMS[language].map((item) => (
            <span key={item.label} className="inline-flex items-center gap-1.5">
              <i
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.label}</span>
            </span>
          ))}
        </div>
        <span className="hidden lg:inline text-foreground/45">
          {language === 'pt'
            ? '44 nós atômicos · 98 conexões · 7 estágios'
            : '44 atomic nodes · 98 connections · 7 stages'}
        </span>
      </div>

      {/* Interactive 7-Stage 44-Node Progressive Graph Canvas */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        role="img"
        aria-label={
          language === 'pt'
            ? 'Grafo progressivo de 44 skills e arquitetura de dados'
            : 'Progressive 44-skill data architecture graph'
        }
        className="relative w-full cursor-pointer select-none overflow-hidden"
        style={{ height: 500 }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none block h-full w-full"
        />
      </div>

      {/* Footer Hint */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2.5 font-mono text-[11px] md:text-xs text-foreground/55">
        <span>
          {language === 'pt'
            ? 'passe o mouse em qualquer skill para iniciar a propagação em cascata · clique em um nó para fixar/destravar a trilha'
            : 'hover any skill to trigger cascading propagation · click a node to lock/unlock the path'}
        </span>
        <span className="text-sky-400/90 truncate max-w-md">
          {inspectedNode.repoContext[language]}
        </span>
      </div>
    </div>
  );
};

export default SkillsGraphCanvas;
