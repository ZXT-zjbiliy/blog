---
title: "CS106L&OOP"
description: "C++ 课程笔记，导入自 Obsidian。"
date: 2026-03-05
updated: 2026-03-05
category: "C++"
tags: ["课程笔记", "C++", "编程语言"]
featured: false
draft: false
---

- 〇、OOP基本思想
- 一、类型和结构体
- 二、初始化和引用
- 三、流
- 四、容器
- 五、迭代器
- 六、类
- 七、继承
- 八、模板
- 九、函数与 lambda 表达式
- 十、运算符重载
- 十一、特殊成员函数SMFs
- 十二、移动和移动赋值
- 十三、std::optional 与类型安全性
- 十四、RAIl、智能指针、构建项目
# 〇、OOP基本思想
## 1. 重点词汇
- **responsibility-driven design**：责任驱动设计：将系统功能分解为对象的特定责任，明确每个对象“该做什么”，促进分工与模块化
- **Encapsulation** 封装：将对象的数据和操作数据的方法捆绑，隐藏内部细节，仅通过公开接口交互，保护数据安全
- **Inheritance** 继承：子类可继承父类的属性和方法，还能新增或修改功能，实现代码复用和类层次关系
- **iterators** 迭代器：用于按顺序遍历集合元素的对象，无需暴露集合内部结构，统一遍历方式
- **overriding** 重写：子类重新实现父类已有的方法，保持方法名、参数等一致，但逻辑不同，定制父类行为
- **coupling** 耦合：模块（类）之间的依赖程度，低耦合指依赖少，修改时影响小，更易维护
- **cohesion** 内聚：模块（类）内部元素的关联程度，高内聚指功能集中，元素关联紧密，更专注
- **template** 模板：定义通用结构（如算法步骤或通用类型），细节由子类或具体类型实现，保证结构稳定
- **interface** 接口：抽象类型，仅定义方法签名（规范），无实现，由具体类实现，实现多态和解耦
- **collection classes** 集合类：封装数据结构（如列表、映射）的类，用于存储和管理多个元素，简化操作
- **mutator methods** 修改器方法：修改对象私有属性的公共方法（如setter），控制修改逻辑（如验证），避免直接篡改
- **Polymorphism** 多态：同一接口（或父类）的对象，调用相同方法时表现不同行为，通过继承或接口实现
# 一、类型和结构体
## 1. C++基础与命名空间
1. c++是一种**编译语言**
	- 它允许我们生成更有效的机器代码
	- **解释器**一次只能看到**一小部分**代码，**编译器**能看到**所有代码**，但编译需要一定的时间
2. c++是一种**静态类型**语言。
3. **静态类型**的特点
	- 每个变量**必须声明**一个类型
	- 一旦声明，类型就**不能改变**
4. 为什么使用静态类型
	- 更有效率
	- 更容易理解和推理
	- 更好的错误检查
5. **命名空间** namespace
	详见[命名空间](/blog/notes/courses/course-cpp/c-plus-plus-on-the-basis-of-the-learning-of-c)
## 2. 结构struct
 结构体将被命名的变量捆绑到一个新类型中
1. 与C语言不同，结构名可以**直接使用**，不需要再添加`struct`
2. `std::pair`
```cpp
struct Order {
	std::string item;
	int quantity;
};
Order dozen = { "Eggs", 12 };

std::pair<std::string, int> dozen { "Eggs", 12 };
std::string item = dozen.first;// "Eggs"
int quantity = dozen.second; // 12
```
- `std::pair` 是一个**模版** (template)
```cpp
template <typename T1, typename T2>
struct pair {
	T1 first;
	T2 second;
};
```
## 3. c++标准库std
1. 拥有c++提供的内置类型、函数等
2. 需要 `#include` 相关文件
	-  `#include <string> `→ `std::string`
	- `#include <utility>` → `std::pair`
	- `#include <iostream>` → `std::cout, std::endl`
3.  如果使用 `using namespace std`则标准库名的前缀是 `std::`
	-  不必这么做，这被认为是糟糕的风格，会引入歧义
## 4.using、auto 关键字
1. 用 `using` 关键字创造 类型别名(**type aliases**)
	```cpp
	std::pair<bool, std::pair<double, double>> solveQuadratic(double a, double b, double c);

	// 同下
	using Zeros = std::pair<double, double>;
	using Solution = std::pair<bool, Zeros>;
	Solution solveQuadratic(double a, double b, double c);
	```
	- `using` 有点像类型的变量
2. auto关键字告诉编译器**推断**类型
	```cpp
	std::pair<bool, std::pair<double, double>> result = solveQuadratic(a, b, c);

	auto result = solveQuadratic(a, b, c);
	//和上面的完全一样
	//结果类型std::pair<bool, std::pair<double, double>>
	//我们只是告诉编译器为我们找出此类型
	```
	- auto 仍然是**静态类型**
# 二、初始化和引用
## 1. 直接/统一初始化与结构化绑定
1. **直接初始化**(**Direct initialization**)
	1. 不进行**类型检查**
	2. 进行**隐式窄转换(narrowing conversion)**
2. **统一初始化**(**Uniform Initialization**)
	- 使用大括号(**curly braces**)
	- 适用于所有类型，如 `vectors`, `maps`, 和 `custom classes` 等
	- 不允许**隐式窄转换**
	```cpp
	StanfordID id;
	id.name = "Jacob Roberts-Baca";
	id.sunet = "jtrb";
	id.idNumber = 6504417;
	// 初始化顺序取决于结构中的字段顺序, `=` 是可选的
	StanfordID jrb = { "Jacob Roberts-Baca", "jtrb", 6504417 };
	StanfordID fi { "Fabio Ibanez", "fibanez", 6504418 };
	```
	- **聚合初始化**：属于统一初始化的**子集**，仅适用于**聚合类型**（见[类 6.聚合类](/blog/notes/courses/course-cpp/cs106l-and-oop)）
		- 本质是统一初始化在聚合类型上的具体应用，直接按顺序初始化成员
3. **结构化绑定** (**Structured Binding**) (C++ 17)
	- 一个在编译时从**固定大小**的数据结构中**初始化**一些变量的有用方法
	- 能够**访问**函数返回的**多个值**
	- 可以在对象上使用，在**编译时大小是已知的**，例如 `std::vector`、`std::list` 等序列容器，因不具备固定的元素结构（不是 tuple-like 类型），无法直接使用结构化绑定
	- 仅适用于**可解构类型**（数组、聚合类、`std::pair`/`std::tuple`/`std::array` 等），基本数据类型（如 `int`、`double`）或非聚合的简单类型无法被解构
	- 依赖于直接访问类型的成员（或通过 `get<>()` 函数提取元素），若类 / 结构体不满足**聚合类型**的条件，则无法使用结构化绑定，即为**成员必须可访问（非私有）**
	- **数组作为函数参数时会退化为指针**（丢失大小信息），此时**无法用**结构化绑定，因为指针不包含数组元素的结构信息
```cpp
std::tuple getClassInfo() {
	std::string className = "CS106L";
	std::string buildingName = "260-113";
	std::string language = "C++";
	return {className, buildingName, language};
}
int main() {
	// 正常
	auto classInfo = getClassInfo();
	std::string className = std::get<0>(classInfo);
	std::string buildingName = std::get<1>(classInfo);
	std::string language = std::get<2>(classInfo);
	// 结构化绑定
	auto [className, buildingName, language] = getClassInfo();

	std::cout << "Come to " << buildingName << " and join us for " << className
	<< " to learn " << language << "!" << std::endl;
	return 0;
```
## 2. 引用&
1. 引用是一个**已存在**的别名
2. 使用 **ampersand (&)**
3. 引用与被引用的变量共享**相同的内存**
4. **不能有引用的引用**，引用**无法构建数组，也没有指针**
	`int&* p; //illegal 不存在引用的指针`
	`int*& p; //legal 指针可以被引用`
5. **按引用传递**
	 - 通过**引用**将变量传入函数意味着**引用了实际的内存，而不是复制一个副本**
	 - 通过**值**传递变量到函数意味着**复制副本，不使用实际的变量**
	```cpp
	#include <iostream>
	#include <math.h>
	// 注意&
	void squareN(int& n) { // 计算n的2次方
		n = std::pow(n, 2);
	}
	int main() {
		int num = 5; squareN(num);
		std::cout << num << std::endl;
		return 0;
	}
	```
6. **不能**声明对**const变量**的**非const引用**
7. 编译时 `* & const`**结合律**：
	1. `&`（引用）和 `*`（指针）是**右结合**
	2. const 的修饰规则：`const` 靠近谁，就修饰谁
		- 若 `const` 在 `*` 左侧，如 `const int* p` ，修饰的是 `int`， **指针指向不可修改的int**
		- 若 `const` 在 `*` 右侧，如 `int* const p` ，等价于 `int const* ref` ，修饰的是 `p` ，**指针本身不可修改，指向的int可改**
		- 若 `const` 在最左侧，如 `const int& ref` ，等价于 `int const& ref` ，修饰的是 int **引用绑定不可修改的int**
	3. 引用不能被 const 修饰，`int& const ref` 非法，因为引用的本质是变量的别名，一旦绑定就无法更改指向，**无需额外加 const，加上违反语法**
## 3. 左值和右值
1. 左值**可以**获取它们的**地址**，并且可以出现在赋值操作符的左侧
2. 右值的**地址不能被占用**，只能出现在赋值操作符的右边，临时的
3. **不能**通过**引用**传入**右值**，因为其为临时的
## 4. 常量
1. 对象的限定符，**声明**它们**不能被修改**
```cpp
#include <iostream>
#include <vector>
int main() {
	std::vector<int> vec{1, 2, 3}; // a normal vector
	const std::vector<int> const_vec{1, 2, 3}; // a const vector
	std::vector<int>& ref_vec{vec}; // a reference to `vec`
	const std::vector<int>& const_ref{vec}; /// a const reference

	vec.push_back(3); /// this is ok!
	const_vec.push_back(3); /// no, this is const!
	ref_vec.push_back(3); /// this is ok, just a reference!
	const_ref.push_back(3); /// this is const, compiler error!

	return 0;
}
```
2. C++ 中**全局const默认具有内部链接**，仅在当前编译单元可见
3. **初始化赋值**
	1. 局部 const 变量和全局 / 静态 const 变量都必须初始化，否则编译错误。编译器会优先将const值**存入符号表以避免分配实际内存**，因此const变量**必须初始化**
	2. extern关键字会**强制**为const分配**独立的内存空间**，**可以不初始化**
4. **能否作为静态数组大小**
	1. 使用**编译期常量**初始化的const变量在编译时优先存入符号表，因此**可以作为静态数组大小**( **C 语言**：严格要求静态数组大小是编译期常量，用变量初始化的`const`变量绝对不能用作数组大小，直接报编译错误，**C++11 及以后**：引入`constexpr`关键字，专门定义**编译期常量**，替代普通`const`)
		`const int i = 10;`
		`int arr1[i]; //ok`
	2. **使用变量初始化**的const变量在编译时只有内存空间，因此**无法作为静态数组大小**
		`int s = 10;`
		`const int i = n;`
		`int arr2[i]; //wrong`
	3. **聚合**(Aggregates)**const变量**：const聚合类型（如const数组、const结构体数组）虽值不可修改，但编译器会为其分配实际存储，且不保证在编译时知晓其存储内容，因此无法作为数组大小
		```cpp
		const int i[] = {1,2,3,4};
		float f[i[3]]; // wrong
		```
5. **字符串字面量**（string literals）
	1. 字符串字面量会被编译器存储在程序的 **只读数据段（.rodata）**，这是一块专门存放常量的内存区域，具备两个特性：
		- **生命周期长**：从程序启动到退出，始终存在（静态存储期）
		- **内容只读**：操作系统会标记这块内存为**只读**，任何尝试修改的行为都会被硬件 / 操作系统拦截，触发未定义行为
	2. `char* s = "Hello, world!";` 是不严谨的。`s` 是一个普通指针，**语法上允许**通过 `s[0] = 'h'` 这类代码修改指向的内容，**但实际指向的是只读内存**，修改操作会违法内存权限，这就是为什么必须用 `const char* s` 明确约束**指针指向的内容不可修改**，编译器会在编译期拦截修改尝试，避免运行时崩溃
	3. 早期编译器允许省略  const ，但这是不严谨的兼容行为。若尝试修改  s  指向的字符值，**会触发未定义行为**
	4. 若**需要修改字符串内容**，应将其**存入字符数组**，在栈上分配可写内存 `char s[] = "Hello, world"`
6. **常量对象与成员函数、变量**
	1. **常量对象**：仅能调用**const成员函数**，无法调用任何非const成员函数
	2. **const成员函数**
		1. **声明与定义**： const 关键字需**两处重复**，在类内声明时加 const ，在类外定义时也要加 const
			- 类内声明： `int get_day() const;`
			- 类外定义： `int Date::get_day() const { return day; }`
			- **在常量方法内部**，`this` 的类型为 `const class_type<T>*`
		2. 规则：const 对象只能调用**const 修饰的非静态成员函数**，或**静态成员函数**
			- 禁止**修改**成员变量
			- 禁止**调用非const**成员函数
	3. **常量成员变量**
		1. **静态和非静态常量**
			1. **非static**的const成员变量：
				1. C++11 及以后：普通`const`成员变量**可以**类内初始化，但只是**默认初始值**，如果构造函数初始化列表显式初始化，会覆盖这个默认值
				2. 不在类内初始化时，必须在构造函数的**初始化列表中初始化**，无法在构造函数体内赋值
				3. `constexpr`是 C++11 引入的编译期常量，**必须类内初始化**
			2. 例子
				```cpp
				// 声明时可暂不初始化
				const int num;

				Test() : num(100) {}  // 正确：通过初始化列表初始化const成员
				Test() { num = 100; } // 错误：构造函数体内赋值（const变量不允许修改）
				```
			3. **static** const成员变量：
				1. **内置类型**（如 `int`, `float`等）可以C++98 就可直接类内初始化
				2. 其他类型需要类外初始化，但C++11 及以后支持类内初始化
				3. static const成员变量**共享且不可改**，即使类内初始化，若需要取`static const`成员的地址，仍需在类外**无初始化地定义**，即仅声明
		2. **编译期常量**解决方案：直接用非static const成员当数组长度会报错，编译时不知道值
			1. 使用`static const`：static const 是**类级常量**，所有对象共享，编译时确定值，合法
				`class HasArray { static const int size = 100; int array[size]; };`
			2. 用**匿名枚举**（兼容旧标准）：匿名枚举的常量是编译期确定的，无作用域污染，合法
				`class HasArray { enum { size = 100 }; int array[size]; };`
7. 使用**重载**`overload` 来**防止常量被篡改**
	1. 为 `at` 方法定义两个版本
	2. 一种版本会在处理常量实例时被调用，防止由于我们返回的是一个非常量引用，所以可以对其进行赋值
	3. 而另一种版本则会在处理非常量实例时被调用，防止如果我们返回的是一个常量引用，无法更新其中的元素
	```cpp
	template<class T>
	class Vector {
	public:
		const T& at(size_t index) const;
		T& at(size_t index);
	};
	```
8. 常量与非常量转换与适用
	1. **非const值可被当作const处理/转换**，如非const的a的地址可传给接受const指针的函数
	2. **const对象不能直接当作非const处理**，需要 `const_cast` 显式转换
	3. `const_cast` 允许忽略变量的 `const` 特性
		- 用法：`const_cast<target_type>(expression)`
		- `const_cast`会迫使编译器选择正确的重载形式
		- 何时使用 `const_cast`
			- **几乎从不使用**
			- 如果**需要可变**的值，那就**不要一开始就加上** `const`
			- `const_cast` 的合理使用情况**极为少见**
	4. 与 `const_cast` 类似，`mutable` 也能绕过 `const` 限制
## 5. 编译c++程序
1. C++ 是一种编译语言
2. 使用一种计算机程序叫做编译器
3. 一些流行的编译器包括clang和g++
4. 如何使用g++编译程序
	`g++ -std=c++23 main.cpp -o main`
	- `-std=c++23` 指定要编译的c++版本
	- `-o` 为可执行文件指定一个特定的名称
	- `main` 在这个例子中，它是`main`
# 三、流
## 1. 流
1. C++的一个**总体的** 输入输出(IO) **抽象**
2. **抽象**提供了一个一致的接口，在流的情况下，接口是用来读写数据的
3. `std::cout`流是`std::ostream` 的**实例**(instance) ,表示**标准输出流**
4. `std::cin`是**控制台**输入流, 是`std::istream` 的**实例**(instance) ,表示**标准输入流**
5. 流到底是什么
	![Pasted image 20250809152630](/blog/obsidian-assets/pasted-image-20250809152630-aead35b2ad.png)
6. **流的特征**
	- **逻辑接口统一**：无论底层是键盘、文件还是网络设备，都通过相同的流操作（输入/输出）交互
	- **传输方向固定**：输入流只能读，输出流只能写
	- **随机访问限制**：仅对文件流 `std::fstream` 通过  `seekg` / `seekp` 支持随机访问，标准流`std::cin` / `std::cout`不支持
## 2. 流和类型
1. ![Pasted image 20250809154725](/blog/obsidian-assets/pasted-image-20250809154725-862ca96f8a.png)
2. ![Pasted image 20250809154744](/blog/obsidian-assets/pasted-image-20250809154744-8da840d8a7.png)
3. 流允许一种**通用**的方式来**处理外部数据**
4. 对**不同类型**的流和**操作符**进行分类
	1. **输入流**是一种从源中读取数据的方式
		- 源自 `std::istream`
		- 例如从控制台读取某些内容 (`std::cin`)
		- 主要操作符: `>>`  称作 **提取操作符**(extraction operator/Extractor)
	2. **输出流** Extractor 是一种将数据写入目标的方式
		- 源自 `std::ostream`
		- 例如，向控制台输出一些东西 (`std::cout`)
		- 主要操作符: `<<`  称作 **插入操作符**(insertion operator/Inserter)
	3. 二者交集被称为iostream，它具有ostream和iststream的所有特性
	4. **操纵符** Manipulator ：**修改流的状态**，如格式，缓冲区等
5. 对**不同格式的流**分类
	1. **文本流** Text streams
		- 处理ASCII文本数据
		- 会进行字符转换，如换行符 `\n` 转换为对应操作系统的文件换行格式，Windows系统中 `\n` 转换为 `\r\n`
		- 适用场景：
			- 文本文件
			- 字符缓冲区
	2. **二进制流** Binary streams
		- 处理二进制数据，如图片、音频、结构体等
		- 不进行任何字符转换，直接读写字节
6. 流命名规范
	- 按输入/输出方向和用途场景分类，命名遵循前缀+stream

| 用途场景        | 输入流（读数据）        | 输出流（写数据）        | 头文件           | 核心用途                      |
| ----------- | --------------- | --------------- | ------------- | ------------------------- |
| 通用 I/O（控制台） | istream         |  ostream        | `<iostream>`  | 标准输入（cin）、标准输出（cout）的基类   |
| 文件 I/O      | ifstream        |  ofstream       | `<fstream>`   | 读取文件、写入文件                 |
| 旧式 C 字符串    |  istrstream     |  ostrstream     | `<strstream>` | 读取/写入 C 风格字符串（legacy，不推荐） |
| C++ 字符串     |  istringstream  |  ostringstream  | `<sstream>`   | 读取/写入  `std::string` （推荐） |

## 3. 字符串与字符串流
```cpp
#include <sstream>
void foo() {
	/// partial Bjarne Quote
	std::string initial_quote = "Bjarne Stroustrup C makes it easy to shoot yourself in the foot”;

	/// create a stringstream
	/// initialize stringstream with string constructor
	std::stringstream ss(initial_quote);

	/// since this is a stream we can also insert the `initial_quote` like this
	std::stringstream ss;
	ss << initial_quote;

	/// data destinations
	std::string first;
	std::string last;
	std::string language, extracted_quote;

	/// extracted_quote just gets the next word
	ss >> first >> last >> language >> extracted_quote;
	/// by this way it can get all the extra line
	std::getline(ss, extracted_quote);

	std::cout << first << " ” << last << " said this: ”<< language << " " <<
	extracted_quote << std::endl;
}
```
1. `std::stringstream` 是一个在标准库`<sstream>`中定义的**双向**字符串流类（能够同时支持输入和输出操作）
2. `istream& getline(istream& is, string& str, char delim)`
	- `getline()` 读取一个输入流`is`, 直到 `delim` 字符 并存储在**缓冲区**`str`
	- `delim` 字符**默认**是 `\n`
	- `getline()` **消耗**`delim` 字符
	- 对目标字符串 **覆盖**，而不是 **追加**
3. `std::string`
	1. 构造方法
		- **默认构造**：创建空字符串 `std::string s;`
		- **字面量初始化**：直接用字符串常量赋值（最常用）`std::string s = "Hello C++";`  或  `std::string s("Hello C++");`
		- **重复字符初始化**：指定字符cp重复len次 `std::string s(const char *cp, int len);`
		- **子串初始化**：从另一个字符串的指定位置截取子串`std::string s2(const string& s1, int pos, int len);`  → 从 s1 的索引pos开始，取len个字符（默认截取所有）
	2. 方法
		- **获取长度** `.size()` `.length()`, 返回值为 `size_t` 类型
		- **判断空串** `.empty()`
		- **访问单个字符** `[i]` 无越界检查 `.at(i)`有越界检查
		- 修改操作
			- **拼接** `+/+=` `.append(const string&a, length)`拼接a字符串的前length个字符
			- **替换** `.replace(pos, len, new_str)` 从pos开始，删除len个字符，替换为new_str 字符串
			- **插入** `.insert(pos, str)` 从pos开始插入str，原字符串后移
			- **删除** `s.erase(pos, len);`  → 从索引 pos 开始，删除 len 个字符（ len 省略则删除到末尾）
		- **子串提取** `.substr(pos, len)` 从pos(默认0)开始提取len个字符，**返回新字符串**
		- **搜索**：返回值均为  `size_t`  类型（无符号），未找到时返回  `std::string::npos`
			- **从前往后**搜索 `s.find(str, pos);`  → 从索引 pos 开始（默认0），正向搜索 str ，返回首次出现的起始索引
			- **从后往前**搜索 `s.rfind(str, pos);`  → 从索引 pos 开始（默认 `string::npos` ，即从末尾），反向搜索 str ，返回首次出现的起始索引
			- **前缀**（C++20） `s.start_with(str)`
			- **后缀**（C++20）`s.end_with(str)`
			- **搜索单个字符**：返回索引
				- **第一个** `s.find_first_of(ch)`
				- **最后一个** `s.find_last_of(ch)`
	3. `string` 类进行比较有两种方法
		1. `compare()`方法，返回**整数**，结果有 3 种可能：
			- `0`：两个字符串相等
			- 负数：当前字符串 < 参数字符串
			- 正数：当前字符串 > 参数字符串
		2. **`==`/`>`/`<`运算符**：返回**布尔值（`true`/`false`）**，只能表示条件是否成立
## 4. 输入输出流与预定义流对象
1. **输出流**
	1. 输出流中的字符在被刷新到目的地之前存储在**缓冲区**中，缓冲区中的内容在显式刷新之前不会显示在外部源上
	2. `std::cout`  是**行缓冲**的
		- 格式化输出时，需要结合`<iomanip>`头文件中的操纵符来控制格式
			1. **`setw(n)`**：设置输出宽度为`n`个字符（不足补空格，超出则全部输出）。
			2. **`left`/`right`**：设置左对齐或右对齐（默认右对齐）。
			3. **`fixed`**：固定小数位数（配合`setprecision`使用）。
			4. **`setprecision(n)`**：
			    - 不使用`fixed`时：控制有效数字位数。
			    - 使用`fixed`时：控制小数点后数字位数。
			5. **`showpoint`**：强制显示小数点（即使小数部分为 0）
	3. 使用 `std::flush` 来进行一次刷新
	4. `std::endl`
		- 也刷新缓冲区，即告诉`cout` stream 结束该行(**在缓冲区最后端加上`\n`后刷新缓冲区**)
		- 刷新是一项**代价高昂**的操作，可以使用`\n`代替`std::endl`的换行操作
		- 缓冲区**满**时会**自动刷新**
		- ![Pasted image 20250816223832](/blog/obsidian-assets/pasted-image-20250816223832-e52a6646fe.png)
		- 除非执行 `std::ios::sync_with_stdio(false)` ，否则写入 `\n` 无论如何都会导致刷新。这表明在许多标准输出中，'\n' 的行为与 std::cout 相同。此外，将`|`添加到我的程序中时，文件输出中 `\n` 并不会立即刷新缓冲区
	5. `cerr`和`clog`
		- `cerr`：无缓冲错误输出流（用于调试信息，即时显示）
		- `clog`：有缓冲错误输出流（用于日志信息，效率更高）
2. **输入流**
	1. `std::cin` 是缓冲的，用户存储一些数据于缓冲区中，然后它**从中读取**，缓冲区在**空白处停止**，包括`" "`,`\n`,`\t`
	2. 使用`getline()`去读取带空格的字符串
	3. **注意**：`std::cin`**保留**换行符，`getline()`**消耗**换行符
3. **输入流成员函数**：`istream` 类，用于读取数据
	1.  `get`
		1. **单字符读取并输出**
			- 语法： `int get()`
			- 特性：
				- 读取流中**单个字符**（含空白字符，如空格、换行）
				- **返回字符ASCII码**，无字符时返回 EOF （-1）
				- **不跳过任何字符**
		2. **单字符读取并存入**
			- 语法： `istream& get(char& ch)`
			- 特性：
				- 读取单个字符**存入 ch** （含空白字符）
				- 返回流引用，支持链式调用
				- 功能与 int get() 类似，仅存储方式不同
		3. **缓冲区读取**
			- 语法： `istream& get(char* buf, int limit, char delim='\n')`
			- 特性：
				- 最多读取 limit-1 个字符，留1位存空字符 '\0'
				- 停止条件：达字符上限或遇分隔符 delim, 默认换行
				- **不消耗分隔符**
				- **自动给缓冲区加空字符**
	4.  `getline` **读取一行**
		- 语法： `istream& getline(char* buf, int limit, char delim='\n')`
		- 特性：与三参数 get 类似，最多读 limit-1 个字符并加空字符
		- 区别：**消耗分隔符**，专门用于读取整行内容
	5.  `ignore` **跳过字符**
		- 语法：`istream& ignore(int limit=1, int delim=EOF)`
		- **停止条件**：跳过 limit 个字符或遇分隔符 delim
		- 遇分隔符时会一并跳过，常用于跳过无用字符
	6.  `gcount` **获取读取计数**
		- 语法： `int gcount()`
		- 特性：
			- 返回上一次读取操作（如 get 、 getline ）**实际读取的字符个数**
			- 仅对最近一次输入有效，新读取会覆盖计数
	7.  `peek`  **查看下一个字符**
		- 语法： `char peek()`
		- 特性：查看流中下一个字符，**不消耗该字符**，用于预判断下一个字符类型
	8.  `putback` **字符放回流中**
		- 语法： `istream& putback(char c)`
		- 特性：将单个字符 c 放回流中，**撤销一次读取**，下次可重读，通常只能放回最近一次读取的字符
