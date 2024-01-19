export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      애프터 로그인 레이아웃
      {children}
    </div>
  );
}
