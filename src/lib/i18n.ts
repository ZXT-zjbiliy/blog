export type Language = "en" | "zh";
export type ContentKind = "notes" | "projects" | "topics";

type EntryTranslation = {
  title: string;
  description: string;
  meta?: string;
  tags?: string[];
};

const entryTranslations: Record<ContentKind, Record<string, EntryTranslation>> = {
  notes: {},
  projects: {
    "liquid-identification": {
      title: "瓶装液体液位识别",
      description: "基于 YOLO OBB 的瓶装液体状态识别项目，包含多标签训练、预测和传统机器学习对照流程",
      meta: "研究",
      tags: ["Python", "YOLO OBB", "Ultralytics", "计算机视觉", "传统机器学习"]
    },
    "minimind-llava-v": {
      title: "MiniMind LLaVA-V",
      description: "把 MiniMind、视觉塔和 LLaVA 风格 projector 接成轻量多模态训练闭环",
      meta: "实验",
      tags: ["Python", "PyTorch", "Transformers", "多模态", "LLaVA"]
    },
    atti: {
      title: "ATTI",
      description: "本地优先的人格测试辅助填写浏览器扩展，支持规划、预览和显式填充",
      meta: "进行中",
      tags: ["TypeScript", "浏览器扩展", "本地优先", "适配器", "自动化"]
    }
  },
  topics: {
    "engineering-practice": {
      title: "工程实践",
      description: "公开项目、实现记录和工程复盘的长期线索",
      meta: "主题",
      tags: ["工程", "部署", "项目"]
    }
  }
};

const tagTranslations: Record<string, string> = {
  Adapters: "适配器",
  Agent: "智能体",
  "AI Infra": "AI 基础设施",
  Automation: "自动化",
  Astro: "Astro",
  "Browser Automation": "浏览器自动化",
  "Browser Extension": "浏览器扩展",
  "Classical ML": "传统机器学习",
  "Computer Vision": "计算机视觉",
  Deployment: "部署",
  Edge: "Edge",
  Engineering: "工程",
  "GitHub Pages": "GitHub Pages",
  LLaVA: "LLaVA",
  "Local-first": "本地优先",
  MCP: "MCP",
  MDX: "MDX",
  MiniMind: "MiniMind",
  Multimodal: "多模态",
  Projects: "项目",
  PyTorch: "PyTorch",
  Python: "Python",
  Reading: "阅读",
  Tools: "工具",
  Transformers: "Transformers",
  TypeScript: "TypeScript",
  Ultralytics: "Ultralytics",
  VLM: "视觉语言模型",
  "YOLO OBB": "YOLO OBB"
};

const statusTranslations: Record<string, string> = {
  active: "进行中",
  research: "研究",
  experiment: "实验",
  archived: "归档"
};

export function entryZh(kind: ContentKind, id: string): EntryTranslation | undefined {
  return entryTranslations[kind][id];
}

export function tagZh(tag: string): string {
  return tagTranslations[tag] ?? tag;
}

export function statusZh(status: string): string {
  return statusTranslations[status] ?? status;
}

export function countMetaZh(noteCount: number, projectCount: number): string {
  return `${noteCount} 篇笔记 / ${projectCount} 个项目`;
}
