const TypingIndicator = () => {
  return (
    <div className="flex gap-4 animate-fade-in">
      <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-primary text-primary-foreground shadow-md shadow-primary/20">
        <span className="font-bold text-sm">R</span>
      </div>
      <div className="flex items-center gap-1 px-4 py-3 bg-card border border-border rounded-2xl rounded-tl-md">
        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" style={{ animationDelay: "200ms" }} />
        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" style={{ animationDelay: "400ms" }} />
      </div>
    </div>
  );
};

export default TypingIndicator;
