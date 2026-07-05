---
title: "Shell 脚本"
description: "Shell 脚本语法、流程控制和常用自动化写法整理。"
date: 2025-12-31
updated: 2025-12-31
category: "Linux"
tags: ["课程笔记", "Linux", "命令行"]
featured: false
draft: false
---

- 一、基础知识
- 二、Shell 变量
- 三、Shell 注释
- 四、Shell 函数
- 五、Shell 运算符
- 六、Shell 流程控制
- 七、Shell 文件
# 一、基础知识
结合[Linux 常用命令](/blog/notes/courses/course-linux/linux-%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4)学习
## 1. Shell 环境
1. Linux 的 Shell 种类众多，常见的有：
	- Bourne Shell（`/usr/bin/sh`或`/bin/sh`）
	- Bourne Again Shell（`/bin/bash`）
	- C Shell（`/usr/bin/csh`）
	- K Shell（`/usr/bin/ksh`）
	- Shell for Root（`/sbin/sh`）
	- ……
2. 由于易用和免费，Bourne Again Shell (Bash) 在日常工作中被广泛使用。同时，Bash 也是大多数Linux 系统默认的 Shell。
3. `#!` 告诉系统其后**路径所指定**的程序即是**解释**此脚本文件的 Shell **程序**
4. 在一般情况下，人们并不区分 Bourne Shell 和 Bourne Again Shell，所以，`#!/bin/sh` 也可改为 `#!/bin/bash`
## 2. 运行 Shell 脚本
1. **作为可执行程序**
	```bash
	chmod +x ./test.sh  #使脚本具有执行权限
	./test.sh  #执行脚本
	```
	- **运行二进制类的程序**一定要写成 `./test.sh`，而不是 `test.sh`
	- 写 `test.sh`，Linux 系统会去 PATH 里寻找
2. **作为解释器参数**
	```bash
	/bin/sh test.sh
	/bin/php test.php
	```
	- 直接运行解释器，其**参数**就是 shell 脚本的**文件名**
	- 这种方式运行的脚本，**不需要在第一行指定解释器信息**，写了也会忽略
# 二、Shell 变量
## 1. 变量定义
1. 定义变量时，变量名**不加美元符号**
2. 变量名和等号之间**不能有空格**
3. 变量名的**命名**须遵循如下规则：
	- **只包含字母、数字和下划线：** 变量名可以包含字母（大小写敏感）、数字和下划线 _，不能包含其他特殊字符。
	- **不能以数字开头：** 变量名不能以数字开头，但可以包含数字
	- **避免使用 Shell 关键字：** 不要使用Shell的关键字（例如 if, then, else, fi, for, while 等）作为变量名，以免引起混淆
	- **使用大写字母表示常量：** 习惯上，常量的变量名通常使用大写字母
	- **避免使用特殊符号：** 尽量避免在变量名中使用特殊符号，因为它们可能与 Shell 的语法产生冲突
	- **避免使用空格：** 变量名中不应该包含空格，因为空格通常用于分隔命令和参数
4. 命名规则与C的区别：
	1. Shell 命名**仅避免使用**关键字，无编译强制限制
	2. Shell 命名**无官方保留标识符**，仅需避开关键字即可，C 标准强制有严格的保留标识符规范，如下划线 + 大写字母或双下划线开头，用户使用会引发未定义行为
	3. Shell 命名**无明确长度限制**
	4. Shell 命名**变量名可与系统命令重名**
## 2. 变量使用
1. 在**变量名前面加美元符号**，来使用一个定义过的变量
2. 可以加**花括号**，帮助解释器**识别变量的边界**，推荐给所有变量加上花括号
3. 已定义的变量，**可以**被**重新定义**
4. 使用 `readonly` **命令**可以将变量定义为**只读变量**，只读变量的值不能被改变
	若改变只读变量，运行脚本，结果为`/bin/sh: NAME: This variable is read only.`
