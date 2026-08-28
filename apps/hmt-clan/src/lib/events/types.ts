export interface EventLink {
  displayName: string;
  url: string;
}

export interface EventConfig {
  name: string;
  slug: string;
  description: string;
  priority: number;
  date: string;
  time?: string;
  showTime: boolean;
  show: boolean;
  showDetailsButton: boolean;
  done: boolean;
  links?: EventLink[];
}
