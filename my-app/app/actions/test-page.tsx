import { Document } from "./document.tsx";

const TestHead = () => {
  return () => (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
      />
    </>
  );
};

export const TestPage = () => {
  return () => (
    <Document head={<TestHead />}>
      <p>test</p>
    </Document>
  );
};
