export type Language = 'pt' | 'en';

export const languages: Record<Language, string> = {
  pt: 'PT',
  en: 'EN',
};

export const siteContent = {
  pt: {
    brand: 'Bevilaqua Data Labs',
    founder: 'Edmar Junyor Bevilaqua',
    founderRole: 'Cientista de Dados Sênior, Engenheiro de ML e Dados',
    nav: {
      home: 'Início',
      about: 'Sobre',
      services: 'Stack & Serviços',
      solutions: 'Labs & Projetos',
      github: 'GitHub',
      contact: 'Contato',
      privacy: 'Privacidade',
      support: 'Suporte',
    },
    hero: {
      title: 'Bevilaqua Data Labs',
      roleHighlight: 'Modelagem preditiva, séries temporais e redes em grafos.',
      subtitle:
        'Trabalho com modelos preditivos e IA aplicada a diversos domínios, como silvicultura, finanças, saúde e operações.',
      description:
        'Desenvolvo modelos de Machine Learning e pipelines de dados em Python e SQL, da preparação dos dados à avaliação.',
      primaryCta: 'Ver projetos',
      secondaryCta: 'Entrar em contato',
      graph: {
        headerTitle: 'Matriz Interativa da Bevilaqua Data Labs',
        epochsLabel: 'contribuições no último ano',
        less: 'Menos',
        more: 'Mais',
        hint: 'Toque ou mova o cursor sobre a matriz para interagir. Toque ou clique para criar uma onda.',
        scrollHint: 'role para explorar ↓',
      },
      stats: {
        domainsValue: 5,
        domainsSuffix: '+',
        domainsLabel: 'frentes de engenharia (DS, ML, DE, BI & IA)',
        reposLabel: 'repositórios públicos no GitHub',
        commitsLabel: 'contribuições no último ano',
      },
    },
    about: {
      kicker: '01. Sobre e filosofia de engenharia',
      title: 'Sobre Edmar',
      founderCard: {
        label: 'Perfil',
        name: 'Edmar Junyor Bevilaqua',
        role: 'Cientista de Dados Sênior, Engenheiro de ML',
        bio: 'Trabalho com modelagem preditiva, séries temporais, grafos e engenharia de dados.',
        badges: ['Ciência de Dados', 'Machine Learning', 'Engenharia de Dados', 'GNNs & Time Series', 'Analytics & BI'],
      },
      paragraphs: [
        'Sou Edmar Bevilaqua. Criei a Bevilaqua Data Labs para reunir meus projetos e estudos em Ciência de Dados, Engenharia de Dados e Machine Learning.',
        'Neste portfólio, apresento trabalhos com redes transacionais, previsão de demanda e análise de dados.',
      ],
      principles: [
        {
          code: 'P-01',
          title: 'Definir o problema antes do modelo',
          description:
            'Especifico o que precisa ser previsto ou classificado e como o resultado será avaliado antes de escolher uma técnica.',
        },
        {
          code: 'P-02',
          title: 'Respeitar a ordem do tempo',
          description:
            'Em séries temporais, separo treino e avaliação por período para medir o desempenho em datas futuras.',
        },
        {
          code: 'P-03',
          title: 'Deixar as etapas claras',
          description:
            'Organizo preparação dos dados, modelagem e avaliação em etapas que possam ser revisadas.',
        },
      ],
    },
    services: {
      kicker: '02. Stack e capacidades técnicas',
      title: 'Ecossistema Técnico & Frentes de Atuação',
      intro:
        'Estruturamos nossa stack em camadas complementares do ciclo de vida de dados e IA — da ingestão e orquestração até a modelagem avançada e entrega em produção.',
      technologiesTitle: 'Arquitetura de Tecnologias por Camada',
      technologiesIntro:
        'Selecionamos ferramentas conforme a complexidade estatística, o volume de dados e a maturidade operacional de cada ambiente.',
      stackLayers: [
        {
          layer: 'Camada 01: Modelagem e IA',
          title: 'Data Science, ML & Deep Learning',
          description:
            'Modelagem supervisionada, não-supervisionada, séries temporais e redes neurais em grafos com validação estatística rigorosa.',
          chips: [
            'Python',
            'Scikit-Learn',
            'PyTorch Geometric',
            'Graph Neural Networks',
            'Ensemble Learning',
            'Time Series Forecasting',
            'Pandas',
            'NumPy',
            'SciPy / Stats',
          ],
        },
        {
          layer: 'Camada 02: Pipelines e Plataforma',
          title: 'Engenharia de Dados & Orquestração',
          description:
            'Ingestão, saneamento, modelagem dimensional, feature stores e automação de fluxos analíticos escaláveis.',
          chips: [
            'SQL Avançado',
            'Apache Airflow',
            'Databricks',
            'Spark / PySpark',
            'ETL / ELT Pipelines',
            'Data Quality',
            'Modelagem de Dados',
          ],
        },
        {
          layer: 'Camada 03: Cloud e MLOps',
          title: 'Infraestrutura Cloud & Reprodutibilidade',
          description:
            'Ambientes conteinerizados, versionamento de código/dados e deploy sustentável nas principais nuvens públicas.',
          chips: [
            'AWS',
            'Azure',
            'Google Cloud (GCP)',
            'Docker',
            'Kubernetes',
            'Git & GitHub Actions',
            'Linux / CLI',
          ],
        },
        {
          layer: 'Camada 04: Decisão e Produtos',
          title: 'Analytics, BI & Data Products',
          description:
            'Tradução de modelos e indicadores complexos em painéis executivos e aplicações web interativas.',
          chips: [
            'Power BI',
            'Tableau',
            'JupyterLab',
            'Visualização Estatística',
            'TypeScript / React',
            'KPI Design',
            'Data Storytelling',
          ],
        },
      ],
      items: [
        {
          title: 'Ciência de Dados e Machine Learning',
          description:
            'Modelos preditivos, análise exploratória profunda, testes de hipóteses, sistemas de recomendação/classificação e validação experimental.',
        },
        {
          title: 'Engenharia de Dados',
          description:
            'Pipelines automatizados, estruturação de data lakes/warehouses e preparação de bases analíticas confiáveis para BI e modelos de IA.',
        },
        {
          title: 'Business Intelligence e Analytics',
          description:
            'Definição de métricas norteadoras (KPIs), dashboards executivos e diagnósticos analíticos para tomada de decisão estratégica.',
        },
        {
          title: 'IA Aplicada, Grafos e Automação',
          description:
            'Redes neurais em grafos (GNNs), modelos especialistas e automações inteligentes para detectar fraudes, anomalias e otimizar operações.',
        },
        {
          title: 'Produtos Orientados por Dados',
          description:
            'Aplicações digitais completas onde engenharia de software, APIs e modelos analíticos operam integrados.',
        },
      ],
    },
    solutions: {
      kicker: '03. Labs, cases técnicos e arquiteturas',
      title: 'Labs & Estudos de Engenharia Aplicada',
      intro:
        'Explore a arquitetura interna de cada projeto: selecione um estudo abaixo para inspecionar o pipeline de transformação de dados, especificações de modelagem e decisões técnicas.',
      repositoryLabel: 'Ver Repositório no GitHub',
      pipelineLabel: 'Arquitetura do Pipeline de Dados & ML',
      highlightsLabel: 'Decisões de Engenharia & Destaques Técnicos',
      metricsLabel: 'Especificações Técnicas',
      updatedPrefix: 'atualizado em',
      items: [
        {
          id: 'aml-gnn',
          repoName: 'anti-money-laundering-project',
          domain: 'Deep Learning, Graph Neural Networks e risco financeiro',
          title: 'Detecção de Padrões em Redes Transacionais (Anti-Money Laundering)',
          description:
            'Aplicação de Redes Neurais em Grafos (GNNs) com PyTorch Geometric para identificar esquemas complexos de lavagem de dinheiro em transações financeiras sintéticas, capturando relações topológicas entre contas e fluxos.',
          pipeline: [
            'Transações Brutas',
            'Grafo Direcionado (Nós & Arestas)',
            'Message Passing (PyTorch Geometric)',
            'Embeddings Relacionais',
            'Classificação de Risco AML',
          ],
          metrics: [
            { label: 'Paradigma Core', value: 'Graph Deep Learning (GNN)' },
            { label: 'Framework', value: 'PyTorch Geometric' },
            { label: 'Foco Analítico', value: 'Topologia Multi-Hop & Fraude' },
          ],
          highlights: [
            'Modelagem de entidades bancárias e transferências como grafos heterogêneos/direcionados, superando limitações de modelos tabulares isolados.',
            'Extração de padrões estruturais de vizinhança (ciclos, fan-in/fan-out) combinados a atributos temporais das transações.',
            'Tratamento técnico para severo desbalanceamento de classes típico de cenários reais de prevenção à lavagem de dinheiro (PLD/AML).',
          ],
          tags: ['Python', 'Deep Learning', 'Graph Neural Networks', 'PyTorch Geometric', 'Fraude / AML'],
          githubLink: 'https://github.com/edmar-bevilaqua/anti-money-laundering-project',
        },
        {
          id: 'demand-forecast',
          repoName: 'store-sales-tsf-kaggle-competition',
          domain: 'Séries temporais, Ensemble Learning e varejo',
          title: 'Previsão de Demanda Multi-Loja e Séries Temporais',
          description:
            'Sistema preditivo baseado em Ensemble Learning para previsão de vendas no varejo, integrando variáveis exógenas (feriados, preço do petróleo, promoções), engenharia de atributos temporais e validação rigorosa.',
          pipeline: [
            'Séries Históricas + Exógenas',
            'Decomposição & Sazonalidade',
            'Feature Engineering (Lags / Rolling)',
            'Validação Out-of-Time',
            'Ensemble Forecasting',
          ],
          metrics: [
            { label: 'Arquitetura', value: 'Multi-Model Ensemble' },
            { label: 'Validação', value: 'Time-Based Split (Zero Leakage)' },
            { label: 'Aplicação', value: 'Planejamento de Demanda & Estoque' },
          ],
          highlights: [
            'Construção de features temporais avançadas: médias móveis exponenciais, janelas deslizantes, codificação cíclica de calendário e choques promocionais.',
            'Esquema de validação respeitando a causalidade temporal para garantir generalização real em janelas futuras de previsão.',
            'Combinação ponderada de estimadores e ajuste fino de hiperparâmetros com avaliação comparativa em benchmark competitivo público.',
          ],
          tags: ['Séries Temporais', 'Ensemble Learning', 'Validação Temporal', 'Forecasting', 'Scikit-Learn'],
          githubLink: 'https://github.com/edmar-bevilaqua/store-sales-tsf-kaggle-competition',
        },
        {
          id: 'ds-lab',
          repoName: 'data_science',
          domain: 'Ciência de Dados, Machine Learning e experimentação',
          title: 'Laboratório de Ciência de Dados & Modelagem Preditiva',
          description:
            'Acervo estruturado de estudos técnicos cobrindo limpeza estatística, análise exploratória (EDA), engenharia de atributos, algoritmos clássicos de aprendizado de máquina, deep learning e visualização avançada.',
          pipeline: [
            'Datasets Brutos',
            'Saneamento & Imputação',
            'Análise Exploratória (EDA)',
            'Pipelines Scikit-Learn',
            'Avaliação & Interpretabilidade',
          ],
          metrics: [
            { label: 'Cobertura', value: 'EDA, ML Clássico e Deep Learning' },
            { label: 'Padronização', value: 'Notebooks Reprodutíveis' },
            { label: 'Objetivo', value: 'Benchmarks & Boas Práticas' },
          ],
          highlights: [
            'Implementação modular de pré-processamento: tratamento de outliers, transformações de distribuição, encoding categórico e seleção de variáveis.',
            'Experimentos comparativos em classificação, regressão e clusterização com análise detalhada de curvas de aprendizado e resíduos.',
            'Visualizações orientadas a storytelling técnico para traduzir achados estatísticos em recomendações claras.',
          ],
          tags: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Visualização'],
          githubLink: 'https://github.com/edmar-bevilaqua/data_science',
        },
      ],
    },
    github: {
      kicker: '04. Atividade no GitHub e código aberto',
      title: 'Telemetria & Repositórios no GitHub',
      subtitle:
        'Acompanhamento em tempo real dos repositórios públicos, estudos de código aberto e consistência de contribuições em github.com/edmar-bevilaqua.',
      statusLive: 'Sincronizado com a API do GitHub',
      statusFallback: 'API do GitHub indisponível',
      statusLoading: 'sincronizando com o GitHub…',
      contributionsUnavailable: 'Dados de contribuições indisponíveis.',
      totalLabel: 'contribuições no último ano',
      activeDaysLabel: 'dias ativos',
      currentStreakLabel: 'sequência atual (dias)',
      longestStreakLabel: 'maior sequência',
      bestDayLabel: 'melhor dia',
      heatmapLabel: 'Mapa de consistência técnica nos últimos 12 meses',
      todayLabel: 'hoje ▢',
      recentReposLabel: 'repositórios atualizados recentemente',
      viewAllLabel: 'Ver todos os repositórios no GitHub ↗',
      contributionSingular: 'contribuição',
      contributionPlural: 'contribuições',
    },
    contact: {
      kicker: '05. Contato e novos projetos',
      title: 'Contato',
      intro:
        'Para falar sobre projetos de Ciência de Dados, Engenharia de Dados ou oportunidades profissionais, escreva para mim por email, LinkedIn ou pelo formulário.',
      emailLabel: 'Email Direto',
      availability: 'Use o formulário para enviar uma mensagem diretamente para meu email.',
      directChannelsLabel: 'Canais Diretos & Redes Técnicas',
      form: {
        name: 'Nome',
        namePlaceholder: 'Seu nome completo',
        email: 'Email',
        emailPlaceholder: 'seu@email.com',
        company: 'Empresa / Organização',
        companyPlaceholder: 'Nome da sua empresa ou time',
        message: 'Mensagem',
        messagePlaceholder: 'Conte sobre o desafio de dados, vaga técnica ou oportunidade de parceria...',
        submit: 'Enviar mensagem',
        requiredAlert: 'Por favor, preencha nome, email e mensagem antes de enviar.',
        successAlert: 'Mensagem enviada com sucesso.',
        errorAlert: 'Ocorreu um erro ao enviar a mensagem. Tente novamente.',
      },
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      signature: 'Arquitetado com React, TypeScript, Tailwind & Engenharia de Dados.',
    },
    privacy: {
      title: 'Política de Privacidade',
      updated: 'Última atualização: 02 de agosto de 2026',
      sections: [
        {
          title: 'Escopo',
          body: 'Esta política descreve como a Bevilaqua Data Labs trata informações fornecidas por visitantes deste site e por usuários de aplicações que apontem para esta política.',
        },
        {
          title: 'Informações fornecidas voluntariamente',
          body: 'Quando você usa o formulário de contato, podemos receber nome, email, empresa e mensagem. Esses dados são usados apenas para responder à solicitação enviada.',
        },
        {
          title: 'Aplicações publicadas',
          body: 'Quando uma aplicação publicada pela Bevilaqua Data Labs exigir práticas específicas de coleta ou processamento de dados, essas informações deverão ser descritas na própria aplicação, na página da loja ou em atualização desta política.',
        },
        {
          title: 'Compartilhamento',
          body: 'Não vendemos dados pessoais. Informações podem ser processadas por serviços necessários para operação do site, como envio de mensagens, hospedagem e ferramentas de infraestrutura.',
        },
        {
          title: 'Contato',
          body: 'Para dúvidas sobre privacidade, entre em contato pelo email edmar.bevi@gmail.com.',
        },
      ],
    },
    support: {
      title: 'Suporte',
      intro:
        'Use este canal para solicitar suporte relacionado a aplicações, projetos ou comunicações oficiais da Bevilaqua Data Labs.',
      sections: [
        {
          title: 'Canal de atendimento',
          body: 'Envie sua solicitação para edmar.bevi@gmail.com com uma descrição objetiva do problema, nome da aplicação ou projeto relacionado e informações de contato para retorno.',
        },
        {
          title: 'Informações úteis',
          body: 'Quando aplicável, inclua sistema operacional, versão da aplicação, passos para reproduzir o problema e capturas de tela que ajudem na análise.',
        },
      ],
    },
    notFound: {
      title: 'Página não encontrada',
      description: 'O endereço acessado não corresponde a uma página disponível.',
      link: 'Voltar para o início',
    },
  },
  en: {
    brand: 'Bevilaqua Data Labs',
    founder: 'Edmar Junyor Bevilaqua',
    founderRole: 'Senior Data Scientist, ML and Data Engineer',
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Stack & Services',
      solutions: 'Labs & Projects',
      github: 'GitHub',
      contact: 'Contact',
      privacy: 'Privacy',
      support: 'Support',
    },
    hero: {
      title: 'Bevilaqua Data Labs',
      roleHighlight: 'Predictive modeling, time series and graph learning.',
      subtitle:
        'I build predictive models for a variety of domains, including forestry, finance, healthcare, and operations.',
      description:
        'I develop machine learning models and data pipelines in Python and SQL, from data preparation through evaluation.',
      primaryCta: 'View projects',
      secondaryCta: 'Get in touch',
      graph: {
        headerTitle: 'Interactive Matrix for Bevilaqua Data Labs',
        epochsLabel: 'contributions in the last year',
        less: 'Less',
        more: 'More',
        hint: 'Touch or move the cursor over the matrix to interact. Tap or click to create a wave.',
        scrollHint: 'scroll to explore ↓',
      },
      stats: {
        domainsValue: 5,
        domainsSuffix: '+',
        domainsLabel: 'core engineering domains (DS, ML, DE, BI & AI)',
        reposLabel: 'public repositories on GitHub',
        commitsLabel: 'contributions in the last year',
      },
    },
    about: {
      kicker: '01. About and engineering philosophy',
      title: 'About Edmar',
      founderCard: {
        label: 'Profile',
        name: 'Edmar Junyor Bevilaqua',
        role: 'Senior Data Scientist, ML Engineer',
        bio: 'I work with predictive modeling, time series, graphs and data engineering.',
        badges: ['Data Science', 'Machine Learning', 'Data Engineering', 'GNNs & Time Series', 'Analytics & BI'],
      },
      paragraphs: [
        'I’m Edmar Bevilaqua. I created Bevilaqua Data Labs to bring together my projects and studies in data science, data engineering and machine learning.',
        'This portfolio includes work on transaction networks, demand forecasting and data analysis.',
      ],
      principles: [
        {
          code: 'P-01',
          title: 'Define the problem before the model',
          description:
            'I specify what needs to be predicted or classified and how the result will be evaluated before choosing a technique.',
        },
        {
          code: 'P-02',
          title: 'Respect the order of time',
          description:
            'For time-series projects, I split training and evaluation by time period to measure performance on future dates.',
        },
        {
          code: 'P-03',
          title: 'Make the steps clear',
          description:
            'I organize data preparation, modeling and evaluation into steps that can be reviewed.',
        },
      ],
    },
    services: {
      kicker: '02. Tech stack and capabilities',
      title: 'Technical Ecosystem & Core Capabilities',
      intro:
        'Our stack is organized across complementary layers of the Data & AI lifecycle — from ingestion and orchestration to advanced modeling and production delivery.',
      technologiesTitle: 'Technology Architecture by Layer',
      technologiesIntro:
        'We select tools based on statistical complexity, data volume and the operational maturity of each project.',
      stackLayers: [
        {
          layer: 'Layer 01: Modeling and AI',
          title: 'Data Science, ML & Deep Learning',
          description:
            'Supervised and unsupervised learning, time-series forecasting and graph neural networks backed by rigorous validation.',
          chips: [
            'Python',
            'Scikit-Learn',
            'PyTorch Geometric',
            'Graph Neural Networks',
            'Ensemble Learning',
            'Time Series Forecasting',
            'Pandas',
            'NumPy',
            'SciPy / Stats',
          ],
        },
        {
          layer: 'Layer 02: Pipelines and Platform',
          title: 'Data Engineering & Orchestration',
          description:
            'Ingestion, data cleansing, dimensional modeling, feature pipelines and scalable workflow automation.',
          chips: [
            'Advanced SQL',
            'Apache Airflow',
            'Databricks',
            'Spark / PySpark',
            'ETL / ELT Pipelines',
            'Data Quality',
            'Data Modeling',
          ],
        },
        {
          layer: 'Layer 03: Cloud and MLOps',
          title: 'Cloud Infrastructure & Reproducibility',
          description:
            'Containerized environments, code/data versioning and reliable deployment across major cloud providers.',
          chips: [
            'AWS',
            'Azure',
            'Google Cloud (GCP)',
            'Docker',
            'Kubernetes',
            'Git & GitHub Actions',
            'Linux / CLI',
          ],
        },
        {
          layer: 'Layer 04: Decision and Products',
          title: 'Analytics, BI & Data Products',
          description:
            'Translating complex models and metrics into executive dashboards and interactive web applications.',
          chips: [
            'Power BI',
            'Tableau',
            'JupyterLab',
            'Statistical Visualization',
            'TypeScript / React',
            'KPI Design',
            'Data Storytelling',
          ],
        },
      ],
      items: [
        {
          title: 'Data Science and Machine Learning',
          description:
            'Predictive models, deep exploratory analysis, hypothesis testing, classification/forecasting systems and experimental validation.',
        },
        {
          title: 'Data Engineering',
          description:
            'Automated pipelines, analytical datasets and reliable data foundations for BI, AI and digital products.',
        },
        {
          title: 'Business Intelligence and Analytics',
          description:
            'Executive KPIs, interactive dashboards, diagnostic analytics and management reporting to support strategic decisions.',
        },
        {
          title: 'Applied AI, Graphs and Automation',
          description:
            'Graph neural networks (GNNs), specialized models and intelligent automation to detect anomalies, fraud and optimize workflows.',
        },
        {
          title: 'Data-Driven Products',
          description:
            'End-to-end digital solutions where software engineering, APIs and analytical models work seamlessly together.',
        },
      ],
    },
    solutions: {
      kicker: '03. Labs, case studies, and architectures',
      title: 'Labs & Applied Engineering Studies',
      intro:
        'Explore the internal engineering of each project: select a study below to inspect the data transformation pipeline, modeling specifications and technical decisions.',
      repositoryLabel: 'View Repository on GitHub',
      pipelineLabel: 'Data & ML Pipeline Architecture',
      highlightsLabel: 'Engineering Decisions & Technical Highlights',
      metricsLabel: 'Technical Specifications',
      updatedPrefix: 'updated',
      items: [
        {
          id: 'aml-gnn',
          repoName: 'anti-money-laundering-project',
          domain: 'Deep Learning, Graph Neural Networks and financial risk',
          title: 'Pattern Detection in Transactional Networks (Anti-Money Laundering)',
          description:
            'Graph Neural Network (GNN) application built with PyTorch Geometric to detect suspicious money-laundering patterns in synthetic financial transactions by capturing topological relationships across accounts and flows.',
          pipeline: [
            'Raw Transactions',
            'Directed Graph (Nodes & Edges)',
            'Message Passing (PyTorch Geometric)',
            'Relational Embeddings',
            'AML Risk Scoring',
          ],
          metrics: [
            { label: 'Core Paradigm', value: 'Graph Deep Learning (GNN)' },
            { label: 'Framework', value: 'PyTorch Geometric' },
            { label: 'Analytical Focus', value: 'Multi-Hop Topology & Fraud' },
          ],
          highlights: [
            'Modeled bank accounts and transfers as directed relational graphs, overcoming the blindness of flat tabular models to multi-hop laundering rings.',
            'Extracted neighborhood structural patterns (cycles, fan-in/fan-out) combined with temporal transaction attributes.',
            'Addressed severe class imbalance inherent to real-world Anti-Money Laundering (AML) detection scenarios.',
          ],
          tags: ['Python', 'Deep Learning', 'Graph Neural Networks', 'PyTorch Geometric', 'Fraud / AML'],
          githubLink: 'https://github.com/edmar-bevilaqua/anti-money-laundering-project',
        },
        {
          id: 'demand-forecast',
          repoName: 'store-sales-tsf-kaggle-competition',
          domain: 'Time series, Ensemble Learning and retail',
          title: 'Multi-Store Demand Forecasting & Time Series',
          description:
            'Predictive system based on Ensemble Learning for retail sales demand, integrating exogenous signals (holidays, oil prices, promotions), temporal feature engineering and strict out-of-time validation.',
          pipeline: [
            'Historical + Exogenous Series',
            'Decomposition & Seasonality',
            'Feature Engineering (Lags / Rolling)',
            'Out-of-Time Validation',
            'Ensemble Forecasting',
          ],
          metrics: [
            { label: 'Architecture', value: 'Multi-Model Ensemble' },
            { label: 'Validation', value: 'Time-Based Split (Zero Leakage)' },
            { label: 'Application', value: 'Inventory & Demand Planning' },
          ],
          highlights: [
            'Engineered rich temporal features: exponential moving averages, rolling windows, cyclical calendar encodings and promotional shocks.',
            'Enforced strict temporal causality during cross-validation to guarantee realistic out-of-sample generalization.',
            'Combined multiple regressors with hyperparameter optimization and benchmarked performance in a public competition.',
          ],
          tags: ['Time Series', 'Ensemble Learning', 'Temporal Validation', 'Forecasting', 'Scikit-Learn'],
          githubLink: 'https://github.com/edmar-bevilaqua/store-sales-tsf-kaggle-competition',
        },
        {
          id: 'ds-lab',
          repoName: 'data_science',
          domain: 'Data Science, Machine Learning and experimentation',
          title: 'Data Science & Predictive Modeling Laboratory',
          description:
            'Curated repository of technical studies covering statistical data cleaning, exploratory data analysis (EDA), feature engineering, classical machine learning, deep learning and analytical visualization.',
          pipeline: [
            'Raw Datasets',
            'Statistical Cleansing & Imputation',
            'Exploratory Analysis (EDA)',
            'Scikit-Learn Pipelines',
            'Evaluation & Interpretability',
          ],
          metrics: [
            { label: 'Coverage', value: 'EDA, Classical ML and Deep Learning' },
            { label: 'Standard', value: 'Reproducible Notebooks' },
            { label: 'Goal', value: 'Benchmarks & Best Practices' },
          ],
          highlights: [
            'Modular preprocessing workflows: outlier handling, distribution transforms, categorical encoding and feature selection.',
            'Systematic experiments across classification, regression and clustering with learning curve and residual diagnostics.',
            'Storytelling-driven visualizations designed to translate statistical findings into clear recommendations.',
          ],
          tags: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Visualization'],
          githubLink: 'https://github.com/edmar-bevilaqua/data_science',
        },
      ],
    },
    github: {
      kicker: '04. GitHub activity and open source',
      title: 'GitHub Telemetry & Repositories',
      subtitle:
        'Live tracking of public repositories, open-source studies and contribution consistency on github.com/edmar-bevilaqua.',
      statusLive: 'Live data from GitHub API',
      statusFallback: 'GitHub API unavailable',
      statusLoading: 'syncing with GitHub…',
      contributionsUnavailable: 'Contribution data is unavailable.',
      totalLabel: 'contributions in the last year',
      activeDaysLabel: 'active days',
      currentStreakLabel: 'current streak (days)',
      longestStreakLabel: 'longest streak',
      bestDayLabel: 'peak day',
      heatmapLabel: 'Technical consistency map over the last 12 months',
      todayLabel: 'today ▢',
      recentReposLabel: 'recently updated repositories',
      viewAllLabel: 'See all repositories on GitHub ↗',
      contributionSingular: 'contribution',
      contributionPlural: 'contributions',
    },
    contact: {
      kicker: '05. Contact and collaboration',
      title: 'Contact',
      intro:
        'For data science, data engineering or career opportunities, reach me by email, LinkedIn or the form.',
      emailLabel: 'Direct Email',
      availability: 'Use the form to send a message directly to my email.',
      directChannelsLabel: 'Direct Channels & Technical Profiles',
      form: {
        name: 'Name',
        namePlaceholder: 'Your full name',
        email: 'Email',
        emailPlaceholder: 'you@email.com',
        company: 'Company / Organization',
        companyPlaceholder: 'Company or team name',
        message: 'Message',
        messagePlaceholder: 'Briefly describe your data challenge, role or partnership opportunity...',
        submit: 'Send message',
        requiredAlert: 'Please fill in name, email and message before sending.',
        successAlert: 'Message sent successfully.',
        errorAlert: 'An error occurred while sending the message. Please try again.',
      },
    },
    footer: {
      rights: 'All rights reserved.',
      signature: 'Engineered with React, TypeScript, Tailwind & Data Science.',
    },
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: August 2, 2026',
      sections: [
        {
          title: 'Scope',
          body: 'This policy describes how Bevilaqua Data Labs handles information provided by visitors to this website and by users of applications that link to this policy.',
        },
        {
          title: 'Information voluntarily provided',
          body: 'When you use the contact form, we may receive your name, email, company and message. This data is used only to respond to the request you submitted.',
        },
        {
          title: 'Published applications',
          body: 'When an application published by Bevilaqua Data Labs requires specific data collection or processing practices, those details should be described in the application, store listing or an update to this policy.',
        },
        {
          title: 'Sharing',
          body: 'We do not sell personal data. Information may be processed by services required to operate the website, such as message delivery, hosting and infrastructure tools.',
        },
        {
          title: 'Contact',
          body: 'For privacy questions, contact edmar.bevi@gmail.com.',
        },
      ],
    },
    support: {
      title: 'Support',
      intro:
        'Use this channel to request support related to applications, projects or official communications from Bevilaqua Data Labs.',
      sections: [
        {
          title: 'Support channel',
          body: 'Send your request to edmar.bevi@gmail.com with a clear description of the issue, the related application or project name, and contact information for follow-up.',
        },
        {
          title: 'Helpful information',
          body: 'When applicable, include operating system, application version, steps to reproduce the issue and screenshots that can support the analysis.',
        },
      ],
    },
    notFound: {
      title: 'Page not found',
      description: 'The address you accessed does not match an available page.',
      link: 'Return home',
    },
  },
};

export type SiteCopy = (typeof siteContent)[Language];
