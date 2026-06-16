# 学习内容收集说明

## 三套模板概览

### 1. 大学英语四级 (`cet4`)

- **词汇**：4543 条（来自开源 CET4 考纲词表，去重后）
- **高频标签**：前 2500 词标记 `high_frequency`
- **关卡**：75 关
  - 词汇森林 30 关（每关 20 词）
  - 听力洞穴 15 关
  - 阅读废墟 15 关
  - 翻译工坊 10 关
  - Boss 圣殿 5 关（模考）
- **内容文件**：`data/content/cet4/reading.json` 等

### 2. 大学英语六级 (`cet6`)

- **词汇**：3991 条
- **高频标签**：前 2000 词
- **关卡**：75 关（结构与四级相同）
- **内容文件**：`data/content/cet6/`

### 3. 大学英语读写教程3 (`college_english_rw3`) — **第四版**

- **教材对应**：《新视野大学英语（第四版）读写教程 Book 3（思政智慧版）》
- **6 个单元**，每单元 20 词 + Section A/B/C + 阅读 + 听力 + 单元 Boss
- **词汇**：120 条（原创例句）
- **阅读**：6 篇原创短文（非教材原文）
- **关卡**：42 关（每单元 7 关：4 词汇 + 阅读 + 听力 + Boss）

#### 单元列表（第四版）

| 单元 | 英文标题 | 中文主题 | Section A | Section B |
|------|---------|---------|-----------|-----------|
| Unit 1 | The digital age: Are we ready? | 数字时代 | Connection or conversation | Living in the digital world |
| Unit 2 | Life stories | 人生故事 | Zheng He, the great ancient Chinese explorer | Audrey Hepburn — a real angel |
| Unit 3 | Let's go | 出发吧 | The Surprising purpose of travel | Traveling solo — a blessing overall! |
| Unit 4 | When work is a pleasure | 工作乐趣 | Will you be a worker or a laborer? | The joy of a prideful tradition |
| Unit 5 | China's space dream | 中国航天梦 | No limit for China's astronauts... | Chang'e-4 kicked off a new space odyssey |
| Unit 6 | The economy: power behind everyday life | 经济与生活 | Surviving an economic crisis | The sharing economy turns a new page with books |

每单元均含 **Section C: Stories of China** 板块。

## 数据文件位置

```
data/vocabulary/college_english_rw3.json
data/templates/college_english_rw3.json
data/content/college_english_rw3/unit01.json ... unit06.json
```

## 重建命令

```bash
python scripts/build_rw3_content.py
python scripts/build_templates.py
```

或：

```bash
python scripts/build_all.py
```

## 版本变更记录

- **v1.1.0**：读写教程3 从第三版（8单元）更新为第四版（6单元）
- 已删除 `unit07.json`、`unit08.json`

## 版权说明

- CET 词表：开源整理，标注来源
- 读写教程：仅使用公开单元主题，内容为原创仿学材料
- 真题：当前为仿真题，不直接使用历年真题原文
