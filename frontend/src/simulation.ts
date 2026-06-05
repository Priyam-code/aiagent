// Simulates the Python pipeline with realistic data and timing
import { PipelineStep, LogEntry } from './types';

const generateId = () => Math.random().toString(36).substring(2, 9);

function createLog(step: PipelineStep, message: string, type: LogEntry['type'] = 'info'): LogEntry {
  return { id: generateId(), timestamp: Date.now(), step, message, type };
}

const SEARCH_RESULTS_DATA: Record<string, string> = {
  default: `### Search Results Summary

**1. Recent Advances & Key Findings**
- Multiple authoritative sources identified across academic databases, news outlets, and industry reports
- Found 12 relevant articles from the past 6 months
- Key themes: technological innovation, market impact, regulatory considerations

**2. Top Sources Identified**
- \`arxiv.org\` — Latest research papers and preprints
- \`techcrunch.com\` — Industry analysis and trends
- \`nature.com\` — Peer-reviewed scientific findings
- \`reuters.com\` — Market and economic impact analysis

**3. Preliminary Insights**
- The field is experiencing rapid growth with a 47% year-over-year increase in publications
- Major breakthroughs reported in Q4 2025 and Q1 2026
- Several leading institutions have published comprehensive reviews
- Cross-disciplinary applications emerging in healthcare, finance, and education

**4. Data Quality Assessment**
- Primary sources: 8 peer-reviewed papers
- Secondary sources: 4 industry reports
- Recency: All sources within last 6 months
- Reliability score: 9.2/10`,
};

const SCRAPED_CONTENT_DATA: Record<string, string> = {
  default: `## Deep Content Analysis

### Executive Overview
After thorough analysis of the top-ranked resources, here is the detailed breakdown of findings:

---

#### Section 1: Current State of the Art
The landscape has evolved significantly over the past year. Key developments include:
- **Breakthrough #1**: Novel architectures achieving state-of-the-art performance on benchmark datasets, surpassing previous records by 23%
- **Breakthrough #2**: Cost reduction in implementation by approximately 60%, making widespread adoption feasible
- **Breakthrough #3**: New regulatory frameworks established in the EU, US, and Asia-Pacific regions

#### Section 2: Technical Deep Dive
The underlying technology leverages several key innovations:
1. **Advanced Algorithms** — Improved efficiency through novel optimization techniques, reducing computational overhead by 40%
2. **Scalable Infrastructure** — Cloud-native architectures enabling real-time processing at petabyte scale
3. **Enhanced Security** — Zero-trust models with end-to-end encryption and differential privacy guarantees

#### Section 3: Market Analysis
- Total addressable market projected at $847B by 2028
- Current adoption rate: 34% among Fortune 500 companies
- Average ROI for early adopters: 312% over 3 years
- Key players: Google DeepMind, OpenAI, Anthropic, Meta AI, Microsoft Research

#### Section 4: Challenges & Limitations
- Data quality and bias remain significant concerns
- Energy consumption and environmental impact under scrutiny
- Talent shortage affecting 67% of organizations
- Interoperability standards still evolving

#### Section 5: Future Outlook
Industry experts predict:
- Mainstream adoption within 2-3 years
- Integration with quantum computing by 2028
- New applications in personalized medicine and climate modeling
- Potential GDP impact of $15.7 trillion by 2030`,
};

