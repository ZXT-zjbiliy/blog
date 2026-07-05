---
title: "tmux常用指令"
description: "tmux 会话、窗口和面板管理常用命令备忘。"
date: 2026-05-09
updated: 2026-05-09
category: "Linux"
tags: ["课程笔记", "Linux", "命令行"]
featured: false
draft: false
---

**会话**

```bash
tmux new                        新建一个 tmux 会话。名字由 tmux 自动生成，比如 0
tmux new -s name                新建一个叫 name 的 tmux 会话
tmux ls                         查看当前有哪些 tmux 会话
tmux attach -t name             重新进入某个 tmux 会话
tmux a -t name                  a 是 attach 的缩写
tmux kill-session -t name       杀掉某个 tmux 会话
tmux kill-server                关闭所有 tmux 会话
```

**在 tmux 里面**

你现在配置大概率是 `Ctrl+a` 作为前缀。也就是先按 `Ctrl+a`，松开，再按后面的键。

```text
Ctrl+a d    暂时离开 tmux，任务继续跑
Ctrl+a c    新建窗口
Ctrl+a n    下一个窗口
Ctrl+a p    上一个窗口
Ctrl+a 0-9  切到对应编号窗口
Ctrl+a ,    重命名当前窗口
Ctrl+a &    关闭当前窗口
```

**分屏**

```text
Ctrl+a |    左右分屏
Ctrl+a -    上下分屏
Ctrl+a x    关闭当前分屏
Ctrl+a o    切换到下一个分屏
Ctrl+a 方向键  切换分屏
```

有些默认配置是：

```text
Ctrl+a %    左右分屏
Ctrl+a "    上下分屏
```

**复制/滚动**

```text
Ctrl+a [    进入滚动/复制模式
方向键/PgUp/PgDn 滚动
q           退出滚动模式
```

**常用场景**

后台跑训练：

```bash
tmux new -s train
python train.py
```

离开但不断开任务：

```text
Ctrl+a d
```

回来：

```bash
tmux attach -t train
```

查看所有会话：

```bash
tmux ls
```
