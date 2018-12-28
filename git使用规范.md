# git使用规范
## 分支定义
### 主分支
- master: 主分支，最为稳定可随时发布的代码分支。
- main-release: 预上线分支，要确保所有功能已经测试完毕。
- develop: 项目开发分支，此分支要包括项目的最全最新的代码。

### 派生分支
- feature: 项目个人feature的开发分支
- hotfix: 线上代码有bug时创建hotfix分支进行解决

## 派生分支命名规范
- feature: 项目个人feature的开发分支
- hotfix: 线上代码有bug时创建hotfix分支进行解决

## 提交规范
### commit命名
- feat(): 有新功能提交时使用
- fix(): bug修改时使用
- docs(): 文档提交时使用

### commit提交
- 提交信息需要言之有物，必须说明清楚此次提交的功能点是什么。

```
// bad
feat(svcMemberShip): 接口修改
fix（svcMemberShip: bug fix

//good
feat(svcMemberShip): 绑定手机号bindCellPhone接口逻辑修改
fix（svcLive): 欢拓视频openID参数配置调整

```
- commit提交时要保证修改的代码是一个完整的功能点或者修改点，不能将功能完成一半的代码进行提交。
- 需要切换分支处理bug，需要使用`git stash`指令将本地未完成的代码进行暂存。
- 如果未完成的feature需要commit暂存代码，必须要在push之前将这几条commit合并为一条commit才能进行提交

## 分支合并规范
- 当需要将一个分支合并到另一个分支时，使用merge --no-ff

```
// bad
merge feature-1.0.0-yzm

//good
merge --no-ff feature-1.0.0-yzm

```

- 当需要将个人feature代码合并到develop时，必须要在gitlab上发起merge request, 只有leader审核完代码才可点击accept merge进行合并，个人不可直接将自己分支的代码合并到develop

## git工具
- 目前公司统一使用sourceTree
- 如果成员对自己的git指令不熟，需使用sourceTree进行git操作，并在工作中学习使用git指令

## 其他注意事项

- hotfix发版之后，必须要将master的代码合并到main-release和develop上
- 在项目上线之后必须将推到远端的个人feature和bugfix分支删除