4. **输出流成员函数**：ostream  类，用于写入数据
	1.  `put` **输出单个字符**
		- 语法： `ostream& put(char c)`
		- 特性：
			- 精准输出单个字符 c
			- 返回流引用，支持链式调用,如 `cout.put('a').put('b')`
	2.  `flush` **刷新缓冲区**
		- 语法：`ostream& flush()`
		- 特性：
			- 强制刷新流缓冲区,将未输出内容立即显示/写入文件
			- 不插入任何字符
			- 用于确保紧急内容即时输出
5. 预定义操纵符：修改流状态/格式，需包含 `<iomanip>`  头文件， `endl` / `flush`  除外）
	1.  `dec` / `hex` / `oct` **设置整数进制**
		- 语法： `cin >> dec;`  /  `cout << hex;`
		- 特性：
			- dec 十进制，默认、 hex 十六进制、 oct 八进制
			- 设置后**持续有效**，直到重置
			- **适用输入/输出流**
	2.  `endl` **换行+刷新**
		- 语法： `cout << endl;`
		- 特性：
			- 插入换行符 `'\n'` ，并强制刷新缓冲区
			- 等价于 `<< '\n' << flush` ，**仅适用输出流**
	3.  `flush` **仅刷新缓冲区**
		- 语法： `cout << flush;`
		- 特性：
			- 仅刷新缓冲区，不插入任何字符
			- 与输出成员函数 flush() 功能一致
			- **仅适用输出流**
	4.  `setw(int n)` **设置字段宽度**
		- 语法： `cout << setw(10) << "OK";`
		- 特性：
			- 设置字段宽度为 n
			- **单次生效**:仅对下一次I/O操作有效
			- **默认右对齐**，不足宽度用**空格**填充
			- **适用输入/输出流**
	5.  `setfill(char c)` **设置填充字符**
		- 语法： `cout << setfill('*') << setw(10);`
		- 特性：
			- 设置填充字符为 c **默认空格**
			- **设置后持续有效**
			- 需配合 setw 使用，否则无效果
			- 适用输入/输出流
	6.  `setbase(int b)` **设置整数进制**
		- 语法： `cout << setbase(16) << 255;`
		- 特性：
			- b 仅支持8/10/16（对应八/十/十六进制）
			- 效果与 oct / dec / hex 类似，更灵活
			- **仅适用输出流**
	7.  `ws` **跳过前导空白字符**
		- 语法： `cin >> ws;`
		- 特性：
			- **跳过输入流中所有前导空白字符**（空格、换行、制表符）
			- 用于读取字符串前跳过无用空格
			- **仅适用输入流**
	8.  `setprecision(int n)` **设置浮点数精度**
		- 语法： `cout << setprecision(2) << 3.1415;`
		- 特性：
			- 无 fixed / scientific 时， n 表示有效数字个数
			- 有 fixed / scientific 时， n 表示小数位数
			- **设置后持续有效**
			- **仅适用输出流**
	9.  `setiosflags(long f)`  **开启流标志**
		- 语法： `cout << setiosflags(ios::left | ios::showpos);`
		- 特性：
			- 开启指定流标志 f ，多个标志用 `|` 连接
			- 常见标志：
				- `ios::left` 左对齐
				- `ios::showpos` 显示正号
			- **设置后持续有效**
			- 适用输入/输出流
	10.  `resetiosflags(long f)` **关闭流标志**
		- 语法： `cout << resetiosflags(ios::left);`
		- 特性：
			- 关闭指定流标志 f
			- **仅关闭目标标志**，不影响其他标志
			- **适用输入/输出流**
## 4. **输入输出文件流**
1. 通过 `<fstream>` 头文件提供文件操作类
	- `ifstream`：输入文件流（只读）
	- `ofstream`：输出文件流（只写）
	- `fstream`：输入输出文件流（可读可写）
2. 使用`<<`运算符输出到文件中
3. 部分方法
	1. `is_open()`
		用于检查文件流是否已经打开，并且与文件关联。如果文件流成功打开或在构造时直接与文件关联，并且没有通过调用`close()`函数或销毁时解除关联，那么`is_open()`将返回`true`
	2. `open()`
		`void open(const char* filename, ios_base::openmode mode = ios_base::in | ios_base::out);` ,`filename`为要打开的文件路径 ,`mode`为打开模式
	3. `close()`
		用于关闭文件（或资源）的操作，释放该文件占用的系统资源
	4. `fail()`
		用于检查**最近的流操作是否失败**, 等价于 `if (!stream.fail())`
# 四、容器
## 1. 标准模板库STL简介
1. 所有C++容器都是**模版**
2. STL简介
	1. 由亚历山大·斯捷潘诺夫 ( Alexander Stepanov ) 创建
	2. 他为 C++ 添加了模板，并构建了一个著名的库。
	3. 这个库如今被称为**标准模板库**（STL）
3. STL组件
	- **容器**：存储数据（如 `vector`、`map`）
	- **迭代器**：连接容器与算法的 “桥梁”（如 `begin()`/`end()` 返回的迭代器）
	- **算法**：通过迭代器操作容器元素（如 `sort`、`find`）
	- **函数对象**：作为算法的参数，定制算法行为（如 `less`、自定义仿函数）
	- **适配器**：转换接口（如 `stack` 是容器适配器，`reverse_iterator` 是迭代器适配器）
		- **容器适配器**：基于标准容器封装而成的适配型容器，仅暴露特定接口以满足特定使用场景，不直接提供标准容器的全部功能，**其底层依赖一种基础容器实现存储**
		- **迭代器适配器**：核心定义：对标准迭代器进行**功能扩展或行为修改**的适配型迭代器，用于满足特殊遍历需求，**基于已有迭代器实现**，不改变底层数据存储，只改变遍历方式
	- **分配器**：为容器管理内存（如 `std::allocator`）
参考[C++ STL](/blog/notes/courses/course-cpp/c-plus-plus-stl)
## 2. 序列容器
1. 序列容器(Sequence Containers)用于存储**线性排列**的元素，但不一定是连续内存，如 `list` `forward_list` 为链表实现
2. `std:vector` `#include <vertor> `
	1. 操作
		1. 初始化空向量 `std::vector<int> v`
		2. 创建一个包含 n 个值为 $0$ 的的向量  `std::vector<int> v(n)`
		3. 创建一个包含 n 个值为 $k$ 的元素的向量 `std::vector<int> v(n,k)`
		4. 将 $k$ 添加到向量的末尾 `v.push_back(k)`
		5. 清空向量 `v.clear()`
		6. 检查向量 $v$ 是否为空  `if(v.empty())`
		7. 获取索引为 $i$ 的元素  `int k=v.at(i)` `int k=v[i]`
		8. 将索引为 $i$ 的元素替换为 $k$ `v.at(i)=k` `v[i]=k`
		9. 交换两个向量 `v1.swap(v2)`
		10. 重置 `v.resize(n,val)` val默认为0：改变vector中实际存储的元素个数，若n大于当前size，会自动构造新元素填充；若n小于当前size，会销毁超出部分的元素。最终vector的 size() 会等于n， capacity() 可能不变或增大
		11. 扩大capacity `v.reserve()` 仅预存容量capacity，不增大实际size
		12. 访问 **size**(大小) **capacity**（容量）`v.size()` `v.capacity()`
	2. 实现
		1. 在容量满时扩容（创建2倍大小后复制）
		2. **size**（大小）：指容器中**当前实际存储的元素个数**，通过 `size()` 函数获取
		3. **capacity**（容量）：指容器底层**已分配内存可容纳的最大元素个数**，通过 `capacity()` 函数获取，代表容器无需扩容就能容纳的元素上限。
3.  `std::list`   `#include <list>`
	1. 操作
		1. 初始化空双向链表  `std::list<int> lst`
		2. 创建含n个值为0的链表  `std::list<int> lst(n)`
		3. 创建含n个值为k的链表  `std::list<int> lst(n, k)`
		4. 头部插入元素k  `lst.push_front(k)`
		5. 尾部插入元素k  `lst.push_back(k)`
		6. 清空链表  `lst.clear()`
		7. 检查链表是否为空  `if(lst.empty())`
		8. 获取链表元素个数  `lst.size()`
		9. 删除头部元素  `lst.pop_front()`
		10. 删除尾部元素  `lst.pop_back()`
		11. **在迭代器it位置插入元素k**  `lst.insert(it, k)`
		12. **删除迭代器it指向的元素**  `lst.erase(it)`
		13. 获取头部元素 `lst.front()`
		14. 获取头部元素 `lst.back()`
		15. **删除值为k的所有元素** `lst.remove(k)`
	2. 实现
		- 基于**双向链表**存储（每个节点含数据、前驱指针、后继指针）
		- 插入/删除操作（非首尾需迭代器定位）仅修改指针指向，无需移动大量元素
		- 无连续内存空间，**不支持随机访问**（不能用 `[]` 或 `at()` 访问元素，需通过迭代器遍历）
		- 无容量概念，元素个数即实际存储数量，**无需扩容**
4. `std:deque` `#include <deque> `
	1. `std:vector`没有`push_front`操作，使用`deque`作为一种双端队列
	2. 队列（`deque`）与向量（`vector`）具有相同的接口，不同之处在于可以使用 **`push_front`/`pop_front`** 操作
	3. 通过**不连续内存**来存储数据，使用中央控制器和分段连续内存结构，**各段内存连续，整体逻辑连续**，**支持随机访问**（ `[]` 或 `at()` ），时间复杂度为$O(1)$，但效率略低于 `vector`
	4. `list` **插入/删除**元素时，仅**被删除节点的迭代器失效**，**其余**迭代器（包括指向其他节点的迭代器）**均保持有效**； `deque` 中间插入/删除或扩容（内存重新分配）时，**所有迭代器都会失效**，**仅两端插入/删除时迭代器通常保持有效**
5. 提示
	1. 尽可能使用 **基于范围(range-based)** 的写法
	```cpp
	//适用范围窄
	for(size_t i=0; i<=v.size(); i++){
		std::cout << vec[i] << std::endl;
	}

	//适用范围广
	for(auto elem : vec){
		std::cout << elem << std::endl;
	}
	```
	2. 尽可能使用`const auto&`这种写法，适用于所有可迭代容器（而不仅仅是 std::vector ），从而避免了`auto elem` 会**创建**容器中元素的**副本**，这对于大型类型带来显著的性能开销
	```cpp
	std::vector<MassiveType> vec = {{1}, {2}, {3}};
	//带来显著的性能开销
	for (auto elem : vec) {
	//...
	}

	for (const auto& elem : vec) {
	//...
	}
	```
	3. `[]`**不进行**类型检查
	4. **零开销原则** (Zero-overhead principle)
		零开销原则是 C++ 设计原则之一，其表述为：
		1. 你不用的东西不需要付出成本
		2. 你用的东西无法手工写出更高效的代码
## 3. 关联容器
1. 关联容器(Associative Containers)通过**独一无二**的键管理元素
2. `std::map` `#include <map>`
	1. 相当于一个Python字典
	2. 有时被称作**关联数组(Associative Array)**
	3. 操作
		1. 创建一个空的映射表 `std::map<char,int> m`
		2. 将键 $k$ 和值 $v$ 添加到映射表中 `m.insert({k,v})` `m[k]=v`
		3. 从映射中删除键 $k$ `m.erase(k)`
		4. 检查键 $k$ 是否在映射中 (^为C++20) `if(m.count(k))` **^**`if(m.contains(k))`
		5. 检查映射是否为空 `if(m.empty())`
		6. 获取或覆盖与键 $k$ 相关联的值（如果不存在则自动插入默认值） `int i=m[k]` `m[k]=i`
	4. 等价于存储了一组`std::pair<const k,v>`的集合
	5. 将 `map` 视为一个由`pair`组成的集合 可以使用基于范围的 for 循环遍历键值对
	```cpp
	std::map<std::string, int> map;
	for (auto kv : map) {
		// kv 是一个 std::pair<const std::string, int>
		std::string key = kv.first;
		int value = kv.second;
	}
	//结构化绑定技巧
	for(const auto& [key, value] : map){
		// key 类型为 const std::string&
		// value 类型为 const int &
	}
	```
	6. 实现：基于二叉搜索树实现（实际为**红黑树**），通过比较`k`类型的大小来插入，所以**需要**`k`有`<`操作符
	```cpp
	//OKAY - int 有操作符<
	std::map<int, int> map1;
	// ERROR - std::ifstream 没有操作符<
	std::map<std::ifstream, int> map2;
	```
3. `std::set` `#include <set>`
	1. `std::set`用于存储一组唯一的元素，约等价于`{...}`
	2. 操作
		1. 创建一个空集合 `std::set<char> s`
		2. 将 $k$ 添加到集合中 `s.insert(k)`
		3. 从集合中移除 $k$ `s.erase(k)`
		4. 检查 $k$ 是否在集合中（^为C++20） `if(s.count(k))` **^** `if(s.contain(k))`
		5. 检查集合是否为空 `if(s.empty())`
	3. `std::set`等价于没有值(key)的`std::map`
	4. 同样由二叉搜索树实现（红黑树）
4. `std::unordered_map`  `std::unordered_set` `#include <unordered_map>` `#include <unordered_set>`
	1. `std::unordered_map<k,v>`
		1. 作为`std::map`的优化版本，使用**哈希表**并用[分离链接法](/blog/notes/courses/course-data-structures-algorithms/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-hello-%E7%AE%97%E6%B3%95)处理哈希冲突, 传输`size_t`(64bit) 类型的键
		2. 需要$k$为**可哈希**的(大多数基本类型（`int`,`float`,`string`）默认情况下是可哈希的。)
		```cpp
		//OKAY -int is hashable
		std::unordered_map<int, int> map1;
		//ERROR - std::ifstream is not hashable
		std::unordered_map<std::ifstream, int> map2;
		```
		3. 使用**负载因子**判断是否需要哈希扩容, 可以在再哈希(rehash)之前通过参数 `max_load_factor` 控制负载因子的大小
		```cpp
		std::unordered_map<std::string,int> map;

		double lf = map.max_load_factor(); // 获取当前负载因子
		map.max_load_factor(2.0); // 设置最大负载因子
		// 现在，当负载因子超过 2.0 时，映射才会重新进行哈希操作
		// 几乎永远都不需要这样做
		```
	2. `std::unordered_set`等价于没有值(key)的`std::unordered_map`
	3. 何时使用 `unordered_map` 而非 `map`
		1. `unordered_map` 通常比 `map` 更快，但会占用**更多内存**
		2. 如果您的键类型**没有总顺序**（即没有 `operator<`），那么使用 `unordered_map`
		3. 如果非要选择的话，无序映射（`unordered_map`）较好
## 4. 容器适配器
1. STL 提供了三种主要的容器适配器：`stack`、`queue` 和`priority_queue`
2. `stack`：一种**后进先出（LIFO）** 的数据结构（**栈**），只允许在一端插入和删除元素
	1. 基础容器需包含以下成员函数：`empty()` `size()` `back()` `push_back()` `pop_back()`
	2. 满足条件的基础容器有 `vector`、`deque`、`list`
	3. 默认使用 `deque`
3. `queue` ：一种**先进先出（FIFO）** 的数据结构（**队列**），只允许在一端插入元素、另一端删除元素
	1. 基础容器需包含以下成员函数：`empty()`  `size()` `front()` `back()` `push_back()` `pop_front()`
	2. 满足条件的基础容器有 `deque`  `list` （ `vector`  因无  `pop_front()`  函数，不支持作为其基础容器）
	3. 默认使用  `deque`
3.  `priority_queue` ：优先队列，每次**删除操作仅移除优先级最高**的元素，默认最大元素优先（**大顶堆**）
	1. 基础容器需包含以下成员函数： `empty()`  `size()` `front()` `push_back()` `pop_back()`  ，且需**支持随机访问**以配合堆算法
	2. 满足条件的基础容器有  `vector` 、 `deque` （ `list`  因不支持随机访问，无法满足堆算法需求，不支持作为其基础容器）
	3. 默认使用  `vector` ，底层通过 STL 堆算法（如  `make_heap` 、 `push_heap` 、 `pop_heap` ）维护优先级
## 5. 数据结构总结
![352b8b15-fca1-4dc9-a1d5-f48706245473](/blog/obsidian-assets/352b8b15-fca1-4dc9-a1d5-f48706245473-7ebf4fcf5f.png)
- 更多数据结构
	- `std::array` 一种固定大小的项数组
	- `std::list` 一种双向链表
	- `std:：multiset`（+`unordered`） 一种可以包含重复项的集合
	- `std::multimap`（+`unordered`） 可以为同一键包含多个值
- 简要回顾：
	- 什么是 STL？什么是模板？ "The Standard Template Library"
	- **序列容器**: 以**线性方式**排列的元素 `std::vector`、`std::deque`
	- **关联容器**:  依据**唯一键**组织的元素集合 `std::map`、`std::set`、`std::unordered_map`、`std::unordered_set`
# 五、迭代器
## 1. 迭代器基础
1. **迭代器 Iterators 作用**
	- **作用**：作为容器与算法的桥梁，无需知晓容器底层实现，即可顺序访问元素，是**指针的泛化**
	- **设计意义**：遵循GOF设计模式，分离容器与算法，避免N种算法与M种数据结构的$N*M$次重复实现
		- GOF设计模式是由 Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides 四人组（简称GOF Group of Four）提出的23种软件设计经典模式，核心目标是解决软件设计中重复出现的**耦合、复用、扩展、维护**问题，提炼可落地的设计思想，让代码具备**高内聚、低耦合、可复用、可扩展**特性
2. **容器**(containers)和**迭代器**(iterators)协同工作，从而实现迭代操作
	1. **容器接口**
		- `container.begin()` 获取容器中**第一个**元素的迭代器（假设容器非空）
		- `container.end()` 获取一个超出了容器末尾的迭代器，即指向容器**末尾之后第一个**元素的迭代器
			- `end()`永远都不会指向任何元素，而是**指向了容器之外**的那一端
		- 如果容器为**空**，那么 begin() 和 end() 就是**相等**的
	2. **迭代器接口**
		- **复制构造** `auto it = c.begin();`
		- **递增** Increment 迭代器 `++it;`
		- **解引用** Dereference 迭代器  若 `it` 等于末尾则未定义 `auto& elem = *it;`
		- **相等性** Equality：是否处于同一位置 `if (it ==/!= c.end())`...
3. **自定义迭代器**例子
	```cpp
	// 模板类 ListIter：适配 List 容器的自定义迭代器，用于顺序访问链表元素
	template<class T>
	class ListIter {
	    // 指向链表节点（ListItem）的指针，记录当前迭代器位置
	    ListItem<T> *ptr;

	public:
	    // 构造函数：支持默认初始化或传入节点指针初始化
	    // 参数 p：待关联的链表节点指针，默认值为 0（空指针）
	    ListIter(ListItem<T> *p=0) : ptr(p) {}

	    // 前置递增运算符重载：迭代器移动到下一个链表节点
	    // 返回值：自身引用,支持链式操作，如++iter1 == ++iter2
	    ListIter<T>& operator++()
	    {
	        ptr = ptr->next();  // 调用节点的 next() 方法，更新指针到下一个节点
	        // 返回当前调用成员函数的迭代器本身，支持连锁
	        return *this;
	    }

	    // 相等运算符重载：判断两个迭代器是否指向同一个链表节点
	    bool operator==(const ListIter& i) const
	    { return ptr == i.ptr; }

	    // 解引用运算符重载：访问当前节点存储的元素值
	    // 返回值：元素的引用T&，支持读写操作
	    T& operator*() { return ptr->val(); }

	    // 箭头运算符重载：支持通过迭代器直接访问元素的成员
	    // 先解引用迭代器得到元素，再取其地址返回
	    // *this得到元素，再用*方法得到val，最后返回val的地址
	    // 编译器在处理 it->member 时，会先调用 it.operator->() 得到一个指针 p，然后自动转换成 p->member
	    T* operator->() { return &(**this);}
	};
	```
4. 两种等价的**遍历**
	```cpp
	for(auto elem : s){
		std::cout << elem << std::endl;
	}

	auto begin = s.begin();
	auto end = s.end();
	for(auto it = begin; it != end; it++){
		auto elem = *it;
		std::cout << elem << std::endl;
	}
	```
5. 使用 `auto` 关键字可以避免详细写出冗长的迭代器类型
	```cpp
	std::map<int, int> m { {1, 2}, {3, 4}, {5, 6}};
	auto it = m.begin();
	auto elem = *it; // {1, 2}

	// 全名
	std::map<int, int> m { {1, 2}, {3, 4}, {5, 6}};
	std::map<int, int>::iterator it = m.begin();
	std::pair<int, int> elem = *it;
	```
6. 使用`using`创造类型别名实例：`iterator`**实际为嵌套类型**
	```cpp
	// C++ 标准库中 <map> 头文件的内部实现（简化版）
	template <typename K, typename V>
	class std::map {
		using iterator = /* some iterator type */;
	};

	// 在 <map> 头文件外部（例如在 `main.cpp` 中）使用 std::map 时的写法
	std::map<int, int>::iterator it = m.begin();
	```
7. 使用`++it`而非`it++`
	- `++it`避免了不必要的复制操作
	- `Iterator` 是一个完整的对象，因此复制它通常比复制诸如`int`之类的对象要更耗费资源
	```cpp
	// 前置 ++it
	// 对其进行递增操作并返回指向同一对象的引用
	Iterator& operator++();
	// 后置 it++
	// 对其进行递增操作并返回旧值的副本
	Iterator& operator++(int);
	```
8. 提取`value_type`
	1. 在STL的算法设计中，算法需要明确迭代器指向的数据类型
	2. `typedef` 暴露 `value_type`
		- 自定义迭代器是类模板，可以直接在类内部通过 `typedef` 定义`value_type`，让算法直接提取
		- **实现方式**：自定义迭代器中嵌入`typedef`
			```cpp
			// 自定义迭代器：通过typedef暴露value_type
			template <class T>
			struct myIter {
				// 对外声明指向T类型数据
			    typedef T value_type;
			    T* ptr;
			    myIter(T* p = 0) : ptr(p) {}
			    T& operator*() { return *ptr; }
			};
			```
		- **提取方式**：直接通过`I::value_type` ，算法通过模板参数I，直接访问  I::value_type  即可获取数据类型
			```cpp
			// 算法通过 I::value_type 提取数据类型
			template <class I>
			typename I::value_type func(I iter) {
			// typename 声明是类型（避免编译器误解为成员变量）
			    return *iter;
			}
			```
		- **缺点**：**原生指针无法通过typedef暴露类型**
			- 原生指针（ int* 、 double* 、 const int* ）本质上是天然迭代器
			- 但原生指针不是类模板，没有typedef成员。如果算法只能通过  I::value_type  提取类型会编译报错
	3. `iterator_traits` **特征萃取机**
		1. **思想**：`iterator_traits`迭代器特征萃取机通过**模板特化**，为自定义迭代器和原生指针提供统一的`value_type`提取接口
		2. **步骤**
			1. **定义iterator_traits主模板**，**处理自定义迭代器**
				主模板Primary Template针对有`value_type`成员的自定义迭代器，直接提取其`value_type`：
				```cpp
				// iterator_traits 主模板
				template <class I>
				struct iterator_traits {
				    // 直接提取迭代器I的value_type成员
				    typedef typename I::value_type value_type;
				};
				```
			2. **模板特化**：处理原生指针`T*` 和`const T*`
				通过**模板偏特化** Partial Specialization，为原生指针单独定义`value_type`，直接将  value_type  指定为指针指向的类型：
				```cpp
				// 模板偏特化1：处理非const原生指针（T*）
				template <class T>
				struct iterator_traits<T*> {
				    typedef T value_type;
				    // 指针T*指向的数据类型是T
				};

				// 模板偏特化2：处理const原生指针（const T*）
				template <class T>
				struct iterator_traits<const T*> {
				    typedef T value_type;
				    // 即使指针是const，数据类型依然是T
				};
				```
				`const T*` 的value_type是T而非const T,因为算法通常需要**读取**元素类型，**而非修改**， **const是指针的属性**，不是元素的核心类型
			3. 使用traits,**统一提取逻辑**
				算法不再直接访问`I::value_type` ，而是通过`iterator_traits<I>::value_type`提取，自定义迭代器还是原生指针逻辑一致：
				```cpp
				// 通用函数：通过traits提取value_type，适配所有迭代器
				template <class I>
				typename iterator_traits<I>::value_type func(I iter) {
				    return *iter;
				}
				```
			3. **STL标准traits包含类型**
				- `iterator_category` 迭代器类型
				- `value_type` 数据类型
				- `difference_type` 迭代器间距类型
				- `pointer` 指针类型
				- `reference`  引用类型
## 2. 迭代器类型
1. 操作
	1. 共有操作
		- `auto it = c.begin();`
		- `++it;`
		- `*it;`
		- `it == c.end()`
	2. 部分特有操作
		- `--it;` // 向后移动
		- `*it = elem;` // 修改
		- `it += n;` // 随机访问
		- `it1 < it2` // 比较是否在前
2. 迭代器类型决定了其功能特性
	![d8771f72-9346-484b-b485-9f1b30e58bd1](/blog/obsidian-assets/d8771f72-9346-484b-b485-9f1b30e58bd1-ca554a9687.png)
	1. **输入迭代器** Input Iterators
		- 最基本的迭代器类型
		- 使我们能够**读取元素**
		- `auto elem = *it`
		- `operator->` 如果元素是一个结构体，我们可以通过 `->` 来访问其成员
			- `int m = (*it).zarf;` ` int m = it->zarf;`// 二者完全相同
	2. **输出迭代器** Output Iterators
		- 使我们能够**更改元素**
		- `*it=elem`
	3. **前向迭代器** Forward Iterators
		- 一种输入迭代器**增强版本**，它使我们能够进行**多次遍历**操作 (多次从头开始遍历，或在遍历过程中回退重走)
		- 所有 STL 容器的迭代器都属于这里所描述的类别
		- **多轮保证机制** `it1 == it2 ` 则 `++it1 == ++it2 ` 这个特性保证了前向迭代器的 “可重复性”
		- 部分数据结构可能不需要使用多步迭代器，如`streams`
			- 流的内容是**一次性的**
	4. **双向迭代器** Bidirectional Iterators
		- 使我们能够向前和向后移动访问
		- 如`std:map`  `std::set`
			>`auto it = m.end()`
			>`--it;//获取最末尾元素`
			>`int elem = *it;`
	5. **随机访问迭代器** Random Access Iterators
		1. 使我们能够快速向前和向后遍历
		2. 如`std::vector` 和 `std::deque`
		3. 注意不要超出界限，否则会导致未定义行为
			>`auto it2 = it + 5; // 5 ahead`
			>`auto it3 = it2 - 2; // 2 back`
			>`// Get 3rd element` `auto& second = *(it + 2);`
			>`auto& second = it [2];`
	6. 要点
		1. 为什么要注意类型
			- 如`sort`等特定算法需要特定类型的迭代器
		2. 为何要有多种迭代器类型
			- 目标：为所有容器提供统一的抽象概念
			- 注意事项：容器的实现方式会影响你对其进行迭代的方式
				- 进行**随机访问**操作时，使用**序列容器**，如`std::vector` 和 `std::deque`时要**比使用关联容器**，如`std:map`  `std::set`，**更容易/更快**
				- C++ **从设计上避免为你提供速度较慢的方法**，这就是为什么你不能对`std::map iterator`进行随机访问的原因
		![b924bdc7-88e5-4d5a-9c76-0aa224d5d913](/blog/obsidian-assets/b924bdc7-88e5-4d5a-9c76-0aa224d5d913-c4f76269b0.png)
