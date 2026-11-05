import Link from "next/link";
import type { ComponentProps } from "react";
import { isExternal } from "@/lib/site";

type Props = Omit<ComponentProps<"a">, "href"> & { href: string };

/** next/link for internal routes, a plain <a> (new tab) for external ones. */
export function SmartLink({ href, ...rest }: Props) {
  if (isExternal(href)) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
        {...rest}
      />
    );
  }
  return <Link href={href} {...rest} />;
}
