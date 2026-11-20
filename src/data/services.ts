export type ServiceCategory = 'celulares' | 'computadores' | 'documentos' | 'digitais';

export type AvailabilityStatus = 'disponivel' | 'sob_consulta' | 'indisponivel';

export type PriceType = 'fixed' | 'starting_at' | 'under_review';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  fullDescription: string;
  included: string[];
  importantInfo?: string;
  price: number; // Valor numérico base para ordenação
  priceType: PriceType; // 'fixed' = R$ XX | 'starting_at' = A partir de R$ XX | 'under_review' = Sob avaliação
  availability: AvailabilityStatus;
  featured: boolean;
  keywords: string[];
  estimatedTime: string;
  deviceRequired: boolean;
}

export interface CategoryInfo {
  id: ServiceCategory;
  name: string;
  shortDescription: string;
  iconName: string;
  colorAccent: string;
}

export const CATEGORIES: Record<ServiceCategory, CategoryInfo> = {
  celulares: {
    id: 'celulares',
    name: 'Celulares',
    shortDescription: 'Assistência de software, restauração de fábrica, backups e otimização para Android e iOS.',
    iconName: 'Smartphone',
    colorAccent: '#1769FF',
  },
  computadores: {
    id: 'computadores',
    name: 'Computadores',
    shortDescription: 'Formatação completa, limpeza de vírus, instalação de drivers, programas e otimização de velocidade.',
    iconName: 'Laptop',
    colorAccent: '#39BFFF',
  },
  documentos: {
    id: 'documentos',
    name: 'Documentos e Apresentações',
    shortDescription: 'Padronização ABNT/APA, design de slides profissionais, relatórios, planilhas e conversão de arquivos.',
    iconName: 'FileText',
    colorAccent: '#1769FF',
  },
  digitais: {
    id: 'digitais',
    name: 'Serviços Digitais',
    shortDescription: 'Recuperação de acessos, suporte técnico remoto, consultoria tecnológica e soluções sob medida.',
    iconName: 'Globe',
    colorAccent: '#39BFFF',
  },
};

export const WHATSAPP_NUMBER = '5538999125035';

/**
 * Catálogo inicial de serviços editável.
 * Quando a lista final for fornecida, basta atualizar os itens abaixo.
 */
