---
title: "数据结构（Hello 算法）"
description: "数据结构与算法 课程笔记，导入自 Obsidian。"
date: 2026-04-20
updated: 2026-04-20
category: "数据结构与算法"
tags: ["课程笔记", "数据结构与算法", "算法"]
featured: false
draft: false
---

# 第一章 目录
- 第二章 复杂度分析
- 第三章 数据结构
- 第四章 数组与链表
- 第五章 栈与队列
- 第六章 哈希表
- 第七章 树
- 第八章 堆
- 第九章 图
- [第十章 不相交集（并查集）](/blog/notes/courses/course-data-structures-algorithms/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-hello-%E7%AE%97%E6%B3%95)
- [第十一章 倒排索引](/blog/notes/courses/course-data-structures-algorithms/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-hello-%E7%AE%97%E6%B3%95)

# 第二章 复杂度分析
## 一、迭代与递归
### 1. 基础
1. 迭代 **“自下而上”** 从最基础步骤开始
   递归 **“自上而下”** 分解问题为更小问题
2. **栈帧空间** 存储函数的上下文数据
   **调用帧** 分配栈帧，用于存储当前函数
### 2. 尾递归
1. **普通递归**：当函数返回到上一层级的函数后，需要继续执行代码，因此系统需要保存上一层调用的上下文。
2. **尾递归**tail recursion：递归调用是函数返回前的最后一个操作，系统无须保存上一层函数的上下文(一直向下)
3. **改变方法**: 将递归函数设置为*返回结果*
## 二、时空复杂度
### 1. 渐进上界
1. **渐进上界 asymptotic upper bound 记作**  $O\left(n\right)$  , 称为 **大 O 记号**（big-O notation）
2. **定义**：若存在正实数 $c$ 和实数 $n_{0}$ ，使得对于所有的 $n>n_{0}$ ，均有 **$T\left(n\right)\le c*f\left(n\right)$** ，则可认为 $f\left(n\right)$ 给出了 $T\left(n\right)$ 的一个渐近上界，记为 $T\left(n\right)=O\left(f\left(n\right)\right)$。
3. $O\left(n\right)$ 对应**最差时间复杂度** ，相应的，$\Omega\left(n\right)$ 对应**最好时间复杂度** ，$\Theta\left(n\right)$ 对应**平均时间复杂度**
4. $\Theta\left(n\right)≠O(n)$时，记作小$o$，即为$o(n)$
### 2. 常见类型
1. $O\left(1\right)<O\left(\log n\right)<O\left(n\right)<O\left(n \log n\right)<O\left(n^{2}\right)<O\left(2^{n}\right)<O\left(n!\right)$
   常数阶$<$对数阶$<$线性阶$<$线性对数阶$<$平方阶$<$指数阶$<$阶乘阶
### 3. 算法相关空间
1. **输入空间**：用于存储算法的输入数据。
2. **暂存空间**：用于存储算法在运行过程中的变量、对象、函数上下文等数据。
	- **暂存数据**：用于保存算法运行过程中的各种常量、变量、对象等。
	- **栈帧空间**：用于保存调用函数的上下文数据。系统在每次调用函数时都会在栈顶部创建一个栈帧，函数返回后，栈帧空间会被释放。
	- **指令空间**：用于保存编译后的程序指令，在实际统计中通常忽略不计。
3. **输出空间**：用于存储算法的输出数据。
分析一段程序的空间复杂度时，**我们通常统计暂存数据、栈帧空间和输出数据三部分**。
**通常只关注最差空间复杂度**,内存空间是一项硬性要求，必须确保在所有输入数据下都有足够的内存空间预留。

# 第三章 数据结构
## 一、数据结构分类
### 1.  逻辑结构：线性与非线性
1. **线性数据结构**：数组、链表、栈、队列、哈希表，元素之间是**一对一**的顺序关系。
2. **非线性数据结构**：树、堆、图、哈希表。
	+ **树形结构**：树、堆、哈希表，元素之间是一对多的关系。
	+ **网状结构**：图，元素之间是多对多的关系。
