"use client";

import dynamic from "next/dynamic";

export const VisitMapLazy = dynamic(
  () => import("./VisitMap").then((mod) => mod.VisitMap),
  {
    ssr: false,
    loading: () => (
      <div className="visit__map visit__map--loading" role="presentation" />
    ),
  },
);
