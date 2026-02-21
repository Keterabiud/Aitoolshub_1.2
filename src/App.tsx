// src/App.tsx
import { useState, useEffect } from 'react'
import { 
  Search, 
  Star, 
  ExternalLink, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  MessageSquare, 
  Image as ImageIcon, 
  Video, 
  PenTool, 
  Code, 
  Headphones, 
  Zap,
  Brain,
  Music,
  Search as SearchIcon,
  ChevronRight,
  Shield,
  Twitter,
  Linkedin,
  Youtube,
  Mail
} from 'lucide-react'
import './App.css'

// Types
interface Tool {
  id: string
  name: string
  description: string
  category: string
  rating: number
  pricing: string
  affiliateUrl: string
  icon: string
  features: string[]
}

interface Review {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  hasAffiliateLink: boolean
}

// Realistic Tool Data with Affiliate Placeholders
const toolsData: Tool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'The best all-round AI chatbot for writing, coding, analysis, and creative tasks. Powered by GPT-4o with browsing, DALL-E 3, and code interpreter.',
    category: 'Chatbots',
    rating: 5,
    pricing: 'Free / $20/mo Pro',
    affiliateUrl: 'https://chat.openai.com?ref=aitoolshub',
    icon: 'message',
    features: ['GPT-4o', 'DALL-E 3', 'Code Interpreter', 'Custom GPTs']
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropics AI assistant excels at long-form writing, document analysis, and thoughtful reasoning with 200K context window.',
    category: 'Chatbots',
    rating: 4,
    pricing: '$20/mo Pro',
    affiliateUrl: 'https://claude.ai?ref=aitoolshub',
    icon: 'brain',
    features: ['200K Context', 'Artifacts', 'Document Analysis', 'API Access']
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Googles multimodal AI integrated with Workspace. Strong at research, coding, and working with Google services.',
    category: 'Chatbots',
    rating: 4,
    pricing: 'Free / $20/mo Advanced',
    affiliateUrl: 'https://gemini.google.com?ref=aitoolshub',
    icon: 'sparkles',
    features: ['Multimodal', 'Google Integration', '1M Context', 'Free Tier']
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'The premier AI image generator for stunning artistic visuals, photorealistic images, and creative projects.',
    category: 'Image',
    rating: 5,
    pricing: '$10/mo+',
    affiliateUrl: 'https://midjourney.com?ref=aitoolshub',
    icon: 'image',
    features: ['V6 Engine', 'Style Tuning', 'Pan & Zoom', 'Commercial Use']
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'AI search engine providing real-time, cited answers from the web. Perfect for research and fact-checking.',
    category: 'Productivity',
    rating: 5,
    pricing: 'Free / $20/mo Pro',
    affiliateUrl: 'https://perplexity.ai?ref=aitoolshub',
    icon: 'search',
    features: ['Real-time Search', 'Citations', 'Pro Search', 'Focus Modes']
  },
  {
    id: 'runway',
    name: 'Runway ML',
    description: 'Professional AI video generation and editing platform. Create videos from text with Gen-2 and motion brush.',
    category: 'Video',
    rating: 4,
    pricing: '$15/mo+',
    affiliateUrl: 'https://runwayml.com?ref=aitoolshub',
    icon: 'video',
    features: ['Gen-2 Video', 'Motion Brush', 'Infinite Image', 'Green Screen']
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'Most realistic AI text-to-speech and voice cloning. 29 languages, emotion control, and instant voice cloning.',
    category: 'Audio',
    rating: 5,
    pricing: '$5/mo+',
    affiliateUrl: 'https://elevenlabs.io?ref=aitoolshub',
    icon: 'audio',
    features: ['Voice Cloning', '29 Languages', 'Emotion Control', 'API Access']
  },
  {
    id: 'suno',
    name: 'Suno',
    description: 'Create full songs with vocals and instruments from text prompts. AI music generation for creators.',
    category: 'Audio',
    rating: 4,
    pricing: 'Free / $10/mo Pro',
    affiliateUrl: 'https://suno.ai?ref=aitoolshub',
    icon: 'music',
    features: ['Full Songs', 'Vocals & Lyrics', 'Custom Styles', 'Commercial Rights']
  }
]