## 3. 特殊指针和内存管理
1. 一个**迭代器**指向**容器**中的**一个元素**，而一个**指针**则指向**任何对象**
2. 内存基础
	1. 每个变量都存在于内存中的某个位置。任何可能存放变量的位置共同构成了**地址空间**(address space)
	2. 内存通常是按字节进行寻址的，每个字节的编号从 $0$ 开始，$1$ 个字节(byte)等于 $8$ 位(bit)
	3. 对象的地址是指其**最低字节**所在的位置
		- c++规定`char`总是使用 $8$ 位（即 $1\ byte$ ）
		- ![79f8913c-e78b-4504-a205-3d9b67caf082](/blog/obsidian-assets/79f8913c-e78b-4504-a205-3d9b67caf082-53f04a6cd8.png)
3. `size` 和 `capacity`
	1. `size`元素个数：**所有容器都有**，表示**实际存储**的元素个数
	2. `capacity`容量：**仅连续/预分配内存容器有**，表示**当前内存能容纳的最大元素数**，无需重新分配，**离散内存容器没有**`capacity`接口
	3. `resize(n, val)` 核心逻辑：对比目标长度 n 与当前 size
		- 若  `n < size` ：删除容器末尾的元素，直到 size 等于 n ，**从尾部截断**
		- 若  `n > size` ：在容器末尾追加元素，直到 size 等于 n ；追加的元素由第二个参数 val 指定，若未指定，则用默认初始化值
		- 若  `n == size` ：无任何操作
	4. `shrunk_to_fit()` 将容量capacity缩减至与实际元素个数size一致
		- 仅使用连续内存/预分配内存容器可用 如 `vector` `deque` `string`
4. 指针基础
	1. 指针就是**变量的地址**
	2. `std::vector`是一个连续的数组，可以使用指针加减来访问
		1. 迭代器具有与指针**相似的接口**
		2. `T*` 是 `vector<T>` 类型迭代器的底层类型(理解层面上是)
		```cpp
		   template <typename T>
		   class vector {
			   using iterator = T*;

			   // Implementation details...
		   }
		   ```
