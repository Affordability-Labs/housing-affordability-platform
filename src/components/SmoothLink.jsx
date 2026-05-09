"use client";

import Link from "next/link";

export default function SmoothLink({ href, className, children, onClick, ...props }) {
  return (
    <Link className={className} href={href} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}
