import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Loader2 } from "lucide-react";

interface XlsxViewerProps {
  url: string;
}

const XlsxViewer = ({ url }: XlsxViewerProps) => {
  const [sheets, setSheets] = useState<{ name: string; html: string }[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Impossible de charger le fichier");
        const buf = await res.arrayBuffer();
        const wb = XLSX.read(buf, { type: "array" });
        const result = wb.SheetNames.map((name) => ({
          name,
          html: XLSX.utils.sheet_to_html(wb.Sheets[name], { editable: false }),
        }));
        if (!cancelled) setSheets(result);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Erreur");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-primary font-mono text-sm gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        Chargement du tableau...
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive font-mono text-sm">{error}</div>;
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {sheets.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-3 shrink-0">
          {sheets.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setActive(i)}
              className={`px-3 py-1.5 rounded-md font-mono text-xs border transition-colors ${
                i === active
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}
      <div
        className="xlsx-viewer flex-1 min-h-0 overflow-auto rounded-lg border border-border bg-background p-3"
        dangerouslySetInnerHTML={{ __html: sheets[active]?.html ?? "" }}
      />
    </div>
  );
};

export default XlsxViewer;