5. 使用 `unset` 命令可以**删除**变量，变量被删除后不能再次使用，**不能删除只读变量**
## 3. 变量类型
1. **字符串变量**
    Shell 中未显式声明的变量默认都是字符串，定义方式分 3 种，区别为是否解析变量 / 转义字符
    1. 单引号 `'`：原样输出，**不解析**变量、转义字符，**不可嵌套单引号**
        示例：`str1='Hello $USER'` → 输出 `Hello $USER`
    2. 双引号 `"`：**解析**变量（`$VAR`）和转义字符（`\$`/`\"`）
        示例：`str2="Hello $USER"` → 输出 `Hello 你的用户名`
    3. 无引号：适合无空格的简单字符串，**空格会被解析为参数分隔**
        示例：`str3=test123` → 输出 `test123`（`str3=test 123` 会报错）
    示例
    ```bash
    # 单引号：纯字面量
    str1='I\'m ok'  # 错误！单引号内不能转义，需改为：str1='I'"'"'m ok'
    str1='I'"'"'m ok'  # 正确，输出 I'm ok

    # 双引号：解析变量+转义
    str2="当前用户：$USER，路径：\$HOME"  # 输出 当前用户：root，路径：$HOME

    # 变量拼接（建议用大括号包裹变量）
    name="Alice"
    echo "Hello ${name}!"  # 输出 Hello Alice!（避免 echo $name! 被解析为变量 name!）
    ```
2. `declare`/`typeset` 声明特殊类型变量（**bash 特有**）
    `declare` 和 `typeset` 是别名，bash 中更常用 `declare`，用于声明非字符串类型变量
    1. `-i`：**整数变量**
        特性：赋值时自动按整数处理，**非数字赋值会转为 `0`**，无需 `$(( ))`/`let` 语法
        示例：
        ```bash
        declare -i num=10
        num=num+5    # 直接算术运算 → 15
        num=20*3     # 支持乘除 → 60
        num="abc"    # 非数字赋值 → 0
        echo $num    # 输出 0
        ```
    2. `-a`：**普通数组**（索引数组）
        特性：存储多个值，索引可手动指定，默认从 `0` 递增
        示例：
        ```bash
        declare -a fruits=(apple banana cherry)
        echo ${fruits[1]}       # 访问索引1 → banana
        echo ${fruits[@]}       # 访问所有元素 → apple banana cherry
        echo ${#fruits[@]}      # 数组长度 → 3
        fruits+=(grape)         # 追加元素 → apple banana cherry grape
        fruits[5]=pear          # 手动指定索引 → 索引3/4为空，索引5=pear
        ```
    3. `-A`：**关联数组**（键值对数组）
        特性：以键 - 值存储，类似 Python 字典，必须用 `declare -A` 声明
        示例：
        ```bash
        declare -A user=([name]="Alice" [age]="25" [city]="Paris")
        echo ${user[name]}      # 访问值 → Alice
        # 遍历所有键值对
        for key in "${!user[@]}"; do
            echo "$key: ${user[$key]}"
        done
        # 输出：
        # name: Alice
        # age: 25
        # city: Paris
        ```
    4. `-x`：**导出为环境变量**，等价于 `export`
        特性：变量**临时暴露给子 Shell / 子进程**，关闭 Shell 失效
        示例：
        ```bash
        declare -x MY_ENV="test"
        bash -c 'echo $MY_ENV'  # 子 Shell 中仍可访问 → test
        declare +x MY_ENV       # 取消导出
        ```
    5. `-l`/`-u`：**自动转小写 / 大写**
        特性：赋值时自动转换大小写，**后续修改**值**仍会自动转换**
        示例：
        ```bash
        declare -l lower="HELLO WORLD"  # 自动转小写 → hello world
        lower="NEW TEXT"                # 再次赋值仍转小写 → new text

        declare -u upper="hello world"  # 自动转大写 → HELLO WORLD
        ```
    6. `-f`/`-F`：**查看函数**，仅对函数生效
        特性：`-f` 显示函数完整定义；`-F` 仅显示函数名 + 行号 / 路径。
        示例：
        ```bash
        # 先定义函数
        myFunc() { echo "Hello $1"; }

        declare -f myFunc  # 输出函数完整代码
        declare -F myFunc  # 输出：myFunc 123 /path/to/script.sh（行号+脚本路径）
        ```
