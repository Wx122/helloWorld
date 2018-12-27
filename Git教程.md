## Git教程

### 安装Git

- 配置用户信息

```
git config --global user.name "赵成龙"
git config --global user.email "zhaochenglong@langlib.com"
```

### 创建版本库

- 初始化Git仓库

```
git init
```

- 添加文件到暂存区

```
git add .
```

- 提交文件到Git仓库

```
git commit -m "init project"
```

### 时光机穿梭

- 查看仓库状态

```
git status
```

- 查看修改内容

```
git diff README
```

#### 一、版本回退

- 查看提交历史

```
git log
```

- 查看命令历史

```
git reflog
```

- 版本回退

```
git reset --hard 4072a47
```

#### 二、撤销修改

- 丢弃工作区修改

```
git checkout -- README
```

- 丢弃暂存区修改

```
git reset HEAD README
```

#### 三、删除文件

- 删除文件

```
git rm README
```

### 远程仓库

#### 一、添加远程库

<!--先有本地库，后有远程库的时候，如何关联远程库-->

- 关联远程库

```
git remote add origin http://gitlab.langlib.io/pe/java-pe.git
```

- 首次推送

```
git push -u origin master
```

- 后续推送

```
git push origin master
```

#### 二、从远程库克隆

<!--先创建远程库，然后从远程库克隆-->

- 克隆远程库

```
git clone http://gitlab.langlib.io/pe/java-pe.git
```

### 分支管理

#### 一、创建与合并分支

- 查看分支

```
git branch
```

- 创建分支

```
git branch develop
```

- 切换分支

```
git checkout develop
```

- 创建+切换分支

```
git checkout -b develop
```

- 合并某分支到当前分支

```
git merge develop
```

- 删除分支

```
git branch -d develop
```

#### 二、解决冲突

- 解决冲突

```
当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。
```

```
解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。
```

- 查看分支合并图

```
git log --graph --pretty=oneline --abbrev-commit
```

#### 三、Feature分支

- 强制删除一个没有被合并过的分支

```
git branch -D feature-v1.0.1-zcl
```

#### 四、多人协作

- 多人协作的工作模式

![](/Users/ifor/Desktop/Git教程/doc/多人协作的工作模式.png)

- 查看远程库信息

```
git remote -v
```

- 删除远程库信息

```
git remote rm origin
```

- 在本地创建和远程分支对应的分支

```
git checkout -b develop origin/develop
```

- 建立本地分支和远程分支的关联

```
git branch --set-upstream-to=origin/develop develop
```

- 从远程抓取分支

```
git pull
```

### 标签管理

#### 一、创建标签

- 创建默认标签

```
git tag v1.0.0
```

- 创建历史标签

```
git tag v1.0.0 4072a47
```

- 创建带有说明的标签

```
git tag -a v1.0.0 -m "version 1.0.0 released." 4072a47
```

- 查看所有标签

```
git tag
```

#### 二、操作标签

- 推送一个本地标签

```
git push origin v1.0.0
```

- 推送全部未推送过的本地标签

```
git push origin --tags
```

- 删除一个本地标签

```
git tag -d v1.0.0
```

- 删除一个远程标签

```
git push origin :refs/tags/v1.0.0
```

### 自定义Git

- 显示颜色

```
git config --global color.ui true
```

#### 一、忽略特殊文件

- 创建忽略文件`.gitignore`

```
.DS_Store
*.iml
.idea
target
```

- 强制添加文件到暂存区

```
git add -f README
```

- 检查忽略规则

```
git check-ignore -v App.class
```

#### 二、配置文件

- 每个仓库的Git配置文件`cat .git/config`

```
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = true
[remote "origin"]
        url = http://gitlab.langlib.io/pe/java-pe.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master
[branch "main-release"]
        remote = origin
        merge = refs/heads/main-release
```

- 当前用户的Git配置文件`cat .gitconfig`

```
[user]
        name = 赵成龙
        email = zhaochenglong@langlib.com
```

### 结束语

- [Git Cheat Sheet](./doc/git-cheatsheet.pdf)
- 强制合并两个历史不相关的分支

```
git merge develop --allow-unrelated-histories
```

- 推送本地分支到远程

```
git push origin feature-v1.0.1-zcl:feature-v1.0.1-zcl
```

- 删除远程分支

```
git push origin :feature-v1.0.1-zcl
```

- 查看远程分支

```
git branch -r
```