export const INITIAL_SERVICES: ServiceItem[] = [
  // --- CELULARES ---
  {
    id: 'cel-restauracao-limpeza',
    name: 'Restauração e Limpeza de Sistema Mobile',
    category: 'celulares',
    description: 'Restauração segura, remoção de arquivos temporários, liberação de memória e otimização do aparelho.',
    fullDescription: 'Indicado para celulares lentos, travando ou com memória cheia. Realizamos um procedimento seguro de restauração de fábrica, limpeza profunda de cache residual e reorganização do sistema operacional para devolver a fluidez original.',
    included: [
      'Backup seguro de fotos, contatos e WhatsApp (opcional)',
      'Restauração limpa do sistema Android ou iOS',
      'Remoção de malwares e aplicativos invasivos',
      'Configuração inicial e testes de estabilidade',
    ],
    importantInfo: 'Recomendamos que o cliente informe se possui backup ativo em nuvem (Google Fotos ou iCloud). Não solicitamos nem armazenamos senhas pessoais de contas.',
    price: 60,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: true,
    keywords: ['celular', 'smartphone', 'android', 'iphone', 'limpeza', 'memoria cheia', 'travando', 'formatar celular', 'restaurar', 'lento'],
    estimatedTime: '2 a 4 horas',
    deviceRequired: true,
  },
  {
    id: 'cel-backup-migracao',
    name: 'Backup e Migração de Dados entre Aparelhos',
    category: 'celulares',
    description: 'Transferência completa de conversas, fotos, vídeos, contatos e apps de um celular para outro sem perdas.',
    fullDescription: 'Trocou de aparelho e não quer perder nada? Realizamos a cópia e migração completa de todos os seus dados entre celulares (Android para Android, iPhone para iPhone ou entre sistemas diferentes), mantendo suas mensagens, fotos e configurações essenciais.',
    included: [
      'Migração de histórico completo do WhatsApp',
      'Transferência de fotos, vídeos e documentos',
      'Sincronização de agenda de contatos e calendários',
      'Validação de integridade dos arquivos transferidos',
    ],
    importantInfo: 'É necessário ter ambos os aparelhos carregados e disponíveis para o procedimento.',
    price: 70,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: false,
    keywords: ['backup', 'transferencia', 'migrar', 'troca de celular', 'whatsapp', 'fotos', 'contatos', 'iphone', 'samsung', 'motorola', 'xiaomi'],
    estimatedTime: '2 a 5 horas',
    deviceRequired: true,
  },
  {
    id: 'cel-atualizacao-firmware',
    name: 'Atualização e Recuperação de Sistema (Firmware)',
    category: 'celulares',
    description: 'Recuperação de aparelhos em loop infinito, tela travada na logo ou falhas graves de inicialização.',
    fullDescription: 'Seu celular travou na logo, não inicia ou apresentou erro após atualização? Realizamos a reinstalação de fábrica do firmware oficial da fabricante, recuperando a inicialização do aparelho.',
    included: [
      'Diagnóstico técnico do estado do sistema',
      'Instalação de ROM/Firmware oficial da fabricante',
      'Correção de erros de partição de inicialização (soft-brick)',
      'Testes de inicialização e hardware',
    ],
    importantInfo: 'Depende da integridade da placa-mãe e memória eMMC/UFS do aparelho. Procedimento focado em falhas lógicas/software.',
    price: 90,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['loop infinito', 'travado na logo', 'firmware', 'rom', 'recuperacao', 'brick', 'fastboot', 'recovery', 'nao liga'],
    estimatedTime: '24 a 48 horas',
    deviceRequired: true,
  },

  // --- COMPUTADORES ---
  {
    id: 'pc-formatacao-windows',
    name: 'Formatação Completa com Windows e Otimização',
    category: 'computadores',
    description: 'Instalação limpa do Windows 10/11, drivers atualizados, programas essenciais e otimização para máxima velocidade.',
    fullDescription: 'O serviço mais procurado para renovar seu computador ou notebook. Realizamos a instalação limpa e original do sistema operacional Windows, particionamento correto, atualização de todos os drivers dos fabricantes e aplicação de ajustes de performance para inicialização ultrarrápida.',
    included: [
      'Backup preventivo de documentos, fotos e arquivos pessoais (opcional)',
      'Instalação limpa do Windows 10 ou Windows 11',
      'Instalação e atualização de todos os drivers de hardware',
      'Pacote básico de utilitários (navegadores, leitor PDF, descompactador)',
      'Otimização de inicialização e serviços desnecessários',
    ],
    importantInfo: 'Computadores com SSD têm desempenho substancialmente melhor. Oferecemos orientação gratuita caso queira fazer upgrade de HD para SSD.',
    price: 80,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: true,
    keywords: ['formatacao', 'formatar', 'windows', 'windows 10', 'windows 11', 'computador', 'notebook', 'pc lento', 'reinstalar', 'drivers'],
    estimatedTime: '3 a 6 horas',
    deviceRequired: true,
  },
  {
    id: 'pc-remocao-virus',
    name: 'Remoção de Vírus, Malwares e Adwares',
    category: 'computadores',
    description: 'Varredura profunda, eliminação de spywares, propagandas invasivas e recuperação da segurança do sistema.',
    fullDescription: 'Seu computador está exibindo propagandas estranhas, abrindo abas sozinho ou agindo de maneira suspeita? Efetuamos uma varredura rigorosa com ferramentas profissionais de segurança, eliminando ameaças sem necessidade de apagar seus arquivos pessoais.',
    included: [
      'Varredura antivírus avançada em múltiplos motores',
      'Eliminação de trojans, rootkits, adwares e malwares',
      'Limpeza de extensões maliciosas em todos os navegadores',
      'Instalação e configuração de proteção preventiva',
    ],
    importantInfo: 'Em casos de contaminação crítica ou arquivos criptografados por ransomware, será feita avaliação prévia com o cliente.',
    price: 60,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: false,
    keywords: ['virus', 'malware', 'trojan', 'spyware', 'propaganda', 'anuncios', 'antivirus', 'seguranca', 'hacker', 'invasao'],
    estimatedTime: '2 a 4 horas',
    deviceRequired: true,
  },
  {
    id: 'pc-otimizacao-gamer-pro',
    name: 'Otimização de Desempenho e Ajuste para Jogos/Trabalho',
    category: 'computadores',
    description: 'Redução de latência (input lag), ganho de FPS, desativação de telemetria pesada e limpeza de registros.',
    fullDescription: 'Voltado para gamers, designers e profissionais que necessitam de cada gota de rendimento do hardware. Otimizamos serviços de segundo plano do Windows, planos de energia, placa de vídeo e memória RAM para máxima estabilidade e responsividade.',
    included: [
      'Ajuste fino de configurações do Windows para alta performance',
      'Otimização do painel da placa de vídeo (NVIDIA, AMD ou Intel)',
      'Desativação de recursos invasivos e telemetrias inúteis',
      'Verificação de temperaturas de CPU e GPU sob estresse',
    ],
    importantInfo: 'Pode ser realizado presencialmente ou via acesso remoto assistido.',
    price: 70,
    priceType: 'fixed',
    availability: 'disponivel',
    featured: true,
    keywords: ['fps', 'jogos', 'gamer', 'otimizacao', 'input lag', 'desempenho', 'acelerar', 'placa de video', 'nvidia', 'amd'],
    estimatedTime: '1 a 3 horas',
    deviceRequired: true,
  },
  {
    id: 'pc-instalacao-programas',
    name: 'Instalação e Configuração de Softwares e Periféricos',
    category: 'computadores',
    description: 'Instalação de programas de produtividade, impressoras, certificados digitais e periféricos.',
    fullDescription: 'Dificuldades para configurar sua nova impressora, leitor de cartão, certificado digital ou programas específicos de trabalho? Deixe conosco para deixar tudo pronto para uso imediato.',
    included: [
      'Instalação e teste de impressoras Wi-Fi e USB',
      'Configuração de certificados digitais e leitores',
      'Instalação de pacotes utilitários de produtividade',
      'Orientação rápida de uso ao término',
    ],
    importantInfo: 'Certifique-se de ter os dados do seu certificado ou permissões de administrador.',
    price: 50,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: false,
    keywords: ['programas', 'impressora', 'instalacao', 'software', 'configurar', 'certificado digital', 'office', 'driver'],
    estimatedTime: '1 a 2 horas',
    deviceRequired: true,
  },

  // --- DOCUMENTOS E APRESENTAÇÕES ---
  {
    id: 'doc-formatacao-abnt',
    name: 'Formatação Acadêmica nas Normas ABNT / APA',
    category: 'documentos',
    description: 'Padronização impecável de TCCs, monografias, dissertações, artigos e relatórios técnicos.',
    fullDescription: 'Elimine a dor de cabeça da formatação de trabalhos de conclusão de curso e artigos. Ajustamos margens, espaçamentos, fontes, paginação com quebras de seção, sumário automático clicável, listas de figuras e tabelas, e referências bibliográficas segundo as normas da ABNT mais recentes.',
    included: [
      'Margens, recuos e espaçamentos padronizados',
      'Sumário automático e dinâmico com níveis corretos',
      'Numeração de páginas iniciando na folha correta',
      'Padronização de citações diretas, indiretas e referências',
      'Entrega em formato Word (.docx) editável e PDF final',
    ],
    importantInfo: 'O prazo varia conforme a quantidade de páginas do documento. O trabalho deve ter conteúdo textual já escrito pelo cliente.',
    price: 80,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: true,
    keywords: ['abnt', 'tcc', 'monografia', 'formatar texto', 'word', 'artigo', 'dissertacao', 'sumario', 'referencias', 'faculdade'],
    estimatedTime: '24 a 48 horas',
    deviceRequired: false,
  },
  {
    id: 'doc-slides-profissionais',
    name: 'Criação e Redesign de Apresentações (Slides)',
    category: 'documentos',
    description: 'Slides modernos e visuais para defesas de TCC, reuniões corporativas, palestras e propostas comerciais.',
    fullDescription: 'Transforme conteúdos densos em apresentações dinâmicas, profissionais e elegantes. Aplicamos paletas de cores equilibradas, tipografia de impacto, ícones vetoriais, diagramas explicativos e hierarquia visual para reter a atenção do seu público.',
    included: [
      'Design profissional e personalizado para cada slide',
      'Uso de ícones modernos e gráficos ilustrativos',
      'Apresentação em formato PowerPoint (.pptx) editável e PDF',
      'Diretrizes de apresentação com dicas de transição',
    ],
    importantInfo: 'O cliente deve fornecer o roteiro básico ou texto-base dos tópicos que deseja apresentar.',
    price: 90,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: true,
    keywords: ['slides', 'powerpoint', 'apresentacao', 'defesa de tcc', 'pitch', 'palestra', 'design de slides', 'pptx', 'canva'],
    estimatedTime: '1 a 3 dias úteis',
    deviceRequired: false,
  },
  {
    id: 'doc-planilhas-formularios',
    name: 'Criação de Planilhas e Automações Excel / Sheets',
    category: 'documentos',
    description: 'Desenvolvimento de planilhas de controle financeiro, estoque, fórmulas inteligentes e gráficos visuais.',
    fullDescription: 'Automatize seu controle diário com planilhas sob medida no Excel ou Google Planilhas. Criação de fórmulas avançadas, dashboards interativos, validação de dados e relatórios automáticos.',
    included: [
      'Estruturação da tabela com proteção de fórmulas',
      'Fórmulas automatizadas (PROCV/XLOOKUP, SOMASE, etc.)',
      'Gráficos dinâmicos de acompanhamento',
      'Suporte a dúvidas de preenchimento após a entrega',
    ],
    importantInfo: 'O valor final é dimensionado com base na complexidade dos cálculos e quantidade de abas solicitadas.',
    price: 85,
    priceType: 'starting_at',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['excel', 'planilha', 'sheets', 'google planilhas', 'financeiro', 'dashboard', 'formulas', 'estoque', 'contabilidade'],
    estimatedTime: '2 a 4 dias úteis',
    deviceRequired: false,
  },
  {
    id: 'doc-conversao-edicao-pdf',
    name: 'Conversão, Edição e Compactação de Arquivos PDF',
    category: 'documentos',
    description: 'Junção de documentos, extração de páginas, conversão fiel de PDF para Word e compressão sem perda de leitura.',
    fullDescription: 'Serviço rápido para ajustar documentos digitais para envio a órgãos públicos, plataformas universitárias ou processos seletivos com limite de tamanho de anexo.',
    included: [
      'União de múltiplos PDFs em um único documento',
      'Redução de tamanho de arquivo com máxima nitidez',
      'Conversão editável de PDF digitalizado para DOCX',
      'Inserção de marcadores e índices digitais',
    ],
    importantInfo: 'Documentos manuscritos podem exigir transcrição manual com orçamento específico.',
    price: 30,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: false,
    keywords: ['pdf', 'converter pdf', 'juntar pdf', 'diminuir tamanho', 'word para pdf', 'ocr', 'editar pdf'],
    estimatedTime: '1 a 3 horas',
    deviceRequired: false,
  },

  // --- SERVIÇOS DIGITAIS ---
  {
    id: 'dig-recuperacao-contas',
    name: 'Assessoria para Recuperação de Contas e Acessos',
    category: 'digitais',
    description: 'Auxílio especializado para recuperação de e-mails, contas de redes sociais e autenticação em dois fatores.',
    fullDescription: 'Perdeu o acesso ao seu e-mail principal, Instagram, Facebook ou conta Google? Prestamos assessoria técnica para seguir os canais oficiais e protocolos de suporte de segurança das plataformas para restabelecer o acesso legítimo do titular.',
    included: [
      'Auditoria dos métodos de recuperação disponíveis (SMS, e-mail reserva)',
      'Preenchimento orientado de formulários oficiais de contestação',
      'Orientação para verificação de identidade e biometria oficial',
      'Configuração de segurança avançada pós-recuperação (2FA)',
    ],
    importantInfo: 'Atenção ética: Somente atendemos o titular legítimo da conta. Não realizamos invasão, quebra ilegal de senhas nem clonagem.',
    price: 80,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['recuperar conta', 'instagram', 'gmail', 'facebook', 'senha', 'esqueci a senha', 'conta hackeada', 'dois fatores', '2fa'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: false,
  },
  {
    id: 'dig-suporte-remoto',
    name: 'Suporte Técnico Remoto Imediato',
    category: 'digitais',
    description: 'Atendimento à distância via AnyDesk/TeamViewer para resolver erros rápidos, dúvidas e configurações no seu PC.',
    fullDescription: 'Sem sair de casa! Conectamos ao seu computador de maneira 100% segura e autorizada enquanto você acompanha tudo na sua tela em tempo real. Ideal para resolver erros rápidos, configurar e-mails, programas ou tirar dúvidas práticas.',
    included: [
      'Conexão segura com criptografia ponta a ponta',
      'Você acompanha todos os movimentos do técnico na sua tela',
      'Resolução de problemas de software e configuração',
      'Encerramento imediato da sessão ao finalizar',
    ],
    importantInfo: 'Requer que o computador esteja ligando e conectado à internet estável.',
    price: 50,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: true,
    keywords: ['suporte remoto', 'anydesk', 'teamviewer', 'assistencia remota', 'ajuda online', 'resolver no pc', 'sem sair de casa'],
    estimatedTime: '30 min a 2 horas',
    deviceRequired: false,
  },
  {
    id: 'dig-consultoria-tech',
    name: 'Consultoria de Compra e Upgrade Tecnológico',
    category: 'digitais',
    description: 'Orientação personalizada para escolher o melhor notebook, celular ou peças de PC dentro do seu orçamento.',
    fullDescription: 'Não caia em armadilhas de vendedores! Avaliamos sua necessidade real (estudos, trabalho, jogos, edição) e seu orçamento para indicar as melhores opções com melhor custo-benefício do mercado, com links de compra confiáveis.',
    included: [
      'Análise detalhada do seu perfil de uso e orçamento',
      'Comparativo de 3 a 5 modelos recomendados',
      'Indicação de lojas confiáveis e menores preços do momento',
      'Esclarecimento de dúvidas sobre especificações (processador, memória, tela)',
    ],
    importantInfo: 'Totalmente imparcial, focado em fazer você economizar dinheiro e evitar compras equivocadas.',
    price: 45,
    priceType: 'fixed',
    availability: 'disponivel',
    featured: false,
    keywords: ['consultoria', 'comprar notebook', 'qual celular comprar', 'upgrade', 'pecas de pc', 'custo beneficio', 'orcamento'],
    estimatedTime: 'Mesmo dia',
    deviceRequired: false,
  },
];

export function formatPrice(price: number, type: PriceType): string {
  if (type === 'under_review') {
    return 'Sob avaliação';
  }
  const formatted = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  if (type === 'starting_at') {
    return `A partir de ${formatted}`;
  }
  return formatted;
}

export function getAvailabilityBadge(status: AvailabilityStatus): {
  label: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  dotClass: string;
} {
  switch (status) {
    case 'disponivel':
      return {
        label: 'Disponível',
        bgClass: 'bg-emerald-500/10',
        textClass: 'text-emerald-400',
        borderClass: 'border-emerald-500/30',
        dotClass: 'bg-emerald-400 animate-pulse',
      };
    case 'sob_consulta':
      return {
        label: 'Sob consulta',
        bgClass: 'bg-amber-500/10',
        textClass: 'text-amber-400',
        borderClass: 'border-amber-500/30',
        dotClass: 'bg-amber-400',
      };
    case 'indisponivel':
    default:
      return {
        label: 'Indisponível',
        bgClass: 'bg-rose-500/10',
        textClass: 'text-rose-400',
        borderClass: 'border-rose-500/30',
        dotClass: 'bg-rose-400',
      };
  }
}

export interface WhatsAppRequestPayload {
  customerName: string;
  serviceName: string;
  deviceModel?: string;
  problemDescription: string;
  additionalInfo?: string;
}

export function buildWhatsAppMessage(payload: WhatsAppRequestPayload): string {
  const parts: string[] = [
    `👋 *Olá, MK Tech! Gostaria de solicitar um atendimento.*`,
    ``,
    `📋 *DADOS DA SOLICITAÇÃO:*`,
    `👤 *Nome:* ${payload.customerName.trim()}`,
    `🛠️ *Serviço desejado:* ${payload.serviceName.trim()}`,
  ];

  if (payload.deviceModel && payload.deviceModel.trim().length > 0) {
    parts.push(`📱 *Aparelho / Dispositivo:* ${payload.deviceModel.trim()}`);
  }

  parts.push(`📝 *Descrição do problema / necessidade:*`);
  parts.push(payload.problemDescription.trim());

  if (payload.additionalInfo && payload.additionalInfo.trim().length > 0) {
    parts.push(``);
    parts.push(`💬 *Informações adicionais:*`);
    parts.push(payload.additionalInfo.trim());
  }

  parts.push(``);
  parts.push(`🚀 _Mensagem enviada através do site oficial MK Tech._`);

  return parts.join('\n');
}

export function buildWhatsAppUrl(payload: WhatsAppRequestPayload): string {
  const message = buildWhatsAppMessage(payload);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
