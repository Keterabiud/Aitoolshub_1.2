// src/App.tsx - COMPLETE SINGLE-FILE SOLUTION
import { useState, useEffect } from 'react'
import { 
  Search, Star, ExternalLink, Menu, X, Sun, Moon, 
  MessageSquare, Image as ImageIcon, Video, PenTool, 
  Code, Headphones, Zap, Brain, Music, ChevronRight,
  Shield, Twitter, Linkedin, Youtube, Mail, Sparkles,
  AudioLines, Search as SearchIcon, Globe, Bot,
  FileText, Wand2, BarChart3, Layers
} from 'lucide-react'

// ==========================================
// TYPES
// ==========================================
interface Tool {
  id: string
  name: string
  tagline: string
  description: string
  category: string
  rating: number
  reviews: number
  pricing: string
  deal: string | null
  affiliateUrl: string
  features: string[]
  bestFor: string[]
}

interface Category {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: 'cyan' | 'purple' | 'pink' | 'green'
  count: number
  growth: string
}

interface ComparisonRow {
  tool: string
  tagline: string
  bestFor: string
  pricing: string
  freeTier: boolean
  features: string[]
  integrations: string[]
  rating: number
  support: string
  affiliateUrl: string
  deal: string | null
}

interface Review {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  author: string
  date: string
  hasAffiliateLink: boolean
  sponsored: boolean
}