5. `new` 与 `delete`
	1. 作用
		1. `new`
			- 先**分配足够的内存**以便容纳所需类型的对象
			- 再**调用构造函数**初始化内存中的对象
		2. `delete`
			1. 先**调用析构函数**
			2. 再将**释放**对象所占的**空间**
	2. 如果**没有默认构造函数**，我们必须在new一个对象时**给予初始值进行初始化**，也**不能申请连续的多个空间**
	3. 单个int对象 `new`/`delete`
		- `new` 分配： `int* singleInt = new int(10);` 分配单个int并初始化为10
		- `delete` 释放： `delete singleInt; singleInt = nullptr;` 释放内存后置空，避免野指针
	4. 1维int数组 `new[]`/`delete[]`
		- `new[]`分配： `int* oneDArr = new int[arrSize];` 分配长度为 `oneDArr` 的int数组
		- `delete[]`释放： `delete[] oneDArr; oneDArr = nullptr;`
	5. 2维int数组 `new[]`嵌套/`delete[]`嵌套
		- `new[]`分配：
			2.  `int** twoDArr = new int*[rows];`  先分配行指针数组
			3.  `for (int i = 0; i < rows; i++) { twoDArr[i] = new int[cols]; }`  为每行分配列元素数组
		- `delete[]`释放：
			1.  `for (int i = 0; i < rows; i++) { delete[] twoDArr[i]; }`  先释放每行的列元素
			2.  `delete[] twoDArr; twoDArr = nullptr;`  再释放行指针数组
	6. 注意事项
		1. 不要使用`delete`来释放`new`未分配的内存
		2. 不要使用`delete`连续两次释放相同的内存块
		3. 如果使用`new[]`分配数组，请使用`delete[]`
		4. 如果使用`new`分配单个实体，请使用`delete`（无括号）
		5. 对空指针应用`delete`是安全的（不会发生任何事情）
		6. 不要混合使用`new`/`delete`和`malloc`/`free
6. `::operator new` 和 `::operator delete`
	1. `::operator new`
		1. `new` 操作符调用 `operator new` 函数来完毕必需的内存分配，你可以重写或重载这个函数来改变它的行为
		2. `operator new`**只返回原始内存**（`void*`），需手动调用构造函数
		3. 函数 operator new 通常这样声明：`void * operator new(size_t size);`
			- 返回值类型是`void*`
			- `size_t`确定分配多少内存
			- 还存在nothrow版本，失败返回nullptr，不抛异常
				`void* operator new(std::size_t size, const std::nothrow_t&) noexcept;`
		4. 可以添加额外的参数重载函数 operator new，可是第一个参数类型必须是`size_t`
		5. 如果用`new[]`创建数组，底层会调用`operator new[]`：分配数组所需的总内存，会额外分配几个字节存数组长度，用于`delete[]`时遍历析构
	2. `::operator delete`
		1. 全局`operator delete`原型：
			- 释放普通operator new分配的内存
				`void operator delete(void* ptr) noexcept;`
			- 释放nothrow版operator new分配的内存（参数匹配）
				`void operator delete(void* ptr, const std::nothrow_t&) noexcept;`
		2. 释放时调用`operator delete[]`，释放数组内存
		3. `operator delete`**只释放内存**，需**先手动调用析构函数**，且内存分配 / 释放要匹配
	3. `operator new`分配的内存必须用`operator delete`释放，不能用`free`，`malloc`分配的内存不能用`operator delete`释放
7. `void*` 无类型指针/通用指针
	1. `void*`是 C/C++ 中的一种**特殊指针类型**，可以指向**任意数据类型**的内存，但本身不携带指向的数据类型信息
	2. **特性**
		1. **通用性**：可接收任意类型指针的赋值，无需强制转换，C++/C 均支持隐式转换
		2. **不可直接解引用**：因为不知道指向的数据类型，无法确定内存大小和解析方式
		3. **不可直接指针运算**：指针运算需要知道数据类型的大小，`void*`无此信息
		4. **转换规则**：`void*`C++转其他类型指针必须显式强制转换，C 可隐式
	3. `void*`一般用于**处理类型无关的原始内存**
8. `size_t` 尺寸类型
	1. `size_t`是 C/C++ 标准定义的**无符号整数类型**，本质是`typedef`定义
		- 32 位系统：通常是`unsigned int`（4 字节，取值范围 $0\sim 2^{32}-1$）
		- 64 位系统：通常是`unsigned long long`（8 字节，取值范围 $0\sim 2^{64}-1$）
	2. 定义在`<cstddef>`（C++）/`<stddef.h>`（C）头文件中，核心用途是**表示对象的大小或数组的索引/长度**
	3. **特性**
		1. **无符号性**：**只能表示非负数**，不能存储负数，赋值负数会导致溢出
		2. **平台无关性**：自动适配不同平台的位数，避免硬编码unsigned int导致的移植问题
		3. **标准关联性**：`sizeof`运算符的返回值类型就是`size_t`；`operator new`/`malloc`的参数类型也是`size_t`
	4. `size_t`是处理大小/索引的标准类型，比`int`更安全、更通用
## 4. static extern
1. `static` 关键字
	1. **静态全局变量**/**函数**：文件级
		1. **作用域限制**：被修饰的全局变量、函数**仅在当前 `.cpp` 文件内可见**，其他文件**无法通过 `extern` 访问**，避免同名冲突
		2. 示例： `static int g_val = 10;` 仅当前文件可使用 `g_val`
	2. **静态局部变量**：函数级
		1. **生命周期延长**：变量从函数调用时创建、结束时销毁变为**程序启动时创建、结束时销毁**，**但作用域仍限于函数内部**
		2. **值不重置**：函数多次调用时，变量会**保留上次的值**，不会重新初始化，可以用于单例模式
		3. 示例：函数内 `static int count = 0; count++;`，每次调用函数 `count` 都会累加
	3. **静态类成员**：类级
		1. **静态成员变量**：
			- **所有类对象共享**同一份数据，不属于某个具体对象
			- C++11前必须在**类外单独初始化**（`type_name class_name::val_name = val;` ），静态常量字面量变量可以类内初始化，见[常量](/blog/notes/courses/course-cpp/cs106l-and-oop)
		2. **静态成员函数**：
			- 无 `this`指针，**只能访问类的静态成员**（静态变量/静态函数），不能访问非静态成员
			- 可通过`class_name::fun_name`直接调用，无需创建对象
			- 语法上允许**通过对象的`.`运算符调用**，但这只是 C++ 的兼容语法，静态成员函数本质属于**类本身**，更规范、更推荐的方式是通过`::`调用
		3. **访问方式**：
			- **类名直接访问**： `StatMem::count` 、 `StatFun::showCount()`
			- **对象访问**： `StatMem obj;` `obj.count` 语法允许，但不体现类级共享特性
	4. **静态对象**（函数内/全局），类似变量，即为**类形式的变量**
		1. **函数内静态对象**
			- 示例：
				```cpp
				void f(int x) {
				  if (x > 10) {
				    static X my_X(x, x*21); // 仅当x>10且第一次满足时构造
				  }
				}
				```
			- 关键：条件构造时，**仅第一次满足条件时创建**，之后即使再次满足也不重复构造；值一直保留
		2. **全局静态对象**
			- 示例： `static X global_x(12, 34);` （`.cpp`文件中定义）
			- **构造顺序**：同一 `.cpp` 文件内的全局静态对象，**按代码中定义的顺序依次构造**
			- **析构顺序**：无论构造顺序如何，析构始终遵循**后进先出**（LIFO），最后构造的对象最先析构，最先构造的对象最后析构
	5. `static` **不能直接修饰结构体定义**，**结构体定义**（如 `struct X { ... };`）是在声明一个**数据类型**，不是变量 / 函数实体，存储类关键字**仅用于变量 / 函数**，因此 `static` 对类型本身无任何意义，编译器会直接报错
2. `extern` 关键字
	1. **修饰全局变量**（跨文件访问）跨文件共享全局变量：
		- 在一个 `.cpp` 中定义（如 `int g_val = 10;` ），分配内存
		- 在**其他文件**用 `extern int g_val;` 声明，不分配内存，仅告诉编译器变量在别处
		- **注意**： `extern` 声明时**不能初始化**
	2. **修饰函数**（跨文件访问）跨文件调用函数：
		- 通常在头文件用 `extern int add(int a, int b);` 声明（ extern 可省略 ），其他文件包含头文件即可调用
	3. `extern "C"` （C++调用C函数）：解决C/C++函数名修饰差异：
		- 当C++要调用C语言编译的函数时，用 `extern "C" { #include "c_lib.h" }` 包裹；作用是让C++编译器按C语言规则查找函数名，避免因编译规则不同找不到函数
3. **单例模式**
	1. **定义**：单例模式是一种**创建型设计模式**，保证一个类在程序运行期间**只有一个实例对象**，并且提供一个全局统一的访问入口来获取这个实例
	2. **约束**
		1. **私有构造函数**：禁止外部通过`new`或直接声明对象的方式创建实例
		2. **禁用拷贝构造和赋值运算符**：防止通过拷贝 / 赋值创建新实例
		3. **静态访问方法**：提供一个静态成员函数，作为全局访问点来创建 / 返回唯一实例
	3. **实现方式**
		1. **饿汉式** Eager Initialization
			- **思想**：程序启动时，即**静态变量初始化阶段就创建好实例**，饿意味着提前初始化，不等待使用
			- **优点**：天然**线程安全**，静态变量初始化在主线程执行前完成，**实现简单**
			- **缺点**：如果实例创建成本高且全程未使用，会**浪费资源**。无法处理**多单例间**的**初始化顺序依赖**
			- 样例
				```cpp
				class SingletonEager {
				private:
				    // 1. 私有构造函数：禁止外部创建实例
				    SingletonEager() { }
				    // 2. 禁用拷贝构造和赋值运算符
				    SingletonEager(const SingletonEager&) = delete;
				    SingletonEager& operator=(const SingletonEager&) = delete;
				    // 3. 静态成员变量：程序启动时初始化，唯一实例
				    static SingletonEager* instance;
				public:
				    // 4. 静态访问方法：返回唯一实例
				    static SingletonEager* getInstance() {
				        return instance;
				    }
				};
				// 静态成员变量在类外初始化, 程序启动时执行
				SingletonEager* SingletonEager::instance = new SingletonEager();

				// 主函数访问方法
				SingletonDCLP* s1 = SingletonDCLP::getInstance();
				```
		2. **懒汉式：基础版**
			- **思想**：懒即延迟初始化，只有第一次调用`getInstance()`时才创建实例，避免资源浪费
			- **优点**：按需创建，节省资源
			- **缺点**：**线程不安全**，多线程环境下，多个线程同时调用`getInstance()`会创建多个实例，破坏单例特性
			- 样例
				```cpp
				class SingletonLazyUnsafe {
				private:
				    SingletonLazyUnsafe() {}
				    SingletonLazyUnsafe(const SingletonLazyUnsafe&) = delete;
				    SingletonLazyUnsafe& operator=(const SingletonLazyUnsafe&) = delete;
				    static SingletonLazyUnsafe* instance; // 初始化为nullptr
				public:
				    static SingletonLazyUnsafe* getInstance() {
				        // 第一次调用时创建实例
				        if (instance == nullptr) {
				            instance = new SingletonLazyUnsafe();
				        }
				        return instance;
				    }
				};

				// 静态成员变量初始化为nullptr
				SingletonLazyUnsafe* SingletonLazyUnsafe::instance = nullptr;

				// 主函数访问方法
				SingletonDCLP* s1 = SingletonDCLP::getInstance();
				```
		3. **懒汉式：加锁版**
			- **思想**：在`getInstance()`中**加互斥锁**，保证同一时刻只有一个线程能进入实例创建逻辑
			- **优点**：解决线程安全问题
			- **缺点**：每次调用`getInstance()`都要加锁 / 解锁，性能开销大，即使实例已创建
			- 样例
				```cpp
				class SingletonLazySafe {
				private:
				    ... // 与基础版相同
				    static mutex mtx; // 全局互斥锁

				public:
				    static SingletonLazySafe* getInstance() {
				        // lock_guard自动加锁/解锁，避免死锁
				        lock_guard<mutex> lock(mtx);
				        if (instance == nullptr) {
				            instance = new SingletonLazySafe();
				        }
				        return instance;
				    }
				};

				SingletonLazySafe* SingletonLazySafe::instance = nullptr;
				mutex SingletonLazySafe::mtx; // 初始化互斥锁

				// 主函数访问方法
				SingletonDCLP* s1 = SingletonDCLP::getInstance();
				```
		4. **双重检查锁**（DCLP, Double-Checked Locking Pattern）
			- **思想**：两次检查instance是否为空，第一次检查避免实例已创建时的锁开销，第二次检查保证线程安全
			- **注意**：C++11 前new可能存在指令重排，导致其他线程拿到未初始化的实例，需用`std::atomic`规避
			- **优点**：兼顾线程安全和性能，仅第一次创建实例时加锁
			- **缺点**：实现稍复杂，C++11 前有可能出错
		5. Meyers 单例
			- **思想**：利用 C++11 标准中**局部静态变量的线程安全特性**，**局部静态变量在第一次调用时初始化**，且初始化过程线程安全
			- **优点**：代码极简、线程安全、按需创建、自动析构
			- **初始化**：可以通过**判断变量值的状态**来只进行一次初始化
			- 样例
				```cpp
				class SingletonMeyers {
				private:
				    // 私有构造函数
				    SingletonMeyers() {}

				    // 禁用拷贝和赋值
				    SingletonMeyers(const SingletonMeyers&) = delete;
				    SingletonMeyers& operator=(const SingletonMeyers&) = delete;

				public:
				    // 静态访问方法：返回局部静态变量（唯一实例）
				    static SingletonMeyers& getInstance() {
				        static SingletonMeyers instance; // C++11起初始化线程安全
				        return instance;
				    }
				};

				// 主函数访问方法
				// 注意：返回的是引用，不是指针
				SingletonMeyers& s1 = SingletonMeyers::getInstance();
				```
# 六、类
## 1. 类与作用域解析符
1. 为什么需要类(class)
	- C 没有对象(object)
	- 无法对数据进行封装(encapsulating)，也无法执行对数据的操作函数
	- 没有面向对象编程（OOP）的设计模式
2. 什么是面向对象编程(object-oriented-programming OOP)
	- 面向对象编程是以**对象为核心**展开的
	- 它侧重于**类的设计与实现**
	- 类是**用户自定义的类型**，可以被声明为一个对象
	- 面向对象编程（OOP）基础概念
		1. **对象交互**：对象通过发送/接收消息协作，消息由发送方构建、接收方解析，最终通过成员方法实现；消息可能返回结果，也可能导致接收方状态改变，即副作用
		2. **封装**：将数据与操作该数据的方法捆绑在对象内，隐藏数据和操作细节，仅通过公开方法对外提供访问接口
		3. **抽象与模块化**：抽象忽略问题细节、聚焦高层逻辑；模块化将整体拆分为定义清晰的部分，各部分可独立构建、按规则交互
3. `struct`和`class`的区别
	- **默认访问权限**：
		- `struct` 的成员默认是 `public`
		- `class` 的成员默认是 `private`
	- **默认继承方式**：
		- `struct` 作为基类时，默认采用 `public` 继承
		- `class` 作为基类时，默认采用 `private` 继承
4. **作用域解析符** `::`
	1. `::` 前面**空着**时，默认指向**全局作用域**；`::` 前面有**命名空间 / 类名**时，指向**对应作用域**
	2. 访问**全局作用域**中的标识符 `::a`
		作用：穿透当前作用域（类/局部），调用被隐藏的全局变量/函数，或基类被覆写的成员
		```cpp
		const int a = 10; // 全局a
		class A {
			public:
				const int a=6;
		}
		class S ：A { // 继承A，存在变量名为a
			public:
				void show() {
				    cout << ::a; // 访问被隐藏的全局a（输出10）
					cout << Animal::speak(); // 调用基类被覆写的函数
				}
				const int a=5;
		};

		std::cout << a << std::endl // 输出全局变量a=10
				<< S.a << std::endl // 输出S类成员变量a=5
				<< S.A::a << std::endl; // 输出S类继承的A类成员变量a=6
		```
	3. **类外部定义成员函数**
		作用：明确函数所属的类，避免被识别为全局函数。类内声明，类外实现时使用
		```cpp
		class Car { public: void run(); }; // 类内声明
		void Car::run() { cout << "Running"; } // 类外定义，::标所属类
		```
	4. 访问**静态成员**变量/函数
		作用：静态成员属于类本身而非对象，需用  类名::  调用/初始化
		```cpp
		class Counter {
		public:
		  static int count; // 静态变量
		  static void add() { count++; } // 静态函数
		};
		int Counter::count = 0; // 静态变量类外初始化（必加::）
		// 调用：Counter::add(); cout << Counter::count;
		```
	5. 继承中调用被覆写的基类函数
		作用：派生类覆写基类函数后，强制调用基类的原始版本
		```cpp
		class Dog : public Animal {
		  void speak() {
		    Animal::speak(); // 调用基类被覆写的speak()
		    cout << "Bark";
		  }
		};
		```
6. 头文件(`.h`)和源文件(`.cpp`)区别

|      | 头文件（.h）                | 源文件（.cpp）                      |
| ---- | ---------------------- | ------------------------------ |
| 用途   | 定义接口                   | 实现类的函数                         |
| 包含内容 | 函数原型、类声明、类型定义、宏、常量     | 函数实现、可执行代码                     |
| 访问方式 | 跨源文件共享                 | 被编译为目标文件                       |
| 示例   | `void someFunction();` | `void someFunction() { ... };` |
7. .h 和 .cpp 文件协作
	1. 分工规则
		- 头文件（.h）：存放**声明**，作为代码的接口，包括：类的定义（成员变量/函数原型）、函数原型、全局变量声明（需加 extern ）
		- 源文件（.cpp）：存放**定义**，实现头文件中声明的内容，是编译器的编译单元，每个 .cpp 单独编译生成 .obj 文件
	2. 头文件规则
	4. 构造Makefile&CMake文件
8. 类设计
	1. 构造函数
		1. **作用**：初始化新创建对象
		2. **定义**：构造函数的语法是**类的名称**
		3. 在`.cpp`文件中，定义成员函数时需要**将类用作命名空间**
		4. **默认构造函数**（Default Constructor）
			- **定义**：能**无需传入任何参数**就调用的构造函数，才是默认构造函数。包括：无参构造函数、所有参数都有默认值的构造函数
		6. **初始化列表**：在构造函数参数列表后、函数体前用 `:` 引出使用，见[初始化列表](/blog/notes/courses/course-cpp/cs106l-and-oop)
		7. **存储分配**
			1. **内存**分配时机：编译器会在**作用域的左大括号**`{`处，为该作用域内所有需要的存储（包括变量、对象、数组等）**完成分配**
			2. **构造函数执行**时机：内存分配后，构造函数**不会立即调用**，仅在**对象被定义的序列点**才会**执行**（比如作用域内某行代码明确定义 `X x1;` 时，才调用X的构造函数）
			3. 需要**避免**因**跳转语句**（如goto）**跳过构造函数调用**
		6. 构造函数**重载**：只要有自己定义的构造函数，系统就**不会产生默认**构造函数，需要自己定义
	2. 私有成员函数/变量
	3. 公有成员函数（面向用户的接口）
	4. 析构函数
	5. 其他[特殊成员函数](/blog/notes/courses/course-cpp/cs106l-and-oop)
	6. **示例**
		```cpp
		///.h文件内容
		#include <string>
		class StanfordID {
		private:
			std::string name;
			std::string sunet;
			int idNumber;
		public:
			// constructor for our student
			StanfordID(std::string name, std::string sunet, int idNumber);
			// method to get name, sunet, and idNumber, respectively
			std::string getName();
			std::string getSunet();
			int getID();
		}
		///.cpp文件内容
		#include “StanfordID.h”
		#include <string>
		```
		- 构造函数部分
			- 编译器会根据输入的信息确定我们想要使用哪一种构造函数
		```cpp
		//构造函数

		//使用this关键字来消除你所指的“name”的歧义
		StanfordID::StanfordID(std::string name, std::string sunet, int idNumber) {
			this->name = name;
			this->state = state;
			this->age = age;
		}
		// 列表初始化构造函数,类似于统一初始化
		StanfordID::StanfordID(std::string name, std::string sunet, int idNumber):
		name{name}, sunet{sunet}, idNumber{idNumber} {};

		//如果我们不传入任何参数调用构造函数，就可以设置默认值
		StanfordID::StanfordID() {
			name = “John Appleseed”;
			sunet = “jappleseed”;
			idNumber = 00000001;
		}
		```
		- 公有部分函数实现
		```cpp
		std::string StanfordID::getName() {
			return this->name;
		}
		std::string StanfordID::getSunet() {
			return this->sunet;
		}
		int StanfordID::getID() {
			return this->idNumber;
		}
		```
		- 析构函数部分
			- 析构函数并非需要显式调用，而是会在对象超出作用域时自动被调用
			- 如果可能被继承，一定要声明为虚析构函数，详见[多态与虚函数](/blog/notes/courses/course-cpp/cs106l-and-oop)
		```cpp
		StanfordID::~StanfordID() {
			// 释放数据
			delete [] my_array; // 示例
		}
		```
9. `IntVector` `.h`头文件示例
	```cpp
	class IntVector {
	public:
		using iterator = int*;
		IntVector();
		~IntVector();
		void push_back(const int& value);
		int& at(size_t index);
		int& operator[](size_t index);
		size_t size();
		bool empty();
		iterator begin();
		iterator end();
	private: size_t _size;
		size_t _capacity;
		int* _data;
		void resize();
	};
	```
6. **聚合类**（Aggregate Class）：结构简单的数据集合
	1. 满足以下所有条件的类（ `class` ）或结构体（ `struct` ），称为聚合类：
		- 没有用户提供的构造函数（编译器生成的默认构造、拷贝构造、移动构造不算）
		- 没有private/protected访问权限的非静态成员（所有成员默认或显式为 `public` ）
		- 没有基类（不继承任何其他类）
		- 没有虚函数（ virtual 函数）
		- 没有用户提供的析构函数、拷贝赋值运算符、移动赋值运算符
	2. 特点
		- 支持**聚合初始化**：可用大括号 {} 直接初始化成员，顺序需**与成员声明顺序一致**（无需调用构造函数）
		- **无自定义资源管理**：依赖编译器生成的默认析构，仅清理对象本身内存，不处理动态资源
		- **const聚合是运行期常量**：即使聚合类对象用 const 修饰，其值仍存储在内存中，编译器**不将其视为编译期常量**，无法用于 `int arr[obj.x];`
## 2. 组合与聚合
1. **组合**（Composition）是OOP中实现代码复用与构建复杂对象的设计模式
2. **定义**：通过将**已有对象嵌入新对象**，构建**整体-部分**的依赖关系（has-a），将**整体与部分生命周期绑定**，是区分于聚合（Aggregation）、继承（Inheritance）的关键复用方式
3. 实现复用：**包含**
	方式分两种：
	- **直接包含**：把部分对象作为整体对象的成员变量直接定义（`HealthPlan healthPlan` ）
	- **引用包含**：用指针/引用指向部分对象 `Employee* supervisor` ），**多个整体**对象可**共享同一个**部分对象（比如多个员工可拥有同一个上级）（严格上属于聚合）
		- 引用包含时，**部分对象的生命周期不能短于整体**，且需明确内存管理责任如 supervisor 指针指向的 Employee 对象，**不能是局部变量**
4. 嵌入对象的初始化规则
	1. 所有嵌入对象**必须被初始化**
	2. 若满足以下条件，编译器会自动调用**嵌入对象**的**默认构造函数**：
		1. **未**在构造函数中为嵌入对象**提供初始化参数**
		2. 该嵌入对象**存在默认构造函数**（或编译器可自动生成）
	3. **初始化列表优先**：推荐使用构造函数初始化列表（ `A::A(): b(param) {}` ）初始化嵌入对象，直接调用其带参构造函数，**避免默认构造+赋值**的冗余操作,提升效率
5. **访问控制设计**（public vs private）
	嵌入对象的访问权限直接影响类的封装性，遵循以下设计原则：
	- `private` **推荐**：嵌入对象作为整体的实现细节，不对外暴露，仅通过整体的公有接口间接操作，避免外部直接修改部分状态；
	- `public` **谨慎使用**：仅当需要完全暴露嵌入对象的所有公有接口时使用，但会破坏整体的封装性，增加耦合
6. 例子
	```cpp
	class Employee {
	private:
	    std::string name;                  // 直接包含：字符串对象
	    HealthPlan healthPlan;             // 直接包含：自定义对象
	    std::vector<SalaryHistory> salaryHistories; // 直接包含：集合对象
	    Employee* supervisor;              // 引用包含：指针（可共享，生命周期独立）
	public:
	    // 初始化列表：显式初始化所有直接包含的对象，supervisor设为nullptr
	    Employee(...) : name(name), address(address), supervisor(nullptr) {}
	    // 公有接口：间接操作嵌入对象（salaryHistories），隐藏集合的实现细节
	    void addSalaryHistory(const SalaryHistory& history) {
	        salaryHistories.push_back(history);
	    }
	};
	```
7. 组合(Composition)和聚合(Aggregation)的区别
	1. 组合
		1. **强依赖关系**：组合表示一种强拥有的关系，部分对象的生命周期完全依赖于整体对象。如果整体对象被销毁，部分对象也会随之销毁
		2. UML图表现形式：通常用实心菱形箭头表示
	2. 聚合
		1. 弱依赖关系：聚合是一种弱拥有的关系，部分对象可以独立于整体对象存在，部分对象的生命周期不依赖于整体对象。即使整体对象销毁，部分对象仍然可以存在
		2. UML图表现形式：通常用空心菱形箭头表示
	3. **指针/引用类成员**是**聚合**的常用语法手段，**值类型成员**是**组合**的常用语法手段，但最终判断要以**部分对象的生命周期由谁掌控**为核心，而非单纯看成员类型
		1. **指针成员也可能是组合**：如果整体类内部用 `new` 创建部分对象，且在整体的析构函数中用 `delete` 销毁部分，此时虽为指针成员，但属于组合
		2. **值类型成员也可能是聚合**：如果值类型成员是**全局/静态对象的拷贝**，且整体不依赖其生命周期，**理论上可视为聚合**，但这种写法**违背设计规范**，实际开发中几乎不用
# 七、继承
## 1. 继承
1. 函数并非存储在对象内部，而是单独存在，二者分开存储
	![60091b9e-10c9-41a5-b848-ec7fc8010ab6](/blog/obsidian-assets/60091b9e-10c9-41a5-b848-ec7fc8010ab6-2175ab8556.png)
2. `this`指针
	1. `this`一个指向当前类的指针
	2. `this`会作为参数被传递给后台的类函数中
3. 继承
	1. **定义**：一种让基类（Base/Super/Parent）能够从派生类（Derived/Sub/Child）**继承属性**的机制
	2. 继承定义了“is-a”关系
	3. **默认**情况下，类是**私有继承**的，如果需要使用继承树靠上的方法，可以使用`public`公开继承
		- 公有继承能更好地体现“是……的关系”，因为它公开地提供了实体的所有功能
		- 保护成员(`protected`)**对子类可见，但对外部不可见**，相当于子类圈层的公共权限
			- `protected` 保护成员派生类的成员函数**只能访问所作用的那个对象**（即`this`指针指向的对象）的基类保护成员，不能访问其他基类对象的基类保护成员
			- `protected`下的构造函数也不能被用于在子类直接生成，但是可以在递归构造的过程中被调用
	4. 建议**成员变量使用private，成员函数使用protected**
		- 成员变量设为 `protected` ，子类可直接修改基类状态，容易导致子类行为失控
		- 成员函数设为 `protected` ，既允许子类重写，又能通过基类函数控制对成员变量的访问，兼顾灵活性和安全性
	5. **不被继承**的内容：**构造函数**、**析构函数**、**赋值运算符**（ operator= ）、**友元关系**、基类的**私有成员**
		- 子类继承基类的`public/protected`静态成员时，**并不是拷贝一份新的静态成员给子类**，而是子类获得了对基类静态成员的**访问权限**，基类和所有子类共享**同一个静态成员实例**
	6. 派生类需**显式调用基类的拷贝构造/赋值运算符**，**否则**会调用**默认版本**
	7. **成员函数访问的变量，由函数所属的类决定**，函数写在哪个类里，就优先访问哪个类的变量，和谁调用函数（基类指针 / 派生类对象）无关
4. **继承类型**

| 类型               | public（公有继承）            | protected（保护继承）            | private（私有继承）            |
| ---------------- | ----------------------- | -------------------------- | ------------------------ |
| 示例               | `class B: public A {…}` | `class B: protected A {…}` | `class B: private A {…}` |
| 公有成员(public)     | public                  | protected                  | private                  |
| 受保护成员(protected) | protected               | protected                  | private                  |
| 私有成员(private)    | inaccessible            | inaccessible               | inaccessible             |
5. 构造函数与析构函数调用顺序、方式
	1. 构造函数调用顺序
		1. 按子类继承时的父类声明顺序，依次调用父类构造函数，**先声明的父类先构造**
		2. **再调用子类成员**的构造函数
		3. 需在派生类构造函数初始化列表中显式调用基类构造（无显式调用则默认调用基类无参构造）
			`Manager::Manager(...) : Employee(name, ssn),m_title(title) { ... }`
	2. 析构函数调用顺序
		1. **先执行子类**析构函数体 → 子类成员析构
		2. 按父类声明的**反向顺序**，依次调用父类析构函数，**后声明的父类先析构**
5. **对象切片（Object Slicing）** 和**向上转型（Upcasting）**
	- **对象内存布局**：C++ 中类的成员变量会按顺序在内存中排列，子类继承父类时，子类的成员变量会堆叠在父类成员变量之后。
	- **对象切片问题**：当把派生类（子类）对象**赋值**给基类（父类）对象时，派生类中独有的成员会被切掉(**vptr指向重置**)，导致只能访问基类部分的成员，还可能引发调用函数不符合预期等问题（比如本应调用派生类的 `update` 函数，结果调用了基类的）
	- **解决方法**：
		- **向上转型（Upcasting）**：使用基类**指针**（如 `Entity*`）或**引用**操作对象来存储派生类对象的地址，因为指针或引用**不会复制**对象，能保留派生类的完整信息，从而**避免对象切片**问题，确保能正确访问派生类的成员和函数
		- **转换特性**
			- **隐式转换**：编译器自动支持
			- **仅支持public继承**：private/protected继承不满足“is-a”关系，编译器禁止隐式向上转型，需用`reinterpret_cast`强制转换，且不推荐。**原因**：private/protected 继承的目的是将基类作为派生类的内部实现，而非对外暴露的父类型，是has-a或实现细节，因此不允许向上转型暴露基类接口
			- **本质**：忽略子类特有的成员（属性+方法），仅保留基类的成员接口，**聚焦对象的基类身份**
			- **类型信息逻辑丢失**：转换后，编译器仅认为该指针/引用指向基类对象，调用成员函数时**优先执行基类版本**，而非子类重写版，但对象本身的**内存布局未变**，子类特有成员仍存在，只是无法通过基类指针/引用访问
			- **安全的转换**：子类必然包含基类的所有成员，向上转型不会出现访问不存在成员的错误
	- 例子：
		- 若用 `std::vector<Entity>` 存储 `Projectile` 对象 `std: :vector<Entity> entities { Player(), Tree(), Projectile() };`
		- 容器里每个元素都是 `Entity` 类型，所以会**复制 `Projectile` 中属于 `Entity` 的部分**（`x`、`y`、`z`、`hitbox`），但 `vx`、`vy`、`vz` 会被丢弃
		- 调用 `update()` 时，编译器会调用 `Entity::update()`（如果基类 `update` 没有声明为虚函数），而不是 `Projectile::update()`，因为对象已经被**切成了基类的样子**
6. **虚继承** Virtual Inheritance
	1. 解决的问题：C++ 支持多继承，但如果出现**菱形继承**（多个派生类继承同一个基类，再由一个类多继承这些派生类），会导致两个严重问题：
		1. **数据冗余**：最终派生类会包含**多份公共基类的成员**，每个中间派生类各带一份
		2. **二义性**：访问公共基类的成员时，编译器无法确定访问哪一份，编译器会报编译错误
	2. **语法规则**
		1. 在**中间派生类继承公共基类B1时**，添加`virtual`关键字，如  `D1 : virtual public B1`
		2. 虚继承的基类B1为**虚基类** virtual base class，最终派生类会统一维护虚基类的唯一副本
		3. **抽象基类**不含真正的变量，不会出现冗余和二义性问题，不需要使用虚继承，**可以直接继承**
	3. **实现原理**
		虚继承的底层通过**虚基类表（Virtual Base Table, VBTable）** 实现：
		1. 虚继承的中间派生类会额外存储一个虚基类表指针`vbptr`
		2. 该指针指向一张表，表中记录了当前类到虚基类成员的偏移量
		3. 最终派生类初始化时，会统一初始化虚基类`B1`，确保仅一份实例
		4. 访问虚基类成员时，编译器通过`vbptr`找到唯一的`B1`成员，避免二义性
	4. **访问规则**
		- 最终派生类可直接访问虚基类的成员，无二义性，无需显式指定基类路径
		- 中间基类（ D1 、 D2 ）对虚基类成员的访问，会**通过虚基类表指针间接定位**，确保操作的是同一个副本
7. Vanilla MI **普通多重继承**
	1. **定义**：Vanilla MI 指 **无虚继承的直接多重继承**，派生类同时继承多个基类，基类间无虚继承关联
	2. **特点**
		1. Members are duplicated **成员重复**
			- 若多个基类包含同名成员（变量/函数），派生类会继承所有基类的同名成员副本，导致**访问二义性**
			- 例：
				```cpp
				class A { public: int x; };
				class B { public: int x; };
				class C : public A, public B {};
				```
				派生类  C  拥有  `A::x`  和  `B::x`  两个独立成员，直接访问  `C.x`  会编译报错，**需显式指定基类**： `C.A::x`
			- 例：菱形继承
				- **结构继承关系**： `B1`  是  `D1` 、 `D2`  的直接基类， M  多重继承  `D1`  和  `D2`
				- M 对象的内存中存在两个独立的 `B1` 子对象（ `D1::B1`  和  `D2::B1` ），各自有独立的  `m_i`  成员
				- `B1* p = &m;` 编译器无法确定  p  要指向  M  中的哪个  B1  子对象，是  `D1`  继承的  `B1` ，还是  `D2`  继承的  `B1` ，直接抛出`ambiguous base class`（基类歧义）错误
				- `static_cast`  转换：显式指定基类路径，消除二义性
					-  `B1* p1 = static_cast<D1*>(&m)` ：先将  `M*`  转成  `D1*` （明确指向  `M`  中的  `D1`  子对象），再隐式转成  `B1*` （ `D1`  是  `B1`  的派生类），最终指向  `D1::B1`
					-  `B1* p2 = static_cast<D2*>(&m)` ：同理，最终指向  `D2::B1`
			- **解决访问二义性的方法**
				- **显式指定基类路径**
				- 在派生类  M  中**重定义同名成员，隐藏基类成员**
				- **使用虚继承**，消除重复基类，解决菱形继承冗余
		2. Derived class has access to full copies of each base class **派生类拥有每个基类的完整副本**
			- 派生类对象的内存布局中，会包含每个基类的完整子对象 subobject，基类的成员、虚表（若有）均独立存在，**无共享**
			- 本质：派生类是多个基类的组合体，可直接访问每个基类的公有/保护成员
## 2. friend友元函数
1. 友元函数是类**主动声明**的**非成员函数**，能直接访问类的 `private` 和 `protected` 成员，权限由类自身主动授予，而非函数主动获取
 2. 特性
	1. **非成员函数**：友元函数不属于任何类，哪怕声明在类内部，也不是类的成员，也无 `this` 指针
	2. **访问权限**：可直接访问声明它的类的所有成员（ public / private / protected ）
	3. **单向性**：A 声明 B 为友元，B 能访问 A 的私有成员，但 A 不能访问 B 的私有成员
	4. **非传递性**：A 是 B 的友元，B 是 C 的友元，A 不能直接访问 C 的私有成员
	5. **非继承性**：基类的友元函数，不会自动成为子类的友元，子类需单独声明
 3. 友元函数的两种常见类型
	1. **全局友元函数**（最常用）
		- 全局作用域下的普通函数，被类声明为友元后，可访问该类的私有成员
		- 实现步骤：
			- 类内用  `friend`  关键字声明函数，无需加  `static`  或访问控制符，位置不限
			- 类外实现函数，无需加  `friend`  关键字，也无需加类名`::`
			- 函数需通过参数接收类对象，因无  `this`  指针，需明确访问哪个对象的成员
		- 代码示例：
			```cpp
			class Person {
			private:
			    string name;
			    int age;
			public:
			    // 1. 类内声明全局函数printPerson为友元
			    // 传const引用，避免拷贝+防止修改
			    friend void printPerson(const Person& p);
			    // 构造函数：初始化成员
			    Person(string n, int a) : name(n), age(a) {}
			};

			// 2. 类外实现友元函数（无friend，无Person::）
			void printPerson(const Person& p) {
			    // 直接访问Person的private成员，合法！
			    cout << "姓名：" << p.name << "，年龄：" << p.age << endl;
			}
			```
	2. **其他类的成员函数作为友元**
		- 类 A 的成员函数，被类 B 声明为友元后，该成员函数可访问类 B 的私有成员
		- 实现步骤：
			- **提前声明类 A**（若类 A 在类 B 之后定义）
			- 类 B 内用 `friend 返回值 类A::函数名(参数)` 声明友元
			- **先定义类 A 并实现该成员函数**，此时类 B 已声明，可访问其成员
		- 代码示例：
			```cpp
			// 步骤1：提前声明类Student（因为Teacher要引用它）
			class Student;

			// 类A：Teacher
			class Teacher {
			public:
			    // 声明成员函数：要访问Student的私有成员
			    void checkScore(const Student& s);
			};

			// 类B：Student（声明Teacher的成员函数为友元）
			class Student {
			private:
			    string name;
			    int score;
			public:
			    // 步骤2：类内声明Teacher的checkScore为友元
			    friend void Teacher::checkScore(const Student& s);
			    // 构造函数
			    Student(string n, int sc) : name(n), score(sc) {}
			};

			// 步骤3：实现Teacher的成员函数（此时Student已完整定义，可访问其private成员）
			void Teacher::checkScore(const Student& s) {
			    cout << "学生" << s.name << "的成绩：" << s.score << endl;
			}
			```
 4. 注意点
	1. **不滥用友元**：友元会破坏类的封装性，仅在**必须共享私有数据且无法通过public接口实现**时使用，比如运算符重载、数据打印工具函数
	2. **声明不等于定义**：类内的  friend  只是声明，函数的实现必须在类外（全局友元）或对应类的内部（成员友元）
	3. **参数必须传递对象**：友元函数**无  `this`  指针**，必须通过参数传入类对象或指针/引用，才能访问具体对象的成员；
	4. **可访问多个类**：一个函数可被多个类声明为友元，从而同时访问多个类的私有成员
## 3. 多态与虚函数
1. 使用基类指针（如 `Entity*`）会带来一定的代价：编译器会**忘记该对象实际所属的类型**，需要的是**动态分派**(dynamic dispatch)。根据对象在运行时（动态）的类型，应当调用（分派）不同的方法
2. **多态**（Polymorphism）
	1. **目的**：基于 public 继承的“is-a”关系，**让基类指针/引用能调用子类的特定实现**，实现一个接口，多种行为
	2. **前提**
		- **公开** `public` 继承
		- 基类声明 `virtual` **虚函数**，子类**重写**`override` 虚函数
		- **向上转型**（子类指针/引用→基类指针/引用）
	3. **绑定机制**
		1. **静态绑定**：编译期确定调用函数，使用非虚函数、对象直接调用，执行效率高
		2. **动态绑定**：运行期根据对象真实类型确定调用函数，使用虚函数+指针/引用调用，是多态实现的核心
	4. **重写** Override 、**重载** Overloading、**名称隐藏** Name Hiding
		1. **重写**：子类重新实现基类的虚函数，签名一致，用于多态，重写时可通过 `Base::func()` 调用基类版本，复用逻辑
		2. **重载**：同一类中同名函数不同参数，调用时编译器按参数匹配函数，属于**编译期静态绑定**，**与多态无关**
		3. **名称隐藏**：基类函数非虚时，不同作用域下子类定义了基类同名函数，无论参数是否和基类一致，**子类的同名函数会隐藏基类的同名函数**，编译器会优先匹配子类的函数，且调用时按静态类型匹配，无多态效果
		4. 若**基类的虚函数被重载**，需**全部重写或显式引入基类版本**，否则部分版本会被隐藏，子类若只重写其中一个版本，**其他未重写的基类重载版本会被名称隐藏**，子类对象/指针无法访问这些未重写的版本，只能访问子类重写的版本，或子类自己新增的重载版本
			```cpp
			class Derived : public Base {
			public:
			    using Base::func; // 显式引入基类所有func()重载版本
			    void func() override { cout << "Derived::func()" << endl; }
			    // 只重写一个版本
			};
			```
3. **虚函数** (Virtual functions)
	1. 作用
		1. 将一个函数标记为虚函数(`virtual`)可**允许子类重写，触发动态绑定**，而非虚函数默认静态绑定即按声明类型调用
		2. 子类可以重写(`override`)此方法
		```cpp
		class Entity {
		public:
			virtual void update() {}
			virtual void render() {}
		};
		class Projectile : public Entity {
		public:
			void update() override {}
			//“override”关键字并非必需，但其有助于提高代码的可读性,它会检查你是否是在重写一个虚方法，而非创建一个新的方法。
		};
		```
	2. **运行原理**
		1. 在函数中添加`virtual`特性会为每个对象**添加一些元数据**
		2. 具体方法
			1. 含虚函数的类会生成 `vtable` 虚函数表，**存储所有虚函数地址**
			2. 类对象会包含一个指向**虚函数表** `vtable` 的**虚函数指针**`vpointer`，该指针说明对于该对象应调用哪个函数来执行该虚拟方法
			3. 调用时通过 `vptr` 查找 `vtable` ，匹配对象真实类型的函数版本
	3. **规则**
		1. 子类重写需保持函数签名一致，参数、返回值，指针/引用返回值可放松为子类类型
		2. **构造函数**中**调用**虚函数，仅调用**当前正在构造的类**的虚函数版本
			1. 构造顺序是基类→派生类，A的构造函数执行时，B的成员还未初始化，对象本质是A类型
			2. 此时**虚函数表**（`vtable`）**仅完成A部分的初始化**，无法找到`B::f()`，虚函数退化为静态绑定
				```cpp
				class A {
					public:
						A() { f(); }
						virtual void f() { cout << "A::f()"; }
				};
				class B : public A {
					public:
						B() { f(); }
						void f() { cout << "B::f()"; }
				};
				// 输出： A::f()B::f()
				```
			2. 执行流程（创建 B 对象 `B b;`）：
				1. **进入 B 的构造函数，但先调用基类 A 的构造函数**
				    编译器会自动在 B 的构造函数开头插入 A 的构造调用，此时开始执行 A 的构造逻辑
				2. **执行 A 的构造函数体：调用 `f ()`**
				    此时 A 的虚函数表仅初始化了 `A::f ()` 的入口，派生类 B 的部分完全未就绪，因此`f()`静态绑定到`A::f()`，输出 `A::f()`
				3. **A 的构造完成，进入 B 的构造函数体**
				    此时虚函数表已更新为 B 的版本（入口替换为 `B::f ()`）
				4. **执行 B 的构造函数体：调用 f ()**
				    此时对象的虚函数表是 B 的版本，`f()`绑定到`B::f()`，输出 `B::f()`
				5. 最终输出：`A::f() B::f()`
		3. 静态绑定带来的错误
			1. C++ 中函数的绑定方式分两种
				1. **静态绑定**（早绑定）
				    - 确定时机：编译期
				    - 绑定依据：指针 / 引用的声明类型
				    - 适用函数：非虚函数、普通函数
				2. **动态绑定**（晚绑定）
				    - 确定时机：运行期
				    - 绑定依据：对象的实际类型
				    - 适用函数：虚函数
			2. **切勿重写**继承的**非虚函数**，静态绑定会导致行为异常，非虚函数是**静态绑定**，编译器在编译时，仅根据指针 / 引用的声明类型决定调用哪个版本的函数，忽略对象的实际类型。如果派生类**重写（实际是隐藏）** 基类的非虚函数，会导致调用行为与预期不符
				```cpp
				// 重写继承的非虚函数（实际是隐藏）导致异常
				class Base {
				public:
					void show(int x=10) { std::cout << "Base: " << x << '\n'; }
				};
				class Derived : public Base {
				public:
					void show(int x=20) { std::cout << "Derived: " << x << '\n'; }
				};
				int main() {
					Base* p = new Derived;
					p->show(); // 输出Base:10
					delete p;
				}
				```
			3. **切勿重写**继承的**默认参数值**,它们同样是**静态绑定**的
				```cpp
				class Base {
				public:
				    virtual void f(int x = 10) { cout << "Base::f(), x = " << x << endl; }
				};

				class Derived : public Base {
				public:
				    void f(int x = 20) override { cout << "Derived::f(), x = " << x << endl; }
				};

				int main() {
				    Derived d;
				    Base* ptr = &d; // 声明类型Base*，实际类型Derived
				    // 调用f()：函数体是Derived::f()（动态绑定），但默认参数是Base的10（静态绑定）
				    ptr->f(); // 输出 Derived::f(), x = 10
				}
				```
	4. **优缺点**
		1. 在许多其他语言中，类函数默认情况下是虚函数
		2. 关键要点：在 C++ 中，您必须**主动启用**虚函数功能，因为它们的**开销更大**
			1. 会**增大**类的**内存占用**
			2. **查找虚函数表以及调用方法所需的时间**也会更长
	5. **虚析构函数**（Virtual Destructors）
		1. **基类析构函数必须**声明为 `virtual` ，否则删除基类指针指向的子类对象时，**仅执行基类析构**，导致子类资源泄漏
		2. 规则：**只要类可能被继承**，析构函数就声明为 `virtual`
		3. 虚析构函数和普通析构函数相同，都是**从子类执行到父类**，但**避免了**向上转型**无法执行子类析构函数的缺陷**
4. **纯虚函数**(Pure virtual functions)，**抽象基类与接口类**
	1. 通过在函数前添加`= 0`来**将一个虚函数标记为纯虚函数**，而**无需提供具体的实现**
	2. **抽象基类**（Abstract Base Classes）
		1. 一个**具有一个或多个纯虚函数**的类属于**抽象基类**，仅定义接口，**不能**对其进行**实例化**
		2. 若基类包含纯虚函数，**派生类若未实现该纯虚函数**，则派生类**仍属于抽象类**
		3. 子类**重写所有的纯虚函数**后，才能被实例化
	3. **接口类**（Protocol/Interface Classes）
		- **特殊的抽象基类**：所有**非静态成员函数**均为**纯虚函数**（**析构函数除外，但也为虚函数**），无非静态成员变量，仅定义接口规范
		- **销毁派生类对象时，一定会向上调用基类的析构函数体**，哪怕基类析构是纯虚的，也必须有实现，否则会导致链接错误
	4. 纯虚函数在没有明确默认实现的情况下非常有用
5. 多态用法
	1. **统一管理子类对象**：用基类指针/引用数组/容器，批量调用不同子类的统一接口，如 `Shape* shapes[] = {&ell, &circ};`
	2. **引用传参多态**：函数参数声明为基类引用，可接收任意子类对象并触发动态绑定，如 `void func(Ellipse& elly)` 接收Circle对象
	3. **复用基类逻辑**：子类重写函数时，通过 `Base::func()` 调用基类实现，避免重复代码
## 4. 总结
1. 庞大的继承树通常运行速度较慢，也更难以进行推理
	1. 在现代游戏中，针对不同对象类型逐个进行子类化的做法在现代游戏引擎中并不常见
	2. 而组合方式往往更加灵活，也更合乎逻辑
2. **优先采用组合而非继承**
	- 继承是一个强大的工具，但有时，组合会更具合理性
		```cpp
		class Car
		  :public Engine
		  ,public Brakes
		  ,public SteeringWheel {
		/* Hmmm... this doesn't seem quite right */
		};

		class Car {
			Engine engine;
			SteeringWheel wheel;
			Brakes brakes;
		}
		```
- 结合二者会两全其美--“**PLMPL idiom**”(PLMPL 构式)
# 八、模板
## 1. 类模板
1. 如何切换不同种类数据
	- **宏缺点**：
		- 语法复杂
		- 无法进行类型检查
		- 如果忘记调用宏会怎样？或者多次调用？
	- **模板**的核心思想：**模板**可实现**代码自动生成**
	```cpp
	// grandmas_template.h 文件
	#define GENERATE_VECTOR(MY_TYPE) //预处理器宏在编译器运行之前执行
	  class MY_TYPE##Vector {
	  public:
		MY_TYPE& at(size_t index);
		void push_back(const MY_TYPE& elem);
	  private: MY_TYPE* elems;
		size_t logical_size;
		size_t array_size;
	  }

	// .cpp文件
	#include "grandmas_template.h"
	GENERATE_VECTOR(int) // 代码生成，根据我们传入的类型，我们会得到不同的向量

	intVector v1;
	v1.push_back(5);
	```
2. **模板类** Class template
	1. 模板声明`template <typename T>`
	2. 当模板被实例化时，T 将被替换掉
	3. 模板实例化：当使用特定类型的代码时，会根据需要生成相应的代码
	4. **类型参数的作用**
		模板中的**类型参数T**可用于：
		1. 函数**参数**的**类型**，如 `T& x`
		2. 函数的**返回类型**，如`T Add(T a, T b)`
		3. 函数**内部变量**的**类型**，如 `T temp`
	5. **语法**：用 `template` 关键字声明模板，用 `class T` 或 `typename T` 定义**类型参数**，T可视为一个**占位类型**，在函数中直接当作普通类型使用：
	```cpp
	// 模板声明
	template <typename T>
	// 向量是一个模板，它接收一个类型 T 的名称
	class Vector {
	public:
		T& at(size_t index);
		void push_back(const T& elem);
	private:
		T* elems;
	};

	//模板实例化
	Vector<int> intVec;
	Vector<double> doubleVec;
	Vector<std::string> strVec;
	Vector<Vector<int>> vecVec;
	struct MyCustomType {};
	Vector<MyCustomType> structVec;
	```
1. **模板与类型的区分**（Template & types）
	1. 这是一个模板,**不是**一种**类型**
		>`template <typename T>`
		>`class Vector`
	2. 这是一种类型，**又名模板实例化**
		>`Vector<std:string>`
	3. `Vector<double>` ,` Vector<int>` 这两种不同的实例化（均基于同一模板）在**运行时和编译时都是完全不同的类型**
	4. 引人深思的一点：在 Java 中，`ArrayList<int>` 和 `ArrayList<double>` 具有相同的运行时类型
2. **非类型模板参数** non-type parameters
	- 模板参数并非只能是类型（ `typename`/`class`  声明），还可以是**编译期可确定的常量表达式**，称为非 `typename` 模板参数，常见类型包括：
		- **整数类型**：`int`、`std::size_t`  等
		- **枚举类型**
		- **指针/引用**：指向全局变量/函数
	- **作用**：**将固定值作为模板参数**，让编译器在编译期确定类型的内存布局，实现更高效的内存分配
	- 例子：`std::array`
		```cpp
		template<typename T, std::size_t N>
		struct std::array { /* ... */ };

		// An array of exactly 5
		strings std::array<std::string, 5> arr;
		```
		- 关键： 5  是编译期固定值，编译器可精确计算 `arr` 的内存大小，直接在**栈上分配内存**
		- 何时**使用数组而非向量**：使用数组可以**避免进行堆内存分配**。编译器会确切地知道一个数组占用多少空间，在**栈上分配内存**
3. **多类型模板**
	模板支持多个类型参数，用逗号分隔
	```cpp
	template <typename T, typename U>
	auto min(const T& a, const U& b) {
	// 返回类型比较复杂，编译器通过auto功能来解决
		return a < b? a : b;
	}
	```
4. **嵌套模板**
	- 模板类可作为另一个模板的类型参数，形成嵌套结构
	- **旧编译器**要求 `>` 与 `>` 之间**加空格**，避免被解析为 `>>` 运算符
	- 函数指针也作为模板参数
	```cpp
	// 嵌套模板：Vector的元素类型是Vector<double*>
	Vector<Vector<double*> > matrix; // 二维动态数组（矩阵），存储double*类型

	// 复杂类型参数：函数指针作为模板参数
	// 模板参数为函数指针类型：int (*)(Vector<double>&, int)
	Vector<int (*)(Vector<double>&, int)> funcVector;
	```
5. **类模板实例化**：
	- **只能显式实例化**：使用类模板时，必须显式指定类型参数，编译器无法推导，语法为 `类名<类型>` ：
	```cpp
	// 实例化int类型的Vector
	Vector<int> v1(100);
	v1[20] = 10;

	// 实例化自定义类型Complex的Vector
	Vector<Complex> v2(256);
	v2[20] = v1[20];

	// 错误：未显式指定类型参数
	Vector v3(50);              // 编译报错！
	```
6. **类模板语法特性**
	1. `typename`与`class`意思相同
		- 推荐在函数模板中用 `typename` ，类模板中用 `class` ，增强可读性
		```cpp
		// 二者完全相同
		template <typename T>
		class Vector{};

		template <class T>
		class Vector{};
		```
	2. **类模板成员函数**的实现：类模板的成员函数**最好在类外单独实现**，且必须**保留模板声明**
		关键：类外实现时，类名必须写 `Vector<T>` ，明确是模板类的成员函数，且模板声明 `template <class T>` 不能省略
		```cpp
		// Vector.h
		template <typename T>
		class Vector {
		public:
			T& at(size_t i);
		};

		// Vector.cpp
		template <typename T>
		T& Vector<T>::at(size_t i) {
			// 实现细节...
		}
		```
	3. `.h` 文件的末尾必须包含 `.cpp` 文件
		- 对于非模板类，`.cpp` 文件会包含 `.h` 文件
		- 对于模板类而言，`.h` 文件会包含 `.cpp` 文件
		- 由于编译器（以及链接器）中模板代码生成的实现方式，`Template.h` 必须包含 `.cpp` 文件
7. **类模板继承**
	1. **模板类继承自模板类**
		- 基类和派生类均为模板，**派生类可复用基类的泛型逻辑**
		- **特点**
			- **双泛型复用**：基类和派生类均支持泛型，共享同一模板参数 `T`
			- **要求**：派生类需将自身模板参数传递给基类，访问基类成员需加 `this->`
		```cpp
		// 基类（模板类）
		template <class T>  // T：基类泛型参数
		class BaseTemplate { /* 基类逻辑 */ };

		// 派生类（模板类）
		template <class T>  // T：派生类泛型参数（传递给基类）
		class DerivedTemplate : public BaseTemplate<T>
		{ /* 派生类逻辑 */ };
		```
	2. **模板类继承自非模板类**
		- 派生类是模板，基类是普通非模板类，适合**基类提供通用工具**/**接口**，派生类适配具体类型
		- **特点
			- 简化基类：基类无需模板化，仅编写一次，避免重复代码
			- 关键要求：基类逻辑必须与类型无关，派生类无需向基类传递模板参数
		```cpp
		// 基类：非模板类（逻辑不依赖任何类型）
		class BaseNonTemplate {
		    // 通用逻辑（如打印、计数）
		};

		// 派生类：模板类（用T适配具体类型，继承基类通用逻辑）
		template <class T>
		class DerivedTemplate : public BaseNonTemplate {
		private:
		    T data;  // 派生类存储具体类型数据
		public:
		    // 派生类逻辑（结合T和基类功能）
		};
		```
	3. **非模板类继承自模板类**
		- 基类是模板，派生类是普通非模板类，需 显式指定基类的模板参数，**将泛型基类固化为特定类型**
		```cpp
		// 基类：模板类（泛型逻辑）
		template <class T>
		class BaseTemplate {
		    // 基类泛型逻辑（依赖T）
		};

		// 派生类：非模板类，显式指定基类的T，固化为特定类型
		class DerivedNonTemplate : public BaseTemplate<SpecificType> {  // 关键：SpecificType是固定类型
		    // 派生类逻辑（针对SpecificType）
		};
		```
8. **奇特递归模板模式**（CRTP）
	1. **定义**：CRTP （Curiously Recurring Template Pattern）是一种高级模板技巧：**模板基类的类型参数是派生类本身**，通过**静态多态**模拟虚函数功能，规避虚函数的运行时开销
	2. **语法**
		```cpp
		// 模板基类：参数T是派生类
		template <class T>
		class Base {
		public:
		    // 接口函数：通过static_cast将this转换为派生类指针，调用派生类的实现
		    void interface() {
		        static_cast<T*>(this)->implementation();
		    }

		    // 静态接口函数：调用派生类的静态实现
		    static void static_func() {
		        T::static_sub_func();
		    }
		};

		// 派生类：继承自Base<Derived>（将自身作为基类参数）
		class Derived : public Base<Derived> {
		public:
		    // 派生类的具体实现（非虚函数）
		    void implementation() {}
		    // 派生类的静态实现
		    static void static_sub_func() {}
		};
		```
	3. **静态多态**
		- **替代虚函数实现多态**：无需 `virtual` 关键字，通过模板实现不同派生类的差异化逻辑
		- **编译期绑定**：接口函数 interface 与派生类实现 implementation 的绑定在编译期完成，无运行时开销
	4. **无额外开销**
		- **无虚函数表**（`vtable`）：避免虚函数带来的内存开销（每个对象无需存储虚表指针）
		- **无运行时跳转**：直接调用派生类实现，比虚函数更快
	5. **类型安全**
		- **编译期检查**：若派生类未实现 implementation ，编译时直接报错，而非虚函数的运行时错误
		- **无类型切片风险**：派生类类型在编译期确定，避免虚函数继承中的类型切片问题
	6. **局限性**
		- **无法动态切换类型**：多态行为在编译期固定，不能像虚函数那样运行时动态切换派生类类型
		- **派生类需显式继承**：每个派生类必须显式继承 `BaseCRTP<自身>` ，无法复用给非CRTP派生类
		- **不支持基类指针数组多态**：若用 `BaseCRTP*` 数组存储不同派生类对象，无法触发对应派生类实现，编译期已绑定类型
9. **模板的友元** Friend Templates
	1. 模板类的友元支持两种形式：**针对特定模板实例的友元**和**通用模板友元**，用于**控制**模板类的**访问权限**
	2. **针对特定模板实例的友元**
		1. 语法
			```cpp
			template <typename T>
			class MyClass {
			    // 友元函数：仅适配当前模板实例
			    friend void myFriendFunc(MyClass<T>& obj) {
			        // 可访问MyClass<T>的私有成员
			        std::cout << obj.privateData << std::endl;
			    }
			private:
			    T privateData;
			public:
			    MyClass(T data) : privateData(data) {}
			};
			```
		2. **特点**
			- **一对一匹配**：**友元函数与模板实例绑定**
			- **无需类外实现**：友元函数直接定义在模板类内，编译器自动为每个模板实例生成对应友元
			- **类型专属**：不同模板实例的友元是独立的
	3. 通用模板友元：适配所有实例
		1. 语法
			```cpp
			template <typename T>
			class MyClass {
			    // 声明通用模板友元，适配所有MyClass<U>实例
			    template <typename U>
			    friend void myGeneralFriend(MyClass<U>& obj);
			private:
			    T privateData;
			public:
			    MyClass(T data) : privateData(data) {}
			};

			// 模板友元的类外实现,必须带模板声明
			template <typename U>
			void myGeneralFriend(MyClass<U>& obj) {	}
			```
		2. **特点**
			- **一对多匹配**：一个友元模板适配所有实例
			- **需类外实现**：友元是独立模板，需在类外单独编写实现，否则编译器无法找到定义
			- **通用性强**：无需为不同模板实例重复编写友元，适合全局工具类访问模板私有成员
10. **模板的静态成员**
	1. **实例专属**：静态成员**属于每个模板实例**，而非整个模板类
	2. **必须类外定义**：模板类内的静态成员只是声明，编译器需要看到**类外的显式定义**，才能为每个模板实例分配静态成员的内存；仅类内声明会导致链接阶段找不到静态成员的定义，抛出 `undefined reference` 错误，类外定义时必须带`template <typename T>`模板声明，且用`MyClass<T>::`指定作用域，还可初始化默认值
	3. **共享性**：**同一模板实例**的所有对象，**共享**该实例的静态成员
	4. **无 this 指针**：与一般的静态成员函数相同，模板类的静态成员函数无法访问模板类的非静态成员，且无 `this` 指针，仅能操作静态成员
	```cpp
	template <typename T>
	class MyClass {
	public:
	    // 1. 模板类内声明静态成员
	    static int staticVar;
	    static void staticFunc() {
	        // 静态成员函数逻辑
	    }
	};

	// 2. 模板类外定义静态成员（必须带模板声明）
	template <typename T>
	int MyClass<T>::staticVar = 0;  // 初始化默认值
	```
## 2. 函数模板
1. 语法示例：选取更小值函数
	```cpp
	template <typename T>
	T min(T a, T b) {
		return a < b ? a: b;
	}

	template <typename T>
	T min(const T& a, const T& b) { // 使用常量引用避免使用副本
		return a < b ? a : b;
	}
	```
2. **函数模板实例化** Function Template Instantiation
	1. **显式实例化（explicit instantiation）** 显式实例化会直接传递类型，就像模板类一样
		- `min<int>(106, 107);` `min<double>(1.2, 3.4);`
		- 模板函数能让编译器为我们生成代码
		- 当模板参数**无法从函数参数推导**，如函数**无参数**时，需显式实例化：
			- 旧版编译器不支持无参数模板的显式实例化，需确保编译器版本兼容
			```cpp
			// 无参数函数模板（无法从参数推导T）
			template <class T>
			void foo() { /* 逻辑实现 */ }

			// 显式指定T的类型，强制实例化
			foo<int>();
			foo<float>();
			```
	2. **隐式实例化（implicit instantiation）** 隐式实例化能让编译器自动为我们推断出类型
		- `min(106, 107);` `min(1.2, 3.4);`
		- 隐式实例化类似于自动实例化(`auto`)，模板本身不生成可执行代码，编译器会根据实际传入的类型，自动生成对应类型的函数即实例化，过程如下：
			1. 匹配模板参数与实际类型
			2. 替换模板中的 T 为具体类型，生成新的函数体
			3. 进行语法检查和类型校验，确保逻辑合法
		- **隐式实例化**可能会出现**问题**
			- 如`string`类会识别为`const char*`, 会造成指针比较，此时最好显示实例化为`string`类
			- 这些参数的类型并不完全一致
		- **特点**：无需手动重载，编译器自动生成对应类型的函数，兼顾类型安全与代码复用
3. **模板特化**（Specialization）
	- 针对某一特定类型，为模板提供定制化实现，**解决通用模板对特殊类型的适配问题**
	- 例子：为 `char*` 类型定制Swap函数,避免按值拷贝，改为按地址交换
		```cpp
		// 通用模板
		template <typename T>
		void Swap(T& x, T& y) {
		    T temp = x;
		    x = y;
		    y = temp;
		}

		// 模板特化（针对char*类型）
		template <>
		void Swap<char*>(char*& x, char*& y) {
		    char* temp = x;
		    x = y;
		    y = temp;
		}
		```
	- **全特化和偏特化**
		- **全特化**：**对模板所有参数明确指定**
			如 `template<> class A<int, double, 5>`
		- **偏特化**：**部分参数指定**，其余保留模板参数，是 `iterator_traits` 支持原生指针的关键[iterator_traits](/blog/notes/courses/course-cpp/cs106l-and-oop)
			如 `template<class T2> class A<int, T2, 3>`
4. 使用集成开发环境（IDE）（例如 VSCode、QtCreator）来查看实例化类型，能够显示实际使用了哪些类型的数据
	- ![c697e511-9335-46dc-bfe7-6f76cdb7957d](/blog/obsidian-assets/c697e511-9335-46dc-bfe7-6f76cdb7957d-cdaa89603e.png)
5. **函数模板的类型匹配规则**
	1. **匹配原则**：函数模板的类型推导**仅支持精确匹配**，**不允许**任何隐式/显式**类型转换**，否则直接报错：
		- 合法： Swap(int, int) 、 Swap(double, double) 类型完全匹配
		- 错误： Swap(int, double)  int与double不匹配，即使可隐式转换也被拒绝
	2. **函数模板与普通函数的共存逻辑**
		**当模板函数与普通函数同名**，编译器按优先级顺序匹配
		1. 优先查找**普通函数的精确匹配**，不触发模板
		2. 若无普通函数精确匹配，查找**函数模板的精确匹配**
		3. 若模板也无精确匹配，尝试**普通函数的隐式类型转换匹配**
		4. 若以上均无匹配，编译报错
## 3. 概念(concept)
1. 所创造的`min`函数无法检测`operator<`是否存在于提供的对象中，只有在实例化后才会报错
2. `concept`：一组具有名称的约束条件
	```cpp
	template <typename T>
	concept Comparable = requires(T a, T b) { // 要求：给定两个 T，我期望以下情况成立
		{ a<b } -> std::convertible_to<bool>;
		// 约束条件：位于“{ }”内的任何内容都必须能够正确编译，不得出现错误
		// 并且结果必须能够像布尔值一样进行转换
	};

	template <typename T> requires Comparable<T>
	T min(const T& a, const T& b);

	// 上述模板的简洁高效写法
	template <Comparable T>
	T min(const T& a, const T& b);
	```
3. `concept`极大地改善了编译器的错误提示
4. 内置`concept`
	- ![1a461d7d-36f8-4a31-b7e9-8ee2079ac108](/blog/obsidian-assets/1a461d7d-36f8-4a31-b7e9-8ee2079ac108-d98424719a.png)
	- ![1fb3decf-7421-4b8a-8f34-cb23398155cb](/blog/obsidian-assets/1fb3decf-7421-4b8a-8f34-cb23398155cb-f4c1f23f81.png)
5. 修复后的最小值函数
	```cpp
	template <std::input_iterator It, typename T>
	It find(It begin, It end, const T& value);
	```
## 4. 可变参数模板
1. 如何创建一个能够接受可变数量参数的函数呢
	1. 函数重载，不同数量参数对应不同函数
	2. 模板 + 递归
		- 它会递归地复制该向量（可以通过封装函数来避免这种情况）
		- 每次调用时都必须为它分配一个向量（这是不可避免的开销）
		```cpp
		template <Comparable T>
		T min(const std::vector<T>& values) {
			if (values.size() == 1) return values[0];
			const auto& first = values [0];
			std::vector<T> rest(++values.begin(), values.end());
			auto m = min(rest);
			return first < m ? first : m;
		}
		```
	3. 可变参数模板
2. 可变参数模板
	```cpp
	// 基本情况函数：用于终止递归操作
	template <Comparable T>
	T min(const T& v) { return v; }

	// 可变参数模板：匹配 0 个或多个类型
	template <Comparable T, Comparable... Args> // 参数组：0 个或多个参数
	T min(const T& v, const Args&... args) {
		auto m = min(args...); // 包扩展：将...参数替换为实际参数
		return v<m? v: m;
	}
	```
	- 可变**参数类型不必完全相同**
		-  例如，一个类似于 `printf` 的函数`format("Queen {}, Protector of the {} Kingdoms", "Rhaenyra", 7);` 这些“{}”会根据需要被填入任意数量和类型的参数
3. `format`
	1. 使用`{}`作为占位符，支持位置参数和命名参数
	2. 支持在`{}`中添加**格式说明符**
		1. **位置参数**（改变参数顺序）：默认按参数顺序匹配占位符，可通过索引指定参数位置（从 0 开始）
			`std::string s = std::format("Name: {1}, Age: {0}", 25, "Bob" );// 输出：Name: Bob, Age: 25`
		2. **数值格式**（进制、符号）
			- `d`：十进制整数（默认）
			- `x`/`X`：十六进制（小写 / 大写）
			- `o`：八进制
			- `b`：二进制
			- `+`：强制显示正负号
		3. **浮点数格式**（精度、科学计数法）
			- `.n`：保留 n 位小数（四舍五入）
			- `e`/`E`：科学计数法（小写 / 大写）
			- `g`/`G`：自动选择普通或科学计数法
		4. **对齐与填充**
			- `<`：左对齐，`>`：右对齐，`^`：居中对齐
			- 数字指定宽度，不足时用填充字符（默认空格，可指定其他字符）
	3. 不能使用`vector`来实现：需要支持不同类型变量，但`vector`内部变量必须类型相同
	4. 实现