3. `local` **局部变量**
	1. 在Shell脚本编程中，变量可以是全局的或局部的
	2. 全局变量在整个脚本中都有效，而局部变量仅在定义它们的函数内部有效
	3. `local` 命令通常用于在函数内部**声明局部变量**
 4. **环境变量**（系统 / 用户预设）
    环境变量是全局生效的特殊变量，用于配置 Shell 行为，所有 Shell 进程均可访问
    常用环境变量：
    1. `PATH`：可执行文件搜索路径（用 `:` 分隔）
        示例输出：`/usr/bin:/bin:/usr/local/bin`
    2. `HOME`：当前用户主目录
        示例输出：`/home/alice`
    3. `USER`：当前登录用户名
        示例输出：`alice`
    4. `PWD`：当前工作目录
        示例输出：`/home/alice/test`
    5. `LANG`：系统语言 / 编码
        示例输出：`zh_CN.UTF-8`
    6. `PS1`：命令提示符（如 `$`/`#`）
        示例输出：`[\u@\h \W]\$`（显示 `[alice@localhost test]$`）
    环境变量操作：
    ```bash
    # 查看环境变量
    echo $PATH
    env  # 列出所有环境变量

    # 临时设置（仅当前 Shell 生效）
    export TEMP_ENV="temp_value"

    # 永久设置（写入配置文件）
    echo 'export TEMP_ENV="temp_value"' >> ~/.bashrc  # bash
    echo 'export TEMP_ENV="temp_value"' >> ~/.zshrc   # zsh
    source ~/.bashrc  # 立即生效

    # 取消环境变量
    unset TEMP_ENV
    ```
5. **特殊变量**
    Shell 预设的内置变量，用于获取脚本 / 命令的运行状态，核心如下：
    1. `$0`：脚本名称（含路径）
        示例（执行 `bash test.sh a b c`）：`echo $0` → `test.sh`
    2. `$1`-`$9`：脚本 / 函数的第 1-9 个参数
        示例（执行 `bash test.sh a b c`）：`echo $1` → `a`，`echo $2` → `b`
    3. `${10}`：第 10+ 个参数，**必须加大括号**
        示例（执行 `bash test.sh a b c`）：`echo ${10}` → 第 10 个参数
    4. `$#`：**参数总数**
        示例（执行 `bash test.sh a b c`）：`echo $#` → `3`
    5. `$@`：**所有参数**，每个参数**独立**，推荐使用
        示例（执行 `bash test.sh a b c`）：`for arg in "$@"; do echo $arg; done` → 逐行输出 `a`/`b`/`c`
    6. `$*`：**所有参数**，**合并**为一个字符串
        示例（执行 `bash test.sh a b c`）：`echo "$*"` → `a b c`
    7. `$?`：上一个命令的**退出状态**，和 C 语言不同，shell 语言中 0 代表 true，0 以外的值代表 false
        示例（执行 `bash test.sh a b c`）：`ls /nonexist; echo $?` → `2`（失败）
    8. `$$`：**当前** Shell **进程 ID**（PID）
        示例（执行 `bash test.sh a b c`）：`echo $$` → `12345`
    9. `$!`：**上一个**后台**进程的 PID**
        示例（执行 `bash test.sh a b c`）：`sleep 10 &; echo $!` → `67890`
## 4. 变量操作
1. **字符串拼接**
	推荐使用双引号+`${变量}`的方式，可读性更高：
	```bash
	your_name="runoob"
	# 双引号拼接（推荐）
	greeting1="hello, ${your_name}!"  # 变量用{}包裹，避免歧义
	greeting2="hello, "$your_name"!"  # 等价写法
	# 单引号拼接（变量不解析）
	greeting3='hello, ${your_name}!'

	echo $greeting1  # hello, runoob!
	echo $greeting3  # hello, ${your_name}!
	```