// Category Data
const categoriesData = [
  {
    id: 'chatbots',
    name: 'AI Chatbots',
    description: 'Conversational AI for writing, coding, and analysis',
    icon: MessageSquare,
    color: 'cyan',
    count: 12
  },
  {
    id: 'image',
    name: 'Image Generators',
    description: 'Create stunning visuals and artwork with AI',
    icon: ImageIcon,
    color: 'purple',
    count: 18
  },
  {
    id: 'video',
    name: 'Video Tools',
    description: 'AI-powered video creation and editing',
    icon: Video,
    color: 'cyan',
    count: 9
  },
  {
    id: 'writing',
    name: 'Writing Assistants',
    description: 'AI copywriting and content creation tools',
    icon: PenTool,
    color: 'purple',
    count: 15
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'AI tools to streamline your workflow',
    icon: Zap,
    color: 'cyan',
    count: 14
  },
  {
    id: 'coding',
    name: 'Coding',
    description: 'AI code assistants and developer tools',
    icon: Code,
    color: 'purple',
    count: 11
  },
  {
    id: 'audio',
    name: 'Audio & Voice',
    description: 'Text-to-speech, voice cloning, and music',
    icon: Headphones,
    color: 'cyan',
    count: 8
  },
  {
    id: 'automation',
    name: 'Automation',
    description: 'AI-powered workflow automation',
    icon: Brain,
    color: 'purple',
    count: 10
  }
]

// Comparison Data
const comparisonData = [
  {
    tool: 'ChatGPT',
    bestFor: 'All-round use, coding, creativity',
    pricing: 'Free / $20/mo',
    features: ['GPT-4o', 'DALL-E 3', 'Plugins', 'Custom GPTs'],
    pros: ['Versatile', 'Large ecosystem', 'Fast'],
    cons: ['Can be verbose', 'Hallucinations'],
    rating: 5,
    affiliateUrl: 'https://chat.openai.com?ref=aitoolshub'
  },
  {
    tool: 'Claude',
    bestFor: 'Long-form writing, analysis, documents',
    pricing: '$20/mo Pro',
    features: ['200K context', 'Artifacts', 'Constitutional AI', 'API'],
    pros: ['Thoughtful', 'Large context', 'Honest'],
    cons: ['No image gen', 'Slower on complex tasks'],
    rating: 4.5,
    affiliateUrl: 'https://claude.ai?ref=aitoolshub'
  },
  {
    tool: 'Gemini',
    bestFor: 'Google users, research, multimodal',
    pricing: 'Free / $20/mo',
    features: ['1M context', 'Google integration', 'Multimodal', 'Free tier'],
    pros: ['Huge context', 'Google apps', 'Fast'],
    cons: ['Inconsistent quality', 'Privacy concerns'],
    rating: 4,
    affiliateUrl: 'https://gemini.google.com?ref=aitoolshub'
  },
  {
    tool: 'Perplexity',
    bestFor: 'Research, fact-checking, citations',
    pricing: 'Free / $20/mo',
    features: ['Real-time search', 'Citations', 'Pro search', 'Focus modes'],
    pros: ['Accurate', 'Cited sources', 'Fast research'],
    cons: ['Limited creativity', 'Pro required for best features'],
    rating: 4.5,
    affiliateUrl: 'https://perplexity.ai?ref=aitoolshub'
  }
]

