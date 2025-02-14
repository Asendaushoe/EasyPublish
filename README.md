# EasyPublish

基于Electron和Vue的自动化发布项目，支持向萌番组、动漫花园、末日动漫、Nyaa、Acgrip提交发布内容。

该项目仍处于测试阶段，各种功能可能尚不稳定。

------

## 使用说明

### 登录管理

![登录管理](readme/08.png)

在此可以打开各发布站的网站并登录。

检查按钮将会检查所有站点的登录状态，若未登录或遇防火墙阻止请点击登录账号登录并通过人机验证。遇访问失败请检查网络环境并确保能够正常访问网站。

清除缓存按钮将清除登录窗口的所有缓存并清除EasyPublish保存的Cookie。

页面会自动刷新（如果没出BUG的话），所以刷新按钮意义不大。

*（可选功能）* 由于EasyPublish并不具备记住密码的功能，在此提供一个记录账号密码的功能，双击修改，右键复制，输入框失焦时自动保存。

![用户名密码](readme/04.png)

*（可选功能）* VCB主站账户用于发布主站帖，基于WP RUST API实现，应用程序密码前往仪表盘-个人资料-应用程序密码新建。

**EasyPublish明码存储您的信息，请确保运行环境安全**

### 代理设置

![代理设置](readme/07.png)

代理设置位于右上角，应用重启后新的代理设置才会生效。

EasyPublish不会自动使用系统代理，若非VPN/TUN等请先配置代理设置。

### 新建项目

![新建项目](readme/01.png)

填写项目名称和存放配置的地址，该名称不作为发布时的标题。*（本地保存路径已不再是必填项）* 

目前仅支持使用文件发布，计划在下一版本添加模板，省去繁琐的html修改。

### 管理本地项目

![管理本地项目](readme/03.png)

管理EasyPublish创建的项目，可以从该页面继续发布流程，当前版本删除项目不会删除删除项目目录。

所有项目以创建时的时间戳作为唯一标识，下一版本计划增加项目导入。

### 管理已发布项目

等下一版本（或者两个）。

------

## 快速开始

在按照上面文档配置代理、登录账户、创建项目后

### 编辑发布配置

![编辑发布配置](readme/02.png)

| 配置项         | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| 标题           | 用作发布帖的标题，该输入框失去焦点时将会自动提交萌番组获取标签建议 |
| 种子文件路径   | 选择要发布的种子，或者直接填写其路径                         |
| html文件路径   | 选择html格式的发布稿，或直接填写其路径，该文件将用于萌番组、动漫花园、末日动漫的发布 |
| md文件路径     | 选择markdown格式的发布搞，或者直接填写其路径，该文件将用于Nyaa的发布 |
| bbcode文件路径 | *（可选）* 选择bbcode格式的发布搞，或者直接填写其路径，该文件将用于Acgrip的发布 |
| Bangumi标签    | 选择萌番组的标签，选项默认根据标题自动向萌番组获取，若有遗漏则在框内输入相关内容，EasyPublish会搜索相关标签 |
| Bangumi分类    | 选择发布内容在萌番组上的分类                                 |
| Nyaa Info      | 填写Nyaa上Information一栏对应内容，默认填写VCB默认内容，若留空请删除 |
| Nyaa分类       | 选择发布内容在Nyaa上的分类                                   |
| Nyaa配置项     | 对应Nyaa上的两个选项                                         |

其他站点将根据萌番组和Nyaa的分类选择相应分类，分类仅收录部分，若有需要请反馈。

点击保存按钮以保存以上配置，点击下一步自动保存并进入复核阶段。

### 复核发布内容

预览发布内容，页面的渲染结果即为发布的最终效果，请确保各部分准确无误。

![预览](readme/06.png)

若需要修改，可以切换到源码选项进行修改，并点击右上保存按钮保存修改。重新加载按钮将重新加载发布稿，未保存的修改将不会被记录。

![源码](readme/09.png)

### BT发布

![发布](readme/10.png)

在进行发布之前，请确保账户已登录，并通过了末日动漫的防火墙验证和人机验证。

EasyPublish在发布之前会再次检查登录状态，若出现异常请前往登录管理登录账号，再转到管理本地项目继续发布。

萌番组有团队同步和非团队同步两种发布方式，任意一项发布完成均不可再次在萌番组发布。

另部分情况下可能出现疑似由网络波动造成的已发布但显示种子已存在，若出现以上情况请携日志反馈。

支持多选批量发布，但请参阅提示。

### 主站发布

*（该步骤可以跳过）* 

![主站](readme/05.png)

主站发布功能基于WordPress RUST API实现，需要账户登录处填写正确的用户名和应用程序密码。

发布稿支持直接复制或上传文件，中间折叠有前面步骤自动获取的BT站对应链接，以方便填写发布搞对应位置，右键可复制。

![link](readme/12.png)

若勾选RS选项，可留空主张发布图和分类一栏，在下方搜索框搜索并选择一个文章，发布时将以新的内容覆盖旧的内容。

![RS发布](readme/13.png)

### 完成页面

若在EasyPublish发布主站帖，下方会有一个主站帖子链接。

![完成](readme/11.png)

至此发布流程完成。

------

## 其他事项

右上有可以切换明暗主题的滑块。

*开发是业余的，框架是现学的。* 

*代码是一坨的，BUG是一堆的。* 

*功能是勉强能用的，优化是一点没有的。* 

------

## 开源许可

| 项目         | 库                                                           |
| ------------ | ------------------------------------------------------------ |
| electron     | [https://github.com/electron/electron](https://github.com/electron/electron) |
| vue          | [https://github.com/vuejs/core](https://github.com/vuejs/core) |
| vue-router   | [https://github.com/vuejs/router](https://github.com/vuejs/router) |
| axios        | [https://github.com/axios/axios](https://github.com/axios/axios) |
| axios-retry  | [https://github.com/softonic/axios-retry](https://github.com/softonic/axios-retry) |
| element-plus | [https://github.com/element-plus/element-plus](https://github.com/element-plus/element-plus) |
| electron-log | [https://github.com/megahertz/electron-log](https://github.com/megahertz/electron-log) |
| lowdb        | [https://github.com/typicode/lowdb](https://github.com/typicode/lowdb) |
| bbob         | [https://github.com/JiLiZART/bbob](https://github.com/JiLiZART/bbob) |
| marked       | [https://github.com/markedjs/marked](https://github.com/markedjs/marked) |

------

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
