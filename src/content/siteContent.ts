export type Language = 'pt' | 'en';

export const languages: Record<Language, string> = {
  pt: 'PT',
  en: 'EN',
};

export const siteContent = {
  pt: {
    brand: 'Bevilaqua Data Labs',
    nav: {
      home: 'Início',
      about: 'Sobre',
      services: 'Serviços',
      solutions: 'Labs',
      contact: 'Contato',
      privacy: 'Privacidade',
      support: 'Suporte',
    },
    hero: {
      headline: 'Transformamos dados em decisões, automações e produtos digitais confiáveis.',
      subtitle: 'Dados, IA e software aplicados ao negócio, para times de tecnologia e de operação.',
      primaryCta: 'Fale conosco',
      secondaryCta: 'Ver os labs',
    },
    about: {
      title: 'Sobre a empresa',
      paragraphs: [
        'A Bevilaqua Data Labs é uma empresa especializada em transformar dados em soluções práticas para negócios. Combinamos ciência de dados, machine learning, business intelligence e engenharia de dados para apoiar decisões, automações e produtos digitais.',
        'Nosso trabalho une rigor técnico, visão de produto e entendimento de negócio para entregar soluções compreensíveis, robustas e preparadas para evolução contínua.',
        'A empresa foi fundada por Edmar Junyor Bevilaqua, profissional com atuação em ciência de dados, machine learning, analytics e engenharia de dados.',
      ],
      principles: [
        {
          title: 'Dados aplicados ao negócio',
          description: 'Priorizamos problemas reais, métricas úteis e entregas conectadas à tomada de decisão.',
        },
        {
          title: 'Modelos e automações confiáveis',
          description: 'Construímos soluções analíticas com validação, rastreabilidade e clareza operacional.',
        },
        {
          title: 'Engenharia sustentável',
          description: 'Pensamos em manutenção, documentação e evolução desde as primeiras decisões técnicas.',
        },
      ],
    },
    services: {
      title: 'Serviços',
      intro:
        'Construímos pipelines de dados, modelos preditivos, análises avançadas e aplicações orientadas por dados, ajustando tecnologia e escopo ao contexto de cada projeto.',
      items: [
        {
          title: 'Engenharia de Dados',
          description:
            'Pipelines, automação de fluxos, preparação de bases analíticas e estruturação de dados para BI, IA e produtos digitais.',
        },
        {
          title: 'Ciência de Dados e Machine Learning',
          description:
            'Modelos preditivos, análise exploratória, experimentos, validação de hipóteses e soluções orientadas por dados.',
        },
        {
          title: 'Business Intelligence e Analytics',
          description:
            'Indicadores, dashboards, análises gerenciais e relatórios para apoiar decisões estratégicas e operacionais.',
        },
        {
          title: 'IA Aplicada e Automação',
          description:
            'Aplicação de modelos, integrações e automações para reduzir trabalho manual e habilitar novas capacidades digitais.',
        },
        {
          title: 'Produtos orientados por dados',
          description:
            'Soluções digitais em que dados, modelos e software trabalham juntos para resolver problemas específicos.',
        },
      ],
      technologiesTitle: 'Tecnologias e abordagem',
      technologiesIntro:
        'Selecionamos ferramentas conforme o problema, o contexto operacional e a necessidade de manutenção. A prioridade é construir soluções compreensíveis, robustas e adequadas ao estágio de maturidade de cada projeto.',
    },
    solutions: {
      title: 'Labs e soluções',
      intro:
        'Alguns estudos e implementações técnicas demonstram a aplicação prática de métodos de ciência de dados, machine learning e engenharia para problemas reais ou simulados, sem caracterizá-los como cases de clientes.',
      repositoryLabel: 'Repositório',
      labels: {
        problem: 'Problema',
        method: 'Método',
        relevance: 'Relevância',
      },
      repoList: {
        title: 'Todos os repositórios',
        intro: 'Lista gerada automaticamente a partir do meu perfil público no GitHub.',
        viewAll: 'Ver perfil no GitHub',
        error: 'Não foi possível carregar os repositórios agora.',
        empty: 'Nenhum outro repositório público no momento.',
      },
      items: [
        {
          title: 'Detecção de padrões em redes transacionais',
          problem: 'Identificar padrões suspeitos de lavagem de dinheiro em uma rede de transações financeiras sintéticas.',
          method: 'Redes neurais em grafos (Graph Neural Networks) com PyTorch Geometric, explorando relações entre entidades e eventos na rede transacional.',
          relevance: 'Mostra como deep learning em grafos pode apoiar detecção de fraude e compliance, sem expor dados reais de clientes.',
          tags: ['Deep Learning', 'Graph Neural Networks', 'PyTorch Geometric'],
          githubLink: 'https://github.com/edmar-bevilaqua/anti-money-laundering-project',
        },
        {
          title: 'Previsão de demanda e séries temporais',
          problem: 'Prever a demanda de vendas de múltiplas lojas e produtos a partir de dados históricos de uma competição pública no Kaggle.',
          method: 'Modelos de ensemble learning para séries temporais, com validação cruzada temporal, ajuste de hiperparâmetros e comparação sistemática de desempenho.',
          relevance: 'Demonstra um fluxo completo de forecasting, da preparação dos dados à avaliação comparativa de modelos.',
          tags: ['Séries Temporais', 'Ensemble Learning', 'Validação', 'Forecasting'],
          githubLink: 'https://github.com/edmar-bevilaqua/store-sales-tsf-kaggle-competition',
        },
        {
          title: 'Laboratório de Ciência de Dados',
          problem: 'Consolidar experimentos e técnicas de ciência de dados que sustentam outros projetos, em vez de um único caso aplicado.',
          method: 'Notebooks e scripts cobrindo limpeza, análise exploratória, visualização, aprendizado de máquina e deep learning aplicados a diferentes conjuntos de dados.',
          relevance: 'Serve como base de estudo e experimentação contínua, mostrando amplitude técnica além de casos isolados.',
          tags: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Visualização'],
          githubLink: 'https://github.com/edmar-bevilaqua/data_science',
        },
      ],
    },
    contact: {
      title: 'Contato',
      intro:
        'Entre em contato para conversar sobre projetos, parcerias ou soluções em dados e inteligência artificial.',
      emailLabel: 'Email',
      availability: 'Atendimento para projetos, parcerias e demandas institucionais.',
      form: {
        name: 'Nome',
        namePlaceholder: 'Seu nome',
        email: 'Email',
        emailPlaceholder: 'seu@email.com',
        company: 'Empresa',
        companyPlaceholder: 'Nome da empresa',
        message: 'Mensagem',
        messagePlaceholder: 'Conte brevemente sobre sua demanda',
        submit: 'Enviar mensagem',
        sending: 'Enviando...',
        nameRequired: 'Informe seu nome.',
        emailInvalid: 'Informe um email válido.',
        messageRequired: 'Escreva uma mensagem.',
        successMessage: 'Mensagem enviada com sucesso. Retornaremos em breve.',
        errorMessage: 'Não foi possível enviar a mensagem. Tente novamente ou escreva para edmar.bevi@gmail.com.',
      },
    },
    footer: {
      rights: 'Todos os direitos reservados.',
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
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      solutions: 'Labs',
      contact: 'Contact',
      privacy: 'Privacy',
      support: 'Support',
    },
    hero: {
      headline: 'Data, AI, and software turned into reliable business systems.',
      subtitle: 'Data, AI and software applied to the business, for technology and operations teams.',
      primaryCta: 'Talk to us',
      secondaryCta: 'See the labs',
    },
    about: {
      title: 'About the company',
      paragraphs: [
        'Bevilaqua Data Labs specializes in turning data into practical business solutions. We combine data science, machine learning, business intelligence and data engineering to support decisions, automation and digital products.',
        'Our work connects technical rigor, product thinking and business context to deliver solutions that are understandable, robust and ready to evolve.',
        'The company was founded by Edmar Junyor Bevilaqua, a professional with experience in data science, machine learning, analytics and data engineering.',
      ],
      principles: [
        {
          title: 'Data applied to business',
          description: 'We prioritize real problems, useful metrics and deliverables connected to decision-making.',
        },
        {
          title: 'Reliable models and automation',
          description: 'We build analytical solutions with validation, traceability and operational clarity.',
        },
        {
          title: 'Sustainable engineering',
          description: 'We consider maintenance, documentation and evolution from the first technical decisions.',
        },
      ],
    },
    services: {
      title: 'Services',
      intro:
        'We build data pipelines, predictive models, advanced analytics and data-driven applications, matching technology and scope to each project context.',
      items: [
        {
          title: 'Data Engineering',
          description:
            'Pipelines, workflow automation, analytical datasets and data foundations for BI, AI and digital products.',
        },
        {
          title: 'Data Science and Machine Learning',
          description:
            'Predictive models, exploratory analysis, experiments, hypothesis validation and data-driven solutions.',
        },
        {
          title: 'Business Intelligence and Analytics',
          description:
            'Indicators, dashboards, management analysis and reports that support strategic and operational decisions.',
        },
        {
          title: 'Applied AI and Automation',
          description:
            'Models, integrations and automation to reduce manual work and enable new digital capabilities.',
        },
        {
          title: 'Data-driven products',
          description:
            'Digital solutions where data, models and software work together to solve specific problems.',
        },
      ],
      technologiesTitle: 'Technologies and approach',
      technologiesIntro:
        'We select tools according to the problem, operational context and maintenance needs. The priority is to build understandable, robust solutions that match each project maturity level.',
    },
    solutions: {
      title: 'Labs and solutions',
      intro:
        'Selected studies and technical implementations demonstrate practical applications of data science, machine learning and engineering methods for real or simulated problems, without presenting them as client case studies.',
      repositoryLabel: 'Repository',
      labels: {
        problem: 'Problem',
        method: 'Method',
        relevance: 'Relevance',
      },
      repoList: {
        title: 'All repositories',
        intro: 'Automatically generated from my public GitHub profile.',
        viewAll: 'View GitHub profile',
        error: 'Could not load repositories right now.',
        empty: 'No other public repositories at the moment.',
      },
      items: [
        {
          title: 'Pattern detection in transactional networks',
          problem: 'Identify suspicious money-laundering patterns in a network of synthetic financial transactions.',
          method: 'Graph neural networks (PyTorch Geometric) exploring relationships between entities and events in the transactional network.',
          relevance: 'Shows how graph-based deep learning can support fraud detection and compliance work, without exposing real customer data.',
          tags: ['Deep Learning', 'Graph Neural Networks', 'PyTorch Geometric'],
          githubLink: 'https://github.com/edmar-bevilaqua/anti-money-laundering-project',
        },
        {
          title: 'Demand forecasting and time series',
          problem: 'Forecast sales demand across multiple stores and products using historical data from a public Kaggle competition.',
          method: 'Ensemble learning models for time series, with time-aware cross-validation, hyperparameter tuning and systematic performance comparison.',
          relevance: 'Demonstrates a complete forecasting workflow, from data preparation to comparative model evaluation.',
          tags: ['Time Series', 'Ensemble Learning', 'Validation', 'Forecasting'],
          githubLink: 'https://github.com/edmar-bevilaqua/store-sales-tsf-kaggle-competition',
        },
        {
          title: 'Data Science Lab',
          problem: 'Consolidate the data science experiments and techniques that support other projects, rather than a single applied case.',
          method: 'Notebooks and scripts covering data cleaning, exploratory analysis, visualization, machine learning and deep learning across different datasets.',
          relevance: 'Serves as a base for continuous study and experimentation, showing technical breadth beyond isolated projects.',
          tags: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Visualization'],
          githubLink: 'https://github.com/edmar-bevilaqua/data_science',
        },
      ],
    },
    contact: {
      title: 'Contact',
      intro:
        'Get in touch to discuss projects, partnerships or data and artificial intelligence solutions.',
      emailLabel: 'Email',
      availability: 'Available for projects, partnerships and institutional requests.',
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'you@email.com',
        company: 'Company',
        companyPlaceholder: 'Company name',
        message: 'Message',
        messagePlaceholder: 'Briefly describe your request',
        submit: 'Send message',
        sending: 'Sending...',
        nameRequired: 'Enter your name.',
        emailInvalid: 'Enter a valid email.',
        messageRequired: 'Write a message.',
        successMessage: 'Message sent successfully. We will get back to you soon.',
        errorMessage: 'We could not send your message. Please try again or email edmar.bevi@gmail.com.',
      },
    },
    footer: {
      rights: 'All rights reserved.',
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
