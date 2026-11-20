# MK TECH — Plataforma de Serviços Digitais e Assistência Técnica

Plataforma moderna, profissional e de alta performance desenvolvida sob medida para a **MK Tech**, especializada em assistência técnica de software, celulares, computadores, formatação acadêmica e serviços digitais.

---

## 🚀 Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4 (Paleta de alta fidelidade: Azul-marinho, Azul elétrico e Ciano)
- **Ícones:** Lucide React
- **Imagens:** Sharp / Otimização WebP com canal alfa transparente

---

## 📱 Destaques do Projeto

1. **Mobile-First Real:** Projetado para a melhor experiência em smartphones (área de toque confortável, gavetas de navegação, bottom-sheets e zero rolagem horizontal indesejada).
2. **Hero Section com Mascote Oficial:** Integração do personagem cartoon segurando o celular e apontando, com transparência tratada e efeito aura tecnológico.
3. **Catálogo Interativo Completo:**
   - Pesquisa dinâmica por nome, sintomas, palavras-chave e categorias.
   - Filtros por categoria (Celulares, Computadores, Documentos/Slides, Serviços Digitais).
   - Filtro por disponibilidade (Disponível, Sob consulta, Indisponível).
   - Ordenação inteligente por Menor preço, Maior preço, Ordem alfabética e Recomendados.
   - Modo "Apenas em Destaque".
4. **Modal de Detalhes e Solicitação via WhatsApp:**
   - Visualização do que está incluso, prazos médios e observações de segurança.
   - Formulário validado que compõe e envia uma mensagem organizada direto para o WhatsApp oficial: **+55 38 99912-5035**.
5. **Dúvidas Frequentes (FAQ):** Acordeões interativos com respostas claras e transparentes.

---

## 📂 Como Atualizar ou Adicionar Serviços

Todos os dados de serviços estão centralizados no arquivo:
📁 `src/data/services.ts`

**Nenhum dado de serviço fica espalhado nos componentes visuais.**

### Exemplo de Estrutura de um Serviço:

```typescript
{
  id: 'meu-novo-servico',
  name: 'Nome do Serviço',
  category: 'computadores', // 'celulares' | 'computadores' | 'documentos' | 'digitais'
  description: 'Descrição curta para o card...',
  fullDescription: 'Descrição completa detalhada para o modal...',
  included: [
    'Item incluso 1',
    'Item incluso 2'
  ],
  importantInfo: 'Observações importantes (opcional)...',
  price: 80, // Valor numérico base para ordenação
  priceType: 'starting_at', // 'fixed' | 'starting_at' | 'under_review'
  availability: 'disponivel', // 'disponivel' | 'sob_consulta' | 'indisponivel'
  featured: true, // true para aparecer na seção de destaques
  keywords: ['palavra1', 'palavra2', 'sintoma'],
  estimatedTime: '2 a 4 horas',
  deviceRequired: true // Se true, o formulário pede o modelo do aparelho
}
```

Quando você tiver a lista final de serviços, basta editar a constante `INITIAL_SERVICES` em `src/data/services.ts`!

---

## 🛠️ Comandos de Execução

```bash
# Instalar dependências
npm install

# Iniciar servidor em desenvolvimento
npm run dev

# Gerar build de produção otimizado
npm run build

# Executar servidor de produção
npm run start
```