// ==========================================
// DATA - 12 PREMIUM AI TOOLS
// ==========================================
const toolsData: Tool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    tagline: 'The AI that started the revolution',
    description: 'OpenAI flagship with GPT-4o, reasoning, coding, image generation, and 100M+ users. The most versatile AI assistant for any task.',
    category: 'Chatbots',
    rating: 4.8,
    reviews: 125000,
    pricing: 'Free / $20/mo Plus',
    deal: 'Free tier available',
    affiliateUrl: 'https://chat.openai.com?ref=yourid',
    features: ['GPT-4o', 'DALL-E 3', 'Code Interpreter', 'Custom GPTs', 'Web Browsing'],
    bestFor: ['Writing', 'Coding', 'Analysis', 'Creative tasks']
  },
  {
    id: 'claude',
    name: 'Claude 3.5',
    tagline: 'The most thoughtful AI',
    description: "Anthropic's most capable model with 200K context, superior reasoning, and honest responses. Best for complex documents and analysis.",
    category: 'Chatbots',
    rating: 4.9,
    reviews: 45000,
    pricing: 'Free / $20/mo Pro',
    deal: '2x usage on Pro',
    affiliateUrl: 'https://claude.ai?ref=yourid',
    features: ['200K Context', 'Claude 3.5 Sonnet', 'Artifacts', 'Projects', 'API'],
    bestFor: ['Long documents', 'Research', 'Coding', 'Analysis']
  },
  {
    id: 'gemini',
    name: 'Gemini Advanced',
    tagline: "Google's most capable AI",
    description: 'Multimodal AI with 1M token context, native Google Workspace integration, and real-time information access.',
    category: 'Chatbots',
    rating: 4.6,
    reviews: 38000,
    pricing: 'Free / $20/mo',
    deal: '2 months free',
    affiliateUrl: 'https://gemini.google.com?ref=yourid',
    features: ['1M Context', 'Gemini 1.5 Pro', 'Workspace', 'Gmail/ Docs', 'Multimodal'],
    bestFor: ['Google users', 'Research', 'Documents', 'Multimodal']
  },
  {
    id: 'perplexity',
    name: 'Perplexity Pro',
    tagline: 'AI search with sources',
    description: 'Conversational AI search engine providing cited, real-time answers from the web. No hallucinations, all facts verified.',
    category: 'Research',
    rating: 4.9,
    reviews: 52000,
    pricing: 'Free / $20/mo',
    deal: '$10 first month',
    affiliateUrl: 'https://perplexity.ai?ref=yourid',
    features: ['Real-time Search', 'Citations', 'Pro Search', 'Focus Modes', 'Copilot'],
    bestFor: ['Research', 'Fact-checking', 'Learning', 'News']
  },
  {
    id: 'midjourney',
    name: 'Midjourney v6',
    tagline: 'The best AI art generator',
    description: 'Stunning artistic images, photorealistic renders, and creative visuals from text. The gold standard for AI image generation.',
    category: 'Image',
    rating: 4.9,
    reviews: 89000,
    pricing: '$10-120/mo',
    deal: null,
    affiliateUrl: 'https://midjourney.com?ref=yourid',
    features: ['V6 Engine', 'Style Raw', 'Pan/Zoom', 'Variations', 'Commercial use'],
    bestFor: ['Art', 'Marketing', 'Design', 'Concept art']
  },
  {
    id: 'runway',
    name: 'Runway Gen-3',
    tagline: 'AI video generation leader',
    description: 'Professional AI video creation with Gen-3 Alpha. Text-to-video, image-to-video, and advanced editing tools.',
    category: 'Video',
    rating: 4.7,
    reviews: 28000,
    pricing: '$15-95/mo',
    deal: 'Free trial',
    affiliateUrl: 'https://runwayml.com?ref=yourid',
    features: ['Gen-3 Alpha', 'Motion Brush', 'Infinite Image', 'Green Screen', 'API'],
    bestFor: ['Video ads', 'Social media', 'Filmmaking', 'Content']
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    tagline: 'Most realistic AI voices',
    description: 'Industry-leading text-to-speech with voice cloning, 29 languages, and emotion control. Indistinguishable from human speech.',
    category: 'Audio',
    rating: 4.9,
    reviews: 67000,
    pricing: '$5-330/mo',
    deal: '22% off annual',
    affiliateUrl: 'https://elevenlabs.io?ref=yourid',
    features: ['Voice Cloning', '29 Languages', 'Projects', 'Turbo v2.5', 'API'],
    bestFor: ['Audiobooks', 'Voiceover', 'Content', 'Games']
  },
  {
    id: 'suno',
    name: 'Suno v3',
    tagline: 'AI music creation',
    description: 'Create full songs with vocals, instruments, and lyrics from text prompts. Professional quality music in seconds.',
    category: 'Audio',
    rating: 4.7,
    reviews: 34000,
    pricing: 'Free / $10/mo',
    deal: 'Pro monthly free',
    affiliateUrl: 'https://suno.ai?ref=yourid',
    features: ['Full Songs', 'Custom Lyrics', 'Styles', 'Vocal Remover', 'Commercial'],
    bestFor: ['Musicians', 'Content', 'Ads', 'Podcasts']
  },
  {
    id: 'jasper',
    name: 'Jasper',
    tagline: 'AI writing for teams',
    description: 'Enterprise AI writing platform with brand voice, SEO optimization, and marketing templates. 25-30% recurring commission.',
    category: 'Writing',
    rating: 4.6,
    reviews: 18000,
    pricing: '$49-125/mo',
    deal: '20% off annual',
    affiliateUrl: 'https://jasper.ai?ref=yourid',
    features: ['Brand Voice', 'SEO Mode', '50+ Templates', 'Campaigns', 'API'],
    bestFor: ['Marketing', 'Teams', 'SEO content', 'Enterprise']
  },
  {
    id: 'copyai',
    name: 'Copy.ai',
    tagline: 'Marketing copy at scale',
    description: 'AI copywriting with workflow automation, chat, and 90+ tools. Best for high-volume marketing teams.',
    category: 'Writing',
    rating: 4.5,
    reviews: 22000,
    pricing: 'Free / $36/mo',
    deal: '40% off Pro',
    affiliateUrl: 'https://copy.ai?ref=yourid',
    features: ['Chat', 'Workflows', '90+ Tools', 'Brand Voice', 'Infobase'],
    bestFor: ['Copywriting', 'Ads', 'Emails', 'Social']
  },
  {
    id: 'synthesia',
    name: 'Synthesia',
    tagline: '#1 AI video platform',
    description: 'Create professional videos with 140+ AI avatars, 120+ languages, and no equipment needed. 25% recurring commission.',
    category: 'Video',
    rating: 4.7,
    reviews: 15000,
    pricing: '$22-66/mo',
    deal: 'Free demo',
    affiliateUrl: 'https://synthesia.io?ref=yourid',
    features: ['140+ Avatars', '120+ Languages', 'Templates', 'Screen Recorder', 'API'],
    bestFor: ['Training', 'Sales', 'Support', 'Global content']
  },
  {
    id: 'heygen',
    name: 'HeyGen',
    tagline: 'AI video with custom avatars',
    description: 'Create talking head videos with custom avatars, voice cloning, and translation. Fastest growing AI video tool.',
    category: 'Video',
    rating: 4.6,
    reviews: 12000,
    pricing: '$29-89/mo',
    deal: 'Free credits',
    affiliateUrl: 'https://heygen.com?ref=yourid',
    features: ['Custom Avatars', 'Voice Clone', 'Translation', 'Streaming', 'API'],
    bestFor: ['Marketing', 'Sales videos', 'Translation', 'Personalization']
  }
]