// Reviews Data
const reviewsData: Review[] = [
  {
    id: '1',
    title: 'Best AI Writing Tool 2026: Jasper vs Copy.ai vs Claude',
    excerpt: 'We spent 30 days testing the top AI writing assistants on real marketing campaigns. Our winner surprised us.',
    category: 'Writing',
    readTime: '8 min read',
    hasAffiliateLink: true
  },
  {
    id: '2',
    title: 'Midjourney v6 Review: Is It Still the Best Image Generator?',
    excerpt: 'The latest version brings photorealism and better prompt understanding. See how it compares to DALL-E 3 and Stable Diffusion.',
    category: 'Image',
    readTime: '6 min read',
    hasAffiliateLink: true
  },
  {
    id: '3',
    title: 'ElevenLabs Voice Cloning: Complete Guide for Creators',
    excerpt: 'How to create professional voiceovers and clone voices ethically. Includes pricing breakdown and alternatives.',
    category: 'Audio',
    readTime: '10 min read',
    hasAffiliateLink: true
  },
  {
    id: '4',
    title: 'Perplexity Pro vs Free: Is the Upgrade Worth $20/Month?',
    excerpt: 'We analyzed 500+ searches to determine if Perplexity Pro delivers enough value for researchers and professionals.',
    category: 'Productivity',
    readTime: '7 min read',
    hasAffiliateLink: false
  }
]

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-600'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-400">{rating}/5</span>
    </div>
  )
}

