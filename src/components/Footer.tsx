export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground md:px-6">
        <p>© {new Date().getFullYear()} Kiran Praveen </p>
      </div>
    </footer>
  );
}