const categoriesData: Category[] = [
  { id: 'chatbots', name: 'AI Chatbots', description: 'Conversational AI for any task', icon: Bot, color: 'cyan', count: 15, growth: '+23%' },
  { id: 'image', name: 'Image Generation', description: 'Create stunning visuals with AI', icon: ImageIcon, color: 'purple', count: 22, growth: '+45%' },
  { id: 'video', name: 'Video Creation', description: 'AI-powered video production', icon: Video, color: 'pink', count: 14, growth: '+67%' },
  { id: 'writing', name: 'Writing & Copy', description: 'AI writing assistants and tools', icon: FileText, color: 'green', count: 18, growth: '+12%' },
  { id: 'audio', name: 'Audio & Voice', description: 'Voice, music, and sound AI', icon: AudioLines, color: 'cyan', count: 12, growth: '+89%' },
  { id: 'code', name: 'Coding & Dev', description: 'AI for developers and engineers', icon: Code, color: 'purple', count: 16, growth: '+34%' },
  { id: 'research', name: 'Research', description: 'AI search and knowledge tools', icon: SearchIcon, color: 'pink', count: 8, growth: '+56%' },
  { id: 'productivity', name: 'Productivity', description: 'Workflow automation and efficiency', icon: Zap, color: 'green', count: 20, growth: '+28%' }
]

const comparisonData: ComparisonRow[] = [
  {
    tool: 'ChatGPT Plus',
    tagline: 'Most versatile',
    bestFor: 'General use, creativity, coding',
    pricing: '$20/mo',
    freeTier: true,
    features: ['GPT-4o', 'DALL-E 3', 'Plugins', 'Voice'],
    integrations: ['5000+ plugins', 'API', 'Mobile apps'],
    rating: 4.8,
    support: 'Standard',
    affiliateUrl: 'https://chat.openai.com?ref=yourid',
    deal: null
  },
  {
    tool: 'Claude Pro',
    tagline: 'Best for documents',
    bestFor: 'Long-form, analysis, research',
    pricing: '$20/mo',
    freeTier: true,
    features: ['200K context', 'Artifacts', 'Projects', 'API'],
    integrations: ['API', 'Slack', 'Zapier'],
    rating: 4.9,
    support: 'Priority',
    affiliateUrl: 'https://claude.ai?ref=yourid',
    deal: '2x usage'
  },
  {
    tool: 'Gemini Advanced',
    tagline: 'Google power user',
    bestFor: 'Google users, multimodal',
    pricing: '$20/mo',
    freeTier: true,
    features: ['1M context', 'Workspace', 'Gmail/Docs', 'Multimodal'],
    integrations: ['Google Workspace', 'Android', 'API'],
    rating: 4.6,
    support: 'Standard',
    affiliateUrl: 'https://gemini.google.com?ref=yourid',
    deal: '2 months free'
  },
  {
    tool: 'Perplexity Pro',
    tagline: 'Best for research',
    bestFor: 'Search, facts, learning',
    pricing: '$20/mo',
    freeTier: true,
    features: ['GPT-4', 'Claude', 'Real-time', 'Copilot'],
    integrations: ['Chrome', 'iOS', 'API'],
    rating: 4.9,
    support: 'Standard',
    affiliateUrl: 'https://perplexity.ai?ref=yourid',
    deal: '$10 first month'
  }
]

const reviewsData: Review[] = [
  {
    id: '1',
    title: 'ChatGPT vs Claude vs Gemini: 2026 Power User Test',
    excerpt: 'We ran 500+ real-world tasks through all three models. Claude won on reasoning, ChatGPT on versatility, Gemini on speed. Here are the detailed results with benchmarks.',
    category: 'Chatbots',
    readTime: '15 min',
    author: 'Alex Chen',
    date: 'Jan 15, 2026',
    hasAffiliateLink: true,
    sponsored: false
  },
  {
    id: '2',
    title: 'Midjourney v6 vs DALL-E 3 vs Stable Diffusion 3',
    excerpt: 'The ultimate image generation showdown. We tested photorealism, artistic style, prompt adherence, and commercial usability across 1000+ prompts.',
    category: 'Image',
    readTime: '12 min',
    author: 'Sarah Kim',
    date: 'Jan 12, 2026',
    hasAffiliateLink: true,
    sponsored: false
  },
  {
    id: '3',
    title: 'ElevenLabs Review: Worth the Hype for Creators?',
    excerpt: 'Deep dive into voice cloning quality, pricing, API reliability, and ethical considerations. Plus comparison with Play.ht and Murf.ai.',
    category: 'Audio',
    readTime: '10 min',
    author: 'Mike Johnson',
    date: 'Jan 10, 2026',
    hasAffiliateLink: true,
    sponsored: true
  },
  {
    id: '4',
    title: 'Runway Gen-3 Alpha: First Hands-On Review',
    excerpt: "The new video generation model is here. We tested motion quality, consistency, and commercial viability. Is it the Sora killer we've been waiting for?",
    category: 'Video',
    readTime: '8 min',
    author: 'Lisa Park',
    date: 'Jan 8, 2026',
    hasAffiliateLink: true,
    sponsored: false
  }
]