```cpp
void format(const std::string& fmt) {
	std::cout << fmt << std::endl;
}
template <typename T, typename... Args>
void format(const std::string& fmt, T value, Args... args) {
	auto pos = fmt.find("{}");
	if (pos == std::string::npos) throw std::runtime_error("Extra arg");
	std::cout << fmt.substr(0, pos);
	std::cout << value;
	format(fmt.substr(pos + 2), args...);
}
```
## 5. 模板元编程
1. 模板元编程(Template Metaprogramming TMP) 定义： C++ 中一种**在编译期执行计算和生成代码**的技术，利用**模板的递归实例化、特化和类型推导机制**，将运行时的逻辑迁移到编译期完成，从而实现**零运行时开销**的高效代码
2. TMP 在现实中的使用
	- 在编译时将计算结果固化为可执行代码（例如阶乘计算）
	- 优化矩阵/树形结构/其他数学结构
	- 基于策略的设计：通过模板传递行为
	- Boost MPL 库
3. 案例
	1. 阶乘
		```cpp
		template <>
		struct Factorial<0> {
		    enum { value = 1 };
		};

		template <size_t N>
		struct Factorial {
		    enum { value = N * Factorial<N - 1>::value };
		};

		std::cout << Factorial<7>::value << std::endl;
		```
	2. 斐波那契
		```cpp
		// 特化：斐波那契数列第0项
		template <>
		struct Fibonacci<0> {
		    enum { value = 0 };  // F(0) = 0
		};

		// 特化：斐波那契数列第1项
		template <>
		struct Fibonacci<1> {
		    enum { value = 1 };  // F(1) = 1
		};

		// 通用模板：计算第N项（N ≥ 2）
		template <size_t N>
		struct Fibonacci {
		    // 递归计算：F(N) = F(N-1) + F(N-2)
		    enum { value = Fibonacci<N - 1>::value + Fibonacci<N - 2>::value };
		};
		```
4. TMP 是图灵完备的, 可以在编译时执行任意代码
5. 使用 `constexpr`/`consteval`  这种模板元编程的标准化方式（C++20）
	- `constexpr` 编译器尝试在编译时运行
	- `consteval` 编译器必须在编译时运行
## 6. 回顾
- **编写模板步骤**
	1. **先实现非模板版本**：先写固定类型的非模板代码，确保逻辑正确、无Bug
	2. **建立测试用例**：针对非模板版本编写测试，确保核心逻辑可靠
	3. **性能测量与调优**：确认非模板版本的性能瓶颈，明确模板优化方向
	4. **提炼模板参数**：将固定类型替换为 typename 参数，将固定值替换为非类型参数
	5. **转换为模板版本**：基于非模板代码修改，最小化改动结构
	6. **模板测试与迭代**：用原测试用例验证模板版本，修复类型适配问题
- **何时应该使用模板呢**
	- 希望编译器能够**自动完成重复性的编码任务**
		- 模板函数、可变模板
	- 希望获得**更准确的错误提示**
		- `concept`
	- **不想等到运行时再处理**
		- 模板元编程、`constexpr`/`consteval`
- **注意事项**
	- **模板代码放头文件**：模板的声明和实现必须在同一头文件，编译器需在编译期看到完整模板代码，否则无法实例化
	- **避免过度参数化**：仅将真正需要灵活变化的类型/值作为模板参数
	- **警惕代码膨胀**：避免为微小差异的参数生成大量模板实例，优先用默认值或动态大小
# 九、函数与 lambda 表达式
## 1. 函数与 lambda 表达式
1. **谓词(predicate)** 是一个布尔值函数, 如`isPrime` `isVowal` 等
2. **传递函数**使我们能够通过**用户自定义的规则**来对算法进行通用化处理
3. 例子
	```cpp
	// 模板函数：在区间 [first, last) 中查找满足谓词 pred 的第一个元素
	template <typename It, typename Pred>
	It find_if(It first, It last, Pred pred) {
	    for (auto it = first; it != last; ++it) {
	        // 对当前元素调用谓词 pred，若满足则返回该元素的迭代器
	        if (pred(*it)) return it;
	    }
	    // 若未找到满足条件的元素，返回区间末尾迭代器 last
	    return last;
	}

	find_if(corlys.begin(), corlys.end(), isVowel); // Pred = bool(*)(char)
	// bool 函数返回一个布尔值
	// * 是一个函数指针
	// char 接收一个char作为参数
	```
4. 函数指针的通用性较差, 无法做到需要在不引入其他参数的情况下为函数添加额外的状态
5. Lambda 函数
	1. Lambda 函数是一种**从外部作用域获取状态**的函数
	2. 代码示例
	   ```cpp
		int n;
		std::cin >> n;

		auto lessThanN = [n](int x) { return x < n; };

		find_if(begin, end, lessThanN);

		// 格式
		auto lambda = [capture-values] (arguments) {
			return expression;
		}
		```
	3. 捕获
		- `[x] (arguments) ` // 按值捕获 x（创建一份副本）
		- `[&x] (arguments) ` // 按引用捕获 x
		- `[&] (arguments) ` // 按引用隐式捕获所有用到的外部变量
		- `[&, x] (arguments) ` // 除 x 外，其余用到的外部变量都按引用隐式捕获（x 按值捕获）
		- `[=] (arguments) ` // 按值隐式捕获所有用到的外部变量
6. `auto argument`是`template`的简写形式
	- 无论在何处遇到 auto 参数，情况都是如此, **并非仅限**于 lambda 函数中，而且还会进行隐式实例化
	- 编译器在调用函数时会自动确定其类型
	```cpp
	// 二者等价
	auto lessThanN = [n] (auto x) {
		return x < n;
	};

	template <typename T>
	auto lessThanN = [n] (T x) {
		return x < n;
	}
	```
7. **函子**(`functor`)是指任何能够定义运算符`( )`的对象, 这种对象的作用类似于函数
	- 例子 `std::greater<T>`
		```cpp
		template <typename T>
		struct greater {
			bool operator()(const T& a, const T& b) const {
				return a > b;
			}
		};

		std::greater<int> g;
		g(1,2); // return false
		```
	- 例子`std::hash<T>`
		```cpp
		template<>
		struct hash<MyType> { // 这种语法被称为针对“MyType”类型的模板特化
			size_t operator()(const MyType& p) const {
				// 结合两个哈希值（简单示例，实际可使用更复杂的组合方式）
				size_t hash_name = hash<std::string>()(p.name);
				size_t hash_age = hash<int>()(p.age);
				return hash_name ^ (hash_age << 1);
			}
		};
		```
	- 因为**函子是一个对象**，所以它**可以拥有状态**（即为有内置的`int a`等）
8. 当您使用 lambda 表达式时，就会生成一个函子式类型，可以视之为一种**语法糖**
	```cpp
	int n = 10;
	auto lessThanN = [&](int x) {
	    return x < n;
	};
	find_if(begin, end, lessThanN);


	// 等价的 functor 类
	class lambda_6_18 {
	public:
	    // 重载函数调用运算符，实现判断逻辑
	    bool operator()(int x) const {
	        return x < n;
	    }

	    lambda_6_18(int& _n) : n{_n} {} // 构造函数：接收外部变量n的引用并初始化成员变量

	private:
	    int n;  // 存储外部变量n的副本
	};

	int n = 10;
	auto lessThanN = lambda_6_18{n};  // 实例化 functor 并传入n
	find_if(begin, end, lessThanN);   // 传入functor对象作为谓词
	```
9. `std::function` 是 `functions`/`lambda` 表达式的通用类型
	1. 任何**函数指针、函数式参数或函数对象**都可以转换为它
	2. 速度稍慢一些
	3. 通常会使用 `auto`/`template`，根本不用去考虑具体类型的问题
	```cpp
	std::function<bool(int, int)> less = std::less<int>{};
	std::function<bool(char)> vowel = isVowel;
	std::function<int(int)> twice = [] (int x) { return x * 2; };
	```
## 2. 算法
1. `<algorithm>` 是一系列模板函数的集合
	1. `std::count_if(InputIt first, InputIt last, UnaryPred p);` 在 `[first, last]` 中有多少个元素符合谓词 p 的条件？
	2. `std::sort(RandomIt first, RandomIt last, Compare comp); ` 按照比较函数 `comp` 对 `[first, last) `区间内的元素进行排序
	3. `std::max element(ForwardIt first, ForwardIt last, Compare comp);` 根据比较函数 `comp`，在`[first, last]` 范围内找出最大元素
	4. ...
