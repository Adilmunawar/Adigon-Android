"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface File {
  fileName: string;
  code: string;
}

interface CodeDisplayProps {
  files: File[];
}

export function CodeDisplay({ files }: CodeDisplayProps) {
  if (!files || files.length === 0) {
    return (
        <div className="bg-card rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">The AI did not generate any code.</p>
        </div>
    );
  }

  const defaultValue = files[0].fileName;

  return (
    <Tabs defaultValue={defaultValue} className="w-full bg-card rounded-xl border">
      <div className="p-2 border-b">
        <TabsList className="bg-transparent p-0">
          {files.map((file) => (
            <TabsTrigger key={file.fileName} value={file.fileName} className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              {file.fileName}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {files.map((file) => (
        <TabsContent key={file.fileName} value={file.fileName} className="m-0">
          <pre className="text-sm overflow-x-auto rounded-b-md p-4 pt-2 bg-card">
            <code className="font-code">{file.code}</code>
          </pre>
        </TabsContent>
      ))}
    </Tabs>
  );
}