// ==========================================
// COMPONENTS
// ==========================================
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : star <= rating ? 'fill-yellow-400/50 text-yellow-400' : 'text-gray-600'}`}
        />
      ))}
    </div>
  )
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="group relative bg-[#141414] rounded-2xl p-6 flex flex-col h-full border border-[#2a2a2a] hover:border-[#00f0ff] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,240,255,0.15)]">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f0ff]/20 to-[#00f0ff]/5 flex items-center justify-center text-[#00f0ff] font-bold text-xl">
          {tool.name[0]}
        </div>
        {tool.deal && (
          <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
            {tool.deal}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold mb-1 text-white group-hover:text-[#00f0ff] transition-colors">{tool.name}</h3>
      <p className="text-xs text-[#00f0ff]/80 mb-3 font-medium">{tool.tagline}</p>
      
      <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3 leading-relaxed">{tool.description}</p>

      <div className="mb-3">
        <StarRating rating={tool.rating} />
        <span className="text-xs text-gray-500 mt-1 block">{tool.reviews.toLocaleString()} reviews</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {tool.features.slice(0, 3).map((f, i) => (
          <span key={i} className="text-xs px-2 py-1 rounded-md bg-[#0a0a0a] text-gray-400 border border-[#2a2a2a]">{f}</span>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4 pt-4 border-t border-[#2a2a2a]">
        <span className="text-lg font-bold text-white">{tool.pricing}</span>
        <span className="text-xs text-gray-500 bg-[#0a0a0a] px-2 py-1 rounded">{tool.category}</span>
      </div>

      <a
        href={tool.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="relative overflow-hidden w-full py-3 rounded-xl text-[#0a0a0a] font-bold text-center flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:scale-[1.02] active:scale-[0.98]"
        style={{ background: 'linear-gradient(135deg, #00f0ff 0%, #00c8d4 100%)', boxShadow: '0 4px 20px rgba(0, 240, 255, 0.3)' }}
      >
        Try Now Free
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  )
}

function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon
  const colors = {
    cyan: 'bg-[#00f0ff]/10 text-[#00f0ff] hover:bg-[#00f0ff]/20',
    purple: 'bg-[#a855f7]/10 text-[#a855f7] hover:bg-[#a855f7]/20',
    pink: 'bg-[#ec4899]/10 text-[#ec4899] hover:bg-[#ec4899]/20',
    green: 'bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/20'
  }

  return (
    <div className="group p-6 rounded-2xl bg-[#141414] border border-[#2a2a2a] hover:border-[#00f0ff] transition-all duration-300 cursor-pointer hover:-translate-y-1">
      <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${colors[category.color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex items-center justify-center gap-2 mb-2">
        <h3 className="font-semibold text-white text-center">{category.name}</h3>
        <span className="text-xs text-green-400 font-medium">{category.growth}</span>
      </div>
      <p className="text-xs text-gray-400 text-center mb-3">{category.description}</p>
      <p className="text-xs text-gray-500 text-center mb-4">{category.count} tools</p>
      <button className="w-full py-2 rounded-lg text-sm font-medium bg-[#2a2a2a] text-gray-300 hover:bg-[#00f0ff]/10 hover:text-[#00f0ff] transition-all">
        Explore Category
      </button>
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="group cursor-pointer">
      <div className="h-48 rounded-2xl bg-gradient-to-br from-[#00f0ff]/10 to-[#a855f7]/10 mb-4 flex items-center justify-center border border-[#2a2a2a] group-hover:border-[#00f0ff]/50 transition-all relative overflow-hidden">
        <div className="absolute inset-0 bg-[#141414]/50" />
        <ImageIcon className="w-12 h-12 text-gray-600 relative z-10" />
        {review.sponsored && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-[#a855f7]/20 text-[#a855f7] text-xs font-medium border border-[#a855f7]/30">
            Sponsored
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-xs font-medium text-[#00f0ff] uppercase tracking-wider">{review.category}</span>
        <span className="text-gray-600">•</span>
        <span className="text-xs text-gray-500">{review.readTime}</span>
        <span className="text-gray-600">•</span>
        <span className="text-xs text-gray-500">{review.date}</span>
      </div>
      <h3 className="font-bold text-lg mb-2 text-white group-hover:text-[#00f0ff] transition-colors line-clamp-2 leading-tight">{review.title}</h3>
      <p className="text-sm text-gray-400 line-clamp-3 mb-3 leading-relaxed">{review.excerpt}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#00f0ff] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          Read Review <ChevronRight className="w-4 h-4" />
        </span>
        {review.hasAffiliateLink && (
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Shield className="w-3 h-3" /> Affiliate
          </span>
        )}
      </div>
    </article>
  )
}

// ==========================================
// MAIN APP
// ==========================================
function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTools, setFilteredTools] = useState(toolsData)
  const [activeCategory, setActiveCategory] = useState('All')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const isDark = saved ? saved === 'dark' : true
    setDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let filtered = toolsData
    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(sea