+ 注：哈希表可构造**线性和非线性**两种结构(哈希表底层是数组，而为了解决哈希冲突，我们可能会使用“链式地址”,数组中每个桶指向一个链表，当链表长度超过一定阈值时，又可能被转化为树)
["数据结构图"（外部图片）](https://www.hello-algo.com/chapter_data_structure/classification_of_data_structure.assets/classification_logic_structure.png)
### 2. 物理结构：连续与分散
1. **基于数组可实现**：栈、队列、哈希表、树、堆、图、矩阵、张量（维度 ≥3 的数组）等。
2. **基于链表可实现**：栈、队列、哈希表、树、堆、图等。
3. 链表初始化后可调整长度，也称 *“动态数据结构”* 。数组在初始化后长度不可变，也称 *“静态数据结构”* 。数组可通过重新分配内存实现长度变化，从而具备*一定的“动态性”*。
## 二、编码
### 1.  种类（数字编码，字符编码）
1. **Unicode“统一码”**
	+ 将所有字符存储为**2字节**等长的编码
	+ **高位填 0**补空缺
2. **UTF-8**
	+ 长度为 $1$ 字节的字符，将**最高位设置为 $0$**
	+ 对于长度为 $n$ 字节的字符（其中 $n>1$），将首个字节的**高 n 位都设置为 $1$**，第 $n+1$ 位设置为 $0$ ；从第二个字节开始，将每个字节的**高 $2$ 位都设置为 $10$**
3. 其他字符编码：
	- **UTF-16 编码**：使用 2 或 4 字节来表示一个字符。所有的 ASCII 字符和常用的非英文字符，都用 2 字节表示，少数字符用 4 字节表示。对于 2 字节的字符，UTF-16 编码与 Unicode 码点相等。
	- **UTF-32 编码**：每个字符都使用 4 字节。

### 2.特性

| 特性    | UTF-16 编码                  | UTF-8 编码                        |
| ----- | -------------------------- | ------------------------------- |
| 随机访问  | 容易，$O\left(1\right)$ 时间复杂度 | 遍历，$O\left(n\right)$ 时间复杂度      |
| 字符计数  | $O\left(1\right)$ 时间复杂度    | 遍历整个字符串，$O\left(n\right)$ 时间复杂度 |
| 字符串操作 | 容易进行（分割、连接、插入、删除等）         | 额外计算，确保不产生无效编码                  |
# 第四章 数组与链表
## 一、数组（array）

**索引（index）**：元素在数组中的位置，本质上是**内存地址的偏移量**
### 1. 访问元素
1. 由该元素的内存地址直接访问该元素
2. $O\left(1\right)$ 时间复杂度
### 2. 插入与删除
- **时间复杂度高**：数组的插入和删除的**平均时间复杂度**均为 $O\left(n\right)$
- **丢失元素**：数组的长度不可变，插入元素后，超出数组长度范围的元素会丢失。
- **内存浪费**：我们可以初始化一个比较长的数组，只用前面一部分，这样在插入数据时，丢失的末尾元素都是“无意义”的，但这样做会造成部分内存空间浪费。
### 3. 优点与局限性
1. **优点**
	- **空间效率高**：数组为数据分配了连续的内存块，无须额外的结构开销。
	- **支持随机访问**：数组允许在 O(1) 时间内访问任何元素。
	- **<font color=red>缓存局部性</font>**：当访问数组元素时，计算机不仅会加载它，还会缓存其周围的其他数据，从而借助高速缓存来提升后续操作的执行速度。

2. **局限性**
	- **插入与删除效率低**：当数组中元素较多时，插入与删除操作需要移动大量的元素。
	- **长度不可变**：数组在初始化后长度就固定了，扩容数组需要将所有数据复制到新数组，开销很大。
	- **空间浪费**：如果数组分配的大小超过实际所需，那么多余的空间就被浪费了。
## 二、链表（linked list）
### 1.  定义
1. 由**节点（node）** 组成，每个节点都包含*值*和指向下一节点的*引用*
### 2. 链表常用操作
1.   初始化链表
2.   插入节点
3.   删除节点
4.   访问节点
5.   查找节点
### 3. 常见链表类型

- **单向链表**：即前面介绍的普通链表。单向链表的节点包含值和指向下一节点的引用两项数据。我们将首个节点称为头节点，将最后一个节点称为尾节点，尾节点指向空 `None` 。
- **环形链表**：如果我们令单向链表的尾节点指向头节点（首尾相接），则得到一个环形链表。在环形链表中，任意节点都可以视作头节点。
- **双向链表**：与单向链表相比，双向链表记录了两个方向的引用。双向链表的节点定义同时包含指向后继节点（下一个节点）和前驱节点（上一个节点）的引用（指针）。相较于单向链表，双向链表更具灵活性，可以朝两个方向遍历链表，但相应地也需要占用更多的内存空间。
[三种链表（外部图片）](https://www.hello-algo.com/chapter_array_and_linkedlist/linked_list.assets/linkedlist_common_types.png)
### 4. 链表典型应用

1. **单向链表**通常用于实现栈、队列、哈希表和图等数据结构。
	- **栈与队列**：当插入和删除操作都在链表的一端进行时，它表现的特性为先进后出，对应栈；当插入操作在链表的一端进行，删除操作在链表的另一端进行，它表现的特性为先进先出，对应队列。
	- **哈希表**：链式地址是解决**哈希冲突**的主流方案之一，在该方案中，所有冲突的元素都会被放到一个链表中。
	- **图**：邻接表是表示图的一种常用方式，其中图的每个顶点都与一个链表相关联，链表中的每个元素都代表与该顶点相连的其他顶点。
2. **双向链表**常用于需要快速查找前一个和后一个元素的场景。
	- **高级数据结构**：比如在红黑树、B 树中，我们需要访问节点的父节点，这可以通过在节点中保存一个指向父节点的引用来实现，类似于双向链表。
	- **浏览器历史**：在网页浏览器中，当用户点击前进或后退按钮时，浏览器需要知道用户访问过的前一个和后一个网页。双向链表的特性使得这种操作变得简单。
	- **LRU 算法**：在缓存淘汰（LRU）算法中，我们需要快速找到最近最少使用的数据，以及支持快速添加和删除节点。这时候使用双向链表就非常合适。(bonus 1)
3. **环形链表**常用于需要周期性操作的场景，比如操作系统的资源调度。
	- **时间片轮转调度算法**：在操作系统中，时间片轮转调度算法是一种常见的 CPU 调度算法，它需要对一组进程进行循环。每个进程被赋予一个时间片，当时间片用完时，CPU 将切换到下一个进程。这种循环操作可以通过环形链表来实现。
	- **数据缓冲区**：在某些数据缓冲区的实现中，也可能会使用环形链表。比如在音频、视频播放器中，数据流可能会被分成多个缓冲块并放入一个环形链表，以便实现无缝播放。
### 5. 基于游标法的实现
1. 核心：  **模仿malloc与free函数**
2. 代码
	```c
	int cursor_malloc()//模仿malloc
	{
		int p=cursor[0].next;
		cursor[0].next=cursor[p].next;
		return p;
	}
	int cursor_free(int p)
	{
		cursor[p].next=cursor[0].next;
		cursor[0].next=p;
	}
	```

## 三、列表
表示元素的有序集合，支持元素**访问、修改、添加、删除和遍历**等操作，无须使用者考虑容量限制的问题。列表可以基于**链表或数组**实现
### 1. 列表常用操作 c++
1.   **初始化**列表
	+ 无初始值 `vector<int> nums;`
	+ 有初始值 `vector<int> nums = { 1, 3, 2, 5, 4 };`
2.   **访问**元素 `int num = nums[1];`
3.   **插入与删除**元素
	+ 清空列表 `nums.clear();`
	+ 尾部添加  `nums.push_back();`
	+ 中间插入元素 `nums.insert(nums.begin() + 3, 6);`
	+ 删除元素 `nums.erase(nums.begin() + 3);`
4.   **遍历**列表
	+ 索引遍历 `for (int i = 0; i < nums.size(); i++)`
	+ 直接遍历 `for (int num : nums)`
5.   **拼接**列表 `nums.insert(nums.end(), nums1.begin(), nums1.end());`
6.   **排序**列表 `sort(nums.begin(), nums.end());`
### 2. 列表实现
 1. 三个重点设计
	- **初始容量**：选取一个合理的数组初始容量。在本示例中，我们选择 10 作为初始容量。
	- **数量记录**：声明一个变量 `size` ，用于记录列表当前元素数量，并随着元素插入和删除实时更新。根据此变量，我们可以定位列表尾部，以及判断是否需要扩容。
	- **扩容机制**：若插入元素时列表容量已满，则需要进行扩容。先根据扩容倍数创建一个更大的数组，再将当前数组的所有元素依次移动至新数组。在本示例中，我们规定每次将数组扩容至之前的 2 倍。
2. `C++`
	```cpp
	/* 列表类 */
	class MyList {
	  private:
	    int *arr;             // 数组（存储列表元素）
	    int arrCapacity = 10; // 列表容量
	    int arrSize = 0;      // 列表长度（当前元素数量）
	    int extendRatio = 2;   // 每次列表扩容的倍数

	  public:
	    /* 构造方法 */
	    MyList() {
	        arr = new int[arrCapacity];
	    }

	    /* 析构方法 */
	    ~MyList() {
	        delete[] arr;
	    }

	    /* 获取列表长度（当前元素数量）*/
	    int size() {
	        return arrSize;
	    }

	    /* 获取列表容量 */
	    int capacity() {
	        return arrCapacity;
	    }

	    /* 访问元素 */
	    int get(int index) {
	        // 索引如果越界，则抛出异常，下同
	        if (index < 0 || index >= size())
	            throw out_of_range("索引越界");
	        return arr[index];
	    }

	    /* 更新元素 */
	    void set(int index, int num) {
	        if (index < 0 || index >= size())
	            throw out_of_range("索引越界");
	        arr[index] = num;
	    }

	    /* 在尾部添加元素 */
	    void add(int num) {
	        // 元素数量超出容量时，触发扩容机制
	        if (size() == capacity())
	            extendCapacity();
	        arr[size()] = num;
	        // 更新元素数量
	        arrSize++;
	    }

	    /* 在中间插入元素 */
	    void insert(int index, int num) {
	        if (index < 0 || index >= size())
	            throw out_of_range("索引越界");
	        // 元素数量超出容量时，触发扩容机制
	        if (size() == capacity())
	            extendCapacity();
	        // 将索引 index 以及之后的元素都向后移动一位
	        for (int j = size() - 1; j >= index; j--) {
	            arr[j + 1] = arr[j];
	        }
	        arr[index] = num;
	        // 更新元素数量
	        arrSize++;
	    }

	    /* 删除元素 */
	    int remove(int index) {
	        if (index < 0 || index >= size())
	            throw out_of_range("索引越界");
	        int num = arr[index];
	        // 将索引 index 之后的元素都向前移动一位
	        for (int j = index; j < size() - 1; j++) {
	            arr[j] = arr[j + 1];
	        }
	        // 更新元素数量
	        arrSize--;
	        // 返回被删除的元素
	        return num;
	    }

	    /* 列表扩容 */
	    void extendCapacity() {
	        // 新建一个长度为原数组 extendRatio 倍的新数组
	        int newCapacity = capacity() * extendRatio;
	        int *tmp = arr;
	        arr = new int[newCapacity];
	        // 将原数组中的所有元素复制到新数组
	        for (int i = 0; i < size(); i++) {
	            arr[i] = tmp[i];
	        }
	        // 释放内存
	        delete[] tmp;
	        arrCapacity = newCapacity;
	    }

	    /* 将列表转换为 Vector 用于打印 */
	    vector<int> toVector() {
	        // 仅转换有效长度范围内的列表元素
	        vector<int> vec(size());
	        for (int i = 0; i < size(); i++) {
	            vec[i] = arr[i];
	        }
	        return vec;
	    }
	};
	```
3. `C`
	```c
	/* 列表类 */
	typedef struct {
	    int *arr;        // 数组（存储列表元素）
	    int capacity;    // 列表容量
	    int size;        // 列表大小
	    int extendRatio; // 列表每次扩容的倍数
	} MyList;

	/* 构造函数 */
	MyList *newMyList() {
	    MyList *nums = malloc(sizeof(MyList));
	    nums->capacity = 10;
	    nums->arr = malloc(sizeof(int) * nums->capacity);
	    nums->size = 0;
	    nums->extendRatio = 2;
	    return nums;
	}

	/* 析构函数 */
	void delMyList(MyList *nums) {
	    free(nums->arr);
	    free(nums);
	}

	/* 获取列表长度 */
	int size(MyList *nums) {
	    return nums->size;
	}

	/* 获取列表容量 */
	int capacity(MyList *nums) {
	    return nums->capacity;
	}

	/* 访问元素 */
	int get(MyList *nums, int index) {
	    assert(index >= 0 && index < nums->size);
	    return nums->arr[index];
	}

	/* 更新元素 */
	void set(MyList *nums, int index, int num) {
	    assert(index >= 0 && index < nums->size);
	    nums->arr[index] = num;
	}

	/* 在尾部添加元素 */
	void add(MyList *nums, int num) {
	    if (size(nums) == capacity(nums)) {
	        extendCapacity(nums); // 扩容
	    }
	    nums->arr[size(nums)] = num;
	    nums->size++;
	}

	/* 在中间插入元素 */
	void insert(MyList *nums, int index, int num) {
	    assert(index >= 0 && index < size(nums));
	    // 元素数量超出容量时，触发扩容机制
	    if (size(nums) == capacity(nums)) {
	        extendCapacity(nums); // 扩容
	    }
	    for (int i = size(nums); i > index; --i) {
	        nums->arr[i] = nums->arr[i - 1];
	    }
	    nums->arr[index] = num;
	    nums->size++;
	}

	/* 删除元素 */
	// 注意：stdio.h 占用了 remove 关键词
	int removeItem(MyList *nums, int index) {
	    assert(index >= 0 && index < size(nums));
	    int num = nums->arr[index];
	    for (int i = index; i < size(nums) - 1; i++) {
	        nums->arr[i] = nums->arr[i + 1];
	    }
	    nums->size--;
	    return num;
	}

	/* 列表扩容 */
	void extendCapacity(MyList *nums) {
	    // 先分配空间
	    int newCapacity = capacity(nums) * nums->extendRatio;
	    int *extend = (int *)malloc(sizeof(int) * newCapacity);
	    int *temp = nums->arr;

	    // 拷贝旧数据到新数据
	    for (int i = 0; i < size(nums); i++)
	        extend[i] = nums->arr[i];

	    // 释放旧数据
	    free(temp);

	    // 更新新数据
	    nums->arr = extend;
	    nums->capacity = newCapacity;
	}

	/* 将列表转换为 Array 用于打印 */
	int *toArray(MyList *nums) {
	    return nums->arr;
	}
	```
# 第五章 栈与队列
## 一、 栈的常用操作
| 方法       | 描述          | 时间复杂度 |
| -------- | ----------- | ----- |
| `push()` | 元素入栈（添加至栈顶） | O(1)  |
| `pop()`  | 栈顶元素出栈      | O(1)  |
| `peek()` | 访问栈顶元素      | O(1)  |
## 二、 栈的实现
### 1. 基于链表的实现
```c
/* 基于链表实现的栈 */
typedef struct {
    ListNode *top; // 将头节点作为栈顶
    int size;      // 栈的长度
} LinkedListStack;

/* 构造函数 */
LinkedListStack *newLinkedListStack() {
    LinkedListStack *s = malloc(sizeof(LinkedListStack));
    s->top = NULL;
    s->size = 0;
    return s;
}

/* 析构函数 */
void delLinkedListStack(LinkedListStack *s) {
    while (s->top) {
        ListNode *n = s->top->next;
        free(s->top);
        s->top = n;
    }
    free(s);
}

/* 获取栈的长度 */
int size(LinkedListStack *s) {
    return s->size;
}

/* 判断栈是否为空 */
bool isEmpty(LinkedListStack *s) {
    return size(s) == 0;
}

/* 入栈 */
void push(LinkedListStack *s, int num) {
    ListNode *node = (ListNode *)malloc(sizeof(ListNode));
    node->next = s->top; // 更新新加节点指针域
    node->val = num;     // 更新新加节点数据域
    s->top = node;       // 更新栈顶
    s->size++;           // 更新栈大小
}

/* 访问栈顶元素 */
int peek(LinkedListStack *s) {
    if (s->size == 0) {
        printf("栈为空\n");
        return INT_MAX;
    }
    return s->top->val;
}

/* 出栈 */
int pop(LinkedListStack *s) {
    int val = peek(s);
    ListNode *tmp = s->top;
    s->top = s->top->next;
    // 释放内存
    free(tmp);
    s->size--;
    return val;
}
```
### 2. 基于数组的实现
+ 使用一个变量 `front` 指向队首元素的索引，并维护一个变量 `size` 用于记录队列长度。定义 `rear = front + size`
+ 环形数组，我们需要让 `front` 或 `rear` 在越过数组尾部时，直接回到数组头部继续遍历,公式`rear = (queue->front + queue->queSize) % queue->queCapacity;`
```c
/* 基于数组实现的栈 */
typedef struct {
    int *data;
    int size;
} ArrayStack;

/* 构造函数 */
ArrayStack *newArrayStack() {
    ArrayStack *stack = malloc(sizeof(ArrayStack));
    // 初始化一个大容量，避免扩容
    stack->data = malloc(sizeof(int) * MAX_SIZE);
    stack->size = 0;
    return stack;
}

/* 析构函数 */
void delArrayStack(ArrayStack *stack) {
    free(stack->data);
    free(stack);
}

/* 获取栈的长度 */
int size(ArrayStack *stack) {
    return stack->size;
}

/* 判断栈是否为空 */
bool isEmpty(ArrayStack *stack) {
    return stack->size == 0;
}

/* 入栈 */
void push(ArrayStack *stack, int num) {
    if (stack->size == MAX_SIZE) {
        printf("栈已满\n");
        return;
    }
    stack->data[stack->size] = num;
    stack->size++;
}

/* 访问栈顶元素 */
int peek(ArrayStack *stack) {
    if (stack->size == 0) {
        printf("栈为空\n");
        return INT_MAX;
    }
    return stack->data[stack->size - 1];
}

/* 出栈 */
int pop(ArrayStack *stack) {
    int val = peek(stack);
    stack->size--;
    return val;
}
```
### 3.前中后缀表达式
**详见**
	a. ***[零零碎碎的算法 五. 前中后缀表达式详解](/blog/notes/courses/course-data-structures-algorithms/%E9%9B%B6%E9%9B%B6%E7%A2%8E%E7%A2%8E%E7%9A%84%E7%AE%97%E6%B3%95)***
	b. ***[Hello 算法 表达式树](/blog/notes/courses/course-data-structures-algorithms/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-hello-%E7%AE%97%E6%B3%95)***
## 三、队列常用操作
| 方法名      | 描述             | 时间复杂度 |
| -------- | -------------- | ----- |
| `push()` | 元素入队，即将元素添加至队尾 | O(1)  |
| `pop()`  | 队首元素出队         | O(1)  |
| `peek()` | 访问队首元素         | O(1)  |
## 四、队列实现
### 1.   基于链表的实现
```c
/* 基于链表实现的队列 */
typedef struct {
    ListNode *front, *rear;
    int queSize;
} LinkedListQueue;

/* 构造函数 */
LinkedListQueue *newLinkedListQueue() {
    LinkedListQueue *queue = (LinkedListQueue *)malloc(sizeof(LinkedListQueue));
    queue->front = NULL;
    queue->rear = NULL;
    queue->queSize = 0;
    return queue;
}

/* 析构函数 */
void delLinkedListQueue(LinkedListQueue *queue) {
    // 释放所有节点
    while (queue->front != NULL) {
        ListNode *tmp = queue->front;
        queue->front = queue->front->next;
        free(tmp);
    }
    // 释放 queue 结构体
    free(queue);
}

/* 获取队列的长度 */
int size(LinkedListQueue *queue) {
    return queue->queSize;
}

/* 判断队列是否为空 */
bool empty(LinkedListQueue *queue) {
    return (size(queue) == 0);
}

/* 入队 */
void push(LinkedListQueue *queue, int num) {
    // 尾节点处添加 node
    ListNode *node = newListNode(num);
    // 如果队列为空，则令头、尾节点都指向该节点
    if (queue->front == NULL) {
        queue->front = node;
        queue->rear = node;
    }
    // 如果队列不为空，则将该节点添加到尾节点后
    else {
        queue->rear->next = node;
        queue->rear = node;
    }
    queue->queSize++;
}

/* 访问队首元素 */
int peek(LinkedListQueue *queue) {
    assert(size(queue) && queue->front);
    return queue->front->val;
}

/* 出队 */
int pop(LinkedListQueue *queue) {
    int num = peek(queue);
    ListNode *tmp = queue->front;
    queue->front = queue->front->next;
    free(tmp);
    queue->queSize--;
    return num;
}

/* 打印队列 */
void printLinkedListQueue(LinkedListQueue *queue) {
    int *arr = malloc(sizeof(int) * queue->queSize);
    // 拷贝链表中的数据到数组
    int i;
    ListNode *node;
    for (i = 0, node = queue->front; i < queue->queSize; i++) {
        arr[i] = node->val;
        node = node->next;
    }
    printArray(arr, queue->queSize);
    free(arr);
}
```
### 2.   基于数组的实现
```c
/* 基于环形数组实现的队列 */
typedef struct {
    int *nums;       // 用于存储队列元素的数组
    int front;       // 队首指针，指向队首元素
    int queSize;     // 尾指针，指向队尾 + 1
    int queCapacity; // 队列容量
} ArrayQueue;

/* 构造函数 */
ArrayQueue *newArrayQueue(int capacity) {
    ArrayQueue *queue = (ArrayQueue *)malloc(sizeof(ArrayQueue));
    // 初始化数组
    queue->queCapacity = capacity;
    queue->nums = (int *)malloc(sizeof(int) * queue->queCapacity);
    queue->front = queue->queSize = 0;
    return queue;
}

/* 析构函数 */
void delArrayQueue(ArrayQueue *queue) {
    free(queue->nums);
    free(queue);
}

/* 获取队列的容量 */
int capacity(ArrayQueue *queue) {
    return queue->queCapacity;
}

/* 获取队列的长度 */
int size(ArrayQueue *queue) {
    return queue->queSize;
}

/* 判断队列是否为空 */
bool empty(ArrayQueue *queue) {
    return queue->queSize == 0;
}

/* 访问队首元素 */
int peek(ArrayQueue *queue) {
    assert(size(queue) != 0);
    return queue->nums[queue->front];
}

/* 入队 */
void push(ArrayQueue *queue, int num) {
    if (size(queue) == capacity(queue)) {
        printf("队列已满\r\n");
        return;
    }
    // 计算队尾指针，指向队尾索引 + 1
    // 通过取余操作实现 rear 越过数组尾部后回到头部
    int rear = (queue->front + queue->queSize) % queue->queCapacity;
    // 将 num 添加至队尾
    queue->nums[rear] = num;
    queue->queSize++;
}

/* 出队 */
int pop(ArrayQueue *queue) {
    int num = peek(queue);
    // 队首指针向后移动一位，若越过尾部，则返回到数组头部
    queue->front = (queue->front + 1) % queue->queCapacity;
    queue->queSize--;
    return num;
}

/* 返回数组用于打印 */
int *toArray(ArrayQueue *queue, int *queSize) {
    *queSize = queue->queSize;
    int *res = (int *)calloc(queue->queSize, sizeof(int));
    int j = queue->front;
    for (int i = 0; i < queue->queSize; i++) {
        res[i] = queue->nums[j % queue->queCapacity];
        j++;
    }
    return res;
}
```
## 五、双向队列
### 1. 双向队列常用操作
| 方法名            | 描述       | 时间复杂度  |
| -------------- | -------- | ------ |
| `push_front()` | 将元素添加至队首 | $O(1)$ |
| `push_back()`  | 将元素添加至队尾 | $O(1)$ |
| `pop_front()`  | 删除队首元素   | $O(1)$ |
| `pop_back`     | 删除队尾元素   | $O(1)$ |
| `peek_front()` | 访问队首元素   | $O(1)$ |
| `peek_back()`  | 访问队尾元素   | $O(1)$ |
### 2. 双向队列实现
#### 1. 采用“双向链表”
```c
/* 双向链表节点 */
typedef struct DoublyListNode {
    int val;                     // 节点值
    struct DoublyListNode *next; // 后继节点
    struct DoublyListNode *prev; // 前驱节点
} DoublyListNode;

/* 构造函数 */
DoublyListNode *newDoublyListNode(int num) {
    DoublyListNode *new = (DoublyListNode *)malloc(sizeof(DoublyListNode));
    new->val = num;
    new->next = NULL;
    new->prev = NULL;
    return new;
}

/* 析构函数 */
void delDoublyListNode(DoublyListNode *node) {
    free(node);
}

/* 基于双向链表实现的双向队列 */
typedef struct {
    DoublyListNode *front, *rear; // 头节点 front ，尾节点 rear
    int queSize;                  // 双向队列的长度
} LinkedListDeque;

/* 构造函数 */
LinkedListDeque *newLinkedListDeque() {
    LinkedListDeque *deque = (LinkedListDeque *)malloc(sizeof(LinkedListDeque));
    deque->front = NULL;
    deque->rear = NULL;
    deque->queSize = 0;
    return deque;
}

/* 析构函数 */
void delLinkedListdeque(LinkedListDeque *deque) {
    // 释放所有节点
    for (int i = 0; i < deque->queSize && deque->front != NULL; i++) {
        DoublyListNode *tmp = deque->front;
        deque->front = deque->front->next;
        free(tmp);
    }
    // 释放 deque 结构体
    free(deque);
}

/* 获取队列的长度 */
int size(LinkedListDeque *deque) {
    return deque->queSize;
}

/* 判断队列是否为空 */
bool empty(LinkedListDeque *deque) {
    return (size(deque) == 0);
}

/* 入队 */
void push(LinkedListDeque *deque, int num, bool isFront) {
    DoublyListNode *node = newDoublyListNode(num);
    // 若链表为空，则令 front 和 rear 都指向node
    if (empty(deque)) {
        deque->front = deque->rear = node;
    }
    // 队首入队操作
    else if (isFront) {
        // 将 node 添加至链表头部
        deque->front->prev = node;
        node->next = deque->front;
        deque->front = node; // 更新头节点
    }
    // 队尾入队操作
    else {
        // 将 node 添加至链表尾部
        deque->rear->next = node;
        node->prev = deque->rear;
        deque->rear = node;
    }
    deque->queSize++; // 更新队列长度
}

/* 队首入队 */
void pushFirst(LinkedListDeque *deque, int num) {
    push(deque, num, true);
}

/* 队尾入队 */
void pushLast(LinkedListDeque *deque, int num) {
    push(deque, num, false);
}

/* 访问队首元素 */
int peekFirst(LinkedListDeque *deque) {
    assert(size(deque) && deque->front);
    return deque->front->val;
}

/* 访问队尾元素 */
int peekLast(LinkedListDeque *deque) {
    assert(size(deque) && deque->rear);
    return deque->rear->val;
}

/* 出队 */
int pop(LinkedListDeque *deque, bool isFront) {
    if (empty(deque))
        return -1;
    int val;
    // 队首出队操作
    if (isFront) {
        val = peekFirst(deque); // 暂存头节点值
        DoublyListNode *fNext = deque->front->next;
        if (fNext) {
            fNext->prev = NULL;
            deque->front->next = NULL;
        }
        delDoublyListNode(deque->front);
        deque->front = fNext; // 更新头节点
    }
    // 队尾出队操作
    else {
        val = peekLast(deque); // 暂存尾节点值
        DoublyListNode *rPrev = deque->rear->prev;
        if (rPrev) {
            rPrev->next = NULL;
            deque->rear->prev = NULL;
        }
        delDoublyListNode(deque->rear);
        deque->rear = rPrev; // 更新尾节点
    }
    deque->queSize--; // 更新队列长度
    return val;
}

/* 队首出队 */
int popFirst(LinkedListDeque *deque) {
    return pop(deque, true);
}

/* 队尾出队 */
int popLast(LinkedListDeque *deque) {
    return pop(deque, false);
}

/* 打印队列 */
void printLinkedListDeque(LinkedListDeque *deque) {
    int *arr = malloc(sizeof(int) * deque->queSize);
    // 拷贝链表中的数据到数组
    int i;
    DoublyListNode *node;
    for (i = 0, node = deque->front; i < deque->queSize; i++) {
        arr[i] = node->val;
        node = node->next;
    }
    printArray(arr, deque->queSize);
    free(arr);
}
```
#### 2. 基于数组的实现
```c
/* 基于环形数组实现的双向队列 */
typedef struct {
    int *nums;       // 用于存储队列元素的数组
    int front;       // 队首指针，指向队首元素
    int queSize;     // 尾指针，指向队尾 + 1
    int queCapacity; // 队列容量
} ArrayDeque;

/* 构造函数 */
ArrayDeque *newArrayDeque(int capacity) {
    ArrayDeque *deque = (ArrayDeque *)malloc(sizeof(ArrayDeque));
    // 初始化数组
    deque->queCapacity = capacity;
    deque->nums = (int *)malloc(sizeof(int) * deque->queCapacity);
    deque->front = deque->queSize = 0;
    return deque;
}

/* 析构函数 */
void delArrayDeque(ArrayDeque *deque) {
    free(deque->nums);
    free(deque);
}

/* 获取双向队列的容量 */
int capacity(ArrayDeque *deque) {
    return deque->queCapacity;
}

/* 获取双向队列的长度 */
int size(ArrayDeque *deque) {
    return deque->queSize;
}

/* 判断双向队列是否为空 */
bool empty(ArrayDeque *deque) {
    return deque->queSize == 0;
}

/* 计算环形数组索引 */
int dequeIndex(ArrayDeque *deque, int i) {
    // 通过取余操作实现数组首尾相连
    // 当 i 越过数组尾部时，回到头部
    // 当 i 越过数组头部后，回到尾部
    return ((i + capacity(deque)) % capacity(deque));
}

/* 队首入队 */
void pushFirst(ArrayDeque *deque, int num) {
    if (deque->queSize == capacity(deque)) {
        printf("双向队列已满\r\n");
        return;
    }
    // 队首指针向左移动一位
    // 通过取余操作实现 front 越过数组头部回到尾部
    deque->front = dequeIndex(deque, deque->front - 1);
    // 将 num 添加到队首
    deque->nums[deque->front] = num;
    deque->queSize++;
}

/* 队尾入队 */
void pushLast(ArrayDeque *deque, int num) {
    if (deque->queSize == capacity(deque)) {
        printf("双向队列已满\r\n");
        return;
    }
    // 计算队尾指针，指向队尾索引 + 1
    int rear = dequeIndex(deque, deque->front + deque->queSize);
    // 将 num 添加至队尾
    deque->nums[rear] = num;
    deque->queSize++;
}

/* 访问队首元素 */
int peekFirst(ArrayDeque *deque) {
    // 访问异常：双向队列为空
    assert(empty(deque) == 0);
    return deque->nums[deque->front];
}

/* 访问队尾元素 */
int peekLast(ArrayDeque *deque) {
    // 访问异常：双向队列为空
    assert(empty(deque) == 0);
    int last = dequeIndex(deque, deque->front + deque->queSize - 1);
    return deque->nums[last];
}

/* 队首出队 */
int popFirst(ArrayDeque *deque) {
    int num = peekFirst(deque);
    // 队首指针向后移动一位
    deque->front = dequeIndex(deque, deque->front + 1);
    deque->queSize--;
    return num;
}

/* 队尾出队 */
int popLast(ArrayDeque *deque) {
    int num = peekLast(deque);
    deque->queSize--;
    return num;
}

/* 返回数组用于打印 */
int *toArray(ArrayDeque *deque, int *queSize) {
    *queSize = deque->queSize;
    int *res = (int *)calloc(deque->queSize, sizeof(int));
    int j = deque->front;
    for (int i = 0; i < deque->queSize; i++) {
        res[i] = deque->nums[j % deque->queCapacity];
        j++;
    }
    return res;
}
```
### 3. 双向队列应用
+ “撤销”功能限制撤销的步数
# 第六章 哈希表
## 一、 哈希表
1. 哈希表（hash table），又称散列表，它通过建立键 `key` 与值 `value` 之间的映射，实现高效的元素查询
2. 常用操作：**初始化、查询操作、添加键值对和删除键值对等**
	```cpp
	/* 初始化哈希表 */
	unordered_map<int, string> map;

	/* 添加操作 */
	// 在哈希表中添加键值对 (key, value)
	map[12836] = "小哈";
	map[15937] = "小啰";
	map[16750] = "小算";
	map[13276] = "小法";
	map[10583] = "小鸭";

	/* 查询操作 */
	// 向哈希表中输入键 key ，得到值 value
	string name = map[15937];

	/* 删除操作 */
	// 在哈希表中删除键值对 (key, value)
	map.erase(10583);
	```
3. 遍历方式：遍历键值对、遍历键和遍历值
	```cpp
	/* 遍历哈希表 */
	// 遍历键值对 key->value
	for (auto kv: map) {
	    cout << kv.first << " -> " << kv.second << endl;
	}
	// 使用迭代器遍历 key->value
	for (auto iter = map.begin(); iter != map.end(); iter++) {
	    cout << iter->first << "->" << iter->second << endl;
	}
	```
4. 简单实现：仅用一个数组
	+ 每个空位称为桶（bucket），每个桶可存储一个键值对，哈希函数将一个较大的输入空间映射到一个较小的输出空间。在哈希表中，输入空间是所有 `key` ，输出空间是所有桶（数组索引），即**可以通过哈希函数得到该 `key` 对应的键值对在数组中的存储位置**
	+ 哈希函数的计算过程分为以下两步：
		1. 通过某种哈希算法 `hash()` 计算得到哈希值
		2. 将哈希值对桶数量（数组长度）`capacity` 取模，从而获取该 `key` 对应的数组索引 `index`
	+ c
		```c
		/* 键值对 int->string */
		typedef struct {
		    int key;
		    char *val;
		} Pair;

		/* 基于数组实现的哈希表 */
		typedef struct {
		    Pair *buckets[MAX_SIZE];
		} ArrayHashMap;

		/* 构造函数 */
		ArrayHashMap *newArrayHashMap() {
		    ArrayHashMap *hmap = malloc(sizeof(ArrayHashMap));
		    for (int i=0; i < MAX_SIZE; i++) {
		        hmap->buckets[i] = NULL;
		    }
		    return hmap;
		}

		/* 析构函数 */
		void delArrayHashMap(ArrayHashMap *hmap) {
		    for (int i = 0; i < MAX_SIZE; i++) {
		        if (hmap->buckets[i] != NULL) {
		            free(hmap->buckets[i]->val);
		            free(hmap->buckets[i]);
		        }
		    }
		    free(hmap);
		}

		/* 添加操作 */
		void put(ArrayHashMap *hmap, const int key, const char *val) {
		    Pair *Pair = malloc(sizeof(Pair));
		    Pair->key = key;
		    Pair->val = malloc(strlen(val) + 1);
		    strcpy(Pair->val, val);

		    int index = hashFunc(key);
		    hmap->buckets[index] = Pair;
		}

		/* 删除操作 */
		void removeItem(ArrayHashMap *hmap, const int key) {
		    int index = hashFunc(key);
		    free(hmap->buckets[index]->val);
		    free(hmap->buckets[index]);
		    hmap->buckets[index] = NULL;
		}

		/* 获取所有键值对 */
		void pairSet(ArrayHashMap *hmap, MapSet *set) {
		    Pair *entries;
		    int i = 0, index = 0;
		    int total = 0;
		    /* 统计有效键值对数量 */
		    for (i = 0; i < MAX_SIZE; i++) {
		        if (hmap->buckets[i] != NULL) {
		            total++;
		        }
		    }
		    entries = malloc(sizeof(Pair) * total);
		    for (i = 0; i < MAX_SIZE; i++) {
		        if (hmap->buckets[i] != NULL) {
		            entries[index].key = hmap->buckets[i]->key;
		            entries[index].val = malloc(strlen(hmap->buckets[i]->val) + 1);
		            strcpy(entries[index].val, hmap->buckets[i]->val);
		            index++;
		        }
		    }
		    set->set = entries;
		    set->len = total;
		}

		/* 获取所有键 */
		void keySet(ArrayHashMap *hmap, MapSet *set) {
		    int *keys;
		    int i = 0, index = 0;
		    int total = 0;
		    /* 统计有效键值对数量 */
		    for (i = 0; i < MAX_SIZE; i++) {
		        if (hmap->buckets[i] != NULL) {
		            total++;
		        }
		    }
		    keys = malloc(total * sizeof(int));
		    for (i = 0; i < MAX_SIZE; i++) {
		        if (hmap->buckets[i] != NULL) {
		            keys[index] = hmap->buckets[i]->key;
		            index++;
		        }
		    }
		    set->set = keys;
		    set->len = total;
		}

		/* 获取所有值 */
		void valueSet(ArrayHashMap *hmap, MapSet *set) {
		    char **vals;
		    int i = 0, index = 0;
		    int total = 0;
		    /* 统计有效键值对数量 */
		    for (i = 0; i < MAX_SIZE; i++) {
		        if (hmap->buckets[i] != NULL) {
		            total++;
		        }
		    }
		    vals = malloc(total * sizeof(char *));
		    for (i = 0; i < MAX_SIZE; i++) {
		        if (hmap->buckets[i] != NULL) {
		            vals[index] = hmap->buckets[i]->val;
		            index++;
		        }
		    }
		    set->set = vals;
		    set->len = total;
		}

		/* 打印哈希表 */
		void print(ArrayHashMap *hmap) {
		    int i;
		    MapSet set;
		    pairSet(hmap, &set);
		    Pair *entries = (Pair *)set.set;
		    for (i = 0; i < set.len; i++) {
		        printf("%d -> %s\n", entries[i].key, entries[i].val);
		    }
		    free(set.set);
		}
		```
	+ c++
		```cpp
		/* 键值对 */
		struct Pair {
		  public:
		    int key;
		    string val;
		    Pair(int key, string val) {
		        this->key = key;
		        this->val = val;
		    }
		};

		/* 基于数组实现的哈希表 */
		class ArrayHashMap {
		  private:
		    vector<Pair *> buckets;

		  public:
		    ArrayHashMap() {
		        // 初始化数组，包含 100 个桶
		        buckets = vector<Pair *>(100);
		    }

		    ~ArrayHashMap() {
		        // 释放内存
		        for (const auto &bucket : buckets) {
		            delete bucket;
		        }
		        buckets.clear();
		    }

		    /* 哈希函数 */
		    int hashFunc(int key) {
		        int index = key % 100;
		        return index;
		    }

		    /* 查询操作 */
		    string get(int key) {
		        int index = hashFunc(key);
		        Pair *pair = buckets[index];
		        if (pair == nullptr)
		            return "";
		        return pair->val;
		    }

		    /* 添加操作 */
		    void put(int key, string val) {
		        Pair *pair = new Pair(key, val);
		        int index = hashFunc(key);
		        buckets[index] = pair;
		    }

		    /* 删除操作 */
		    void remove(int key) {
		        int index = hashFunc(key);
		        // 释放内存并置为 nullptr
		        delete buckets[index];
		        buckets[index] = nullptr;
		    }

		    /* 获取所有键值对 */
		    vector<Pair *> pairSet() {
		        vector<Pair *> pairSet;
		        for (Pair *pair : buckets) {
		            if (pair != nullptr) {
		                pairSet.push_back(pair);
		            }
		        }
		        return pairSet;
		    }

		    /* 获取所有键 */
		    vector<int> keySet() {
		        vector<int> keySet;
		        for (Pair *pair : buckets) {
		            if (pair != nullptr) {
		                keySet.push_back(pair->key);
		            }
		        }
		        return keySet;
		    }

		    /* 获取所有值 */
		    vector<string> valueSet() {
		        vector<string> valueSet;
		        for (Pair *pair : buckets) {
		            if (pair != nullptr) {
		                valueSet.push_back(pair->val);
		            }
		        }
		        return valueSet;
		    }

		    /* 打印哈希表 */
		    void print() {
		        for (Pair *kv : pairSet()) {
		            cout << kv->key << " -> " << kv->val << endl;
		        }
		    }
		};
		```
5. 哈希冲突与扩容（**再哈希**）：
	+ **通过扩容哈希表来减少哈希冲突**（可扩散列）
	+ 类似于数组扩容，哈希表扩容需将所有键值对从原哈希表迁移至新哈希表（再散列）
	+ 由于哈希表容量 `capacity` 改变，我们需要通过哈希函数来重新计算所有键值对的存储位置
	+ 负载因子（load factor）是哈希表的一个重要概念，其定义为哈希表的元素数量除以桶数量，用于衡量哈希冲突的严重程度，**也常作为哈希表扩容的触发条件**
## 二、哈希冲突

+ 为了提升效率，我们可以采用以下策略：
	1. 改良哈希表数据结构，**使得哈希表可以在出现哈希冲突时正常工作**。
	2. 仅在必要时，即当哈希冲突比较严重时，才执行扩容操作。
+ 哈希表的结构改良方法主要包括“链式地址”和“开放寻址”
### 1. 链式地址（separate chaining）(分离链接法)
将单个元素转换为链表，将键值对作为链表节点，将所有发生冲突的键值对都存储在同一链表中
	[separate chaining（外部图片）](https://www.hello-algo.com/chapter_hashing/hash_collision.assets/hash_table_chaining.png)
+ 基于链式地址实现的哈希表的操作方法发生了以下变化。
	1. **查询元素**：输入 `key` ，经过哈希函数得到桶索引，即可访问链表头节点，然后遍历链表并对比 `key` 以查找目标键值对
	2. **添加元素**：首先通过哈希函数访问链表头节点，然后将节点（键值对）添加到链表中(存在相同`key`时覆盖原`val`)
	3. **删除元素**：根据哈希函数的结果访问链表头部，接着遍历链表以查找目标节点并将其删除
+ 链式地址存在以下局限性
	1. **占用空间增大**：链表包含节点指针，它相比数组更加耗费内存空间
	2. **查询效率降低**：因为需要线性遍历链表来查找对应元素
+ 简单实现，需要注意两点:
	- 使用列表（动态数组）代替链表，从而简化代码。在这种设定下，哈希表（数组）包含多个桶，每个桶都是一个列表。
	- 以下实现包含哈希表扩容方法。当负载因子超过 $\frac{2}{3}$ 时，将哈希表扩容至原先的 $2$ 倍
+ c
	```c
	/* 链表节点 */
	typedef struct Node {
		Pair *pair;
		struct Node *next;
	} Node;

	/* 链式地址哈希表 */
	typedef struct {
		int size;         // 键值对数量
		int capacity;     // 哈希表容量
		double loadThres; // 触发扩容的负载因子阈值
		int extendRatio;  // 扩容倍数
		Node **buckets;   // 桶数组
	} HashMapChaining;

	/* 构造函数 */
	HashMapChaining *newHashMapChaining() {
		HashMapChaining *hashMap = (HashMapChaining *)malloc(sizeof(HashMapChaining));
		hashMap->size = 0;
		hashMap->capacity = 4;
		hashMap->loadThres = 2.0 / 3.0;
		hashMap->extendRatio = 2;
		hashMap->buckets = (Node **)malloc(hashMap->capacity * sizeof(Node *));
		for (int i = 0; i < hashMap->capacity; i++) {
			hashMap->buckets[i] = NULL;
		}
		return hashMap;
	}

	/* 析构函数 */
	void delHashMapChaining(HashMapChaining *hashMap) {
		for (int i = 0; i < hashMap->capacity; i++) {
			Node *cur = hashMap->buckets[i];
			while (cur) {
				Node *tmp = cur;
				cur = cur->next;
				free(tmp->pair);
				free(tmp);
			}
		}
		free(hashMap->buckets);
		free(hashMap);
	}

	/* 哈希函数 */
	int hashFunc(HashMapChaining *hashMap, int key) {
		return key % hashMap->capacity;
	}

	/* 负载因子 */
	double loadFactor(HashMapChaining *hashMap) {
		return (double)hashMap->size / (double)hashMap->capacity;
	}

	/* 查询操作 */
	char *get(HashMapChaining *hashMap, int key) {
		int index = hashFunc(hashMap, key);
		// 遍历桶，若找到 key ，则返回对应 val
		Node *cur = hashMap->buckets[index];
		while (cur) {
			if (cur->pair->key == key) {
				return cur->pair->val;
			}
			cur = cur->next;
		}
		return ""; // 若未找到 key ，则返回空字符串
	}

	/* 添加操作 */
	void put(HashMapChaining *hashMap, int key, const char *val) {
		// 当负载因子超过阈值时，执行扩容
		if (loadFactor(hashMap) > hashMap->loadThres) {
			extend(hashMap);
		}
		int index = hashFunc(hashMap, key);
		// 遍历桶，若遇到指定 key ，则更新对应 val 并返回
		Node *cur = hashMap->buckets[index];
		while (cur) {
			if (cur->pair->key == key) {
				strcpy(cur->pair->val, val); // 若遇到指定 key ，则更新对应 val 并返回
				return;
			}
			cur = cur->next;
		}
		// 若无该 key ，则将键值对添加至链表头部
		Pair *newPair = (Pair *)malloc(sizeof(Pair));
		newPair->key = key;
		strcpy(newPair->val, val);
		Node *newNode = (Node *)malloc(sizeof(Node));
		newNode->pair = newPair;
		newNode->next = hashMap->buckets[index];
		hashMap->buckets[index] = newNode;
		hashMap->size++;
	}

	/* 扩容哈希表 */
	void extend(HashMapChaining *hashMap) {
		// 暂存原哈希表
		int oldCapacity = hashMap->capacity;
		Node **oldBuckets = hashMap->buckets;
		// 初始化扩容后的新哈希表
		hashMap->capacity *= hashMap->extendRatio;
		hashMap->buckets = (Node **)malloc(hashMap->capacity * sizeof(Node *));
		for (int i = 0; i < hashMap->capacity; i++) {
			hashMap->buckets[i] = NULL;
		}
		hashMap->size = 0;
		// 将键值对从原哈希表搬运至新哈希表
		for (int i = 0; i < oldCapacity; i++) {
			Node *cur = oldBuckets[i];
			while (cur) {
				put(hashMap, cur->pair->key, cur->pair->val);
				Node *temp = cur;
				cur = cur->next;
				// 释放内存
				free(temp->pair);
				free(temp);
			}
		}

		free(oldBuckets);
	}

	/* 删除操作 */
	void removeItem(HashMapChaining *hashMap, int key) {
		int index = hashFunc(hashMap, key);
		Node *cur = hashMap->buckets[index];
		Node *pre = NULL;
		while (cur) {
			if (cur->pair->key == key) {
				// 从中删除键值对
				if (pre) {
					pre->next = cur->next;
				} else {
					hashMap->buckets[index] = cur->next;
				}
				// 释放内存
				free(cur->pair);
				free(cur);
				hashMap->size--;
				return;
			}
			pre = cur;
			cur = cur->next;
		}
	}

	/* 打印哈希表 */
	void print(HashMapChaining *hashMap) {
		for (int i = 0; i < hashMap->capacity; i++) {
			Node *cur = hashMap->buckets[i];
			printf("[");
			while (cur) {
				printf("%d -> %s, ", cur->pair->key, cur->pair->val);
				cur = cur->next;
			}
			printf("]\n");
		}
	}
	```
+ 链表很长时，查询效率 $O(n)$ 很差。**此时可以将链表转换为“AVL 树”或“红黑树”**，从而将查询操作的时间复杂度优化至 $O(\log n)$
### 2. 开放寻址（开放定址法）
#### 1. 线性探测
1. 操作方法：
	操作方法与普通哈希表有所不同,采用**固定步长的线性搜索**来进行探测
	- **插入元素**：通过哈希函数计算桶索引，若发现桶内已有元素，则**从冲突位置向后线性遍历**（步长通常为 $1$ ），直至找到空桶，将元素插入其中
	- **查找元素**：若发现哈希冲突，则使用相同步长向后进行线性遍历，直到找到对应元素，返回 `value` 即可；如果**遇到空桶，说明目标元素不在哈希表**中，返回 `None`
2. **聚集现象**
	线性探测容易产生“**聚集现象**”:数组中连续被占用的位置越长，这些连续位置发生哈希冲突的可能性越大，从而进一步促使该位置的聚堆生长，形成恶性循环，最终导致增删查改操作效率劣化
3. 删除元素
	**不能**在开放寻址哈希表中**直接删除**元素，会在数组内产生一个空桶 `None` ，在该空桶之下的元素都无法再被访问到，程序可能误判不存在
	+ 采用**懒删除**（$lazy\ deletion$）机制:利用一个**常量 `TOMBSTONE` 来标记**这个桶
	+ **可能会加速哈希表的性能退化**:每次删除操作都会产生一个删除标记，随着 `TOMBSTONE` 的增加，搜索时间也会增加
	+ 可以记录遇到的首个 `TOMBSTONE` 的索引，并将搜索到的目标元素与该 `TOMBSTONE` **交换位置**
4. 探查次数
	- **成功查找**的探查次数公式为：
    $$
    成功查找平均探查次数≈\frac{1}{2}(1+\frac{1}{1−α})
    $$
	- **插入操作**（即不成功查找）的探查次数公式为：
    $$
    插入平均探查次数≈\frac{1}{2}(1+\frac{1}{(1−α)^2})
    $$
    成功查找只需找到目标元素，而插入必须找到**空位**，空位可能在簇的末尾，因此插入比成功查找需要更多探查次数
#### 2.   平方探测（二次探测 Quadratic Probing）
1. 当发生冲突时跳过“探测次数的平方”的步数，即 1,4,9,… 步，为了保证二次探测的有效性，**哈希表的大小通常选择为素数**，这样可以更好地分布探测序列，减少聚集问题的发生。
2. **定理**：如果使用二次探测且哈希表大小为**素数**，若表有**一半以上**为空，则一定可以插入
	- **证明**：只需证明对于任意$0 < i \neq j < \left\lfloor \frac{TableSize}{2} \right\rfloor$，其中 $i, j$ 取整数，有$(h(x)+i^{2})\% TableSize \neq (h(x)+j^{2})\% TableSize$
	假设 $h(x)+i^{2} \equiv h(x)+j^{2} \pmod{TableSize}$
	有 $i^{2} \equiv j^{2} \pmod{TableSize}$
	$(i + j)(i - j) \equiv 0 \pmod{TableSize}$
	由TableSize为素数，则$i+j$或$i-j$均可以被TableSize整除，且$0 < i ， j < \left\lfloor \frac{TableSize}{2} \right\rfloor$，故$i=j$，矛盾，故二者不等，即$(h(x)+i^{2})\% TableSize \neq (h(x)+j^{2})\% TableSize$，得证！
3. **优势**
	- 缓解线性探测的聚集效应
	- 数据分布得更加均匀（**若表长为$4k+3$形式的素数，则整个表都可以被利用**）
4. **缺陷**
	- 仍然存在聚集现象，即某些位置比其他位置更容易被占用。
	- 由于平方的增长，平方探测可能不会探测整个哈希表，这意味着即使哈希表中有空桶，平方探测也可能无法访问到它
5. 代码
```c
//查找函数
Position Find(ElementType Key, HashTable H) {
    Position CurrentPos;
    int CollisionNum;
    CollisionNum = 0;
    CurrentPos = Hash(Key, H->TableSize);
    while (H->TheCells[CurrentPos].Info != Empty &&
           H->TheCells[CurrentPos].Element != Key) {
        CurrentPos += 2 * ++CollisionNum - 1;
        if (CurrentPos >= H->TableSize) CurrentPos -= H->TableSize;
    }
    return CurrentPos;
}
//插入函数
void Insert(ElementType Key, HashTable H) {
    Position Pos;
    Pos = Find(Key, H);
    if (H->TheCells[Pos].Info != Legitimate) {
        H->TheCells[Pos].Info = Legitimate;
        H->TheCells[Pos].Element = Key;
    }
}
```

####  3. 多次哈希
+ 多次哈希方法使用多个哈希函数$f_1(x)$ ，$f_2(x)$，$f_3(x)$、… 进行探测
- **插入元素**：若哈希函数 $f_1(x)$  出现冲突，则尝试 $f_2(x)$ ，以此类推，直到找到空位后插入元素。
- **查找元素**：在相同的哈希函数顺序下进行查找，直到找到目标元素时返回；若遇到空位或已尝试所有哈希函数，说明哈希表中不存在该元素，则返回 `None` 。
#### 4. 双哈希（Double Hashing）
- 使用两个哈希函数来计算索引位置，从而减少冲突的概率。当第一个哈希函数计算出的索引位置已经被占用时，二次哈希会使用第二个哈希函数来计算一个新的索引位置。
- **插入位置**：$(hash1(key) + i * hash2(key))\%{TableSize}$
- 探测函数需保证  $\text{hash2}(x) \not\equiv 0$
- 推荐实现： $\text{hash2}(x) = R - (x \% R)$ ，其中  R  为小于表大小的素数
## 三、哈希算法
### 1. 算法的目标
1. 特点
	- **确定性**：对于相同的输入，哈希算法应始终产生相同的输出。这样才能确保哈希表是可靠的
	- **效率高**：计算哈希值的过程应该足够快v。计算开销越小，哈希表的实用性越高
	- **均匀分布**：哈希算法应使得键值对均匀分布在哈希表中。分布越均匀，哈希冲突的概率就越低
2. 应用
	- **密码存储**：为了保护用户密码的安全，系统通常不会直接存储用户的明文密码，而是存储密码的哈希值。当用户输入密码时，系统会对输入的密码计算哈希值，然后与存储的哈希值进行比较。如果两者匹配，那么密码就被视为正确
	- **数据完整性检查**：数据发送方可以计算数据的哈希值并将其一同发送；接收方可以重新计算接收到的数据的哈希值，并与接收到的哈希值进行比较。如果两者匹配，那么数据就被视为完整
3. 安全特性
	- **单向性**：无法通过哈希值反推出关于输入数据的任何信息
	- **抗碰撞性**：应当极难找到两个不同的输入，使得它们的哈希值相同
	- **雪崩效应**：输入的微小变化应当导致输出的显著且不可预测的变化
### 2. 算法的设计
1. 简单类型
	1. **加法哈希**：对输入的每个字符的 ASCII 码进行相加，将得到的总和作为哈希值
	2. **乘法哈希**：利用乘法的不相关性，每轮乘以一个常数，将各个字符的 ASCII 码累积到哈希值中
	3. **异或哈希**：将输入数据的每个元素通过异或操作累积到一个哈希值中
	4. **旋转哈希**：将每个字符的 ASCII 码累积到一个哈希值中，每次累积之前都会对哈希值进行旋转操作
2. 取模
	+ 最后一步都是**对大质数取模**
	+ **使用大质数作为模数，可以最大化地保证哈希值的均匀分布**，因为质数不与其他数字存在公约数，可以减少因取模操作而产生的周期性模式，从而避免哈希冲突
3. 常见的哈希算法

| 属性       | MD5          | SHA-1        | SHA-2               | SHA-3                     |
|------------|--------------|--------------|---------------------|---------------------------|
| 推出时间   | 1992         | 1995         | 2002                | 2008                      |
| 输出长度   | 128 bit      | 160 bit      | 256/512 bit         | 224/256/384/512 bit       |
| 哈希冲突   | 较多         | 较多         | 很少                | 很少                      |
| 安全等级   | 低，已被成功攻击 | 低，已被成功攻击 | 高                | 高                        |
| 应用       | 已被弃用，仍用于数据完整性检查 | 已被弃用 | 加密货币交易验证、数字签名等 | 可用于替代 SHA-2           |
## 四、数据结构的哈希值
1. **整数和布尔量**的哈希值就是其本身
2. 浮点数和字符串的哈希值
3. 元组的哈希值是对其中**每一个元素进行哈希**，然后将这些哈希值**组合**起来，得到单一的哈希值
4. 对象的哈希值**基于其内存地址生成**。通过重写对象的哈希方法，可实现基于内容生成哈希值
5. Python 解释器在每次启动时，都会为字符串哈希函数加入一个随机的**盐值（salt）**
# 第七章 树
## 零、树的简介
- 有$n$个结点的树，一共**有$n-1$条边**：除了根节点之外每个结点都有其父节点
- 同一个值，构建左或右子树，为两颗不同的二叉树
### 1. 表达式树（Expression tree）
1. 语法树的一种，对算数表达式的专门构建
2. 特点：
	1. 结构：严格二叉树
	2. 叶结点：操作数（数字、变量）
	3. 非叶节点：运算符（+ -...）
3. 算式表达式和表达式树的关系：
	- 表达式树的先根遍历：前缀表达式
	- 表达式树的中根遍历：中缀表达式
	- 表达式树的后根遍历：后缀表达式
4. 算法：
	+ [递归下降法](/blog/notes/courses/course-data-structures-algorithms/%E9%9B%B6%E9%9B%B6%E7%A2%8E%E7%A2%8E%E7%9A%84%E7%AE%97%E6%B3%95)
	+ [调车场算法](/blog/notes/courses/course-data-structures-algorithms/%E9%9B%B6%E9%9B%B6%E7%A2%8E%E7%A2%8E%E7%9A%84%E7%AE%97%E6%B3%95)
### 2. 语法树 （syntax tree）
1. 不一定为二叉树
2. 编译器或解释器用于分析代码的结构
3. 算法：词法分析+语法分析
## 一、二叉树
- 每个节点都有**两个引用（指针）**，分别指向**左子节点**（$left-child\ node$）和**右子节点**（$right-child\ node$），该节点被称为这两个子节点的**父节点**（$parent\ node$）。当给定一个二叉树的节点时，我们将该节点的左子节点及其以下节点形成的树称为该节点的**左子树**（$left\ subtree$），同理可得**右子树**（$right\ subtree$），节点的**祖先**（$ancestors$）为从节点到根的路径上的所有节点，节点的**后代**（$descendants$）为其子树中的所有节点。
- 二叉树中，除叶节点外，**其他所有节点都包含子节点和非空子树**
[二叉树（外部图片）](https://www.hello-algo.com/chapter_tree/binary_tree.assets/binary_tree_definition.png)

### 1. 二叉树常见术语
- 根节点（$root\ node$）：位于二叉树顶层的节点，没有父节点
- 叶节点（$leaf\ node$）：没有子节点的节点，其两个指针均指向 `None`
- 边（$edge$）：连接两个节点的线段，即节点引用（指针）
- 节点所在的层（$level$）：从顶至底递增，根节点所在层为 1
- 节点的度（$degree$）：节点的子节点的数量。在二叉树中，度的取值范围是 0、1、2
- 二叉树的高度（$height$）：从根节点到最远叶节点所经过的边的数量
- 节点的深度（$depth$）：从根节点到该节点所经过的边的数量
- 节点的高度（$height$）：从距离该节点最远的叶节点到该节点所经过的边的数量
[二叉树（外部图片）](https://www.hello-algo.com/chapter_tree/binary_tree.assets/binary_tree_terminology.png)
+ 注意，我们通常将“高度”和“深度”定义为“**经过的边的数量**”，但有些题目或教材可能会将其定义为“**经过的节点的数量**”。在这种情况下，高度和深度都需要**加 1** 。
### 2.   二叉树基本操作
#### 1. 初始化二叉树
+ 与链表类似，先初始化节点，再构建引用(指针)
+ 实现代码
	```c
	/* 初始化二叉树 */
	// 初始化节点
	TreeNode *n1 = newTreeNode(1); //c++ 改为TreeNode* n1 = new TreeNode(1);
	TreeNode *n2 = newTreeNode(2);
	TreeNode *n3 = newTreeNode(3);
	TreeNode *n4 = newTreeNode(4);
	TreeNode *n5 = newTreeNode(5);
	// 构建节点之间的引用（指针）
	n1->left = n2;
	n1->right = n3;
	n2->left = n4;
	n2->right = n5;
	```
#### 2. 插入与删除节点
+ 与链表类似，在二叉树中插入与删除节点可以通过**修改指针**来实现
+ 实现代码
	```c
	/* 插入与删除节点 */
	TreeNode *P = newTreeNode(0); //c++ TreeNode *P = new TreeNode(0);
	// 在 n1 -> n2 中间插入节点 P
	n1->left = P;
	P->left = n2;
	// 删除节点 P
	n1->left = n2;
	// 释放内存
	free(P); //c++ delete P;
	```
### 3. 常见二叉树类型
#### 1. 完美二叉树（perfect binary tree）（满二叉树）
+ 所有层的节点都被完全填满。在完美二叉树中，叶节点的度为 $0$ ，其余所有节点的度都为 $2$ ；若树的高度为 $h$ ，则节点总数为 $2^{h+1}−1$ ，呈现标准的**指数级关系**
+ [perfect binary tree（外部图片）](https://www.hello-algo.com/chapter_tree/binary_tree.assets/perfect_binary_tree.png)
#### 2. 完全二叉树（complete binary tree）
+ 只有最底层的节点未被填满，且最底层节点**尽量靠左填充**
+ **完美二叉树也是**一棵完全二叉树
+ [complete binary tree（外部图片）](https://www.hello-algo.com/chapter_tree/binary_tree.assets/complete_binary_tree.png)
#### 3. 完满二叉树（full binary tree）
+ 除了叶节点之外，其余所有节点**都有两个子节点**
+ [full binary tree（外部图片）](https://www.hello-algo.com/chapter_tree/binary_tree.assets/full_binary_tree.png)
#### 4. 平衡二叉树（balanced binary tree）
+ 任意节点的左子树和右子树的**高度之差的绝对值不超过 1**
+ [balanced binary tree（外部图片）](https://www.hello-algo.com/chapter_tree/binary_tree.assets/balanced_binary_tree.png)
### 4. 二叉树的退化
每层节点都被填满时，达到“完美二叉树”；而当所有节点都偏向一侧时，二叉树退化为“链表”
- 完美二叉树是理想情况，可以充分发挥二叉树 **“分治”的优势**
- 链表则是另一个极端，各项操作都变为线性操作，时间复杂度退化至 $O(n)$
- [degenerate of binary tree（外部图片）](https://www.hello-algo.com/chapter_tree/binary_tree.assets/binary_tree_best_worst_cases.png)
### 5.线索二叉树 Threaded Binary Tree
1. **线索化**：对一棵二叉树中所有节点的空指针域按照某种遍历方式加线索的过程
2. **线索二叉树**：被线索化了的二叉树
3. 方法：所有**原本为空的右(孩子)指针**改为指向该节点在序列中的**后继**，所有**原本为空的左(孩子)指针**改为指向该节点的序列的**前驱**
4. **标识域**：
	1. 如果**ltag=0**，表示指向节点的**左孩子**。如果**ltag=1**，则表示**lchild为线索**，指向节点的**直接前驱**
	2. 如果**rtag=0**，表示指向节点的**右孩子**。如果**rtag=1**，则表示**rchild为线索**，指向节点的**直接后继**
5. 定义：
	```c
	typedef struct TBNode
	{
		char data;
		int ltag,rtag;
		struct TBNode *lchild;
		struct TBNode *rchild;

	}TBNode;
	```
6. 构造(中序遍历)
	```c
	void InThreading(ThreadTree p, ThreadTree *pre) {
	    if (p != NULL) {
	        InThreading(p->left, pre);  // 递归处理左子树

	        // 当前节点的左指针为空，建立前驱线索
	        if (p->left == NULL) {
	            p->left = *pre;
	            p->leftTag = 1;
	        }

	        // 前驱节点存在且右指针为空，建立后继线索
	        if (*pre != NULL && (*pre)->right == NULL) {
	            (*pre)->right = p;
	            (*pre)->rightTag = 1;
	        }
	        *pre = p;  // 更新前驱节点

	        InThreading(p->right, pre);  // 递归处理右子树
	    }
	}
	// 前，后遍历只用调整递归顺序
	```
7. 访问：**非递归**
	```c
	// 中序遍历（无哑结点）
	void InOrderTraverse(TreeNode* root) {
	    if (root == NULL) return;  // 处理空树

	    TreeNode* p = root;
	    while (p != NULL) {
	        // 找到最左下方节点
	        while (p->left != NULL) {
	            p = p->left;
	        }
	        printf("%d ", p->data);

	        // 根据线索访问后继节点
	        while (p->rightTag == 1 && p->right != NULL) {
	            p = p->right;
	            printf("%d ", p->data);
	        }
	        p = p->right;  // 转向右子树或后继
	    }
	    printf("\n");
	}

	// 前序遍历（无哑结点）
	void PreOrderTraverse(TreeNode* root) {
	    if (root == NULL) return;  // 处理空树

	    TreeNode* p = root;
	    while (p != NULL) {
	        printf("%d ", p->data);  // 先访问当前节点
	        if (p->leftTag == 0) {    // 如果左子树是子节点而非线索
	            p = p->left;          // 进入左子树
	        } else {                  // 否则通过线索进入右子树
	            p = p->right;
	        }
	    }
	    printf("\n");
	}

	// 后序遍历（无哑结点）
	void PostOrderTraverse(TreeNode* root) {
	    if (root == NULL) return;  // 处理空树

	    TreeNode* p = root;
	    TreeNode* lastVisited = NULL;

	    while (p != NULL) {
	        // 找到最左下方节点
	        while (p->left != NULL && p->left != lastVisited) {
	            p = p->left;
	        }

	        // 检查右子树是否可以访问
	        if (p->rightTag == 0 && p->right != lastVisited) {
	            p = p->right;
	        } else {
	            // 访问当前节点并记录
	            printf("%d ", p->data);
	            lastVisited = p;
	            p = p->right;  // 通过线索返回父节点
	        }
	    }
	    printf("\n");
	}
	```
## 二、二叉树遍历
### 1. 层序遍历（level-order traversal）
#### 1. 核心思路
+ 从**顶部到底部逐层遍历**二叉树，并在每一层按照从左到右的顺序访问节点
+ 本质上属于**广度优先遍历（breadth-first traversal）**，也称**广度优先搜索（breadth-first search, BFS）**
+ [层序遍历（外部图片）](https://www.hello-algo.com/chapter_tree/binary_tree_traversal.assets/binary_tree_bfs.png)
+ 通常借助“队列”来实现，思路：用两个数组储存现在的节点和所有子节点，一个数组储存遍历到的变量值 -> 两个数组合为队列，父节点先进先出，双指针相遇时证明无更多子节点
+ 代码
	```c
	/* 层序遍历 */
	int *levelOrder(TreeNode *root, int *size) {
	    /* 辅助队列 */
	    int front, rear;
	    int index, *arr;
	    TreeNode *node;
	    TreeNode **queue;

	    /* 辅助队列 */
	    queue = (TreeNode **)malloc(sizeof(TreeNode *) * MAX_SIZE);
	    // 队列指针
	    front = 0, rear = 0;
	    // 加入根节点
	    queue[rear++] = root;
	    // 初始化一个列表，用于保存遍历序列
	    /* 辅助数组 */
	    arr = (int *)malloc(sizeof(int) * MAX_SIZE);
	    // 数组指针
	    index = 0;
	    while (front < rear) {
	        // 队列出队
	        node = queue[front++];
	        // 保存节点值
	        arr[index++] = node->val;
	        if (node->left != NULL) {
	            // 左子节点入队
	            queue[rear++] = node->left;
	        }
	        if (node->right != NULL) {
	            // 右子节点入队
	            queue[rear++] = node->right;
	        }
	    }
	    // 更新数组长度的值
	    *size = index;
	    arr = realloc(arr, sizeof(int) * (*size));

	    // 释放辅助数组空间
	    free(queue);
	    return arr;
	}
	```
#### 2. 复杂度分析
1. **时间复杂度为 O(n)** ：所有节点被访问一次，使用 O(n) 时间，其中 n 为节点数量。
2. **空间复杂度为 O(n)** ：在最差情况下，即满二叉树时，遍历到最底层之前，队列中最多同时存在 (n+1)/2 个节点，占用 O(n) 空间。
### 2. 前序、中序、后序遍历
#### 1. 核心思想
+ 前序、中序和后序遍历都属于**深度优先遍历（depth-first traversal）**，也称**深度优先搜索（depth-first search, DFS）**
+ [DFS（外部图片）](https://www.hello-algo.com/chapter_tree/binary_tree_traversal.assets/binary_tree_dfs.png)
+ 代码
	```c
	/* 前序遍历 */
	void preOrder(TreeNode *root, int *size) {
	    if (root == NULL)
	        return;
	    // 访问优先级：根节点 -> 左子树 -> 右子树
	    arr[(*size)++] = root->val;
	    preOrder(root->left, size);
	    preOrder(root->right, size);
	}

	/* 中序遍历 */
	void inOrder(TreeNode *root, int *size) {
	    if (root == NULL)
	        return;
	    // 访问优先级：左子树 -> 根节点 -> 右子树
	    inOrder(root->left, size);
	    arr[(*size)++] = root->val;
	    inOrder(root->right, size);
	}

	/* 后序遍历 */
	void postOrder(TreeNode *root, int *size) {
	    if (root == NULL)
	        return;
	    // 访问优先级：左子树 -> 右子树 -> 根节点
	    postOrder(root->left, size);
	    postOrder(root->right, size);
	    arr[(*size)++] = root->val;
	}
	```
#### 2. 复杂度分析
1. **时间复杂度为 $O(n)$** ：所有节点被访问一次，使用 $O(n)$ 时间。
2. **空间复杂度为 $O(n)$** ：在最差情况下，即树退化为链表时，递归深度达到 $n$ ，系统占用 $O(n)$ 栈帧空间
#### 3. 非递归实现
前序、中序、后序遍历的非递归实现通常借助**栈**来模拟递归调用栈的行为。以下是每种遍历的非递归实现方法及代码示例：
##### 1. 前序遍历（Preorder Traversal）
1. **实现**
	1. 使用栈保存待访问的节点
	2. 从根节点开始，将其压入栈
	3. 循环直到栈为空：
	   - 弹出栈顶节点并访问
	   - 将其**右**子节点**先**压入栈（如果存在）
	   - 将其**左**子节点**后**压入栈（如果存在）
2. **代码实现**
```python
def preorder_traversal(root):
    if not root:
        return []

    stack = [root]
    result = []

    while stack:
        node = stack.pop()
        result.append(node.val)  # 访问节点
        if node.right:  # 右子节点先入栈
            stack.append(node.right)
        if node.left:   # 左子节点后入栈
            stack.append(node.left)

    return result
```

##### 2. 中序遍历（Inorder Traversal）
1. **实现**
	1. 使用栈保存待访问的节点
	2. 从根节点开始，将所有左子节点压入栈
	3. 循环直到栈为空：
	   - 弹出栈顶节点并访问
	   - 将其右子节点作为当前节点，重复步骤 2
2. **代码实现**
```python
def inorder_traversal(root):
    stack = []
    result = []
    curr = root

    while curr or stack:
        # 将所有左子节点压入栈
        while curr:
            stack.append(curr)
            curr = curr.left

        # 访问节点并转向右子树
        curr = stack.pop()
        result.append(curr.val)  # 访问节点
        curr = curr.right

    return result
```
##### 3. 后序遍历（Postorder Traversal）
1. **实现**
	1. 使用两个栈：
	   - `stack1` 用于模拟遍历
	   - `stack2` 用于保存访问顺序
	2. 从根节点开始，将其压入 `stack1`
	3. 循环直到 `stack1` 为空：
	   - 弹出栈顶节点并压入 `stack2`
	   - 将其左子节点压入 `stack1`（如果存在）
	   - 将其右子节点压入 `stack1`（如果存在）
	4. 最终 `stack2` 中的逆节点顺序即为后序遍历结果
	5. 即为前序遍历将左右子树顺序调换后的反置
2. **代码实现**
```python
def postorder_traversal(root):
    if not root:
        return []

    stack1 = [root]
    stack2 = []
    result = []

    while stack1:
        node = stack1.pop()
        stack2.append(node)  # 压入 stack2
        if node.left:  # 左子节点先入栈
            stack1.append(node.left)
        if node.right:  # 右子节点后入栈
            stack1.append(node.right)

    # stack2 中的节点顺序即为后序遍历结果
    while stack2:
        result.append(stack2.pop().val)

    return result
```

## 三、二叉树数组表示
### 1. 表示完美二叉树
+ **映射公式** : 若某节点的索引为 $i$ ，则该节点的**左子节点索引为 $2i+1$**，**右子节点索引为 $2i+2$**
+ **相当于链表中的节点引用（指针）**。给定数组中的任意一个节点，我们都可以通过映射公式来访问它的左（右）子节点
### 2. 表示任意二叉树
+ 在层序遍历序列中**显式**地写出所有 `None`
+ 使用数组表示**完全二叉树**时，可以**省略**存储所有 `None`
###  3. 优点与局限性
+ 优点
	- 数组存储在连续的内存空间中，对缓存友好，**访问与遍历速度较快**
	- 不需要存储指针，比较**节省空间**
	- **允许随机访问**节点
+ 局限性
	- 数组存储需要连续内存空间，因此**不适合存储数据量过大的树**
	- 增删节点需要通过数组插入与删除操作实现，**效率较低**
	- 当二叉树中**存在大量 `None`** 时，数组中包含的节点数据比重较低，**空间利用率较低**
## 四、二叉搜索树
* 二叉搜索树binary search tree BST 条件
	1. 对于根节点，左子树中所有节点的值 < 根节点的值 < 右子树中所有节点的值
	2. 任意节点的左、右子树也是二叉搜索树
### 1. 二叉搜索树的操作
#### 1. 查找操作
+ 查找操作与二分查找算法的工作原理一致，都是每轮排除一半情况。循环次数最多为二叉树的高度，当二叉树平衡时，使用 $O(\log n)$ 时间
#### 2. 插入节点
+ **查找插入位置**：与查找操作相似，从根节点出发，根据当前节点值和 `num` 的大小关系循环向下搜索，直到越过叶节点（遍历至 `None` ）时跳出循环
+ **在该位置插入节点**：初始化节点 `num` ，将该节点置于 `None` 的位置
- 二叉搜索树**不允许存在重复节点**，否则将违反其定义。因此，若待插入节点在树中已存在，则不执行插入，直接返回
- 为了实现插入节点，我们需要借助节点 `pre` 保存上一轮循环的节点。这样在遍历至 `None` 时，我们可以获取到其父节点，从而完成节点插入操作
```c
/* 插入节点 */
void insert(BinarySearchTree *bst, int num) {
	// 若树为空，则初始化根节点
	if (bst->root == NULL) {
		bst->root = newTreeNode(num);
		return;
	}
	TreeNode *cur = bst->root, *pre = NULL;
	// 循环查找，越过叶节点后跳出
	while (cur != NULL) {
		// 找到重复节点，直接返回
		if (cur->val == num) {
			return;
		}
		pre = cur;
		if (cur->val < num) {
			// 插入位置在 cur 的右子树中
			cur = cur->right;
		} else {
			// 插入位置在 cur 的左子树中
			cur = cur->left;
		}
	}
	// 插入节点
	TreeNode *node = newTreeNode(num);
	if (pre->val < num) {
		pre->right = node;
	} else {
		pre->left = node;
	}
}
```
#### 3. 删除节点
1. 删除节点的度为 $0$ 时，表示该节点是叶节点，可以**直接删除**
2. 删除节点的度为 $1$ 时，将待删除节点**替换为其子节点**即可
3. 删除节点的度为 2 时，我们无法直接删除它，而需要使用一个节点替换该节点。由于要保持二叉搜索树“左子树 < 根节点 < 右子树”的性质，**因此这个节点可以是右子树的最小节点或左子树的最大节点**。删除节点操作使用 $O(\logn)$ 时间，其中查找待删除节点需要 $O(\logn)$ 时间，获取中序遍历后继节点需要 $O(\logn)$ 时间
#### 4. 中序遍历有序
1. 二叉搜索树的中序遍历序列是**升序**的
2. 获取有序数据仅需 $O(n)$ 时间
### 2. 效率
1. 对比

|      | 无序数组   | 二叉搜索树       |
| ---- | ------ | ----------- |
| 查找元素 | $O(n)$ | $O(\logn)$ |
| 插入元素 | $O(1)$ | $O(\logn)$ |
| 删除元素 | $O(n)$ | $O(\logn)$ |
2. 不断地插入和删除节点，可能导致二叉树退化链表，这时各种操作的时间复杂度也会退化为 $O(n)$
### 3. 折半查找判定树
1. 特点：
	- 为二叉搜索树
	- 为平衡树
	- 外部节点（叶子节点）表示查找失败的情况，通常不包含在实际判定树中
	- 取整条件相同（向上或向下）
1. 构造过程
	- 选择中间元素，将序列的中间元素 amidamid 作为根节点。如果序列长度为偶数，可以选择中间靠左或靠右的元素。
	- **递归构造左右子树**
	- 对每个子序列递归执行上述步骤，直到子序列为空。

### 4. 常见应用
- 用作系统中的多级索引，实现高效的查找、插入、删除操作
- 作为某些搜索算法的底层数据结构
- 用于存储数据流，以保持其有序状态
## 五、构建二叉树
- 问题：给定一棵二叉树的前序遍历 `preorder` 和中序遍历 `inorder` ，请从中构建二叉树，返回二叉树的根节点。假设二叉树中没有值重复的节点
- [构建二叉树的示例数据（外部图片）](https://www.hello-algo.com/chapter_divide_and_conquer/build_binary_tree_problem.assets/build_tree_example.png)
### 1. 判断是否为分治问题

原问题定义为从 `preorder` 和 `inorder` 构建二叉树，是一个**典型的分治问题**。

- **问题可以分解**：从分治的角度切入，我们可以将原问题划分为两个子问题：构建左子树、构建右子树，加上一步操作：初始化根节点。而对于每棵子树（子问题），我们仍然可以复用以上划分方法，将其划分为更小的子树（子问题），直至达到最小子问题（空子树）时终止。
- **子问题是独立的**：左子树和右子树是相互独立的，它们之间没有交集。在构建左子树时，我们只需关注中序遍历和前序遍历中与左子树对应的部分。右子树同理。
- **子问题的解可以合并**：一旦得到了左子树和右子树（子问题的解），我们就可以将它们链接到根节点上，得到原问题的解。
### 2. 如何划分子树
1. 根据定义，`preorder` 和 `inorder` 都可以划分为三个部分：
	- 前序遍历：`[ 根节点 | 左子树 | 右子树 ]` ，例如上图的树对应 `[ 3 | 9 | 2 1 7 ]`
	- 中序遍历：`[ 左子树 | 根节点 | 右子树 ]` ，例如上图的树对应 `[ 9 | 3 | 1 2 7 ]`
2. 划分结果：
	1. 前序遍历的首元素 3 是根节点的值
	2. 查找根节点在 `inorder` 中的索引，将 `inorder` 划分为 `[ 9 | 3 | 1 2 7 ]`
	3. 根据 `inorder` 的划分结果，易得左子树和右子树的节点数量分别为 1 和 3 ，从而可将 `preorder` 划分为 `[ 3 | 9 | 2 1 7 ]`
### 3. 基于变量描述子树区间
- 将当前树的根节点在 `preorder` 中的索引记为 $i$ 。
- 将当前树的根节点在 `inorder` 中的索引记为 $m$ 。
- 将当前树在 `inorder` 中的索引区间记为 $[l,r]$ 。

|     | 根节点在 `preorder` 中的索引 | 子树在 `inorder` 中的索引区间 |
| --- | -------------------- | -------------------- |
| 当前树 | $i$                  | $[l,r]$              |
| 左子树 | $i+1$                | $[l,m−1]$            |
| 右子树 | $i+1+(m−l)$          | $[m+1,r]$            |
### 4. 代码实现
+ 为了提升查询 m 的效率，我们借助一个哈希表 `hmap` 来存储数组 `inorder` 中元素到索引的映射
+ 代码：
	```c
	/* 构建二叉树：分治 */
	TreeNode *dfs(int *preorder, int *inorderMap, int i, int l, int r, int size) {
	    // 子树区间为空时终止
	    if (r - l < 0)
	        return NULL;
	    // 初始化根节点
	    TreeNode *root = (TreeNode *)malloc(sizeof(TreeNode));
	    root->val = preorder[i];
	    root->left = NULL;
	    root->right = NULL;
	    // 查询 m ，从而划分左右子树
	    int m = inorderMap[preorder[i]];
	    // 子问题：构建左子树
	    root->left = dfs(preorder, inorderMap, i + 1, l, m - 1, size);
	    // 子问题：构建右子树
	    root->right = dfs(preorder, inorderMap, i + 1 + m - l, m + 1, r, size);
	    // 返回根节点
	    return root;
	}

	/* 构建二叉树 */
	TreeNode *buildTree(int *preorder, int preorderSize, int *inorder, int inorderSize) {
	    // 初始化哈希表，存储 inorder 元素到索引的映射
	    int *inorderMap = (int *)malloc(sizeof(int) * MAX_SIZE);
	    for (int i = 0; i < inorderSize; i++) {
	        inorderMap[inorder[i]] = i;
	    }
	    TreeNode *root = dfs(preorder, inorderMap, 0, 0, inorderSize - 1, inorderSize);
	    free(inorderMap);
	    return root;
	}
	```

## 六、AVL 树
1. 平衡的二叉搜索树一般分为两类：
　　- 严格维护平衡的，树的高度控制在$\log_2n$，使得每次操作都能使得时间复杂度控制在$O(\log n)$，例如AVL树，红黑树；
　　- 非严格维护平衡的，不能保证每次操作都控制在$O(\log n)$，但是每次操作均摊时间复杂度为$O(\log n)$，例如伸展树。
2. 由来：1962 年 G. M. Adelson-Velsky 和 E. M. Landis 在论文“An algorithm for the organization of information”中提出了 AVL 树。论文中详细描述了一系列操作，确保在持续添加和删除节点后，AVL 树不会退化，从而使得各种操作的时间复杂度保持在 $O(\logn)$ 级别
3. 是一种平衡二叉搜索树（balanced binary search tree）
4. **高度为 h 的 AVL 树最少节点数**遵循**斐波那契式递推关系**，最少节点数 $n (h) = n (h-1) + n (h-2) + 1$（$h≥2$）,**边界条件**：$n (0) = 0$（空树），$n (1) = 1$（仅根节点），此时为**斐波那契树**
	1. AVL 树要求左右子树高度差不超过 1，要达到最少节点数，左右子树需分别为高度 h-1 和 h-2 的最少节点 AVL 树
	2. 根节点占 1 个，因此总节点数为左右子树节点数之和加 1
	3. **解析解**$n(h) = F_{h+2} -1 = \frac{\frac{1 + \sqrt{5}}{2}^{h+2} - \frac{1 - \sqrt{5}}{2}^{h+2}}{\sqrt{5}} - 1$，$h = O(\log n)$
5. 知道了到叶子节点的**最短路径**$l$，**最多节点数**遵循**如下递推关系**，最少节点数 $n (l) = n (l-1) + 2^{2l} - 1 + 1 = n (l-1) + 2^{2l}$（$l\gt 2$）,**边界条件**：$n (0) = 1$（仅根节点），$n (1) = 5$（差一个全满，高为2的 Complete BT）
	- 根据递推式解出， **解析解**$n(l) = \frac{4^{n+1}-1}{3}$
	- AVL 树要求左右子树高度差不超过 1，要达到最多节点数，右子树比左子树高度高1，并且为perfectBT，左子树高度也由此递推关系得到，$h = 2\cdot l + 1$
6. **AVL树与伸展树的代码区别**
	1. **旋转**
		1. AVL树是根据**平衡因子**判断的，所以**需要改变的两个下层节点一定存在**，**无需特别判断**
		2. Spray树是**只根据**要向上旋转的**目的**进行旋转，所以**孙子节点、父节点可能不存在**，需要在流程中判断
	2. **结构**
		1. AVL树多了**高度和平衡因子**
		2. Spray多了对**父节点索引**的指针
	3. **查找**
		1. AVL查找**不需要调整结构**，可以**直接返回查找到的节点**
		2. Spray需要**将查找到的节点旋转到根节点**，但是可能存在未找到的情况，所以需要用**指针额外返回**一个查找节点/根节点
	4. **变形**
		1. AVL使用`rotate`函数，区分四种情况
		2. Spray使用`spray`函数，**迭代一次性**旋转节点直到根节点，过程中判断情况
	5. **递归和迭代**
		1. AVL更改平衡因子需要子树正确，因此需要**递归**先完成子树操作
		2. Spray树的伸展操作本身就为迭代，因此若递归会不正确伸展非当前节点，需要用**迭代**
### 1. 常见术语
#### 1. 节点高度
+ 由于 AVL 树的相关操作**需要获取节点高度**，因此我们需要为节点类添加 `height` 变量
+ “节点高度”是指**从该节点到它的最远叶节点的距离**，即**所经过的边的数量**。需要特别注意的是，**叶节点的高度**为 $0$ ，而**空节点的高度**为 $−1$
#### 2. 节点平衡因子（balance factor）
+ 节点平衡因子 balance factor 定义为节点**左子树的高度减去右子树的高度**，记作$BF(node)$
+ 空节点的**平衡因子为 $0$**
+ 设平衡因子为 $f$ ，则一棵 AVL 树的任意节点的平衡因子皆满足 $−1≤f≤1$
### 2. AVL 树旋转
1. **失衡节点**：平衡因子绝对值 $>1$
2. 旋转操作分为四种：**右旋、左旋、先右旋后左旋、先左旋后右旋**
3. 每次只操作一个节点，因此只有以下四种情况
#### 1. 右旋(Right Rotate)
- 对应 Left-Left(LL) 种类
+ 当节点 `child` 有右子节点（记为 `grand_child` ）时，需要在右旋中添加一步：将 `grand_child` 作为 `node` 的左子节点
+   [有 grand_child 的右旋操作（外部图片）](https://www.hello-algo.com/chapter_tree/avl_tree.assets/avltree_right_rotate_with_grandchild.png)
+ 代码：
	```c
	/* 右旋操作 */
	TreeNode *rightRotate(TreeNode *node) {
		TreeNode *child, *grandChild;
		child = node->left;
		grandChild = child->right;
		// 以 child 为原点，将 node 向右旋转
		child->right = node;
		node->left = grandChild;
		// 更新节点高度
		updateHeight(node);
		updateHeight(child);
		// 返回旋转后子树的根节点
		return child;
	}
	```
#### 2. 左旋 (Left Rotate)
- 对应 Right-Right RR
+ 当节点 `child` 有左子节点（记为 `grand_child` ）时，需要在左旋中添加一步：将 `grand_child` 作为 `node` 的右子节点
+   [有 grand_child 的左旋操作（外部图片）](https://www.hello-algo.com/chapter_tree/avl_tree.assets/avltree_left_rotate_with_grandchild.png)
+ **右旋和左旋操作在逻辑上是镜像对称的，它们分别解决的两种失衡情况也是对称的**，只需将右旋的实现代码中的所有的 `left` 替换为 `right` ，将所有的 `right` 替换为 `left` ，即可得到左旋的实现代码：
	```c
	/* 左旋操作 */
	TreeNode *leftRotate(TreeNode *node) {
		TreeNode *child, *grandChild;
		child = node->right;
		grandChild = child->left;
		// 以 child 为原点，将 node 向左旋转
		child->left = node;
		node->right = grandChild;
		// 更新节点高度
		updateHeight(node);
		updateHeight(child);
		// 返回旋转后子树的根节点
		return child;
	}
	```
#### 3. 先左旋后右旋 (Left+Right Rotate)

对于图中的失衡节点 3 ，仅使用左旋或右旋都无法使子树恢复平衡。此时需要先对 `child` 执行“左旋”，再对 `node` 执行“右旋”
对应 Left-Right LR

[先左旋后右旋（外部图片）](https://www.hello-algo.com/chapter_tree/avl_tree.assets/avltree_left_right_rotate.png)

#### 4. 先右旋后左旋(Right-Left Rotate)

如图所示，对于上述失衡二叉树的镜像情况，需要先对 `child` 执行“右旋”，再对 `node` 执行“左旋”
对应 Right-Left RL

[先右旋后左旋（外部图片）](https://www.hello-algo.com/chapter_tree/avl_tree.assets/avltree_right_left_rotate.png)
#### 5. 旋转的选择
| 失衡节点的平衡因子   | 子节点的平衡因子 | 应采用的旋转方法 | 对应树名           |
| ----------- | -------- | -------- | -------------- |
| $>1$（左偏树）   | $≥0$     | 右旋       | Left-Left LL   |
| $>1$ （左偏树）  | $<0$     | 先左旋后右旋   | Left-Right LR  |
| $<−1$ （右偏树） | $≤0$     | 左旋       | Right-Right RR |
| $<−1$ （右偏树） | $>0$     | 先右旋后左旋   | Right-Left RL  |
```cpp
/* 执行旋转操作，使该子树重新恢复平衡 */
TreeNode *rotate(TreeNode *node) {
    // 获取节点 node 的平衡因子
    int _balanceFactor = balanceFactor(node);
    // 左偏树
    if (_balanceFactor > 1) {
        if (balanceFactor(node->left) >= 0) {
            // 右旋
            return rightRotate(node);
        } else {
            // 先左旋后右旋
            node->left = leftRotate(node->left);
            return rightRotate(node);
        }
    }
    // 右偏树
    if (_balanceFactor < -1) {
        if (balanceFactor(node->right) <= 0) {
            // 左旋
            return leftRotate(node);
        } else {
            // 先右旋后左旋
            node->right = rightRotate(node->right);
            return leftRotate(node);
        }
    }
    // 平衡树，无须旋转，直接返回
    return node;
}
```
### 3. 常用操作
#### 1. 插入节点
- 需要从这个节点开始，**自底向上执行旋转**操作，使所有失衡节点恢复平衡
- 查找所需的时间为 $O(\log n)$，加上返回根节点途中最多 $O(\log n)$（平均为 $O(1)$）的回溯层级，因此该操作可在 $O(\log n)$ 时间内完成
- **最多需要 2 次旋转（1 次双旋转）** 就能恢复整个树的平衡，最坏情况为根节点失衡，此时回溯次数最多
- 代码：
	```c
	/* 插入节点 */
	void insert(AVLTree *tree, int val) {
	    tree->root = insertHelper(tree->root, val);
	}

	/* 递归插入节点（辅助函数） */
	TreeNode *insertHelper(TreeNode *node, int val) {
	    if (node == NULL) {
	        return newTreeNode(val);
	    }
	    /* 1. 查找插入位置并插入节点 */
	    if (val < node->val) {
	        node->left = insertHelper(node->left, val);
	    } else if (val > node->val) {
	        node->right = insertHelper(node->right, val);
	    } else {
	        // 重复节点不插入，直接返回
	        return node;
	    }
	    // 更新节点高度
	    updateHeight(node);
	    /* 2. 执行旋转操作，使该子树重新恢复平衡 */
	    node = rotate(node);
	    // 返回子树的根节点
	    return node;
	}
	```
#### 2. 删除节点
+ 类似地，在二叉搜索树的删除节点方法的基础上（分类讨论删除），需要**从底至顶执行旋转操作**，使所有失衡节点恢复平衡
+ 对于要删除的节点，如果子节点数量为**0/1**，**直接返回**子节点即可，如果子节点数量为**2**，需要**找到节点值**后，对以节点为根的**子树**进行**对中序遍历的下个节点的值的删除操作**
+ 查找所需的时间为 $O(\log n)$，加上返回根节点途中最多 $O(\log n)$（平均为 $O(1)$）的回溯层级，因此该操作可在 $O(\log n)$ 时间内完成
+ 删除节点可能导致子树高度降低，进而破坏祖先节点的平衡，且失衡会**持续向上传递至根节点**，因每一层祖先的平衡因子都可能因子树高度变化而超标，每一层失衡节点最多需 1 次旋转调整，因此最多旋转次数与树高成正比，最多需$O (\log n)$ 次旋转，如**斐波那契树**
+ 代码：
```c
	/* 删除节点 */
	// 由于引入了 stdio.h ，此处无法使用 remove 关键词
	void removeItem(AVLTree *tree, int val) {
	    TreeNode *root = removeHelper(tree->root, val);
	}

	/* 递归删除节点（辅助函数） */
	TreeNode *removeHelper(TreeNode *node, int val) {
	    TreeNode *child, *grandChild;
	    if (node == NULL) {
	        return NULL;
	    }
	    /* 1. 查找节点并删除 */
	    if (val < node->val) {
	        node->left = removeHelper(node->left, val);
	    } else if (val > node->val) {
	        node->right = removeHelper(node->right, val);
	    } else {
	        if (node->left == NULL || node->right == NULL) {
	            child = node->left;
	            if (node->right != NULL) {
	                child = node->right;
	            }
	            // 子节点数量 = 0 ，直接删除 node 并返回
	            if (child == NULL) {
	                return NULL;
	            } else {
	                // 子节点数量 = 1 ，直接删除 node 并返回 child
	                node = child;
	            }
	        } else {
	            // 子节点数量 = 2 ，则将中序遍历的下个节点删除，并用该节点替换当前节点
	            // 流程：找到节点值后，直接对以节点为根的子树进行对中序遍历的下个节点的值的删除
	            TreeNode *temp = node->right;
	            while (temp->left != NULL) {
	                temp = temp->left;
	            }
	            int tempVal = temp->val;
	            node->right = removeHelper(node->right, temp->val);
	            node->val = tempVal;
	        }
	    }
	    // 更新节点高度
	    updateHeight(node);
	    /* 2. 执行旋转操作，使该子树重新恢复平衡 */
	    node = rotate(node);
	    // 返回子树的根节点
	    return node;
	}
```
#### 3. 查找节点
- 与二叉搜索树一致
### 4. AVL树应用
- 组织和存储大型数据，适用于**高频查找、低频增删**的场景
- 用于构建数据库中的索引系统
- 红黑树也是一种常见的平衡二叉搜索树。相较于 AVL 树，**红黑树的平衡条件更宽松，插入与删除节点所需的旋转操作更少，节点增删操作的平均效率更高**
## 七、伸展树 Splay Tree
- 由 Daniel Sleator 和 Robert Tarjan 发明
- 是一种平衡二叉查找树，它通过 **伸展（splay）操作** 不断**将某个节点旋转到根节点**，使得整棵树仍然满足二叉查找树的性质，能够在均摊时间$O(\log{n})$内完成插入、查找和删除操作，并且保持平衡而不至于退化为链
- **基本思想**：对于“**访问频繁**”的节点，就把这些节点**移动到靠近根**的位置，以此提高整体操作的效率
### 1. 伸展树基础操作
1. 旋转：
	- 目的：在保持 BST 性质不变的同时，**将某个结点上移一个位置，并将原有的父级结点作为自己的儿子**
	- 将一个节点搬运到根的第一步就是让该节点先“向上”搬运一次，使该节点的深度$-1$，根据当前节点v与其父节点f的关系，又有“左旋”和“右旋”两种旋转方式（v为需要搬运的当前节点，f为v的父节点，ff为f的父节点，**和AVL旋转相似**，AVL注重根节点，将根节点作为主节点，Spray Tree注重要搬运的结点，将提升高度的节点作为主节点）
	- ![splay-rotate](/blog/obsidian-assets/splay-rotate-8e6662a232.svg)
	- 图中**向右为zig-zig 向左为zag-zag**，数字为编号，不是值
	+ 每次旋转**平衡因子只减不加**，因此可以**维持平衡二叉树**
	+ 旋转步骤：（假设需要上移的节点为 x，以右旋为例）
		1. 首先，记录节点 x 的父节点 y，以及 y 的父节点 z（可能为空），并记录 x 是 y 的左子节点还是右子节点；
		2. 按照旋转后的树中自下向上的顺序，依次更新 y 的左子节点为 x 的右子节点，x 的右子节点为 y，以及若 z 非空，z 的子节点为 x；
		3. 按照同样的顺序，依次更新当前 y 的左子节点（若存在）的父节点为 y, y 的父节点为 x，以及 x 的父节点为 z；
		4. 自下而上维护节点信息
			```cpp
			void rotate(int x) {
				int y = fa[x], z = fa[y];
				bool r = dir(x);  // 判断是否为右儿子
				child[y][r] = child[x][!r];
				child[x][!r] = y;
				if (z) child[z][dir(y)] = x;
				if (child[y][r]) fa[child[y][r]] = y;
				fa[y] = x; fa[x] = z;
				push_up(y); // 根据子节点信息更新节点信息
				push_up(x);
			}
			```
2. **伸展操作**：Splay 树要求每访问一个节点后都要强制将其旋转到根节点，该操作也称伸展操作
	+ 目的：把当前节点变成根节点，伸展操作Splaying大致减半**访问路径上on the access path**大多数节点的深度，注意**不是**减半**整棵树in the tree** 大多数节点的深度
	+ 过程：每次向上找两个父节点，进行双旋操作，最后到整颗树的根节点时，若深度为 $1$ 进行单旋，否则进行双旋（均为先上后下）
	+ **zig/zag**(奇偶校验旋转): 在 **$p$ 是根节点**时操作。Splay 树会根据 $x$ 和 $p$ 间的边旋转。**zig** 存在是用于处理**奇偶校验问题**，仅当 $x$ 在伸展操作开始且具有奇数深度时，作为伸展操作的**最后一步**执行
		+ ![splay-zig](/blog/obsidian-assets/splay-zig-119271df67.svg)
		+ 即直接将 $x$ 右旋或左旋
		+ **奇偶校验问题**：**Zig/Zag 旋转** 是 Splay 操作的特殊情况，执行条件为
			- **仅当目标节点 x 的父节点 p 是根节点时执行**
			- **且仅当 x 在操作开始时具有奇数深度时**，才作为 Splay 操作的最后一步执行
		+ 当待伸展节点初始深度为奇数时，连续使用**常规旋转**可能无法高效将节点提到根，还可能导致**树结构失衡**、深度异常累积，影响Splay树访问后将节点置顶的效率。而使用**双旋**能在伸展到树根的过程中**维护伸展树的平衡性**
	+ **zig-zig/zag-zag**: 在 **$p$ 不是根节点且 $x$ 和 $p$ 都是右侧子节点或都是左侧子节点**时操作。下方例图显示了 $x$ 和 $p$ 都是左侧子节点时的情况。Splay 树**首先按照连接 $p$ 与其父节点 $g$ 边旋转，然后按照连接 $x$ 和 $p$ 的边旋转**
		+ ![splay-zig-zig](/blog/obsidian-assets/splay-zig-zig-a8ef8b7b33.svg)
		+ **即首先将 $p$ 右旋或左旋，然后将 $x$ 右旋或左旋**(更关注P而非G，因此这么转，并且摊还分析可能出问题)
	+ **zig-zag/zag-zig**: 在 $p$ 不是根节点且 $x$ 和 $p$ 一个是右侧子节点一个是左侧子节点时操作。Splay 树首先按 $p$ 和 $x$ 之间的边旋转，然后按 $x$ 和 $g$ 新生成的结果边旋转
		+ ![splay-zig-zag](/blog/obsidian-assets/splay-zig-zag-0a39781df0.svg)
		+ **即将 $x$ 先左旋再右旋或先右旋再左旋**
	+ 实现，可以指定任意根节点 $z$，并将它的子树内任意节点 $x$ 上移至 $z$ 处：
		1. 首先记录根节点 $z$ 的父节点 $w$，从而可以利用 `fa[x] == w` 判断 $x$ 已经位于根结点处
		2. 记录 $x$ 当前的父节点 $y$，如果 $y$ 和 $w$ 相同，说明 $x$ 已经到达根节点；
		3. 否则，利用 `fa[y] == w` 判断 $y$ 是否是根节点。如果是，直接做 zig 操作将 $x$ 旋转；如果不是，利用 `dir(x) == dir(y)` 判断使用 zig-zig 还是 zig-zag，前者先旋转 $y$ 再旋转 $x$，后者直接旋转两次 $x$
			```cpp
			void splay(int& z, int x) {
				int w = fa[z];
				for (int y; (y = fa[x]) != w; rotate(x)) {
					if (fa[y] != w) rotate(dir(x) == dir(y) ? y : x);
				}
				z = x;
			}
			```
### 2. 伸展树常规操作
伸展树的插入、删除、查找**单个操作最坏复杂度为 $O (n)$**，**均摊复杂度均为 $O (\log n)$**
#### 1. 插入操作
1. 找到插入位置
2. 把插入的这个节点伸展成根节点
#### 2. 删除操作
1. **查找并Splay目标节点**
    - 首先**使用查找操作找到要删除的节点**
    - 通过splay操作将该节点移动到根位置
    - 如果节点不存在，直接返回原树
2. **分离左右子树
    - 此时要删除的节点在根位置
    - 记录根的左子树为`left_tree
    - 记录根的右子树为`right_tree
    - 释放根节点内存
3. **处理子树合并
    - **情况1**：左子树为空
        - 直接返回右子树作为新根
    - **情况2**：左子树非空
        - 在左子树中寻找**最大值节点**（即最右节点）
        - 对该最大值节点执行splay操作，使其成为左子树的新根
        - 此时**左子树新根的右子树必定为空**（因为它是最大值）
        - **将原来的右子树连接到左子树新根的右子树上**
        - **返回左子树**作为新根
4. **对称操作也可以**，即伸展右子树，原左子树作为右子树的新左子树
#### 3. 查找操作
1. 找到对应节点
2. 将查找到的节点伸展成根节点
#### 4. 按照排名查找
**如果记录**了子树**大小**信息，所以 Splay 树还可以**通过排名访问元素**(与二叉搜索树相同)
设 $k$ 为剩余排名，具体步骤如下：
- 如果左子树非空且剩余排名 $k$ 不大于左子树的大小，那么向左子树查找
- 否则，如果 $k$ 不大于左子树加上根的大小，那么根节点就是要寻找的
- 否则，将 $k$ 减去左子树的和根的大小，继续向右子树查找
- 将最终找到的元素上移至根部
#### 4. 对应代码
```c
void splay(Node *x, Node *target) //将节点x伸展到target的儿子位置处
    {
        if(x == null) return;
        Node *y;
        while(x->par != target)
        {
            y = x->par;
            if(x == y->ls)
            {
                if(y->par != target && y == y->par->ls) zig(y);
                zig(x);
            }
            else
            {
                if(y->par != target && y == y->par->rs) zag(y);
                zag(x);
            }
        }
        if(target == null) root = x;
    }
```
### 3. 搜索效率
1. **最坏时间复杂度**$O(n)$
2. 统计意义上**均摊时间复杂度**为$O(\log n)$，不能保证每个单步操作都是有效率的
3. 对大小为 $n$ 的 Splay 树做 $m$ 次伸展操作的复杂度是 $O((n+m)\log{n})$ 的，单次均摊复杂度是 $O(\log{n})$ 的
4. 势能分析法：方法见[摊还分析-势能分析法](/blog/notes/courses/course-data-structures-algorithms/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E4%B8%8E%E6%91%8A%E8%BF%98%E5%88%86%E6%9E%90)
	1. **节点v的势能**为：**以节点v为根的子树的大小取对数**，即$\phi(v) = \log ({size(v)})$
	2. **整棵树的势能**：每个节点的势能之和$\phi=\sum_{v}\phi(v)$
	3. 变量解释
		1. $T$：花费的时间
		2. $\phi$：整棵树的势能
		3. $A$：摊还代价
	4. 子步骤分析：**全部放缩为常量和$\Delta\text{rank}_{i}^{(k)}(v)$**
		1. zig/zag
			1. 整棵树里只有v和p两个节点的势能可能变化，有$A_{i}^{(k)} = T_{i}^{(k)} + \Delta\text{rank}_{i}^{(k)}(v) + \Delta\text{rank}_{i}^{(k)}(\text{root})$
			2. p子树size减小，因此$\Delta\text{rank}_{i}^{(k)}(\text{root})<0$，有$A_{i}^{(k)} < T_{i}^{(k)} + \Delta\text{rank}_{i}^{(k)}(v)$
			3. 被提升点v仅上升一层 $T_{i}^{(k)} = 1$
			4. $A_{i}^{(k)} < 1 + \Delta\text{rank}_{i}^{(k)}(v)$
		2. zig-zag/zag-zig
			1. 只有x,p,g三个结点变化，有$A_{i}^{(k)} = T_{i}^{(k)} + \Delta\text{rank}_{i}^{(k)}(v) + \Delta\text{rank}_{i}^{(k)}(p) + \Delta\text{rank}_{i}^{(k)}(g)$，即为$A_{i}^{(k)} = T_{i}^{(k)} + \text{rank}_{i}^{(k)}(v) - \text{rank}_{i-1}^{(k)}(v) + \text{rank}_{i}^{(k)}(p) - \text{rank}_{i-1}^{(k)}(p) + \text{rank}_{i}^{(k)}(g) - \text{rank}_{i-1}^{(k)}(g)$
			2. 由于**根节点的子树大小在旋转前后保持不变，因此根节点的势能在操作过程中不变**，因此$\text{rank}_{i}^{(k)}(v) = \text{rank}_{i-1}^{(k)}(g)$，且$T_{i}^{(k)} = 2$（两次旋转），代入化简得：$A_{i}^{(k)} = 2 - \text{rank}_{i-1}^{(k)}(v) + \text{rank}_{i}^{(k)}(p) - \text{rank}_{i-1}^{(k)}(p) + \text{rank}_{i}^{(k)}(g)$
			3. 能看出$\text{rank}_{i-1}^{(k)}(p) > \text{rank}_{i-1}^{(k)}(v)$，有$A_{i}^{(k)} < 2 - 2\text{rank}_{i-1}^{(k)}(v) + \text{rank}_{i}^{(k)}(p) + \text{rank}_{i}^{(k)}(g)$
			4. $\text{rank}_{i}^{(k)}(p) + \text{rank}_{i}^{(k)}(g) = \log(\text{size}(p_i)) + \log(\text{size}(g_i))$, 且$\log a + \log b < 2\log\left(\frac{a+b}{2}\right)$,因此$\log(\text{size}(p_i)) + \log(\text{size}(g_i)) < 2\log\left(\frac{\text{size}(p_i) + \text{size}(g_i)}{2}\right)= 2\log\left(\frac{\text{size}(v_i) - 1}{2}\right) < 2\log(\text{size}(v_i)) - 2 = 2\text{rank}_{i}^{(k)}(v) - 2$
			5. 综上有$A_{i}^{(k)} < 2\text{rank}_{i}^{(k)}(v) - 2\text{rank}_{i-1}^{(k)}(v)=2\Delta\text{rank}_{i}^{(k)}(v)$
		3. zig-zig/zag-zag
			1. 前三步与上述相同，有$A_{i}^{(k)} < 2 - 2\text{rank}_{i-1}^{(k)}(v) + \text{rank}_{i}^{(k)}(p) + \text{rank}_{i}^{(k)}(g)$
			2. 有$\text{rank}_{i}^{(k)}(p) < \text{rank}_{i}^{(k)}(v)$,  因此$A_{i}^{(k)} < 2 - 3\text{rank}_{i-1}^{(k)}(v) + \text{rank}_{i}^{(k)}(v) + \text{rank}_{i}^{(k)}(g) + \text{rank}_{i-1}^{(k)}(v)$
			3. 不等式变换
				$\text{rank}_{i}^{(k)}(g) + \text{rank}_{i-1}^{(k)}(v) = \log(\text{size}(C + D + 1)) + \log(\text{size}(A + B + 1))$
				$上式< 2\log\left(\frac{\text{size}(A + B + C + D + 2)}{2}\right) < 2\log(\text{size}(v_i)) - 2 = 2\text{rank}_{i}^{(k)}(v) - 2$
			4. 综上有$A_{i}^{(k)} < 3\text{rank}_{i}^{(k)}(v) - 3\text{rank}_{i-1}^{(k)}(v)=3\Delta\text{rank}_{i}^{(k)}(v)$
	5. 综上，zig/zag最多执行一次，而$\Delta\text{rank}_{i}^{(k)}(v)>0$, 三种均有$A_{i}^{(k)} < 3\Delta\text{rank}_{i}^{(k)}(v)+1$
	6. 对于链表情况，势能最高,为$\sum_{v} \log(\text{size}(v)) = \sum_{k=1}^{n} \log(k) = \log\left(\prod_{k=1}^{n} k\right) = \log(n!) = O(n\log n)$, 对于满树情况，势能最低为$O(n)$, 分析参考[建堆的复杂度分析](/blog/notes/courses/course-data-structures-algorithms/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-hello-%E7%AE%97%E6%B3%95)
	7. 因此$\sum_{i=1}^{x} A_{(k)}^i <\sum_{i=1}^{x} 3\Delta\text{rank}_{(k)}^x(v) \le  3\times (n\log n-n) = O(n\log n)$
	8. 综上所述，对于$m$次操作，对于$m>>n$的情况,$T = A-\Delta\phi=O(m\log n)$，每次操作的均摊时间复杂度为$O(\log n)$
### 4. 半伸展
+ 对于一字旋转，仅仅对第二父节点进行单旋，后续用该父节点进行操作
+ 意义：弹性处理，如输入法不是直接移到最前，而是仅向前移动一段距离
## 八、B-树与B+树
### 1. B-树
1. 目的：数据量达到了亿级别，主存存储不下，只能以块的形式从磁盘读取数据，与主存的访问时间相比，磁盘的 I/O 操作相当耗时，需要减少磁盘的 I/O 操作。
2. 思路：大多数平衡树的操作（查找、插入、删除，最大值、最小值等等）需要 $O(h)$ 次磁盘访问操作，其中 $h$ 是树的高度。但是对于 B-树而言，树的高度将不再是 $\log n$ (其中 $n$ 是树中的结点个数），而是可控的高度 $h$
3. m阶B树特性
	- 每个结点**至多**拥有**m棵**子树，除了根结点以外，其余**每个分支结点至少拥有 m/2 棵子树**
	- **根结点至少拥有两颗**子树（存在子树的情况下）
	- 每个节点**可以存储多个关键字**，且关键字**按升序/降序排列**
	- 节点的**子节点数比关键字数多1**，且所有子节点也遵循B树规则
	- 所有的**叶结点都在同一层**上
### 2. B+树
1. **定义**：B+ 树是一种**多叉排序树**，即**每个节点通常有多个孩子**。一棵 B+ 树包含根节点、内部节点和叶子节点。根节点可能是一个叶子节点，也可能是一个包含两个或两个以上孩子节点的节点。结点存在**阶**（order），即**孩子的最大数**M，特定的B+树又可称作$⌈\frac{M}{2}⌉$-$\lceil \frac{M}{2} \text{\rceil + 1}$-$...$-$\text{M-1}$-$M$，如2-3树、2-3-4树
	![Pasted image 20250929204558](/blog/obsidian-assets/pasted-image-20250929204558-9fa7e8048f.png)
2. **性质**
	- **根节点**：要么是叶子，要么有 $2～M$个孩子（子节点）
	- 非根的非叶子节点**孩子数量**在 $⌈\frac{M}{2}⌉～M$之间，即**本身节点数量**为 $⌈\frac{M-1}{2}⌉～M-1$
	- 所有叶子节点必须在**同一深度**（保证树的平衡，让查找效率稳定）
	- **所有的非叶子节点可以看成是索引部分**，节点中**仅含有其子树（根节点）中的最大（或最小）关键字
	- B+树的**叶子结点都是相链**的，因此对整棵树的遍历只需要一次线性遍历叶子结点即可
3. **操作**
	1. **查找**：从根节点开始，**对根节点关键字使用二分查找**， 向下逐层查找，最终找到匹配的叶子节点，注意在查找时，若**非叶子节点上的关键字等于给定值**，并**不终止**，而是继续向下直到叶子节点
		比如查找5。从根节点开始，$5<8$则从左分支向下查找，对应磁盘一次IO，找到`2 5 8` 节点，$5>2\&5\le 5$ 则从5对应的分支进行查找，最终定位到5，查找结束
		 ![Pasted image 20250929204905](/blog/obsidian-assets/pasted-image-20250929204905-aae6805f69.png)
	2. **插入**：**从叶子节点开始插入** ，且不能破坏关键字自小而大的顺序
		1. 若为**空树**，**创建一个叶子节点**，然后将记录**插入**其中，此时这个叶子节点也是根节点，插入操作结束。
		2. **叶子节点**：根据关键字找到叶子节点，向这个叶子节点插入记录
			1. 若当前节点**关键字的个数小于m，插入结束**
				如在下图的 B+ 树中，插入新的数据 10
				![Pasted image 20250929211242](/blog/obsidian-assets/pasted-image-20250929211242-4827404d02.png)
			2. 若当前节点**关键字的个数大于m**，即为m+1，将这个叶子节点**分裂**成左右两个叶子节点，**左叶子节点包含前$\lceil \frac{m+1}{2}\rceil$个记录，右节点包含剩下的$\lfloor \frac{m+1}{2}\rfloor$的记录**，左子节点个数大于等于右子节点个数
			3. 将**第$\lceil \frac{m+1}{2}\rceil+1$个记录的关键字进位到父节点中**，**复制**到父节点的关键字左孩子指针向左节点，右孩子指针向右节点。将当前节点的指针向父节点，然后执行第3步**索引节点分析**
				如下图的 B+ 树中，插入数据 4
				![Pasted image 20250929211353](/blog/obsidian-assets/pasted-image-20250929211353-2d01efe464.png)
				由于所在节点$2,3,5$在插入之后数据溢出，因此需要分裂为两个新的节点，同时调整父节点的索引数据
				![Pasted image 20250929213008](/blog/obsidian-assets/pasted-image-20250929213008-9d13e0deb2.png)
				$2,3,4,5$分裂成了$2,3$和$4,5$，因此需要在这两个节点之间新增一个索引值，这个值应该**大于左子树的最大值且小于等于右子树的最小值**。 综上，需要在父节点中新增索引 4 和两个指向新节点的指针
		3. **索引节点**（内部节点）
			4. 若当前节点关键字的个数**小于等于m - 1**，则插入结束
			5. 否则，将这个**索引类型节点分裂**成两个索引节点，**左索引节点包含前$\lceil \frac{m+1}{2}\rceil-1$个key，右节点包含$\lfloor \frac{m+1}{2}\rfloor-1$个key**，将第$\lceil \frac{m+1}{2}\rceil$个关键字**进位**到父节点中，进位到父节点的关键字左孩子指向左节点，进位到父节点的关键字右孩子指向右节点，将当前节点的指针指向父节点，**然后重复这一步**
			6. 本质上**与根节点逻辑相同**，**都是看子节点个数来分隔**，左叶子节点包含前$\lceil \frac{m+1}{2}\rceil$个记录，右节点包含剩下的$\lfloor \frac{m+1}{2}\rfloor$的记录，但由于索引节点内指向子节点的指针相对于值的个数多一，因此还要减一，同时为了尽可能多的信息选择进位中间的索引节点
	3. **删除**
		1. 首先查询到键值所在的叶子节点，删除该叶子节点的数据
		2. 如果删除叶子节点之后的数据数量，**满足 B+ 树的平衡条件，则直接返回**
		3. **不满足 B+ 树的平衡条件**则需要做平衡操作，**如果是进行了合并**操作，就需要向上修正父节点的指针：删除被合并节点的键值以及指针, 由于做了**删除**操作，**可能父节点也会不平衡，那么就按照前面的步骤也对父节点进行重新平衡操作**，这样一直到某个节点平衡为止
		4. **叶子结点平衡**
			1. 被删除节点的**数据量足够**，**不需要**做重新平衡操作
			2. 如果该叶子节点的左右兄弟节点的数据量可以**借用**，就借用过来满足平衡条件，自**左节点**借用父节点关键字更新为**自身最小值**，自**右节点**借用父节点关键字**更新为右节点最小值**
				在下图中，从叶子节点中删除数据之后，只剩下数据`[11]`
				![Pasted image 20250929213826](/blog/obsidian-assets/pasted-image-20250929213826-11018e952f.png)
				由于此时其左兄弟节点`[2,3,5]`有足够的数据可以借用，于是：
				- 将数据`5`移动到`[11]`中，成为新的叶子节点`[5,11]`。
				- 由于该叶子节点数据发生了变化，因此**需要同时修正父节点中的索引数据**`7`为`5`
				类似的，也有从右边兄弟节点借用数据的情况
				![Pasted image 20250929214126](/blog/obsidian-assets/pasted-image-20250929214126-27cbac2e8e.png)
			3. 否则，与相邻的兄弟节点（**默认左兄弟**）**合并**成一个新的子节点，并**删除对应父索引值**
				从叶子节点中删除数据之后，只剩下数据`[5]`
				![Pasted image 20250929214654](/blog/obsidian-assets/pasted-image-20250929214654-d2e0695ef3.png)
				左边兄弟节点`[2,3]`的数据也不够用，于是两个节点进行了合并，形成新的节点`[2,3,5]`，这样节点`[5]`就要在父节点中被删除
				类似的，也有合并到右边的情况
				![Pasted image 20250929214742](/blog/obsidian-assets/pasted-image-20250929214742-ff9e5d51f5.png)
		5. **内部节点的重平衡**
			1. 如果父节点中的**数据足够**，**不需要**进行调整
			2. **借用兄弟节点数据**进行重平衡操作：如果兄弟节点数据足够，那么同样可以从兄弟节点借用数据进行重平衡操作
				以下图为例，假设内部节点`[11]`在删除索引和指针之后，需要从兄弟节点`[2,3,5]`借用数据
				![Pasted image 20250929215045](/blog/obsidian-assets/pasted-image-20250929215045-27b020b5bc.png)
				由于内部节点以及其父节点均为索引节点，对应子节点需要满足$节点val\le 子节点所有值<父索引节点值$，因此需要使用**传递**的方法，将**父节点val借给所需节点，自身值借给父节点**，同时**内部节点有指向子节点的指针，也要随着一起调整**
				同样的，也有从右边兄弟节点借用数据的情况
				![Pasted image 20250929215226](/blog/obsidian-assets/pasted-image-20250929215226-918fcb00e5.png)
			3. 与兄弟节点进行**合并**
				下图中，节点`[10]`的数据量不足，而兄弟节点`[2,5]`也不够数据借用，**只能将两者合并，并且将父节点关键字下移**，同时调整**指向子节点的指针**以及**父节点下移关键字的指针**（右指针指向`NULL`)
				![Pasted image 20250929220621](/blog/obsidian-assets/pasted-image-20250929220621-045789d8de.png)
				合并之后的图示
				![Pasted image 20250929220659](/blog/obsidian-assets/pasted-image-20250929220659-eb5ebd8335.png)
				由于做了**删除**操作，**可能父节点也会不平衡，那么就按照前面的步骤也对父节点进行重新平衡操作**，这样一直到某个节点平衡为止
	4. **遍历**
		- B+ 树只在叶子节点的层级上就可以实现整棵树的遍历。从根节点出发一路搜索到最左端的叶子节点之后即可**根据指针遍历**
6. 时间复杂度分析
	1. **树深度**$Depth(M,N)=O(\lceil \log_{M/2}{N} \rceil)$
	2. **搜索时间** $T_{find}(M, N)=O(\log_2 N)$
	3. **证明**：
		1. 为保证平衡，每个非叶节点最少有 $\lceil M/2 \rceil$ 个子节点，第 $h$ 层（叶节点的上一层）：最少有$\lceil M/2 \rceil^{h-2}$个节点，即为**叶节点的最小关键字数**，故有**树深度**$Depth(M,N)=O(\lceil \log_{M/2}{N} \rceil)$
		2. 在每个**节点内**进行**二分搜索**，复杂度为$O(\lceil \log_{2}{M/2} \rceil)$，对每层都进行搜索，根据**换底公式**，得到**搜索时间复杂度**为$O(\lceil \log_{2}{M/2} \rceil \times \lceil \log_{M/2}{N} \rceil)=O(\log_2 N)$
	4. 最好选择M为3或4，性能最强
## 九、红黑树
### 1. 基本知识
1. 红黑树（Red-Black-Tree）是一种**自平衡二叉搜索树**，但它并非像AVL树那样严格平衡，而是**允许一定的不平衡存在**，在保证增删查改效率没有太大影响的情况下，显著减少了平衡调整的次数，提升总体效率
2. AVL树一般通过节点的“平衡因子”来维持平衡，而红黑树通过给节点**着色**，确保其高效性，每个节点额外存储了一个 color 字段 (`RED` or `BLACK`)，用于确保树在插入和删除时保持平衡
3. **性质**(约束条件)
	1. 是一颗二叉搜索树
	2. 每个节点**都为红色或黑色**
	3. **NIL 节点**（空节点）**为黑色**
	4. **红色**节点的**子节点为空或黑色**
	5. 从根节点**到 NIL 节点**的**每条路径上的黑色节点数量相同**（做题时可以标出来NIL，防止数错）
4. 有了以上约束条件，就可确保**其没有一条路径长度能够超出其他路径的2倍**，从而保证高效操作
5. **黑高度** black-height：计算某个节点的黑高度时，**当前节点不被包含在内**，**NIL 节点**（空节点）**为黑色**
	- **最少内部节点数**：当子树为**全黑树**时，达到最小值 $2^{bh(x)}−1$
	- **最多内部节点数**：当子树为高度 $2⋅bh(x)$ 的完整二叉树（**一红一黑**）时，达到最大值 $2^{2⋅bh(x)}−1$
6. **内部节点**：**除了 NIL 节点之外**的所有节点都是内部节点
7. 具有3个节点的红黑树，**不一定有一个红色节点**：需要从空树开始插入，先构造出根节点为黑，两个红色叶节点，再插入一个新节点，两个红色叶节点被染黑，而根节点一定为黑，因此染红后染黑，最后删除该新节点，得到**有且仅有3个黑色节点的红黑树**
### 2. 原理
1. 长度不超两倍原因：
	1. 假设一棵红黑树的一条路径上有**n个黑色节点**，那么由于其所有路径上的黑色节点数量是相同的，所以其**所有路径上**都一定**有n个黑色节点**
		1. **最长的可能路径**上的节点就是一黑一红（要确保无连续红色节点）**一共有2n个节点**
		2. **最短的可能路径**上的节点是全黑的，**一共有n个节点**
		3. 其他可能的路径长度都在n~2n之间
	2. 所以说**没有一条路径长度能够超出其他路径长度的两倍**，也就确保了**根节点左右子树的高度比一定在1~2之间**
2. 效率：
	1. 节点数N满足 $2^{h}-1\leq N\leq 2^{2h}-1$，**最大高度为 $2\log_2{(n+1)}$**
	2. 在路径最短情况下，其进行增删查改的时间消耗为$O(\log{N})$；路径最长情况下，进行查找的时间消耗为$O(2\log{N})$,因此**红黑树增删查改的时间复杂度为$O(\log{N})$**
### 3. 操作
#### 1. 插入操作
1. 首先按照二叉搜索树的插入规则确定插入节点的位置
2. 插入新节点，并确定新节点的颜色
	- 如果新插入的节点是**根节点（树为空）** 一定为**黑色**。并且此时整个结构已经满足红黑树性质，插入完成
	- 若插入**黑色节点，一定**违反红黑树规则（所插入路径肯定较其他路径黑色结点数多一），而插入**红色节点，可能**违反红黑树规则（有连续两个红色结点）
	- 我们**退而求其次，将新节点（除根节点外）设置为红色**
3. 为保持红黑树的性质，需要对原有树结构进行**平衡调整**
	-  如果将**新节点插入在红色节点的下方**，不满足红黑树约束条件，就需要进行平衡调整，分为**仅变色**和**旋转+变色**两种
	- 当**uncle为红**时，仅需变色：
		- 当uncle为红时，仅需变色：将parent和uncle变黑，grandfather变红。然后将grandfather作为新的cur，找到新的parent和uncle，继续判断、调整，直到遇到根节点或无连续红色节点
		- ![Pasted image 20250916150447](/blog/obsidian-assets/pasted-image-20250916150447-f2070e147a.png)
	- 当**uncle不存在或为黑**，需旋转+变色
		- **uncle不存在**
			- **cur一定是新增节点**：若cur不是新增节点，则其**必然是向上调整时标记的节点**，那么**一定发生了变色**，cur原先是黑色，则从根节点到uncle（NULL）位置的路径上的黑色节点数一定少于路径A，**两条路径黑色节点数量不一致**，不满足红黑树性质
			- ![Pasted image 20250916151303](/blog/obsidian-assets/pasted-image-20250916151303-251f9e7623.png)如果只是改变parent和grandfather的颜色，并不能解决问题：变色之后路径4->2->1->NULL上有1个黑色节点，而路径4->NULL上没有黑色节点，不满足红黑树性质
			- 根据三个节点的相对位置，需要我们分情况进行单旋或双旋，从而调整树的结构
				- 旋转的**本质**：让红黑变得不平衡，可以只变一边的子树
				- **单旋+变色**：以grandfather为旋转点，进行右/左单旋，然后将parent变黑，grandfather变红，整个结构满足红黑树性质，**并且该部分的根已经变成黑色，无需继续向上调整，插入结束**![Pasted image 20250916151504](/blog/obsidian-assets/pasted-image-20250916151504-9ba751c7f8.png)
				- **双旋+变色：双旋完成后，将cur变黑，grandfather变红**，整个结构满足红黑树，**并且该部分的根已经变成黑色，无需继续向上调整，插入结束**![Pasted image 20250916151709](/blog/obsidian-assets/pasted-image-20250916151709-f7a89ee89a.png)
		- **uncle为黑时**
			- **cur一定是向上调整时标记的节点**：uncle为黑，则从根节点到uncle的路径B上至少有两个黑色节点。如果cur是新增节点，那么从根节点到cur的路径上的黑色节点数一定少于路径B，**两条路径黑色节点数量不一致，不满足红黑树性质**（与不存在uncle刚好相反）
			- **a、b、c、d、e**分别表示相应黑色节点数量的子树![Pasted image 20250916152448](/blog/obsidian-assets/pasted-image-20250916152448-fed05128f7.png)
4. 总体操作：旋转次数**最多 2 次**
	![Pasted image 20250916153037](/blog/obsidian-assets/pasted-image-20250916153037-95ba11a35c.png)
	==口诀：插入看叔叔——红沉递归；无新转变；黑旧转变==
#### 2. 查找
与传统查找相同
#### 3. 检查红黑树是否合法
1. 检查根节点是否为黑色
2. 当一个节点为红色时，判断其父亲是否是黑色
3. 检查各个路径上的黑色节点数是否相等（可以先遍历一条路径（可以选择走最左路径，避免递归），记录路径上的黑色节点个数，然后再判断其他所有路径上的黑色节点个数是否与之一致）
#### 4. 删除
- 步骤：对于待删除的节点 $n$
	- **有两个子节点**，则**交换** $n$ 和左子树中最大节点 $s$ 的数据，并将 $n$ 设为 $s$。此时 $n$ 不可能有两个子节点
	- **有一个子节点** $s$，由性质 5 可知 **$s$ 必为红色**，再由性质 4 可知 **$n$ 必为黑色**。所以只需将 $n$ 在父节点 $p$ 中对应的指针替换为 $s$ 的地址，以及将 $s$ 的父节点指针替换为 $p$ 的地址，之后再将 $s$ 染黑即可
	- **没有子节点**，若 $n$ 是**根节点**或 $n$ 是**红色节点**，则**直接删除**即可，若为**黑色**会违反性质 4，需要**维护平衡性**
- 平衡维护：$n$为黑色结点(如果第一次进入递归，为NUL节点)，设父节点为$p$，兄弟结点为$s$，侄子结点为$c$和$d$，删除的维护也是从 $s$ 开始**向上递归维护**，若 $s$ 是根或 $s$ 为红色即可终止
	- 情况一: $s$ 为红色
		此时我们旋转 $p$，**左旋**将 $s$ 转为子树根节点，之后交换 $s$ 和 $p$ 的颜色来转为其余三种情况之一
		- 编写代码时用`if`预处理
		- 此时p为红色，不可能在情况2中在进行递归
		![rbtree-remove-case1](/blog/obsidian-assets/rbtree-remove-case1-abca5a1e74.svg)
	- 情况二：$p$ 的颜色不确定，$s$、$c$、$d$ 均为黑色
		此时只需将 $s$ 染红即可，如果$p$为**黑色**，继续**递归**，如果**为红色**，退出循环后**染黑**即可(**无旋转**，只染色并向上传递状态)
		![rbtree-remove-case2](/blog/obsidian-assets/rbtree-remove-case2-1da928299b.svg)
	- 情况三：$p$ 的颜色不确定，$s$、$d$ 均为黑色，$c$ 为红色
		此时需要旋转 $s$ 使 $c$ 为原来 $s$ 对应子树的根节点，并交换 $s$ 和 $c$ 的颜色转为第四种情况即可
		![rbtree-remove-case3](/blog/obsidian-assets/rbtree-remove-case3-d0364beec8.svg)
	- 情况四：$p$、$c$ 的颜色不确定，$s$ 为黑色，$d$ 为红色（$c$ 为红色也包括在这种情况中）
		此时需要旋转 $p$ 使 $s$ 为子树的根节点，交换 $s$ 和 $p$ 的颜色，并将 $d$ 染黑即可终止维护平衡
		![rbtree-remove-case4](/blog/obsidian-assets/rbtree-remove-case4-1f1000737e.svg)
- **删除次数最多3次**，情况1->情况3->情况4
- ==口诀：删除看右树谁红——头转红沉变其他；无则染根或递归；左转为右；右则转+染+换==
### 4. 均摊分析
1. 红黑树的结构修改包含 4 类：**插入节点、删除节点、旋转、颜色变化**
	- 单次插入 / 删除的 `FIXUP` 过程，**旋转次数是 $O(1)$**，但**颜色变化次数最坏是 $\Omega(\lg n)$**（树高）
	- 要证明总结构修改是 $O(m)$，必须用**分摊分析（Amortized Analysis）**—— 用**势能函数**将单次的高代价 “分摊” 到多次操作中，最终得到常数级的分摊代价
2. 单次操作触发 $\Omega(\lg n)$ 颜色变化的场景
	1. **插入场景**
		- 初始树：**高度为 $\lg n$ 的完全二叉树，底层所有节点为红色**（满足红黑树性质：红节点父为黑）
		- 插入操作：在底层新增一个红色节点，触发 `RB-INSERT-FIXUP` 的 **Case 1**（父红、叔红）
		- 颜色变化：Case 1 会将父、叔变黑，祖父变红，然后循环向上检查祖父节点。这个过程会沿着树高走 $\lg n$ 层，因此产生 $\Omega(\lg n)$ 次颜色变化
	2. **删除场景**
		- 初始树：**高度为 $\lg n$ 的完全二叉树，所有节点为黑色**（满足红黑树性质）
		- 删除操作：删除一个叶子节点，触发 `RB-DELETE-FIXUP` 的 **Case 2**（兄弟是黑，且兄弟的子都是黑）
		- 颜色变化：Case 2 会将兄弟染红，然后循环向上检查父节点。这个过程会沿着树高走 $\lg n$ 层，因此产生 $\Omega(\lg n)$ 次颜色变化
3. **势能函数定义**：
	- 插入分析时：$Φ(T)$为红黑树 T 中红色节点数
	- 插入 + 删除分析时：$w(x) = \begin{cases} 0 & x为红色, \\ 1 & x为黑色且无红色子节点, \\ 0 & x为黑色且有一个红色子节点, \\ 2 & x为黑色且有两个红色子节点 \end{cases}$，$Φ(T) = \sum_{x \in T} w(x)$
4. 通过情景分析，发现该势能函数可行
# 第八章 堆
- 数据结构的“堆”与内存管理的“堆”
	两者不是同一个概念。计算机系统内存中的堆是动态内存分配的一部分，程序在运行时可以使用它来存储数据。程序可以请求一定量的堆内存，用于存储如对象和数组等复杂结构。当这些数据不再需要时，程序需要释放这些内存，以防止内存泄漏。相较于栈内存，堆内存的管理和使用需要更谨慎，使用不当可能会导致内存泄漏和野指针等问题。
## 一、二叉堆
二叉堆（heap）是一种满足特定条件的完全二叉树
- 小顶堆（min heap）：任意节点的值 ≤ 其子节点的值
- 大顶堆（max heap）：任意节点的值 ≥ 其子节点的值
- 与BST区别：左右子节点无要求
**特性**：
- 最底层节点靠左填充，其他层的节点都被填满
- 我们将二叉树的根节点称为“堆顶”，将底层最靠右的节点称为“堆底”
- 对于大顶堆（小顶堆），堆顶元素（根节点）的值最大（最小）
### 1. 常用操作
| 方法名         | 描述                          | 时间复杂度        |
| ----------- | --------------------------- | ------------ |
| `push()`    | 元素入堆                        | $O(\log n)$ |
| `pop()`     | 堆顶元素出堆                      | $O(\log n)$ |
| `peek()`    | 访问堆顶元素（对于大 / 小顶堆分别为最大 / 小值） | $O(1)$       |
| `size()`    | 获取堆的元素数量                    | $O(1)$       |
| `isEmpty()` | 判断堆是否为空                     | $O(1)$       |
### 2. 二叉堆的实现
#### 1. 二叉堆的存储与表示
+ 使用数组实现，元素代表节点值，索引代表节点在二叉树中的位置,**节点指针通过索引映射公式来实现**
[heap by array（外部图片）](https://www.hello-algo.com/chapter_heap/heap.assets/representation_of_heap.png)
#### 2. 访问堆顶元素
+ 即列表首元素
#### 3. 元素入堆
+ **堆化（heapify）**：给定元素添加到堆底，添加之后需要修复从插入节点到根节点的路径上的各个节点，比较插入节点与其父节点的值，如果插入节点更大则交换。
+ **时间复杂度为**$O(\log n)$
#### 4. 堆顶元素出堆(DeleteMin/DeleteMax)
+ 如果直接删除首元素，那么二叉树中所有节点的索引都会变化，使得难以堆化，为了尽量减少元素索引的变动，采用以下操作步骤：
	1. 交换堆顶元素与堆底元素（交换根节点与最右叶节点）
	2. 交换完成后，将堆底从列表中删除（注意，由于已经交换，因此实际上删除的是原来的堆顶元素）
	3. 从根节点开始，**从顶至底执行堆化**
+ 从顶至底堆化：将根节点的值与其两个子节点的值进行比较，将最大的子节点与根节点交换。然后循环执行此操作，直到越过叶节点或遇到无须交换的节点时结束
+ **时间复杂度为**$O(\log n)$
#### 5. 其他操作（小顶堆为例）
1. DecreaseKey(P,$\Delta$,H)（**降低**关键字的值）
	- 降低在P处的关键字的值，量为$\Delta >0$
	- 通过**上滤**对堆调整
	- 让系统管理程序使得程序以最高的优先级运行
2. IncreaseKey(P,$\Delta$,H)（**增加**关键字的值）
	- 增加在P处的关键字的值，量为$\Delta >0$
	- 通过**下滤**对堆调整
	- 让调度程序降低CPU占用过多程序的优先级
3. Delete（删除）
	- 先执行DecreaseKey($P,\infty,H$)，再执行DeleteMin(H)
### 3. 堆的常见应用

- **优先队列**：堆通常作为实现优先队列的首选数据结构，其入队和出队操作的时间复杂度均为 $O(\log n)$ ，而建堆操作为 $O(n)$ ，这些操作都非常高效。
- **堆排序**：给定一组数据，我们可以用它们建立一个堆，然后不断地执行元素出堆操作，从而得到有序数据。然而通常会使用一种更优雅的方式实现堆排序，详见“堆排序”章节。
- **获取最大的 k 个元素**：[Top-k 问题](/blog/notes/courses/course-data-structures-algorithms/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-hello-%E7%AE%97%E6%B3%95)
## 二、建堆操作
### 1. 借助入堆操作实现
+ 首先创建一个空堆，然后遍历列表，依次对每个元素执行“入堆操作”，即先将元素添加至堆的尾部，再对该元素执行“从底至顶”堆化。
+ **时间复杂度**为$O(n\log n)$
### 2. 通过遍历堆化实现
1. 步骤
	- 将列表所有元素原封不动地添加到堆中，此时堆的性质尚未得到满足
	- **倒序遍历**堆（层序遍历的倒序），依次对每个非叶节点执行“**从顶至底堆化**”
2. **倒序遍历**：保证当前节点之下的子树已经是合法的子堆，这样堆化当前节点才是有效的
3. 每当堆化一个节点后，以该节点为根节点的子树就形成一个合法的子堆
4. **叶节点**没有子节点，因此它们天然就是合法的子堆，**无须堆化**
5. 代码：
	```c
	/* 构造函数，根据切片建堆 */
	MaxHeap *newMaxHeap(int nums[], int size) {
		// 所有元素入堆
		MaxHeap *maxHeap = (MaxHeap *)malloc(sizeof(MaxHeap));
		maxHeap->size = size;
		memcpy(maxHeap->data, nums, size * sizeof(int));
		for (int i = parent(maxHeap, size - 1); i >= 0; i--) {
			// 堆化除叶节点以外的其他所有节点
			siftDown(maxHeap, i);
		}
		return maxHeap;
	}
	```
### 3. 复杂度分析
- 结论：**时间复杂度为 $O(n)$**
- 推导：
	**所有节点的堆化迭代次数的总和**
	$T(h)=2^0h+2^1(h−1)+2^2(h−2)+⋯+2^{(h−1)}×1$
	$2T(h)=2^1h+2^2(h−1)+2^3(h−2)+⋯+2^h×1$
	$2T(h)−T(h)=T(h)=−2^0h+2^1+2^2+⋯+2^{h−1}+2^h$
	$T(h)=2\frac{1−2h}{1−2}−h=2^{h+1}−h−2=O(2^h)$
	$n=2^{h+1}−1$
	易得复杂度为 $O(2^h)=O(n)$，比较上界为$2n-\log_2 (n+1)$
## 三、Top-k 问题
### 1. 遍历选择
分别在每轮中提取第 1、2、…、k 大的元素，时间复杂度趋向于 $O(n^2)$
### 2. 排序
先排序，取前k个，时间复杂度$O(\log n)$
### 3. 堆
1. 初始化一个小顶堆
2. 先**将数组的前 k 个元素依次入堆**
3. 从第 k+1 个元素开始，若当前元素大于堆顶元素，则将堆顶元素出堆，并将当前元素入堆
4. 遍历完成后，堆中保存的就是最大的 k 个元素
5. **时间复杂度**为 $O(n\logk)$,当 k 较大时，时间复杂度不会超过 $O(n\logn)$
## 四、d-堆（d-heap）
### 1. 定义
- 每个节点都有**d个孩子**
- 二叉堆为特殊的d-堆，即为2-堆
- **父子关系**：在d-堆中，如果一个节点的下标是i，那么它的第j个子节点的下标为$d*(i-1)+2+j$，父节点的下标为$(i-2+d)/d$
- **完全d叉树**：d-堆是一棵完全d叉树，即所有节点都必须有d个子节点，除了最后一排元素从左向右填入，直到没有元素为止
### 2.优缺点
- **插入操作较快**，向上堆化，由于子节点多，深度浅，时间复杂度为$O(\log_d n)$
- **删除操作较慢**，需要在d个子节点中找到最小的一个，进行d-1次比较
- 无法进行find操作，而且**难以**将两个堆**合并**为一个堆
- **寻找节点的父节点、子节点的时候，乘法和除法都有因子d**。如果d是一个2的幂，则可以通过使用二进制的**移位**操作计算，在计算机中省时间。但是若d不是2的幂，则使用一般的乘除法计算，时间开销会急剧增加，实践证明4-堆在操作中优于2-堆
## 五、左式堆（liftist heap)
### 1. 定义
- 又称左偏堆、左偏树（liftist heap）
- 有效支持**合并操作**，以 $O(\log n)$ 时间进行 Merge 操作
- 是一颗**很不平衡的二叉树**，左偏性质体现在**左儿子的距离大于等于右儿子的距离**
- **外结点**：**只有一个儿子**或**没有儿子**的节点，即左右儿子至少有一个为空节点的节点
- **距离/零路径长** `null path length` ：`npl(X)` 定义为 `X` 结点到它的后代中**离它最近的外结点**的**最短路径长度**，即两结点之间路径的权值和。特别的，外结点的距离为 `0` ，空结点的距离为 `npl(NULL) = -1`
- 左式堆的距离：我们将一棵左偏树**根结点的距离**作为该树的距离
- 当按顺序将键 $1$ 到$2^k - 1$（对于$k > 4$）插入到初始为空的斜堆中时，结果**始终是一棵满二叉树**，新插入的键始终是当前最大的，因此在每次合并中都会成为副堆，合并操作会反复将最大的新键与当前根节点的**右子树**合并，之后交换左右子树，这个过程会迫使树**对称生长**（**左式堆和斜堆都为满二叉树**）
- 对**左式堆和斜堆**进行**相同的操作**，**不一定**哪种更平衡
- 实现
	```c
	struct LeftistHeap
	{
	    Object data;
	    LeftistHeap* leftChild;
	    LeftishHeap* rightChild;
	    int npl;
	}
	```
### 2. 性质
- 满足堆的基本性质：左式堆的定义**是递归的**，非空左式堆需满足**左子树和右子树均为左式堆**
- 对于任意结点，**左儿子的距离大于等于右儿子的距离**
- 对于任意结点，**其距离等于它右儿子的距离（即为诸儿子节点的最小值）$+1$**
- 距离为 $d$ 的左式堆，其结点数必然不小于 $2^{d + 1} - 1$个结点
- 对于一个有 $n$ 个结点的左式堆，其根结点的距离不超过 $\log n$
### 3. 合并操作 Merge
1. `merge`是左式堆的**基本操作**，左式堆的插入、删除最小元素均依赖合并
	1. `insert`**插入**可以看成是一个单节点的堆与一个大堆的`merge`，一般直接使用**迭代版**合并
	2. `deleteMin`**删除最小值**操作可以看成是首先返回、删除根节点，然后将根节点的左右子树进行`merge`
2. 在合并两个具有不同NPL的左偏堆 H1 和 H2 后，所得到的左偏堆的$NPL(H)$应有 $NPL(H)=max\{NPL(H1),NPL(H2)\}+1$
3. **递归**版合并：
	1. 选择**元素更小的堆**作为主堆
	2. 将H1和H2中根节点较大的堆（比如是H2）与根节点较小的堆（比如是H1）的**右子堆**进行merge
	3. 让新的merge的堆成为根节点较小的堆（H1）的右字堆
	4. 如果在根结点处出现左右子堆不符合左式堆的条件的情况，互换左右子堆的位置并更新npl的值
	- ![Pasted image 20250326110853](/blog/obsidian-assets/pasted-image-20250326110853-dc8cc3d5b6.png)
4. **迭代**版合并:
	1. 不改变左孩子，仅对两个堆的**右路径节点按元素大小排序**，排序后直接连链（可视作每个从根节点到最右结点上的每个向右路径都被切片）
	2. **自底向上遍历**排序后的右路径，必要时**交换**节点的左右孩子
5.  代码实现
	```python
	# 递归合并
	def merge(h1, h2):
	    if h1 is None: return h2
	    if h2 is None: return h1

	    # 确保h1是根值较小的堆
	    if h1.val > h2.val:
	        h1, h2 = h2, h1

	    # 递归合并h1的右子树和h2
	    h1.right = merge(h1.right, h2)

	    # 维护左偏性质
	    if npl(h1.left) < npl(h1.right):
	        h1.left, h1.right = h1.right, h1.left

	    # 更新npl
	    h1.npl = min(npl(h1.left), npl(h1.right)) + 1

	    return h1

	# 非递归合并
	def merge(h1, h2):
	    # 处理空堆：直接返回非空堆
	    if h1 is None:
	        return h2
	    if h2 is None:
	        return h1

	    # 步骤1：收集h1和h2的右路径节点（左式堆合并仅需操作右路径，左孩子保持原始结构）
	    def collect_right_path(heap):
	        path = []
	        current = heap
	        while current is not None:
	            path.append(current)
	            current = current.right  # 仅沿右路径遍历，左孩子暂不改动
	        return path

	    path1 = collect_right_path(h1)
	    path2 = collect_right_path(h2)

	    # 步骤2：合并右路径节点，按节点值升序排序（保证最小堆的顺序属性）
	    sorted_nodes = sorted(path1 + path2, key=lambda node: node.val)

	    # 步骤3：重构右路径（将排序后的节点依次连成右链）
	    for i in range(len(sorted_nodes) - 1):
	        sorted_nodes[i].right = sorted_nodes[i + 1]
	    sorted_nodes[-1].right = None  # 最后一个节点右孩子设为None，避免循环

	    # 步骤4：维护左偏性质与Npl（从后往前处理，子节点先更新，父节点再依赖子节点计算）
	    for i in range(len(sorted_nodes) - 2, -1, -1):
	        current = sorted_nodes[i]
	        # 检查左偏性质：若左孩子Npl < 右孩子Npl，交换左右孩子
	        if npl(current.left) < npl(current.right):
	            current.left, current.right = current.right, current.left
	        # 更新当前节点的Npl：min(左右孩子Npl) + 1
	        current.npl = min(npl(current.left), npl(current.right)) + 1

	    # 排序后第一个节点为新堆根（值最小，符合最小堆顺序属性）
	    return sorted_nodes[0]

	# 辅助函数：计算节点的空路径长度（Npl）
	def npl(node):
	    return -1 if node is None else node.npl
	```
### 4. 时间复杂度
1. 右路径长度级别为$O(\log n)$，可以从迭代方法容易看出长度即为合并操作次数，而所有操作可以视为合并的特化
	- 设最右侧路径的长度为d，左式堆中一定包含了以d为高度的一棵满子树，因此左式堆的全部节点数量（包括外部节点）$n$一定满足$n \ge 2^{d + 1} - 1$,即$d$一定满足$d \le log_2^{n + 1} = O(\log n)$，故右路径长度级别为$O(\log n)$
2. 所有操作（合并、插入、删除最小元素）的时间复杂度均为$O(\log n)$
## 六、**斜堆**（skew heap）
### 1. 概念
1. 斜堆是具有堆序的二叉树，但是不存在对树的结构的限制。不同于左式堆，关于任意结点的npl的任何信息都不保留
2. 当按顺序将键 $1$ 到$2^k - 1$（对于$k > 4$）插入到初始为空的斜堆中时，结果**始终是一棵满二叉树**，新插入的键始终是当前最大的，因此在每次合并中都会成为副堆，合并操作会反复将最大的新键与当前根节点的**右子树**合并，之后交换左右子树，这个过程会迫使树**对称生长**
3. 辨析
	- 斜堆的**左右路径**都可以是**任意长度**的
	- 斜堆**不一定**有左式堆**平衡**，相反也不一定
	- 斜堆**总是比左式堆空间高效**，**左偏堆的每个节点需额外存储NPL**，增加了空间开销，斜堆无需任何额外存储字段，仅需节点的左右子树指针，空间开销始终小于或等于左偏堆
	- 偏斜堆具有这样的优势：**无需额外空间**来保存路径长度，也**无需进行任何测试来确定何时交换**子节点
	- 如何精确确定左偏堆和倾斜堆的**预期最短路径长度**，仍是一个**未解决**的问题
### 2. 复杂度
1. 所有操作的**最坏情形运行时间**均为$O(N)$。然而，正如伸展树一样，可以证明对任意M次连续操作，总的最坏情形运行时间是 $O(M\log N)$。因此，斜堆每次操作的**摊还开销**（amortized cost）为$O(\log N)$
2. 摊还分析
	注：**节点后裔descendants**数量包括该节点本身
	1. 重节点与轻节点：
		- **重节点**：节点p的右子树后代数 $\geq$ 自身后代数的一半（**后代数含自身**）
		- **轻节点**：节点p的右子树后代数 $\textless$ 自身后代数的一半
		- **推论**：对于斜堆，**若其右路径上有 $l$ 个轻节点，则整个斜堆至少有 $2^l - 1$ 个节点**
			- 推导：若右路径有 $l$ 个轻节点，$0$个重节点，此时可能的节点数最少，并且每个轻节点的右子树规模小于自身后代的一半，**递归**可得总节点数的下界为 $2^l - 1$
	2. 设势函数 $\Phi(H_i)$ 为堆 $H_i$ 中**重节点的个数**，有$H_i=l_i+h_i$
	3. 合并 $H_1$ 和 $H_2$ 时，所有操作仅发生在两堆的右路径上。设：
		-  $l_1$, $l_2$ ： $H_1$, $H_2$ 右路径上的轻节点数
		-  $h_1$, $h_2$ ： $H_1$, $H_2$ 右路径上的重节点数
		则真实操作代价为$T_{worst} = l_1 + l_2 + h_1 + h_2$
	4. 摊还代价 $T_{amortized} = T_{worst} + \Phi(H_3) - \left( \Phi(H_1) + \Phi(H_2) \right)$
	5. $\Phi(H_1) + \Phi(H_2) = h_1 + h_2 + h$ （ $h$ 是不在右路径上的重节点数，合并时这些节点状态不变）
	6. 合并后，仅 $H_1$, $H_2$ **右路径上的节点会改变轻重状态**，且：
		- 右路径上的**重节点**会因**交换左右子树**等操作**变为轻节点**（由于后代数含自身，因此右子树$\geq \frac{1}{2}$，左子树一定$\textless \frac{1}{2}$）
		- 右路径上的**轻节点不一定变为重节点**（由于后代数含自身，**可能左右子树都$\textless \frac{1}{2}$**）
		因此，新堆的重节点数满足：$\Phi(H_3) \leq h + l_1 + l_2$
	7. 将 $T_{worst}$ 和势的变化代入公式：$T_{amortized} = (l_1 + l_2 + h_1 + h_2) + \left( h + l_1 + l_2 \right) - \left( h_1 + h_2 + h \right) = 2(l_1 + l_2)$
	8. 结合引理中 $l_1$, $l_2$ = $O(\log n)$ 的结论，可得：$T_{amortized} = O(\log n)$
	9. 实际紧界为$O(3\lfloor \log n\rfloor+1)$
### 3. 操作
1. **合并**：和左式堆的合并相同，但是不需要对不满足左右子堆的左式堆条件的节点进行左右子堆的交换。斜堆的交换是**无条件**的，除了**右路径上最大节点不交换**（即最右的节点）
	```python
	def merge(h1, h2):
	    # 如果其中一个堆为空，直接返回另一个堆
	    if h1 is None:
	        return h2
	    if h2 is None:
	        return h1

	    # 确保h1是根值较小的堆
	    if h1.val > h2.val:
	        h1, h2 = h2, h1

	    # 递归合并h1的右子树和h2
	    h1.right = merge(h1.right, h2)

	    # 斜堆的关键操作：交换左右子树
	    h1.left, h1.right = h1.right, h1.left

	    return h1
	```
2. **插入**/**删除最小元素**：与左偏堆一致，均视为特殊合并，即插入等价于单个节点堆合并，删除等价于删根后合并左右子堆
## 七、二项队列 Binomial Queues
- 辨析：To implement a binomial queue, which is true?
	- The roots of binomial trees are stored in a **linked list**
		**False** 存储在数组而非链表中
	- Left-child-next-sibling structure is used to represent each binomial tree
		**True** 采用左子右兄弟表示法
	- The subtrees of a binomial tree are linked in **increasing sizes**
		**False** **队列**层面树的整体**高度（大小）递增**，**单树**层面子树**大小递减**，二项树的合并规则是将 $B_{k-1}$ 作为左子树接入另一棵 $B_{k-1}$ 的根，后合并的子树更大，因此为从大到小排列
### 1. 定义
1. 二项队列是**堆序二项树的集合**，即**森林**，森林中二项树的大小递增，而非二项树的子树大小递增
2. 左式堆和斜堆的摊还插入时间为$O(\log N)$，但插入N个元素到空堆的时间为$O(N)$，平均插入时间为$O(1)$，因此还不够好，二项队列在保持**摊还合并时间不变**的条件下，**优化摊还插入时间**为$O(1)$
3. 每一棵都是有约束的**二项树**（binomial tree）:
	1. **每一个高度上至多存在一棵二项树**。高度为$0$的二项树是一棵单节点树，高度为$k$的二项树$B_k$通过将一棵二项树$B_{k-1}$附接到另一棵二项树$B_{k-1}$的根上而构成的。如下图的二项树$B_0、B_1、B_2、B_3$和$B_4$
	2. 类似二进制，如$13=(1101)_2$，可以用$B_3,B_2,B_0$表示
	3. 高度为$k$的二项树恰好有$2^k$个节点，而在深度$d$处的节点数为**二项系数$C{d \atop k}$**
		1. **直观理解**：从$B_k$的根到深度 d 的任意一个节点，必须经过**d 次向下移动**，每一次移动本质是**选择来自原树还是新子树**，对于深度 d 的节点必须满足：在这 **k 次合并中**，恰好有**d 次选择了继承新子树的节点**，即组合数的定义$C{d \atop k}$
		2. **数学证明**：递推公式$d(k,d)=d(k,d-1)+d(k-1,d-1)$，恰好匹配二项系数的递推公式$\binom{k}{d} = \binom{k-1}{d} + \binom{k-1}{d-1}$
	4. **满足堆序性质**：父节点值≤子节点值（**最小堆**）**或**父节点值≥子节点值（**最大堆**）
	5. **奇偶深度节点关系**： $k \geq 1$ 时，$B_k$ 中偶数深度节点数 $N_1'$ 与奇数深度节点数 $N_2'$ 相等，如 $B_1$：1 个偶深度节点、1 个奇深度节点；$B_2$：2 个偶深度节点、2 个奇深度节点，仅 $B_0$ 的 $N_1'=1$、$N_2'=0$，因为 $B_k$ 是由两个 $B_{k-1}$ 合并而成，**合并后深度的奇偶性会对称分布**
	6. ![Pasted image 20250327102143](/blog/obsidian-assets/pasted-image-20250327102143-d9c7532ea0.png)
4. 结构表示
	- **数组** `TheTrees` 的下标对应二项树的高度， `TheTrees[i]` 指向高度为i的二项树根节点（若不存在则为NULL）
	- 二项树为**左子右兄弟**表示
	- ![Pasted image 20250327104759](/blog/obsidian-assets/pasted-image-20250327104759-2f5d2ff58a.png)
	```c
	// 二项树节点结构（儿子-兄弟表示法）
	struct BinomialNode {
	    ElementType Element;          // 节点元素
	    struct BinomialNode *Left;    // 指向第一个孩子节点
	    struct BinomialNode *NextSibling; // 指向右兄弟节点
	};

	// 二项队列结构
	struct BinomialQueue {
	    int CurrentSize;              // 队列总节点数
	    struct BinomialNode *TheTrees[MAX_TREES]; // 按高度存储二项树根节点
	};
	```
### 2. 复杂度
- 支持 `merge`、`insert` 和 `deleteMin` 三种操作，并且每次操作的最坏情形运行时间为$O(\log N)$，插入操作平均花费$O(1)$
### 3. 操作
![Pasted image 20250327104125](/blog/obsidian-assets/pasted-image-20250327104125-20e3e4d72e.png)
1. **寻找最小值**：最小值为某一个根节点的值，最多$\lceil \log n \rceil$个根节点，因此**时间复杂度为$O(\log n)$**
	- 时间复杂度：
		- **常规**：森林中至多$⌈log N⌉$个根节点，故为$O(\log N)$
		- **优化**：记录最小值并实时更新，可实现$O(1)$
2. **合并**
	1. **时间复杂度**$O(\log n)$
		- 需处理所有高度的树，最多$log N$个高度
		- 必须将树**按照高度**在二叉堆中进行排序 Must keep the trees in the binomial queue sorted **by height**.
	2. 合并两个二项队列Q₁和Q₂，最终得到不含相同高度二项树的新队列，步骤如下：
		1. **初始化**：定义临时变量 `Carry` 存储合并产生的“**进位**”二项树（初始为NULL）
		2. **按高度遍历**：从高度0开始，依次处理两队列中对应高度的二项树T₁、T₂及 Carry ，分8种情况处理（基于三者的空/非空状态）：
			- 若仅**一颗树**非空：**直接存入**新队列对应位置
			- 若有**两棵树**非空：**合并**两者为高度+1的二项树，存入 Carry （**进位**）
			- 若**三棵树**均非空：**合并（默认$T_1$和$T_2$）产生新的进位树，原位置存入另一棵树**
	3. **合并二项树的细节**：比较两棵树的根节点值，**将值较大的树根作为值较小树根的左孩子**，同时调整**较大树根**的**兄弟指针**，指向**原先**较小树根的**左孩子**
	3. 合并树代码
		```c
		BinTree CombineTree(BinTree T1,BinTree T2)
		{
			if(T1->Element>T2->Element)
				return CombineTree(T2,T1);
			T2->Sibling = T1->LeftChild;
			T1->LeftChild = T2;
			return T1;
		}
		```
	- ![Pasted image 20250327111433](/blog/obsidian-assets/pasted-image-20250327111433-73cb63d081.png)
	- 合并两个二项队列代码：**合并H1，H2到H1中**
		```c
		BinQueue Merge(BinQueue H1, BinQueue H2)
		{
			BinTree T1, T2, Carry = NULL //进位;
			int i,j;
			// CurrentSize为十进制
			if(H1->CurrentSize+H2->CurrentSize>Capacity)
				Error("Exceed the Capacity");
			H1->CurrentSize = H1->CurrentSize + H2->CurrentSize;
			// j*=2,寻找CurrentSize二进制下最大位
			for(i=0,j=1;j<H1->CurrentSize;i++,j*=2)
			{
				T1 = H1->TheTrees[i];
				T2 = H2->TheTrees[i];
				switch(!!T1+2*!!T2+4*!!Carry) // 二进制表示 000 -> 111
				{
					case 0: //No Trees 000
					case 1: //Only T1 001
						break;
					case 2: //Only T2 010
						H1->TheTrees[i] = T2;
						H2->TheTrees[i] = NULL;
						break;
					case 4: //Only Carry 100
						H1->TheTrees[i] = Carry;
						Carry = NULL;
						break;
					case 3: //T1,T2 011
						Carry = CombineTree(T1,T2);
						H1->TheTrees[i] = H2->TheTrees[i] = NULL;
						break;
					case 5: //Carry,T1 101
						Carry = CombineTree(T1,Carry);
						H1->TheTrees[i] = NULL;
						break;
					case 6: //Carry,T2 110
						Carry = CombineTree(T2,Carry);
						H2->TheTrees[i] = NULL;
						break;
					case 7: //Carry,T1,T2，存入当前 Carry，合并 T1 和 T2 为新进位 111
						H1->TheTrees[i] = Carry;
						Carry = CombineTree(T1,T2);
						H2->TheTrees[i] = NULL;
						break;
				}
			}
			return H1;
		}
		```
3. **删除最小值**
	1. 步骤
		1. **查找最小根**：遍历队列的二项树根节点，找到值最小的根节点，记为该树Bₖ的根。
		2. **拆分队列**：从原队列中移除Bₖ，得到剩余二项树组成的队列H₁
		3. **处理子树**：删除Bₖ的根节点，将其孩子节点（Bₖ₋₁、Bₖ₋₂、…、B₀）组成新的二项队列H₂
		4. **合并队列**：合并H₁与H₂，得到删除最小元素后的新队列
	2. **时间复杂度**：$O(\log N)$ 查找、拆分子树、合并均为$O(\log N)$
	3. 代码实现
		```c
		ElementType DeleteMin(BinQueue H) {
		    int i, j;
		    int MinTree = 0;
		    BinQueue DeletedQueue;
		    Position DeletedTree, OldRoot;
		    ElementType MinItem = Infinity; // 初始化最小值
		    if (IsEmpty(H)) {
		        Error("Empty BinQueue!!");
		        return -Infinity;
		    }

		    // 查找最小值所在的二项树
		    for (i = 0; i < MaxTree; i++) {
		        if (H->TheTrees[i] && H->TheTrees[i]->Element < MinItem) {
		            MinItem = H->TheTrees[i]->Element;
		            MinTree = i;
		        }
		    }

		    // 移除最小根节点
		    OldRoot = H->TheTrees[MinTree];
		    DeletedTree = OldRoot->child; // 修正为 child 指针
		    free(OldRoot);
		    H->TheTrees[MinTree] = NULL;

		    // 构建子树队列（需反转子节点链表）
		    DeletedQueue = Initialize();
		    // 子树元素个数为2^MinTree-1,已经去掉了原来的根节点
		    DeletedQueue->CurrentSize = (1 << MinTree) - 1;

			// 以下逻辑可简化
		    // 反转子节点链表
		    Position prev = NULL, current = DeletedTree, next;
		    while (current) {
		        next = current->sibling;
		        current->sibling = prev;
		        prev = current;
		        current = next;
		    }
		    DeletedTree = prev;

		    // 将子节点按秩升序存入队列
		    for (j = 0; j < MinTree; j++) {
		        DeletedQueue->TheTrees[j] = DeletedTree;
		        DeletedTree = DeletedTree->sibling;
		        DeletedQueue->TheTrees[j]->sibling = NULL;
		    }

			// 简化版存入队列，直接正序遍历，逆序存储即可
			for ( j = MinTree – 1; j >= 0; j – – ) {
				DeletedQueue->TheTrees[j] = DeletedTree;
				DeletedTree = DeletedTree->NextSibling;
				DeletedQueue->TheTrees[j]->NextSibling = NULL;
			}

		    // 更新原队列大小并合并
		    H->CurrentSize -= DeletedQueue->CurrentSize + 1; // 即 H->CurrentSize -= (1 << MinTree)
		    Merge(H, DeletedQueue);
		    FreeQueue(DeletedQueue); // 释放临时队列结构（不释放节点）

		    return MinItem;
		}
		```
4. **插入**
	1. 本质是**单节点队列与原队列的合并**，具体逻辑：
		1. 创建**仅含待插入元素**的二项树B₀（**单节点树**），构成临时队列
		2. 合并临时队列与原二项队列，合并过程同上述合并操作
	2. **时间复杂度**
		如果最小不存在的二项树为$B_i$，那么 $T_p= \text{Const}\cdot(i + 1)$。对一个初始为空的二项队列执行 $N$ 次插入操作将需要 $O(N)$ 的最坏情况时间因此平均时间是常数
		- **单次最坏**：$O(\log N)$（需多次合并同高度树）
		- **N次插入总时间**：$O(N)$（通过聚合分析/势能分析可证），均摊时间复杂度为$O(1)$
	3. **聚合分析**（Proof 1）：利用总概率期望
		- **单次插入**的实际时间 = 1（创建$B_0$的基础操作） + $cᵢ$（第i次插入的链接次数，$cᵢ≥0$）
		- **总实际时间** = 所有插入的基础操作之和+总链接次数 = N + 总链接次数
		- 产生k次链接的概率：需连续k阶有树、第k+1阶无树，概率为  $\frac{1}{2^{k+1}}$ ，次数权重为k，因此贡献  $k \times \frac{1}{2^{k+1}}$
		- 对N次插入操作，总链接数的期望为：$N \times \sum_{k=0}^{\infty} \left( k \times \frac{1}{2^{k+1}} \right)$
		- 计算该级数的和：
			令  $S = \frac{1}{4} + \frac{2}{8} + \frac{3}{16} + \frac{4}{32} + \dots$ ，
			则  $2S = \frac{1}{2} + \frac{2}{4} + \frac{3}{8} + \frac{4}{16} + \dots$ ，
			两式相减：
			$2S - S = \frac{1}{2} + \left( \frac{2}{4} - \frac{1}{4} \right) + \left( \frac{3}{8} - \frac{2}{8} \right) + \dots = \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \dots$
			这是首项为  $\frac{1}{2}$ 、公比为  $\frac{1}{2}$  的等比级数，和为  $\frac{\frac{1}{2}}{1 - \frac{1}{2}} = 1$ ，因此  $S = 1$
			综上，总链接数为  $N \times 1 = O(N)$ ，证明了N次插入的总时间复杂度为$O(N)$
	4. **势能分析**（Proof 2）
		- 定义势能函数$Φᵢ$为第i次插入后的**树的数量**
		- 第i次插入后，树的数量变化为：$\Phi(H_i) = \Phi(H_{i-1}) + 1 - c_i$，势能变化为：$\Delta\Phi = \Phi(H_i) - \Phi(H_{i-1}) = 1 - c_i$
		- 单次插入的实际操作分为两步：
			1. 新增1棵$B₀$树：时间代价1
			2. 执行$cᵢ$次链接操作：每次链接耗时1，总代价$cᵢ$
			因此，单次插入的实际时间：$T_i = 1 + c_i$
		- 根据摊还时间定义：$\hat{T}_i = T_i + \Delta\Phi$
			将$Tᵢ=1+cᵢ$和$ΔΦ=1-cᵢ$代入：$\hat{T}_i = (1 + c_i) + (1 - c_i) = 2$
		- 单次插入的摊还时间$\hat{T_i}=2$，因此 N次插入的$T_{sum} = N × 2 = O(N)$
# 第九章 图
## 一、图
- 图（graph）是一种非线性数据结构，由**顶点**（vertex）和**边**（edge）组成。我们可以将图 G 抽象地表示为**一组顶点 V 和一组边 E 的集合**
- 示例展示了一个包含 5 个顶点和 7 条边的图。
	$V=\{1,2,3,4,5\}$
	$E=\{(1,2),(1,3),(1,5),(2,3),(2,4),(2,5),(4,5)\}$
	$G=\{V,E\}$
### 1. 图的常见类型与术语
1. 根据边**是否具有方向**，可分为**无向图（undirected graph）和有向图（directed graph）**
	- 在无向图中，边表示两顶点之间的“双向”连接关系1
	- 在有向图中，边具有方向性，即 A→B 和 A←B 两个方向的边是相互独立的
2. 根据所有顶点**是否连通**，可分为**连通图（connected graph）和非连通图（disconnected graph）**
	- 对于连通图，从某个顶点出发，可以到达其余任意顶点，对于有向图，称之为**强连通的**。
	- 对于非连通图，从某个顶点出发，**至少有一个顶点无法到达**。
	- 若有向图非强连通的，但其**基础图**（去掉边的方向）为连通图，称之为**弱连通的**
3. **完全图**：每一对顶点之间有**至少一条边**
4. 为边添加“权重”变量，从而得到**有权图（weighted graph）**
5. 常用术语:
	- **邻接（adjacency）**：当两顶点之间存在边相连时，称这两顶点“邻接”
	- **路径（path）**：从顶点 A 到顶点 B 经过的边构成的序列被称为从 A 到 B 的“路径”
	- **度（degree）**：一个顶点拥有的边数。对于**有向图，入度（in-degree）** 表示有多少条边指向该顶点，**出度（out-degree）** 表示有多少条边从该顶点指出。
	- **环(loop)**：一个顶点到自身的边，无环的路径称作简单路径
	- **圈(cycle)**：一个顶点到自身的长度至少为一的路径，简单路径成为简单圈。无向图要求
### 2. 图的表示
#### 1. 邻接矩阵(adjacency matrix)
- 使用一个 $n×n$ 大小的矩阵来表示图，每一行（列）代表一个顶点，矩阵元素代表边，用 $1$ 或 $0$ 表示两个顶点之间是否存在边
- 特性
	- 在**简单图**中，**顶点不能与自身相连**，此时邻接矩阵**主对角线元素没有意义**
	- 对于**无向图**，两个方向的边等价，此时**邻接矩阵关于主对角线对称**
	- 将邻接矩阵的元素从 1 和 0 替换为**权重**，则可表示**有权图**
- 增删查改时间复杂度均为 $O(1)$ 空间复杂度为 $O(n^2)$
#### 2. 邻接表(adjacency list)
- 使用 n 个链表来表示图，链表节点表示顶点。第 i 个链表对应顶点 i ，其中存储了该顶点的所有邻接顶点（与该顶点相连的顶点）
- 链表较长时，可以将链表转化为 AVL 树或红黑树，从而将时间效率优化至 $O(\logn)$ ；还可以把链表转换为哈希表，从而将时间复杂度降至 $O(1)$
## 二、基础操作
### 1. 基于邻接矩阵的实现
- **顶点数量为 n 的无向图**
	- **添加或删除边**：直接在邻接矩阵中修改指定的边即可，使用 $O(1)$ 时间。而由于是无向图，因此需要同时更新两个方向的边。
	- **添加顶点**：在邻接矩阵的尾部添加一行一列，并全部填 $0$ 即可，使用 $O(n)$ 时间。
	- **删除顶点**：在邻接矩阵中删除一行一列,当**删除首行首列时达到最差情况**，需要将 $(n−1)^2$ 个元素“**向左上移动**”，从而使用 $O(n^2)$ 时间
	- **初始化**：传入 n 个顶点，初始化长度为 n 的顶点列表 `vertices` ，使用 O(n) 时间；初始化 $n×n$ 大小的邻接矩阵 `adjMat` ，使用 $O(n^2)$ 时间
### 2. 基于邻接表的实现
- **顶点总数为 n、边总数为 m的无向图**
	- **添加边**：在顶点对应链表的末尾添加边即可，使用 $O(1)$ 时间。因为是无向图，所以需要同时添加两个方向的边
	- **删除边**：在顶点对应链表中查找并删除指定边，使用 $O(m)$ 时间。在无向图中，需要同时删除两个方向的边
	- **添加顶点**：在邻接表中添加一个链表，并将新增顶点作为链表头节点，使用 $O(1)$ 时间
	- **删除顶点**：需遍历整个邻接表，删除包含指定顶点的所有边，使用 $O(n+m)$ 时间
	- **初始化**：在邻接表中创建 $n$ 个顶点和 $2m$ 条边，使用 $O(n+m)$ 时间
- 实现
	- 为了方便添加与删除顶点，以及简化代码，我们使用**列表（动态数组）来代替链表**
	- 使用**哈希表来存储邻接表**，`key` 为顶点实例，`value` 为该顶点的邻接顶点列表（链表）
### 3. 效率对比


|        | 邻接矩阵     | 邻接表（链表）  | 邻接表（哈希表） |
| ------ | -------- | -------- | -------- |
| 判断是否邻接 | $O(1)$   | $O(m)$   | $O(1)$   |
| 添加边    | $O(1)$   | $O(1)$   | $O(1)$   |
| 删除边    | $O(1)$   | $O(m)$   | $O(1)$   |
| 添加顶点   | $O(n)$   | $O(1)$   | $O(1)$   |
| 删除顶点   | $O(n^2)$ | $O(n+m)$ | $O(n)$   |
| 内存空间占用 | $O(n^2)$ | $O(n+m)$ | $O(n+m)$ |
## 三、图的遍历
### 1. 广度优先遍历 BFS

广度优先遍历的序列不唯一。广度优先遍历只要求按“由近及远”的顺序遍历，**而多个相同距离的顶点的遍历顺序允许被任意打乱**
#### 1. 算法实现
- BFS 通常借助队列来实现
	1. 将遍历起始顶点 `startVet` 加入队列，并开启循环
	2. 在循环的每轮迭代中，弹出队首顶点并记录访问，然后将该顶点的所有邻接顶点加入到队列尾部
	3. 循环步骤 2，直到所有顶点被访问完毕后结束
	4. 为了防止重复遍历顶点，我们需要借助一个**哈希集合** `visited` 来记录哪些节点已被访问
- **哈希集合**可以看作一个只存储 `key` 而不存储 `value` 的哈希表，它可以在 O(1) 时间复杂度下进行 `key` 的增删查改操作。根据 `key` 的唯一性，哈希集合通常用于数据去重等场景。
- 代码
```c
/* 节点队列结构体 */
typedef struct {
    Vertex *vertices[MAX_SIZE];
    int front, rear, size;
} Queue;

/* 构造函数 */
Queue *newQueue() {
    Queue *q = (Queue *)malloc(sizeof(Queue));
    q->front = q->rear = q->size = 0;
    return q;
}

/* 判断队列是否为空 */
int isEmpty(Queue *q) {
    return q->size == 0;
}

/* 入队操作 */
void enqueue(Queue *q, Vertex *vet) {
    q->vertices[q->rear] = vet;
    q->rear = (q->rear + 1) % MAX_SIZE;
    q->size++;
}

/* 出队操作 */
Vertex *dequeue(Queue *q) {
    Vertex *vet = q->vertices[q->front];
    q->front = (q->front + 1) % MAX_SIZE;
    q->size--;
    return vet;
}

/* 检查顶点是否已被访问 */
int isVisited(Vertex **visited, int size, Vertex *vet) {
    // 遍历查找节点，使用 O(n) 时间
    for (int i = 0; i < size; i++) {
        if (visited[i] == vet)
            return 1;
    }
    return 0;
}

/* 广度优先遍历 */
// 使用邻接表来表示图，以便获取指定顶点的所有邻接顶点
void graphBFS(GraphAdjList *graph, Vertex *startVet, Vertex **res, int *resSize, Vertex **visited, int *visitedSize) {
    // 队列用于实现 BFS
    Queue *queue = newQueue();
    enqueue(queue, startVet);
    visited[(*visitedSize)++] = startVet;
    // 以顶点 vet 为起点，循环直至访问完所有顶点
    while (!isEmpty(queue)) {
        Vertex *vet = dequeue(queue); // 队首顶点出队
        res[(*resSize)++] = vet;      // 记录访问顶点
        // 遍历该顶点的所有邻接顶点
        AdjListNode *node = findNode(graph, vet);
        while (node != NULL) {
            // 跳过已被访问的顶点
            if (!isVisited(visited, *visitedSize, node->vertex)) {
                enqueue(queue, node->vertex);             // 只入队未访问的顶点
                visited[(*visitedSize)++] = node->vertex; // 标记该顶点已被访问
            }
            node = node->next;
        }
    }
    // 释放内存
    free(queue);
}
```
#### 2. 复杂度分析
- **时间复杂度**：所有顶点都会入队并出队一次，使用 $O(|V|)$ 时间；在遍历邻接顶点的过程中，由于是无向图，因此所有边都会被访问 2 次，使用 $O(2|E|)$ 时间；总体使用 $O(|V|+|E|)$ 时间。
- **空间复杂度**：列表 `res` ，哈希集合 `visited` ，队列 `que` 中的顶点数量最多为 $|V|$ ，使用 $O(|V|)$ 空间。
### 2. 深度优先遍历 DFS

- 深度优先遍历序列的**顺序不唯一**
#### 1. 算法实现
- 基于递归来实现。借助一个哈希集合`visited` 来记录已被访问的顶点，以避免重复
- 代码
```c
/* 检查顶点是否已被访问 */
int isVisited(Vertex **res, int size, Vertex *vet) {
    // 遍历查找节点，使用 O(n) 时间
    for (int i = 0; i < size; i++) {
        if (res[i] == vet) {
            return 1;
        }
    }
    return 0;
}

/* 深度优先遍历辅助函数 */
void dfs(GraphAdjList *graph, Vertex **res, int *resSize, Vertex *vet) {
    // 记录访问顶点
    res[(*resSize)++] = vet;
    // 遍历该顶点的所有邻接顶点
    AdjListNode *node = findNode(graph, vet);
    while (node != NULL) {
        // 跳过已被访问的顶点
        if (!isVisited(res, *resSize, node->vertex)) {
            // 递归访问邻接顶点
            dfs(graph, res, resSize, node->vertex);
        }
        node = node->next;
    }
}

/* 深度优先遍历 */
// 使用邻接表来表示图，以便获取指定顶点的所有邻接顶点
void graphDFS(GraphAdjList *graph, Vertex *startVet, Vertex **res, int *resSize) {
    dfs(graph, res, resSize, startVet);
}
```
#### 2. 复杂度分析
- **时间复杂度**：所有顶点都会被访问 $1$ 次，使用 $O(|V|)$ 时间；所有边都会被访问 $2$ 次，使用 $O(2|E|)$ 时间；总体使用 $O(|V|+|E|)$ 时间。
- **空间复杂度**：列表 `res` ，哈希集合 `visited` 顶点数量最多为 $|V|$ ，递归深度最大为 $|V|$ ，因此使用 $O(|V|)$ 空间
## 四、拓扑排序
### 1. 基本定义
1. 拓扑排序（**Topological Sorting**）是一个有向无圈图（**DAG, Directed Acyclic Graph**）的**所有顶点的线性序列**。且该序列必须满足下面两个条件：
	1. 每个顶点出现且只出现一次
	2. 若存在一条从顶点 A 到顶点 B 的路径，那么在序列中顶点 A 出现在顶点 B 的前面
### 2. 算法
1. **Kahn算法**（基于入度）
	1. 从 DAG 图中选择一个 **没有前驱**（即入度为0）的顶点并输出
	2. 从图中删除该顶点和所有以它为起点的有向边
	3. 重复 1 和 2 直到当前的 DAG 图为空或**当前图中不存在无前驱的顶点为止**。后一种情况说明有向图中必然存在环
	4. 每个结点和边只被处理一次，时间复杂度$O(|V|+|E|)$
	```cpp
	bool topologicalSort(int n) {
	    front = back = 0;  // 初始化队列指针
	    // 将所有入度为0的节点加入队列
	    for (int i = 1; i <= n; i++) {
	        if (indegree[i] == 0)
	            queue[back++] = i;
	    }

	    int size = 0;  // 用于记录已经排序的节点数量
	    // 处理队列中的每个节点
	    while (front < back) {
	        int u = queue[front++];  // 从队列头部取出一个节点
	        ans[size++] = u;         // 将其加入到结果数组中
	        // 遍历节点u的所有出边
	        for (int edgeId = head[u]; edgeId; edgeId = next[edgeId]) {
	            // 减少目标节点的入度
	            if (--indegree[to[edgeId]] == 0)
	                // 如果目标节点的入度减为0，则将其加入队列
	                queue[back++] = to[edgeId];
	        }
	    }
	    // 如果排序后的节点数量等于总节点数，说明排序成功
	    return size == n;
	}
	```
2. DFS算法
	1. 若遇到已经访问结点，说明存在圈
	2. 最终栈内结点为结果
```cpp

void dfs(int u) {
    visited[u] = true;  // 标记节点u为已访问
    // 遍历节点u的所有邻接节点
    for (int v : graph[u]) {
        if (!visited[v]) {
            dfs(v);  // 如果节点v未被访问，则递归访问它
        }
    }
    topoStack.push(u);  // 当前节点处理完毕，压入栈中
}
```

## 五、最短路径算法
### 1. 无权最短路径
- 使用bfs算法，加入`w.dist=v.dist+1`使得距离递增
- 运行时间$O(|E|+|V|)$(使用邻接表)
- 伪代码
```cpp
void Graph::unweighted(Vertex s)
{
	Queue<Vertex> q;

	for each Vertex v
		v.dist = INFINITY;

	s.dist = 0;
	q.enqueue(s); //初始时队列只含距离为currDist的顶点

	while (!q.isEmpty())
	{
		Vertex v = q.dequeue();

		for each Vertex w adjacent to v
			if (w.dist == INFINITY)
			{
				w.dist = v.dist + 1;
				w.path = v;
				q.enque(w); //距离为currDist+1的邻接顶点自队尾入队
			}
	}
}
```
### 2. 有权最短路径
#### a.Dijkstra算法
- 策略：从起始点开始，用**贪心算法**策略，每次遍历到始点距离最近且未访问过的顶点的邻接结点，直到到达终点为止
- **标号法**：**临时标号T**表示当前节点**最短路径上界**，**固定标号P**表示**最短路长**
- 步骤：
	1. **初始化**：将所有点的最短路径估计值初始化为无穷大，起始点的最短路径为0
	2. **选择最小的未处理节点**：从未处理的节点中选择一个最短路径最小的节点
	3. **更新邻居节点的距离**：对于当前节点的每个邻居，如果通过当前节点到邻居节点的距离比已知的最短路径还要短，就更新这个邻居节点的最短路径
	4. **重复**：重复步骤2和3，直到所有的点都被处理过
- 复杂度分析：
	- 若使用遍历表查找最小值，每步使用$O|V|$，一共花费$O|V^2|$，而每条边最多更新一次，花费$O|E|$，总运行时间为$O(|E|+|V^2|)$，若**图是稠密**的，边数$|E|=\Theta (|V^2|)$，时间与边数呈现线性关系，但若**图是稀疏**的，边数$|E|=\Theta (|V|)$，算法较慢
- 代码（邻接矩阵，未改良）：
```c
/*
参数：vs：源点的索引;f：终点的索引;
    pre[]：前驱数组,即pre[i]为从vs到i最短路径时,i前面那个顶点的索引
	dist[]：距离数组，即dist[i]是vs到i的最短路径的长度
全局变量q：点的数量
功能：算出从源点下标vs到其余点最短路径,轨迹记录在pre[],距离记录在dist[]。
*/
void dijkstra(int vs, int prev[], int dist[],int f)
{

    int i,j,k;
    int min;
    int tmp;
    int flag[q];  // flag[i]=1表示"顶点vs"到"顶点i"的最短路径已成功获取。
/* 1.  初始化*/
    for (i = 0; i < q; i++)
    {
        flag[i] = 0;  // 顶点i的最短路径还没获取到。
        prev[i] = vs;  // 顶点i的前驱顶点为0。
        dist[i] = martix[vs][i];// 顶点i的最短路径为vs到i的权。
    }

    flag[vs] = 1; // 对顶点vs自身进行初始化
    dist[vs] = 0;

/* 2.  遍历q-1次，每次找出vs到另一个顶点的最短路径 */
    for (i = 1; i < q ; i++)
    {

        /* 2.1 在未获取最短路径的顶点中，找到离vs最近的顶点k */
        min = INF;
        for ( j = 0; j < q ; j++)
        {
            if (flag[j]==0 && dist[j]<min)
			//若从vs到顶点j距离小于min,而且从vs到j的最短路径还未获取。
            {
                min = dist[j];//改变最近距离
                k = j;//记录j
            }
        }

       /* 2.2  对刚刚已找到最短距离的顶点k进行标记判断     */
        flag[k] = 1; // 标记顶点k,dist[k]已确定。
        if(k==f)   //判断k是否是终点索引,若是则退出
			break;

        /*  2.3   已知顶点k的最短路径后,更新未获取最短路径的顶点的最短路径和前驱顶点   */
        for (j = 0; j < q ; j++)
        {
            tmp = (martix[k][j]==INF ? INF : (min + martix[k][j])); // 防止溢出
            if (flag[j] == 0 && (tmp  < dist[j]) ) //若j还不是最短距离且从k到j距离比记录的距离短
            {
                //更新k的前驱和最短距离
			    prev[j] = k;
                dist[j] = tmp;
            }
        }
    }
}
```
+ 改良：使用**优先队列**
	 - 方法1：`deletekey` 操作，对查找未知最小值进行优化，根为最小值，更新堆时间复杂度为$O(\log |V|)$,由此得出运行时间改良为$O(|E|\log |V|+|V|\log |V|)=O(|E|\log |V|)$，但堆对 `Find` 操作支持较差，难以找到$d_i$的值，**二叉堆**不适用，可以使用**配对堆**
	 - 方法2：把$\omega$和$d_\omega$插入优先队列，不需要再 `deletekey`，但队列变为$|E|$大小，空间需求增加
### 3. 具有负边值的图
- 结合赋权和无权的算法，开始，我们把 $s$ 放到队列中。然后，在每一阶段我们让一个顶点 $v$ 出队。**找出所有邻接到 $v$ 使得 $d_w > d_v + c_v$,$w$ 的顶点 $w$。然后更新 $d_w$ 和 $p_w$，并在 $w$ 不在队列中的时候把它放入队列中**。可以**为每个顶点设置一个比特位(bit) 以指示它在队列中出现与否**。重复这个过程**直到队列空为止**
- 时间复杂度$O(|E|\times|V|)$
- 代码
```cpp
void Graph::weightedNegative(Vertex s)
{
	Queue<Vertex>q;

	for each Vertex v
		v.dist = INFINITY;

	s.dist = 0;
	q.enqueue(s);

	while (!q.isEmpty())
	{
		Vertex v = q.dequeue();

		for each Vertex w adjacent to v
			if (v.dist + cvw < w.dist)
			{
				//更新 w
				w.dist = v.dist + cvw;
				w.path = v;
				if (w is not already in q)
					q.enqueue(w);
			}
	}
}
```
### 4. 无圈图
- 如果知道图是无圈的，则可以通过改变声明顶点为 known 的顺序，或叫作**顶点选取法则**，来改进 Dijkstra 算法。
- 新法则是以拓扑顺序选择顶点的，因为当一个顶点 v 被选取后，按照**拓扑排序**的法则它没有从 unknown 顶点出发的入边，因此它的距离 $d_v$ 可不再被降低。由于选择和更新可以在拓扑排序实施的时候进行，因此算法能够一趟完成
- 由于选择花费常数时间，因此**运行时间**为 $O(|E|+|V|)$
- 应用：**AOE(activity on edge) 网络-关键路径分析法(critical path analysis)**
#### a.动作节点图（Activity On Vertex, AOV 网络）
![Pasted image 20250416204201](/blog/obsidian-assets/pasted-image-20250416204201-fdd188e911.png)
- **动作节点图**:每个节点表示一个必须执行的动作以及完成动作所花费的时间，用**顶点（Vertex）表示活动**，用**边（Edge）表示活动之间的依赖关系**，若存在边 $A \to B$，表示活动 A 完成后才能开始活动 B
-  **关键特性**
	- **有向无环图（DAG）**：若存在环（如 $A \to B \to A$），则表示活动循环依赖，项目无法推进。
	- **拓扑排序**：通过拓扑排序确定活动的可行执行顺序，确保所有前驱活动完成后才开始后续活动。
#### b.事件节点图（Activity On Edge, AOE 网络）
![Pasted image 20250416204430](/blog/obsidian-assets/pasted-image-20250416204430-5f5421d1ef.png)
- **核心思想**：用**边（Edge）表示活动**，用**顶点（Vertex）表示事件**（活动的开始或结束）顶点 $v_j$ 表示 “所有进入 $v_j$ 的活动已完成，所有从 $v_j$ 出发的活动可开始”
- **关键路径**：AOE 网络中从起点到终点的最长路径（总时间最大），决定项目的最短完成时间。
- **关键活动**：关键路径上的活动，其延迟会直接导致项目工期延长。
- 需要考虑的重要问题为方案**最早完成时间**是何时，另一个重要问题是**确定哪些动作可以延迟，延迟多长，而不至于影响最少完成时间**。为了进行这种运算，我们把动作节点图转化成事件节点图。每个事件对应一个动作和所有相关的动作的完成。
- 从事件节点图中节点 v 可达到的那些事件只可在事件 v 完成后才能开始。
- 在一个动作依赖于多个其他动作的情况下，可能需要插入**哑边(dummy edge)** 和 **哑结点(dummy node)**。
1. **最早完成时间**
	![Pasted image 20250416205025](/blog/obsidian-assets/pasted-image-20250416205025-642e0c8415.png)
- **定义**：事件 $v_j$ 的最早完成时间，即从起点到 $v_j$ 的最长路径时间。
- **计算方法**（正向遍历，从起点开始）：
    - 起点 $v_0$ 的 $EC[0] = 0$。
    - 对每条边 $<v_i, v_j>$，活动持续时间为 $c_{i,j}$，则： $EC[j] = \max_{<v_i, v_j> \in E} \{ EC[i] + c_{i,j} \}$
    - **意义**：$EC[j]$ 是事件 $v_j$ 可能发生的最早时间。
1. **最晚完成时间**
	![Pasted image 20250416205123](/blog/obsidian-assets/pasted-image-20250416205123-c5214f983d.png)
	- **定义**：事件 $v_j$ 在不影响项目总工期的前提下的最晚完成时间。
	- **计算方法**（反向遍历，从终点开始）：
	    - 终点 $v_n$ 的 $LC[n] = EC[n]$（总工期）。
	    - 对每条边 $<v_i, v_j>$，则： $LC[i] = \min_{<v_i, v_j> \in E} \{ LC[j] - c_{i,j} \}$
    - **意义**：$LC[j]$ 是事件 $v_j$ 必须发生的最晚时间，否则项目会延期。
	- 对于每个顶点，通过保存一个所有邻接而且在先的顶点的表，这些值就可以以线性时间算出。各顶点的最早完成时间通过顶点的拓扑排序算出，而最晚完成时间则通过倒转它们的拓扑顺序来计算。最晚完成时间如图所示。
2. **松弛时间**
	![Pasted image 20250416205426](/blog/obsidian-assets/pasted-image-20250416205426-07425df85d.png)
	- 事件节点图中每条边的松弛时间(slack time) 代表对应动作可以被延迟而又不至于推迟整体完成的时间量
		$Slack_{(v,w)} = LC_w - EC_v - c_{v,w}$
	- 图中指出在事件节点图中每个动作的松弛时间(作为第三项被标示)。对于每个节点，其项上的数字是最早完成时间，而底下的数字是最晚完成时间
	- **某些动作的松弛时间为零，这些动作是关键性动作，它们必须按计划结束。至少存在一条完全由零-松弛边组成的路径，这样的路径就是关键路径(critical path)**。本例中的关键路径则为 $1, 2, 4, 7, 10$
### 5. 所有点对最短路径

#### a. n次单源算法

- 使用$|V|$次单源算法（如Dijkstra算法）
- $T = O( |V|^3 )$ 在稀疏图运行快速

#### b. Floyd算法

- 基本思想：定义了两个二维矩阵：
	1. 矩阵D记录顶点间的最小路径，例如$D[0][3]= 10$，说明顶点 $0$ 到 $3$ 的最短路径为$10$；
	2. 矩阵P记录顶点间最小路径中的中转点，例如$P[0][3]= 1$ 说明，$0$ 到 $3$的最短路径轨迹为：0 -> 1 -> 3。
- 通过3重循环，k为中转点，v为起点，w为终点，循环比较$D[v][w]$ 和 $D[v][k] + D[k][w]$ 最小值，如果$D[v][k] + D[k][w]$ 为更小值，则把$D[v][k] + D[k][w]$ 覆盖保存在$D[v][w]$中。
- 代码
```c
typedef struct struct_graph{
    char vexs[MAXN];
    int vexnum;//顶点数
    int edgnum;//边数
    int matirx[MAXN][MAXN];//邻接矩阵
} Graph;

//核心部分
//k为中间点
for(k = 0; k < G.vexnum; k++){
	//v为起点
	for(v = 0 ; v < G.vexnum; v++){
		//w为终点
		for(w =0; w < G.vexnum; w++){
			if(D[v][w] > (D[v][k] + D[k][w])){
				D[v][w] = D[v][k] + D[k][w];//更新最小路径
				P[v][w] = P[v][k];//更新最小路径中间顶点
			}
		}
	}
}
```
## 六、网络流问题
### 1. 基础定义与定理
1. 网络流:所有弧上流量的集合$f={f(u,v)}$,称为该容量网络的一个网络流.
2. **定义**：带权的有向图$G=(V,E)$，满足以下条件，则称为网络流图(flow network)：
	- 仅有一个入度为0的顶点s，称s为**源点**
	- 仅有一个出度为0的顶点t，称t为**汇点**
	- 每条边的权值都为非负数，称为该边的**容量**，记作$c(i,j)$。
	- 弧的流量:通过容量网络G中每条弧$<u,v>$上的实际流量(简称流量),记为$f(u,v)$
3. 性质:对于任意一个时刻，设$f(u,v)$为实际流量，则整个图G的流网络满足3个性质：
	- **容量限制**：对任意$u,v∈V$，$f(u,v)≤c(u,v)$。
	- **反对称性**：对任意$u,v∈V$，$f(u,v) = -f(v,u)$。从u到v的流量一定是从v到u的流量的相反值
	- **流守恒性**：对任意$u$，若$u$不为$S$或$T$，一定有$∑f(u,v)=0$，$(u,v)∈E$。即u到相邻节点的流量之和为0，因为流入u的流量和u点流出的流量相等，u点本身不会”制造”和”消耗”流量。
4. **可行流**:在容量网络G中满足以下条件的网络流f,称为可行流.
	- 弧流量限制条件:   $0\le f(u,v)\le c(u,v)$
	- 平衡条件:即流入一个点的流量要等于流出这个点的流量(源点和汇点除外)
5. **零流** 若网络流上**每条弧上的流量都为0**,则该网络流称为零流.
6. **伪流**:如果一个网络流只满足弧流量限制条件,**不满足平衡条件**,则这种网络流为伪流,或称为**容量可行流**(预流推进算法有用)
7. **残量**:容量 - 流量。
8. **增广路**:从S到T的一条路径，路径上的每条边的残量都为正。
9. **残留网络**： 残留网络也是个网络，记作$f’$，其所有点和原网络一样，边是原来的2倍。残留网络包括了原来的所有边，其$f’$的值是该边的残量（原来就有的正向边），同时残留网络也包含所有边的反向边，$f’$值是该边正向边的流量
	- **定理**：原可行流$f$+其残留网络$f’$**仍是一个可行流**。可以理解为残留网络的正向边就是该边还可以加多少流量，反向边就是该边可以减多少流量
	- ![Pasted image 20250423103720](/blog/obsidian-assets/pasted-image-20250423103720-2223c02f06.png)
### 2. 最大流算法
#### a. Edmonds-Karp算法（EK算法）
- 最大流最简单的算法是Edmonds-Karp算法，即最短路径增广算法，简称EK算法。EK算法基于一个基本的方法：Ford-Fulkerson方法，即增广路方法，简称FF方法。增广路算法是很多网络流算法的基础，一般都在残留网络中实现。
- 其思路是**不断调整流值和残留网络，直到没有增广路**为止
- FF方法的依据是**增广路定理**：网络达到**最大流**当且仅当残留网络中**没有增广路**。
- 把所有残量为正的边都看作可行边，找到了最短的增广路，所能增广的流值是**路径上最小的残留容量边所决定**的。
- **时间复杂度**为$O(|E|^2|V|)$**（BFS 找路径）** 每个顶点最多入队 $|V|$ 次（每次增广路径长度至少 + 1），每次 BFS 为 $O(|E|)$，若使用 **dijkstra算法**，若$cap_{max}$ 为最大边容量，可以改进为$O(|E|^2 \log |V| \log cap_{max})$
- 代码：
```cpp
#include<iostream>
#include<queue>
#include<cstring>
using namespace std;
const int N = 1010,M = 20010,INF = 0x3f3f3f3f;

int n,m,s,t;
int e[M],ne[M],w[M],h[M],idx;	//链式前向星建图
int pre[N],minw[N];	//pre是存增广路径的，后面要更新这条路上边的流值，minw是存该路径上边的最小值
bool vis[N];	//bfs判断点是否走过

void add(int a,int b,int c)	//建边函数
{
	e[idx] = b;
	w[idx] = c;
	ne[idx] = h[a];
	h[a] = idx++;
}

bool bfs()	//bfs搜索增广路
{
	queue<int> q;	//bfs的队列
	memset(vis,0,sizeof vis);	//初始化vis数组
	q.push(s);	//源点s入队
	vis[s] = 1;	//标记s入队
	minw[s] = INF;	//初始化s点的最小流值，视为无穷大
	while(q.size())
	{
		int u = q.front();
		q.pop();
		for(int i = h[u];~i;i = ne[i])
		{
			int v = e[i];
			if(!vis[v] && w[i])	//当v点没访问过且该边流值为正时，走到v点
			{
				vis[v] = 1;	//标记v点
				minw[v] = min(minw[u],w[i]);	//更新边的最小流值，取到u点的最小流值和u到v边的w[i]，二者的最小值
				pre[v] = i;	//存路径，注意此处存的是v点的前驱边（通过哪条边到达的v点，因为我们后面要修改边）
				if(v == t)	//如果走到了汇点t
					return 1;	//就返回1
				q.push(v);	//v点入队
			}
		}
	}
	return 0;	//如果走完bfs都没走到t点，说明再没有增广路了，返回0
}

int EK()
{
	int ans = 0;	//记录当前可行流的流量，从0开始不断增加
	while(bfs())	//如果可以bfs到
	{
		ans += minw[t];	//当前的可行流加上到汇点t的最小流值
		for(int i = t;i != s;i = e[pre[i]^1])	//更新每条边，注意这里i是从t点往前更新，直到s点，pre[i]是到走i点的那条边的序号，序号^1得到的是他的反向边的序号，再通过此序号访问e数组得到的就是i点的上一个点
		{
			w[pre[i]] -= minw[t];	//pre[i]是到i的正向边，w值减去最小流值
			w[pre[i]^1] += minw[t];	//pre[i]^1是到i的反向边，w值加上流值，如上就更新完了残留网络
		}
	}
	return ans;	//直到上面找不到增广路后退出while循环，此时的可行流就是最大流，返回ans
}

int main()
{
	int a,b,c;
	cin >> n >> m >> s >> t;
	memset(h,-1,sizeof h);	//注意h数组的初始化
	while(m--)
	{
		cin >> a >> b >> c;
		add(a,b,c);	//建残留网络时，正向边的流值是容量c
		add(b,a,0);	//反向边的流值是0
	}

	cout << EK() << endl;

	return 0;
}

```
### b. Dinic算法
## 七、 最小生成树
### 1. 基本定义
1. 一个图中可能存在多条相连的边,我们**一定可以从一个图中挑出一些边生成一棵树。** 这仅仅是生成一棵树,还未满足最小,当图中每条边都存在权重时,这时候我们从图中生成一棵树(n - 1 条边)时,**生成这棵树的总代价就是每条边的权重相加之和。**
2. 一个有N个点的联通图，边一定是大于等于N-1条的。**图的最小生成树，就是在这些边中选择N-1条出来，连接所有的N个点。这N-1条边的边权之和是所有方案中最小的**
### 2. 实现算法
#### a. Prim 算法（普里姆算法）
1. 思路: 在找最小生成树时，将顶点分为两类，一类是在查找的过程中已经包含在生成树中的顶点（假设为 A 类），剩下的为另一类（假设为 B 类），对于给定的连通网，**起始状态全部顶点都归为 B 类**。在找最小生成树时，选定任意一个顶点作为起始点，并将之从 B 类移至 A 类；然后找出 B 类中到 A 类中的顶点之间权值最小的顶点，将之从 B 类移至 A 类，如此重复，直到 B 类中没有顶点为止。所走过的顶点和边就是该连通图的最小生成树。
2. 代码
```c
// Prim算法生成最小生成树
void MiniSpanTree_Prim(MGraph G)
{
    int min, i, j, k;
    int adjvex[MAXVEX];  // 保存相关顶点下标
    int lowcost[MAXVEX]; // 保存相关顶点间边的权值

    lowcost[0] = 0;   // V0作为最小生成树的根开始遍历
    adjvex[0] = 0;   // V0第一个加入

    // 初始化操作
    for (i = 1; i < G.numVertexes; i++)
    {
        lowcost[i] = G.arc[0][i]; // 将邻接矩阵第0行所有权值先加入数组
        adjvex[i] = 0;           // 初始化全部先为V0的下标
    }

    // 构造最小生成树
    for (i = 1; i < G.numVertexes; i++)
    {
        min = INFINITY;  // 初始化最小权值为65535等不可能数值
        j = 1;
        k = 0;

        // 遍历全部顶点
        while (j++ < G.numVertexes)
        {
            // 找出lowcost数组已存储的最小权值
            if (lowcost[j] != 0 && lowcost[j] < min)
            {
                min = lowcost[j];
                k = j;  // 最小权值的下标
            }
        }

        // 打印当前顶点边中权值最小的边
        printf("(%d,%d)", adjvex[k], k);  // 修正：原代码此处有多余的(0,1)

        lowcost[k] = 0;  // 将当前顶点的权值设置为0，表示此顶点已输出

        // 邻接矩阵k行逐个遍历全部顶点，更新最小值
        for (j = 1; j < G.numVertexes; j++)
        {
            if (lowcost[j] != 0 && G.arc[k][j] < lowcost[j])
            {
                lowcost[j] = G.arc[k][j];
                adjvex[j] = k;
            }
        }
    }
}
```
3. **时间复杂度分析**
	- 整体的执行次数为 $(n-1) * 2(n-1)$，Prim算法的复杂度是 $O(n^2)$ 级别
	- 使用简单的二叉堆与邻接表来表示的话，普里姆算法的运行时间则可缩减为$O(|E|log|V|)$
#### b. **Kruskal算法**(克鲁斯卡尔算法)
1. 思路：**贪婪**算法的最小生成树算法。 该算法初始将图视为森林，图中的每一个顶点视为一棵单独的树。 一棵树只与它的邻接顶点中权值最小且不违反最小生成树属性（不构成环）的树之间建立连边
2. 步骤：
	1. 将图中所有的**边**按照权值进行**非降序排列**
	2. 从图中所有的边中选择可以构成最小生成树的边(**最小且无环**)
	3. 判断添加一条边 X-Y 是否形成环，可以判断顶点X在最小生成树中的终点与顶点Y在最小生成树中的**终点是否相同**，如果相同则说明存在环路，否则不存环路
	4. **终点**：某个顶点的终点就是"**与它连通的最大顶点**"（并查集实现）
3. 代码
```c
// 查找连线顶点的尾部下标
int Find(int *parent, int f)
{
    while (parent[f] > 0)
    {
        f = parent[f];  // 修正：中文分号改为英文分号
    }
    return f;  // 修正：中文分号改为英文分号
}

// Kruskal算法生成最小生成树
void MiniSpanTree_Kruskal(MGraph G)
{
    int i, n, m;
    Edge edges[MAXEDGE];  // 定义边集数组
    int parent[MAXVEX];   // 定义parent数组判断边与边是否形成环路
    int eCount = 0;

    // 初始化parent数组
    for (i = 0; i < G.numVertexes; i++)
    {
        parent[i] = 0;  // 修正：中文分号改为英文分号
    }

    // 边集数组初始化（排序）
    SortEdges(edges, G.numEdges);

    // 遍历每条边
    for (i = 0; i < G.numEdges; i++)
    {
        n = Find(parent, edges[i].begin);
        m = Find(parent, edges[i].end);

        if (n != m)  // 不形成环路
        {
            parent[n] = m;  // 合并集合
            printf("(%d, %d) %d ", edges[i].begin, edges[i].end, edges[i].weight);
            ++eCount;

            if (eCount == (G.numVertexes - 1))
            {
                break;  // 生成树边数足够时提前退出
            }
        }
    }
}
```
4. 时间复杂度
	- 先对边按权值从小到大排序，这一步的时间复杂度为为$O(|Elog|E|)$
	- 使用并查集，来快速判断两个顶点是否属于同一个集合。最坏的情况可能要枚举完所有的边，此时要循环|E|次，所以这一步的时间复杂度为$O(|E|α(V))$
	- $α$为Ackermann函数，其增长非常慢，我们可以视为常数。所以Kruskal算法的时间复杂度为$O(|Elog|E|)$
## 八、DFS应用
### 1. 无向图与有向图
1. 假设对于无向图，每条边$(v，w)$在邻接表里出现两次，一次是$(v，w)$，另一次是$(w，v)$
2. **深度优先(DFS)生成树(depth-first spanning tree)**:
	- 处理$(v,w)$时，发现w是未被标记的，或当我们处理$(v,w)$时发现v是未标记的，用树的一条边表示
	- 处理$(v,w)$时发现w已被标记，并且当我们处理$(v,w)$时发现v也已有标记，那么我们就画一条虚线，并称之为**背向边(back edge)**，表示这条边实际上不是树的一部分
	- 树将**模拟我们执行的遍历**。树的边对该树的先序编号表示这些**顶点被标记的顺序**
3. 如果图不是连通的，那么处理所有节点(和边)则需要多次调用DFS，每次都生成一棵树，整个集合就是**深度优先生成森林(depth-first spanning forest)**
4. 由于 DFS 的性质，我们可以保证所有背向边连接的两个点在生成树上都满足其中一个是另一个的祖先
5. 对于有向图
	1. 此节点未被访问过，则此次的访问关系边（发起点->接受点）称为**树边**（Tree edge）
	2. 此节点被访问过但此节点的子孙还没访问完，换句话说，此次的发起点的源头可以追溯到接收点，则此次访问关系边称为**后向边**（Back edge）
	3. 此节点被访问过且此节点的子孙已经访问完，而且发起点是搜索初始边，则称为**前向边**（Down edge/Forward edge）
	4. 此节点被访问过且此节点的子孙已经访问完，而且发起点不是搜索初始边，则称为**横叉边**（Cross edge）
6. 假设有如下有向图,那么从$1$点开始做DFS，我们会得到$12345678$的遍历顺序，那么遍历经过的边就是下面这张图的黑色箭头，即Tree edge
  ![Pasted image 20250621130136](/blog/obsidian-assets/pasted-image-20250621130136-245ac1f233.png)                                                                                   ![Pasted image 20250621130143](/blog/obsidian-assets/pasted-image-20250621130143-b4c73641ac.png)
- 红色，蓝色，绿色为没有经过的边
- $4$指向$2$的蓝色边，由于$2$是$4$的祖先，所以蓝色边为Back edge
- $1$指向$8$的绿色边，由于$8$是$1$的后代，所以绿色边为Forward edge
- $6$指向$3$的红色边，两个点谁也不是谁的祖先或后代，所以红色边为Cross edge
### 2. 双连通性 Biconnectivity
1. **双连通**：一个连通的无向图中的任一顶点被删除之后，剩下的图仍然连通
2. 如果一个图不是双连通的，那么将其删除后图将不再连通的那些顶点叫做**割点(articulation point)**(关节点)
3. 计算割点算法(**求双连通分量的Tarjan算法**)：
	1. 执行深度优先搜索并在顶点被访问时给它们赋值**先序编号**$Num(v)$
	2. 对于**深度优先搜索生成树**上的每一个顶点$v$，计算通过树的零条或多条边和**至多一条**背向边而(以该序)达到**编号最低**的顶点，我们称之为$Low(v)$
	3. 根据定义有$Low(v)$是以下三者中的最小者
		- $Num(v)$
		- 所有背向边$(v,w)$中的最低$Num(w)$
		- 子树的所有边$(v,w)$中的最低$Low(w)$
	4. **根节点**是割点当且仅当**它有多于一个的儿子**
	5. 对于**非根节点** v，它是割点当且仅当它有某个**儿子w**使得$Low(w)>= Num(v)$
4. 代码
```c
int dfsCounter = 1; // 全局DFS计数器，用于分配顶点编号

// 寻找图中的非根节点割点（关节点）
void FindArticulationPoints(Graph* graph, int vertex) {
    Node* currentNode = graph->nodes[vertex];

    currentNode->dfsNumber = dfsCounter++; // 分配DFS序号
    currentNode->visited = 1; // 标记为已访问
    currentNode->lowValue = currentNode->dfsNumber; // 初始化low值为当前DFS序号

    // 遍历所有邻接顶点
    Edge* edge = currentNode->firstEdge;
    while (edge != NULL) {
        int neighbor = edge->targetVertex;
        Node* neighborNode = graph->nodes[neighbor];

        if (!neighborNode->visited) { // 未访问的邻接顶点,发现树边
            neighborNode->parent = vertex; // 设置父节点
            FindArticulationPoints(graph, neighbor); // 递归处理子节点

            // 判断当前顶点是否为割点
            if (neighborNode->lowValue >= currentNode->dfsNumber && vertex != 0) {
                printf("顶点 %c 是割点\n", 'A' + vertex);
            } else {
                // 更新当前顶点的low值
                currentNode->lowValue = (currentNode->lowValue < neighborNode->lowValue) ?
                                        currentNode->lowValue : neighborNode->lowValue;
            }
        } else if (neighborNode->vertexId != currentNode->parent) { // 发现回边
            // 更新low值为DFS序号的最小值
            currentNode->lowValue = (currentNode->lowValue < neighborNode->dfsNumber) ?
                                    currentNode->lowValue : neighborNode->dfsNumber;
        }

        edge = edge->nextEdge;
    }
}

// 检查根节点是否为割点
void CheckRootArticulation(Graph* graph) {
    int childCount = 0; // 根节点的子树数量

    // 统计根节点（顶点0）的子树数量
    for (int i = 0; i < graph->vertexCount; i++) {
        if (graph->nodes[i]->parent == 0) {
            childCount++;
        }
    }

    if (childCount >= 2) {
        printf("顶点 A 是割点\n");
    } else {
        printf("顶点 A 不是割点\n");
    }
}
```
### 3. 欧拉回路
1. **欧拉路径**：在一个图中，由$i$点出发，将每个边遍历一次最终到达$j$点的一条路径
2. **欧拉回路**：$i=j$时的欧拉路径
3. 无向图：
	1. 存在欧拉路径的**充要条件**是度数为**奇数的点的数量为0个或者2个**
	2. 存在欧拉回路的**充要条件**是**所有的点的度数均为偶数**
	3. 给一欧拉回路，切断回路中的任一条边，被切断的边的两个顶点即可作为这条欧拉路径的终点起点
4. 有向图
	1. 存在欧拉回路的**充要条件**是**所有的点的出度均等于入度**
	2. 存在欧拉路径的充要条件是
		- 存在欧拉回路
		- 所有点中出度比入度大1的点有一个，入度比出度大1的点有一个
5. 套圈法找欧拉回路
	1. 任取一个起点,开始下面的步骤
	2. 如果该点没有相连的点，就将该点加进路径中然后返回。
	3. 如果该点有相连的点，就列一张相连点的表然后遍历它们直到该点没有相连的点。(遍历一个点，删除一个点）
	4. 处理当前的点,删除和这个点相连的边, 在它相邻的点上重复上面的步骤,把当前这个点加入路径中
6. 代码
```c
while (top >= 0) {  // 当栈非空时持续处理
    int v = stack[top];       // 取出栈顶顶点v
    Edge* e = adj[v];         // 获取v的邻接边链表头节点

    if (e && !e->visited) {   // 存在未访问的边
        e->visited = true;    // 标记边为已访问（避免重复走）
        adj[v] = e->next;     // 从邻接表中移除当前边（指向链表下一个节点）
        stack[++top] = e->dest;  // 压入目标顶点，继续遍历
    } else {                  // 无边可走，回溯处理
        top--;                // 弹出当前顶点（栈顶元素出栈）

        // 头插法构建路径（关键逻辑）
        PathNode* node = (PathNode*)malloc(sizeof(PathNode));
        node->vertex = v;                 // 记录当前顶点
        node->next = path;                // 新节点指向原路径头部
        path = node;                      // 路径头部更新为新节点
    }
}
```
7. 动态执行示例（三角形图 0-1-2-0）
```plaintext
初始状态：栈=[0], path=NULL, adj[0]指向边0→1

1. 第一次循环：
   v=0, e=0→1（未访问）
   标记边0→1为已访问，adj[0]指向NULL
   压入1，栈=[0,1]

2. 第二次循环：
   v=1, e=1→2（未访问）
   标记边1→2为已访问，adj[1]指向NULL
   压入2，栈=[0,1,2]

3. 第三次循环：
   v=2, e=2→0（未访问）
   标记边2→0为已访问，adj[2]指向NULL
   压入0，栈=[0,1,2,0]

4. 第四次循环：
   v=0, adj[0]=NULL（无边可访问）
   弹出0，头插路径→path=0

5. 第五次循环：
   v=2, adj[2]=NULL
   弹出2，头插路径→path=2→0

6. 第六次循环：
   v=1, adj[1]=NULL
   弹出1，头插路径→path=1→2→0

7. 第七次循环：
   v=0, adj[0]=NULL
   弹出0，头插路径→path=0→1→2→0（欧拉回路）
```
### 4. 有向图
1. 构建深度优先搜索森林，产生三种边
    - **前向边**：从一个节点通向它的后裔
    - **背向边**：从一个节点通向遍历顺序更前的结点
    - **交叉边**：把不直接相关的两个树节点相连接
2. 检测有向图是否为无圈图方法：
    1. 拓扑排序
    2. 判断森林是否存在背向边，若存在则有圈。若为无圈图可以通过**生成DFS森林的后序遍历构建拓扑排序的反向遍历顺序**
### 5. 查找强分支
1. 定义：如果两个顶点可以相互通达，则称两个顶点**强连通(strongly connected)**。如果**有向图G的每两个顶点都强连通**，称G是一个**强连通图**。**非强连通图有向图的极大强连通子图**，称为**强连通分量(strongly connected components)**
2. **Tarjan算法**：Tarjan基于递归实现的深度优先搜索，在搜索过程中将顶点不断压入堆栈中，并在回溯时判断堆栈中顶点是否在同一联通分支
	1. 对有向图先任取一个节点，只要这个节点没被遍历过，则从其开始进行深度优先遍历
	2. 同样记录两个数组`dfn[i] and low[i]`
	3. `dfn[n]==low[u]`时，则弹出栈中顶点并构成一个连通分支
	4. 代码
	```cpp
	#define MAXNODE 20005

	int flag[MAXNODE] = {0}; //判断图中的点是否在栈内
	int dfn[MAXNODE] = {0}; //dfu数组
	int low[MAXNODE] = {0}; //low数组
	int tpArr[MAXNODE] = {0}; //存放节点属于第几组联通图
	int tpNum = 0; //对强连通分支设置ID
	int _index = 0; //dfs遍历的ID

	vector<int> graph[MAXNODE]; //图

	stack<int> st; //栈

	void tarjan(int n){
	    st.push(n);
	    flag[n] = 1;
	    dfn[n] = ++_index;
	    low[n] = _index;
	    for (int i = 0; i < graph[n].size(); i++) {
	        int cur = graph[n][i];
	        if (dfn[cur] == 0) {
	            tarjan(cur);
	            low[n] = min(low[n], low[cur]);
	        }else{
	            if (flag[cur] == 1) {
	                low[n] = min(low[n], dfn[cur]);
	            }
	        }
	    }
	    if (dfn[n] == low[n]) {
	        tpNum++;
	        do{
	            n = st.top();
	            st.pop();
	            flag[n] = 0;
	            tpArr[n] = tpNum;
	        }while(dfn[n] != low[n]);
	    }
	}
	```
# 第十章 不相交集（并查集）
- **并查集 The Disjoint Set ADT** 是一种用于管理元素所属集合的数据结构，实现为一个森林，其中每棵树表示一个集合，树中的节点表示对应集合中的元素。
- 并查集支持两种操作：
	- 合并（Union）：合并两个元素所属集合（合并对应的树）
	- 查询（Find）：查询某个元素所属集合（查询对应的树的根节点），这可以用于判断两个元素是否属于同一集合
## 一、存储结构
1. 并查集的存储结构使用**树的双亲表示法**，用数组进行表示，**数组下标序号表示该数据元素，数组值存放其双亲信息**
	![Pasted image 20250402102504](/blog/obsidian-assets/pasted-image-20250402102504-372d05ada4.png)
2. 结构定义
```c
#define SIZE 100
int UFSets[SIZE]; //集合元素数组
```
## 二、并查集的基本操作
### 1. 初始化
并查集的初始化即使每个元素自成一个单元素子集合，每个子集合的数组值为-1
```c
void Initial(int S[])
{
	for (int i = 0; i < SIZE; i++)
		S[i] = -1;
}
// 课本中自1开始，故根节点值为0
```
### 2. Find操作
查找操作即在并查集S中查找并返回包含元素 x 的树的根
```c
int Find(int S[], int x)
{
	while (S[x] >= 0) //循环寻找 x 的根
		x = S[x];
	return x; //根的 S[] 小于0
}
```
### 3. Union操作
合并操作即将两个子集合的根合并到一起
```c
void Union(int S[], int Root1, int Root2)
{
	//要求Root1与Root2是不同的，且表示子集合的名字
	if (Root1 == Root2) return;
	S[Root2] = Root1;
}
//Root2的双亲指向了Root1，意味着Root2带领的整个集合都指向了双亲Root1,实现了合并
```
## 三、并查集的优化
### 1. Union操作优化-按秩合并(union-by-rank)
1. 问题：若只有一个子集合，且这一个子集合是一条细长的链，若结点数是 $n$ ,那么查找的最坏时间复杂度是$O(n)$
2. **时间复杂度分析**
	- **最坏情况**：若每次合并都将大树连接到小树，树的高度可能达到 $O(n)$（n 为节点数）。此时：
	    - **查找操作**的时间复杂度为 $O(n)$。
	    - **合并操作**的时间复杂度为 $O(n)$（需先找到两个根节点）。
	- **总复杂度**：对于 m 次操作（包括查找和合并），最坏情况下的时间复杂度为 $O(m \cdot n)$。
3. 优化思路：在每次Union操作构建树的时候，尽可能让树不长高
4. 方法：
	1. **按大小求并（union-by-size）**
		- 每个根结点不再用-1表示，用根结点的绝对值表示树的结点总数
		- Union操作，让小树合并到大树
	```c
	void Union(int S[], int Root1, int Root2)
	{
		//要求Root1与Root2是不同的，且表示子集合的名字
		if (Root1 == Root2) return;
		if (S[Root2] > S[Root1]) //Root2结点数更少
		{
			S[Root1] += S[Root2];
			S[Root2] = Root1; //小树合并到大树，即Root2指向Root1
		}
		else
		{
			S[Root2] += S[Root1];
			S[Root1] = Root2;
		}
	}
	```
	2. **按高度求并（union-by-height）**
		- 每个根结点不再用-1表示，用根结点的绝对值表示树的高度
		- Union操作，让小树合并到大树
	```c
		void Union(int S[], int Root1, int Root2)
		{
			//要求Root1与Root2是不同的，且表示子集合的名字
			if (Root1 == Root2) return;
			if (S[Root2] > S[Root1]) //Root2更高
			{
				S[Root1] = Root2; //小树合并到大树，即Root1指向Root2，高度不变
			}
			else
			{
				if(S[Root1] == S[Root2])
					Root1--; //若高度相同，Root1对应高度增加1
				S[Root2] = Root1;//合并，Root2指向Root1
			}
		}
	```
5. 结果：Union操作优化后，Find操作的最坏时间复杂度变为$O(\log n)$，连续$m$次操作最坏为$O(m \log n)$
### 2. Find操作优化-压缩路径(path compression)
1. 问题：反复查找某个结点的根结点，每次都会花费大量时间
2. 优化思路：只要查找一次，就将查找路径上的所有结点都挂到根结点下面
3. 代码
	```c
	int Find(int S[], int x)
	{
		int root = x;
		while (S[root] >= 0) root = S[root]; //循环找到根
		while (x != root) //x不为根结点，则压缩路径
		{
			int t = S[x]; //t指向x的父节点
			S[x] = root; //x直接挂到根结点下
			x = t;
		}
		return root; //返回根节点编号
	}
	```
4. 结果：连续$M$次操作最多需要$O(M \log n)$的时间
5. 与求并优化的关系
	1. 大小求并：兼容
	2. 高度求并：不兼容，会改变树的高度，此时树的高度为估计的高度（称为秩(rank)）
### 3. 优化总结果分析
1. 最坏情况下为$\Theta(M \alpha(M,N))$,$\alpha(M,N)$是 Ackermann 函数的逆
2. $\alpha(M,N) = min\{i>=1 | A(i,\lfloor M/N \rfloor >\log N\}$，实用中值$\le 4$

# 第十一章、倒排索引
## 一、 概念
1. **倒排索引** Inverted index 是一种数据库索引，存储从**内容**（如单词或数字）到其在表格、文档或一组文档中的**位置的映射**（与正排索引相反，正排索引从文档映射到内容）
2. **目的**：允许**快速全文搜索**，代价是在数据库中添加文档时增加处理时间。它是文档检索系统中**最常用的数据结构**之一
3. 解决方法
	1. **逐页扫描**（Scan Each Page）：遍历所有文档，逐个查找目标术语
		**低效**：需完整遍历，无法应对大规模数据
	2. **术语-文档关联矩阵**（Term-Document Incidence Matrix）：以术语为行、文档为列，用**0/1表示**术语**是否在文档中出现**
		**直观但冗余**：矩阵稀疏，存储成本高，尤其文档/术语量大时
	3. **倒排文件索引**（Inverted File Index）：以术语为核心，关联包含该术语的所有文档信息
		**高效紧凑**：解决前两种方案的痛点，是信息检索如搜索引擎的核心技术
4. **定义**
	- **索引**（Index）：信息检索中用于高效定位文本中特定术语（Term）的核心数据结构，本质是**术语→文档 / 位置**的**映射机制**，目的是替代全文档遍历，提升检索速度
	- **倒排文件**（Inverted File）：实现索引的核心存储结构，**由词典和倒排表组成**。其逻辑与先列文档、再列文档内所有术语的正排逻辑相反，**先枚举所有去重术语，再为每个术语关联其在文本集合中的所有出现信息**
5. **倒排文件核心结构**
	1. **词典**（Dictionary）
		- **功能**：存储文本集合中所有**去重后的术语，是倒排文件的检索入口
		- 关联信息：每个术语条目需绑定两类关键信息：
		    1. 指向该术语**对应倒排表的指针**
		    2. **术语的元数据**：如**文档频率（DF）**，即包含该术语的文档总数，用于后续检索排序
	2. **倒排表**（Posting List）
		- **功能**：记录单个术语在文本集合中的所有出现细节，是词典条目的关联数据体
		- **字段**：
			1. **文档 ID** （DocID）：标识包含该术语的具体文档，唯一标识，便于快速定位文档
			2. **文档内频率**（TF）：该术语在当前文档中的出现次数，用于量化术语在文档中的重要性
			3. **出现位置**（Position）：该术语在文档中的具体偏移量，支持短语检索、邻近检索等高级需求
## 二、 构建流程
1. **构建流程**（索引生成器逻辑）
	1. **读取单个文档 D**：
	    - 为文档 D 分配唯一**文档 ID**，统一文档格式，存储文档基础元数据
	2. 读取文档 D 中的**每个术语 T**：
	    - 先对文档 D 进行**预处理**：
		    - 分词拆分连续文本为单词 需要**分词分析器** Token Analyzer
		    - 词干提取归一化形态 word stemming
		    - 过滤停用词 Stop Words 需要**停用词过滤器** Stop Filter
		    - 统一大小写 / 去除标点
		- 最终得到有效术语 T
	3. 查找术语 T，需要 **Vocabulary Scanner**，若术语 T **不在词典中，将 T 插入词典**：**需要 Vocabulary Insertor**
	    - 为术语 T 分配唯一**术语 ID**，记录 T 的基础信息（如首次出现文档 ID），并**初始化空的倒排表**，关联该倒排表与术语 T 的映射关系。
	4. 获取 T 对应的倒排表，将当前文档信息**插入倒排表**
	    - 统计术语 T 在文档 D 中的**出现次数（词频）** ，可选记录出现位置；若文档 ID 已在倒排表中，更新词频，否则新增条目
	5. 重复步骤 1-4 至所有文档处理完毕，将倒排索引写入磁盘：**需要 Memory management**
	    - 批量存储**词典（术语→术语 ID→倒排表指针）** 和所有术语的倒排表，采用压缩格式优化存储空间，生成索引文件
2. **术语预处理**（提升索引效率）
	1. **词干提取**（Word Stemming）：将术语**还原为词根**，避免重复索引
	2. **停用词过滤**（Stop Words）：剔除高频无意义术语（如a the it），因这类词几乎所有文档都包含，索引价值低
3. **访问术语**
	1. **搜索树** Search trees
		使用B+/B-/线索树，不是红黑树或者AVL树（红黑树稍快AVL树10%-20%），因为相对来说不是那么的高效
		1. **优点**
			- 天然有序存储，**范围搜索**高效，可通过遍历左 / 右子树快速获取区间内所有数据
			- 支持**前缀查询、排序查询**等复杂需求，无需额外处理数据顺序
			- 插入 / 删除时通过平衡机制（如B 树分裂合并）维持结构有序，保障查询稳定性
		 2. **缺点**
			- **单点查询**需遍历从根到叶子的路径，时间复杂度 $O (\log n)$
			- **维护平衡的开销较高**，**高频插入** / **删除**场景下性能会受影响
			- 节点存储额外指针 / 索引信息，**空间开销**比哈希表**略大**
	2. **哈希运算** Hashing
		1. **优点**
			- **单点查询**效率极高，通过哈希函数直接映射到目标位置，时间复杂度接近 $O (1)$
			- **插入 / 删除操作简单**，无需维护数据有序性，仅需处理哈希冲突
			- **空间利用率灵活**，可通过负载因子调整存储结构，适配不同数据量
		2. **缺点**
			- **不支持范围搜索**，数据无序存储，查询区间数据需遍历全表，时间复杂度 $O (n)$
			- 存在**哈希冲突**问题，冲突过多会导致查询效率退化，最坏 $O (n)$
			- **不支持排序、前缀匹配**等有序相关查询，扩展能力弱
4. 实际应用挑战与策略
	1. **内存不足**：**分块合并**（Block Merge）
		- 当处理文档时内存不足，先将当前索引块（BlockIndex）写入磁盘，清空内存后继续处理
		- 所有文档**处理完毕后**，**合并所有磁盘中的索引块**，生成最终倒排索引
		- 为了**让合并更快**，我们应该**保持**所有的BlockIndex是**有序**的
	2. **大规模数据**（Web级）：**分布式索引**（Distributed indexing）
		针对超大规模文档集，将索引拆分到多个节点，两种分区方式：
		- **术语分区**（Term-partitioned）：**按术语首字母划分**（如A~C、D~F、X~Z），每个节点存储对应术语的索引
		- **文档分区**（Document-partitioned）：**按文档ID范围划分**（如1~10000、10001~20000），每个节点存储对应文档的索引
	3. **动态索引**（Dynamic indexing）：主索引+辅助索引+标记删除
		- **主索引**（Main Index）：存储**已稳定**的文档索引，不频繁更新
		- **辅助索引**（Auxiliary Index）：存储**新增文档**的索引，当辅助索引**达到一定规模时，合并**到主索引
		- 文档删除时，通过**标记而非直接删除**，避免破坏索引结构
	4. **空间优化**：**倒排表压缩**（Compression）
		- **倒排表**中存储**文档ID的间隙**（如文档ID 2、15、47的间隙为13、32）可用远少于20位的编码存储，大幅减少空间占用
	5. **效率优化**：**阈值处理**（Thresholding）
		- **文档 Document 层面**：仅返回**按权重排序的前X个文档**，避免冗余结果
			- 对于**布尔查询**来说不可行：布尔查询通过布尔运算符（与 / 或 / 非）组合关键词，精准筛选符合逻辑条件的文档
			- 由于截断操作可能会**遗漏一些相关文档**
		- **查询 Query 层面**：按**术语频率升序排序**，仅用部分原始查询词 original query term 搜索，提升速度，但**可能遗漏**部分相关文档
## 三、 搜索引擎评价指标
1. **搜索引擎的技术衡量指标** Measures for a search engine
	1. **索引速度** How fast does it index
	    - 量化指标：**每小时处理**的文档数量
	    - 意义：反映搜索引擎收录新内容、更新已有内容的效率，直接影响信息的检索时效性
	2. **搜索速度** How fast does it search
	    - 量化维度：延迟**随索引规模变化**的函数
	    - 意义：衡量系统扩展性，需在索引规模增长时保持低延迟，避免因数据量增大导致等待时间过长
	3. **查询语言的表达能力** Expressiveness of query language
		- **复杂信息需求的表达能力**：支持**布尔逻辑、短语检索、范围查询**等，决定搜索引擎能否覆盖专业 / 深度检索场景
		- **复杂查询的执行速度**：平衡精准描述需求与查询效率，避免因查询逻辑复杂导致响应延迟飙升
2. **用户满意度对应的检索性能评估** User happiness
	1. **数据检索性能评估** Data Retrieval Performance Evaluation：**以确保正确性为前提** after establishing correctness
		- **响应时间** Response time：与搜索速度对应 Response time
		- **索引空间** Index space：存储效率，影响系统成本与部署扩展性
	2. **信息检索性能评估** Information Retrieval Performance Evaluation
	    - **结果集的相关性** How relevant is the answer set
3. **信息检索性能**
	- 相关性 relevant 衡量三要素：
		- **基准文档集** benchmark document collection
		- **基准查询集** benchmark suite of queries
		- **查询-文档的二元标注（相关/不相关）** binary assessment of either Relevant or Irrelevant for each query-doc pair
	- 计算公式：
		- **精确率**（Precision, P）= 相关且被检索的文档数（$R_R$） / 所有被检索的文档数（$R_R+I_R$）
		- **召回率**（Recall, R）= 相关且被检索的文档数（$R_R$） / 所有相关的文档数（$R_R+R_N$）
	- ![Screenshot_20250930_140807](/blog/obsidian-assets/screenshot-20250930-140807-b458cede85.jpg)
4. **不同策略对精准率和召回率的影响**
	1. **词根提取**（Stemming）
		1. **提高召回率**
			1. 避免因**词形差异遗漏**相关内容：未使用 Stemming 时，搜索run可能无法命中含running的相关文档；词根提取后，这些词被统一为 “run”，检索范围覆盖所有语义相关的词形，相关文档被召回的概率提升
			2. 降低语义重复的检索壁垒：同一核心语义的词被归为一类，无需单独检索每个词形，自然扩大了相关结果的覆盖范围
		2. **损害精确率**
			1. **词根冲突**导致**语义误判**：**部分单词词根相同但语义无关**，词根提取后会被误判为相关。例如 bank（银行）与 bankrupt（破产）、banknote（纸币）词根一致，但语义可能无关；检索 bank 时，会命中含bankrupt的无关文档，拉低精确率
			2. **词缀**承载的**关键语义丢失**：部分词缀如un决定单词核心语义，词根提取后可能混淆否定 / 肯定、主动 / 被动” 等关键含义，导致检索结果混入语义相悖的文档
		3. **不同于词形还原**（Lemmatization）：Lemmatization 会结合语法规则还原单词原型（如 better → good），语义准确性高于 Stemming，**对精确率的损害相对更小，但计算成本更高**
	2. **停用词过滤**（Stop Words）
		1. **对召回率基本无影响**：停用词通常不承载核心检索意图，去除后不会遗漏相关文档
		2. **轻微提升/大幅降低（误删）精确率**：减少无关匹配噪声；但**若停用词为关键语义词**（如否定词 not、限定词 only），盲目去除会导致语义反转，大幅降低精确率（例如检索 “不喜欢甜食”，去除 “不” 后会命中大量 “喜欢甜食” 的无关文档）
	3. **阈值处理**（Thresholding）
		1. **召回率**：**阈值降低**时，更多候选结果会被纳入，漏检的相关结果减少，**召回率升高**；**阈值升高**时，仅保留置信度极高的结果，漏检增多，**召回率降低**
		2. **精确率**：**阈值降低**时，纳入的无关结果增多，**精确率下降**；**阈值升高**时，筛选出的结果相关性更强，**精确率提升**
	4. 提升精确率的办法：page rank(网页排名), semantic web(语义网络)
