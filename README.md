# blog
My personal blog

## Development
Use this commad for development

```bash
hugo server -D
```

## New article

```bash
hugo hugo new content/${new_acritcle}/index.md
```

## Build
Before deploy

```bash
hugo -D
```

## Deploy

```bash
ansible-playbook ansible/push.yaml -i ansible/inventory.yaml
```
