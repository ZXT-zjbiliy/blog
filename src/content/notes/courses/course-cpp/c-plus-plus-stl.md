---
title: "C++ STL"
description: "C++ 课程笔记，导入自 Obsidian。"
date: 2026-03-05
updated: 2026-03-05
category: "C++"
tags: ["课程笔记", "C++", "编程语言"]
featured: false
draft: false
---

# 一、概述
## 1. STL简介
1. **标准模版库（Standard Template Library, 简称STL）**
	- STL基于模版实现了一些面向序列数据的**表示**以及常用的**操作**
	- STL支持了一种**抽象**的编程模式
	    - 隐藏了一些低级的程序元素，如数组、链表、循环等
2. STL包含内容
	1. **容器类模板**
		- 容器用于存储**序列化的**数据，如：向量、队列、栈、集合等
	2. **算法（函数）模板**
		- 算法用于对容器中的数据元素进行一些常用**操作**，如：排序、统计等
	3. **迭代器类模板**
		- 迭代器实现了**抽象的指针**功能，它们指向容器中的数据元素，用于对容器中的数据元素进行遍历和访问
		- **迭代器是容器和算法之间的桥梁**：传给算法的不是容器，而是指向容器中元素的迭代器，算法通过迭代器实现对容器中数据元素的访问。这样使得算法与容器保持独立，从而提高算法的通用性
## 2. 容器
1. 简介
	- 容器用于表示**由同类型元素构成的、长度可变**的元素序列
	- 容器是由**类模板**来实现的，模板的参数是容器中元素的类型
	- STL中包含了很多种容器，虽然这些容器提供了一些相同的操作，但由于它们采用了不同的内部实现方法，不同的容器往往适合于不同的应用场合
2. 基本操作
	- 往容器中增加元素
	- 从容器中删除元素
	- 获取容器中指定位置的元素
	- 在容器中查找元素
	- 获取容器首/尾元素的迭代器
	- ...
## 3. 迭代器-Iterator

### a. 分类
#### 根据访问修改权限分类

- 输出迭代器（output iterator，记为：**OutIt**）
    - 可以修改它所指向的容器元素
    - 间接访问操作（`*`）
    - `++`操作
- 输入迭代器（input iterator，记为：**InIt**）
    - 只能读取它所指向的容器元素
    - 间接访问操作（`*`）和元素成员间接访问（`->`）
    - `++`、`==`、`!=`操作。
#### 根据迭代方式分类

- 前向迭代器（forward iterator，记为：**FwdIt**）
    - 可以读取/修改它所指向的容器元素
    - 元素间接访问操作（`*`）和元素成员间接访问操作（`->`）
    - `++`、`==`、`!=`操作
- 双向迭代器（bidirectional iterator，记为：**BidIt**）
    - 可以读取/修改它所指向的容器元素
    - 元素间接访问操作（`*`）和元素成员间接访问操作（`->`）
    - `++`、`--`、`==`、`!=`操作
- 随机访问迭代器（random-access iterator，记为：**RanIt**）
    - 可以读取/修改它所指向的容器元素
    - 元素间接访问操作（`*`）、元素成员间接访问操作（`->`）和下标访问元素操作（`[]`）
    - `++`、`--`、`+`、`-`、`+=`、`-=`、`==`、`!=`、`<`、`>`、`<=`、`>=`操作
#### 各容器的迭代器类型
- 对于`vector`、`deque`以及`basic_string`容器类，与它们关联的迭代器类型为**随机访问迭代器（RanIt）**
- 对于`list`、`map/multimap`以及`set/multiset`容器类，与它们关联的迭代器类型为**双向迭代器（BidIt）**
- `queue`、`stack`和`priority_queue`容器类，不支持迭代器
#### 相融关系
![Pasted image 20250329121320](/blog/obsidian-assets/pasted-image-20250329121320-a9480264b2.png)

