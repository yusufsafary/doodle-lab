import { TopNav } from '@/components/TopNav';
import { Footer } from '@/components/Footer';
import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Download, Link as LinkIcon, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CanvasArt } from '@/components/CanvasArt';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'IMAGE' | 'TEXT'>('IMAGE');
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArt, setGeneratedArt] = useState<{ seed: number; style: any } | null>(null);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<'Fantasy' | 'Realistic' | 'Anime' | 'Abstract'>('Abstract');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (activeTab === 'IMAGE' && !uploadedImage) return;
    if (activeTab === 'TEXT' && !prompt) return;
    setIsGenerating(true);
    setGeneratedArt(null);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedArt({ seed: Math.random() * 10000, style: selectedStyle });
    }, 2500);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: 'Link copied!', description: 'Share your creation with the world.' });
  };

  const steps = [
    { num: '01', title: 'Upload your image' },
    { num: '02', title: 'Generate' },
    { num: '03', title: 'Share' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-coral/10 blur-[150px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[5%] w-[40%] h-[40%] rounded-full bg-yellow/10 blur-[100px] animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <TopNav />

      <main className="pt-24 md:pt-32 pb-16 px-4 md:px-6 max-w-6xl mx-auto w-full relative z-10 flex-1">

        {/* Header */}
        <div className="text-center mb-10 md:mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter"
          >
            <span className="text-gradient-lab animate-gradient block">Create with us.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-muted-foreground font-mono"
          >
            Reimagine anything with Lab 1.0
          </motion.p>
        </div>

        {/* Steps: 1 col mobile, 3 col sm+ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6"
        >
          {steps.map((step) => (
            <div key={step.num} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm flex sm:flex-col gap-3 sm:gap-1">
              <div className="text-xs font-mono text-muted-foreground">STEP {step.num}</div>
              <div className="font-semibold">{step.title}</div>
            </div>
          ))}
        </motion.div>

        {/* Tool area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card/50 border border-white/10 rounded-3xl backdrop-blur-md overflow-hidden"
        >
          {/* Tool header */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-mono font-bold tracking-widest text-sm">LAB 1.0</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground" aria-label="Info">
                <Info className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Toggle panel"
              >
                {isPanelOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isPanelOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 md:p-8">
                  {/* Tabs */}
                  <div className="flex space-x-1 bg-black/40 p-1 rounded-xl w-max mb-6 border border-white/5">
                    {(['IMAGE', 'TEXT'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-primary text-black' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Content: stacked mobile, side-by-side md */}
                  <div className="flex flex-col md:grid md:grid-cols-2 gap-6">

                    {/* Input */}
                    <div className="space-y-5">
                      {activeTab === 'IMAGE' ? (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors h-56 md:h-64
                            ${uploadedImage ? 'border-primary/50 bg-primary/5' : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40'}`}
                        >
                          <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/jpeg,image/png"
                          />
                          {uploadedImage ? (
                            <img src={uploadedImage} alt="Uploaded" className="h-full w-full object-contain rounded-lg" />
                          ) : (
                            <>
                              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                                <Upload className="w-5 h-5" />
                              </div>
                              <h3 className="font-semibold mb-1">Add image here.</h3>
                              <p className="text-sm text-muted-foreground">JPG or PNG</p>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground block mb-2">Prompt</label>
                            <textarea
                              value={prompt}
                              onChange={(e) => setPrompt(e.target.value)}
                              placeholder="Describe what you want to create..."
                              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground block mb-2">Style</label>
                            <div className="grid grid-cols-2 gap-2">
                              {(['Abstract', 'Realistic', 'Anime', 'Fantasy'] as const).map((style) => (
                                <button
                                  key={style}
                                  onClick={() => setSelectedStyle(style)}
                                  className={`p-3 rounded-xl border text-sm font-medium transition-colors
                                    ${selectedStyle === style ? 'bg-primary/20 border-primary text-primary' : 'bg-black/40 border-white/10 text-muted-foreground hover:bg-white/10'}`}
                                >
                                  {style}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating || (activeTab === 'IMAGE' ? !uploadedImage : !prompt)}
                        className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all uppercase text-sm
                          ${isGenerating
                            ? 'bg-white/10 text-white/50 cursor-not-allowed'
                            : (activeTab === 'IMAGE' && !uploadedImage) || (activeTab === 'TEXT' && !prompt)
                              ? 'bg-white/5 text-white/30 cursor-not-allowed'
                              : 'bg-gradient-lab text-black hover:opacity-90 active:scale-[0.98]'}`}
                      >
                        {isGenerating
                          ? 'Generating...'
                          : activeTab === 'IMAGE' && !uploadedImage
                            ? 'ADD AN IMAGE TO CONTINUE'
                            : 'GENERATE'}
                      </button>
                    </div>

                    {/* Output */}
                    <div className="bg-black/60 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col h-72 md:h-auto md:min-h-[400px]">
                      {isGenerating ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/80 backdrop-blur-sm z-10">
                          <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-5" />
                          <h3 className="font-bold text-lg mb-2 text-gradient-lab animate-gradient block bg-clip-text text-transparent">
                            Reimagining pixels...
                          </h3>
                          <p className="text-muted-foreground font-mono text-xs">Applying {selectedStyle} style</p>
                          <div className="w-full max-w-xs h-1.5 bg-white/10 rounded-full mt-6 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 2.5, ease: 'linear' }}
                              className="h-full bg-gradient-lab"
                            />
                          </div>
                        </div>
                      ) : generatedArt ? (
                        <div className="absolute inset-0 flex flex-col">
                          <div className="flex-1 p-3 pb-0 overflow-hidden">
                            <CanvasArt
                              seed={generatedArt.seed}
                              styleType={generatedArt.style}
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </div>
                          <div className="p-3 flex gap-2">
                            <button
                              onClick={copyLink}
                              className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors py-3 rounded-xl font-medium text-sm"
                            >
                              <LinkIcon className="w-4 h-4" /> Copy Link
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-black transition-colors py-3 rounded-xl font-bold text-sm">
                              <Download className="w-4 h-4" /> Download
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                          <ImageIcon className="w-10 h-10 mb-3 opacity-20" />
                          <p className="font-mono text-sm">Waiting for input...</p>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
