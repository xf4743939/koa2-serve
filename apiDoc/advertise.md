## 接口前缀
```shell
http://134.175.141.31:3000/v1
```

# 文章

## 创建文章
```
POST    /advertise
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
title | 广告标题 | 是
link | 广告链接 | 是

### 成功操作返回
```json
{
    "msg": "成功",
    "code": 0
}
```

## 文章详情
```
GET    /advertise/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 广告id | 是

```json
{
    "code": 0,
    "msg": "success",
    "data": {
       
    }
}
```

## 文章列表
```
GET    /advertise
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
page | 分页 | 否

### 成功操作返回
字段 | 说明
---|---
advertises | 广告列表
```json
{
    "code": 0,
    "msg": "success",
  
    "data": {
        "advertises": [
            {
                "created_at": "2019-11-14",
                "id": 1,
                "title": "深入浅出 Node.js",
                "author": "小许",
                "description": "简介：深入浅出 Node.js",
                "cover": "http://cdn.boblog.com/FmdNNoR1MRtgvmQD1KwaKzbkL_i7",
                "browse": 0,
                "category_id": 1,
                "category": {
                    "created_at": "2019-11-14",
                    "id": 1,
                    "name": "html",
                    "key": "html",
                    "parent_id": 0
                }
            }
        ],
        cur_page：1,
        total:10,
        total_pages:10
    }
}
```

## 更新单篇文章
```
PUT    /advertise/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 文章ID | 是
title | 广告标题 | 是
link | 广告链接 | 是


### 成功操作返回

```json
{
    "msg": "成功",
    "code": 0,
}
```

## 删除单篇文章
```
DELETE    /advertise/:id
```
### 需要token
### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 文章ID | 是

### 成功操作返回

```json
{
    "msg": "删除文章成功",
    "code": 0,
}
```


