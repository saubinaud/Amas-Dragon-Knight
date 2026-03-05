import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-heading font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none active:scale-[0.98]",
    {
        variants: {
            variant: {
                default: "bg-dk-red text-white hover:bg-dk-red-light shadow-lg shadow-dk-red/20",
                destructive: "bg-red-600 text-white hover:bg-red-600/90 shadow-lg shadow-red-600/20",
                outline: "border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-white/20",
                secondary: "bg-white/[0.08] text-white hover:bg-white/10",
                ghost: "text-white hover:bg-white/10",
                link: "text-dk-red underline-offset-4 hover:underline",
            },
            size: {
                default: "h-12 px-6 py-2 text-sm",
                sm: "h-10 px-4 text-xs",
                lg: "h-14 px-8 text-base",
                icon: "size-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
