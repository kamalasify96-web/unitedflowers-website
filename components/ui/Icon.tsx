// Icons from the United Flowers brand book icon pack:
// 48×48 grid, 2px round stroke in Deep Grove, one Golden Drop / Fresh Lime accent.

type Name =
  | "bottle" | "olive" | "tin" | "croissant" | "factory" | "refine" | "quality" | "export"
  | "truck" | "tag" | "chef" | "pallet" | "leaf" | "drop" | "certified" | "store" | "sunflower" | "clock";

const A = "fill-gold stroke-none";
const G = "fill-lime stroke-none";

const paths: Record<Name, JSX.Element> = {
  drop: (<><path className={A} d="M24 12c-5 7-8 11-8 15a8 8 0 0 0 16 0c0-4-3-8-8-15z" /><path d="M24 6c-7 9-12 15-12 21a12 12 0 0 0 24 0c0-6-5-12-12-21z" /><path d="M19 29a5 5 0 0 0 4 4" /></>),
  sunflower: (<><circle className={A} cx="24" cy="24" r="6" /><circle cx="24" cy="24" r="6" /><path d="M24 4v8M24 36v8M4 24h8M36 24h8M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6" /></>),
  bottle: (<><path className={A} d="M17 26h14v14a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2z" /><path d="M21 4h6v6l4 6v24a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2V16l4-6z" /><path d="M20 4h8" /></>),
  tin: (<><ellipse cx="24" cy="12" rx="13" ry="4" /><path d="M11 12v24c0 2.2 5.8 4 13 4s13-1.8 13-4V12" /><rect className={A} x="14" y="21" width="20" height="9" rx="2" /><path d="M19 8h10" /></>),
  croissant: (<><path className={A} d="M18 18c2-4 10-4 12 0l-2 12h-8z" /><path d="M6 30c0-6 4-12 10-14l4 14z" /><path d="M42 30c0-6-4-12-10-14l-4 14z" /><path d="M16 16c3-5 13-5 16 0l-3 16H19z" /><path d="M6 30l8 4 6-4M42 30l-8 4-6-4" /></>),
  olive: (<><path d="M6 42C16 32 26 22 42 6" /><path className={G} d="M14 26c-6-2-8-8-6-12 6 0 9 6 6 12z" /><path d="M24 18c-2-6 2-10 6-10 2 5-1 10-6 10z" /><ellipse className={A} cx="30" cy="30" rx="6" ry="8" transform="rotate(-35 30 30)" /><ellipse cx="30" cy="30" rx="6" ry="8" transform="rotate(-35 30 30)" /></>),
  factory: (<><path d="M4 42V22l10 6v-6l10 6v-6l10 6V8h8v34z" /><path d="M4 42h40" /><rect className={A} x="10" y="32" width="6" height="5" /><rect className={A} x="22" y="32" width="6" height="5" /></>),
  refine: (<><path className={A} d="M14 32h20l4 7a2 2 0 0 1-2 3H12a2 2 0 0 1-2-3z" /><path d="M19 4h10M21 4v14L10 39a2 2 0 0 0 2 3h24a2 2 0 0 0 2-3L27 18V4" /></>),
  quality: (<><path className={G} d="M24 8l13 5v10c0 9-6 15-13 18z" /><path d="M24 4l16 6v12c0 11-7 18-16 22C15 40 8 33 8 22V10z" /><path d="M17 24l5 5 9-10" /></>),
  export: (<><path className={A} opacity=".55" d="M24 6a18 18 0 0 1 0 36c-5-4-8-11-8-18s3-14 8-18z" /><circle cx="24" cy="24" r="18" /><path d="M6 24h36M24 6c5 5 8 11 8 18s-3 13-8 18c-5-5-8-11-8-18s3-13 8-18z" /></>),
  truck: (<><rect className={A} x="4" y="12" width="24" height="20" rx="2" /><rect x="4" y="12" width="24" height="20" rx="2" /><path d="M28 18h8l6 7v7H28z" /><circle cx="13" cy="35" r="4" className="fill-white" /><circle cx="35" cy="35" r="4" className="fill-white" /></>),
  tag: (<><path className={A} opacity=".55" d="M8 8h14l18 18-14 14L8 22z" /><path d="M6 6h17l19 19-17 17L6 23z" /><circle cx="15" cy="15" r="3" className="fill-white" /><path d="M20 28l8-8" /></>),
  certified: (<><path d="M16 30l-4 14 6-3 4 5 3-12M32 30l4 14-6-3-4 5-3-12" /><circle className={A} cx="24" cy="20" r="10" /><circle cx="24" cy="20" r="14" /><path d="M19 20l4 4 6-7" /></>),
  chef: (<><rect className={A} x="14" y="32" width="20" height="8" rx="1" /><path d="M14 40h20v-8H14z" /><path d="M14 32v-6a9 9 0 1 1 4-15 9 9 0 0 1 12 0 9 9 0 1 1 4 15v6" /></>),
  pallet: (<><rect className={A} x="8" y="22" width="14" height="12" /><rect x="8" y="22" width="14" height="12" /><rect x="26" y="22" width="14" height="12" /><rect x="17" y="8" width="14" height="14" /><path d="M4 34h40M8 40v-6M24 40v-6M40 40v-6M4 40h40" /></>),
  leaf: (<><path className={G} d="M38 10c-4 14-12 22-24 24 0-12 8-21 24-24z" /><path d="M40 8C22 8 10 16 10 30c0 4 1 8 2 10" /><path d="M40 8c-1 17-10 28-26 28" /></>),
  store: (<><path className={A} d="M10 26h28v16H10z" opacity=".55" /><path d="M6 18l4-10h28l4 10" /><path d="M6 18c0 3 2.5 5 5.5 5S17 21 17 18c0 3 2.5 5 5.5 5h3c3 0 5.5-2 5.5-5 0 3 2.5 5 5.5 5S42 21 42 18H6z" /><path d="M10 23v19h28V23M20 42V32h8v10" /></>),
  clock: (<><circle className={A} cx="24" cy="24" r="12" opacity=".55" /><circle cx="24" cy="24" r="18" /><path d="M24 14v10l7 5" /></>),
};

export default function Icon({ name, className = "h-10 w-10" }: { name: Name; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`${className} fill-none stroke-deep`}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export type IconName = Name;
