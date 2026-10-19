import React, { useEffect, useRef, useState } from 'react';
import { Lock, Unlock, RotateCcw, Sparkles } from 'lucide-react';
import { Language } from '@/content/siteContent';

interface SkillsGraphCanvasProps {
  language: Language;
  isSectionActive?: boolean;
  externalFocusSkill?: { nodeId: string; seq: number } | null;
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
    '01: LINGUAGENS',
    '02: DADOS & ENGINE',
    '03: ESTATÍSTICA & ETL',
    '04: FEATURE ENG.',
    '05: MACHINE LEARNING',
    '06: DEEP LEARNING',
    '07: CLOUD, BI & PROD',
  ],
  en: [
    '01: LANGUAGES',
    '02: DATA ENGINES',
    '03: STATS & ETL',
    '04: FEATURE ENG.',
    '05: MACHINE LEARNING',
    '06: DEEP LEARNING',
    '07: CLOUD, BI & PROD',
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
      pt: 'Linguagem principal em data_science, store-sales e AML GNN',
      en: 'Primary language in data_science, store-sales, and AML GNN',
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
      pt: 'Notebooks interativos e reprodutíveis em data_science e Kaggle',
      en: 'Interactive, reproducible notebooks in data_science and Kaggle',
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
      pt: 'Tipagem estática para interfaces e produtos de dados em bevilaqua-data-labs',
      en: 'Static typing for analytical interfaces in bevilaqua-data-labs',
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
      pt: 'Computação vetorial, matrizes e álgebra linear em data_science',
      en: 'Vectorized arrays, matrices, and linear algebra in data_science',
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
      pt: 'Manipulação tabular, séries temporais e joins nos projetos',
      en: 'Tabular data wrangling, time series, and joins across projects',
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
      pt: 'Imputação, tratamento de ruídos e padronização em data_science',
      en: 'Imputation, outlier handling, and standardization in data_science',
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
      pt: 'Descoberta de padrões, correlações e diagnósticos visuais em data_science',
      en: 'Pattern discovery, correlations, and visual diagnostics in data_science',
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
      pt: 'Criação de variáveis preditivas para os projetos de ML',
      en: 'Predictive feature creation across ML projects',
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
      pt: 'Defasagens temporais e médias móveis em store-sales-tsf-kaggle',
      en: 'Temporal lags and moving averages in store-sales-tsf-kaggle',
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
      pt: 'Ciclos de calendário, feriados e choques exógenos em store-sales-tsf',
      en: 'Calendar cycles, holidays, and exogenous shocks in store-sales-tsf',
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
      pt: 'Normalização robusta e codificação categórica em data_science',
      en: 'Robust scaling and categorical encoding in data_science',
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
      pt: 'Redução de dimensionalidade e poda de colinearidade em data_science',
      en: 'Dimensionality reduction and collinearity pruning in data_science',
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
      pt: 'Modelagem de contas e transações em grafos no anti-money-laundering',
      en: 'Modeling accounts and transfers as graphs in anti-money-laundering',
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
      pt: 'Ecossistema de ML clássico e pipelines em data_science',
      en: 'Classical ML and pipeline ecosystem in data_science',
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
      pt: 'Modelos lineares, árvores e SVMs em data_science',
      en: 'Linear models, decision trees, and SVMs in data_science',
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
      pt: 'Combinação de múltiplos estimadores em store-sales-tsf-kaggle',
      en: 'Combining multiple estimators in store-sales-tsf-kaggle',
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
      pt: 'Previsão de demanda para várias lojas em store-sales-tsf-kaggle',
      en: 'Multi-store demand forecasting in store-sales-tsf-kaggle',
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
      pt: 'Divisões temporais sem vazamento de dados em store-sales-tsf',
      en: 'Time-based splits without data leakage in store-sales-tsf',
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
      pt: 'Tensores, autograd e treinamento neural no anti-money-laundering',
      en: 'Tensors, autograd, and neural network training in anti-money-laundering',
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
      pt: 'Biblioteca de Deep Learning para Grafos no anti-money-laundering',
      en: 'Graph deep learning library in anti-money-laundering',
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
      pt: 'Message passing relacional multi-hop no anti-money-laundering',
      en: 'Multi-hop relational message passing in anti-money-laundering',
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
      pt: 'Impacto: identificação de lavagem de dinheiro em redes financeiras',
      en: 'Impact: money laundering ring detection in financial networks',
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
      pt: 'Produtos digitais orientados por dados em bevilaqua-data-labs',
      en: 'Data-driven digital products in bevilaqua-data-labs',
    },
  },
];