// Tool Card Component
function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="tool-card bg-[#141414] rounded-2xl p-6 flex flex-col h-full border border-[#2a2a2a] hover:border-[#00f0ff] transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f0ff]/20 to-[#00f0ff]/5 flex items-center justify-center text-[#00f0ff] font-bold text-xl">
          {tool.name[0]}
        </div>
        <span className="px-2 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] text-xs font-medium border border-[#00f0ff]/20">
          {tool.category}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#00f0ff] transition-colors">
        {tool.name}
      </h3>
      
      <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
        {tool.description}
      </p>
      
      <div className="mb-4">
        <StarRating rating={tool.rating} />
      </div>
      
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tool.features.slice(0, 3).map((feature, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-1 rounded-md bg-[#0a0a0a] text-gray-400 border border-[#2a2a2a]"
          >
            {feature}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between mb-4 pt-4 border-t border-[#2a2a2a]">
        <span className="text-lg font-bold text-white">{tool.pricing}</span>
      </div>
      
      {/* Primary Affiliate CTA Button */}
      <a
        href={tool.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="btn-affiliate w-full py-3 rounded-xl text-[#0a0a0a] font-bold text-center flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #00f0ff 0%, #00c8d4 100%)'
        }}
        onClick={() => console.log(`Affiliate click: ${tool.name}`)}
      >
        Try Now
        <ExternalLink className="w-4 h-4" />
      </a>
      
      <a
        href={`/review/${tool.id}`}
        className="mt-3 text-center text-sm text-gray-400 hover:text-[#00f0ff] transition-colors"
      >
        Read Full Review
      </a>
    </div>
  )
}

// Category Card Component
function CategoryCard({ category }: { category: typeof categoriesData[0] }) {
  const Icon = category.icon
  const isCyan = category.color === 'cyan'
  
  return (
    <div className="group p-6 rounded-2xl bg-[#141414] border border-[#2a2a2a] hover:border-[#00f0ff] transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,240,255,0.1)]">
      <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${isCyan ? 'bg-[#00f0ff]/10 text-[#00f0ff]' : 'bg-[#a855f7]/10 text-[#a855f7]'} group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-white text-center mb-2">{category.name}</h3>
      <p className="text-xs text-gray-400 text-center mb-3 line-clamp-2">{category.description}</p>
      <p className="text-xs text-gray-500 text-center mb-4">{category.count} tools</p>
      <button className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${isCyan ? 'bg-[#00f0ff]/10 text-[#00f0ff] hover:bg-[#00f0ff]/20' : 'bg-[#a855f7]/10 text-[#a855f7] hover:bg-[#a855f7]/20'}`}>
        Explore
      </button>
    </div>
  )
}

// Review Card Component
function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="group cursor-pointer">
      <div className="h-48 rounded-2xl bg-gradient-to-br from-[#00f0ff]/10 to-[#a855f7]/10 mb-4 flex items-center justify-center border border-[#2a2a2a] group-hover:border-[#00f0ff]/50 transition-colors">
        <ImageIcon className="w-12 h-12 text-gray-600" />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-[#00f0ff] uppercase tracking-wider">{review.category}</span>
        <span className="text-gray-600">•</span>
        <span className="text-xs text-gray-500">{review.readTime}</span>
      </div>
      <h3 className="font-bold text-lg mb-2 text-white group-hover:text-[#00f0ff] transition-colors line-clamp-2">
        {review.title}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-3 mb-3">{review.excerpt}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#00f0ff] font-medium flex items-center gap-1">
          Read Review
          <ChevronRight className="w-4 h-4" />
        </span>
        {review.hasAffiliateLink && (
          <span className="text-xs text-gray-500 flex items-center gap-1" title="Contains affiliate links">
            <Shield className="w-3 h-3" />
            Affiliate
          </span>
        )}
      </div>
    </article>
  )
}

// Main App Component
function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTools, setFilteredTools] = useState(toolsData)

  // Initialize dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      setDarkMode(saved === 'dark')
    } else {
      setDarkMode(true) // Default to dark
    }
  }, [])

  // Update document class and localStorage when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  // Search filter functionality
  useEffect(() => {
    const filtered = toolsData.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredTools(filtered)
  }, [searchQuery])

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.getElementById('hero-search')?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-[#0a0a0a] text-white' : 'bg-white text-gray-900'}`}>
      
      {/* Affiliate Disclosure Banner */}
      <div className="bg-gradient-to-r from-[#a855f7]/20 to-[#00f0ff]/20 border-b border-white/10 px-4 py-2 text-center text-xs sm:text-sm text-gray-300">
        <span className="inline-flex items-center gap-2 flex-wrap justify-center">
          <Shield className="w-4 h-4 text-[#00f0ff]" />
          <strong>Affiliate Disclosure:</strong> This site contains affiliate links. We may earn a commission when you purchase through our links — at no extra cost to you.
          <a href="#disclosure" className="underline hover:text-[#00f0ff] ml-1">Learn more</a>
        </span>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center">
                <span className="text-[#0a0a0a] font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl tracking-tight">
                AI<span className="text-[#00f0ff]">Tools</span>Hub
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium hover:text-[#00f0ff] transition-colors">Home</a>
              <a href="#categories" className="text-sm font-medium hover:text-[#00f0ff] transition-colors">Categories</a>
              <a href="#comparisons" className="text-sm font-medium hover:text-[#00f0ff] transition-colors">Comparisons</a>
              <a href="#reviews" className="text-sm font-medium hover:text-[#00f0ff] transition-colors">Reviews</a>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Search - Desktop */}
              <div className="hidden sm:flex items-center bg-[#141414] rounded-full px-4 py-1.5 border border-[#2a2a2a] focus-within:border-[#00f0ff] transition-colors">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm ml-2 w-32 lg:w-48 placeholder-gray-500 text-white"
                />
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-[#141414] transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5 text-[#00f0ff]" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-[#141414]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#141414] border-t border-[#2a2a2a]">
            <div className="px-4 py-3 space-y-2">
              <a href="#home" className="block py-2 text-sm hover:text-[#00f0ff]" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#categories" className="block py-2 text-sm hover:text-[#00f0ff]" onClick={() => setMobileMenuOpen(false)}>Categories</a>
              <a href="#comparisons" className="block py-2 text-sm hover:text-[#00f0ff]" onClick={() => setMobileMenuOpen(false)}>Comparisons</a>
              <a href="#reviews" className="block py-2 text-sm hover:text-[#00f0ff]" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full mt-2 bg-[#0a0a
