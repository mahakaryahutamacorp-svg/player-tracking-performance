import BottomNav from "@/components/ui/BottomNav";

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <main className="safe-bottom">{children}</main>
      <BottomNav />
    </div>
  );
}
