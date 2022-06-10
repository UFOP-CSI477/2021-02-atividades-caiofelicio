export default function Group({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      {children}
    </div>
  );
}
