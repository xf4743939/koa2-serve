## 接口前缀
```shell
http://134.175.141.31:3000/v1
```

# 文章

## 创建文章
```
POST    /category
```
### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
name | 分类名字 | 是
key | 分类关键字 | 是
parent_id | 分类父级ID | 否

### 成功操作返回
```json
{
    "msg": "成功",
    "code": 0
}
```

## 文章详情
```
GET    /category/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 分类ID | 是

### 成功操作返回
字段 | 说明
---|---
category | 分类详情 

```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
    
    }
}
```

## 文章列表
```
GET    /category
```

### 成功操作返回
字段 | 说明
---|---
categorys | 分类列表 
```json
{
    "code": 0,
    "msg": "success",
    "errorCode": 0,
    "data": {
        
    }
}
```

## 更新单篇文章
```
PUT    /category/:id
```

### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 分类ID | 是
name | 分类名字 | 否
key | 分类关键字 | 否
parent_id | 父级id | 否

### 成功操作返回

```json
{
    "msg": "更新成功",
    "code": 0,
}
```

## 删除单篇文章
```
DELETE    /category/:id
```
### 需要token
### 参数说明
参数 | 说明 | 是否必填
---|---|:---:
:id | 分类ID | 是

### 成功操作返回

```json
{
    "msg": "删除成功",
    "code": 0,
}
```