const SKILL_DESCRIPTIONS: Record<string, Record<Language, string>> = {
  python: {
    pt: 'Python é uma linguagem de programação de propósito geral cuja sintaxe legível e amplo ecossistema de bibliotecas a tornaram central em ciência de dados. É usada para preparar dados, treinar e avaliar modelos e automatizar tarefas; foi criada por Guido van Rossum e teve sua primeira versão publicada em 1991.',
    en: 'Python is a general-purpose programming language whose readable syntax and broad library ecosystem have made it central to data science. It is used to prepare data, train and evaluate models, and automate tasks; Guido van Rossum created it, and its first release appeared in 1991.',
  },
  sql: {
    pt: 'SQL é a linguagem usada para consultar e transformar dados armazenados em bancos relacionais e plataformas analíticas. Com filtros, agregações, junções e funções de janela, permite construir conjuntos de análise rastreáveis diretamente na fonte, reduzindo a necessidade de mover dados antes de cada investigação.',
    en: 'SQL is the language used to query and transform data in relational databases and analytical platforms. Filters, aggregations, joins, and window functions make it possible to build traceable analytical datasets close to their source, reducing the need to move data for every investigation.',
  },
  jupyter: {
    pt: 'Jupyter é um ambiente de notebooks interativos que combina código, resultados, visualizações e texto explicativo em um mesmo documento. Isso facilita explorar dados passo a passo e registrar o raciocínio de uma análise; para que o resultado seja reproduzível, é importante organizar dependências e controlar a ordem de execução das células.',
    en: 'Jupyter is an interactive notebook environment that combines code, outputs, visualizations, and explanatory text in one document. It supports step-by-step data exploration and makes analytical reasoning easier to communicate; reproducibility still depends on managing dependencies and running cells in a controlled order.',
  },
  git: {
    pt: 'Git registra a evolução de arquivos como uma sequência de alterações que pode ser comparada, revisada e recuperada. Branches e commits ajudam a experimentar sem perder uma versão estável, enquanto a colaboração via GitHub conecta o código a revisões, documentação e automações de integração contínua.',
    en: 'Git records file changes as a history that can be compared, reviewed, and restored. Branches and commits support experimentation without losing a stable version, while collaboration through GitHub connects code to reviews, documentation, and continuous-integration automation.',
  },
  linux: {
    pt: 'A linha de comando do Linux permite navegar por arquivos, combinar ferramentas e automatizar tarefas com scripts. É especialmente útil para preparar ambientes, processar arquivos em lote e operar servidores ou containers; comandos simples e reproduzíveis também ajudam a documentar como uma análise ou aplicação deve ser executada.',
    en: 'The Linux command line makes it possible to navigate files, combine utilities, and automate work with scripts. It is useful for preparing environments, processing files in batches, and operating servers or containers; repeatable commands also document how an analysis or application should run.',
  },
  typescript: {
    pt: 'TypeScript acrescenta tipos estáticos ao JavaScript e ajuda a detectar incompatibilidades enquanto o código é desenvolvido. Em interfaces e produtos de dados, tipos explícitos para respostas, estados e componentes tornam mudanças mais seguras e facilitam a manutenção conforme a aplicação cresce.',
    en: 'TypeScript adds static types to JavaScript and helps catch mismatches during development. In data products and user interfaces, explicit types for responses, state, and components make changes safer and help keep an application maintainable as it grows.',
  },
  numpy: {
    pt: 'NumPy fornece arrays multidimensionais e operações vetorizadas para cálculos numéricos em Python. Em vez de percorrer cada valor com loops de alto nível, muitas operações são executadas sobre blocos inteiros de dados, oferecendo uma base eficiente para álgebra linear, simulações e bibliotecas científicas.',
    en: 'NumPy provides multidimensional arrays and vectorized numerical operations for Python. Rather than processing every value in high-level loops, many calculations operate on whole data blocks, providing an efficient foundation for linear algebra, simulations, and scientific libraries.',
  },
  pandas: {
    pt: 'Pandas organiza dados tabulares em estruturas que facilitam filtrar, agrupar, combinar e transformar registros. Também oferece recursos para datas e séries temporais, sendo útil para preparar bases de modelagem e conferir a qualidade dos dados antes de avançar para análises ou treinamento de modelos.',
    en: 'Pandas organizes tabular data into structures that make it easier to filter, group, join, and transform records. Its date and time-series features are useful for preparing modeling datasets and checking data quality before analysis or model training.',
  },
  scipy: {
    pt: 'SciPy amplia o ecossistema científico do Python com algoritmos para otimização, estatística, álgebra linear e processamento de sinais. Ela é útil quando uma análise exige métodos numéricos especializados, como ajustar parâmetros, avaliar distribuições ou resolver problemas matemáticos que vão além das operações tabulares usuais.',
    en: 'SciPy extends Python’s scientific ecosystem with algorithms for optimization, statistics, linear algebra, and signal processing. It is useful when an analysis needs specialized numerical methods, such as fitting parameters, working with probability distributions, or solving mathematical problems beyond routine tabular operations.',
  },
  pyspark: {
    pt: 'PySpark é a interface Python para o Apache Spark, mecanismo distribuído que divide o processamento de dados entre vários recursos computacionais. Essa abordagem permite trabalhar com volumes que não cabem confortavelmente em uma única máquina, mantendo transformações expressas em uma API familiar a quem desenvolve em Python.',
    en: 'PySpark is the Python interface to Apache Spark, a distributed engine that spreads data processing across compute resources. This approach supports workloads too large for a single machine while allowing Python developers to express transformations through a familiar API.',
  },
  databricks: {
    pt: 'Databricks é uma plataforma de dados em nuvem construída em torno do conceito de lakehouse, reunindo armazenamento, processamento, engenharia de dados e machine learning. Ela oferece um espaço colaborativo para executar workloads distribuídos e organizar etapas de ingestão, transformação e análise sobre dados compartilhados.',
    en: 'Databricks is a cloud data platform built around the lakehouse concept, bringing together storage, data engineering, processing, and machine learning. It provides a collaborative environment for distributed workloads and for organizing ingestion, transformation, and analysis over shared data.',
  },
  airflow: {
    pt: 'Apache Airflow modela workflows como grafos de tarefas com dependências, horários e regras de execução. Em vez de apenas agendar scripts isolados, permite acompanhar cada etapa, identificar falhas e repetir tarefas com controle, o que é importante para pipelines de dados e rotinas de treinamento que precisam rodar de forma consistente.',
    en: 'Apache Airflow models workflows as graphs of tasks with dependencies, schedules, and execution rules. Rather than merely scheduling isolated scripts, it helps monitor each step, identify failures, and retry work in a controlled way—useful for data pipelines and recurring model-training routines.',
  },
  'data-cleaning': {
    pt: 'Limpeza de dados é o processo de identificar e tratar valores ausentes, duplicatas, formatos inconsistentes e registros inválidos. As decisões precisam respeitar o significado do domínio: remover ou imputar valores sem critério pode distorcer padrões e produzir conclusões ou modelos menos confiáveis.',
    en: 'Data cleaning identifies and handles missing values, duplicates, inconsistent formats, and invalid records. Decisions should reflect the domain: removing or imputing values without a clear rationale can distort patterns and lead to less reliable analyses or models.',
  },
  eda: {
    pt: 'Análise exploratória de dados (EDA) combina resumos estatísticos e visualizações para entender distribuições, relações entre variáveis, valores atípicos e possíveis problemas de qualidade. Ela orienta perguntas e hipóteses para as próximas etapas, mas os padrões observados precisam ser confirmados com métodos adequados antes de serem tratados como evidência.',
    en: 'Exploratory data analysis (EDA) combines statistical summaries and visualizations to examine distributions, relationships, outliers, and potential data-quality issues. It helps shape questions and hypotheses for later work, but observed patterns need appropriate validation before being treated as evidence.',
  },
  'stat-inference': {
    pt: 'Inferência estatística usa dados de uma amostra para estimar características de uma população e quantificar a incerteza dessas estimativas. Intervalos de confiança e modelos probabilísticos ajudam a distinguir um sinal plausível da variação amostral, desde que as premissas do método e o desenho da coleta sejam considerados.',
    en: 'Statistical inference uses sample data to estimate population characteristics and quantify uncertainty. Confidence intervals and probabilistic models help distinguish a plausible signal from sampling variation, provided the method’s assumptions and the data-collection design are taken into account.',
  },
  'hyp-testing': {
    pt: 'Testes de hipóteses avaliam se os dados observados são compatíveis com uma hipótese nula, sob premissas estatísticas explícitas. O valor-p não mede a importância prática nem a probabilidade de uma hipótese ser verdadeira; tamanho de efeito, incerteza, desenho experimental e comparações múltiplas também precisam entrar na interpretação.',
    en: 'Hypothesis tests assess whether observed data are compatible with a null hypothesis under explicit statistical assumptions. A p-value is not a measure of practical importance or the probability that a hypothesis is true; effect size, uncertainty, experimental design, and multiple comparisons also matter.',
  },
  'etl-pipelines': {
    pt: 'Pipelines ETL e ELT automatizam a movimentação de dados entre sistemas e suas transformações até um formato pronto para análise. ETL transforma antes de carregar; ELT carrega primeiro e transforma no destino. Em ambos, monitoramento, validações e possibilidade de reprocessamento são essenciais para manter resultados consistentes.',
    en: 'ETL and ELT pipelines automate the movement of data between systems and its transformation into analysis-ready forms. ETL transforms before loading; ELT loads first and transforms at the destination. In both approaches, monitoring, validation, and the ability to reprocess data are essential for consistent results.',
  },
  'dim-modeling': {
    pt: 'Modelagem de dados define como entidades, eventos e métricas são organizados para responder a perguntas de negócio com consistência. Esquemas dimensionais separam fatos mensuráveis de dimensões descritivas, enquanto abordagens em camadas, como Medallion, organizam dados desde a ingestão até conjuntos curados para consumo.',
    en: 'Data modeling defines how entities, events, and metrics are organized so business questions can be answered consistently. Dimensional schemas separate measurable facts from descriptive dimensions, while layered approaches such as Medallion organize data from ingestion through curated, consumer-ready datasets.',
  },
  'feat-eng': {
    pt: 'Feature engineering transforma dados brutos em variáveis que representam melhor o problema que um modelo precisa resolver. Isso pode envolver agregar eventos, extrair sinais de datas, codificar categorias ou combinar fontes; cada transformação deve ser calculável no momento da previsão e evitar usar informação que ainda não estaria disponível.',
    en: 'Feature engineering turns raw data into variables that better represent the problem a model must solve. It can involve aggregating events, extracting date signals, encoding categories, or combining sources; each transformation must be available at prediction time and avoid using information that would not yet exist.',
  },
  'lags-rolling': {
    pt: 'Lags representam valores anteriores de uma série, enquanto janelas móveis resumem um intervalo recente com estatísticas como média ou soma. Em previsão, essas variáveis ajudam a capturar dependência temporal e tendências locais; devem ser calculadas apenas com observações anteriores ao instante previsto para evitar vazamento do futuro.',
    en: 'Lags represent earlier values in a series, while rolling windows summarize a recent interval with statistics such as a mean or sum. In forecasting, these features capture temporal dependence and local trends; they must use only observations preceding the forecast time to avoid leaking future information.',
  },
  seasonality: {
    pt: 'Sazonalidade descreve padrões que se repetem em intervalos conhecidos, como dias da semana, meses ou períodos comerciais. Variáveis de calendário e eventos ajudam o modelo a representar esses ciclos, enquanto a análise de feriados e choques externos permite separar efeitos recorrentes de mudanças excepcionais na série.',
    en: 'Seasonality describes patterns that recur at known intervals, such as weekdays, months, or commercial periods. Calendar and event features help a model represent these cycles, while examining holidays and external shocks helps distinguish recurring effects from exceptional changes in a series.',
  },
  'encoding-scaling': {
    pt: 'Encoding converte categorias em representações numéricas que os algoritmos conseguem processar; scaling ajusta a escala das variáveis numéricas. A escolha depende dos dados e do modelo: codificações inadequadas podem impor uma ordem inexistente, e escalas muito diferentes podem dominar métodos sensíveis a distâncias ou gradientes.',
    en: 'Encoding converts categories into numeric representations that algorithms can process, while scaling adjusts the range of numeric variables. The right choice depends on the data and model: poor encodings can imply a nonexistent order, and uneven scales can dominate distance- or gradient-sensitive methods.',
  },
  'pca-dim': {
    pt: 'Análise de Componentes Principais (PCA) projeta variáveis numéricas em novos eixos ortogonais que concentram parte da variância dos dados. É uma forma de reduzir dimensionalidade e redundância, mas os componentes podem ser menos interpretáveis; seleção de atributos, por sua vez, mantém um subconjunto das variáveis originais.',
    en: 'Principal Component Analysis (PCA) projects numeric variables onto new orthogonal axes that capture portions of the data’s variance. It can reduce dimensionality and redundancy, though components may be less interpretable; feature selection instead retains a subset of the original variables.',
  },
  'graph-topology': {
    pt: 'Topologia de grafos descreve quem está conectado a quem e quais padrões estruturais surgem dessas relações. Nós representam entidades e arestas representam interações; métricas como grau, caminhos e comunidades ajudam a investigar conectividade e posição. Em redes financeiras, essa visão complementa atributos individuais de cada conta ou transação.',
    en: 'Graph topology describes which entities are connected and what structural patterns emerge from those relationships. Nodes represent entities and edges represent interactions; measures such as degree, paths, and communities help examine connectivity and position. In financial networks, this view complements attributes of individual accounts or transactions.',
  },
  'scikit-learn': {
    pt: 'Scikit-learn oferece uma API consistente para preparar dados, ajustar modelos clássicos de machine learning e avaliar resultados em Python. Pipelines encadeiam transformações e estimadores para reduzir inconsistências entre treino e inferência, enquanto ferramentas de validação apoiam comparações sistemáticas entre abordagens.',
    en: 'Scikit-learn provides a consistent Python API for data preparation, classical machine-learning models, and evaluation. Pipelines chain transformations and estimators to reduce differences between training and inference, while validation tools support systematic comparisons between approaches.',
  },
  'reg-class': {
    pt: 'Regressão estima um valor numérico, enquanto classificação atribui observações a categorias ou estima probabilidades de pertencimento. Modelos lineares, árvores e máquinas de vetores de suporte representam famílias diferentes de métodos; a escolha deve considerar objetivo, dados, interpretabilidade e métricas apropriadas ao custo dos erros.',
    en: 'Regression estimates a numeric value, while classification assigns observations to categories or estimates class probabilities. Linear models, trees, and support vector machines represent different method families; selection should reflect the objective, data, interpretability needs, and metrics suited to the cost of errors.',
  },
  'ensemble-ml': {
    pt: 'Ensemble learning combina previsões de múltiplos modelos para aproveitar suas complementaridades e, em alguns casos, reduzir variância ou erro. Bagging, boosting e stacking fazem essa combinação de formas distintas; o ganho precisa ser medido em validação adequada, pois modelos mais complexos também aumentam custo e dificuldade de manutenção.',
    en: 'Ensemble learning combines predictions from multiple models to use their complementary strengths and, in some cases, reduce variance or error. Bagging, boosting, and stacking combine models differently; any gain must be measured with appropriate validation because added complexity also increases cost and maintenance effort.',
  },
  'grad-boosting': {
    pt: 'Gradient boosting constrói uma sequência de modelos, frequentemente árvores, em que cada novo estimador corrige parte dos erros deixados pelos anteriores. É uma abordagem poderosa para dados tabulares, mas requer controle de profundidade, taxa de aprendizado e validação para limitar sobreajuste e estimar o desempenho fora da amostra.',
    en: 'Gradient boosting builds a sequence of models, often trees, where each new estimator corrects part of the errors left by earlier ones. It is effective for tabular data, but depth, learning rate, and validation need careful control to limit overfitting and estimate performance on unseen data.',
  },
  'ts-forecasting': {
    pt: 'Previsão de séries temporais estima valores futuros a partir de observações ordenadas no tempo e de fatores que influenciam sua evolução. Uma boa avaliação reproduz o uso real: treina com o passado e testa em períodos posteriores, considerando tendências, sazonalidade, calendários e a incerteza das previsões.',
    en: 'Time-series forecasting estimates future values from observations ordered over time and factors that influence their evolution. Sound evaluation mirrors real use: train on the past and test on later periods while accounting for trends, seasonality, calendars, and forecast uncertainty.',
  },
  clustering: {
    pt: 'Clusterização agrupa observações por semelhança sem depender de rótulos previamente definidos, ajudando a explorar segmentos ou estruturas nos dados. Detecção de anomalias procura casos que destoam de um padrão esperado; como “normal” depende do contexto e do algoritmo, os resultados precisam ser investigados antes de virar decisão operacional.',
    en: 'Clustering groups observations by similarity without relying on predefined labels, helping explore segments or structure in data. Anomaly detection looks for cases that differ from an expected pattern; because “normal” depends on context and method, results need investigation before driving operational decisions.',
  },
  'out-of-time-val': {
    pt: 'Validação out-of-time reserva um período posterior ao treino para testar se o modelo generaliza para dados futuros. Ao preservar a ordem temporal, ela evita que informação do futuro influencie o ajuste e revela degradação associada a mudanças de comportamento, sazonalidade ou condições de negócio.',
    en: 'Out-of-time validation holds out a period later than the training data to test whether a model generalizes to the future. Preserving temporal order prevents future information from influencing training and can reveal degradation caused by behavioral, seasonal, or business changes.',
  },
  'hyper-tuning': {
    pt: 'Hiperparâmetros são escolhas de configuração definidas antes do treinamento, como profundidade de uma árvore ou intensidade de regularização. Tuning compara combinações por meio de um processo de validação; a busca precisa respeitar as separações dos dados e manter um conjunto final intocado para estimar o desempenho sem viés de seleção.',
    en: 'Hyperparameters are configuration choices made before training, such as tree depth or regularization strength. Tuning compares combinations through a validation process; the search must respect data splits and leave a final holdout untouched to estimate performance without selection bias.',
  },
  pytorch: {
    pt: 'PyTorch é uma biblioteca para construir e treinar modelos de aprendizado profundo usando tensores e diferenciação automática. O autograd calcula gradientes das operações registradas, permitindo otimizar redes com backpropagation; controle explícito do ciclo de treinamento facilita experimentar arquiteturas e acompanhar o comportamento do modelo.',
    en: 'PyTorch is a library for building and training deep-learning models with tensors and automatic differentiation. Autograd computes gradients through recorded operations so networks can be optimized with backpropagation; explicit control of the training loop makes it easier to experiment with architectures and monitor model behavior.',
  },
  'deep-learning': {
    pt: 'Deep learning utiliza redes neurais com múltiplas camadas para aprender representações progressivamente mais complexas a partir de dados. Pode ser útil em imagens, texto e outros sinais de alta dimensão, mas costuma exigir mais dados e computação que métodos clássicos, além de validação cuidadosa para evitar sobreajuste.',
    en: 'Deep learning uses multi-layer neural networks to learn progressively more complex representations from data. It can be useful for images, text, and other high-dimensional signals, but often requires more data and compute than classical methods and careful validation to prevent overfitting.',
  },
  pyg: {
    pt: 'PyTorch Geometric (PyG) estende o ecossistema PyTorch com estruturas e operações para redes neurais em grafos. Ela facilita representar nós, arestas e atributos e aplicar camadas de message passing, cuidando de detalhes de batching e computação esparsa que tornam grafos diferentes de tensores convencionais.',
    en: 'PyTorch Geometric (PyG) extends the PyTorch ecosystem with data structures and operations for graph neural networks. It helps represent nodes, edges, and features and apply message-passing layers, while handling batching and sparse computation details that distinguish graphs from conventional tensors.',
  },
  gnn: {
    pt: 'Redes neurais em grafos (GNNs) aprendem representações de entidades combinando seus atributos com informações recebidas de vizinhos conectados. Essa troca de mensagens permite considerar contexto relacional em tarefas como classificação de nós ou detecção de padrões em transações, mas exige atenção a vizinhanças, desequilíbrio de classes e vazamento entre treino e teste.',
    en: 'Graph neural networks (GNNs) learn entity representations by combining their features with information from connected neighbors. This message passing incorporates relational context for tasks such as node classification or transaction-pattern detection, while requiring care with neighborhoods, class imbalance, and leakage between training and test data.',
  },
  aws: {
    pt: 'Amazon Web Services (AWS) reúne serviços de computação, armazenamento e análise oferecidos sob demanda na nuvem. Serviços como o S3 armazenam objetos de forma escalável, enquanto recursos gerenciados podem apoiar workloads de dados e IA; arquitetura, permissões, custos e observabilidade precisam ser planejados para cada aplicação.',
    en: 'Amazon Web Services (AWS) provides on-demand cloud services for computing, storage, and analytics. Services such as S3 offer scalable object storage, while managed resources can support data and AI workloads; architecture, permissions, cost, and observability should be planned for each application.',
  },
  'azure-gcp': {
    pt: 'Azure e Google Cloud Platform oferecem serviços de nuvem para armazenamento, processamento, bancos de dados e workloads de IA. O desenho de uma solução depende dos requisitos de segurança, integração, escala e custo; conhecer os serviços de cada plataforma ajuda a escolher componentes sem tratar a nuvem como uma camada automática de solução.',
    en: 'Azure and Google Cloud Platform provide cloud services for storage, processing, databases, and AI workloads. Solution design depends on security, integration, scale, and cost requirements; understanding each platform helps select components without treating cloud as an automatic solution by itself.',
  },
  docker: {
    pt: 'Docker empacota uma aplicação e suas dependências em uma imagem que pode ser executada em ambientes compatíveis. Isso reduz diferenças entre desenvolvimento e implantação e torna workloads mais portáveis; imagens menores, versões controladas e configuração externa ajudam a manter builds reproduzíveis e mais seguros.',
    en: 'Docker packages an application and its dependencies into an image that can run in compatible environments. This reduces differences between development and deployment and makes workloads more portable; smaller images, pinned versions, and external configuration help keep builds reproducible and safer.',
  },
  kubernetes: {
    pt: 'Kubernetes coordena a execução de containers em um cluster, declarando como serviços devem ser implantados, conectados e recuperados quando falham. É útil para operar aplicações distribuídas em escala, mas traz complexidade operacional; recursos, saúde, segurança e necessidades reais de disponibilidade devem justificar sua adoção.',
    en: 'Kubernetes coordinates containers across a cluster by declaring how services should be deployed, connected, and recovered when they fail. It can operate distributed applications at scale, but adds operational complexity; resource, health, security, and availability needs should justify its use.',
  },
  'aml-scoring': {
    pt: 'Detecção de fraude e lavagem de dinheiro busca priorizar transações, contas ou redes que merecem investigação, combinando sinais comportamentais e relacionais. Um score estima risco para apoiar a triagem, não comprova irregularidade; limiares, explicabilidade, falsos positivos, revisão humana e requisitos regulatórios são parte central da solução.',
    en: 'Fraud and anti-money-laundering detection prioritizes transactions, accounts, or networks for investigation by combining behavioral and relational signals. A score estimates risk to support triage; it does not prove wrongdoing. Thresholds, explainability, false positives, human review, and regulatory requirements are central to the solution.',
  },
  'power-bi': {
    pt: 'Power BI conecta fontes de dados, organiza modelos semânticos e apresenta métricas em relatórios e dashboards interativos. Uma solução útil vai além do visual: definições consistentes de indicadores, medidas DAX bem estruturadas e contexto para interpretar mudanças apoiam decisões sem esconder limitações ou incertezas dos dados.',
    en: 'Power BI connects data sources, organizes semantic models, and presents metrics through interactive reports and dashboards. A useful solution goes beyond visuals: consistent metric definitions, well-structured DAX measures, and context for interpreting changes support decisions without hiding data limitations or uncertainty.',
  },
  tableau: {
    pt: 'Tableau transforma dados em visualizações interativas que ajudam a comparar medidas, explorar recortes e comunicar padrões. A escolha de gráficos, escalas e contexto influencia a leitura; um bom painel torna as perguntas importantes fáceis de investigar sem sugerir conclusões que os dados não sustentam.',
    en: 'Tableau turns data into interactive visualizations for comparing measures, exploring subsets, and communicating patterns. Chart choice, scales, and context shape interpretation; a good dashboard makes important questions easy to investigate without implying conclusions unsupported by the data.',
  },
  'react-apps': {
    pt: 'Aplicações de dados em React transformam resultados analíticos em experiências interativas acessíveis por navegador. Componentes reutilizáveis conectam filtros, visualizações e fluxos de trabalho a serviços e APIs; uma aplicação robusta também considera estados de carregamento e erro, acessibilidade e atualização responsável dos dados.',
    en: 'React data applications turn analytical results into interactive experiences available in a browser. Reusable components connect filters, visualizations, and workflows to services and APIs; a robust application also handles loading and error states, accessibility, and responsible data updates.',
  },
};

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

