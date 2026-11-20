export type ServiceCategory =
  | 'celulares'
  | 'computadores'
  | 'hardware'
  | 'redes'
  | 'armazenamento'
  | 'documentos'
  | 'solucoes-digitais';

export type AvailabilityStatus = 'disponivel' | 'sob_consulta' | 'indisponivel';

export type PriceType = 'fixed' | 'starting_at' | 'under_review';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  fullDescription: string;
  included?: string[];
  importantInfo?: string;
  price: number; // Valor numérico base para ordenação (0 para sob orçamento)
  priceType: PriceType; // 'fixed' | 'starting_at' | 'under_review'
  customPriceLabel?: string; // e.g. "R$ 5,00 por cantor ou estilo"
  availability: AvailabilityStatus;
  featured: boolean; // Utilizado na seleção comercial dos serviços mais procurados
  popularRank?: number; // 1 a 8 para ordenação precisa dos mais procurados
  isPackage?: boolean; // Para destaque visual do pacote promocional
  packageSavings?: string; // Ex: "Economia de R$ 5,00"
  keywords: string[];
  estimatedTime?: string;
  deviceRequired?: boolean;
}

export interface CategoryInfo {
  id: ServiceCategory;
  name: string;
  shortDescription: string;
  iconName: string;
  badge: string;
}

export const CATEGORIES: Record<ServiceCategory, CategoryInfo> = {
  celulares: {
    id: 'celulares',
    name: 'Celulares e Android',
    shortDescription: 'Formatação, otimização, backups, recuperação de sistema e assistência especializada de software.',
    iconName: 'Smartphone',
    badge: 'Mobile & Android',
  },
  computadores: {
    id: 'computadores',
    name: 'Computadores e Sistemas',
    shortDescription: 'Formatação Windows/Linux, remoção de vírus, otimização, reparação de erros e dual boot.',
    iconName: 'Laptop',
    badge: 'Windows & Linux',
  },
  hardware: {
    id: 'hardware',
    name: 'Hardware e Manutenção',
    shortDescription: 'Instalação de SSD/RAM, limpeza interna preventiva, troca de pasta térmica e montagem.',
    iconName: 'Cpu',
    badge: 'Peças & Limpeza',
  },
  redes: {
    id: 'redes',
    name: 'Internet, Redes e Conectividade',
    shortDescription: 'Roteadores Wi-Fi, repetidores, impressoras, câmeras IP, NAS e diagnóstico de internet.',
    iconName: 'Wifi',
    badge: 'Wi-Fi & Redes',
  },
  armazenamento: {
    id: 'armazenamento',
    name: 'Arquivos, Backup e Armazenamento',
    shortDescription: 'Pendrives musicais, backup seguro, recuperação de arquivos e migração de dados.',
    iconName: 'HardDrive',
    badge: 'Backups & Pendrives',
  },
  documentos: {
    id: 'documentos',
    name: 'Documentos e Produtividade',
    shortDescription: 'Formatação ABNT, slides profissionais, planilhas automáticas, currículos e edição de PDFs.',
    iconName: 'FileText',
    badge: 'ABNT & Slides',
  },
  'solucoes-digitais': {
    id: 'solucoes-digitais',
    name: 'Soluções Digitais',
    shortDescription: 'Desenvolvimento de sites comerciais, configuração de ambientes de software e soluções sob medida.',
    iconName: 'Globe',
    badge: 'Web & Projetos',
  },
};

export const WHATSAPP_NUMBER = '5538999125035';

export const COMMERCIAL_DISCLAIMER =
  'Os valores informados são referentes à mão de obra. Peças, dispositivos de armazenamento, licenças e eventuais deslocamentos não estão incluídos. Serviços sujeitos à avaliação prévia.';

/**
 * Catálogo completo de serviços MK Tech conforme especificações oficiais.
 */