2. `<algorithm>`让我们能检查并处理数据
## 3. 范围与视图
1. `ranges` 是标准模板库（STL）的一个新版本
2. **定义**：`ranges` 指的是**具有起始点和结束点**的任何事物
3. `std::ranges`提供了针对范围的新的`<algorithm>`版本
4. `ranges`：STL v2 该版本中，大多数 STL `<algorithm>` 库中的算法都有对应的范围版本。这些内容非常新颖, 适用于 C++20/23/26 及更高版本
	- ![3ff83174-196e-4ec6-a97c-ad33eb0bb256](/blog/obsidian-assets/3ff83174-196e-4ec6-a97c-ad33eb0bb256-adf545e45e.png)
5. `view`：**一种构建算法的方法**, `view`是一个能够灵活调整其他`ranges`的`ranges`
6. `view`会**逐步（而非一次性）对其底层范围中的每个元素**进行处理
7. `view`是可组合的，我们可以通过使用运算符`|`将多个`view`串联起来
	```cpp
	std::vector<char> letters = {'a','b','c','d','e'};
	std::vector<char> upperVowel = letters
		| std:: ranges::views::filter(isVowel)
		| std:: ranges::views::transform(toupper)
		| std:: ranges::to<std::vector<char>>();

	// upperVowel = { 'A', 'E' }
	```
## 4. inline内联函数
1. 为什么使用内联函数：
	1. **普通函数调用**必须执行**压参→压返回地址→准备返回值→弹栈**4步
	2. 内联函数会在调用处原地展开，类似C语言的预处理宏，因此能彻底消除函数调用开销
	3. 内联函数**比宏安全**：它会**检查参数类型**，且不存在危险的副作用
		```cpp
		// 内联函数（安全）
		inline int safe(int i)
		{ return i>=0 ? i:-i; } // 返回i的绝对值

		int f();
		int main() {
		  ans = safe(x++); // 正确：x仅自增1次
		  ans = safe(f()); // 正确：f()仅调用1次
		}

		// 宏（不安全）
		#define unsafe(i) \
		  ((i)>=0?(i):-(i)) // 宏定义，无类型检查

		int f();
		int main() {
		  ans = unsafe(x++); // 错误：x会自增2次（副作用）
		  ans = unsafe(f()); // 错误：f()会被调用2次（副作用）
		}
		```
2. 内联函数规则
	1. 内联函数的**完整定义（含函数体）** 应**放在头文件**中
	2. 可被多个文件包含，**无多重定义错误**，因为内联定义本质是**声明**
	3. **类内默认内联**：类中直接定义的成员函数，会自动成为内联函数,无需加 inline 关键字
3. 适用场景
	- 适合内联：短小函数（2-3行）且频繁调用，使用少量代码膨胀得到运行速度提升
	- 不适合内联：大型函数（>20行）且为递归函数，代码膨胀严重，编译器也可能拒绝内联
4. **编译器**可根据函数复杂度忽略`inline`请求，如今 inline 的核心意义是**允许多重定义**而非强制内联
5. 不能使用内联函数的场景
	1. 包含**静态变量**的函数：静态变量的全局唯一特性会因内联产生多副本而被破坏
	2. 包含**递归调用**的函数：递归深度不确定，无法在编译期完成静态展开
	3. 包含**循环**的函数：内联展开后代码体积膨胀，抵消减少调用开销的优化效果
	4. **函数体代码量过大的函数**（如超过 10-20 行）：导致编译后代码体积显著增加，内存 / 缓存占用上升，降低程序效率
	5. **虚函数**（多数场景）：依赖运行时动态绑定，仅直接通过对象（非指针 / 引用）调用时可能内联，通常不建议声明为内联
	6. **被取地址的函数**：内联函数无独立函数实体，无法生成有效的函数地址
	7. 包含**复杂控制流**的函数（多层嵌套 if-else switch 等）：内联后代码冗余、可读性差，编译器通常也不会做内联优化
	8. 涉及**外部依赖**的函数：依赖特定编译单元的私有资源，内联会引发跨编译单元的依赖冲突
## 5. 参数与返回值类型选择

1. 若不打算修改对象，建议使用  `const` 修饰
2. **参数传入方式**（way in）
	- `void f(Student i);`
		调用函数时，会**创建一个新的**Student对象（**实参的拷贝**），函数内操作的是拷贝体，不影响原对象
	- `void f(Student *p);`
		传入对象的指针；若**不打算修改**指针指向的对象，建议加 `const` （即  `void f(const Student *p);` ），更安全
	-  `void f(Student& i);`
		传入对象的引用，**无拷贝开销**；需**明确引用**的是一个**已存在的有效对象**，避免悬空引用
3. **返回值传出方式**（way out）
	-  `Student f();`
		函数返回时，会**创建一个新的**Student对象并返回，原局部对象生命周期结束
	-  `Student* f();`
		返回对象的指针；需明确指针指向的内存空间是全局对象、静态对象，还是传入的对象,**避免返回局部对象的指针**，导致悬空
	-  `Student& f();`
		返回对象的引用；**需格外谨慎**，必须返回**生命周期未结束**的对象，如传入的引用、全局/静态对象，**严禁返回局部对象的引用**，局部对象销毁后，引用悬空，访问即非法
4. 技巧
	1. 若需**存储传入**的数据,用**对象传入** `Student i`
	2. 若仅需**获取**对象的值（不修改）,用**const指针/引用传入**`const Student* p  或  const Student& i`
	3. 若需**修改**传入的对象,用**指针/引用传入**`Student* p`  或  `Student& i`
	4. 若函数内**新建对象并传出**,用**对象返回**`Student f()`
	5. 若**返回指针/引用**,仅返回**传入的对象**的指针/引用，不返回函数内新建的局部对象，更不返回动态分配的对象
	6. 绝不新建对象（`new`）后直接返回其指针，极易导致**内存泄漏或悬空指针**
## 6. 默认值
1. **声明与定义的唯一性**
	- 默认参数仅能在函数**第一次声明**中指定，后续的定义 / 重复声明**不能重复指定**，也不能修改默认值
	- 类成员函数（含构造函数）：默认参数通常在**类内声明时指定**，类外实现时不写；若类内声明 + 类外实现都写默认值，会触发**默认参数重定义**编译错误
2. 默认参数必须**从右往左连续指定**，不能跳过前面的参数给后面的加默认值
	- 合法：`void func(int a, int b = 10, int c = 20);`
	- 错误：`void func(int a = 5, int b, int c = 10);` a 的默认值在 b 前，非连续
3. 与函数签名、重载的关系
	1. **默认参数不属于函数签名**
		函数签名 = 函数名 + 参数类型 / 数量 / 顺序 + const / 引用修饰，默认参数不影响签名。因此仅默认值不同、参数列表完全一致的函数，视为**同一函数**，不能重复定义
	2. **重载与默认参数的注意事项**
		- **合法重载**：参数列表（类型 / 数量 / 顺序）不同，即使带默认参数，仍为合法重载
		    示例：`void func(int a = 10)` 和 `void func(double a = 3.14)` 参数类型不同
		- **避免二义性**：重载 + 默认参数可能导致调用匹配模糊，触发编译错误
4. 在同一个类中同时定义**无参的默认构造函数**和**所有参数都带默认值的构造函数**，会触发重定义（redefinition）编译错误
	1. C++ 中，默认构造函数的判定规则是：无需传递任何参数就能调用的构造函数，就是默认构造函数，包含两种形式：
		1. **无参构造函数**：`A()`
		2. **全参数带默认值的构造函数**：`A(int a = 10, int b = 20)` 调用时可不传参，等价于无参调用
	2. 二选一保留即可，若需要既能无参调用，又能传参调用，优先选择全参数带默认值的构造函数
5. 变量作为默认值
	1. C++ 要求默认参数的值必须在**编译期就能确定**，或满足静态存储期要求
	2. 普通局部变量、函数内的非 const 变量等自动变量，因为其生命周期和值都是运行期决定的，不能作为默认参数
	3. `const`修饰的全局常量，只要其值在编译期可确定，就能作为默认参数，局部 const 变量即使初始化了仍不能作为默认参数，因为其作用域和存储期仍是局部的
	4. 全局变量、`static`修饰的静态变量（全局 / 函数内静态）属于静态存储期，生命周期贯穿整个程序，因此可作为默认参数，全局 / 静态变量作为默认参数时，默认值是**运行期取变量的当前值**（而非编译期固定值），可能导致行为不可预测，除非必要否则不推荐
# 十、运算符重载
## 1. 重载规则与理念
1. 运算符是如何与类协同工作的
	1. 就像我们在类中声明函数一样，我们也可以**声明运算符的功能**
	2. 当我们将该运算符与新对象一起使用时，它会执行自定义的函数或操作
	3. 就像函数重载一样，如果我们给它相同的名称，它就会覆盖运算符的行为
	4. 本质上是**另一种形式的函数调用**，只是语法更简洁、更直观
2. **可以重载**的运算符
	- ![3F8FE650-F7BA-420b-B07E-0578F58E971C](/blog/obsidian-assets/3f8fe650-f7ba-420b-b07e-0578f58e971c-af97be3597.png)
3. **无法重载**的运算符：这些运算符的语义与 C++ 底层机制深度绑定，重载会**破坏语言的一致性**
	- `.`（成员访问运算符）
	- `.*`（成员指针访问运算符）
	- `::`（作用域解析运算符）
	- `? :`（三目条件运算符）
	- `sizeof`（大小运算符）
	- `typeid`（类型信息运算符）
	- `static_cast` `dynamic_cast` `const_cast` `reinterpret_cast` （强制转换运算符）
	- ![33EDC0D3-AEB4-4b03-AF83-9554974A1494](/blog/obsidian-assets/33edc0d3-aeb4-4b03-af83-9554974a1494-6826a93b22.png)
4. 存在两种重载的方式：
	1. **成员重载**：在**类的范围内声明**重载的运算符
		1. `bool StanfordID::operator< (const StanfordID& rhs) const {...}`
		2. 通过成员运算符重载，**隐示Implicit的第一个参数**是  `this` 指向调用对象的指针
		3. **不能同时将两个变量都作为外部变量引入**，会产生未定义行为
		4. **适合**：**左操作数是当前类对象的场景**，如`a + b`中的`a`是当前对象，且无需支持左操作数的类型转换，如  `[]` 、 `()` 、 `->`  等运算符
		5. 成员函数版本**不能对左操作数进行类型转换**（**难以支持交换律**）
			- `String operator+(const String& that) const {}`
			- `"Hello" + a`会报错，因为  `"Hello"`  是  `const char*` ，不是  `String`  对象，无法调用  `operator+`
	2. **非成员重载**：在**类定义之外声明**重载的运算符，将**左右操作对象都定义为参数**
		1. `bool operator< (const StanfordID& lhs, const StanfordID& rhs);`
		2. 不能使用`this->`以及类中的变量，会产生未定义行为
		3. 默认只能访问类的公有成员，**若需访问私有成员**，类内定义使用 `friend` 关键字,见[friend友元函数](/blog/notes/courses/course-cpp/cs106l-and-oop)
		4. **适合**：
			1. 需要**支持交换律**
			2. **左操作数不是当前类对象的场景**
				- 如流运算符`cout << a`，左操作数是`ostream`
			3. **无法修改类的源代码**（如第三方库类），需通过全局函数扩展运算符功能
5. **重载技巧与规范**
	1. **参数传递**
		- **只读参数**（如运算符  `+` 、 `==`  的操作数）：优先用  `const &`  传递，避免拷贝开销,内置类型除外
		- **成员函数**：只读操作需加 `const` 修饰，如`operator+`后的`const`，保证不修改调用对象
	2. **返回值**
		- **算术运算符**：返回新对象（**值返回**），现代C++不推荐返回`const T`,会抑制移动语义
			- C++11 之前没有移动语义，当时返回`const T`是为了**禁止无意义的临时对象赋值**
				- 比如`(a + b) = 5;`, `a + b`的结果是临时对象，给临时对象赋值完全没有意义，赋值后临时对象就销毁了
				- 返回  `const T`  会让这种代码直接编译报错，避免程序员写出逻辑错误
			- **移动语义**的前提是被移动的对象必须是**可修改的右值**，导致原本可以移动的临时对象只能拷贝，浪费了移动语义的性能优势
		- **关系运算符**：返回`bool`类型，保证逻辑语义清晰
		- **赋值运算符**：返回  `T&` ，支持**链式赋值**
	3. **必须用成员函数重载的运算符**(不能用friend)
		- ![Screenshot_20251229_150318](/blog/obsidian-assets/screenshot-20251229-150318-05d5a197c5.jpg)
		-  `=`  赋值运算符：需绑定当前对象，防止非法赋值（如  3 = a ），直接访问内部成员完成赋值。
		-  `()`  函数调用运算符：依赖对象内部状态， `this`  指针可直接访问，模拟函数调用语义更自然
		-  `[]`  下标运算符：需访问对象内部索引资源，适配  `obj[i]`  语法，确保左操作数是可索引对象
		-  `->`  成员访问运算符：依赖对象存储的目标地址，模拟指针访问逻辑，需  `this`  绑定当前对象
		-  `->*`  指向成员的指针访问运算符：需结合对象地址与成员偏移量计算， `this`  指针确保绑定当前对象，完成成员定位
		-  `++` 、 `--`  自增/自减运算符 若需区分前缀/后缀，成员函数更直观：前缀用  `this`  直接修改对象，后缀加  `int`  占位参数，语法上清晰区分两种语义，无需额外参数传递
	5. **一元操作运算符**应该是**成员函数**，**二元操作运算符**应该是**全局函数**
6. **运算符重载的限制**
	1. 只能重载已有的运算符，**不能发明新的**
	2. 必须**保持操作数的个数**
		- 一元运算符（如  ! ,  ++ ）只能有一个操作数
		- 二元运算符（如  + ,  == ）必须有两个操作数
	3. 重载运算符**不能改变原有的优先级和结合性**。例如：
		- `*`的优先级高于`+`，重载后依然如此
		- 赋值运算符`=`是右结合（`a = b = c`等价于`a = (b = c)`），重载后结合性不变
		- 这意味着**无需（也不能）在重载时指定优先级**，完全遵循原生运算符的规则
	4. 不能改变运算符的**基本语义**，虽然语法允许，但语义混乱会导致代码难以理解和维护
7. **理念**
	1. **“最小惊讶原则”（PoLA）**
		- 因为运算符旨在传达有关某种类型的含义，所以其**含义应当清晰明确**
		- 我们能够定义的运算符通常为算术运算符。其**功能**应当**与对应的运算操作相当**
			- 如直接定义运算符+为集合的差集操作是不合适的
		- 如果含义不明确，可以为此定义一个函数
	2. **相反性规则**
		- 例如，在定义运算符`==`时，可以使用相反性规则来定义运算符`!=`
		- `bool StanfordID::operator==(const StanfordID& other) const {...}`
		- `bool StanfordID::operator!=(const StanfordID& other) const { return !(*this == other);}`
8. **用显式成员函数替代隐式转换运算符**
	1. 隐式类型转换最大风险是**触发意外的函数调用**，编译器会自动触发转换以匹配函数参数
	2. 推荐放弃  `operator T()`  转换运算符，改用命名的显式成员函数（如  `to_double()` ），强制手动调用
## 2. 运算符重载实现
1. **类型转换**（type conversion）
	1. **单参数构造函数**
		1. 若类的构造函数**仅接收一个参数**或**多参数但除第一个外均有默认值**，编译器会自动将该参数类型隐式转换为当前类类型
		2. 若构造函数加 `explicit` ，则**仅允许显式构造，禁止隐式转换**，避免意外类型转换导致的逻辑错误
			```cpp
			class PathName {
			public:
			    explicit PathName(const string& s) : name(s) {}
			};

			PathName p1(abc); // 显式构造（合法）
			// PathName p2 = abc; // 错误：隐式转换被禁止
			// p2 = abc; // 错误：隐式转换被禁止
			```
	2. **类型转换运算符**
		1. 用于将自定义类对象**隐式Implicit或显式Explicit转换**为目标类型，声明格式必须是`operator 目标类型() const;`
			1. `operator` 是关键字，表明这是一个**运算符重载**
			2. `目标类型`指定了要转换到的类型
			3. **没有返回值类型声明**：因为返回值类型就是`目标类型`，语法上**无需重复声明**
			4. **`const` 修饰**：表示该转换不会修改当前对象的成员，是一种只读操作，符合`const`的语义
		2. 转换运算符必须是**类的成员函数**，因为它依赖于当前对象的内部状态
		3. **不需要参数**：类型转换的目的是**将当前对象本身**转换为目标类型，而不是将当前对象与其他参数结合转换。因此，转换运算符**没有参数**，它的操作数就是当前对象
		4. **隐式转换的支持**：
			1. **默认允许隐式转换**
				如`double d = f;`     // 隐式转换为0.5，等价于 `d = (double)f;`
			2. 如果需要**禁止隐式转换**，**仅允许显式转换**
				如`double d = static_cast<double>(f);`，可以在声明时加上`explicit`
				`explicit operator double() const; // 仅允许显式转换`
	3. **构造函数**和**类型转换运算符**的类型转换方式**不能同时存在**，有两种形式的编译报错
		1. 存在**两种同向**类型转换方式：编译器不知道选择哪一种
		2. 存在**双向隐式**类型转换
			如同时定义 `C(int)` 和 `int::operator C()`，`C c = 10`会编译报错
	4. **内置类型隐式转换**（Primitive Conversions）
		编译器自动完成，无需手动干预
		char → short → int → float → double → int → long
	5. **基础引用/指针/数组转换**
		`T-> T&`
		`T&-> T`
		`T*-> void*`
		`T[]-> T*`
		`T*-> T[]`
		`T-> const T`
	6. **最佳匹配规则** best match
		1. 当调用重载函数时，编译器会为每个实参寻找**最佳匹配**的形参类型，匹配优先级按**转换成本从低到高**排序
		2. 若存在**多个相同成本的匹配**，如双向隐式转换，则编译器会报**歧义错误**
		3. 匹配优先级
			1. **精确匹配**：无转换，即实参、形参类型相同，无成本
			2. **内置转换**：内置类型间的隐式转换，低成本
			3. **用户定义转换**：自定义类型的隐式转换，高成本
2. **自增（++）和自减（--）的重载**
	1. 自增 / 自减有**前置**prefix`++a`和**后置**postfix`a++`两种形式，重载时需通过参数区分：
		1. **前置版本**：无参数，返回引用，修改当前对象后**返回自身引用** `Fraction& operator++(){}`
		2. **后置版本**：带一个int 类型的占位参数，无需实际使用，编译器自动传0，**返回值** `Fraction operator++(int){}`(前置对应参数位置为类型T，与后置int不符，故能识别重载的是哪个版本)
	2. **效率**：**前缀更高效**，返回引用，无临时对象拷贝，后缀需拷贝旧值，开销更大
	3. **调用方式**： `++x`  调用前缀  `x.operator++()` ， `x++`  调用后缀  `x.operator++(0)`
	4. 例子
		```cpp
		const Integer& Integer::operator++() {
		    *this += 1;          // 自增
		    return *this;        // 返回新状态进行计算
		}

		// int argument not used, leave unnamed to avoid compiler warnings
		const Integer Integer::operator++(int) {
		    Integer old(*this);  // 拷贝构造旧状态
		    ++(*this);           // 自增
		    return old;          // 返回旧状态进行计算
		}
		```
3. **关系运算符** Rational operator
	1. **复用实现减少冗余**
	2. 优先实现  `==`  和  `<` ，其他关系运算符（ != 、 > 、 <= 、 >= ）基于二者复用，避免逻辑重复和不一致
4. **函数调用运算符/仿函数 Functor** `operator()`
	1. 重载`operator()`可以让对象像函数一样被调用，称为**函数对象**或**仿函数**
	2. 本质是**重载了函数调用运算符  ()  的类/结构体对象**，能像普通函数一样被调用，但兼具**对象特性**，可保存状态、访问成员变量
	3. 普通函数无法保存状态，但仿函数可**通过成员变量存储状态**
	4. 函数对象广泛用于 STL 算法（如排序、遍历）中，作为自定义操作的载体
	5. 示例：
		```cpp
		class FractionScaler {
		... // 具体内容略
		 // 重载()：接收Fraction，返回缩放后的结果
		    Fraction operator()(const Fraction& f) const {
		        return Fraction(f.numerator * scale, f.denominator);
		    }
		}

		Fraction f(1, 3);
		FractionScaler scaler(2);
		Fraction scaled = scaler(f); // 等价于scaler.operator()(f) → 2/3
		```
5. `[]`运算符
	1. **必须是成员函数**：依赖 `this` 指针访问对象内部数组资源，绑定当前可索引对象
	2. **单参数**：接收索引值，匹配数组下标语义
	3. **返回引用 T&**：支持**读写操作**，避免返回指针需解引用的冗余
6. 赋值运算符 `=`
	1. **特性**
		1. **必须是成员函数**：语义绑定当前对象，防止 `3 = a` 等非法赋值
		2. **自动生成**：未显式声明时，编译器自动生成，实现成员逐位赋值，**同默认拷贝构造**
		3. **返回** `T&` ：**支持链式赋值**，需返回 `*this` 引用
		4. **实现重点**：
			- **检查自赋值**`this != &rhs` ：避免**动态内存重复释放**，如 `a = a`
			- **完全赋值**：覆盖所有成员，尤其是指针/动态内存，防止浅拷贝
			- **禁止赋值**：声明为 `private` 或用 `=delete` （C++11+）
	2. **框架**
		```cpp
		T& T::operator=( const T& rhs ) {
			// check for self assignment
			if ( this != &rhs ) {
			// perform assignment
				…
			}
			return *this;
		}
		```
## 3. 强制类型转换符
1. C++ 提供 4 种显式强制转换 Casting Operators 运算符，用于精准控制类型转换，替代 C 语言的 `(type)expression` 旧式转换，区别在于**转换安全性、适用场景、编译器检查力度**
2. `static_cast` **静态转换**
	1. 最常用，显式替代隐式转换
	2. 用途
		- **替代内置类型的隐式转换**，显式声明转换意图，避免隐式转换的意外性
		- 用于相关类型**指针/引用转换**，如子类指针→父类指针，**安全向上转型**（向上转型是**天然安全**的，基类的接口子集一定存在于派生类中，所以 `static_cast` 和 `dynamic_cast` 都会放行，且结果一致）
		- 语法上允许**向下转换**，但 `static_cast` 不会做任何运行时类型检查，如果基类指针实际指向的不是目标派生类对象，会导致未定义行为
		- 不支持：移除 `const`/`volatile`  属性、不相关类型指针转换、不安全的向下转型
	3. 语法：`static_cast<目标类型>(表达式)`
	4. 注意：
		1. 用于对象指针**向下转型**时**不安全**：编译器不做类型检查，若父类指针实际指向的不是子类对象，运行时会触发未定义行为
		2. **不能转换完全不相关的变量**，如无继承关系的类或不相关的基础类型指针，会直接报错，如 `int*` 不能和 `double*` 相互转换
		3. **不能转换常量**，要使用 `const_cast`
		4. `static_cast` 是**编译期转换**，要么编译通过（不管运行时是否安全），要么直接编译失败
3. `dynamic_cast` **动态转换**
	1. 仅用于多态，**安全向下转型**
	2. 用途
		- 专门用于**多态类的指针/引用转换**，必须包含虚函数，否则编译报错
		- 仅支持**向上转型**和**向下转型**
		- 转换时会**运行时检查类型兼容性**：若转换不安全，如父类指针指向父类对象，返回 `nullptr`（指针）或抛出  `bad_cast` 异常（引用）
			- **安全的向下转换**：基类指针 / 引用**实际指向派生类对象**，转换后访问的内存是合法的
			- **不安全的向下转换**：基类指针 / 引用**实际指向基类对象**，转换后会访问不存在的内存
	3. 语法：`dynamic_cast<目标类型>(表达式) // 目标类型必须是指针或引用，且类含虚函数`
	4. 注意：
		1. 仅支持**继承体系内的转换**，不支持跨继承体系转换
		2. 兄弟子类之间不能通过`dynamic_cast`相互转换，**会返回`nullptr`**，因为兄弟子类之间**没有继承关系**
		3. **没有虚函数的类**不能通过`dynamic_cast`转换，**会直接报错**
		4. `dynamic_cast` 是**运行时类型检查**，在编译通过的前提下，运行时类型不匹配才会返回 `nullptr` 或报错
4. `const_cast` **常量转换**
	1. 修改 const/volatile 属性的转换
	2. 用途
		- 专门用于**添加/移除变量的 const 属性 或 volatile 属性**
			- volatile 用于防止编译器优化，确保变量每次从内存读取
		- `const_cast` 中的类型**必须是指针、引用或指向对象类型成员的指针**
		- 注意：若原变量是**顶层 const 变量**（本身不可修改，如  `const int g = 20`），移除 const 后修改会触发未定义行为，这类变量编译时**可能存入只读内存**，修改会导致运行时崩溃
	3. 语法：`const_cast<目标类型>(表达式) // 目标类型必须是指针或引用`
5. `reinterpret_cast` **重新解释转换**
	1. **底层强制转换**，风险最高
	2. 用途
		- 用于 **完全不相关类型的指针/引用转换** 或 **指针与整数(存储指针的地址值)的相互转换**
		- 编译器仅做**比特位重新解释**，即按照存储形式重新解释，**不做任何类型检查或安全性验证**
		- **不支持**：**非指针/引用的同类型转换**、移除 const 属性
	3. 语法：`reinterpret_cast<目标类型>(表达式) // 目标类型通常是指针/引用/整数`
6. **总结**
	1. 优先用 `static_cast`：替代隐式转换，清晰表达意图，避免滥用
	2. 多态向下转型用 `dynamic_cast`：依赖**运行时检查**，避免崩溃，需要判断 NULL 或捕获异常
	3. 谨慎用 `const_cast`/`reinterpret_cast`：前者仅用于临时移除底层 const，后者仅用于底层开发，日常开发尽量避免
