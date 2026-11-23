"use client";

import {
  createContext,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from "react";
import { classNames } from "@/lib/class-names";

type TabsContextValue = { active: string; setActive: (value: string) => void };
const TabsContext = createContext<TabsContextValue | null>(null);
function useTabs() {
  const value = useContext(TabsContext);
  if (!value) throw new Error("Tabs components must be used inside Tabs");
  return value;
}
export type TabsProps = HTMLAttributes<HTMLDivElement> & { defaultValue: string };
export function Tabs({ children, defaultValue, ...props }: TabsProps) {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsContext value={{ active, setActive }}>
      <div {...props}>{children}</div>
    </TabsContext>
  );
}
export function TabsList(props: HTMLAttributes<HTMLDivElement>) {
  return <div role="tablist" {...props} />;
}
export type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & { value: string };
export function TabsTrigger({ className, value, ...props }: TabsTriggerProps) {
  const { active, setActive } = useTabs();
  const selected = active === value;
  return (
    <button
      aria-selected={selected}
      className={classNames("tabs__trigger", className)}
      onClick={() => setActive(value)}
      role="tab"
      type="button"
      {...props}
    />
  );
}
export type TabsContentProps = HTMLAttributes<HTMLDivElement> & { value: string };
export function TabsContent({ value, ...props }: TabsContentProps) {
  const { active } = useTabs();
  return active === value ? <div role="tabpanel" tabIndex={0} {...props} /> : null;
}
