import { cn } from "@/lib/utils";

interface TypographyProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "ul";
  component?: React.ElementType;
}

const classNames = {
  h1: "text-4xl font-extrabold tracking-tight",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold tracking-tight",
  h4: "text-xl font-semibold tracking-tight",
  p: "leading-7 text-base",
  ul: "list-disc ml-6 text-base",
};

export default function Typography(props: TypographyProps) {
  const { children, className, variant = "p", component = "p" } = props;
  const Component = component;
  return (
    <Component className={cn(classNames[variant], className)}>
      {children}
    </Component>
  );
}