const SkillsGraphCanvas: React.FC<SkillsGraphCanvasProps> = ({
  language,
  isSectionActive = true,
  externalFocusSkill = null,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [rootNodeIdx, setRootNodeIdx] = useState<number>(0);
  const [selectedNodeIdx, setSelectedNodeIdx] = useState<number>(0);
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

    // Fixed slow cascade velocity in progress-per-second (1.0 = full edge length).
    // Independent of monitor refresh rate (60Hz, 144Hz, 240Hz) or CPU/GPU speed.
    const BASE_CASCADE_SPEED_PER_SEC = 0.80;
    const CASCADE_SPEED_VARIANCE_PER_SEC = 0.04;
    const MAX_CASCADE_SPEED_PER_SEC = 0.85;

    const edgeStates: EdgeCascadeState[] = Array.from({ length: edgeCount }, () => ({
      status: 'inactive',
      direction: 'forward',
      progress: 0,
      speed: BASE_CASCADE_SPEED_PER_SEC,
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
          edgeStates[eIdx].speed = Math.min(
            MAX_CASCADE_SPEED_PER_SEC,
            BASE_CASCADE_SPEED_PER_SEC + (eIdx % 4) * CASCADE_SPEED_VARIANCE_PER_SEC
          );
        }
      }
    };

    const spawnIncomingTo = (vIdx: number) => {
      for (let eIdx = 0; eIdx < edgeCount; eIdx++) {
        if (SKILL_EDGES[eIdx][1] === vIdx && edgeStates[eIdx].status === 'inactive') {
          edgeStates[eIdx].status = 'traveling';
          edgeStates[eIdx].direction = 'backward';
          edgeStates[eIdx].progress = 0;
          edgeStates[eIdx].speed = Math.min(
            MAX_CASCADE_SPEED_PER_SEC,
            BASE_CASCADE_SPEED_PER_SEC + (eIdx % 4) * CASCADE_SPEED_VARIANCE_PER_SEC
          );
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
      if (container.clientWidth === 0) {
        width = 0;
        return;
      }
      width = container.clientWidth;
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

    let lastFrameTime = 0;

    const render = (now: number) => {
      if (!isVisible || document.hidden || !ctx || width === 0) {
        isRunning = false;
        lastFrameTime = 0;
        return;
      }

      const rawDtSec = lastFrameTime > 0 ? (now - lastFrameTime) / 1000 : 1 / 60;
      lastFrameTime = now;
      // Clamp elapsed time so high-refresh monitors (120/144/240Hz) and fast GPUs
      // advance at the exact same slow real-time rate, and frame spikes never jump ahead
      const dtSec = Math.min(0.033, Math.max(0.001, rawDtSec));
      const dt60 = dtSec * 60;

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

      const springK = 0.11 * dt60;
      const damping = Math.pow(0.8, dt60);
      const actLerp = 1 - Math.pow(1 - 0.1, dt60);
      const flashDecay = Math.pow(0.92, dt60);

      for (let i = 0; i < nodeCount; i++) {
        const floatX = prefersReducedMotion ? 0 : Math.sin(now * 0.001 + i * 1.3) * 1.8;
        const floatY = prefersReducedMotion ? 0 : Math.cos(now * 0.0012 + i * 1.7) * 1.8;

        const targetX = hx[i] + floatX;
        const targetY = hy[i] + floatY;

        let dvx = (vx[i] + (targetX - px[i]) * springK) * damping;
        let dvy = (vy[i] + (targetY - py[i]) * springK) * damping;

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
                const pull = (1 - d / 70) * 0.24 * dt60;
                dvx += (dx / d) * pull;
                dvy += (dy / d) * pull;
              }
            }
          }
        }

        vx[i] = dvx;
        vy[i] = dvy;
        px[i] += dvx * dt60;
        py[i] += dvy * dt60;

        const targetAct = nodeLit[i] ? 1 : 0;
        nodeActivation[i] += (targetAct - nodeActivation[i]) * actLerp;
        nodeFlash[i] *= flashDecay;
      }

      if (
        !isPinnedRef.current &&
        isPointerActive &&
        hoveredCandidate !== null &&
        hoveredCandidate !== rootNodeRef.current
      ) {
        startCascade(hoveredCandidate);
      }

      // 3. Step Progressive Cascade along Edges (time-based with hard speed ceiling)
      const maxStepThisFrame = MAX_CASCADE_SPEED_PER_SEC * dtSec;
      for (let eIdx = 0; eIdx < edgeCount; eIdx++) {
        const st = edgeStates[eIdx];
        if (st.status !== 'traveling') continue;

        st.progress += Math.min(st.speed * dtSec, maxStepThisFrame);
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
        lastFrameTime = 0;
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

  useEffect(() => {
    if (isSectionActive) {
      startCascadeRef.current(rootNodeRef.current);
    }
  }, [isSectionActive]);

  useEffect(() => {
    if (!externalFocusSkill) return;
    const idx = SKILL_NODES.findIndex((n) => n.id === externalFocusSkill.nodeId);
    if (idx !== -1) {
      setSelectedNodeIdx(idx);
      isPinnedRef.current = true;
      setIsPinned(true);
      startCascadeRef.current(idx);
    }
  }, [externalFocusSkill]);

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

  const handleGraphKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const direction =
      e.key === 'ArrowRight' || e.key === 'ArrowDown'
        ? 1
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
          ? -1
          : 0;

    if (direction === 0) return;

    e.preventDefault();
    const nextNodeIdx =
      (selectedNodeIdx + direction + SKILL_NODES.length) % SKILL_NODES.length;
    setSelectedNodeIdx(nextNodeIdx);
    isPinnedRef.current = true;
    setIsPinned(true);
    startCascadeRef.current(nextNodeIdx);
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
      setSelectedNodeIdx(clickedNode);
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

  const selectedNode = SKILL_NODES[selectedNodeIdx] || SKILL_NODES[0];
  const isComplete = progressStats.lit >= progressStats.total;

  return (
    <div className="relative rounded-2xl border border-white/10 bg-card/85 backdrop-blur-md p-4 md:p-6 shadow-xl">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3.5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
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

      <div className="grid grid-cols-1 gap-4 pt-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        {/* Interactive 7-Stage 44-Node Progressive Graph Canvas */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onKeyDown={handleGraphKeyDown}
          role="application"
          tabIndex={0}
          aria-label={
            language === 'pt'
              ? 'Grafo progressivo de 44 skills. Use as setas para selecionar um nó.'
              : 'Progressive 44-skill graph. Use the arrow keys to select a node.'
          }
          className="relative w-full cursor-pointer select-none overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400/70"
          style={{ height: 500 }}
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none block h-full w-full"
          />
        </div>

        <aside
          aria-live="polite"
          aria-label={language === 'pt' ? 'Detalhes da skill selecionada' : 'Selected skill details'}
          className="flex max-h-[500px] min-h-[260px] flex-col overflow-y-auto rounded-xl border border-white/10 bg-background/55 p-5"
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: STAGE_COLORS[selectedNode.stage] }}
            />
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground/55">
                {language === 'pt' ? 'Skill selecionada' : 'Selected skill'}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold leading-snug text-foreground">
                {selectedNode.label[language]}
              </h3>
            </div>
          </div>
          <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-foreground/75">
            {SKILL_DESCRIPTIONS[selectedNode.id][language]}
          </p>
        </aside>
      </div>
    </div>
  );
};

export default SkillsGraphCanvas;
