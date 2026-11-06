import Image from "next/image";
import Link from "next/link";
import type { BoardMember } from "@/lib/board";

// Figma: Card / Board member (2216:2565). Portrait, glass name panel and a
// "+" that opens the member's bio. Photo card, so it is pinned Dark: the glass
// panel and white type read on any portrait.
// With onOpen it's a button (Leadership page, opens the modal); otherwise a
// link to the member on the Leadership page.

const cardClass =
  "group relative flex h-[440px] w-full flex-col justify-end overflow-clip rounded-sm border border-subtle bg-surface-raised p-3 text-left lg:h-[520px] cursor-pointer";

function Inner({ member }: { member: BoardMember }) {
  return (
    <>
      <Image
        src={member.photo}
        alt={member.name}
        fill
        sizes="(min-width: 1024px) 424px, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        style={{ objectPosition: member.position }}
      />
      <div className="border-subtle relative flex items-start gap-6 overflow-clip rounded-tl-sm rounded-tr-xs rounded-br-xs rounded-bl-sm border bg-[rgba(39,39,39,0.5)] px-8 py-3 backdrop-blur-[10px]">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="type-h4 text-primary">{member.name}</p>
          <p className="type-label-button text-secondary">{member.title}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- open-bio badge */}
        <img
          src="/images/about/open-bio.svg"
          alt=""
          width={56}
          height={56}
          className="size-14 shrink-0 rounded-full transition-[background-color,transform] duration-300 group-hover:rotate-90 group-hover:bg-lime-500 group-hover:invert"
        />
        <span className="sr-only">Read {member.name}&rsquo;s biography</span>
      </div>
    </>
  );
}

export function BoardCard({
  member,
  href,
  onOpen,
}: {
  member: BoardMember;
  href?: string;
  onOpen?: () => void;
}) {
  if (onOpen)
    return (
      <button
        type="button"
        data-theme="dark"
        onClick={onOpen}
        className={cardClass}
      >
        <Inner member={member} />
      </button>
    );
  return (
    <Link
      href={href ?? `/leadership/#${member.slug}`}
      data-theme="dark"
      className={cardClass}
    >
      <Inner member={member} />
    </Link>
  );
}
