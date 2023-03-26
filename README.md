# lens全自动发帖|点赞|关注|脚本 升级版(Robot群友专用) 
## Fork from https://github.com/skyMetaverse/lenster

## 功能说明
相比原版脚本，修复了一些bug，然后新增以下功能
- 多账号支持
- 不定时延迟行为（防女巫）
- 点赞帖子支持多帖子
- 新增评论帖子， 支持评论多条帖子
- 动态内容加入自定义随机语料

## 使用说明
```
git clone
npm install
mv example.env .env  # 将example.env重命名为.env

# 按照个人需求修改.env配置文件

npm run follow       # 关注用户
npm run like         # 点赞帖子
npm run post         # 发动态
npm run comment      # 评论帖子
```

## 自定义随机语料使用说明
修改 post.js里的第10行，把你自己的语料库替换进去
```
let cont_list = ["GM", "今天天气不错"]
```
建议： 语料库可以自己去推特抓取，或者使用ai生产

## 如果觉得有帮助，欢迎加入Robot Dao一起探讨(吹水) : https://opensea.io/collection/cryptochasers-robot