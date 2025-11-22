"use client";

import {cn} from "@/lib/utils";
import {
  transformerNotationDiff,
  transformerNotationFocus,
} from "@shikijs/transformers";
import {FileIcon} from "lucide-react";
import {useTheme} from "next-themes";
import React, {useEffect, useState, useMemo} from "react";
import {Badge} from "@/components/ui/badge";

interface CodeComparisonProps {
  beforeCode: string;
  afterCode: string;
  beforeLanguage: string;
  afterLanguage: string;
  beforeFilename: string;
  afterFilename: string;
  beforeDescription?: string;
  afterDescription?: string;
  lightTheme?: string;
  darkTheme?: string;
  highlightColor?: string;
}

export function CodeComparison({
                                 beforeCode,
                                 afterCode,
                                 beforeLanguage,
                                 afterLanguage,
                                 beforeFilename,
                                 afterFilename,
                                 beforeDescription = "before",
                                 afterDescription = "after",
                                 lightTheme = "github-light",
                                 darkTheme = "github-dark",
                                 highlightColor = "#ff3333",
                               }: CodeComparisonProps) {
  const {theme, systemTheme} = useTheme();
  const [highlightedBefore, setHighlightedBefore] = useState("");
  const [highlightedAfter, setHighlightedAfter] = useState("");

  const selectedTheme = useMemo(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    return currentTheme === "dark" ? darkTheme : lightTheme;
  }, [theme, systemTheme, darkTheme, lightTheme]);

  useEffect(() => {
    async function highlightCode() {
      try {
        const {codeToHtml} = await import("shiki");
        const {transformerNotationHighlight} = await import(
          "@shikijs/transformers"
          );

        const before = await codeToHtml(beforeCode, {
          lang: beforeLanguage,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight({matchAlgorithm: "v3"}),
            transformerNotationDiff({matchAlgorithm: "v3"}),
            transformerNotationFocus({matchAlgorithm: "v3"}),
          ],
        });
        const after = await codeToHtml(afterCode, {
          lang: afterLanguage,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight({matchAlgorithm: "v3"}),
            transformerNotationDiff({matchAlgorithm: "v3"}),
            transformerNotationFocus({matchAlgorithm: "v3"}),
          ],
        });
        setHighlightedBefore(before);
        setHighlightedAfter(after);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedBefore(`<pre>${beforeCode}</pre>`);
        setHighlightedAfter(`<pre>${afterCode}</pre>`);
      }
    }

    highlightCode();
  }, [beforeCode, afterCode, beforeLanguage, afterLanguage, selectedTheme]);

  const renderCode = (code: string, highlighted: string) => {
    if (highlighted) {
      return (
        <div
          style={{"--highlight-color": highlightColor} as React.CSSProperties}
          className={cn(
            "h-full w-full overflow-auto bg-background font-mono text-xs",
            "[&>pre]:h-full [&>pre]:py-2",
            "[&>pre>code]:!inline-block [&>pre>code]:!flex-col",
            "[&>pre>code>span]:inline-block [&>pre>code>span]:px-3 [&>pre>code>span]:py-0.5",
            "[&>pre>code>.highlighted]:inline-block [&>pre>code>.highlighted]:w-full [&>pre>code>.highlighted]:!bg-[var(--highlight-color)]",
            "[&>pre>code>.add]:bg-[rgba(16,185,129,.16)] [&>pre>code>.remove]:bg-[rgba(244,63,94,.16)]",
          )}
          dangerouslySetInnerHTML={{__html: highlighted}}
        />
      );
    } else {
      return (
        <pre className="h-full overflow-auto break-all bg-background p-4 font-mono text-xs text-foreground">
          {code}
        </pre>
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="relative w-full overflow-hidden rounded-md border border-border border-primary/20">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-primary/20 md:border-r flex flex-col">
            <div className="w-full flex items-center border-b border-primary/20 bg-accent p-2 text-sm text-foreground">
              <FileIcon className="mr-2 h-4 w-4"/>
              {beforeFilename}
              <Badge className="ml-auto rounded-full">{beforeDescription}</Badge>
            </div>
            {renderCode(beforeCode, highlightedBefore)}
          </div>

          <div className="border-primary/20 border-t md:border-t-0 flex flex-col">
            <div className="w-full flex items-center border-b border-primary/20 bg-accent p-2 text-sm text-foreground">
              <FileIcon className="mr-2 h-4 w-4"/>
              {afterFilename}
              <Badge className="ml-auto rounded-full">{afterDescription}</Badge>
            </div>
            {renderCode(afterCode, highlightedAfter)}
          </div>
        </div>
        <div
          className="absolute left-1/2 top-1/2 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-primary/20 bg-accent text-xs text-foreground md:flex">
          VS
        </div>
      </div>
    </div>
  );
}