2. **字符串操作**
	1. **获取长度**：`${#字符串}`
	2. **提取子串**：`${字符串:起始索引:长度}`，**索引从0开始**
	3. **查找字符**：`expr index "$字符串" 字符集`（反引号`` ` ``）
		`expr index` 不是查找子串，而是查找**字符集中任意字符首次出现的位置**，且**索引从1开始**
3. **Shell 数组**
    Bash 仅支持**一维数组**，无大小限制，下标**可非连续**，但推荐连续
    1. **数组定义**
        ```bash
        # 方式1：批量定义（推荐）
        array1=(value0 value1 value2 value3)
        # 方式2：分行定义
        array2=(
          value0
          value1
          value2
        )
        # 方式3：单独定义下标（支持非连续下标）
        array3[0]=value0
        array3[2]=value2  # 下标1可空缺
        ```
    2. **数组读取**
        1. **读取单个元素**：`${数组名[下标]}`
        2. **读取所有元素**：`${数组名[@]}` 或 `${数组名[*]}`
        3. **遍历所有元素**：`for i in ${数组名[@]}; do ...; done`
			`@` 和 `*` 的区别：加双引号时，`"${array[@]}"` 会将每个元素作为独立字符串，`"${array[*]}"` 会拼接成一个字符串。
    3. **数组长度**
        ```bash
        array=(a b c d)
        # 数组元素个数
        len1=${#array[@]}   # 推荐
        len2=${#array[*]}   # 等价
        # 单个元素的长度
        len3=${#array[1]}   # 元素b的长度：1

        echo $len1  # 4
        echo $len3  # 1
        ```
# 三、Shell 注释
注释用于标注代码逻辑，解释器会忽略注释内容
1. **单行注释**
	- 以 `#` 开头（注意 `#` 前**无空格**，否则**可能被识别为命令参数**：
	- **行尾也可加注释**
2. **多行注释**
	推荐使用**Here 文档**方式，标识符可自定义（`EOF`/`COMMENT`/`!`/`'` 等）：
	**Here 文档**（Here Document，简称 HereDoc）
	- Here 文档是 Shell 中一种**输入重定向**方式，允许将多行文本 / 代码块作为输入传递给命令或脚本，作用是批量定义多行内容，无需逐行使用 `echo` 或手动创建文件
	- **语法**：通过**分界符**界定文本块的开始和结束，将分界符之间的内容作为输入流
		```bash
			命令 < < 标记
			内容
			标记
		```
	- **规则**：
		- **起始**分界符后**无空格**，否则会导致分界符识别失败
		- **结束**分界符必须**单独一行**，且行首 / 行尾无任何字符
		- 分界符可自定义，首尾需完全一致
	- **用法**
		- **默认普通模式**：**解析**变量、转义符：起始分界符不加引号
		- **禁用解析模式**：**纯文本输出**，常用作多行注释
			起始分界符用单引号 / 双引号包裹，文本块内的变量、转义符完全不解析，是 Shell 多行注释的标准写法
			可结合**空命令** `:`，不执行任何操作
3. **临时注释**
	将代码包裹成**未调用的函数**，**临时禁用**大段代码：
	```bash
	# 临时注释的代码块
	temp_comment() {
	  echo "这段代码不会执行"
	  your_name="runoob"
	  echo $your_name
	}
	# 不调用 temp_comment 函数，代码就不会执行
	```
# 四、Shell 函数
1. **定义格式**
	**语法**：
	```bash
	# 写法1：带 function 关键字
	[function] 函数名 [()] {
		执行逻辑;
		[return 整数;]  # 可选返回值，范围 0-255
	}

	# 写法2：简化写法（推荐）
	函数名() {
		执行逻辑;
		[return 整数;]
	}
	```
	**说明**：
	- 可带 `function` 关键字定义，也可直接 `函数名()` 定义，**无需显式声明参数**
	- **返回值**：显式加 `return` 则返回指定整数，不加则以**最后一条命令的运行结果**作为返回值
2. **函数返回值**
    函数返回值需在调用后通过 `$?` 获取：
    1. `return` 语句返回
        `return` 仅能返回 0-255 的整数，若两数之和**超出该范围会导致结果错误**
    2. 用 `echo` 输出结果
        示例：
        ```bash
        funWithReturn(){
            read aNum
            read anotherNum
            sum=$(($aNum + $anotherNum))
            echo $sum  # 直接输出和
        }
        # 调用并捕获输出结果
		funWithReturn
		echo "通过 \$? 获取的和：$?"
        ```
    3. `$(函数名)` 会捕获函数内**所有的输出**
    4. `$?` 仅对其上一条指令负责，一旦函数返回后其返回值没有立即保存入参数，那么其返回值将不再能通过 `$?` 获得
3. **函数参数**
    Shell 调用函数时可传递参数，函数体内部通过 `$n` 形式获取参数值
    **参数获取规则**如下
	- `$1` 表示第一个参数，`$2` 表示第二个参数，以此类推
	- 当参数序号 `n>=10` 时，必须用 `${n}` 获取
# 五、Shell 运算符
1. 前提
	- Shell **本身不支持直接算术运算**，需通过 `$(( ))`、`expr`、`$[]` 实现
	- `[]`/`expr` 中**运算符前后必须加空格**，`$(( ))`/`` 可省略
	- 仅支持整数运算，小数需用 `bc` 工具
	- 字符串**操作/判空**时，**变量务必加双引号**，避免空值导致语法报错
2. **算术运算符**：**仅整数**

|运算符|说明|推荐写法（$(())）|兼容写法（expr）|注意|
|---|---|---|---|---|
|`+`|加法|`$((a + b))`|`expr $a + $b`|expr 必须加空格|
|`-`|减法|`$((a - b))`|`expr $a - $b`|-|
|`*`|乘法|`$((a * b))`|`expr $a \* $b`|expr 中 `*` 需转义|
|`/`|除法|`$((a / b))`|`expr $a / $b`|整数除法（舍去小数）|
|`%`|取余|`$((a % b))`|`expr $a % $b`|-|
|`==`/`!=`|相等 / 不等判断|`((a == b))`|`[ $a == $b ]`|用于条件判断|
3. **关系运算符**（仅数值比较，配合 `[]`/`test`）

| 运算符   | 说明   | 示例              | 结果（a=10, b=20） |
| ----- | ---- | --------------- | -------------- |
| `-eq` | 等于   | `[ $a -eq $b ]` | false          |
| `-ne` | 不等于  | `[ $a -ne $b ]` | true           |
| `-gt` | 大于   | `[ $a -gt $b ]` | false          |
| `-lt` | 小于   | `[ $a -lt $b ]` | true           |
| `-ge` | 大于等于 | `[ $a -ge $b ]` | false          |
| `-le` | 小于等于 | `[ $a -le $b ]` | true           |
4. **布尔/逻辑运算符**（多条件组合）

| 类型  | 运算符    | 说明  | 适用场景            | 示例（a=10, b=20）                         |
| --- | ------ | --- | --------------- | -------------------------------------- |
| 布尔  | `!`    | 非   | `[]`            | `[ ! $a -eq $b ]` → true               |
| 布尔  | `-a`   | 与   | `[]`            | `[ $a -gt 5 -a $b -lt 30 ]` → true     |
| 布尔  | `-o`   | 或   | `[]`            | `[ $a -lt 5 -o $b -lt 30 ]` → true     |
| 逻辑  | `&&`   | 与   | ``/`(( ))` | `$a -gt 5 && $b -lt 30` → true   |
| 逻辑  | `\|\|` | 或   | ``/`(( ))` | `\| $b -lt 30` → true |
5. **字符串运算符**（字符串比较/判空）

| 运算符  | 说明    | 示例（a="abc", b=""）   | 结果    |
| ---- | ----- | ------------------- | ----- |
| `=`  | 相等    | `[ "$a" = "def" ]`  | false |
| `!=` | 不等    | `[ "$a" != "def" ]` | true  |
| `-z` | 长度为 0 | `[ -z "$b" ]`       | true  |
| `-n` | 长度非 0 | `[ -n "$a" ]`       | true  |
| `$`  | 非空简写  | `[ "$a" ]`          | true  |
6. **文件测试运算符**（检测文件属性）

| 运算符            | 说明           | 示例（file="/tmp/test.txt"） | 常见用途      |
| -------------- | ------------ | ------------------------ | --------- |
| `-e`           | 文件存在         | `[ -e "$file" ]`         | 基础检测      |
| `-f`           | 普通文件（非目录）    | `[ -f "$file" ]`         | 判断是否为文件   |
| `-d`           | 目录           | `[ -d "$file" ]`         | 判断是否为目录   |
| `-r`/`-w`/`-x` | 读 / 写 / 执行权限 | `[ -w "$file" ]`         | 权限检测      |
| `-s`           | 文件非空（大小 > 0） | `[ -s "$file" ]`         | 判断文件是否有内容 |
|                |              |                          |           |
7. **赋值运算符**（简化运算赋值）

|运算符|说明|示例（a=10）|执行后 a 的值|
|---|---|---|---|
|`=`|基础赋值|`a=10`|10|
|`+=`|加法赋值|`a+=5`|15|
|`-=`|减法赋值|`a-=3`|12|
|`*=`|乘法赋值|`a*=2`|24|
|`/=`|除法赋值|`a/=2`|12|
|`%=`|取余赋值|`a%=3`|0
# 六、Shell 流程控制
1. **语法前提**
	- **Shell** **流程控制不可为空**：若else分支**无执行语句，需直接省略**else
	- **语法格式要求**：流程控制关键字与代码块间需用空格/分号分隔
	- **闭合规则**：所有流程控制结构**必须闭合**
	- **变量安全**：条件判断中字符串/文件路径类变量务必加**双引号**，避免空值导致语法报错
	- **兼容性**：dash shell 不支持Bash专属语法，如C风格for循环，需用bash执行脚本。
2. if条件判断
	- **基本语法**
		- 单分支if：
		  **多行写法**：
			```bash
			if condition
			then
			 command1
			 command2
			 ...
			fi
			 ```
		  **单行写法**（终端提示符适用）
		  `if [ $(ps -ef | grep -c "ssh") -gt 1 ]; then echo "true"; fi`
	     - if else：
		     ```bash
		     if condition
		     then
		         command1
		         ...
		     else
		         command
		     fi
		     ```
	     - if else-if else（注意是elif，非else if）：
			 ```bash
			 if condition1
			 then
				 command1
			 elif condition2
			 then
				 command2
			 else
				 commandN
			 fi
			 ```
	- **判断写法**
		- `[]` 判断：大于用 `-gt`、小于用 `-lt`，运算符前后需加空格；
		- `((...))` 判断（Bash专属）：可直接用 `>`/`<`/`==`，无需转义，变量无需加`$`
		- 与test命令结合
			- test命令与 `[]` 底层是同一个命令，可替代`[]`做条件判断；
			- 示例：
				```bash
				if test $[num1] -eq $[num2]
				...
				fi
			```
3. **for循环**
	- **基础语法**
		```bash
		for var in item1 item2 ... itemN
		do
		 command1
		 ...
		done
		```
		**单行写法**：`for var in item1 item2 ...; do command1; command2; done;`
	- **C风格for循环**（**Bash专属**）
		语法：`for ((assignment; condition; next)); do command; done`，`((...))` 内变量无需加`$`；
		示例：
		```bash
		for((i=1;i<=5;i++));do
		 echo "$i"  # 依次输出1-5
		done;
		```
	- **基于seq命令的遍历**
		语法：for index in \`seq $max\`; do command; done，比while更简洁；
		示例：
		```bash
		max=5
		for index in `seq $max`
		do
		echo $index  # 输出1-5
		done
		```
	- **注意事项**
		- dash shell不支持C风格for循环，需用`bash 脚本名.sh`替代`sh 脚本名.sh`执行；
		- 列表元素**含空格时，需用双引号包裹**（如`for str in "hello world" "test"; do ...`）
4. **while循环**
	- 基础语法
		语法：
		```bash
		while condition
		do
		 command
		done
		```
	- 读取键盘输入
		示例（按`<Ctrl-D>`结束循环）：
		```bash
		while read FILM
		do
		 echo "$FILM"
		done
		```
		在终端中按下`<Ctrl-D>`向当前进程发送EOF信号，read 返回非 0，while 条件不成立，循环立即终止
	- 无限循环写法（需配合break终止）
		- 写法1：`while :; do command; done`
		- 写法2：`while true; do command; done`
		- 写法3：`for (( ; ; )); do command; done`
5. **until循环**
	- 核心特点：与while相反，条件为false时循环，条件为true时停止
	- 语法：
		 ```bash
		 until condition
		 do
			 command
		 done
		 ```
6. **case ... esac 多分支选择**，等价于switch...case
	- 语法：
		```bash
		case val in
		mode 1)
		 command1
		 ...
		 ;;  # 表示break，结束当前分支
		mode 2 | mode 3)  # 多个模式匹配同一逻辑，用|分隔
		 command1
		 ...
		 ;;
		*)  # 匹配所有未命中的模式（等价于else）
		 command
		 ;;
		esac  # 闭合case（case倒写）
		```
	- **注意事项**
		- 模式**支持通配符**（`*`匹配任意字符、`?`匹配单个字符）
		- 未加`;;`会导致分支**穿透**，即**执行下一分支**
7. **循环控制**（break/continue）
	- **break命令**：终止所有循环，可指定层级，
	- **continue命令**：跳过当前循环剩余语句，进入下一次循环
8. 技巧
	- `[]`/`[[`/test的**区别**
		- `[` 和test：**底层是同一个命令**，`[` 需检测右中括号`]`，可移植性好
			- 空变量判断需加双引号（`[ $var = '' ]` 报错，`[ "$var" = '' ]` 正常）
			- `<`/`>` 会被**识别为重定向**，**需转义**（`[ "$var" \< a ]`）
		- `[[`：**Bash专属**，更安全，**无需转义**`<`/`>`，**空变量判断无需加双引号**，但**可移植性差**
	- **let命令**：执行表达式，变量无需加`$`（如`let "int++"` 等价于`int=$((int+1))`）
	- **expr命令**：可实现变量自增（如a=\`expr \$a + 1\`），但效率低于`$(( ))`
# 七、Shell 文件
## 1. 输入输出重定向

Shell 命令默认从**标准输入**读取输入，向**标准输出**输出内容，错误信息则输出到**标准错误**，重定向可修改这些数据流的流向
1. **文件描述符**
	1. **标准输入**：键盘，文件描述符0
	2. **标准输出**：屏幕，文件描述符1
	3. **标准错误**：屏幕，文件描述符2
2. **重定向命令**
	1. `command > file`：将命令的标准输出（`1`）重定向到`file`，**覆盖**原有内容
	2. `command < file`：将命令的标准输入（`0`）重定向到`file`，从文件**读取**输入
	3. `command >> file`：将命令的标准输出（`1`）以**追加**方式重定向到`file`
	4. `n > file`：将**文件描述符**为`n`的**数据流重定向**到`file`（如`2 > file`）
	5. `n >> file`：将**文件描述符**为`n`的**数据流**以**追加**方式重定向到`file`（如`2 >> file`）
	6. `n >& m`：将文件描述符`n`的**输出合并**到`m`
	7. `n <& m`：将文件描述符`n`的**输入合并**到`m`
	8. `command << tag`：Here 文档 Here Document 将`tag`开始和结束之间的内容作为命令输入
3. **输出重定向**（`>`/`>>`）
	1. **覆盖重定向**：`command > file`
		执行命令后，将标准输出写入`file`，**覆盖文件原有内容**，**文件不存在则创建**
		示例：
		```bash
		# 将who命令的输出覆盖写入users文件（终端无输出）
		$ who > users
		# 查看文件内容
		$ cat users
		_mbsetupuser console  Oct 31 17:35
		tianqixin    console  Oct 31 17:35
		# 覆盖users文件内容
		$ echo "Hello world" > users
		$ cat users
		Hello world
		```
	2. **追加重定向**：`command >> file`
		命令输出追加到`file`末尾，**不覆盖原有内容**
		示例：
		```bash
		$ echo "Hello world" >> users
		$ cat users
		Hello world
		Hello world
		```
4. **输入重定向**（`<`）
	语法：`command < file`，命令从`file`读取输入，**替代默认的键盘输入**
	**直接**`command file`会**输出文件名**，**重定向**`< file`仅读取内容、**不显示文件名**
	示例：
	```bash
	# 直接统计users行数（输出文件名）
	$ wc -l users
		   2 users
	# 输入重定向统计（仅输出行数）
	$ wc -l < users
		   2
	# 同时重定向输入和输出：从infile读入，输出到outfile
	$ command < infile > outfile
	```
5. **重定向合并**
	1. **标准错误**（`2`）**重定向**
		- 覆盖错误输出：`command 2> file` 将错误信息写入`file`
		- 追加错误输出：`command 2>> file` 错误信息追加到`file`
	2. **合并标准输出和标准错误**
		- **覆盖合并**：`command > file 2>&1`（等价于`command &> file`/`command >& file`）
		- **追加合并**：`command >> file 2>&1`（等价于`command &>> file`）
		- `2>&1`中`&`表示**重定向到文件描述符**，**而非普通文件**，`2>1`会将错误输出写入名为`1`的文件，`2>&1`才是将错误输出重定向到标准输出
		- `&>file`/`>&file`是`>file 2>&1`的简写，需作为整体使用，拆分无独立含义
	3. **重定向顺序**
		重定向按**从左到右**执行，顺序错误会导致效果不符合预期：
		```bash
		# 正确：先将stdout重定向到list，再将stderr重定向到stdout，最终都写入list
		find /etc -name .bashrc > list 2>&1

		# 错误：先将stderr重定向到原始stdout，再将stdout重定向到list，stderr仍输出到屏幕
		find /etc -name .bashrc 2>&1 > list
		```
	4. 不同Shell差异
		- bash/zsh：支持`command > file 2>&1`或`command &> file`
		- FreeBSD/csh：不支持上述写法，会报`Ambiguous output redirect`，需用`command >& file`
6. **Here Document 多行输入重定向**
	特殊重定向方式，将分界符之间的内容作为命令输入，语法：
	```bash
	command < < delimiter
	  多行文本内容（document）
	delimiter
	```
	**规则**：
	1. 结束的`delimiter`必须顶格写，前后无任何字符（包括空格、Tab）；
	2. 开始的`delimiter`前后空格会被忽略；
	**命令行示例**：
	```bash
	$ wc -l < < EOF
		欢迎来到
		菜鸟教程
		www.runoob.com
	EOF
	3  # 输出结果为3行
	```
	**脚本示例**：
	```bash
	#!/bin/bash
	cat < < EOF
	欢迎来到
	菜鸟教程
	www.runoob.com
	EOF
	# 执行脚本输出：
	# 欢迎来到
	# 菜鸟教程
	# www.runoob.com
	```
7. `/dev/null` 文件：**静默输出**
	`/dev/null`是特殊文件，写入的内容会被完全丢弃，读取则无任何内容，常用于**禁止命令输出**：
	- **屏蔽标准输出**：`command > /dev/null`
	- **屏蔽标准输出+标准错误**，即**静默执行**：`command > /dev/null 2>&1`
## 2. 脚本文件包含
 Shell 支持包含外部脚本文件，可复用脚本中的变量、函数
1. **语法**
	1. `. filename`：点号(.)和文件名之间**必须有空格**
	2. `source filename`
2. **注意事项**
	1. **权限**：**被包含**的文件**无需执行权限**（`chmod +x`），**仅需读权限**
	2. **路径**：包含文件时，**推荐用绝对路径**，避免因主脚本执行目录变化导致找不到文件
	3. **作用域**：被包含文件中的变量/函数**默认是主脚本的全局变量**（除非用`local`声明局部变量）
	4. **循环包含**：**禁止出现**`a.sh`包含`b.sh`、`b.sh`又包含`a.sh`的情况，会导致无限循环；
	5. **执行方式**：主脚本用`bash test2.sh`或`./test2.sh`执行，包含的脚本均生效
