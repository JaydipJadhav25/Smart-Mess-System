export function ComingSoon() {
  return (
    <div className="w-full max-w-xl mx-auto p-10 flex flex-col items-center justify-center 
      bg-gradient-to-br from-purple-500/10 to-indigo-500/10 
      border rounded-2xl shadow-lg text-center">
      
      <div className="h-20 w-20 rounded-full bg-purple-600 text-white 
        flex items-center justify-center text-3xl font-bold shadow mb-6">
        🚧
      </div>

      <h2 className="text-3xl font-semibold mb-2">Feature Coming Soon</h2>

      <p className="text-muted-foreground text-sm max-w-sm">
        This feature is currently under development.  
        Our team is working to bring it live soon with the best experience.
      </p>

      <div className="mt-6 text-xs px-4 py-2 rounded-full 
        bg-purple-600/20 text-purple-700 dark:text-purple-300 font-medium">
        Under Development
      </div>
    </div>
  );
}
