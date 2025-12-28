const RBotLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/20 rounded-xl rotate-12" />
        <div className="relative bg-primary rounded-xl w-10 h-10 flex items-center justify-center shadow-lg shadow-primary/30">
          <span className="text-primary-foreground font-bold text-xl">R</span>
        </div>
      </div>
      <span className="text-foreground text-2xl font-semibold tracking-tight">Bot</span>
    </div>
  );
};

export default RBotLogo;