function generateReport(topic: string): string {
  return `# Research Report: ${topic}

---

## Abstract
This comprehensive report synthesizes findings from multiple authoritative sources to provide an in-depth analysis of **${topic}**. Our research pipeline identified 12 primary sources, conducted deep content extraction from the top-ranked resources, and compiled the following evidence-based analysis.

---

## 1. Introduction
${topic} represents one of the most dynamic and rapidly evolving areas in the current technological and scientific landscape. This report examines recent developments, current challenges, and future trajectories based on peer-reviewed research, industry analyses, and expert commentary.

## 2. Background & Context
The foundation of ${topic} rests on decades of cumulative research. However, recent breakthroughs have dramatically accelerated progress:
- **Historical Milestones**: Key developments in 2023-2025 established the groundwork
- **Catalytic Events**: Several pivotal publications and demonstrations in late 2025 catalyzed renewed interest
- **Current Momentum**: Investment and research output have increased by 47% year-over-year

## 3. Key Findings

### 3.1 Technical Innovations
Our analysis reveals three primary technical innovations driving the field forward:

1. **Novel Architectures**: New computational models achieving state-of-the-art performance, with a 23% improvement over previous benchmarks
2. **Efficiency Gains**: Implementation costs reduced by approximately 60% through algorithmic optimization and hardware advances
3. **Scalability Solutions**: Cloud-native approaches enabling real-time processing at unprecedented scale

### 3.2 Market Dynamics
- Total addressable market: **$847 billion** by 2028 (CAGR: 38.1%)
- Fortune 500 adoption rate: **34%** and growing
- Average return on investment: **312%** over 3 years for early adopters
- Venture capital funding: **$12.4B** in 2025 alone

### 3.3 Regulatory Landscape
- EU AI Act implementation progressing as scheduled
- US Executive Orders establishing new guidelines
- Asia-Pacific nations developing harmonized frameworks
- Industry self-regulation initiatives gaining traction

## 4. Challenges & Considerations

| Challenge | Severity | Mitigation Status |
|-----------|----------|-------------------|
| Data Quality & Bias | High | Active research |
| Energy Consumption | Medium | Improving |
| Talent Shortage | High | Education initiatives |
| Interoperability | Medium | Standards emerging |
| Privacy Concerns | High | Regulatory frameworks |

## 5. Expert Perspectives
Leading researchers and industry leaders have highlighted:
> *"We are at an inflection point where the theoretical potential is being realized in practical applications at scale."* — Industry Expert

> *"The convergence of advances in compute, data, and algorithms is creating opportunities we couldn't have imagined five years ago."* — Research Director

## 6. Future Outlook
Based on current trajectories and expert analysis:
- **Short-term (1-2 years)**: Mainstream enterprise adoption, standardized tooling
- **Medium-term (3-5 years)**: Integration with quantum computing, personalized applications
- **Long-term (5-10 years)**: Transformative societal impact, potential GDP contribution of $15.7 trillion

## 7. Conclusions
${topic} is poised for significant growth and impact. Key takeaways include:
1. Technical maturity is approaching critical mass
2. Market conditions are favorable for accelerated adoption
3. Regulatory frameworks are evolving to balance innovation with safety
4. Cross-disciplinary applications represent the greatest opportunity

## 8. Methodology
This report was generated using an AI-powered multi-agent research pipeline:
- **Search Agent**: Web-scale information retrieval with relevance ranking
- **Reader Agent**: Deep content extraction and analysis
- **Writer Agent**: Evidence-based report synthesis
- **Critic Agent**: Quality assurance and feedback

---

*Report generated by AI Research Pipeline v2.0*
*Sources: 12 primary references, 4 industry reports*
*Confidence Score: 94.2%*`;
}

function generateFeedback(topic: string): string {
  return `## Critic's Review & Feedback

### Overall Assessment: ⭐ 8.7 / 10

---

### ✅ Strengths

1. **Comprehensive Coverage**: The report thoroughly covers technical, market, and regulatory dimensions of ${topic}
2. **Data-Driven Analysis**: Strong use of quantitative data — market projections, adoption rates, and ROI metrics lend credibility
3. **Structured Organization**: Clear hierarchical structure with logical flow from background → findings → outlook
4. **Balanced Perspective**: Both opportunities and challenges are addressed, avoiding one-sided optimism
5. **Source Diversity**: Multiple source types (academic, industry, news) provide a well-rounded view

### ⚠️ Areas for Improvement

1. **Citation Specificity**: While sources are mentioned broadly, specific paper titles, DOIs, and publication dates would strengthen verifiability
2. **Counterarguments**: Could benefit from more explicit discussion of skeptical viewpoints
3. **Regional Analysis**: The report could expand on geographical variations in adoption and regulation
4. **Case Studies**: Adding 2-3 specific real-world implementation examples would enhance practical value
5. **Methodology Transparency**: The confidence score methodology should be explained in greater detail

### 📊 Scoring Breakdown

| Criterion | Score | Notes |
|-----------|-------|-------|
| Accuracy | 9/10 | Claims align well with known data |
| Completeness | 8/10 | Good coverage, minor gaps noted |
| Clarity | 9/10 | Well-written, professional tone |
| Objectivity | 8/10 | Generally balanced |
| Actionability | 8.5/10 | Clear takeaways provided |
| Source Quality | 8.5/10 | Reliable sources, could be more specific |

### 🔧 Recommended Revisions
1. Add specific citations with links to primary sources
2. Include a "Competing Perspectives" section
3. Add regional breakdown of adoption data
4. Include 2-3 detailed case studies
5. Expand the methodology section with confidence interval calculations

### 📝 Final Verdict
> The report provides a solid, well-structured analysis of ${topic}. It effectively synthesizes information from multiple sources and presents actionable insights. With the recommended revisions—particularly around citation specificity and case studies—this report would reach publication-quality standards. **Recommended for use with noted caveats.**`;
}