# 十一、特殊成员函数SMFs
## 1. 概述
1. **特殊成员函数（Special Member Functions, SMFs）** 是类中具有特定名称和用途的成员函数，编译器会在需要时**自动生成**这些函数（除非被用户显式定义或禁用）
2. **SMFs**仅在被调用时（且在你显式定义任何一个之前）才会生成：
	- **默认构造函数**（Default constructor）：`T()`
		- **不接受任何参数**，并创建一个**新的对象**
	- **析构函数**（Destructor）：`~T()`
		- 当对象**超出作用域**时触发
	- **复制构造函数**（Copy constructor）：`T(const T&)`
		- **作用**：**用已有对象创建新对象**（如 `ClassName obj2 = obj1;` ），默认实现为**按成员浅拷贝**
		- **自动生成条件**：类中未显式声明**复制构造、移动构造、移动赋值**
	- **复制赋值运算符**（Copy assignment operator）：`T& operator=(const T&)`
		- **作用**：**用已有对象给另一个已存在的对象赋值**（如  `obj2 = obj1;` ），默认实现为**按成员浅拷贝**
		- **自动生成条件**：类中未显式声明**复制赋值、移动构造、移动赋值**
	- **移动构造函数**（Move constructor）：`T(T&&)`
		- **作用**：用**即将销毁的右值对象**（如临时对象）创建新对象，转移资源所有权而非拷贝
		- **自动生成条件**：类中未显式声明任何 SMFs，且所有成员都可移动，即支持移动构造/赋值
		- 默认实现：**按成员移动**（转移  other  的资源到新对象，之后  other  会处于有效但未定义状态，不可再使用）
	- **移动赋值运算符**（Move assignment operator）：`T& operator=(T&&)`
		- **作用**：用即将销毁的右值对象给已有对象赋值，转移资源所有权
		- **自动生成条件**：未显式声明任何 SMFs，且成员可移动
		- **与移动构造的区别**：修改已有对象，需先释放自身原有资源，再转移other的资源。
## 2. 复制与复制赋值与浅拷贝
1. **初始化列表**
	1. 直接使用预期的值来构造成员变量会更快且更高效（使用赋值会先默认初始化后再赋值，双倍工作量）
		```cpp
		template <typename T>
		Vector<T>::Vector() : _size(0), _capacity(4), _data(new T[_capacity]) { }
		// 用｛｝初始化const成员，比用 () 更规范，C++11及以后推荐
		Vector<T>::Vector() : _size{0}, _capacity{4}, _data{new T[_capacity]} { }
		```
		隐式窄化中 `{}` 会直接编译报错，而 `()` 可能静默转换
	2. 如果变量是**不可赋值**的类型,**必须使用**初始化列表
		- **const 成员变量**
		- **引用成员变量**（不能重新绑定新变量）
		- **没有默认构造函数的类成员**
	3. **可用于任何构造函数**，包括带有参数的非默认构造函数
2. **浅拷贝与深度复制**
	1. **浅拷贝**：
		1. **默认情况下**，复制构造函数会为每个成员变量**创建副本**，这是按成员进行的复制操作（member-wise copying）
		2. 如果变量是一个**指针**，那么成员级复制操作将会指向相同的已分配数据，而不是生成一个新的副本，修改一个对象的指针指向数据，会**影响另一个对象**；若指针指向动态内存，析构时会**双重释放**导致崩溃
	2. **深度复制** Deep copy
		- 一个完全独立的、与原始对象完全相同的对象。在这些情况下，您需要用自己的实现来覆盖默认的特殊成员函数
		- 在头文件中声明，并在 `.cpp` 文件中编写实现部分
			```cpp
			template <typename T>
			Vector<T>::Vector(const Vector<T>& other)
			    : _size(other._size),
			      _capacity(other._capacity),
			      _data(new T[other._capacity])
			{
			    for (size_t i = 0; i < _size; ++i)
			    {
			        _data[i] = other._data[i];
			    }
			}
			```
3. **`char *`和 `string`** 的构造区别
	1. C风格字符串的定义：以 `'\0'` （ASCII空字符）为终止符的字符数组，针对 `private: char *name;`，必须手动实现**复制构造函数+构造/析构**，**避免浅拷贝陷阱**
	2. 若把 `char *name` 改为 `string name`，则无需手动声明任何复制构造函数。string 是**智能类**，内部已实现深拷贝，自带复制构造函数，会拷贝字符串内容而非指针
4. **复制构造函数触发条件**
	1. **函数按值传递**
		1. 触发条件：**形参为值类型**，非引用/指针
		2. 示例： `void f(Person p); Person obj; f(obj);`
		3. 结论：**创建实参副本**，触发1次复制构造，引用/指针不触发
	2. **对象初始化**
		1. 触发条件：**用已有对象初始化全新对象**
		2. 示例： `Person a("A"); Person b = a; Person c(a);`
		3. 结论：**两种语法均触发**，与赋值操作区分
	3. **函数值返回**
		1. 触发条件：函数**以值类型返回局部对象**
		2. 示例： `Person f() { Person p; return p; } Person obj = f();`
		3. 结论：**未优化时**触发1次，C++17+ RVO优化可省略；**禁止返回局部对象引用/指针**
	4. **判断标准**：仅当**创建新对象**且**以已有对象为副本初始化**时触发，否则不触发
5. **编译器拷贝优化**
	1. **优化规则**：安全前提下，编译器可省略不必要的拷贝，如RVO返回值优化、NRVO具名返回值优化
		- **RVO**（Return Value Optimization，返回值优化）
			1. **定义**：返回**匿名临时对象**时，编译器直接在调用者的内存空间构造该对象，跳过局部临时对象→返回值副本的拷贝
			2. 示例代码：
				```cpp
				Person func() {
				  return Person("Alice"); // 返回匿名临时对象（无变量名）
				}
				Person obj = func(); // 优化后：直接在obj的内存中构造Person("Alice")
				```
			3. **优化效果**：**仅1次普通构造**，无复制/移动构造，C++17后强制启用
		- **NRVO**（Named RVO，具名返回值优化）
			1. **定义**：返回具名局部对象（有变量名）时，编译器同样在调用者内存中构造该对象，跳过拷贝
			2. 示例代码：
				```cpp
				Person func() {
				  Person p("Bob"); // 具名局部对象（有变量名p）
				  return p;
				}
				Person obj = func(); // 优化后：直接在obj的内存中构造Person("Bob")
				```
			3. **优化效果**：**仅1次普通构造**，无复制/移动构造，C++17后可选支持
	2. **程序员原则**：先**兼容无优化编译器**写安全代码，再关注优化，避免依赖优化导致代码失效
6. **函数开销**
	1. **有拷贝开销的函数**
		1. 函数类型：传**值参数+值返回**的函数
		2. 代码示例： `Person copy_func(Person p) { p.print(); return p; }`
		3. **拷贝情况**：**会触发2次复制构造**，第一次是实参传递给形参p，创建实参副本，第二次是返回p时创建返回值副本
		4. 原因：传值参数本身需要创建副本，值返回又要额外创建返回值副本，两次拷贝叠加产生开销
	2. **无拷贝**（**编译器优化**）**的函数**
		1. 函数类型：**直接返回临时对象的函数**
		2. 代码示例： `Person nocopy_func(const char* who) { return Person(who); }`
		3. 拷贝情况：零拷贝，**仅触发1次普通构造**
		4. 核心原因：编译器通过RVO返回值优化，直接在调用者的内存空间构造临时对象 `Person(who)` ，跳过了创建局部对象→拷贝为返回值的过程，无额外拷贝开销
## 3. SMFs的使用原则
1. 我们**可以删除或使用默认特殊成员函数**
	1. 新版禁用：**使用`delete`**
		- `PasswordManager (const PasswordManager& rhs) = delete;`
		- `PasswordManager& operator = (const PasswordManager& rhs) = delete;`
	2. 旧版禁用：**声明为私有且不定义**
		- `private: Person(const Person&);` ，间接禁止拷贝
	3. 新版默认：**使用`default`**
		- `PasswordManager (const PasswordManager& rhs) = default;`
	4. 旧版默认：**函数体写 {}** 等价于默认实现
		- `Person(const Person&) {};`
2. **最小必要原则**
	1. 如果**默认**的 SMF 功能**能够正常运行**，就**不要自行定义新的**功能
		- 如果类通过**组合**（包含其他类的对象作为成员）依赖外部类型，且这些外部类型已实现完善的 SMFs，那么外层类无需重复实现相同逻辑 —— 编译器自动生成的 SMFs 会 “委托” 给成员的 SMFs 执行
	2. 只有在默认编译生成的功能**无法正常运行**时，我们**才应该定义**新的功能
		- 这种情况通常会在我们使用动态分配的内存（比如指向堆上数据的指针 `new`/`delete`）时出现
3. **三法则**
	1. 定义：如果**你需要一个自定义的析构函数**，那么你可能还需要为你的类**定义一个复制构造函数**和**一个复制赋值运算符**。
	2. 原因：如果你使用了析构函数，通常意味着你正在手动处理动态内存分配/或者基本上是在自己管理**内存**。如果是这种情况：编译器**无法自动**为你生成这些函数，因为**存在手动内存管理**的问题
4. 初始化分析
	```cpp
	// 定义一个返回vector<int>的函数，参数为按值传递的vector<int>（会创建实参的副本）
	vector<int> func(vector<int> vec0) {
	    // 默认初始化：创建一个空的vector<int>，size为0，无任何元素
	    vector<int> vec1;

	    // 计数构造：调用vector(size_t n)构造函数，创建包含3个int元素的vector
	    // 每个元素为int的默认值0，size为3，元素为[0, 0, 0]
	    vector<int> vec2(3);

	    // 列表初始化：优先匹配initializer_list构造函数，创建包含1个元素的vector
	    // 元素值为3，size为1，元素为[3]
	    vector<int> vec3{3};

	    // 注意：这不是vector对象初始化，而是函数声明！
	    // 编译器解析为"声明一个名为vec4、返回vector<int>、无参数的函数"
	    vector<int> vec4();

	    // 复制构造：用vec2作为源对象，创建vec5（vec5是vec2的副本）
	    // size为3，元素为[0, 0, 0]（与vec2完全相同）
	    vector<int> vec5(vec2);

	    // 空列表初始化：创建一个空的vector<int>，等价于默认初始化，size为0
	    vector<int> vec6{};

	    // 计算初始化值：vec2的size(3) + vec6的size(0) = 3，强转为int后仍为3
	    // 列表初始化：创建包含1个元素的vector，元素值为3，size为1，元素为[3]
	    vector<int> vec7{static_cast<int>(vec2.size() + vec6.size())};

	    // 复制初始化：本质调用复制构造函数，用vec2初始化vec8（vec8是vec2的副本）
	    // size为3，元素为[0, 0, 0]
	    vector<int> vec8 = vec2;

	    // 复制赋值运算：调用vector的operator=，将vec2的内容赋值给已存在的vec8
	    // 此处因vec8已与vec2相同，操作后无变化（仍为size=3，元素[0,0,0]）
	    vec8 = vec2;

	    // 按值返回：返回vec8的副本（通过复制构造函数创建）给函数调用者
	    return vec8;
	 }
	```
# 十二、移动和移动赋值
## 1. 问题
1. **RVO**（Return Value Optimization，返回值优化）：用于消除函数返回对象时产生的不必要的拷贝操作，从而提升程序性能
2. 使用移动构造函数（Move constructor），从而不进行任何复制操作而创造新对象
3. 移动与复制语义对比
	1. `Photo selfie = pic;` // 对**持久对象（例如变量）进行复制**（这些对象可能在将来被使用）
	2. `Photo selfie = takePhoto(); ` // **移动临时对象（例如返回值）** ,因为我们不再需要使用它们了
## 2. 左值和右值
1. 左值和右值在 C++ 中对“临时性”这一概念进行了扩展和阐述，一般来说，**左值有明确的地址**，而**右值则没有**
2. **左值**可能会出现在`=`的**任意一侧**，**右值只能**出现在`=`的**右侧**
3. 一个**左值**的生命周期一直持续到**作用域的结束**,而一个 **右值** 的生命周期则一直持续到**当前行的结束**
4. **左值**是**恒定不变**的，**右值**是**临时**的
5. 如何**避免对内存复制**--可以通过**引用**传递
	1. **左值引用（Lvalue References）**
		- **语法（Syntax）**：`&`（例如 `int&`、`std::string&`）
		- 核心特性：**持久性（Persistent）** —— 左值引用绑定的对象必须是 “持久存在” 的（如变量、全局对象等左值），且**函数结束后需保证引用的对象仍处于有效状态**
	2. **右值引用（Rvalue References）**
		- **语法（Syntax）**：`&&`（例如 `int&&`、`std::string&&`）
		- 核心特性：**临时性（Temporary）** —— 仅能绑定 “临时对象” 或 “即将销毁的对象”（如字面量、函数返回的临时值、`std::move`转换后的对象）
		- 移动后，**原临时对象**可能处于 “**无效但可析构**” 的状态（例如原字符串的内存被转移后，原对象可能为空），但这完全合法，因为临时对象本就会很快销毁，后续不会再被使用
	3. 关键概念：重载运算符`&`和`&&`所对应的参数分别区分左值引用和右值引用
6. 通过编译器自动选择重载哪一个函数
## 3. 移动语义学
```cpp
// ------------------------------
// 1. 复制语义：拷贝构造函数
// ------------------------------
Buffer(const Buffer& other)
	: size(other.size), data(new char[other.size + 1]) { // 新分配内存
	strncpy(data, other.data, other.size); // 复制数据
	data[other.size] = '\0';
}

// ------------------------------
// 2. 复制语义：拷贝赋值运算符
// ------------------------------
Buffer& operator=(const Buffer& other) {
	if (this == &other) return *this; // 自赋值检查

	// 释放当前旧资源
	delete[] data;

	// 分配新资源并复制数据
	size = other.size;
	data = new char[size + 1];
	strncpy(data, other.data, size);
	data[size] = '\0';

	return *this;
}


// ------------------------------
// 3. 移动语义：移动构造函数
// ------------------------------
Buffer(Buffer&& other)
	: size(other.size), data(other.data) { // 直接接管指针
	// 源对象置空（避免析构时重复释放）
	other.data = nullptr;
	other.size = 0;
}

// ------------------------------
// 4. 移动语义：移动赋值运算符
// ------------------------------
Buffer& operator=(Buffer&& other) {
	if (this == &other) return *this; // 自赋值检查

	// 释放当前旧资源
	delete[] data;

	// 接管源对象资源
	size = other.size;
	data = other.data;

	// 源对象置空
	other.data = nullptr;
	other.size = 0;

	return *this;
}
```
## 4. `std::move` 和 SMFs
1. 强制移动语义
	- 通常情况下，我们让编译器来决定使用`&`和`&&`，但这并不总是最高效的选择呢
	- 通过使用`std::move`来强制移动左值
2. `std::move`
	1. 核心作用非常简单：**把一个左值强制转换成右值引用**
	2. 过程可以理解为`return static_cast<typename std::remove_reference<T>::type&&>(t);`
	3. 就像`const_cast`一样，我们选择了可能会出现错误的这种行为方式
	4. 除非有充分的理由，否则**尽量避免直接使用**`std::move`, 例如：性能确实很重要，知道这个对象后续不会被使用
3. 零、三、五法则
	1. **零法则** 如果一个类**不管理内存**（或其他外部资源），那么编译器生成的 SMF 版本就足够用了
	2. **三法则** 如果一个类**需要管理外部资源**，就**必须定义复制赋值/构造函数/析构函数**。如果不这样做，编译器自动生成的SMF将无法复制底层资源
	3. **五法则** 如果我们定义了拷贝构造函数/赋值操作以及析构函数，那么我们**也应该定义移动构造函数/赋值操作**，这**并非必须**的，但我们的代码会因此变得较慢，因为其中包含了不必要的复制操作
# 十三、异常处理
## 1. 异常
1. **异常的目的**
	- **目的**：处理**运行时错误**，如文件打开失败、数组越界、内存分配失败，避免程序异常终止或产生无效结果
	- **优势**：**分离业务逻辑代码与错误处理代码**，解决传统错误码errorCode方式的冗余、逻辑混乱问题
 2. **传统错误处理的局限**
	- 如通过 readFile 函数的错误码返回机制，需嵌套多层 if-else 判断，代码可读性差、维护成本高
	- **函数执行逻辑**：**打开文件→判断大小→分配内存→读取文件→关闭文件**，每个步骤都需先判断是否成功，只有前一步成功，才能执行下一步，否则直接赋值错误码，-1到-5对应不同失败场景
3. **调用者对异常的4种处理场景**
	1. **不关心**：**不尝试捕获或处理**异常，程序**直接终止**
	2. **高度关注**：捕获异常并**处理，不传播**
	3. **适度关注**：捕获后重新抛出，**让上层处理**
		实现方式：在`catch`中直接`throw;`
	4. **不关心细节**：用 `catch(...)` **捕获所有类型异常**，终止传播
## 2. **异常的基本用法**
1. **语法**
	1.  `try` ：**包裹可能抛出异常的代码**，监控代码块，一旦内部代码抛出异常，立即触发异常捕获流程
		- `try`块**不能单独存在**，必须紧跟一个或多个`catch`块，否则编译报错
		- **可嵌套使用**：内部`try`块未捕获的异常，会向上层`try`块传播
	2.  `throw` ：关键字，**在错误发生点抛出异常**，中断当前代码执行，将控制权转移给匹配的`catch`块
		- **可携带任意类型数据**：基础类型、自定义类对象
		- **抛出后立即终止当前函数执行**： `throw` 后面的代码不会被执行
		- **携带数据的必要性**：仅抛出异常类型不够，需传递错误细节，如非法索引值、文件路径、错误码，帮助`catch`块精准处理
	3.  `catch` ：**捕获指定类型的异常**，执行处理逻辑，可多个`catch`匹配不同异常
		- 多个`catch`块**按从上到下声明顺序匹配**，匹配成功后立即执行该 catch 的逻辑，后续 catch 不再检查。**匹配优先级遵循以下3条规则**，且必须严格按此顺序设计 catch 块
			- 规则1：匹配**精确**类型，即catch 的参数类型与抛出的异常类型完全一致，直接匹配成功
			- 规则2：匹配**基类**类型，即若抛出的是派生类对象，且当前 catch 的参数是其基类的引用或指针，则匹配成功
				- 必须**将基类 catch 放在派生类 catch 之后**，否则派生类异常会被基类 catch 提前捕获，导致派生类的专属处理逻辑失效
			- 规则3：最后匹配`catch(...)`，必须放在所有 catch 块的最后，否则后续 catch 都会失效
		- **捕获类型必须与抛出类型兼容**：**派生类异常可被基类**`catch`**捕获**，如`throw OverflowErr()`可被`catch(MathErr&)`捕获
		- **两种特殊捕获形式**：
			-  `catch(ExceptionType& e)` ：**按引用捕获**，避免拷贝，支持多态调用，如基类引用捕获派生类对象
			-  `catch(...)` ：捕获所有类型异常，必须放在所有`catch`块最后，用于处理未预期的异常
2. **自定义异常类设计**
	1. 自定义异常类优点
		- 内置类型携带的错误信息有限，无法满足复杂场景
		- **支持继承结构化**：通过类继承构建异常体系，实现**同类错误统一处理**
	2. **设计规范**
		- **结构**：
			- **成员变量**：存储错误细节
			- **构造函数**：使用传递错误细节的参数，初始化错误信息
			- **成员函数**：**提供诊断能力**，如 `diagnostic()` 打印错误信息
			- **可继承标准库 exception 类** 可选：兼容标准库异常处理逻辑，支持 `what()` 方法
3. **异常传播**
	1. **作用**：负责找到能处理异常的代码
	2. **匹配逻辑**
		异常从`throw`抛出点开始，中断当前函数的正常执行，沿着**函数调用链**向上回溯，从底层被调用函数回到上层调用函数，逐个检查每个函数是否包含`try-catch`块：
		- 若某层函数的`try`块后**有匹配**的`catch`，**则异常被捕获**，执行该`catch`的处理逻辑，之后跳转到`try-catch`块后的代码**继续执行**
		- 若该层**无**`try-catch`或`catch`**不匹配**，则**继续向上回溯**，直到找到匹配的 catch
		- 若回溯到程序**入口**，仍无匹配的`catch`，则调用`std::terminate()`**终止程序**
4. **栈展开**：**自动销毁栈上局部对象**，避免资源泄漏
	1. **定义**：异常传播时，从抛出点到匹配 `catch` 的回溯过程中，系统会**自动销毁**沿途所有**栈上的局部对象**，即非 `new` 分配的对象，这个过程就是栈展开
	2. 目的：**确保资源释放**
		栈上对象的**析构函数会被自动调用**，从而释放对象持有的资源，如文件句柄、网络连接、锁等，避免资源泄漏
5. 异常匹配与结构化设计
	1. **Handler匹配顺序**：按声明顺序匹配
		1. **精确类型匹配**
		2. **基类与派生类转换**：派生类异常可被基类 `catch` 捕获
		3.  `catch(...)`：**捕获所有异常**，需放在最后
	2. **继承结构化异常**
		- 通过继承定义异常体系，如基类 `MathErr` ，派生 `OverflowErr` / `UnderflowErr` ，统一处理同类错误
## 3. 标准库异常与设计原则
1. C++ 标准库异常（Standard Library Exceptions）：C++ 标准库提供了统一的异常体系，所有异常均继承自顶层基类  `std::exception` ，定义于  `<exception>`  头文件，用于处理标准库操作（内存分配、类型转换、容器访问等）的错误，也支持用户自定义异常兼容
2. **继承体系**
	![Screenshot_20251222_134302](/blog/obsidian-assets/screenshot-20251222-134302-3990470bf1.jpg)
	`std::exception` 顶层基类
	├─ 逻辑错误类：`std::logic_error` 编译时可预判，如参数错误
	│  ├─ `std::invalid_argument` 无效参数
	│  ├─ `std::out_of_range` 访问越界
	│  └─ `std::domain_error` 定义域错误，如数学函数无效参数
	├─ 运行时错误类：`std::runtime_error` 编译时不可预判
	├─ 内存分配错误：`std::bad_alloc` `new` 分配内存失败时抛出
	├─ 类型转换错误：`std::bad_cast` `dynamic_cast` 引用转换失败
	├─ 类型识别错误：`std::bad_typeid` `typeid` 作用于空指针且无虚函数
	└─ 异常处理错误：`std::bad_exception` 内部异常处理故障
3. `new`的异常行为**规则**：
	C++中`new`或`new[]` 分配内存失败时，区别于C语言 `malloc`，不会返回 `NULL` ，而是直接抛出 `std::bad_alloc` 异常
4. **异常说明符** Exception Specifications：函数异常声明
	1. 异常说明符用于声明函数**是否会抛出异常**或**可能抛出哪些异常**，影响编译器优化和运行时行为，分两种语法
	2. 现代语法：`noexcept` C++11+
		1. 语法
			```cpp
			// 声明函数不会抛出任何异常
			void abc(int a) noexcept { ... }
			// 等价于noexcept
			void def() noexcept(true) { ... }
			// 声明函数可能抛出异常
			void ghi() noexcept(false) { ... }
			```
		2. 特性
			- 编译时：编译器可基于 `noexcept` 做优化，如省略异常安全相关代码，提升性能，不强制检查函数是否真的不抛异常
			- 运行时：若 `noexcept` 声明的函数抛出了异常，系统会直接调用 `std::terminate()` 终止程序，不会触发异常传播和栈展开
			- 用途：明确告知编译器和调用者**函数无异常**
	3. 旧语法：`throw(类型列表)` C++11过时，C++17废弃
		1. 语法与含义
			```cpp
			// 声明函数仅可能抛出MathErr类型异常
			void abc(int a) throw(MathErr) { ... }
			// 声明函数不抛出任何异常,等价于noexcept
			void xyz() throw() { ... }
			```
		2. 特性与废弃原因
			- 编译时：同样不检查函数是否严格抛出声明的异常，仅为**提示性声明**
			- 运行时：若函数抛出了**类型列表外的异常**，系统会调用 `std::unexpected()` ，默认触发 `std::terminate()`
			- 废弃：C++11 标记为过时，C++17 正式移除，仅保留 `throw()` ，等价于 `noexcept(true)` ，原因是**编译时不检查**导致**实用性低**，且语法冗余
			- 注意：现有代码中若见 `throw()` ，可直接替换为 `noexcept` ，行为完全一致
5. **异常代码设计原则**
	1. 异常仅用于错误场景，**不替代正常控制流**
		- 例子
			```cpp
			try {
			    for (;;) {
			        p = list.next();  // 遍历列表，直到末尾
			    }
			// 用异常表示列表遍历结束
			} catch (List::end_of_list) {
			    // 处理列表末尾逻辑
			}
			```
		- **问题**：列表遍历结束是正常控制流，而非错误，用异常会
			1. **降低性能**：异常处理开销远大于循环条件判断
			2. **语义混淆**：调用者无法区分错误和正常结束异常
		- **正确做法**：用循环条件判断如 `while (p != list.end())` 终止遍历，异常仅保留给列表访问失败等错误
	2. 用[RAII资源获取即初始化](/blog/notes/courses/course-cpp/cs106l-and-oop)**替代手动资源清理**，避免catch块冗余
		- **错误示例**：手动打开，关闭文件，即使对象析构了，析构函数里也没有`close()`逻辑，无法自动释放资源，需要手动析构
			```cpp
			void func() {
			    File f;
			    if (f.open("somefile")) {  // 手动打开文件
			        try {
			            // 操作文件（可能抛异常）
			        // 捕获所有异常，手动关闭文件
			        } catch (...) {
			            f.close();
			            throw;  // 重新抛出异常
			        }
			        f.close();  // 正常流程也需手动关闭
			    }
			}
			```
		- **问题**：**代码冗余**，正常流程和异常流程都要写 `f.close()` ，且若遗漏手动关闭，如 `try` 块内提前返回，会导致资源泄漏
		- **正确示例**：**RAII** 资源获取即初始化
			```cpp
			void func() {
			    File f("some file");  // 构造函数中打开文件（资源获取=初始化）
			    if (f.ok()) {
			        // 操作文件（可能抛异常）
			    }
			    // 无需手动关闭：函数结束时，f出栈，析构函数自动调用close()
			    // 即使try块内抛异常，栈展开时也会调用析构函数，确保文件关闭
			}
			```
		- 核心：利用**栈上对象的析构函数自动执行**特性，将资源释放逻辑放入析构函数，无论是否抛异常，资源都能安全释放，代码简洁且无泄漏风险
	3. 抛出异常时通过自定义异常类**携带完整错误信息**，便于处理
	4. 捕获异常优先按**const 引用**，避免切片问题和内存泄漏
	5. **不滥用** try-catch ，仅在需要处理异常的层级捕获，无需层层包裹
	6. **早期制定错误处理策略**：在系统设计阶段明确哪些场景抛异常、异常如何传播、谁来处理，避免后期混乱
	7. **明确函数的异常责任**：不是所有函数都能处理所有错误，底层函数可直接抛异常，由上层调用者根据场景处理
	8. **主要接口用异常说明符**：通过 noexcept 明确函数是否抛异常，助力编译器优化，也让调用者提前预判风险
	9. **库代码不终止程序**：库函数仅抛出异常，将是否终止程序的决策权交给客户端（调用者），提升库的灵活性和兼容性
