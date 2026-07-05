export type Language = "en" | "zh";
export type ContentKind = "notes" | "projects" | "topics";

type EntryTranslation = {
  title: string;
  description: string;
  meta?: string;
  tags?: string[];
};

const entryTranslations: Record<ContentKind, Record<string, EntryTranslation>> = {
  notes: {
    "agent-systems-map": {
      title: "智能体系统地图",
      description: "一份用于阅读和构建智能体系统的工作地图。",
      meta: "AI 基础设施",
      tags: ["智能体", "AI 基础设施", "阅读"]
    },
    "mcp-field-notes": {
      title: "MCP 现场笔记",
      description: "关于 MCP 服务器、工具、资源和产品界面的笔记。",
      meta: "协议",
      tags: ["MCP", "智能体", "工具"]
    },
    "github-pages-astro-setup": {
      title: "Astro 部署到 GitHub Pages",
      description: "使用 GitHub Pages 部署 Astro 静态站点的记录。",
      meta: "工程",
      tags: ["Astro", "GitHub Pages", "部署"]
    }
  },
  projects: {
    "atti-adapter-research": {
      title: "ATTI 适配器研究",
      description: "用混合适配器方案改造人格测试站点的规划和架构记录。",
      meta: "研究",
      tags: ["TypeScript", "浏览器自动化", "适配器"]
    },
    "personal-site": {
      title: "个人站点",
      description: "一个承载笔记、项目、主题和公开写作的个人门户。",
      meta: "进行中",
      tags: ["Astro", "MDX", "GitHub Pages"]
    }
  },
  topics: {
    "agent-systems": {
      title: "智能体系统",
      description: "关于智能体架构、工具调用、协议和产品模式的系列。",
      meta: "主题",
      tags: ["智能体", "MCP", "AI 基础设施"]
    },
    "engineering-practice": {
      title: "工程实践",
      description: "实现记录、部署模式和项目复盘。",
      meta: "主题",
      tags: ["工程", "部署", "项目"]
    }
  }
};

const tagTranslations: Record<string, string> = {
  Adapters: "适配器",
  Agent: "智能体",
  "AI Infra": "AI 基础设施",
  Astro: "Astro",
  "Browser Automation": "浏览器自动化",
  Deployment: "部署",
  Engineering: "工程",
  "GitHub Pages": "GitHub Pages",
  MCP: "MCP",
  MDX: "MDX",
  Projects: "项目",
  Reading: "阅读",
  Tools: "工具",
  TypeScript: "TypeScript"
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
