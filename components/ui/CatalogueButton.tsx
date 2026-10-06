import { site } from "@/lib/site";

// Split button: the left half opens the PDF catalogue in a new tab, the right
// half downloads it. Used in the home hero and the closing call-to-action.
export default function CatalogueButton({
  view,
  download,
  tone = "cream",
}: {
  view: string;
  download: string;
  tone?: "cream" | "gold";
}) {
  const border = tone === "gold" ? "border-deep" : "border-deep/80";
  const hover = "hover:bg-deep hover:text-cream";
  return (
    <div className={`inline-flex items-stretch overflow-hidden rounded-full border-[1.5px] ${border} text-deep`}>
      <a
        href={site.catalogueUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2.5 px-5 py-3.5 text-[15px] font-semibold transition-colors ${hover}`}
      >
        <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5A1.5 1.5 0 0 1 4 17.5zM20 5.5c0-.8-.7-1.5-1.5-1.5H13v15h5.5a1.5 1.5 0 0 0 1.5-1.5z" />
        </svg>
        {view}
      </a>
      <a
        href={site.catalogueUrl}
        download
        aria-label={download}
        title={download}
        className={`flex items-center border-s-[1.5px] ${border} px-4 transition-colors ${hover}`}
      >
        <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />
        </svg>
      </a>
    </div>
  );
}