6. **异常作用总结**
	错误恢复是一项极具挑战性的设计问题：
	1. 所有子系统均需客户端的配合，才能妥善处理异常情况
	2. 异常机制为错误恢复提供了关键支持：
		- 异常会动态传播，沿调用链回溯寻找匹配的处理器
		- 传播过程中栈上对象会被正确销毁，避免资源泄漏
		- 能直接终止出现问题的函数，防止错误扩散
	3. 异常的重要用途之一：**处理无法完成初始化工作的构造函数**，构造函数无返回值，异常是告知初始化失败的有效方式
## 4. 异常关键场景及捕获方式
1. **异常与构造函数**
	1. **问题**：**构造函数无返回值**，无法通过返回值告知初始化失败，如内存分配、文件打开失败
	2. **解决方案对比**
		- **不推荐方案**：用**未初始化标志**或 `init()` 函数延迟初始化，逻辑冗余，易遗漏初始化
		- **推荐方案**：初始化失败时**直接抛出异常**，最直观、无冗余
	3. **关键注意事项**
		- 抛出异常后，该对象的**析构函数不会被调用**
		- 必须在**抛出前手动清理已分配的资源**，如 new 的内存、打开的文件句柄，否则会导致内存泄漏
		- **优化方案**：
			- **两阶段构造**：构造函数仅初始化成员，不申请资源，资源申请放在 `init()` 函数中
			- [智能指针](/blog/notes/courses/course-cpp/cs106l-and-oop) `std::unique_ptr` / `std::shared_ptr`：自动管理指针资源，析构时自动释放，避免手动清理遗漏
2. **异常与析构函数**
	1. **析构函数的调用场景**
		- **正常流程**：对象**超出作用域**时自动调用
		- **异常流程**：**栈展开**即异常传播时，自动调用栈上对象的析构函数
	2. **注意点**
		- 若析构函数在栈展开过程中（已有异常未处理）**抛出新异常**，会直接触发 `std::terminate()` **终止程序**
		- **设计规则**：**绝不允许异常从析构函数中逃离**，析构函数内需捕获所有可能的异常，或避免产生异常，防止析构未完成导致资源泄露
3. **异常捕获方式**
	1. 不推荐：**按值捕获** Value Capture
		- 示例
			```cpp
			struct X {};
			struct Y : public X {}; // Y是X的派生类

			try {
			    throw Y(); // 抛出派生类对象
			} catch (X x) { // 按值捕获基类X
			    // 问题：发生对象切片
			    // 无法判断捕获的是X还是Y，破坏多态特性
			}
			```
		- **缺陷**：派生类对象**被基类类型捕获时**，会因为**对象切片**丢失派生类的特有成员和行为，导致信息丢失和逻辑错误
	2. 不推荐：**按指针捕获** Pointer Capture
		- 示例
			```cpp
			try {
			    throw new Y(); // 抛出动态分配得到的指针
			} catch (Y* p) { // 按指针捕获
			    // 忘记delete指针，导致内存泄漏
			    // 代码耦合,抛出方和捕获方需约定内存释放规则
			}
			```
		- **缺陷**：动态分配得到异常指针，引入内存管理负担，易遗漏 `delete` 导致泄漏，且**增加代码耦合度**，正常代码与异常处理代码耦合，破坏异常处理的简洁性
	3. 推荐：**按引用捕获** Reference Capture
		- 例子
			```cpp
			struct B {
			    virtual void print() const { cout << "B error" << endl; } // 虚函数支持多态
			};
			struct D : public B {
			    void print() const override { cout << "D error" << endl; } // 派生类重写
			};

			try {
			    throw D("D error"); // 抛出派生类对象
			} catch (B& b) { // 按引用捕获基类B
			    b.print(); // 多态调用，输出"D error"（保留派生类行为）
			}
			```
		- **优势**：
			1. **避免对象切片**：完整保留抛出对象的类型信息和特有行为
			2. **支持多态**：基类引用可调用派生类的重写方法，适配结构化异常体系
			3. **无内存泄漏**：无需手动管理内存，且避免对象拷贝，提升效率
			4. **建议优化**：优先用 **const 引用**，避免捕获后意外修改异常对象
# 十四、std::optional 与类型安全性
## 1. 类型安全性
1. 类型安全性(Type Safety)
	1. 一种语言在**防止编程错误**方面所达到的程度
	2. 一种语言在多大程度上能够**确保程序的行为表现**
	3. **函数签名**所**确保的函数行为的范围**
2. 两个原则
	1. 类型声明不可随意变更
	2. 操作与类型兼容
## 2. std::optional
1. `std::optional` 是一个模板类，它要么会包含类型为 `T` 的值，要么则不包含任何值（表示为`nullopt`）
2. 注意：`nullopt`并非`nullptr`
	- `nullptr`：一种可以转换为任何**指针类型**值的对象
	- `nullopt`：一种可以转换为任何**可选类型**值的对象
3. 接口
	- `.value()` ：返回**所包含的值**，**否则**会抛出“`bad_optional_access`无效选项访问”**错误**
	- `.value_or(valueType val)`：返回所**包含的值**，若**无返回默认值 `val`**
	- `.has_value()` : 返回 `true` 表示所包含的**值存在**，返回 `false` 则表示该**值不存在**
	- `.and_then(function f)`：如果 `optional` 包含值，则调用函数 `f` 并返回 `f` 的结果（`f` 必须返回一个 `optional` 类型）；如果 `optional` 无值，则直接返回 `std::nullopt`
	- `.transform(function f)`：如果 `optional` 包含值，则调用函数 `f` 对值进行转换，并将转换结果包装为新的 `optional`；如果 `optional` 无值，则返回 `std::nullopt`
	- `.or_else(function f)`：如果 `optional` 包含值，则直接返回该值（类型为 `T`）；如果 `optional` 无值，则调用函数 `f` 并返回 `f` 的结果（`f` 的返回值类型需与 `T` 一致）
4. 优缺点
	- **优点**：
		- 函数签名能创建更具描述性的契约
		- 类函数调用具有可保证且可用的行为
	- **缺点**：
		- 您需要在任何地方都使用 `.value()`
		- 还有可能出现不良的可选访问`bad_optional_access`
		- 可选对象也可能存在未定义的行为（`*optional` 的功能与 `.value()` 相同，但**没有错误检查**）
		- 在很多情况下，我们想要 `std::optional<T&>……`但我们目前没有这种类型
			- 引用必须指向一个有效的对象，而 `optional` 并不能保证这一点，“空值（nullopt）”并非有效的对象
			- 因此`[]`无法避免指向未知位置，而`.at()`方法有防错机制，最好使用`.at()`方法
5. 例子：改造后的`std::back`函数
	```cpp
	std::optional<valueType> vector::back(){
		if(empty()){
			return {};
		}
		return *(begin() + size() - 1);
	}
	```
# 十五、RAIl、智能指针、构建项目
## 1. RAll

1. **异常**(Exceptions)
	- 异常是一种在代码中出现错误时用于处理错误的方法
	- 异常会被**抛出(thrown)**
	- 也可以**编写代码来处理**这些异常，这样我们就能在程序中继续执行而不一定会出现错误
	- 我们称这种行为为 **捕获(catch)** 异常情况
		```cpp
		try {
		    // 我们要检查异常的代码
		}
		catch ([exception type 异常类型] e1) {  // "if"
		    // 当遇到错误时的处理行为
		}
		catch ([other exception type 其他异常类型] e2) {  // "else if"
		    // ...（其他异常类型的处理）
		}
		catch (...) {  // the "else" statement (catch-all)
		    // 捕获所有异常
		}
		```
	详情见[异常处理](/blog/notes/courses/course-cpp/cs106l-and-oop)
2. **RAll** (Resource Acquisition Is Initialization 资源获取即初始化)
	- 含义：一个类所使用的**所有资源**都应**在构造函数中获取，在析构函数中释放**
	- 遵循 RAll 策略**可避免半有效**状态
	- 无论何种情况，一旦资源**超出作用域**，就会**自动调用析构函数**
	- 资源/对象在**创建后**即可**立即使用**
2. `lock_guard`
	- 定义于 `<mutex>` 头文件
	- **确保互斥锁在任何情况下都能被正确释放**，避免因手动调用 `lock()`/`unlock()` 可能导致的问题，从而防止死锁
	- 当 `std::lock_guard` 对象被**创建**时，它会自动调用传入的互斥锁的 `lock()` 方法，**获取锁**
	- 当 `std::lock_guard` 对象**超出作用域**时，其析构函数会自动调用互斥锁的 `unlock()` 方法，**释放锁**
	- `lock`是一种**同步机制**，**保证同一时间只有一个线程能进入临界区**（访问共享资源的代码段），强制线程排队访问，从而避免数据不一致
## 2. 智能指针
1. RAll for locks → `lock_guard`
	- 创建了一个新的对象，该对象在构造函数中获取资源，在析构函数中释放资源
2. RAll for memory → 标准库智能指针 `std::smart pointers`
	1. **特性**：栈上持有原始指针，对象销毁时自动释放资源，避免内存泄漏。这些**包装**指针被称为**智能指针**
	2. 符合 RAII 标准的指针有三种类型
		- `std::unique_ptr` **独占**其资源，无法被复制
		- `std::shared_ptr` **可以进行复制**操作，但当底层内存**超出作用域**时会**自动销毁**
			- 共享指针解决了我们试图复制 `std::unique_ptr` 的问题，其方法是在所有共享指针**超出作用域之前都不释放底层内存**
			- 通过**引用计数**管理资源：当引用计数为 0 时，才会释放所指向的对象
		- `std::weak_ptr` 一类旨在**缓解循环依赖问题**的指针类
		- `std::auto_ptr` （C++11废弃）
	3. **声明方法**：使用 `std::make_unique<T>` 和 `std::make_shared<T>`，避免使用 `new`
		```cpp
		// std::unique_ptr<T> uniquePtr{new T};
		std::unique_ptr<T> uniquePtr = std::make_unique<T>();
		// std::shared_ptr<T> sharedPtr{new T};
		std::shared_ptr<T> sharedPtr = std::make_shared<T>();

		std::weak_ptr<T> wp = sharedPtr;
		```
		原因：
		1. 如果不这样做，将会**对内存进行两次分配**，一次用于存储指针本身，另一次用于存储新的 T 类型的数据，用`make_shared`会**一次性分配连续的内存块**，仅一次内存分配
		2. 应该**保持一致性**：如果使用了 `make_unique` 函数，那么也一定要同时使用 `make_shared` 函数
	3. **循环引用导致资源泄漏**：使用`std::weak_ptr`
		```cpp
		// 前向声明
		class B;

		class A {
		public:
		    // A持有B的shared_ptr
		    std::shared_ptr<B> ptr_to_b;
		    // 改为 std::weak_ptr<b> ptr_to_b;

		    ~A() {
		        std::cout << "A" << std::endl;
		    }
		};

		class B {
		public:
		    // B持有A的shared_ptr
		    std::shared_ptr<A> ptr_to_a;
		    // 改为 std::weak_ptr<A> ptr_to_a;
		    ~B() {
		        std::cout << "B" << std::endl;
		    }
		};

		int main() {
		    // 创建A和B的shared_ptr
		    std::shared_ptr<A> ptr_a = std::make_shared<A>();
		    std::shared_ptr<B> ptr_b = std::make_shared<B>();

		    // 互相持有对方的shared_ptr，形成循环引用
		    ptr_a->ptr_to_b = ptr_b;  // A的成员指向B
		    ptr_b->ptr_to_a = ptr_a;  // B的成员指向A

		    return 0;
		}
		```
		- 运行上述代码会发现，**A 和 B 的析构函数都不会被调用**，即资源没有被释放。原因是：
			1. `std::shared_ptr` 通过**引用计数**管理资源：当引用计数为 0 时，才会释放所指向的对象
			2. 代码中 `ptr_a` 持有 `A` 对象，`ptr_b` 持有 `B` 对象，初始引用计数均为 1
			3. 当 `ptr_a->ptr_to_b = ptr_b` 时，`B` 对象的引用计数变为 2（`ptr_b` 和 `A::ptr_to_b` 共同持有）
			4. 当 `ptr_b->ptr_to_a = ptr_a` 时，`A` 对象的引用计数变为 2（`ptr_a` 和 `B::ptr_to_a` 共同持有）
			5. `main` 函数结束时，`ptr_a` 和 `ptr_b` 销毁，`A` 和 `B` 的引用计数各减 1，最终均为 1，仍被对方的成员变量持有
			6. 由于引用计数始终不为 0，`A` 和 `B` 的析构函数不会被调用，导致资源泄漏
		- 解决方案：使用 `std::weak_ptr` 打破循环
			- `std::weak_ptr` 是一种**弱引用**，它**持有对象的指针但不增加引用计数**，可以用来打破循环引用
			- `std::shared_ptr<A> ptr_to_a;`改为`std::weak_ptr<A> ptr_to_a;`
3. **引用计数原理**
	1. **目标**
		- 引入**引用计数机制**：本质是为**可共享对象**必须继承 `UCObject`，维护一个计数器，统计该对象被多少个智能指针 `UCPointer` 共享，确保指针的拷贝、赋值、销毁等操作都能同步更新计数，最终实现**无引用时自动释放对象**，避免内存泄漏。
		- 关键组件：
			- `UCObject`：作为**引用计数载体**，封装计数变量和计数操作逻辑，所有需要支持引用计数的对象都需继承它
			- `UCPointer`：指向 `UCObject` 的智能指针模板，重载 `operator->` 和 `operator*` 模拟原始指针行为，同时在自身生命周期和操作中自动调用 `UCObject` 的计数方法，无需用户手动维护
	2. **引用计数工作流程**
		- **可共享对象的前提**：必须继承 `UCObject` ，才能获得引用计数能力，因计数变量 `m_refCount` 和操作方法封装在 `UCObject` 中
		- **初始值**：**可共享对象**的引用计数初始为0
		- **赋值操作** `p=q`
			- **自赋值判断**：先检查 `m_pObj != p.m_pObj`  避免 `p=p` 时重复递减/递增计数
			- **原引用递减**：先执行 `p->decrement()`递减原指针计数，若原对象的计数减为0，通过`delete this`直接销毁原对象
			- **指针指向更新**：再执行 `p=q`，并将 p 的底层指针 `m_pObj` 指向 q 的底层对象
			- **新引用递增**：最后 `p->increment()`：递增新指针计数
		- **写时复制**（Copy-on-Write, COW） ：一种优化内存与性能的策略，核心是**数据共享不修改，修改才复制**，即多个对象先共享同一底层数据，仅当其中一个对象要修改数据时，才复制一份独立副本供其修改，**避免无意义的拷贝开销**，以下结合例子说明
			- **无修改时：共享数据，计数递增**
				当  `String y = x`  时， x  和  y  不复制字符串数据，而是通过  `UCPointer`  共享同一个  `StringRep`  实例，仅将  `StringRep`  的引用计数从1增至2，节省内存
			- **修改时：复制数据，计数分离**
				当修改  x  内容时，先检查  `StringRep`  的引用计数（此时为2，说明被共享），随即创建新的  `StringRep`  实例存储新字符串， x  的  `UCPointer`  转向新实例，**计数变为1**，原  `StringRep`  **计数从2减为1**，**确保修改不影响其他对象**
4. **类结构与实现例子**：`StringRep`
	1. 类关系
		- 继承关系： `StringRep` 字符串存储 继承自 `UCObject`
		- 组合关系： `String` 对外接口 继承自  `UCPointer<StringRep>`
	2. 实现要点
		-  `String` ：对外提供字符串操作接口（赋值、比较、拼接、长度计算等），内部通过 `UCPointer<StringRep>` 持有数据
		-  `StringRep` ：用`m_pChars` 数组负责字符串存储，并负责字符串拷贝、比较、长度计算等底层操作，继承 `UCObject` 以支持引用计数
5. `UCObject` 与 `UCPointer`方法详解
	1. `UCObject` 引用计数载体
		1. **成员变量**
			- 私有变量：`int m_refCount` 引用计数器，仅自身及子类可访问，避免外部误修改
		2. **成员方法**
			- 方法签名：`UCObject()`
				- 功能描述：**构造函数**
				- 实现逻辑：
					```cpp
					UCObject() : m_refCount(0) {}
					```
				- 关键注意点：所有子类构造时均继承此逻辑，计数默认从0开始
			- 方法签名：`virtual ~UCObject()`
				- 功能描述：**虚析构函数**
				- 实现逻辑：
					```cpp
					virtual ~UCObject() {
						assert(m_refCount == 0); // 确保对象销毁时无引用残留
					}
					```
				- 关键注意点：必须为虚析构，避免子类对象通过 `UCObject` 指针销毁时内存泄漏
			- 方法签名：`UCObject(const UCObject&)`
				- 功能描述：**拷贝构造函数**
				- 实现逻辑：
					```cpp
					UCObject(const UCObject&) : m_refCount(0) {}
					```
				- 关键注意点：拷贝对象时生成新实例，计数独立（原对象计数不变）
			- 方法签名：`void incr()`
				- 功能描述：**计数递增**
				- 实现逻辑：
					```cpp
					void incr() {
						m_refCount++;
					}
					```
				- 关键注意点：仅在智能指针关联对象时调用（如构造、拷贝、赋值新对象）
			- 方法签名：`void decr()`
				- 功能描述：**计数递减+对象销毁**
				- 实现逻辑：
					```cpp
					void decr() {
						m_refCount -= 1;
						if (m_refCount == 0) {
							delete this; // 计数为0时销毁自身
						}
					}
					```
				- 关键注意点：`delete this` 合法，但调用后不能再访问当前对象的任何成员
			- 方法签名：`int references()`
				- 功能描述：**获取当前计数**
				- 实现逻辑：
					```cpp
					int references() {
						return m_refCount;
					}
					```
				- 关键注意点：用于调试或判断对象是否被共享
	2. `UCPointer`
		1. 成员变量
			- 私有变量：`T* m_pObj` 指向 `UCObject` 子类的原始指针，模板参数 `T` 需为 `UCObject` 派生类
		2. 方法
			- 方法签名：`UCPointer(T* r = 0)`
				- 功能描述：**构造函数**
				- 实现逻辑：
					```cpp
					UCPointer(T* r = 0) : m_pObj(r) {
						increment(); // 关联对象后递增计数
					}
					```
				- 核心作用：首次关联对象时，将对象计数+1
			- 方法签名：`~UCPointer()`
				- 功能描述：**析构函数**
				- 实现逻辑：
					```cpp
					~UCPointer() {
						decrement(); // 生命周期结束时递减计数
					}
					```
				- 核心作用：智能指针生命周期结束时，递减对象计数，无引用则销毁对象
			- 方法签名：`UCPointer(const UCPointer<T>& p)`
				- 功能描述：**拷贝构造函数**
				- 实现逻辑：
					```cpp
					UCPointer(const UCPointer<T>& p) {
						m_pObj = p.m_pObj; // 共享原对象
						increment(); // 递增共享对象计数
					}
					```
				- 核心作用：拷贝指针时，同步递增对象计数，实现共享
			- 方法签名：`UCPointer& operator=(const UCPointer<T>& p)`
				- 功能描述：**赋值运算符**
				- 实现逻辑：
					```cpp
					UCPointer& operator=(const UCPointer<T>& p) {
						if (m_pObj != p.m_pObj) { // 避免自赋值
							decrement(); // 释放原对象，递减计数
							m_pObj = p.m_pObj; // 关联新对象
							increment(); // 递增新对象计数
						}
						return *this;
					}
					```
				- 核心作用：实现指针指向切换，确保原对象计数递减、新对象计数递增
			- 方法签名：`T* operator->() const`
				- 功能描述：**重载箭头运算符**
				- 实现逻辑：
					```cpp
					T* operator->() const {
						return m_pObj; // 返回原始指针，模拟->操作
					}
					```
				- 核心作用：模拟原始指针的 `->` 操作，可直接调用对象的成员方法
			- 方法签名：`T& operator*() const`
				- 功能描述：**重载解引用运算符**
				- 实现逻辑：
					```cpp
					T& operator*() const {
					return *m_pObj; // 返回对象引用，模拟*操作
					}
					```
				- 核心作用：模拟原始指针的 `*` 操作，可直接访问对象本身
			- 方法签名：`void increment()`（私有）
				- 功能描述：**计数递增代理**
				- 实现逻辑：
					```cpp
					void increment() {
						if (m_pObj) { // 避免空指针调用
							m_pObj->incr(); // 调用UCObject的incr()
						}
					}
					```
				- 核心作用：封装 `UCObject` 的 `incr()`，避免空指针调用
			- 方法签名：`void decrement()`（私有）
				- 功能描述：**计数递减代理**
				- 实现逻辑：
					```cpp
					void decrement() {
						if (m_pObj) { // 避免空指针调用
							m_pObj->decr(); // 调用UCObject的decr()
						}
					}
					```
				- 核心作用：封装 `UCObject` 的 `decr()`，避免空指针调用
## 3. 构建C++项目
1. `make`是一个“构建系统”程序，它能帮助您进行编译操作
	1. 您可以指定要使用的编译器
	2. 要使用`make`命令，您需要有一个 Makefile 文件
2. CMake 是一个构建系统生成器
	1. 因此，可以使用 CMake 来生成 Makefile 文件
	2. 这就好比是针对 Makefile 文件的一种更高层次的抽象方式
3. 详见Makefile&CMake
# 十六、杂项
## 1. 随机数生成
1. C++11 之前，开发者常用 `rand()` + `srand()` 生成随机数，但存在缺陷：
	- **随机质量低**：生成的序列周期性短、分布不均匀
	- **线程不安全**：无原子性保障，多线程调用易出问题
	- **灵活性差**：仅能生成 `[0, RAND_MAX]` 的整数，手动映射区间会导致分布失衡
	- **种子单一**：依赖 `srand(time(NULL))` 播种，时间戳精度低，易重复
2. C++11 引入了 `<random>` 库，提供了**分层设计**的随机数组件：
	- **随机数源** Seed Source：`std::random_device` 提供种子
	- **随机数引擎** Engine：`std::mt19937` 生成高质量伪随机数
	- **分布器** Distribution：`std::uniform_int_distribution` 将引擎输出映射为指定区间的均匀分布数
3. **组件详解**
	1. `std::random_device`：**真随机数种子源**
		1. **作用**：提供**非确定性随机数**，理想情况下基于硬件噪声，如 CPU 时钟、外设干扰等，核心用途是给伪随机数引擎**播种**，而非直接生成大量随机数
		2. 关键特性
			- **非确定性**：理想状态为真随机，区别于引擎的伪随机
			- **性能差**：**生成速度极慢**，频繁调用会显著降低程序效率
			- **平台兼容性**：部分平台（如 Windows MinGW、部分 Linux 发行版）下为伪随机实现，通过 `rand()` 模拟）
			- **熵值** `entropy()`：返回值类型为 `double`；值为 0 表示伪随机实现，值越高（通常≈32）表示真随机
			- **输出类型**：调用 `operator()()` 返回 `unsigned int` 类型，取值范围为 `[0, 2^32-1]`
	2. `std::mt19937`：高性能伪随机数引擎
		1. 全称与原理
			Mersenne Twister（**梅森旋转算法**）19937，是目前最常用的伪随机数引擎，核心优势：
			- **周期极长**：`2^19937 - 1`（几乎不会重复）
			- **速度快**：比 `rand()` 快数倍，适合批量生成随机数
			- **分布均匀**：原始输出的统计特性接近理想随机
		2. 关键特性
			- **伪随机性**：基于种子的确定性序列，**相同种子生成完全相同的随机数序列**
			- **输出范围**：生成的数值为 `[0, 2^32-1]` 的无符号 32 位整数
			- **播种要求**：必须手动播种，否则默认种子为 1
			- **线程安全性**：非线程安全，多线程场景下需为每个线程创建独立的引擎实例
			- **64 位版本**：`std::mt19937_64`，输出为 `[0, 2^64-1]` 的无符号 64 位整数
		3. 播种方式
			- **纯 `random_device`**：适用场景为平台支持真随机（`entropy()>0`）
				`std::mt19937 gen(rd());`
			- **种子序列 `seed_seq`**：适用场景为增强种子随机性，引擎状态空间大，单一种子不足以充分填充
				`std::seed_seq seq{rd(), rd(), rd(), rd()}; std::mt19937 gen(seq);`
			- **结合时间戳**：适用场景为平台 `random_device` 是伪随机（`entropy()==0`）
				`unsigned int seed = rd() ^ std::chrono::system_clock::now().time_since_epoch().count(); std::mt19937 gen(seed);`
	 3. `std::uniform_int_distribution<int>`：整数均匀分布器
		1. **作用**：将引擎生成的原始随机数（`[0, 2^32-1]`）**无损映射**到指定整数区间，保证区间内每个数的概率严格相等，解决手动取模的分布失衡问题
		2. **关键特性**
			- **模板参数**：用于指定目标整数类型，默认类型为 `int`，也可手动指定 `long`/`long long` 等类型
			- **区间类型**：采用闭区间 `[a, b]` 形式，需在构造分布器时指定最小值 `a` 和最大值 `b`
			- **核心方法**：`operator()(引擎实例)`，使用时传入引擎实例，返回该区间内的随机数
			- **可复用性**：分布器本身无状态，可重复调用，无需频繁创建新的分布器实例
		3. **为什么不直接用引擎取模**
			假设用 `gen() % 100` 生成 `[0,99]` 的数：
			- 引擎输出范围是 `[0, 2^32-1]`（即 `4294967295`）
			- `4294967295 % 100 = 95`，因此 `0~95` 的出现概率比 `96~99` 高约 `1/100`
			- `uniform_int_distribution` 会自动处理余数问题，保证所有数概率均等
4. 示例：**基础均匀整数随机数**
	```cpp
	#include <iostream>
	#include <random>
	#include <vector>

	int main() {
		std::random_device rd;
		std::mt19937 gen(rd());
		std::uniform_int_distribution<int> dis(1, TestSize);
		for (int i = 0; i < 10; ++i)
	        std::cout << dis(gen) << " ";
	}
	```
## 2. 可见性和可访问性
1. 定义区分
	- **可见性**（Visibility）：编译器在当前作用域中是否能识别成员的存在，即**认不认识**
	- **可访问性**（Accessibility）：编译器允许对已识别（可见）的成员执行何种操作，即**能不能用**
2. **特性与规则**
	1. **可见性**（Visibility）
		- **决定因素**：成员的**声明作用域**（如类内、命名空间内、全局）
		- **规则**：一旦在某个作用域声明，该作用域内全程可见，**无法隐藏或降低可见性**（比如类内声明的`private`成员，编译器仍能识别它存在）
		- **示例**： `class A { private: int x; };`  中， x  在类A的作用域内可见（编译器知道A有成员x），全局作用域也能看到`A::x`的存在，但无权使用
	2. **可访问性**（Accessibility）
		- **决定因素**：访问控制符（ `public` / `protected` / `private` ），仅针对类成员；命名空间成员无访问控制，可见即可访问
		- **规则**：与可见性独立，不影响编译器是否识别成员，仅限制能否使用
