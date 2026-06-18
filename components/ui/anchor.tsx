import Link, { type LinkProps } from "next/link";

type AnchorProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
    className?: string;
  };

export default function Anchor({
  href,
  children,
  className = "",
  ...props
}: AnchorProps) {
  return (
    <Link
      href={href}
      className={`
        flex
        items-center
        gap-1.5
        relative
        w-fit
        p-0.5

        after:content-['']
        after:bg-primary
        after:rounded-[4px]
        after:block
        after:absolute
        after:inset-[calc(100%-.125rem)_0_0_0]
        after:w-full
        after:-z-1
        after:duration-200
        hover:after:bg-secondary
        hover:after:inset-[-.125rem_0_0_0]
        hover:after:ease-[cubic-bezier(.01,0,.19,2.36)]
        ${className}
      `}
      {...props}
    >
      {children}
    </Link>
  );
}