|操作|前向|双向|随机访问|
|---|---|---|---|
|`++it`|✔️|✔️|✔️|
|`it++`|✔️|✔️|✔️|
|`--it`||✔️|✔️|
|`it--`||✔️|✔️|
|`it + n`|||✔️|
|`it[n]`|||✔️|
|`it1 - it2`|||✔️|
### b. 迭代器的适配器
- **迭代器适配器（Iterator Adapters）** 是一类特殊工具，用于扩展或调整迭代器的行为。它们通过包装现有迭代器，为其添加新功能或改变其默认行为，使其适应不同的使用场景
##### **1. 反向迭代器（Reverse Iterator）**
- 用于对容器元素从尾到头进行反向遍历，可以通过容器类的成员函数`rbegin`和`rend`可以获得容器的尾和首元素的反向迭代器。
- 需要注意的是，对反向迭代器，**`++`操作是往容器首部移动，`--`操作是往容器尾部移动**。
##### **2. 插入迭代器（Insert Iterator）**
- **功能**：将元素的赋值操作（`*it = value`）转换为向容器中插入元素的操作。
- **类型**：
  - `std::back_insert_iterator`：通过 `push_back` 在容器尾部插入元素（适用于 `vector`、`deque`、`list`）。
  - `std::front_insert_iterator`：通过 `push_front` 在容器头部插入元素（适用于 `list`、`deque`）。
  - `std::insert_iterator`：在指定位置插入元素。
- **示例**：
  ```cpp
  std::vector<int> src = {1, 2, 3};
  std::vector<int> dest;
  std::copy(src.begin(), src.end(), std::back_inserter(dest));
  // dest 变为 {1, 2, 3}
  ```
- **应用场景**：与算法（如 `std::copy`）结合，避免手动管理容器大小。
##### **3. 流迭代器（Stream Iterator）**
- **功能**：将输入/输出流（如 `cin`、`cout`、文件流）视为迭代器。
- **类型**：
  - `std::istream_iterator`：从输入流读取数据。
  - `std::ostream_iterator`：向输出流写入数据。
##### **4. 移动迭代器（Move Iterator）**
- **功能**：将迭代器的解引用操作 `*it` 转换为移动语义（`std::move(*it)`），用于高效转移资源所有权。
##### **5. 计数迭代器**
- C++20 的 `std::counted_iterator`
- 将迭代器与剩余元素数量绑定，方便遍历部分范围
##### **6. 分块迭代器**
- `std::ranges::chunk_view`
- 将元素分块处理（需要 C++23 支持）
## 4. 算法
1. 主要包括
	- 调序算法：头文件`algorithm`
	- 编辑算法：头文件`algorithm`
	- 查找算法：头文件`algorithm`
	- 算术算法：**头文件** **`numeric`**
	- 集合算法：头文件`algorithm`
	- 堆算法：头文件`algorithm`
	- 元素遍历算法：头文件`algorithm`
2. 操作
	- 使用者**只需要提供**：容器（迭代器）、操作条件以及可能的自定义操作
	- 算法的控制逻辑则**由算法内部实现**，这体现了一种**抽象**的编程模式
### a. 算法与容器之间的关系
- 不是把容器传给算法，而是**把容器的某些迭代器传给**它们，在算法中通过迭代器来访问和遍历相应容器中的元素
- 使得**算法不依赖于具体的容器，提高了算法的通用性**
### b. 算法接受的迭代器类型
一个算法能接收的迭代器的类型是通过**算法模板参数的名字**来体现的。例如：
```c++
template <class InIt, class OutIt>
OutIt copy(InIt src_first, InIt src_last, OutIt dst_first) {...}
```
- `template`模版见[C++ 模板](/blog/notes/courses/course-cpp/c-plus-plus-on-the-basis-of-the-learning-of-c)
- `src_first`和`src_last`是输入迭代器，算法中只能读取它们指向的元素
- `dst_first`是输出迭代器，算法中可以修改它指向的元素
- 以上参数可以接受其它相容的迭代器
### c. 算法的操作范围

1. 用算法对容器中的元素进行操作时，**大都需要用两个迭代器**来指出要操作的**元素的范围**
	`void sort(RanIt first, RanIt last);`
	- `first`是第一个元素的位置
	- `last`是最后一个元素的下一个位置
2. 有些算法可以**有多个操作范围**，这时，**除第一个范围外**，其它范围**可以不指定**最后一个元素位置，它**由第一个范围中元素的个数决定**。例如：
	`OutIt copy(InIt src_first, InIt src_last, OutIt dst_first);`
