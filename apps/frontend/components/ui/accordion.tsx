"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col bg-primary-foreground rounded-xl border border-primary", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "h-[87px] px-7 py-5 group/accordion-trigger relative flex flex-1 items-center justify-between rounded-lg text-xl font-bold font-(family-name:--font-comfortaa) border border-transparent transition-all outline-none cursor-pointer focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <span className="inline-flex items-center justify-center size-12 shrink-0 text-foreground">
          <ChevronDownIcon
            data-slot="accordion-trigger-icon"
            className="pointer-events-none shrink-0 transition-transform duration-300 ease-out group-aria-expanded/accordion-trigger:rotate-180"
            size={24}
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-closed:animate-accordion-up"
      {...props}
    >
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        transition={{
          height: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          },
          opacity: { duration: 0.2, ease: "easeOut" },
        }}
        className={cn(
          "px-5 pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </motion.div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
