"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useThemeMode } from "@/components/theme-mode-provider";

export default function ThemeModeSelect() {
  const { mode, setMode } = useThemeMode();

  return (
    <div className="w-full max-w-48">
      <p className="mb-2 text-xs font-heading">
        Theme
      </p>
      <Select
        value={mode}
        onValueChange={(value) => setMode(value as "auto" | "light" | "dark")}
      >
        <SelectTrigger aria-label="Select color mode">
          <SelectValue placeholder="Select mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto">Auto</SelectItem>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
