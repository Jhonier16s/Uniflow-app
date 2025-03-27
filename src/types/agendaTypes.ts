export interface AgendaItem {
    name: string;
    start: string;
    end: string;
  }
  
export type AgendaItems = Record<string, AgendaItem[]>;