3. **一个操作范围**的两个迭代器必须**属于同一个容器**，而**不同操作范围**的迭代器可以属于不**同的容器**。
### d. 算法的自定义操作条件(谓词)

1. 有些算法可以让使用者提供一个**函数**或**函数对象**来作为**自定义操作条件**（或称为**谓词**），其参数类型为相应容器的元素类型，返回值类型为bool
2. 自定义操作条件可分为：
	- **Pred**：一元“谓词”，需要一个元素作为参数
	- **BinPred**：二元“谓词”，需要两个元素作为参数
3. 一元谓词:
	对于统计算法`size_t count_if(InIt first, InIt last, Pred cond);`，有
	```c++
	#include <vector>
	#include <algorithm>
	#include <iostream>
	using namespace std;

	bool f(int x) { return x > 0; }

	int main()
	{
	    vector<int> v;
	    ...... // 往容器中放了元素
	    cout << count_if(v.begin(), v.end(), f); // 统计v中正数的个数
	    return 0;
	}
	```
4. 二元谓词
	对于两种排序算法
	`void sort(RanIt first, RanIt last); // 按“<”排序`
	`void sort(RanIt first, RanIt last, BinPred comp); // 按comp返回true规定的次序`
	```c++
	#include <vector>
	#include <algorithm>
	using namespace std;

	bool greater2(int x1, int x2) { return x1 > x2; }

	int main()
	{
	    vector<int> v;
	    ...... // 往容器中放了元素
	    sort(v.begin(), v.end()); // 从小到大排序
	    sort(v.begin(), v.end(), greater2); // 从大到小排序
	    return 0;
	}
	```
### e. 算法的自定义操作

1. 有些算法可以让使用者提供一个函数或函数对象作为**自定义操作**，其参数和返回值类型由相应的算法决定。
2. 自定义操作可分为：
	- **`Op`** 或 **`Fun`**：一元操作，需要一个参数
	- **`BinOp`** 或 **`BinFun`**：二元操作，需要两个参数
3. 一元操作
	“元素遍历”算法`Fun for_each(InIt first, InIt last, Fun f);`
	```c++
	#include <iostream>
	#include <vector>
	#include <algorithm>
	using namespace std;

	void f(int x) { cout << ' ' << x; }

	int main()
	{
	     vector<int> v;
	     ...... // 往容器中放了元素
	     for_each(v.begin(), v.end(), f); // 对v中的每个元素去调用函数f进行操作
	     return 0;
	}
	```
4. 二元操作
	“累积”算法
	`T accumulate(InIt first, InIt last, T val); // 按“+”操作 T:初始量`
	`T accumulate(InIt first, InIt last, T val, BinOp op); // 由op决定累积的含义`
	设元素为，$e_1,e_2,...,e_n$，算法返回$t_n$：
	$t_1=op(val,e_1), t_2=op(t_1,e_2), ...... t_n=op(t_{n−1},e_{n-1})$
	```c++
	#include <vector>
	#include <numeric>
	using namespace std;

	int f1(int partial, int x) { return partial * x; }
	int f2(int partial, int x) { return partial + x * x; }
	double f3(double partial, int x) { return partial + 1.0 / x; }

	int main
	{
	    vector<int> v;
	    ...... // 往容器中放了元素

	    int sum = accumulate(v.begin(), v.end(), 0); // 所有元素和
	    int product = accumulate(v.begin(), v.end(), 1, f1); // 所有元素的乘积
	    int sq_sum = accumulate(v.begin(), v.end(), 0, f2); // 所有元素平方和
	    int rec_sum = accumulate(v.begin(), v.end(), 0.0, f3); // 元素倒数和

	    return 0;
	}
	```
# 二、容器
- 序列容器选择流程图
![Pasted image 20250331153651](/blog/obsidian-assets/pasted-image-20250331153651-083444632c.png)
- 容器适配器选择流程图
![Pasted image 20250331153708](/blog/obsidian-assets/pasted-image-20250331153708-132dcd1245.png)
## 1. string - 字符串