export const INITIAL_SERVICES: ServiceItem[] = [
  // =========================================================================
  // PACOTE PROMOCIONAL DESTACADO
  // =========================================================================
  {
    id: 'pacote-formatacao-backup',
    name: 'Pacote: Formatação + Backup de Celular',
    category: 'celulares',
    description: 'Seu celular renovado sem abrir mão dos seus arquivos importantes. Realizamos o backup dos dados selecionados, a formatação do aparelho e a restauração dos arquivos compatíveis.',
    fullDescription: 'O combo ideal para quem precisa de um celular leve e rápido novamente sem o medo de perder fotos, conversas e documentos. Inclui backup preventivo dos arquivos selecionados, formatação completa e restauração dos dados compatíveis.',
    included: [
      'Backup dos dados essenciais selecionados (fotos, documentos, contatos e WhatsApp compatível)',
      'Formatação limpa e restauração das configurações de fábrica',
      'Restauração organizada dos arquivos compatíveis',
      'Configuração inicial e testes de estabilidade',
    ],
    importantInfo: 'Economia de R$ 5,00 em relação à contratação avulsa (R$ 25,00 formatação + R$ 20,00 backup). Grandes volumes de arquivos podem alterar o orçamento. A possibilidade de backup depende do estado do aparelho e do acesso legítimo aos dados. Não prometemos preservação integral de aplicativos, sessões ou dados incompatíveis.',
    price: 40,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: true,
    popularRank: 8,
    isPackage: true,
    packageSavings: 'Economia de R$ 5,00',
    keywords: [
      'pacote', 'combo', 'promocao', 'formatacao e backup', 'formatar e salvar fotos',
      'celular novo', 'limpar celular sem perder fotos', 'salvar arquivos celular'
    ],
    estimatedTime: '3 a 5 horas',
    deviceRequired: true,
  },

  // =========================================================================
  // CATEGORIA 1: CELULARES E ANDROID
  // =========================================================================
  {
    id: 'cel-formatacao',
    name: 'Formatação de celular',
    category: 'celulares',
    description: 'Restauração do aparelho para as configurações de fábrica, com os procedimentos necessários para deixá-lo pronto para uso.',
    fullDescription: 'Indicado para restaurar o padrão de fábrica de celulares com falhas operacionais, lentidão ou para quem vai vender/passar o aparelho adiante. O sistema é totalmente resetado de forma segura.',
    included: [
      'Hard reset e limpeza profunda de partições de cache',
      'Remoção de vínculos residuais prévios',
      'Configuração dos assistentes de primeiro uso do sistema',
    ],
    importantInfo: 'Não inclui backup prévio (para salvar seus arquivos antes, solicite o serviço de Backup ou o Pacote Promocional). Para iPhones, atendimento sob consulta sujeito à compatibilidade. Não realizamos reparos físicos.',
    price: 25,
    priceType: 'fixed',
    availability: 'disponivel',
    featured: true,
    popularRank: 1,
    keywords: [
      'formatar celular', 'resetar', 'restauração', 'hard reset', 'zerar celular',
      'limpar celular', 'apagar tudo', 'restaurar de fabrica', 'android', 'samsung', 'motorola', 'xiaomi'
    ],
    estimatedTime: '1 a 2 horas',
    deviceRequired: true,
  },
  {
    id: 'cel-otimizacao',
    name: 'Otimização de celular lento',
    category: 'celulares',
    description: 'Diagnóstico básico e ajustes para melhorar o desempenho do aparelho, reduzir travamentos e corrigir problemas de lentidão.',
    fullDescription: 'Seu celular está travando, fechando aplicativos sozinho ou com animações engasgadas? Realizamos um diagnóstico detalhado de consumo de memória RAM, limpeza de caches acumulados e encerramento de processos em segundo plano desnecessários.',
    included: [
      'Diagnóstico de aplicativos em segundo plano pesados',
      'Limpeza de dados em cache e lixo de sistema',
      'Desativação de recursos invasivos e animações pesadas',
      'Ajustes de velocidade de processamento',
    ],
    importantInfo: 'Procedimento lógico de software que não altera peças físicas do aparelho.',
    price: 20,
    priceType: 'fixed',
    availability: 'disponivel',
    featured: true,
    popularRank: 4,
    keywords: [
      'celular lento', 'celular travando', 'otimizacao celular', 'acelerar celular',
      'memoria ram', 'liberar espaco celular', 'fechando sozinho', 'travamentos'
    ],
    estimatedTime: '1 a 2 horas',
    deviceRequired: true,
  },
  {
    id: 'cel-remocao-virus',
    name: 'Remoção de vírus e aplicativos maliciosos',
    category: 'celulares',
    description: 'Identificação e remoção de aplicativos suspeitos, ameaças e configurações prejudiciais ao funcionamento do celular.',
    fullDescription: 'Varredura e erradicação de adwares, malwares, notificações fantasmas no navegador e aplicativos espiões ou enganosos que consomem bateria e comprometem sua privacidade.',
    included: [
      'Identificação de aplicativos ocultos ou com permissões abusivas',
      'Eliminação de notificações invasivas e adwares de navegadores',
      'Verificação de integridade e segurança do sistema',
      'Orientações práticas de prevenção',
    ],
    importantInfo: 'Casos severos podem exigir formatação limpa de fábrica, previamente acordada.',
    price: 25,
    priceType: 'fixed',
    availability: 'disponivel',
    featured: false,
    keywords: [
      'virus celular', 'malware celular', 'propaganda na tela', 'notificacoes estranhas',
      'aplicativo suspeito', 'celular esquentando sozinho', 'tela abrindo sozinha', 'adware'
    ],
    estimatedTime: '1 a 3 horas',
    deviceRequired: true,
  },
  {
    id: 'cel-backup',
    name: 'Backup de celular',
    category: 'celulares',
    description: 'Cópia e organização de fotos, vídeos, documentos e outros arquivos importantes.',
    fullDescription: 'Proteja suas memórias e arquivos de trabalho. Extraímos e organizamos fotos, vídeos da câmera, documentos recebidos e mídias essenciais para armazenamento em computador ou pendrive.',
    included: [
      'Extração segura de fotos e vídeos da memória interna e cartão SD',
      'Cópia de documentos, PDFs e arquivos selecionados',
      'Organização de pastas por categorias',
    ],
    importantInfo: 'Preço inicial de R$ 20,00 para volumes padrão. Volumes muito grandes de dados ou que exijam mídias externas podem ter orçamento personalizado.',
    price: 20,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: true,
    popularRank: 7,
    keywords: [
      'backup celular', 'salvar fotos', 'guardar fotos celular', 'copiar arquivos celular',
      'memoria cheia celular', 'passar fotos pro pc', 'copiar fotos'
    ],
    estimatedTime: '2 a 4 horas',
    deviceRequired: true,
  },
  {
    id: 'cel-transferencia',
    name: 'Transferência de dados entre celulares',
    category: 'celulares',
    description: 'Migração de arquivos e dados compatíveis entre aparelhos, preservando as informações selecionadas.',
    fullDescription: 'Trocou de celular e quer transferir tudo para o aparelho novo sem dores de cabeça? Efetuamos a transferência assistida de fotos, contatos, históricos e documentos entre aparelhos compatíveis.',
    included: [
      'Migração de agenda de contatos completa',
      'Transferência de fotos, vídeos e arquivos',
      'Migração de histórico e conversas do WhatsApp compatíveis',
      'Validação de integridade no aparelho destino',
    ],
    importantInfo: 'Preço a partir de R$ 25,00. É necessário ter ambos os aparelhos carregados e presentes durante o procedimento.',
    price: 25,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: true,
    popularRank: 3,
    keywords: [
      'transferencia de dados celular', 'passar dados de um celular para outro',
      'quero passar minhas fotos para outro celular', 'trocar de celular', 'migrar celular',
      'transferir whatsapp', 'migracao de dados'
    ],
    estimatedTime: '2 a 4 horas',
    deviceRequired: true,
  },
  {
    id: 'cel-recuperacao-android',
    name: 'Reinstalação e recuperação do Android',
    category: 'celulares',
    description: 'Reinstalação do sistema e tentativa de recuperação de aparelhos com falhas de software, erros de inicialização ou sistema corrompido.',
    fullDescription: 'Seu celular travou na tela da fabricante, não inicializa (loop infinito) ou apresentou erro grave após uma atualização? Efetuamos a reinstalação da ROM oficial da fabricante via modo de recuperação/fastboot.',
    included: [
      'Diagnóstico de partição e integridade lógica',
      'Instalação de ROM original oficial de fábrica',
      'Tentativa de ressuscitação de soft-brick',
      'Testes de inicialização',
    ],
    importantInfo: 'Serviço sob orçamento após avaliação do modelo. Não garantimos recuperação em casos de falha física (memória eMMC danificada ou placa-mãe queimada).',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: [
      'meu celular nao liga depois de atualizar', 'travado na logo', 'loop infinito',
      'recuperar android', 'reinstalar android', 'celular nao inicia', 'tela preta celular', 'brick'
    ],
    estimatedTime: '24 a 48 horas',
    deviceRequired: true,
  },
  {
    id: 'cel-firmware',
    name: 'Atualização e downgrade de firmware',
    category: 'celulares',
    description: 'Instalação de versões compatíveis do sistema operacional, após avaliação do modelo e dos riscos.',
    fullDescription: 'Atualização manual para a última versão oficial liberada pela fabricante ou retorno (downgrade) para versões anteriores compatíveis quando uma atualização recente causou bugs severos.',
    included: [
      'Análise detalhada de compatibilidade de binário e firmware',
      'Gravação segura do pacote de firmware oficial',
      'Verificação pós-instalação',
    ],
    importantInfo: 'Sujeito à viabilidade técnica do modelo e políticas de bloqueio de rollback das fabricantes.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['firmware', 'atualizacao android', 'downgrade', 'versao anterior android', 'rom oficial', 'flashing'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },
  {
    id: 'cel-root-magisk',
    name: 'Root e personalização avançada',
    category: 'celulares',
    description: 'Configuração de root, Magisk e personalizações compatíveis, mediante avaliação técnica.',
    fullDescription: 'Voltado para usuários avançados que necessitam de privilégios de superusuário (Root) via Magisk/KernelSU para propósitos técnicos específicos, respeitando a integridade do aparelho.',
    included: [
      'Verificação de compatibilidade de bootloader',
      'Instalação de Magisk / KernelSU oficial',
      'Ajustes de segurança e ocultação de root se compatível',
    ],
    importantInfo: 'Sob orçamento. O desbloqueio de bootloader pode apagar dados e anular proteções da fabricante. Avaliação prévia obrigatória.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['root', 'magisk', 'superusuario', 'desbloquear bootloader', 'customizacao android'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },
  {
    id: 'cel-recuperacao-contas',
    name: 'Recuperação de acesso a contas',
    category: 'celulares',
    description: 'Assistência na recuperação de contas próprias por métodos oficiais, com comprovação de titularidade. Não oferecer desbloqueios indevidos ou contorno de proteções antifurto.',
    fullDescription: 'Orientação técnica e acompanhamento para recuperar o acesso à sua conta Google, e-mail ou redes sociais através dos formulários oficiais e métodos de verificação autorizados pelas plataformas.',
    included: [
      'Identificação dos métodos oficiais de contestação da plataforma',
      'Orientação para validação de número de telefone e e-mail de recuperação',
      'Configuração de verificação em duas etapas pós-recuperação',
    ],
    importantInfo: 'Rigorosamente restrito ao titular legítimo com comprovação. Não realizamos invasões, quebra ilegal de senhas nem contorno de proteção de conta Google (FRP) ou iCloud.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: [
      'recuperar conta', 'recuperar gmail', 'esqueci minha senha', 'conta bloqueada',
      'recuperar acesso', 'conta google', 'dois fatores'
    ],
    estimatedTime: 'Sob avaliação',
    deviceRequired: false,
  },
  {
    id: 'cel-diagnostico-software',
    name: 'Diagnóstico de problemas de software',
    category: 'celulares',
    description: 'Investigação de erros, travamentos, falhas de aplicativos e problemas no sistema operacional.',
    fullDescription: 'Avaliação técnica especializada para descobrir a raiz de problemas intermitentes: aplicativos que fecham sozinhos, falhas em conexões, consumo anormal de bateria ou lentidão misteriosa.',
    included: [
      'Testes de carga e consumo de bateria por aplicativo',
      'Análise de relatórios de falhas de apps',
      'Parecer técnico claro com soluções recomendadas',
    ],
    importantInfo: 'Focado em falhas lógicas e de software.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['diagnostico celular', 'descobrir defeito celular', 'analisar celular', 'erro no celular', 'celular travando'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },

  // =========================================================================
  // CATEGORIA 2: COMPUTADORES E SISTEMAS OPERACIONAIS
  // =========================================================================
  {
    id: 'pc-formatacao',
    name: 'Formatação de PC ou notebook',
    category: 'computadores',
    description: 'Reinstalação do Windows, configuração inicial e instalação dos drivers essenciais.',
    fullDescription: 'A renovação completa do seu computador. Realizamos a reinstalação limpa do Windows 10 ou 11, configuração correta de partições, instalação de todos os drivers de vídeo, áudio, rede e utilitários essenciais.',
    included: [
      'Instalação limpa do Windows original',
      'Instalação completa de todos os drivers de hardware atualizados',
      'Pacote básico de utilitários (navegadores, PDF, descompactador)',
      'Otimização básica de inicialização',
    ],
    importantInfo: 'Preço fixo de R$ 40,00 sem backup de arquivos. Para salvar seus arquivos previamente, escolha o serviço Formatação com Backup.',
    price: 40,
    priceType: 'fixed',
    availability: 'disponivel',
    featured: true,
    popularRank: 2,
    keywords: [
      'formatacao de pc ou notebook', 'formatar pc', 'formatar notebook', 'instalar windows',
      'windows 10', 'windows 11', 'reinstalar windows', 'formatar computador'
    ],
    estimatedTime: '2 a 4 horas',
    deviceRequired: true,
  },
  {
    id: 'pc-formatacao-backup',
    name: 'Formatação com backup',
    category: 'computadores',
    description: 'Backup prévio dos arquivos selecionados, reinstalação do Windows e restauração dos dados compatíveis.',
    fullDescription: 'Tenha o Windows renovado sem o risco de perder seus documentos, fotos, planilhas e arquivos essenciais. Salvamos seus dados em mídia segura, formatamos a máquina e recolocamos seus arquivos organizados.',
    included: [
      'Backup preventivo de pastas do usuário (Documentos, Fotos, Downloads, Desktop)',
      'Instalação limpa do Windows e drivers de hardware',
      'Restauração organizada dos arquivos salvos',
      'Pacote utilitário essencial',
    ],
    importantInfo: 'A partir de R$ 60,00 para volumes padrão de dados. Volumes extraordinários (centenas de GBs) serão orçados previamente.',
    price: 60,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: false,
    keywords: [
      'formatacao com backup', 'formatar e salvar arquivos', 'formatar pc sem perder nada',
      'salvar fotos pc', 'formatar com seguranca', 'salvar documentos'
    ],
    estimatedTime: '3 a 6 horas',
    deviceRequired: true,
  },
  {
    id: 'pc-otimizacao',
    name: 'Otimização de PC lento',
    category: 'computadores',
    description: 'Diagnóstico básico e ajustes para melhorar o desempenho, reduzir lentidão e corrigir problemas comuns.',
    fullDescription: 'Seu computador demora para ligar, abre programas com extrema lentidão ou engasga durante o trabalho? Aplicamos ajustes técnicos no sistema operacional para liberar memória e acelerar a resposta da máquina.',
    included: [
      'Desativação de programas desnecessários na inicialização do Windows',
      'Limpeza de arquivos temporários e resíduos de sistema',
      'Ajustes de serviços em segundo plano e planos de energia',
      'Diagnóstico de saúde do disco (HD/SSD)',
    ],
    importantInfo: 'Caso a máquina utilize HD mecânico antigo, podemos orientar sobre a instalação de um SSD para ganho colossal de velocidade.',
    price: 30,
    priceType: 'fixed',
    availability: 'disponivel',
    featured: true,
    popularRank: 5,
    keywords: [
      'meu pc esta travando', 'otimizacao de pc lento', 'pc lento', 'notebook lento',
      'acelerar pc', 'computador travando', 'demora para ligar', 'limpeza de sistema pc'
    ],
    estimatedTime: '1 a 3 horas',
    deviceRequired: true,
  },
  {
    id: 'pc-remocao-virus',
    name: 'Remoção de vírus do computador',
    category: 'computadores',
    description: 'Verificação e remoção de ameaças, programas indesejados e softwares maliciosos.',
    fullDescription: 'Varredura rigorosa com ferramentas profissionais de desinfecção para remover trojans, adwares, spywares e programas instalados sorrateiramente sem permissão.',
    included: [
      'Varredura de discos e memória ativa contra pragas digitais',
      'Limpeza de extensões maliciosas em navegadores',
      'Restauração de configurações de rede e DNS alteradas por malwares',
      'Instalação de proteção preventiva',
    ],
    importantInfo: 'A partir de R$ 30,00 conforme a extensão da infecção.',
    price: 30,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: false,
    keywords: [
      'remocao de virus do computador', 'virus no pc', 'computador infectado', 'trojan',
      'propaganda abrindo no computador', 'antivirus', 'spyware'
    ],
    estimatedTime: '2 a 4 horas',
    deviceRequired: true,
  },
  {
    id: 'pc-instalacao-linux',
    name: 'Instalação e configuração de Linux',
    category: 'computadores',
    description: 'Instalação e configuração de distribuições Linux conforme as necessidades do cliente.',
    fullDescription: 'Ideal para revitalizar computadores antigos ou para programadores e estudantes. Instalação e personalização de distribuições como Ubuntu, Linux Mint, Debian, Fedora e drivers compatíveis.',
    included: [
      'Particionamento de disco seguro',
      'Instalação da distribuição Linux adequada ao perfil',
      'Configuração de drivers de vídeo e Wi-Fi',
      'Instalação de suíte de escritório e programas compatíveis',
    ],
    importantInfo: 'Solicitar orçamento conforme a distribuição e finalidade de uso.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['linux', 'ubuntu', 'linux mint', 'instalar linux', 'sistema operacional linux', 'revitalizar pc antigo'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },
  {
    id: 'pc-dual-boot',
    name: 'Configuração de dual boot',
    category: 'computadores',
    description: 'Configuração de dois sistemas operacionais compatíveis no mesmo computador.',
    fullDescription: 'Utilize o melhor de dois mundos no mesmo computador: Windows e Linux (ou duas versões do Windows) com menu de inicialização GRUB configurado para escolha ao ligar.',
    included: [
      'Redimensionamento seguro de partições existentes',
      'Instalação do segundo sistema operacional',
      'Configuração do menu de inicialização (Bootloader/GRUB)',
      'Testes de inicialização cruzada',
    ],
    importantInfo: 'Sob orçamento. Recomendável ter espaço livre de disco suficiente.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['dual boot', 'windows e linux', 'dois sistemas no pc', 'grub', 'particionamento dual boot'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },
  {
    id: 'pc-reparacao-erros',
    name: 'Reparação de erros do Windows',
    category: 'computadores',
    description: 'Diagnóstico e correção de erros de sistema, falhas de inicialização e problemas em arquivos essenciais.',
    fullDescription: 'Correção de erros de atualização do Windows Update, falhas de inicialização com reparo automático em loop, corrupção de arquivos SFC/DISM e problemas de DLL sem precisar formatar.',
    included: [
      'Diagnóstico de logs de erro do Windows',
      'Restauração de integridade de arquivos de sistema (DISM / SFC)',
      'Correção de registro e serviços de inicialização',
    ],
    importantInfo: 'Sob orçamento. Caso o sistema esteja corrompido de forma irreversível, será apresentada a alternativa de formatação com backup.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: [
      'reparacao de erros do windows', 'windows update com erro', 'reparo automatico travado',
      'erro de dll', 'windows nao inicia', 'corrigir windows', 'tela preta windows'
    ],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },
  {
    id: 'pc-clonagem-ssd',
    name: 'Clonagem de HD para SSD',
    category: 'computadores',
    description: 'Migração do sistema operacional e dos dados para outro dispositivo de armazenamento compatível.',
    fullDescription: 'Faça o upgrade de HD para SSD sem perder nenhum programa, jogo, configuração ou arquivo instalado. Copiamos o disco bit a bit de forma idêntica para o novo SSD.',
    included: [
      'Clonagem do sistema operacional e partições de inicialização',
      'Ajuste e alinhamento de partições 4K para SSD',
      'Configuração da BIOS para inicializar pelo novo disco',
    ],
    importantInfo: 'Sob orçamento. Peça de SSD adquirida pelo cliente ou fornecida à parte.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['clonagem de hd para ssd', 'trocar hd por ssd', 'passar windows para ssd', 'clonar windows', 'migrar sistema'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },
  {
    id: 'pc-gamer-config',
    name: 'Configuração de PC gamer',
    category: 'computadores',
    description: 'Ajustes de sistema, drivers e configurações para melhorar a estabilidade e o desempenho em jogos, respeitando os limites do hardware.',
    fullDescription: 'Ajuste fino de drivers de placa de vídeo NVIDIA/AMD, configuração de planos de energia de alto desempenho, redução de latência de entrada (input lag) e otimização para jogos competitivos.',
    included: [
      'Atualização limpa de drivers de vídeo e chipset',
      'Ajuste do painel de controle da GPU para desempenho/estabilidade',
      'Otimização de serviços de segundo plano e recursos de jogos do Windows',
      'Verificação de temperaturas e estabilidade',
    ],
    importantInfo: 'Sob orçamento. Respeita rigorosamente os limites e a integridade térmica do hardware.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['configuracao de pc gamer', 'fps jogos', 'otimizar pc gamer', 'input lag', 'jogos travando', 'placa de video'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },
  {
    id: 'pc-maquinas-virtuais',
    name: 'Instalação e configuração de máquinas virtuais',
    category: 'computadores',
    description: 'Preparação de ambientes virtuais para execução de sistemas operacionais e softwares compatíveis.',
    fullDescription: 'Configuração de plataformas como VirtualBox ou VMware para execução de sistemas isolados para testes de software, estudos ou execução de programas legados antigos com segurança.',
    included: [
      'Habilitação de virtualização na BIOS (VT-x / AMD-V)',
      'Instalação e configuração do software de virtualização',
      'Criação da VM e instalação do sistema convidado',
    ],
    importantInfo: 'Sob orçamento conforme a quantidade de VMs e requisitos de memória.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['maquinas virtuais', 'virtualbox', 'vmware', 'virtualizacao', 'testar sistemas'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },
  {
    id: 'pc-diagnostico-avancado',
    name: 'Diagnóstico avançado de computadores',
    category: 'computadores',
    description: 'Investigação de telas azuis, reinicializações, travamentos, problemas de drivers e outras falhas.',
    fullDescription: 'Análise minuciosa de despejos de memória (minidumps de tela azul), testes de estresse de memória RAM e processador, e investigação de falhas de hardware e software que causam travamentos imprevisíveis.',
    included: [
      'Leitura de relatórios de tela azul (BSOD)',
      'Testes de integridade de memória RAM e disco',
      'Parecer técnico claro com diagnóstico das causas',
    ],
    importantInfo: 'Sob orçamento. Diagnóstico transparente para evitar trocas desnecessárias de peças.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: [
      'diagnostico avancado de computadores', 'tela azul', 'pc reiniciando sozinho',
      'computador congelando', 'bsod', 'erro de tela azul'
    ],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },

  // =========================================================================
  // CATEGORIA 3: HARDWARE E MANUTENÇÃO
  // =========================================================================
  {
    id: 'hw-instalacao-ssd-ram',
    name: 'Instalação de SSD ou memória RAM',
    category: 'hardware',
    description: 'Instalação física e configuração de componentes compatíveis. Peças não incluídas.',
    fullDescription: 'Instalação cuidadosa de módulos de memória RAM ou unidades de armazenamento SSD (SATA ou NVMe M.2) em computadores desktop ou notebooks compatíveis.',
    included: [
      'Instalação física do componente com ferramentas antiestáticas',
      'Reconhecimento na BIOS/UEFI e no sistema operacional',
      'Testes rápidos de funcionamento e compatibilidade',
    ],
    importantInfo: 'Preço de R$ 40,00 referente à mão de obra. As peças (SSD ou memória) devem ser fornecidas pelo cliente ou adquiridas separadamente.',
    price: 40,
    priceType: 'fixed',
    availability: 'disponivel',
    featured: false,
    keywords: [
      'instalacao de ssd ou memoria ram', 'colocar ssd', 'aumentar memoria ram',
      'instalar ssd notebook', 'instalar ram pc', 'upgrade ssd'
    ],
    estimatedTime: '1 a 2 horas',
    deviceRequired: true,
  },
  {
    id: 'hw-limpeza-pc',
    name: 'Limpeza interna de computador',
    category: 'hardware',
    description: 'Remoção de poeira e limpeza preventiva de componentes internos.',
    fullDescription: 'Limpeza física profunda do gabinete, ventoinhas, dissipadores e fontes para eliminar poeira acumulada que causa superaquecimento, ruído alto e perda de performance.',
    included: [
      'Desmontagem parcial segura para acesso aos coolers e dissipadores',
      'Remoção de poeira e resíduos internos',
      'Organização básica de cabos para melhor fluxo de ar',
      'Verificação de rotação de ventoinhas',
    ],
    importantInfo: 'A partir de R$ 50,00. Troca de pasta térmica pode ser combinada em conjunto.',
    price: 50,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: false,
    keywords: [
      'notebook esquentando', 'limpeza interna de computador', 'limpeza de pc',
      'tirar poeira pc', 'pc esquentando', 'cooler barulhento', 'superaquecimento'
    ],
    estimatedTime: '2 a 3 horas',
    deviceRequired: true,
  },
  {
    id: 'hw-limpeza-notebook',
    name: 'Limpeza interna de notebook',
    category: 'hardware',
    description: 'Limpeza preventiva do sistema de ventilação e dos componentes acessíveis, conforme o modelo.',
    fullDescription: 'Abertura cuidadosa de notebooks para limpeza de dutos de ar, aletas do dissipador e ventoinha interna (cooler) para combater o superaquecimento e ruídos excessivos.',
    included: [
      'Abertura cuidadosa de carcaça conforme manual de serviço',
      'Desobstrução do cooler e saída de ar',
      'Limpeza de poeira acumulada na placa',
    ],
    importantInfo: 'A partir de R$ 60,00 conforme a complexidade de abertura de cada modelo de notebook.',
    price: 60,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: false,
    keywords: [
      'notebook esquentando', 'limpeza interna de notebook', 'limpeza de notebook',
      'cooler de notebook barulhento', 'notebook fervendo', 'desarmando por calor'
    ],
    estimatedTime: '2 a 4 horas',
    deviceRequired: true,
  },
  {
    id: 'hw-pasta-termica',
    name: 'Troca de pasta térmica',
    category: 'hardware',
    description: 'Substituição da pasta térmica do processador para manutenção da transferência de calor.',
    fullDescription: 'Remoção da pasta térmica ressecada antiga e aplicação de composto térmico de alta condutividade para restaurar as temperaturas ideais de trabalho do processador.',
    included: [
      'Limpeza do composto antigo ressecado com álcool isopropílico',
      'Aplicação homogênea de nova pasta térmica de qualidade',
      'Reinstalação do cooler e conferência de pressão de contato',
      'Monitoramento de temperaturas em repouso e sob carga',
    ],
    importantInfo: 'Preço fixo de R$ 30,00 para computadores desktop. Em notebooks, é realizado preferencialmente junto à limpeza interna.',
    price: 30,
    priceType: 'fixed',
    availability: 'disponivel',
    featured: false,
    keywords: [
      'troca de pasta termica', 'pasta termica processador', 'temperatura cpu alta',
      'trocar pasta termica', 'cooler processador'
    ],
    estimatedTime: '1 a 2 horas',
    deviceRequired: true,
  },
  {
    id: 'hw-montagem-pc',
    name: 'Montagem completa de computador',
    category: 'hardware',
    description: 'Montagem de computadores personalizados, instalação de componentes e testes iniciais.',
    fullDescription: 'Comprou as peças avulsas na internet e quer montar sua máquina com segurança profissional? Montamos seu computador com organização de cabos (cable management) impecável e testes de primeira inicialização.',
    included: [
      'Instalação de processador, memórias, placa-mãe, fonte e placa de vídeo',
      'Organização de cabos no gabinete',
      'Atualização de BIOS da placa-mãe se necessário',
      'Teste de POST e estabilidade térmica',
    ],
    importantInfo: 'Sob orçamento conforme a complexidade (ex: water cooler, gabinetes compactos, RGB). Peças fornecidas pelo cliente.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['montagem completa de computador', 'montar pc', 'montagem de pc gamer', 'cable management', 'montar computador'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },
  {
    id: 'hw-upgrade',
    name: 'Upgrade de hardware',
    category: 'hardware',
    description: 'Avaliação e instalação de melhorias de memória, armazenamento, processador, placa de vídeo e outros componentes.',
    fullDescription: 'Consultoria e instalação para dar sobrevida ao seu equipamento: descubra quais peças valem a pena trocar para ter o melhor custo-benefício de desempenho.',
    included: [
      'Avaliação de gargalos e compatibilidade de soquete/barramento',
      'Instalação dos novos componentes',
      'Verificação de estabilidade elétrica e térmica',
    ],
    importantInfo: 'Sob orçamento. Peças não incluídas.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['upgrade de hardware', 'melhorar computador', 'trocar processador', 'trocar placa de video', 'upgrade pc'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },
  {
    id: 'hw-diagnostico',
    name: 'Diagnóstico de hardware',
    category: 'hardware',
    description: 'Investigação de problemas físicos, incompatibilidades, falhas de componentes e superaquecimento.',
    fullDescription: 'Seu computador não liga, desliga sozinho após alguns minutos ou emite bipes? Identificamos qual componente físico está falhando (fonte, placa-mãe, memória ou disco).',
    included: [
      'Testes elétricos básicos e medições de tensões da fonte',
      'Inspeção visual de capacitores e conectores',
      'Isolamento de periféricos e testes em bancada',
    ],
    importantInfo: 'Sob orçamento. Parecer claro sobre a viabilidade econômica do conserto.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['diagnostico de hardware', 'pc nao liga', 'computador apitando', 'testar pecas pc', 'fonte queimada'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },
  {
    id: 'hw-manutencao-preventiva',
    name: 'Manutenção preventiva',
    category: 'hardware',
    description: 'Avaliação geral, limpeza, verificação de temperaturas e testes de funcionamento.',
    fullDescription: 'O cuidado periódico essencial para evitar paradas repentinas e prolongar a vida útil de computadores de trabalho e estudos.',
    included: [
      'Revisão geral de conexões e limpeza de poeira',
      'Inspeção de saúde de discos e temperaturas',
      'Relatório de pontos de atenção preventiva',
    ],
    importantInfo: 'Sob orçamento. Ideal para computadores com mais de 1 ano de uso contínuo.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['manutencao preventiva', 'revisao de computador', 'evitar problemas pc', 'check-up computador'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },

  // =========================================================================
  // CATEGORIA 4: INTERNET, REDES E DISPOSITIVOS
  // =========================================================================
  {
    id: 'red-roteador-wifi',
    name: 'Configuração de roteador Wi-Fi',
    category: 'redes',
    description: 'Configuração de rede sem fio, segurança, senha e ajustes básicos de conectividade.',
    fullDescription: 'Configuração completa de roteadores residenciais e de pequenos escritórios: criação de nome de rede (SSID), definição de senha segura WPA2/WPA3, separação de redes 2.4GHz e 5GHz e configuração de portas.',
    included: [
      'Definição de nomes de rede e criptografia segura',
      'Configuração de tipo de conexão (PPPoE / DHCP)',
      'Ajuste de canais para evitar interferências de vizinhos',
      'Conexão e teste em dispositivos do cliente',
    ],
    importantInfo: 'A partir de R$ 25,00. Pode ser realizado no local ou via suporte remoto quando aplicável.',
    price: 25,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: false,
    keywords: [
      'configuracao de roteador wi-fi', 'mudar senha do wifi', 'configurar roteador',
      'wifi caindo', 'trocar nome do wifi', 'senha da internet'
    ],
    estimatedTime: '1 a 2 horas',
    deviceRequired: false,
  },
  {
    id: 'red-impressora',
    name: 'Instalação e configuração de impressora',
    category: 'redes',
    description: 'Configuração de impressoras compatíveis por USB ou rede, instalação de drivers e testes.',
    fullDescription: 'Deixe sua impressora ou multifuncional pronta para imprimir e digitalizar a partir de computadores e notebooks via cabo USB ou conectada diretamente na rede Wi-Fi.',
    included: [
      'Instalação dos drivers oficiais e softwares de digitalização',
      'Conexão à rede Wi-Fi da residência ou escritório',
      'Compartilhamento de impressão se compatível',
      'Impressão e digitalização de página de teste',
    ],
    importantInfo: 'A partir de R$ 25,00 por equipamento.',
    price: 25,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: false,
    keywords: [
      'instalacao e configuracao de impressora', 'instalar impressora', 'impressora nao imprime',
      'configurar impressora wifi', 'digitalizador impressora', 'driver impressora'
    ],
    estimatedTime: '1 a 2 horas',
    deviceRequired: false,
  },
  {
    id: 'red-diagnostico-internet',
    name: 'Diagnóstico de problemas de internet',
    category: 'redes',
    description: 'Investigação de falhas de conexão, instabilidade, lentidão e problemas de rede.',
    fullDescription: 'Descubra se o problema de conexão está no seu computador, no cabeamento, no roteador interno ou se é falha exclusiva do seu provedor de internet.',
    included: [
      'Testes de perda de pacotes, latência e velocidade real',
      'Verificação de adaptadores de rede e placas Wi-Fi',
      'Orientação sobre como acionar o provedor com dados técnicos',
    ],
    importantInfo: 'Sob orçamento. Focado no diagnóstico lógico e de equipamentos do cliente.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: [
      'diagnostico de problemas de internet', 'internet lenta', 'internet caindo',
      'sem internet', 'sinal fraco wifi', 'ping alto'
    ],
    estimatedTime: 'Sob avaliação',
    deviceRequired: false,
  },
  {
    id: 'red-repetidores',
    name: 'Configuração de repetidores e redes domésticas',
    category: 'redes',
    description: 'Configuração de equipamentos para melhorar a cobertura e organização da rede.',
    fullDescription: 'Elimine os pontos cegos de sinal fraco da sua casa configurando repetidores de sinal Wi-Fi ou roteadores secundários como ponto de acesso.',
    included: [
      'Pareamento e configuração de repetidores Wi-Fi',
      'Posicionamento estratégico para melhor captação',
      'Testes de velocidade nos cômodos atendidos',
    ],
    importantInfo: 'Sob orçamento. Equipamentos fornecidos pelo cliente.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['configuracao de repetidores', 'repetidor wifi', 'ampliar wifi', 'ponto de acesso', 'wifi fraco no quarto'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: false,
  },
  {
    id: 'red-cameras-ip',
    name: 'Configuração de câmeras IP',
    category: 'redes',
    description: 'Instalação lógica e configuração de câmeras IP em redes autorizadas.',
    fullDescription: 'Configuração lógica de câmeras Wi-Fi de segurança e monitoramento para visualização ao vivo no celular e configuração de gravação em cartão de memória ou nuvem.',
    included: [
      'Conexão da câmera à rede Wi-Fi autorizada',
      'Configuração do aplicativo no smartphone do proprietário',
      'Ajustes de alertas de movimento e qualidade de imagem',
    ],
    importantInfo: 'Sob orçamento. Estritamente em redes e propriedades autorizadas pelo proprietário.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['cameras ip', 'camera wifi', 'configurar camera', 'ver camera no celular', 'camera de seguranca'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: false,
  },
  {
    id: 'red-nas-storage',
    name: 'Configuração de armazenamento em rede (NAS)',
    category: 'redes',
    description: 'Preparação de armazenamento compartilhado e acesso a arquivos em rede.',
    fullDescription: 'Criação de pastas compartilhadas na rede local entre computadores ou configuração de dispositivos NAS para centralizar backups e arquivos da equipe ou família.',
    included: [
      'Configuração de compartilhamento SMB e permissões',
      'Mapeamento de unidades de rede nos computadores autorizados',
      'Testes de transferência de arquivos',
    ],
    importantInfo: 'Sob orçamento conforme a quantidade de estações conectadas.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['nas', 'armazenamento em rede', 'compartilhar pastas', 'servidor de arquivos local'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: false,
  },
  {
    id: 'red-acesso-remoto',
    name: 'Configuração de acesso remoto',
    category: 'redes',
    description: 'Configuração de ferramentas de acesso remoto com autorização expressa do proprietário.',
    fullDescription: 'Configuração segura de ferramentas de acesso à distância (como AnyDesk, RustDesk ou TeamViewer) para que você possa acessar o computador do seu trabalho a partir de casa.',
    included: [
      'Instalação de software oficial e geração de senhas seguras',
      'Configuração de inicialização automática autorizada',
      'Orientação de uso e procedimentos de desconexão segura',
    ],
    importantInfo: 'Sob orçamento. Realizado somente com consentimento e autorização expressa do titular do equipamento.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['acesso remoto', 'anydesk', 'teamviewer', 'acessar pc de casa', 'trabalho remoto'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: false,
  },
  {
    id: 'red-smart-tv',
    name: 'Configuração de Smart TVs e dispositivos conectados',
    category: 'redes',
    description: 'Diagnóstico e configuração de conectividade e integração com redes e dispositivos compatíveis.',
    fullDescription: 'Auxílio na conexão de Smart TVs, aparelhos de streaming (Chromecast, Fire TV) e caixas de som inteligentes à rede Wi-Fi, resolvendo erros de conectividade de aplicativos.',
    included: [
      'Conexão do dispositivo na melhor faixa de rede (2.4GHz ou 5GHz)',
      'Atualização do sistema operacional do aparelho',
      'Testes de reprodução nos principais aplicativos',
    ],
    importantInfo: 'Sob orçamento. Focado em configurações lógicas de rede e software.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['smart tv', 'chromecast', 'fire stick', 'tv nao conecta no wifi', 'streaming'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: false,
  },

  // =========================================================================
  // CATEGORIA 5: ARQUIVOS, BACKUP E ARMAZENAMENTO
  // =========================================================================
  {
    id: 'arm-musicas-pendrive',
    name: 'Músicas organizadas em pendrive',
    category: 'armazenamento',
    description: 'Organização de arquivos musicais fornecidos pelo cliente ou obtidos de fontes autorizadas, preparados para reprodução em som automotivo e aparelhos compatíveis.',
    fullDescription: 'Tenha suas músicas favoritas organizadas por pastas de cantores ou estilos musicais (sertanejo, forró, pop, rock, flashback, etc.), com nomes de faixas padronizados e sem travamentos no som do carro, caixa de som ou computador.',
    included: [
      'Organização de arquivos em pastas categorizadas',
      'Padronização de tags e nomes de arquivos',
      'Verificação de compatibilidade de formato (MP3 compatível)',
    ],
    importantInfo: 'R$ 5,00 por cantor ou estilo musical. O valor é por grupo de músicas. Quantidades excepcionalmente grandes devem ser avaliadas previamente. Pendrive físico fornecido pelo cliente ou adquirido à parte.',
    price: 5,
    priceType: 'fixed',
    customPriceLabel: 'R$ 5,00 por cantor ou estilo',
    availability: 'disponivel',
    featured: true,
    popularRank: 6,
    keywords: [
      'colocar musica no pendrive', 'musicas organizadas em pendrive', 'pendrive de musica',
      'musica para som automotivo', 'pendrive para carro', 'musicas por cantor', 'gravar pendrive'
    ],
    estimatedTime: '1 a 3 horas',
    deviceRequired: false,
  },
  {
    id: 'arm-formatacao-pendrive',
    name: 'Formatação de pendrive ou cartão SD',
    category: 'armazenamento',
    description: 'Preparação do dispositivo em sistema de arquivos compatível, com verificação básica de funcionamento.',
    fullDescription: 'Seu pendrive ou cartão de memória não abre, pede para formatar ou não funciona no som do carro? Formatamos no padrão correto (FAT32, exFAT ou NTFS) para máxima compatibilidade.',
    included: [
      'Formatação no sistema de arquivos ideal para sua finalidade',
      'Verificação de setores defeituosos básicos',
      'Teste rápido de leitura e gravação',
    ],
    importantInfo: 'Preço fixo de R$ 10,00. A formatação apaga os dados existentes do dispositivo.',
    price: 10,
    priceType: 'fixed',
    availability: 'disponivel',
    featured: false,
    keywords: [
      'formatacao de pendrive', 'formatar cartao sd', 'pendrive nao abre',
      'pendrive pedindo para formatar', 'cartao de memoria nao reconhece'
    ],
    estimatedTime: '30 min a 1 hora',
    deviceRequired: false,
  },
  {
    id: 'arm-backup-pc',
    name: 'Backup de arquivos do computador',
    category: 'armazenamento',
    description: 'Cópia organizada de fotos, documentos, vídeos e outros arquivos importantes.',
    fullDescription: 'Não espere seu HD queimar para pensar nos seus arquivos. Realizamos a cópia e organização preventiva dos seus documentos de trabalho, fotos e pastas pessoais para armazenamento seguro.',
    included: [
      'Varredura de discos para localização de arquivos pessoais',
      'Cópia organizada para mídia externa fornecida pelo cliente',
      'Conferência do número de itens e tamanho total',
    ],
    importantInfo: 'A partir de R$ 30,00 conforme o volume de dados a ser copiado.',
    price: 30,
    priceType: 'starting_at',
    availability: 'disponivel',
    featured: false,
    keywords: [
      'backup de arquivos do computador', 'salvar arquivos pc', 'copiar dados computador',
      'backup preventivo', 'salvar fotos do pc'
    ],
    estimatedTime: '2 a 5 horas',
    deviceRequired: true,
  },
  {
    id: 'arm-recuperacao-arquivos',
    name: 'Recuperação de arquivos excluídos',
    category: 'armazenamento',
    description: 'Análise de possibilidades de recuperação de arquivos apagados de dispositivos de armazenamento.',
    fullDescription: 'Apagou fotos ou documentos por engano da lixeira ou do pendrive? Realizamos a varredura lógica com softwares profissionais para buscar setores não sobrescritos e tentar restaurar seus arquivos.',
    included: [
      'Varredura lógica profunda do dispositivo',
      'Inspeção da integridade dos arquivos localizados',
      'Recuperação dos dados íntegros para nova mídia',
    ],
    importantInfo: 'Sob orçamento. Importante: não garantimos recuperação de dados; quanto menos o dispositivo for usado após a exclusão, maiores as chances. Dispositivos com danos físicos necessitam de avaliação prévia.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: [
      'recuperacao de arquivos excluidos', 'recuperar fotos apagadas', 'apaguei sem querer',
      'recuperar pendrive', 'arquivos deletados', 'restaurar arquivos'
    ],
    estimatedTime: 'Sob avaliação',
    deviceRequired: false,
  },
  {
    id: 'arm-recuperacao-particoes',
    name: 'Recuperação de partições',
    category: 'armazenamento',
    description: 'Diagnóstico de partições inacessíveis ou danificadas e avaliação de possibilidades de recuperação.',
    fullDescription: 'Seu HD ou partição passou a exibir formato RAW, perdeu a tabela de partição ou deixou de abrir no Windows? Diagnosticamos a viabilidade de reconstrução da tabela de alocação de arquivos.',
    included: [
      'Diagnóstico de setores de boot e tabela GPT/MBR',
      'Tentativa de restauração de tabela de partições lógica',
      'Parecer técnico claro',
    ],
    importantInfo: 'Sob orçamento. Não garantimos recuperação em dispositivos com setores físicos danificados (bad blocks severos).',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['particao raw', 'recuperacao de particoes', 'disco inacessivel', 'particao perdida', 'tabela mbr'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: false,
  },
  {
    id: 'arm-migracao-dados',
    name: 'Migração completa de dados',
    category: 'armazenamento',
    description: 'Transferência organizada de arquivos e dados entre computadores e dispositivos.',
    fullDescription: 'Comprou um computador novo e precisa trazer toda a sua rotina do antigo? Transferimos seus documentos, downloads, fotos e dados organizados diretamente para o novo equipamento.',
    included: [
      'Conexão direta de alta velocidade entre dispositivos',
      'Mapeamento e cópia das pastas de usuário',
      'Validação de abertura e integridade no destino',
    ],
    importantInfo: 'Sob orçamento conforme a quantidade total de gigabytes a transferir.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['migracao completa de dados', 'passar arquivos para pc novo', 'transferir dados computador', 'trocar de pc'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: true,
  },
  {
    id: 'arm-nuvem',
    name: 'Configuração de armazenamento em nuvem',
    category: 'armazenamento',
    description: 'Configuração de rotinas de backup, sincronização e organização de arquivos na nuvem.',
    fullDescription: 'Proteja seus documentos contra perda ou roubo configurando sincronização automática no Google Drive, OneDrive ou Dropbox no seu computador e celular.',
    included: [
      'Instalação do cliente de sincronização oficial',
      'Seleção de pastas críticas para backup automático',
      'Orientação de uso e visualização dos arquivos pela internet',
    ],
    importantInfo: 'Sob orçamento. Utiliza contas gratuitas ou assinaturas do próprio cliente.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['armazenamento em nuvem', 'google drive', 'onedrive', 'dropbox', 'sincronizar arquivos', 'backup em nuvem'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: false,
  },

  // =========================================================================
  // CATEGORIA 6: DOCUMENTOS E PRODUTIVIDADE
  // =========================================================================
  {
    id: 'doc-apresentacoes',
    name: 'Criação de apresentações profissionais',
    category: 'documentos',
    description: 'Slides para trabalhos escolares, apresentações comerciais e projetos.',
    fullDescription: 'Desenvolvimento visual de slides modernos e impactantes para defesas acadêmicas, reuniões corporativas e apresentações de propostas de negócios.',
    included: [
      'Design padronizado e paleta equilibrada',
      'Inserção de gráficos, ícones e diagramas explicativos',
      'Entrega em formato editável (PowerPoint / Canva) e PDF',
    ],
    importantInfo: 'Orçamento personalizado conforme a quantidade de slides, nível de complexidade e prazo de entrega.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['slides', 'powerpoint', 'apresentacao de slides', 'slides de tcc', 'apresentacao comercial', 'canva'],
    estimatedTime: 'Conforme prazo',
    deviceRequired: false,
  },
  {
    id: 'doc-criacao-documentos',
    name: 'Criação e formatação de documentos',
    category: 'documentos',
    description: 'Documentos personalizados, relatórios e materiais digitais.',
    fullDescription: 'Digitação, padronização e estruturação visual de relatórios, memorandos, apostilas e documentos profissionais no Microsoft Word ou Google Docs.',
    included: [
      'Alinhamento tipográfico, margens e paginação',
      'Criação de sumário dinâmico e tabelas estruturadas',
      'Exportação com acabamento profissional para impressão ou envio digital',
    ],
    importantInfo: 'Orçamento personalizado conforme quantidade de páginas e complexidade do conteúdo.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['criacao de documentos', 'formatar texto', 'relatorio', 'word', 'documentos digitais'],
    estimatedTime: 'Conforme prazo',
    deviceRequired: false,
  },
  {
    id: 'doc-trabalhos-academicos',
    name: 'Formatação de trabalhos acadêmicos',
    category: 'documentos',
    description: 'Organização e formatação conforme os requisitos fornecidos pelo cliente, incluindo normas ABNT quando aplicáveis.',
    fullDescription: 'Padronização minuciosa de TCCs, monografias, dissertações e artigos: margens, espaçamentos, fontes, numeração de páginas, sumário dinâmico clicável e adequação de citações e referências bibliográficas.',
    included: [
      'Aplicação rigorosa das diretrizes de formatação (ABNT/APA ou manual da faculdade)',
      'Sumário automático e dinâmico',
      'Numeração sequencial e quebras de seção corretas',
      'Padronização de referências e citações',
    ],
    importantInfo: 'Orçamento personalizado conforme a quantidade total de páginas e prazo solicitado pelo estudante.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: [
      'abnt', 'formatacao de trabalhos academicos', 'formatar tcc', 'monografia abnt',
      'artigo academico', 'sumario automatico', 'normas abnt'
    ],
    estimatedTime: 'Conforme prazo',
    deviceRequired: false,
  },
  {
    id: 'doc-curriculos',
    name: 'Criação de currículos',
    category: 'documentos',
    description: 'Elaboração e organização visual de currículos profissionais.',
    fullDescription: 'Apresente suas qualificações de forma moderna e atraente para recrutadores. Estruturação visual limpa, hierarquia de informações e destaque para competências chave.',
    included: [
      'Estruturação estratégica de dados profissionais',
      'Design limpo e legível compatível com sistemas de RH',
      'Entrega em formato PDF de alta qualidade e versão editável',
    ],
    importantInfo: 'Orçamento personalizado conforme a complexidade e histórico profissional.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['curriculo', 'fazer curriculo', 'curriculo profissional', 'modelo de curriculo', 'curriculo em pdf'],
    estimatedTime: 'Conforme prazo',
    deviceRequired: false,
  },
  {
    id: 'doc-edicao-pdf',
    name: 'Edição e conversão de PDFs',
    category: 'documentos',
    description: 'Conversão, organização e edição de documentos digitais.',
    fullDescription: 'Junte múltiplos arquivos em um só, divida páginas, reduza o tamanho para anexar em e-mails e converta documentos PDF para Word editável com fidelidade.',
    included: [
      'União, divisão ou extração de páginas selecionadas',
      'Compressão otimizada sem perda de leitura',
      'Conversão para formatos editáveis (DOCX / XLSX)',
    ],
    importantInfo: 'Orçamento personalizado conforme a quantidade de arquivos e páginas.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['pdf', 'editar pdf', 'converter pdf', 'juntar pdf', 'comprimir pdf', 'diminuir tamanho pdf'],
    estimatedTime: 'Conforme prazo',
    deviceRequired: false,
  },
  {
    id: 'doc-planilhas',
    name: 'Criação de planilhas',
    category: 'documentos',
    description: 'Planilhas de controle financeiro, estoque, organização e produtividade.',
    fullDescription: 'Desenvolvimento de planilhas sob medida no Microsoft Excel ou Google Planilhas para simplificar o controle do seu negócio ou finanças pessoais.',
    included: [
      'Estruturação visual intuitiva de colunas e dados',
      'Cálculos automáticos essenciais',
      'Proteção de células para evitar alterações acidentais',
    ],
    importantInfo: 'Orçamento personalizado conforme a quantidade de abas e complexidade.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['planilha', 'excel', 'google planilhas', 'planilha financeira', 'planilha de estoque', 'fazer planilha'],
    estimatedTime: 'Conforme prazo',
    deviceRequired: false,
  },
  {
    id: 'doc-automacao-planilhas',
    name: 'Automação de planilhas',
    category: 'documentos',
    description: 'Fórmulas, validações, cálculos e automações para facilitar tarefas repetitivas.',
    fullDescription: 'Aumente sua produtividade eliminando retrabalho com fórmulas avançadas (PROCV/XLOOKUP, SOMASE, SE, filtros dinâmicos) e dashboards visuais interativos.',
    included: [
      'Implementação de fórmulas dinâmicas e validação de dados',
      'Dashboards e resumos com gráficos interativos',
      'Suporte a dúvidas pós-entrega',
    ],
    importantInfo: 'Orçamento personalizado conforme a complexidade dos cálculos e regras de negócio.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['automacao de planilhas', 'formulas excel', 'procv', 'dashboard excel', 'macros planilhas'],
    estimatedTime: 'Conforme prazo',
    deviceRequired: false,
  },
  {
    id: 'doc-materiais-graficos',
    name: 'Criação de materiais gráficos digitais',
    category: 'documentos',
    description: 'Convites, certificados, artes informativas e materiais personalizados.',
    fullDescription: 'Criação de peças digitais com design atraente para circulação no WhatsApp e redes sociais: convites interativos com botões clicáveis, certificados de cursos e comunicados visuais.',
    included: [
      'Design personalizado alinhado ao objetivo',
      'Inserção de links clicáveis quando aplicável',
      'Entrega em alta resolução nos formatos PNG e PDF',
    ],
    importantInfo: 'Orçamento personalizado conforme a arte solicitada.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['materiais graficos digitais', 'convite digital', 'certificado digital', 'arte digital', 'panfleto digital'],
    estimatedTime: 'Conforme prazo',
    deviceRequired: false,
  },

  // =========================================================================
  // CATEGORIA 7: SOLUÇÕES DIGITAIS ESPECIALIZADAS
  // =========================================================================
  {
    id: 'dig-sites',
    name: 'Desenvolvimento de sites e páginas comerciais',
    category: 'solucoes-digitais',
    description: 'Criação de sites institucionais simples e páginas de apresentação para pequenos negócios.',
    fullDescription: 'Tenha presença digital profissional na internet com um site moderno, rápido e adaptado para smartphones para apresentar seus serviços e receber contatos no WhatsApp.',
    included: [
      'Design responsivo mobile-first profissional',
      'Integração direta com botão de WhatsApp e contatos',
      'Otimização básica de velocidade e carregamento rápido',
    ],
    importantInfo: 'Orçamento personalizado conforme a quantidade de seções e funcionalidades requeridas.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['desenvolvimento de sites', 'criar site', 'pagina comercial', 'site institucional', 'landing page'],
    estimatedTime: 'Conforme prazo',
    deviceRequired: false,
  },
  {
    id: 'dig-ambientes-software',
    name: 'Configuração de ambientes de software',
    category: 'solucoes-digitais',
    description: 'Preparação de ambientes de trabalho, instalação de dependências e configuração de softwares específicos.',
    fullDescription: 'Preparação de ambientes para desenvolvedores, designers e profissionais técnicos: instalação de IDEs, interpretadores, terminais e pacotes de utilitários específicos.',
    included: [
      'Instalação de ferramentas técnicas autorizadas',
      'Configuração de variáveis de ambiente e caminhos de sistema',
      'Testes de compilação/execução básica',
    ],
    importantInfo: 'Sob orçamento conforme a complexidade do stack tecnológico requerido.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: ['ambientes de software', 'configuracao de ambiente', 'instalar programas tecnicos', 'desenvolvimento'],
    estimatedTime: 'Sob avaliação',
    deviceRequired: false,
  },
  {
    id: 'dig-personalizados',
    name: 'Solução de problemas tecnológicos personalizados',
    category: 'solucoes-digitais',
    description: 'Análise de problemas técnicos não contemplados diretamente no catálogo.',
    fullDescription: 'Tem um desafio técnico ou problema de tecnologia que não encontrou na lista? Fale conosco! Avaliaremos o caso individualmente para verificar como podemos ajudar com nossa experiência técnica.',
    included: [
      'Análise inicial do problema relatado',
      'Avaliação de viabilidade técnica da solução',
      'Proposta transparente de atendimento',
    ],
    importantInfo: 'Sob orçamento após avaliação inicial via WhatsApp.',
    price: 0,
    priceType: 'under_review',
    availability: 'sob_consulta',
    featured: false,
    keywords: [
      'solucao de problemas tecnologicos', 'ajuda com tecnologia', 'problema personalizado',
      'suporte especializado', 'consultoria tecnica'
    ],
    estimatedTime: 'Sob avaliação',
    deviceRequired: false,
  },
];

/**
 * Retorna a formatação oficial do preço para exibição no card e detalhes.
 */
export function formatPrice(service: Pick<ServiceItem, 'price' | 'priceType' | 'customPriceLabel'>): string {
  if (service.customPriceLabel) {
    return service.customPriceLabel;
  }
  if (service.priceType === 'under_review') {
    return 'Solicitar orçamento';
  }
  const formatted = service.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (service.priceType === 'starting_at') {
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

/**
 * Mensagens estruturadas de WhatsApp conforme especificação do projeto.
 */
export function buildServiceWhatsAppUrl(service: ServiceItem): string {
  let message = '';

  if (service.id === 'pacote-formatacao-backup' || service.isPackage) {
    message = 'Olá! Quero solicitar o pacote Formatação + Backup de Celular, anunciado a partir de R$ 40,00.';
  } else if (service.priceType === 'under_review') {
    message = `Olá! Gostaria de solicitar um orçamento para ${service.name}.`;
  } else {
    const priceText = formatPrice(service);
    message = `Olá! Vi no site da MK Tech o serviço ${service.name}, com preço anunciado de ${priceText}. Gostaria de solicitar atendimento.`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Mensagem do bloco "Não encontrou o serviço que procurava?"
 */
export function buildNotFoundWhatsAppUrl(searchQuery?: string): string {
  const trimmed = searchQuery ? searchQuery.trim() : '';
  let message = '';

  if (trimmed.length > 0) {
    message = `Olá! Pesquisei por '${trimmed}' no site da MK Tech, mas gostaria de saber se vocês podem me ajudar.`;
  } else {
    message = 'Olá! Não encontrei o serviço que preciso no site da MK Tech. Gostaria de solicitar uma avaliação.';
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