export interface SimulationCallbacks {
  onStepChange: (step: PipelineStep) => void;
  onLog: (log: LogEntry) => void;
  onSearchResults: (data: string) => void;
  onScrapedContent: (data: string) => void;
  onReport: (data: string) => void;
  onFeedback: (data: string) => void;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function runSimulation(topic: string, callbacks: SimulationCallbacks): Promise<void> {
  const { onStepChange, onLog, onSearchResults, onScrapedContent, onReport, onFeedback } = callbacks;

  // Step 1: Search
  onStepChange('searching');
  onLog(createLog('searching', `Initializing search agent for topic: "${topic}"`, 'info'));
  await delay(800);
  onLog(createLog('searching', 'Connecting to search APIs (Tavily, Google Scholar)...', 'info'));
  await delay(1200);
  onLog(createLog('searching', 'Query dispatched — scanning 50+ sources...', 'info'));
  await delay(1500);
  onLog(createLog('searching', 'Filtering results by relevance and recency...', 'info'));
  await delay(1000);
  onLog(createLog('searching', 'Ranked 12 high-quality sources identified', 'success'));
  await delay(600);
  const searchData = SEARCH_RESULTS_DATA.default;
  onSearchResults(searchData);
  onLog(createLog('searching', '✓ Search phase complete — 12 sources found', 'success'));
  await delay(500);

  // Step 2: Reader
  onStepChange('reading');
  onLog(createLog('reading', 'Analyzing search results to select top URLs...', 'info'));
  await delay(1000);
  onLog(createLog('reading', 'Target identified: arxiv.org/abs/2025.12345', 'info'));
  await delay(800);
  onLog(createLog('reading', 'Launching headless browser for content extraction...', 'info'));
  await delay(1500);
  onLog(createLog('reading', 'Parsing DOM structure and extracting main content...', 'info'));
  await delay(1200);
  onLog(createLog('reading', 'Scraping secondary source: techcrunch.com/analysis/...', 'info'));
  await delay(1000);
  onLog(createLog('reading', 'Content cleaned and structured — 4,200 words extracted', 'success'));
  await delay(600);
  const scrapedData = SCRAPED_CONTENT_DATA.default;
  onScrapedContent(scrapedData);
  onLog(createLog('reading', '✓ Reader phase complete — deep content extracted', 'success'));
  await delay(500);

  // Step 3: Writer
  onStepChange('writing');
  onLog(createLog('writing', 'Combining search results with scraped content...', 'info'));
  await delay(800);
  onLog(createLog('writing', 'Invoking LLM writer chain (GPT-4o)...', 'info'));
  await delay(1200);
  onLog(createLog('writing', 'Generating report structure and outline...', 'info'));
  await delay(1500);
  onLog(createLog('writing', 'Writing executive summary and introduction...', 'info'));
  await delay(1200);
  onLog(createLog('writing', 'Synthesizing key findings with supporting data...', 'info'));
  await delay(1500);
  onLog(createLog('writing', 'Drafting conclusions and future outlook...', 'info'));
  await delay(1000);
  onLog(createLog('writing', 'Formatting tables and citations...', 'info'));
  await delay(800);
  const reportData = generateReport(topic);
  onReport(reportData);
  onLog(createLog('writing', '✓ Report drafted — 2,400 words, 8 sections', 'success'));
  await delay(500);

  // Step 4: Critic
  onStepChange('critiquing');
  onLog(createLog('critiquing', 'Submitting report for critical review...', 'info'));
  await delay(1000);
  onLog(createLog('critiquing', 'Analyzing accuracy and factual consistency...', 'info'));
  await delay(1200);
  onLog(createLog('critiquing', 'Evaluating completeness and source quality...', 'info'));
  await delay(1000);
  onLog(createLog('critiquing', 'Checking for bias and objectivity...', 'info'));
  await delay(1200);
  onLog(createLog('critiquing', 'Generating detailed scoring and recommendations...', 'info'));
  await delay(1000);
  const feedbackData = generateFeedback(topic);
  onFeedback(feedbackData);
  onLog(createLog('critiquing', '✓ Review complete — Score: 8.7/10', 'success'));
  await delay(500);

  // Complete
  onStepChange('complete');
  onLog(createLog('complete', '🎉 Research pipeline finished successfully!', 'success'));
}
